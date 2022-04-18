# Wantedly Todos Front
## 実行環境
- Node.js: v16.8.0
- React.js(TypeScript)

## 実行手順
※wantedly-todos-backのサーバーをあらかじめ起動してください。
1. 環境変数を設定します。
```
cp .env.sample .env
```
2. パッケージをインストールします。
```
yarn
```
3. 起動します。
```
yarn start
```
## アプリ説明
### TODO画面
右下のボタンを押すことでTODO作成モーダルが開き、TODOを作成することができます。
TODOには複数のタグをつけることができ、すでに追加されているタグの中から選択することができます。
編集アイコンをクリックすることでによってTDOOを編集することも可能です。
ゴミ箱アイコンをクリックすることでTODOをアーカイブすることができます。アーカイブされたTODOはゴミ箱ページで確認することができます。
チェックボックスをクリックすることにより、TODOを完了することができます。なお、チェックを入れてから一定時間変更可能な時間を設けており、その時間内にチェックを外すことでTODOの完了をキャンセルすることが可能となっています。また、TODOはドラッグにより順番を入れ替えることが可能となっています。変更された順番はデータベースに反映されるため、アプリを閉じた後でも順番は保存されるようになっております。
- タスクがある場合
<img width="1778" alt="image" src="https://user-images.githubusercontent.com/82492270/163829652-f754f4c8-51f1-4d2e-befd-6a353f9fa7aa.png">

- タスクがない場合
<img width="1779" alt="image" src="https://user-images.githubusercontent.com/82492270/163829042-f681482c-02d6-4657-9f79-928463fd67a0.png">

- TODO作成、編集
<img width="1787" alt="image" src="https://user-images.githubusercontent.com/82492270/163829832-53fc3bc2-75e7-4e4b-bfd1-d7af48bb4564.png">

### タグ画面
タグページでタグの一覧を確認することができます。タグは紐づいているTODOが多い順にソートされて表示されます。
右下のボタンをクリックすることでタグ作成モーダルが開き、新しいタグを作成することができます。タグはカラーピッカーを使用して自由な色を選択することができます。
また、即座にプレビューが表示されるので、自分が納得するまで色を変更し確認することが可能です。
各タグカードをクリックすることで編集を行うことが可能で、削除することもできます。
- タグ一覧
<img width="1778" alt="image" src="https://user-images.githubusercontent.com/82492270/163831357-f9f12efe-1100-44e5-8381-c12cee7d2bce.png">

- タグ作成
<img width="1792" alt="image" src="https://user-images.githubusercontent.com/82492270/163831963-527ddad9-a931-4346-bb65-f429f830b7aa.png">

- タグ編集
<img width="1792" alt="image" src="https://user-images.githubusercontent.com/82492270/163832046-ecc969fd-79bb-4a6d-ae4f-99902a4b18e7.png">

### 履歴画面
### ゴミ箱画面
## 工夫した点
