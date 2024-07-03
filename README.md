# `@whyk/utils`
私が個人的に使いそうなもの。

## 使い方
JSRからパッケージを追加
``` bash
deno add @whyk/utils
```
名前付きエクスポートなので、各個をインポートする。
``` typescript
import { extractObjectValue } from '@whyk/utils/object';
```

## 内訳
### `@whyk/utils/file`
ファイルの読み込みや書き込み、指定したディレクトリから再帰的にファイル名を取得する関数が内包されている。

```
https://jsr.io/@whyk/utils/file
```

### `@whyk/utils/object`
Objectの抽出や絞り込みをする関数が内包されている。

```
https://jsr.io/@whyk/utils/object
```

### `@whyk/utils/server`
サーバーに関係する関数が内包されている。  
今はHTTPステータスしかない。

```
https://jsr.io/@whyk/utils/server
```

### `@whyk/utils/text`
テキストの変形や日付の整形関数が内包されている。

```
https://jsr.io/@whyk/utils/text
```

## CLIについて
Deno Deployだと対話的スクリプトを拾ってデプロイが停止してしまうため、ここに仮置きする。

``` bash
deno install -n deno-util --allow-read --allow-write https://jsr.io/@whyk/utils/cli
```

### Denoばた会議 Monthlyレポートテンプレート出力
開催回数、開催日、connpassリンクを対話的に取得してテンプレートを生成する。
``` bash
deno-util dcr
```
