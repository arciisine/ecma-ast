import re, sys
declarations = {}
order = []

def get_func_types():
  return [k for k in order if 'Function' in k and k != 'Function']  

FORCE_FLATTEN = set()

def flatten(obj):

  if 'type' not in obj or obj['type'] is None: 
    return obj

  out = {}
  fields = {}
  parents = []

  for p in obj['extends']:
    parent = declarations[p]
    typ = parent['type']

    if typ is not None or (obj['name'], parent['name']) in FORCE_FLATTEN:
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
            else:
              declarations[key][k] = v
      else:
        declarations[key] = out
        order.append(key)
        
  FORCE_FLATTEN = set([(x, 'Function') for x in get_func_types()])

  for k,v in declarations.items():
    declarations[k] = flatten(v)  

def output():
  print 'export namespace AST {'

  for k in order:
    obj = declarations[k]
    if obj['source'] == 'enum':
        print '  export enum %(name)s {\n    %(values)s\n  }' % \
          {
            "name":obj['name'], 
            "values":", ".join(obj['values'])
          }
    else:
      extends = ''
      if 'extends' in obj and len(obj['extends']) > 0:
        extends = ' extends ' + ','.join(obj['extends'])
      context = {
        "name":obj['name'], 
        "type":obj['type'],
        "extends":extends, 
        "fields":"\n    ".join(['%s: %s' %pair for pair in obj['fields'].items()])
      }
      print '  export interface %(name)s %(extends)s {\n    %(fields)s\n  }'% context
      if obj['type'] is not None:
        print '  export function is%(name)s(n:Node):n is %(name)s { return n.type === "%(type)s"; } \n' % context        
    
  print '  export function isFunction(n:Node):n is BaseFunction { return %s }' % (' || '.join(['n.type === "%s"' % k for k in get_func_types()]))

  print '}'

if __name__ == '__main__':
  process(sys.argv[1:])
  base_function()
  output()