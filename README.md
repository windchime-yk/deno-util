# deno-util
Deno環境で私が使いそうなもの  
~~バージョニングする予定はない~~ → 破壊的変更で依存先が壊れる危険性があるためバージョニングをする。

## 使い方
名前付きエクスポートなので、各個をインポートする
``` typescript
import { extractObjectValue } from 'https://github.com/windchime-yk/deno-util/raw/main/modules/object.ts';
```