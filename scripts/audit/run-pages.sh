# usage: run-pages.sh /venues/ slug1 slug2 ...
base="$1"; shift
for b in "$@"; do
  echo "=== $b"
  node scripts/audit/category-audit.mjs https://barfreezer.com.au $base$b/ batch=pages 2>&1 | grep -v Warn | awk '/^\//{p=$0} /^   /{ if ($0!="   OK") print "ISSUE "p" => "$0}'
  node - <<JS
const r=JSON.parse(require('fs').readFileSync('.audit-$b-pages.json','utf8'))[0];console.log('INFO',r.title,'|',(r.desc||'').length,'|',r.h1,'|links',r.productLinks,'|',r.wc+'w',(r.types||[]).join('/'))
JS
done
rm -f .audit-*.json
