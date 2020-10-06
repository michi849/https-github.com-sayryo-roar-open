# roar-open
スポーツチャットWebアプリ(REST API + SPA)
公開用

# function
ログイン認証
チーム検索・加入
リアルタイムグループチャット
最新ニュースまとめ

# Author
王、村上、大村、栗栖

# Requirement
・Java8
・Spring Boot2.3
　ビルドツール：maven
　DB接続方法：jpa
　コード短縮ライブラリ：lombok
　(自動ビルドツール：spring boot devtools)
・HTML、CSS(Flexbox)
・Java Script
・React
  React-Router
  axios
・Material-UI
・VScode
・Git
・Github
・AWS（EC2,RDS）
・MySQL
・Firebase

# Note
以下２ファイルをセキュリティ上により、非公開

1.src/main/resources/application.properties
```
spring.data.rest.base-path=/api
spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mysql:XXXXXXXXXXXXXXXXXXXX&characterEncoding=utf8&serverTimezone=JST
spring.datasource.username=XXXXXX
spring.datasource.password=XXXXXXX
```
(spring.jpa.hibernate.ddl-auto=updeteへ変更でentityファイル内容に適応したテーブルが自動作成される。)

2.src/main/frontend/src/firebase/config.js
```
export const firebaseConfig = {
  apiKey: XXXXXXXX
  XXXXXX: XXXXX
  XXX...
};
```
(firebaseのプロジェクト構成)
