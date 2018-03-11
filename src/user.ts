import {ImmutableBase} from "./ImmutableBase";

export interface IUser {
  firstName?: string,
  lastName?: string,
  email?: string,
}

const _defaultValues: IUser = {
  firstName: '',
  lastName: '',
  email: '',
};

export class User extends ImmutableBase implements IUser {

  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;

  constructor(params?: IUser) {
    super(params
      ? ({ ..._defaultValues, ...params } as IUser)
      : _defaultValues);
  }

  with = (updatedValues: IUser): User => {
    return super.with(updatedValues) as User;
  }
}
