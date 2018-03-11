import {ImmutableBase} from "./ImmutableBase";
import {List} from "immutable";

export interface IUser {
  firstName?: string,
  lastName?: string,
  email?: string,
  comments?: List<Comment>;
  nested?: {
    item1?: string;
    item2?: number;
    item3?: boolean;
  }
}

export class Comment {
  constructor(public id: string, public text: string, public createdAt: Date, public editedAt: Date) {}
}

const _defaultValues: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  comments: List<Comment>(),
  nested: {
    item1: undefined,
    item2: undefined,
    item3: undefined,
  },
};

export class User extends ImmutableBase implements IUser {

  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly comments: List<Comment>;
  public readonly nested: {
    readonly item1: string;
    readonly item2: number;
    readonly item3: boolean;
  };

  constructor(params?: IUser) {
    super(params
      ? ({ ..._defaultValues, ...params } as IUser)
      : _defaultValues);
  }

  // アロー関数を使わず普通に with(updatedValues: IUser): User {～ と書いても可だが、
  // アロー関数で書きたかったので以下のテクニックを使っている。
  // https://basarat.gitbooks.io/typescript/docs/arrow-functions.html#tip-arrow-functions-and-inheritance
  private superWith = this.with;
  with = (updatedValues: IUser): User => {
    return this.superWith(updatedValues) as User;
  }
}
