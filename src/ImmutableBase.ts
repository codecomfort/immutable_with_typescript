import {Map as ImmutableMap} from "immutable";
import {forEach as lodashForEach} from 'lodash';

export abstract class ImmutableBase {
  _data: ImmutableMap<any, any> = ImmutableMap<any, any>();

  constructor(initialValues?: any) {
    if (initialValues) {
      this._data = this._data.merge(initialValues);
      lodashForEach(initialValues, (value, key) => {
        Object.defineProperty(this, key, {
          enumerable: false,
          get() {
            return this._data.get(key);
          },
          set() {
            throw new Error('値のセットには with を使用してください');
          }
        });
      });
    } else {
      this._data = ImmutableMap<any, any>();
    }
  }

  toJS = () => {
    return this._data.toJS();
  }

  equals = (other: ImmutableBase) => {
    return typeof this === typeof other
      && this._data.equals(other._data);
  }

  with = (values: any): any => {
    const returnVal = new (this.constructor as any);  // 継承への対応。this.constructor は派生クラスを指す
    returnVal._data = this._data.merge(values);
    return returnVal;
  }
}
