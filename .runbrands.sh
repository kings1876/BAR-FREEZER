for b in "$@"; do
  echo "=== $b"
  node scripts/audit/category-audit.mjs https://barfreezer.com.au /brands/$b/ batch=pages 2>&1 | grep -v Warn | awk '/^\//{p=$0} /^   /{ if ($0!="   OK") print "PAGE "p" => "$0}'
  node scripts/audit/category-audit.mjs https://barfreezer.com.au /brands/$b/ batch=products 2>&1 | grep -v Warn | awk '/^products:/{print} /clean$/{print} /=>/{print} /^DUP/{print}' | head -12
  node - <<JS
const r=JSON.parse(require('fs').readFileSync('.audit-$b-pages.json','utf8'))[0];console.log('PAGEINFO',r.title,'|',(r.desc||'').length,'|',r.h1,'|links',r.productLinks)
JS
done
rm -f .audit-*.json
