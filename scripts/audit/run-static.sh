for p in "$@"; do
 path="/$p/"; [ "$p" = "home" ] && path="/"
 node scripts/audit/category-audit.mjs https://barfreezer.com.au $path batch=pages single 2>&1 | grep -v Warn | awk -v s="$p" '/^   /{ if ($0!="   OK") print "ISSUE "s" =>"$0}'
 f=".audit-$(echo $path | tr -d '/')-pages.json"; [ "$path" = "/" ] && f=".audit--pages.json"
 node -e "const r=JSON.parse(require('fs').readFileSync('$f','utf8'))[0];console.log('$p','|',r.title,'|',(r.title||'').length+'c |',(r.desc||'').length+'d |',r.h1,'|',r.wc+'w |',(r.types||[]).join('/'),'|',r.issues.join('; ')||'OK')"
done
rm -f .audit-*.json
