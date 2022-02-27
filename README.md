# deno-util
Deno環境で私が使いそうなもの。  
~~バージョニングする予定はない。~~ → 破壊的変更で依存先が壊れる危険性があるためバージョニングをする。

## 使い方
名前付きエクスポートなので、各個をインポートする。
``` typescript
import { extractObjectValue } from 'https://pax.deno.dev/windchime-yk/deno-util@v1.0.0/object.ts';
```

## 内訳
### `file.ts`
ファイルの読み込みや書き込み、指定したディレクトリから回帰的にファイル名を取得する関数が内包されている。

```
https://pax.deno.dev/windchime-yk/deno-util@v1.0.0/file.ts
```

### `object.ts`
Objectの抽出や絞り込みをする関数が内包されている。

```
https://pax.deno.dev/windchime-yk/deno-util@v1.0.0/object.ts
```

### `server.ts`
サーバーに関係する関数が内包されている。  
今はHTTPステータスしかない。

```
https://pax.deno.dev/windchime-yk/deno-util@v1.0.0/server.ts
```

### `text.ts`
テキストの変形や日付の整形関数が内包されている。

```
https://pax.deno.dev/windchime-yk/deno-util@v1.0.0/text.ts
```

## CLIについて
Deno Deployだと対話的スクリプトを拾ってデプロイが停止してしまうため、Denoのスクリプトをここに仮置きする。

``` bash
deno install -n deno-util --allow-read --allow-write https://pax.deno.dev/windchime-yk/deno-util@v1.0.0/cli.ts
```

### Denoばた会議 Monthlyレポートテンプレート出力
開催回数、開催日、Connpassリンクを対話的に取得してテンプレートを生成する。
```
deno-util dcr
```
