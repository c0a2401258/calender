# Calendar App

## 概要

大学の講義・課題・予定を一括で管理するカレンダーアプリ

### 主な機能

- ログイン
- 月ごとのカレンダー表示
- 日ごとの予定表示
- 予定追加・編集・削除
- 講義管理
- 課題管理
- プライベート・仕事の切り替え
- 通知機能
- 最終目標：Moodleから予定を自動取得

---

# 開発ルール

- mainブランチでは直接作業しない
- 必ず自分のブランチで作業する
- ブランチを切り替える前に必ずcommitする
- 完成したらPull Requestを作成する
- Pull RequestをMergeしてから他のメンバーは最新のmainを取り込む
- 担当外のファイルを編集する場合は事前に相談する

---

# ブランチ名

A：feature/calendar  
B：feature/sidebar  
C：geature/backend  

---

# 開発環境

- Windows 11
- XAMPP
- PHP 8.x
- MySQL
- HTML
- CSS
- JavaScript
- Git
- GitHub
- Visual Studio Code

---

# フォルダ構成

```
calendar-app/
│
├── index.html
├── login.html
│
├── css/
│   ├── common.css
│   ├── login.css
│   ├── calendar.css
│   ├── sidebar.css
│   ├── schedule.css
│   ├── popup.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── login.js
│   ├── calendar.js
│   ├── schedule.js
│   ├── sidebar.js
│   ├── lecture.js
│   ├── assignment.js
│   ├── notification.js
│   ├── api.js
│   └── user.js
│
├── php/
│   ├── db.php
│   ├── login.php
│   ├── schedule.php
│   ├── lecture.php
│   ├── assignment.php
│   └── user.php
│
├── images/
│
└── README.md
```

---

# 担当

## A

### HTML

- メイン画面

### CSS

- common.css
- calendar.css
- responsive.css

### JavaScript

- calendar.js

---

## B

### HTML

- ログイン画面
- サイドバー
- 日ごとの予定画面
- ポップアップ

### CSS

- login.css
- sidebar.css
- schedule.css
- popup.css

### JavaScript

- login.js
- sidebar.js
- schedule.js
- lecture.js
- assignment.js
- notification.js
- user.js

---

## C

### JavaScript

- app.js
- api.js

### PHP

- db.php
- login.php
- schedule.php
- lecture.php
- assignment.php
- user.php

### データベース

- MySQL

---

# GitHubの使い方

## 最初だけ

```bash
git clone リポジトリURL
```

---

## ブランチ作成

```bash
git branch feature/ブランチ名
```

例

```bash
git branch feature/calendar
```

---

## 作業後

```bash
git add .
git commit -m "変更内容"
git push
```

---

## GitHub

Push後

```
Compare & Pull Request
```

↓

```
Merge Pull Request
```

↓

```
Confirm Merge
```

---

## 他メンバーの変更を取り込む

```bash
git branch main
git pull

git branch feature/自分のブランチ
git merge main
```

---
# 開発の流れ

## ① 最新のmainブランチへ移動

```bash
git branch main
```

---

## ② 最新のmainを取得

```bash
git pull origin main
```

これで他のメンバーがMergeした内容を取得します。

---

## ③ 自分のブランチへ移動

例（A担当）

```bash
git branch feature/calendar
```

例（B担当）

```bash
git branch feature/sidebar
```

例（C担当）

```bash
git branch feature/backend
```

---

## ④ mainの最新内容を取り込む

```bash
git merge main
```

これで他のメンバーの変更を自分のブランチへ反映できます。

---

## ⑤ 開発する

例

```
calendar.js
calendar.css
index.html
```

などを編集する。

---

## ⑥ 変更を確認

```bash
git status
```

変更されたファイルを確認できます。

---

## ⑦ 変更を追加

すべて追加する場合

```bash
git add .
```

または

```bash
git add calendar.js
```

のように個別でもOK。

---

## ⑧ コミットする

```bash
git commit -m "カレンダー画面を作成"
```

例

```bash
git commit -m "サイドバー追加"
```

```bash
git commit -m "予定追加機能作成"
```

---

## ⑨ GitHubへ送信

```bash
git push
```

初めてPushするブランチだけ

```bash
git push -u origin feature/calendar
```

---

## ⑩ GitHubでPull Requestを作成

GitHubを開く

↓

「Compare & pull request」

↓

「Create Pull Request」

↓

「Merge Pull Request」

↓

「Confirm Merge」

これでmainへ反映されます。

---

## ⑪ 他のメンバーは最新を取得

```bash
git checkout main
```

↓

```bash
git pull origin main
```

↓

```bash
git checkout feature/自分のブランチ
```

↓

```bash
git merge main
```

これで最新状態になります。

---

# コーディングルール

## HTML

- インデントを揃える
- コメントを書く

---

## CSS

- ファイルごとに役割を分ける
- common.cssには共通デザインのみ

---

## JavaScript

- 機能ごとに関数を分ける
- API通信は api.js のみ

---

## PHP

- データベースとの通信のみ

---

# ブランチ名

```
feature/calendar
feature/sidebar
feature/backend
```

---

# コミットメッセージ例

```
ログイン画面作成

サイドバー追加

カレンダー表示

通知機能追加

バグ修正
```

---

# 今後の予定

- ログイン機能
- メイン画面
- 予定機能
- 課題機能
- 通知機能
- Moodle連携
- アプリ化（Capacitor）