// import * as Im from "immutable";
import { List, Record } from "immutable";
// const { List, Record } = require("immutable");

// 例として Trello のカードをイメージ
export interface ICard {
  id?: string;
  title?: string;
  description?: string;
  comments?: List<Comment>;
  due?: Date;
  nested?: {
    item1?: string;
    item2?: number;
    item3?: boolean;
  }
}

export class Comment {
  constructor(public id: string, public text: string, public createdAt: Date, public editedAt: Date) {}
}

// Record の仕様上、defaultValues に項目がないと
// コンストラクタで渡しても undefined になるので注意
const defaultValues: ICard = {
  id: null,
  title: null,
  description: null,
  comments: null,
  due: null,
  nested: {
    item1: null,
    item2: null,
    item3: null,
  },
};

export class Card extends Record(defaultValues) {

  static validate(values: ICard): ICard {
    if (!values.title) {
      throw new Error(`title は必須です`);
    }
    return values;
  }

  constructor(values?: ICard) {
    values ? super(Card.validate(values)) : super();
  }

  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly comments: List<Comment>;
  readonly due: Date;
  readonly nested: {
    readonly item1: string;
    readonly item2: number;
    readonly item3: boolean;
  };

  with(values: ICard) {
    return this.mergeDeepWith(
      (oldVal, newVal, key) => {
        if (key === "nested") {
          // immutable の merge 系のメソッドは内部的に Immutable.fromJS をかけていて、
          // POJO な子要素も強制的に immutable 化されてしまう。
          // 結果、一度でも merge を介すと、nested.item1 のような形式ではアクセスできなくなる。
          // (undefined が返される。nested.get("item1") のように書けば値を取れる)
          // これでは不便なため、toJS をかけて POJO に戻しておく。
          return newVal.toJS();
        }
        return newVal;
      },
      Card.validate(values)) as this;
  }
}

