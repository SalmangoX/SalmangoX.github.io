# SalmangoX

SalmangoX 的官网：https://salmangox.github.io/

- `index.html` 首页，`cadence.html` 节律，`ledger.html` 月账本
- `version.json` 各产品的版本号和下载地址（机器可读，目前手动维护）
- 改完网站、推送前运行 `bash bump.sh`：三个页面的样式表 / 脚本版本号和 `<meta name="sx-build">` 一起换新。网页打开或切回前台时会自己检查这个版本号，有新版就刷新（刚打开时直接刷新，正在浏览时底部提示）。
