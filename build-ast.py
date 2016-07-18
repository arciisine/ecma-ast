import re, sys
declarations = {}
order = []

def get_func_types():
  return [k for k in order if 'Function' in k and k != 'Function']  

def get_forloop_types():
  return [k for k in order if k.startswith('For')]

def flatten(obj, flatten=set()):

  out = {}
  fields = {}
  parents = []

  for p in obj['extends']:
    parent = declarations[p]
    typ = parent['type']

    if parent['name'] in flatten:
      out.update(parent)
      fields.update(parent['fields'])
    else:
      parents.append(p)
  out.update(obj)
  fields.update(obj['fields'])
  out['extends'] = parents
  out['fields'] = fields

  return out

def parse(text):
  lines = re.split('([{};])', text);  
  
  name = re.split('interface|enum', text)[-1].strip().split()[0]
  interface = ' interface ' in text

  if interface:
    parts = lines[0].split(' extends ')  
    extends = []
    if len(parts) > 1:
      extends = [x.strip() for x in re.split('[,{]', parts[1]) if x]

    fields = {}
    key = None
    prop = None
    i = 1;
    max = len(lines)-1

    while i < max:
      while ':' not in lines[i] and i < max:
        i += 1
      if i >= max:
        continue

      key,prop = lines[i].strip().split(':',1)
      key = key.strip('?')
      
      closed = [';']
      i+=1
      while len(closed) > 0 and i < max:
        if '{' in lines[i]:
          closed.append('}')
        while len(closed) > 0 and closed[-1] in lines[i]:
          closed = closed[:-1]
        prop += lines[i]
        i += 1
      
      if 'false;' in prop:
        prop = 'boolean';
      fields[key] = prop

    typ = None
    if "type" in fields and '"' in fields['type']:
      typ = fields["type"].replace('"', '').replace(';','').strip()

    if typ is not None and name != typ:
      typ = name

    return  {
      "source" : "interface",
      "name" : name,
      "extends" : extends,
      "fields" : fields,
      "type" : typ
    }   
  else:
    values = []
    for line in lines[1:-1]:
      if '"' in line:
        for e in line.strip().split(','):
          if e:
              values.append(e)
    return {
      "source" : "enum",
      "name" : name,
      "values" : values
    }   

def base_function():
  common = None

  decls = [declarations[k] for k in get_func_types()]
  
  for decl in decls:
      fields = decl['fields']
      if common is None:
        common = {}
        common.update(fields)
      else:
        for k in fields.keys():
          if k in common and common[k] != fields[k]:
            del common[k]
        for k in common.keys():
          if k not in fields:
            del common[k]
  
  declarations['BaseFunction'] = {
    "source" : "interface",
    "type" : None,
    "extends" : ["Node"],
    "name" : "BaseFunction",
    "fields" : common
  }

  order.append('BaseFunction')

  for decl in decls:
    decl['extends'].append('BaseFunction')
    for key in common.keys():
      del decl['fields'][key]

def process(files):
  for f in files:
    for line in open('target/%s.ts'%f, 'r').readlines():
      if line.strip() == "": continue
      out = parse(line)
      key = out['name']
    
      if key in declarations:
        for k,v in out.items():
          if v is not None:
            if k == 'fields':
              declarations[key][k].update(v)
            elif k == 'extends':
              pass
            else:
              declarations[key][k] = v
      else:
        declarations[key] = out
        order.append(key)

  for k in get_func_types():
    declarations[k] = flatten(declarations[k], set(['Function']))

  del declarations['Node']['fields']['loc']

def get_all_fields(k):
  obj = declarations[k]
  if 'extends' in obj:
    fields = {}
    for p in obj['extends']:
      res = get_all_fields(p)
      if res is not None:
        fields.update(res)
    fields.update(obj['fields'])
    return fields
  else:
    return obj['fields'] if 'fields' in obj else None

HANDLER_METHODS = \
  '    %(type)s?:(node?:%(type)s, ref?:T)=>(Node|void)\n' + \
  '    %(type)sEnd?:(node?:%(type)s, ref?:T)=>(Node|void)'

MULTI_HANDLER_METHODS = \
  '    %(name)s?:(node?:%(type)s, ref?:T)=>(Node|void)\n' + \
  '    %(name)sEnd?:(node?:%(type)s, ref?:T)=>(Node|void)'

GUARD_METHOD = '  export function is%(name)s(n:Node):n is %(name)s { return n.type === "%(type)s"; }'
MULTI_GUARD_METHOD = '  export function is%s(n:Node):n is %s { return %s }';
INTERFACE_DEF = '  export interface %(name)s %(extends)s {\n    %(fields)s\n  }'
ENUM_DEF = '  export type %(name)s = %(values)s';
CONS_DEF = '  export function %(name)s(o:{%(fields)s}):%(name)s {\n    return ((o["type"] = "%(type)s") && o) as %(name)s\n  }'
NESTED_DEF = '  NESTED["%(name)s"] = [%(nested)s]; '

def output():

  decls = []
  cons = []
  guards = []
  handlers = [];

  for k in order:
    obj = declarations[k]
    if obj['source'] == 'enum':
      decls.append(ENUM_DEF % {
        "name":obj['name'], 
        "values":re.sub('"\s+\|\s+"', '" | "', " | ".join(obj['values']))
      })
    else:
      extends = ''
      if 'extends' in obj and len(obj['extends']) > 0:
        extends = ' extends ' + ','.join(obj['extends'])

      all_fields = get_all_fields(obj['name'])

      context = {
        "name":obj['name'], 
        "type":obj['type'],
        "nested":[k for k, v in all_fields.items()
           if '"' not in v and '{' not in v and 'string' not in v and 'boolean' not in v and 'number' not in v],
        "extends":extends
      } 

      if obj['type'] is not None and extends != '':
        del obj['fields']['type']

      context["fields"] = "\n    ".join(['%s: %s' %pair for pair in obj['fields'].items()])
      context["nested"] = ','.join(['"%s"'%x for x in context["nested"]])
        
      decls.append(INTERFACE_DEF% context)
      if obj['type'] is not None:
        guards.append(GUARD_METHOD % context)
        handlers.append(HANDLER_METHODS %context)
        context['fields'] = "\n    ".join(['%s: %s' %pair for pair in all_fields.items() if pair[0] != 'type']).replace(';',',')
        cons.append(CONS_DEF % context)
        cons.append(NESTED_DEF % context)
                
  handlers.append(MULTI_HANDLER_METHODS % { "name": "Function", "type" : "BaseFunction" })
  handlers.append(MULTI_HANDLER_METHODS % { "name": "ForLoop", "type" : ('|'.join(get_forloop_types())) })
  guards.append(MULTI_GUARD_METHOD % ('Function', 'BaseFunction', ' || '.join(['n.type === "%s"' % k for k in get_func_types()])))
  guards.append(MULTI_GUARD_METHOD % ('ForLoop', ('|'.join(get_forloop_types())), (' || '.join(['n.type === "%s"' % k for k in get_forloop_types()]))))

  print 'export namespace AST {'
  print '  export const NESTED:{[key:string]:string[]} = {}';
  print '\n'.join(decls)
  print '\n'.join(cons)
  print '\n'.join(guards)
  print '\n  export interface NodeHandler<T> {'
  print '\n'.join(handlers)
  print '\n  }'
  print '}'

if __name__ == '__main__':
  process(sys.argv[1:])
  base_function()
  output()