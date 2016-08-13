#!/bin/bash

function parse() {
  cat $1 | \
    perl -pe 's/<\/?div[^>]*>/\n$&\n/g' | \
    awk '/<div class="highlight/{flag=1;next}/<\/div>/{flag=0}flag' | \
    sed -e 's/<[^>]*>//g' \
        -e 's|&lt;:|extends|' \
        -e 's|&amp;|\&|g' \
        -e 's|&lt;|<|g' \
        -e 's|&gt;|>|g' \
        -e 's|//.*$||g' | \
    perl -pe 's/:\s*\[\s*([A-Za-z |]+)\s*\]/:(\1)\[\]/' | \
    perl -pe 's/(.*):(.*)\|\s*null(.*)/\1?:\2\3/' | \
    tr '\n' ' ' | \
    perl -pe 's/(extend )?(enum|interface)/\nexport $2/g' | \
    sed -e '/enum/ s/|/,/g' -e 's/,,/||/'
}

mkdir -p target/

FILES="spec es6"

for x in $FILES; do
  if [[ ! -e "target/$x.md" ]]; then
    curl https://github.com/estree/estree/blob/master/$x.md > target/$x.md
  fi
  parse target/$x.md > target/$x.ts
done

python build-ast.py $FILES > src/ast.ts