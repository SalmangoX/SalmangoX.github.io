#!/bin/bash
# 换版本号：三个页面里的样式表 / 脚本引用和 <meta name="sx-build"> 一起换成当前时间。
# 每次改完网站、推送前运行一次：bash bump.sh
set -e
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M)
for f in index.html cadence.html ledger.html; do
  sed -i '' -E "s#(style\.css|site\.js)(\?v=[0-9]+)?\"#\1?v=$V\"#g; s#<meta name=\"sx-build\" content=\"[0-9]+\">#<meta name=\"sx-build\" content=\"$V\">#" "$f"
done
echo "版本号已换成 $V"
