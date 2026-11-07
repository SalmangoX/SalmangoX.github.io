// 网站的多语言：简体中文（写在页面里的原文）· 繁體中文 · English · Français · 日本語。
// 按访客的系统语言自动选，页脚可以换（记在本机浏览器里，换了重新载入页面）。
// 页面里的中文原文就是字典的键：打开页面时把文字节点和 alt / aria-label / description 换成对应语言；
// dl.js、site.js 里的文字用 sxT() 取。示意图是按语言分别渲染的图片（img/ill/*-<语言>-*.webp），这里换成对应的那一套。
(function () {
  var LANGS = [['s', 'zh-CN', '简体中文'], ['t', 'zh-Hant', '繁體中文'], ['en', 'en', 'English'], ['fr', 'fr', 'Français'], ['ja', 'ja', '日本語']];
  var COL = { t: 0, en: 1, fr: 2, ja: 3 };
  // 原文: [繁體, English, Français, 日本語]
  var D = {
    // —— 通用 ——
    'SalmangoX 首页': ['SalmangoX 首頁', 'SalmangoX home', 'Accueil SalmangoX', 'SalmangoX ホーム'],
    '作品': ['作品', 'Work', 'Créations', '作品'],
    '首页': ['首頁', 'Home', 'Accueil', 'ホーム'],
    '联系': ['聯絡', 'Contact', 'Contact', 'お問い合わせ'],
    '源码': ['原始碼', 'Source', 'Code source', 'ソースコード'],
    '功能': ['功能', 'Features', 'Fonctions', '機能'],
    '外观：跟随系统': ['外觀：跟隨系統', 'Appearance: System', 'Apparence : système', '外観：システム'],
    '外观：浅色': ['外觀：淺色', 'Appearance: Light', 'Apparence : clair', '外観：ライト'],
    '外观：深色': ['外觀：深色', 'Appearance: Dark', 'Apparence : sombre', '外観：ダーク'],
    '语言': ['語言', 'Language', 'Langue', '言語'],
    '节律': ['節律', 'Cadence', 'Cadence', 'Cadence'],
    '月账本': ['月帳本', 'Monthly Ledger', 'Monthly Ledger', '月次帳簿'],
    '节律图标': ['節律圖示', 'Cadence icon', 'Icône de Cadence', 'Cadence のアイコン'],
    '月账本图标': ['月帳本圖示', 'Monthly Ledger icon', 'Icône de Monthly Ledger', '月次帳簿のアイコン'],
    '打开网页版': ['打開網頁版', 'Open the web app', 'Ouvrir la version web', 'Web 版を開く'],
    '打开月账本': ['打開月帳本', 'Open Monthly Ledger', 'Ouvrir Monthly Ledger', '月次帳簿を開く'],
    '安卓': ['Android', 'Android', 'Android', 'Android'],
    '网页 PWA': ['網頁 PWA', 'Web (PWA)', 'Web (PWA)', 'Web（PWA）'],
    '电脑浏览器': ['電腦瀏覽器', 'Desktop browser', 'Navigateur d’ordinateur', 'PC のブラウザ'],
    '网站已更新 · 点此刷新': ['網站已更新 · 點此重新整理', 'Site updated · tap to refresh', 'Site mis à jour · touchez pour actualiser', 'サイトが更新されました · タップで再読み込み'],
    '邮箱已复制：': ['已複製電郵：', 'Email copied: ', 'Adresse copiée : ', 'メールアドレスをコピーしました：'],
    '联系邮箱：': ['聯絡電郵：', 'Email: ', 'E-mail : ', 'メール：'],
    '用邮件 App 写信': ['用郵件 App 寫信', 'Open in Mail', 'Écrire avec Mail', 'メールアプリで書く'],

    // —— 首页 ——
    'SalmangoX 的作品。': ['SalmangoX 的作品。', 'Things made by SalmangoX.', 'Les créations de SalmangoX.', 'SalmangoX の作品。'],
    '看看作品': ['看看作品', 'See the work', 'Voir les créations', '作品を見る'],
    '往下看': ['往下看', 'Scroll down', 'Faire défiler', '下へ'],
    '日历、待办、课表与纪念日': ['日曆、待辦、課表與紀念日', 'Calendar, to-dos, timetable and anniversaries', 'Agenda, tâches, emploi du temps et dates importantes', 'カレンダー、ToDo、時間割、記念日'],
    '了解与下载': ['了解與下載', 'Learn more & download', 'Découvrir et télécharger', '詳細とダウンロード'],
    '每月收支、资产与独秀指数': ['每月收支、資產與獨秀指數', 'Monthly income, spending, assets and the Duxiu Index', 'Revenus, dépenses, patrimoine et indice Duxiu, mois par mois', '毎月の収支・資産と独秀指数'],
    '了解更多': ['了解更多', 'Learn more', 'En savoir plus', '詳しく見る'],
    '2026 年 11 月': ['2026 年 11 月', 'November 2026', 'Novembre 2026', '2026年11月'],
    '2026 年 10 月': ['2026 年 10 月', 'October 2026', 'Octobre 2026', '2026年10月'],
    '2026 年 10 月结余': ['2026 年 10 月結餘', 'October 2026 balance', 'Solde d’octobre 2026', '2026年10月の収支'],
    '日': ['日', 'S', 'D', '日'], '一': ['一', 'M', 'L', '月'], '二': ['二', 'T', 'M', '火'], '三': ['三', 'W', 'M', '水'],
    '四': ['四', 'T', 'J', '木'], '五': ['五', 'F', 'V', '金'], '六': ['六', 'S', 'S', '土'],
    '收入': ['收入', 'Income', 'Revenus', '収入'],
    '支出': ['支出', 'Expenses', 'Dépenses', '支出'],
    '储蓄率': ['儲蓄率', 'Savings', 'Épargne', '貯蓄率'],
    '按月': ['按月', 'Month', 'Mois', '月別'],
    '按季度': ['按季度', 'Quarter', 'Trimestre', '四半期'],
    '按年': ['按年', 'Year', 'Année', '年別'],
    '独秀指数': ['獨秀指數', 'Duxiu Index', 'Indice Duxiu', '独秀指数'],
    '右侧为结余': ['右側為結餘', 'Right: balance', 'À droite : solde', '右側は収支'],
    '6月': ['6月', 'Jun', 'Juin', '6月'], '7月': ['7月', 'Jul', 'Juil.', '7月'], '8月': ['8月', 'Aug', 'Août', '8月'],
    '9月': ['9月', 'Sep', 'Sept.', '9月'], '10月': ['10月', 'Oct', 'Oct.', '10月'],
    '链接': ['連結', 'Links', 'Liens', 'リンク'],

    // —— 节律 ——
    '节律 Cadence': ['節律 Cadence', 'Cadence', 'Cadence', 'Cadence'],
    '节律 Cadence：日历、待办、课表、记录和纪念日放在一个应用里。网页、iPhone、Mac、安卓四端用同一份数据。':
      ['節律 Cadence：日曆、待辦、課表、記錄和紀念日放在一個應用程式裡。網頁、iPhone、Mac、Android 四端共用同一份資料。',
       'Cadence: calendar, to-dos, timetable, tracking and anniversaries in one app. Web, iPhone, Mac and Android share the same data.',
       'Cadence : agenda, tâches, emploi du temps, suivi et dates importantes dans une seule app. Web, iPhone, Mac et Android partagent les mêmes données.',
       'Cadence：カレンダー、ToDo、時間割、記録、記念日をひとつのアプリに。Web・iPhone・Mac・Android で同じデータを使えます。'],
    '日历、待办、课表、打卡记录和纪念日，放在一个安静好用的应用里。网页、iPhone、Mac、安卓用同一份数据，免费，无广告、无内购。':
      ['日曆、待辦、課表、打卡記錄和紀念日，放在一個安靜好用的應用程式裡。網頁、iPhone、Mac、Android 共用同一份資料，免費，無廣告、無內購。',
       'Calendar, to-dos, timetable, habit tracking and anniversaries in one calm, easy app. Web, iPhone, Mac and Android share the same data. Free, with no ads and no in-app purchases.',
       'Agenda, tâches, emploi du temps, suivi d’habitudes et dates importantes, réunis dans une app calme et simple. Web, iPhone, Mac et Android partagent les mêmes données. Gratuite, sans publicité ni achat intégré.',
       'カレンダー、ToDo、時間割、記録、記念日を、静かで使いやすいひとつのアプリに。Web・iPhone・Mac・Android で同じデータを使えます。無料、広告もアプリ内課金もありません。'],
    '下载 App': ['下載 App', 'Get the app', 'Télécharger l’app', 'アプリを入手'],
    '年 / 月 / 周三种视图': ['年 / 月 / 週三種檢視', 'Year, month and week views', 'Vues année, mois et semaine', '年・月・週の 3 つの表示'],
    '双指一捏就切换': ['雙指一捏就切換', 'Pinch to switch between them', 'Pincez pour passer de l’une à l’autre', 'ピンチで切り替え'],
    '今日页': ['今日頁', 'Today', 'Aujourd’hui', '今日のページ'],
    '今天要做的，一条时间线看完': ['今天要做的，一條時間線看完', 'Everything for today on one timeline', 'Toute la journée sur une seule ligne du temps', '今日やることをひとつのタイムラインで'],
    '事件与提醒': ['事件與提醒', 'Events & reminders', 'Événements et rappels', '予定とリマインダー'],
    '颜色分轻重，提醒可以设好几个': ['顏色分輕重，提醒可以設好幾個', 'Colors show priority; set as many reminders as you like', 'Les couleurs indiquent la priorité ; plusieurs rappels possibles', '色で優先度を区別、通知はいくつでも'],
    '课表': ['課表', 'Timetable', 'Emploi du temps', '時間割'],
    '拍张照片就能导入': ['拍張照片就能匯入', 'Import it from a photo', 'Importez-le depuis une photo', '写真を撮るだけで取り込み'],
    '记录日历': ['記錄日曆', 'Tracking calendars', 'Agendas de suivi', '記録カレンダー'],
    '打卡、打分，看热力图': ['打卡、評分，看熱力圖', 'Check in, rate your days, see a heatmap', 'Cochez, notez vos jours, voyez la carte de chaleur', 'チェック・評価・ヒートマップ'],
    '纪念日历': ['紀念日曆', 'Anniversary calendars', 'Agendas des dates importantes', '記念日カレンダー'],
    '倒数、相册、纪念相机': ['倒數、相簿、紀念相機', 'Countdowns, albums and a keepsake camera', 'Comptes à rebours, albums et appareil photo souvenir', 'カウントダウン、アルバム、記念カメラ'],
    '桌面小组件': ['桌面小工具', 'Widgets', 'Widgets', 'ウィジェット'],
    '四种样式，三个平台都有': ['四種樣式，三個平台都有', 'Four styles, on three platforms', 'Quatre styles, sur trois plateformes', '4 種類、3 つのプラットフォームで'],
    '从其他日历导入': ['從其他日曆匯入', 'Import from other calendars', 'Importer depuis d’autres agendas', '他のカレンダーから読み込み'],
    '手机里的日历一键搬过来': ['手機裡的日曆一鍵搬過來', 'Bring over the calendars on your phone in one tap', 'Récupérez d’un geste les agendas de votre téléphone', 'スマホのカレンダーをワンタップで'],
    '用自己的存储同步': ['用自己的儲存空間同步', 'Sync with your own storage', 'Synchronisez avec votre propre stockage', '自分のストレージで同期'],
    '数据只在你自己的账号里，各端互通': ['資料只在你自己的帳號裡，各端互通', 'Your data stays in your own account, on every device', 'Vos données restent dans votre propre compte, sur tous vos appareils', 'データは自分のアカウントだけに、全端末で共有'],
    '浅色 / 深色外观，多款主题背景；简体中文、繁體中文、English、Français、日本語；12 / 24 小时制默认跟随地区。':
      ['淺色 / 深色外觀，多款主題背景；简体中文、繁體中文、English、Français、日本語；12 / 24 小時制預設跟隨地區。',
       'Light and dark appearance, several theme backgrounds; 简体中文, 繁體中文, English, Français, 日本語; 12- or 24-hour time follows your region.',
       'Apparence claire ou sombre, plusieurs fonds de thème ; 简体中文, 繁體中文, English, Français, 日本語 ; format 12 h / 24 h selon votre région.',
       'ライト / ダーク、テーマ背景いろいろ。简体中文・繁體中文・English・Français・日本語。12 / 24 時間制は地域に合わせて自動。'],
    '下载节律': ['下載節律', 'Download Cadence', 'Télécharger Cadence', 'Cadence をダウンロード'],
    '所有版本用同一份数据，可以随时换着用。网页一更新，各端打开就是新版。':
      ['所有版本共用同一份資料，可以隨時換著用。網頁一更新，各端打開就是新版。',
       'Every version uses the same data, so switch whenever you like. When the web app updates, every app is up to date the next time you open it.',
       'Toutes les versions utilisent les mêmes données : passez de l’une à l’autre quand vous voulez. Dès que la version web est mise à jour, toutes les apps le sont à la prochaine ouverture.',
       'どのバージョンも同じデータを使うので、いつでも乗り換えられます。Web 版が更新されると、各アプリも次に開いたときに最新になります。'],
    '其他版本': ['其他版本', 'Other versions', 'Autres versions', 'ほかのバージョン'],
    '网页版': ['網頁版', 'Web app', 'Version web', 'Web 版'],
    'iPhone 安装说明': ['iPhone 安裝說明', 'iPhone install guide', 'Installer sur iPhone', 'iPhone のインストール方法'],
    '安卓 APK': ['Android APK', 'Android APK', 'APK Android', 'Android APK'],
    '当前版本': ['目前版本', 'Current version', 'Version actuelle', '現在のバージョン'],
    '价格': ['價格', 'Price', 'Prix', '価格'],
    '免费，无广告、无内购': ['免費，無廣告、無內購', 'Free, no ads, no in-app purchases', 'Gratuit, sans publicité ni achat intégré', '無料・広告なし・アプリ内課金なし'],
    '数据与隐私': ['資料與隱私', 'Data & privacy', 'Données et confidentialité', 'データとプライバシー'],
    '不需要注册；数据在你的设备和你自己的 GitHub / WebDAV / iCloud 里。':
      ['不需要註冊；資料在你的裝置和你自己的 GitHub / WebDAV / iCloud 裡。', 'No sign-up. Your data lives on your devices and in your own GitHub / WebDAV / iCloud.',
       'Aucune inscription. Vos données restent sur vos appareils et dans votre propre GitHub / WebDAV / iCloud.', '登録は不要。データはあなたの端末と、あなた自身の GitHub / WebDAV / iCloud にあります。'],
    '隐私政策': ['隱私權政策', 'Privacy policy', 'Politique de confidentialité', 'プライバシーポリシー'],

    // —— 节律的下载区（dl.js）——
    '安装说明': ['安裝說明', 'Install guide', 'Guide d’installation', 'インストール方法'],
    '复制 AltStore 源': ['複製 AltStore 來源', 'Copy AltStore source', 'Copier la source AltStore', 'AltStore ソースをコピー'],
    '下载 .ipa': ['下載 .ipa', 'Download .ipa', 'Télécharger le .ipa', '.ipa をダウンロード'],
    '下载 .dmg': ['下載 .dmg', 'Download .dmg', 'Télécharger le .dmg', '.dmg をダウンロード'],
    '从源码编译': ['從原始碼編譯', 'Build from source', 'Compiler depuis les sources', 'ソースからビルド'],
    '下载 APK': ['下載 APK', 'Download APK', 'Télécharger l’APK', 'APK をダウンロード'],
    '更新记录': ['更新紀錄', 'Release notes', 'Notes de version', '更新履歴'],
    'iOS 26 及以上': ['iOS 26 或以上', 'iOS 26 or later', 'iOS 26 ou version ultérieure', 'iOS 26 以降'],
    'macOS 14 及以上': ['macOS 14 或以上', 'macOS 14 or later', 'macOS 14 ou version ultérieure', 'macOS 14 以降'],
    '安卓 12 及以上': ['Android 12 或以上', 'Android 12 or later', 'Android 12 ou version ultérieure', 'Android 12 以降'],
    '任何现代浏览器': ['任何現代瀏覽器', 'Any modern browser', 'Tout navigateur récent', '最新のブラウザ'],
    '约 1.5 MB': ['約 1.5 MB', 'About 1.5 MB', 'Environ 1,5 Mo', '約 1.5 MB'],
    '约 4 MB': ['約 4 MB', 'About 4 MB', 'Environ 4 Mo', '約 4 MB'],
    'APK · 约 21 MB': ['APK · 約 21 MB', 'APK · about 21 MB', 'APK · environ 21 Mo', 'APK · 約 21 MB'],
    '不用安装': ['不用安裝', 'No install needed', 'Sans installation', 'インストール不要'],
    '当前 1.4.2': ['目前 1.4.2', 'Version 1.4.2', 'Version 1.4.2', 'バージョン 1.4.2'],
    '液态玻璃界面、系统提醒、桌面小组件和原生纪念相机。不上 App Store，用你自己的免费 Apple ID 签名安装，后台自动续期。':
      ['液態玻璃介面、系統提醒、桌面小工具和原生紀念相機。不上 App Store，用你自己的免費 Apple ID 簽名安裝，背景自動續期。',
       'Liquid Glass design, system reminders, widgets and a native keepsake camera. Not on the App Store: you sign it with your own free Apple ID, and it renews itself in the background.',
       'Interface Liquid Glass, rappels système, widgets et appareil photo souvenir natif. Pas sur l’App Store : vous la signez avec votre propre identifiant Apple gratuit, et elle se renouvelle toute seule en arrière-plan.',
       'Liquid Glass のデザイン、システム通知、ウィジェット、ネイティブの記念カメラ。App Store にはありません。自分の無料 Apple ID で署名してインストールし、バックグラウンドで自動更新されます。'],
    '装好 AltStore（需要一台 Mac）或 SideStore': ['裝好 AltStore（需要一台 Mac）或 SideStore', 'Install AltStore (needs a Mac) or SideStore', 'Installez AltStore (nécessite un Mac) ou SideStore', 'AltStore（Mac が必要）または SideStore を入れる'],
    '在 Sources 里添加节律的源，找到「节律」安装': ['在 Sources 裡加入節律的來源，找到「節律」安裝', 'Add the Cadence source under Sources, then install Cadence', 'Ajoutez la source Cadence dans Sources, puis installez Cadence', 'Sources に Cadence のソースを追加して「Cadence」をインストール'],
    '第一次在 设置 → 隐私与安全性 打开「开发者模式」': ['第一次在 設定 → 隱私權與安全性 打開「開發者模式」', 'The first time, turn on Developer Mode in Settings → Privacy & Security', 'La première fois, activez le mode développeur dans Réglages → Confidentialité et sécurité', '初回は 設定 → プライバシーとセキュリティ で「デベロッパモード」をオン'],
    '窗口里是完整的节律，关掉窗口留在菜单栏，随手看本月和今天；桌面小组件、系统通知，macOS 26 上是液态玻璃。':
      ['視窗裡是完整的節律，關掉視窗留在選單列，隨手看本月和今天；桌面小工具、系統通知，macOS 26 上是液態玻璃。',
       'The full Cadence in a window. Close it and it stays in the menu bar with this month and today at a glance. Widgets, system notifications, and Liquid Glass on macOS 26.',
       'Tout Cadence dans une fenêtre. Fermez-la : l’app reste dans la barre des menus avec le mois et la journée d’un coup d’œil. Widgets, notifications système et Liquid Glass sur macOS 26.',
       'ウインドウには Cadence のすべて。閉じてもメニューバーに残り、今月と今日をすぐ確認できます。ウィジェット、システム通知、macOS 26 では Liquid Glass。'],
    '下载 .dmg，把 Cadence 拖进「应用程序」': ['下載 .dmg，把 Cadence 拖進「應用程式」', 'Download the .dmg and drag Cadence into Applications', 'Téléchargez le .dmg et glissez Cadence dans Applications', '.dmg をダウンロードして Cadence を「アプリケーション」へドラッグ'],
    '有新版时菜单栏会提示，点「更新…」即可': ['有新版時選單列會提示，點「更新…」即可', 'When there’s a new version the menu bar tells you; just click Update…', 'Quand une nouvelle version sort, la barre des menus vous le signale : cliquez sur Mettre à jour…', '新しいバージョンがあるとメニューバーに表示されるので「アップデート…」をクリック'],
    '原生的底部悬浮控件、桌面小组件（整月 / 今日 / 课表 / 纪念日）、系统精确闹钟提醒和后台同步，原生纪念相机。':
      ['原生的底部懸浮控制項、桌面小工具（整月 / 今日 / 課表 / 紀念日）、系統精確鬧鐘提醒和背景同步，原生紀念相機。',
       'Native floating controls, widgets (month, today, timetable, anniversaries), exact-alarm reminders, background sync and a native keepsake camera.',
       'Commandes flottantes natives, widgets (mois, aujourd’hui, emploi du temps, dates importantes), rappels à l’heure exacte, synchronisation en arrière-plan et appareil photo souvenir natif.',
       'ネイティブのフローティング操作、ウィジェット（月・今日・時間割・記念日）、正確なアラーム通知、バックグラウンド同期、ネイティブの記念カメラ。'],
    '下载 APK 并打开安装': ['下載 APK 並打開安裝', 'Download the APK and open it to install', 'Téléchargez l’APK et ouvrez-le pour l’installer', 'APK をダウンロードして開き、インストール'],
    '以后在 设置 → 安卓 App 里检查更新，覆盖安装不丢数据': ['之後在 設定 → Android App 裡檢查更新，覆蓋安裝不會遺失資料', 'Later, check for updates in Settings → Android app; updating keeps your data', 'Ensuite, vérifiez les mises à jour dans Réglages → App Android ; vos données sont conservées', '以降は 設定 → Android アプリ でアップデートを確認。上書きしてもデータは消えません'],
    '打开就能用，Windows、Linux、iPad 都可以；添加到主屏幕或安装成应用后，没有网络也能打开。':
      ['打開就能用，Windows、Linux、iPad 都可以；加入主畫面或安裝成應用程式後，沒有網路也能打開。',
       'Just open it, on Windows, Linux or iPad. Add it to your home screen or install it as an app, and it opens even offline.',
       'Ouvrez-la et c’est parti, sur Windows, Linux ou iPad. Ajoutez-la à l’écran d’accueil ou installez-la comme une app : elle s’ouvre même hors ligne.',
       '開くだけで使えます。Windows・Linux・iPad でも OK。ホーム画面に追加するかアプリとしてインストールすれば、オフラインでも開けます。'],
    '用浏览器打开网页版': ['用瀏覽器打開網頁版', 'Open the web app in your browser', 'Ouvrez la version web dans votre navigateur', 'ブラウザで Web 版を開く'],
    'Safari：分享 → 添加到主屏幕；Chrome / Edge：地址栏点「安装」': ['Safari：分享 → 加入主畫面；Chrome / Edge：網址列點「安裝」', 'Safari: Share → Add to Home Screen. Chrome / Edge: click Install in the address bar', 'Safari : Partager → Sur l’écran d’accueil. Chrome / Edge : cliquez sur Installer dans la barre d’adresse', 'Safari：共有 → ホーム画面に追加。Chrome / Edge：アドレスバーの「インストール」'],
    '设置 → 连接 GitHub，粘贴只勾了 gist 权限的令牌即可同步': ['設定 → 連結 GitHub，貼上只勾了 gist 權限的權杖即可同步', 'To sync: Settings → Connect GitHub, then paste a token with only the gist scope', 'Pour synchroniser : Réglages → Connecter GitHub, puis collez un jeton avec la seule autorisation gist', '同期は 設定 → GitHub に接続 で、gist 権限だけのトークンを貼り付け'],
    '为你推荐': ['為你推薦', 'Recommended for you', 'Recommandé pour vous', 'おすすめ'],
    '为你推荐 · 你在用': ['為你推薦 · 你在用', 'Recommended · you’re on', 'Recommandé · vous êtes sur', 'おすすめ · お使いの端末：'],
    '你选择的版本': ['你選擇的版本', 'Your pick', 'Votre choix', '選んだバージョン'],
    '推荐': ['推薦', 'For you', 'Pour vous', 'おすすめ'],
    '回到推荐': ['回到推薦', 'Back to recommended', 'Revenir à la recommandation', 'おすすめに戻る'],
    '已复制': ['已複製', 'Copied', 'Copié', 'コピーしました'],
    '复制这个地址：': ['複製這個網址：', 'Copy this address:', 'Copiez cette adresse :', 'このアドレスをコピー：'],
    '安卓手机': ['Android 手機', 'Android phone', 'téléphone Android', 'Android スマホ'],

    // —— 月账本 ——
    '月账本：装在手机主屏幕上的个人记账网页 App。按月记录收支和资产，按季度、按年查看统计，长期追踪独秀指数。':
      ['月帳本：裝在手機主畫面上的個人記帳網頁 App。按月記錄收支和資產，按季度、按年查看統計，長期追蹤獨秀指數。',
       'Monthly Ledger: a personal budgeting web app for your home screen. Record income, spending and assets by month, see quarterly and yearly stats, and track the Duxiu Index over time.',
       'Monthly Ledger : une app web de budget personnel pour votre écran d’accueil. Notez revenus, dépenses et patrimoine chaque mois, consultez les bilans trimestriels et annuels, et suivez l’indice Duxiu dans le temps.',
       '月次帳簿：ホーム画面に置く個人向け家計簿 Web アプリ。毎月の収支と資産を記録し、四半期・年ごとの統計を見て、独秀指数を長期的に追えます。'],
    '装在主屏幕上的记账本：每月记一笔总账，或者一笔一笔记；看结余、储蓄率和独秀指数怎么变。没有服务器，数据只在你自己手里。':
      ['裝在主畫面上的記帳本：每月記一筆總帳，或者一筆一筆記；看結餘、儲蓄率和獨秀指數怎麼變。沒有伺服器，資料只在你自己手裡。',
       'A ledger on your home screen: enter one monthly total, or log each entry. Watch your balance, savings rate and Duxiu Index change. No server: your data stays with you.',
       'Un carnet de comptes sur votre écran d’accueil : un total par mois, ou chaque dépense une à une. Suivez votre solde, votre taux d’épargne et l’indice Duxiu. Aucun serveur : vos données restent chez vous.',
       'ホーム画面の家計簿。毎月の合計をひとつ入れるか、1 件ずつ記録。収支・貯蓄率・独秀指数の変化が見えます。サーバーはなく、データは自分の手元だけ。'],
    '安装到主屏幕': ['安裝到主畫面', 'Add to home screen', 'Ajouter à l’écran d’accueil', 'ホーム画面に追加'],
    '两种记账方式': ['兩種記帳方式', 'Two ways to keep track', 'Deux façons de compter', '2 つの記録方法'],
    '每月记一次总数，或一笔一笔记、自动汇总': ['每月記一次總數，或一筆一筆記、自動匯總', 'One total a month, or entry by entry with automatic totals', 'Un total par mois, ou ligne par ligne avec totaux automatiques', '毎月の合計を 1 回、または 1 件ずつ記録して自動集計'],
    '月 / 季 / 年统计': ['月 / 季 / 年統計', 'Monthly, quarterly, yearly stats', 'Bilans mensuels, trimestriels, annuels', '月・四半期・年の統計'],
    '结余、储蓄率、净资产，和上月、去年比': ['結餘、儲蓄率、淨資產，和上月、去年比', 'Balance, savings rate and net worth, vs last month and last year', 'Solde, taux d’épargne et patrimoine net, comparés au mois et à l’année d’avant', '収支・貯蓄率・純資産を前月・前年と比較'],
    '≥ 1，说明靠自己就撑得起想要的生活': ['≥ 1，代表靠自己就撐得起想要的生活', '≥ 1 means you can fund the life you want on your own', '≥ 1 : vous financez seul la vie que vous voulez', '1 以上なら、自分の力で理想の暮らしを支えられる'],
    '灵感来自一位 YouTube 创作者': ['靈感來自一位 YouTube 創作者', 'Inspired by a YouTube creator', 'Inspiré par un créateur YouTube', 'ある YouTube クリエイターに着想を得ました'],
    '多个账本': ['多個帳本', 'Multiple ledgers', 'Plusieurs carnets', '複数の帳簿'],
    '日常、旅行、副业，互不影响': ['日常、旅行、副業，互不影響', 'Everyday, travel, side gig, each kept separate', 'Quotidien, voyage, activité annexe : chacun à part', '日常・旅行・副業、それぞれ独立'],
    '手写签名': ['手寫簽名', 'Handwritten signature', 'Signature manuscrite', '手書きサイン'],
    '横屏手写，带钢笔笔锋': ['橫向手寫，帶鋼筆筆鋒', 'Sign in landscape, with fountain-pen strokes', 'Signez à l’horizontale, avec un trait de stylo plume', '横向きで手書き、万年筆のような線'],
    '顺手的输入': ['順手的輸入', 'Easy input', 'Saisie facile', '入力しやすい'],
    '自带数字键盘，金额可以直接粘贴': ['內建數字鍵盤，金額可以直接貼上', 'Built-in number pad; paste amounts directly', 'Pavé numérique intégré ; collez directement les montants', '専用のテンキー、金額はそのまま貼り付け'],
    '离线可用': ['離線可用', 'Works offline', 'Fonctionne hors ligne', 'オフラインで使える'],
    '装到主屏幕，没网也能记': ['裝到主畫面，沒網路也能記', 'Add it to your home screen and log without a connection', 'Sur l’écran d’accueil, notez même sans connexion', 'ホーム画面に追加すれば圏外でも記録'],
    '数据只在你手里': ['資料只在你手裡', 'Your data stays with you', 'Vos données restent chez vous', 'データは手元だけ'],
    '没有服务器；可选加密同步到你自己的 GitHub，换手机前导出备份': ['沒有伺服器；可選加密同步到你自己的 GitHub，換手機前匯出備份', 'No server. Optionally sync, encrypted, to your own GitHub, and export a backup before switching phones', 'Aucun serveur. Synchronisation chiffrée facultative vers votre propre GitHub ; exportez une sauvegarde avant de changer de téléphone', 'サーバーなし。自分の GitHub への暗号化同期も選べます。機種変更前はバックアップを書き出し'],
    '浅色 / 深色 / 跟随系统；简体中文、繁體中文、English、日本語。当前为 0.24 测试版，功能和数据格式仍可能调整。':
      ['淺色 / 深色 / 跟隨系統；简体中文、繁體中文、English、日本語。目前為 0.24 測試版，功能和資料格式仍可能調整。',
       'Light, dark or system appearance; 简体中文, 繁體中文, English, 日本語 (no French yet). This is the 0.24 beta: features and the data format may still change.',
       'Apparence claire, sombre ou système ; 简体中文, 繁體中文, English, 日本語 (pas encore en français). Version bêta 0.24 : fonctions et format des données peuvent encore évoluer.',
       'ライト / ダーク / システム。简体中文・繁體中文・English・日本語。現在は 0.24 ベータ版で、機能やデータ形式は変わる可能性があります。'],
    '装到主屏幕': ['裝到主畫面', 'Add to your home screen', 'Ajouter à l’écran d’accueil', 'ホーム画面に追加'],
    '月账本是网页 App，不用去应用商店；装好后从主屏幕图标打开，没有网络也能用。':
      ['月帳本是網頁 App，不用去 App Store；裝好後從主畫面圖示打開，沒有網路也能用。',
       'Monthly Ledger is a web app, so there’s no app store involved. Once added, open it from the home screen icon; it works offline too.',
       'Monthly Ledger est une app web : pas besoin de boutique d’apps. Une fois ajoutée, ouvrez-la depuis l’icône de l’écran d’accueil ; elle fonctionne aussi hors ligne.',
       '月次帳簿は Web アプリなので、アプリストアは不要です。追加したらホーム画面のアイコンから開けば、オフラインでも使えます。'],
    '其他设备': ['其他裝置', 'Other devices', 'Autres appareils', 'ほかの端末'],
    '从主屏幕图标打开和在浏览器标签页里打开，数据是分开保存的。': ['從主畫面圖示打開和在瀏覽器分頁裡打開，資料是分開儲存的。', 'Data opened from the home screen icon and data in a browser tab are stored separately.', 'Les données ouvertes depuis l’icône et celles d’un onglet du navigateur sont enregistrées séparément.', 'ホーム画面のアイコンから開いた場合とブラウザのタブで開いた場合で、データは別々に保存されます。'],
    // 月账本的安装区（ledger.html 里的 SX_DL）
    'iPhone / iPad': ['iPhone / iPad', 'iPhone / iPad', 'iPhone / iPad', 'iPhone / iPad'],
    '电脑': ['電腦', 'computer', 'ordinateur', 'パソコン'],
    '电脑（Windows 等）': ['電腦（Windows 等）', 'Computer (Windows, etc.)', 'Ordinateur (Windows, etc.)', 'パソコン（Windows など）'],
    'Safari 或 Chrome': ['Safari 或 Chrome', 'Safari or Chrome', 'Safari ou Chrome', 'Safari または Chrome'],
    'Chrome 或 Edge': ['Chrome 或 Edge', 'Chrome or Edge', 'Chrome ou Edge', 'Chrome または Edge'],
    'Safari、Chrome 或 Edge': ['Safari、Chrome 或 Edge', 'Safari, Chrome or Edge', 'Safari, Chrome ou Edge', 'Safari・Chrome・Edge'],
    '0.24 测试版': ['0.24 測試版', '0.24 beta', 'bêta 0.24', '0.24 ベータ版'],
    '在 Safari 里打开月账本，按 App 里的图文引导添加到主屏幕，像普通 App 一样从桌面打开。':
      ['在 Safari 裡打開月帳本，按 App 裡的圖文引導加入主畫面，像一般 App 一樣從桌面打開。',
       'Open Monthly Ledger in Safari and follow the illustrated guide in the app to add it to your home screen. Then open it like any other app.',
       'Ouvrez Monthly Ledger dans Safari et suivez le guide illustré de l’app pour l’ajouter à l’écran d’accueil. Ouvrez-la ensuite comme n’importe quelle app.',
       'Safari で月次帳簿を開き、アプリ内の図解ガイドに沿ってホーム画面に追加。あとは普通のアプリのようにホーム画面から開けます。'],
    '用 Safari 打开月账本': ['用 Safari 打開月帳本', 'Open Monthly Ledger in Safari', 'Ouvrez Monthly Ledger dans Safari', 'Safari で月次帳簿を開く'],
    '按月账本里的图文引导：分享 →「添加到主屏幕」': ['按月帳本裡的圖文引導：分享 →「加入主畫面」', 'Follow the guide in the app: Share → Add to Home Screen', 'Suivez le guide de l’app : Partager → Sur l’écran d’accueil', 'アプリのガイドどおり：共有 →「ホーム画面に追加」'],
    '以后从主屏幕的图标打开': ['之後從主畫面的圖示打開', 'From then on, open it from the home screen icon', 'Ensuite, ouvrez-la depuis l’icône de l’écran d’accueil', '以後はホーム画面のアイコンから開く'],
    '在 Chrome 里打开，点月账本菜单里的「安装到主屏幕」，在系统弹窗里确认就装好了。':
      ['在 Chrome 裡打開，點月帳本選單裡的「安裝到主畫面」，在系統彈窗裡確認就裝好了。',
       'Open it in Chrome, tap “Install app” in the Monthly Ledger menu, and confirm in the system prompt.',
       'Ouvrez-la dans Chrome, touchez « Install app » dans le menu de Monthly Ledger, puis confirmez.',
       'Chrome で開き、月次帳簿のメニューの「ホーム画面に追加」をタップ、確認画面で追加すれば完了です。'],
    '用 Chrome 或 Edge 打开月账本': ['用 Chrome 或 Edge 打開月帳本', 'Open Monthly Ledger in Chrome or Edge', 'Ouvrez Monthly Ledger dans Chrome ou Edge', 'Chrome か Edge で月次帳簿を開く'],
    '月账本菜单 →「安装到主屏幕」，在弹窗里确认': ['月帳本選單 →「安裝到主畫面」，在彈窗裡確認', 'Monthly Ledger menu → “Install app”, then confirm', 'Menu de Monthly Ledger → « Install app », puis confirmez', '月次帳簿のメニュー →「ホーム画面に追加」、確認画面で追加'],
    '以后从桌面图标打开': ['之後從桌面圖示打開', 'From then on, open it from the icon', 'Ensuite, ouvrez-la depuis son icône', '以後はアイコンから開く'],
    '可以添加到程序坞，像一个独立的 App 一样打开。': ['可以加入 Dock，像一個獨立的 App 一樣打開。', 'Add it to the Dock and open it like a standalone app.', 'Ajoutez-la au Dock et ouvrez-la comme une app à part entière.', 'Dock に追加すれば、独立したアプリのように開けます。'],
    '菜单栏「文件」→「添加到程序坞」': ['選單列「檔案」→「加入 Dock」', 'Menu bar: File → Add to Dock', 'Barre des menus : Fichier → Ajouter au Dock', 'メニューバーの「ファイル」→「Dock に追加」'],
    '用 Chrome / Edge 的话：月账本菜单 →「安装到主屏幕」': ['用 Chrome / Edge 的話：月帳本選單 →「安裝到主畫面」', 'In Chrome / Edge: Monthly Ledger menu → “Install app”', 'Dans Chrome / Edge : menu de Monthly Ledger → « Install app »', 'Chrome / Edge の場合：月次帳簿のメニュー →「ホーム画面に追加」'],
    '在浏览器里安装成应用，有自己的窗口和图标。': ['在瀏覽器裡安裝成應用程式，有自己的視窗和圖示。', 'Install it from the browser as an app with its own window and icon.', 'Installez-la depuis le navigateur comme une app, avec sa propre fenêtre et son icône.', 'ブラウザからアプリとしてインストールすると、専用のウインドウとアイコンになります。'],
    '以后从开始菜单或桌面打开': ['之後從開始選單或桌面打開', 'From then on, open it from the Start menu or desktop', 'Ensuite, ouvrez-la depuis le menu Démarrer ou le bureau', '以後はスタートメニューやデスクトップから開く'],

    // —— 示意图里的字（tools/render.py 按语言渲染）；同一个词在示意图里要更短的，元素上写 data-k 指定另一个键 ——
    '课表·组件': ['課表', 'Classes', 'Cours', '時間割'],
    '十一月': ['十一月', 'November', 'Novembre', '11月'],
    '十月': ['十月', 'October', 'Octobre', '10月'],
    '第 45 周': ['第 45 週', 'Week 45', 'Semaine 45', '第 45 週'],
    '已逾期 1 · 全部移到今天': ['已逾期 1 · 全部移到今天', '1 overdue · Move all to today', '1 en retard · Tout reporter', '期限切れ 1 · すべて今日へ'],
    '交项目报告': ['交專案報告', 'Hand in report', 'Rendre le rapport', '報告書を提出'],
    '健身': ['健身', 'Workout', 'Sport', 'ジム'],
    '买牛奶': ['買牛奶', 'Buy milk', 'Acheter du lait', '牛乳を買う'],
    '全天': ['全天', 'All day', 'Journée', '終日'],
    '提前 1 天 · 1 小时': ['提前 1 天 · 1 小時', '1 day · 1 hour before', '1 jour · 1 heure avant', '1 日前 · 1 時間前'],
    '拍照导入': ['拍照匯入', 'Import photo', 'Importer une photo', '写真で取り込み'],
    '低': ['低', 'Low', 'Bas', '低'],
    '高': ['高', 'High', 'Haut', '高'],
    '天后 · 生日': ['天後 · 生日', 'Birthday', 'Anniversaire', '日後 · 誕生日'],
    '天 · 在一起': ['天 · 在一起', 'Together', 'Ensemble', '日 · 付き合って'],
    '天后 · 旅行': ['天後 · 旅行', 'Trip', 'Voyage', '日後 · 旅行'],
    '今天': ['今天', 'Today', 'Aujourd’hui', '今日'],
    '还有': ['還有', 'In', 'Dans', 'あと'],
    '天': ['天', 'days', 'jours', '日'],
    '谷歌': ['Google', 'Google', 'Google', 'Google'],
    '月底存款': ['月底存款', 'Savings', 'Épargne', '月末貯蓄'],
    '工资': ['薪資', 'Salary', 'Salaire', '給与'],
    '午饭': ['午餐', 'Lunch', 'Déjeuner', '昼食'],
    '地铁': ['捷運', 'Metro', 'Métro', '地下鉄'],
    '房租': ['房租', 'Rent', 'Loyer', '家賃'],
    '能力收入 ÷ 理想生活成本': ['能力收入 ÷ 理想生活成本', 'Earned income ÷ ideal cost of living', 'Revenu gagné ÷ coût de vie idéal', '稼得収入 ÷ 理想の生活費'],
    '旅行': ['旅行', 'Travel', 'Voyage', '旅行'],
    '副业': ['副業', 'Side gig', 'Annexe', '副業'],
    '日常': ['日常', 'Everyday', 'Quotidien', '日常'],
    '本月结余': ['本月結餘', 'Balance this month', 'Solde du mois', '今月の収支'],
    '粘贴': ['貼上', 'Paste', 'Coller', '貼り付け'],
    '没有网络也能用': ['沒有網路也能用', 'Works without a connection', 'Marche sans connexion', 'オフラインでも使える'],
    '你的设备': ['你的裝置', 'Your device', 'Votre appareil', 'あなたの端末'],
    '同步密码加密': ['同步密碼加密', 'Password-encrypted', 'Chiffré', 'パスワードで暗号化'],
    '你自己的私密 Gist': ['你自己的私密 Gist', 'Your own secret Gist', 'Votre Gist secret', 'あなたの非公開 Gist'],
    '也可以随时导出备份': ['也可以隨時匯出備份', 'Export a backup any time', 'Sauvegarde à tout moment', 'いつでもバックアップ可能']
  };
  // 带版本号之类会变的
  var P = [
    [/^Cadence · ([\d.]+)$/, function (m, l) { return l === 't' ? m[0] : m[1]; }],
    [/^Monthly Ledger · ([\d.]+) 测试版$/, function (m, l) { return { t: 'Monthly Ledger · ' + m[1] + ' 測試版', en: m[1] + ' beta', fr: 'bêta ' + m[1], ja: m[1] + ' ベータ版' }[l]; }]
  ];

  function pick() {
    try { var s = localStorage.getItem('sx-lang'); if (s && (COL[s] !== undefined || s === 's')) return s; } catch (e) {}
    var q = /[?&]lang=(\w+)/.exec(location.search); if (q && (COL[q[1]] !== undefined || q[1] === 's')) return q[1];
    var ls = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'zh-CN'];
    for (var i = 0; i < ls.length; i++) {
      var l = String(ls[i]).toLowerCase();
      if (/^zh-(tw|hk|mo)|hant/.test(l)) return 't';
      if (/^zh/.test(l)) return 's';
      if (/^ja/.test(l)) return 'ja';
      if (/^fr/.test(l)) return 'fr';
      if (/^en/.test(l)) return 'en';
    }
    return 'en';
  }
  var L = window.SX_LANG || pick(), c = COL[L];
  var root = document.documentElement;
  root.lang = LANGS.filter(function (x) { return x[0] === L; })[0][1];
  root.setAttribute('data-lang', L);

  function T(s) {
    if (c === undefined || !s) return s;
    var k = s.trim(), r = D[k];
    if (!r) for (var i = 0; i < P.length; i++) { var m = P[i][0].exec(k); if (m) { r = [0, 0, 0, 0]; r[c] = P[i][1](m, L); break; } }
    return r ? s.replace(k, r[c]) : s;
  }
  window.sxT = T;
  window.sxLang = L;
  window.SX_LANGS = LANGS;

  function translate(node) {
    var w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (n) {
      var p = n.parentNode && n.parentNode.nodeName;
      if (p === 'SCRIPT' || p === 'STYLE') return;
      var k = n.parentNode.getAttribute && n.parentNode.getAttribute('data-k');
      var v = k && D[k] && c !== undefined ? n.nodeValue.replace(n.nodeValue.trim(), D[k][c]) : T(n.nodeValue);
      if (v !== n.nodeValue) n.nodeValue = v;
    });
    [].forEach.call(node.querySelectorAll ? node.querySelectorAll('[alt],[aria-label],[title]') : [], function (el) {
      ['alt', 'aria-label', 'title'].forEach(function (a) { var v = el.getAttribute(a); if (v) el.setAttribute(a, T(v)); });
    });
  }
  window.sxTranslate = translate;

  if (c === undefined) return;          // 简体中文：页面原文就是
  // 换完字之前先不显示，免得先闪一下中文
  var hide = document.createElement('style');
  hide.textContent = 'body{visibility:hidden}';
  document.head.appendChild(hide);
  document.addEventListener('DOMContentLoaded', function () {
    document.title = T(document.title);
    var md = document.querySelector('meta[name="description"]'); if (md) md.content = T(md.content);
    translate(document.body);
    // 示意图换成这个语言的那一套
    [].forEach.call(document.querySelectorAll('.ill-img source, .ill-img img'), function (el) {
      ['srcset', 'src'].forEach(function (a) { var v = el.getAttribute(a); if (v) el.setAttribute(a, v.replace(/-s-(light|dark)-/g, '-' + L + '-$1-')); });
    });
    hide.remove();
  });
})();
