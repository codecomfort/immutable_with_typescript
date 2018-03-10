///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import { List, Record } from "immutable";

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
  id: undefined,
  title: undefined,
  description: undefined,
  comments: undefined,
  due: undefined,
  nested: {
    item1: undefined,
    item2: undefined,
    item3: undefined,
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
    let newEntity = this.merge(Card.validate(values)) as this;

    // mergeDeepWith では追加変更は正常に動作していたものの、削除がうまく動作していなかった。
    // 少し無理やりだが直接代入で凌ぐ
    // 更にネストが深くなった場合などは今後の課題。
    if (values.nested) {
      newEntity = newEntity.set("nested", values.nested);
    }

    return newEntity;
  }
}

