# ImmutableJS と Typescript を使ったエンティティの定義

## 背景
React プロジェクトにて、WebApi のレスポンスを型定義したい。同時にイミュータブルにもしたい。
ImmutableJS を使って型定義すると Map 型になってしまうし、Typescript で定義すると Immutable でなくなってしまう。  
双方の利点を活かした型を定義したい。

## 参考

[Immutable.js Records in TypeScript](https://spin.atomicobject.com/2016/11/30/immutable-js-records-in-typescript/)
