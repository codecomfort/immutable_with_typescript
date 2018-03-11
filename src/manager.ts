import { User, IUser } from './user';

export interface IManager extends IUser {
  positionName?: string;
  alertNotificationsEnabled?: boolean;
}

const _defaultValues: IManager = {
  positionName: 'Admin',
  alertNotificationsEnabled: false,
}

export class Manager extends User {
  public readonly positionName: string;
  public readonly alertNotificationsEnabled: boolean;

  constructor(params?: IManager) {
    super(params
      ? ({ ..._defaultValues, ...params } as IManager)
      : _defaultValues);
  }

  with = (updatedValues: IManager): Manager => {
    return super.with(updatedValues) as this;
  }
}