#!/bin/bash

function parse() {
  cat $1 | \
    sed -e 's|//.*$||g' | tr '\n' ' ' | \
    sed -e 's/```/ \
/g' | \
    grep '^js' | \
    sed -e 's/^js //' \
        -e 's|<:|extends|' | \
    perl -pe 's/:\s*\[\s*([A-Za-z |]+)\s*\]/:(\1)\[\]/g' | \
    perl -pe 's/(extend )?(enum|interface)/\nexport $2/g' | \
    sed -e '/enum/ s/"[ ]* | /" ,/g'
}

mkdir -p target/

FILES="es5 es2015"

for x in $FILES; do
  if [[ ! -e "target/$x.md" ]]; then
    curl https://raw.githubusercontent.com/estree/estree/master/$x.md > target/$x.md
  fi
  parse target/$x.md > target/$x.ts
done

python build-ast.py $FILES > src/ast.ts