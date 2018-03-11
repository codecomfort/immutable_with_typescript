import {List} from "immutable";

import {User, IUser, Comment} from "../User";

describe("User", () => {
  const comments = List([
    new Comment("01", "テキスト０１", new Date(), new Date()),
    new Comment("02", "テキスト０２", new Date(), new Date()),
    new Comment("03", "テキスト０３", new Date(), new Date()),
  ]);
  describe("constructor", () => {
    test("正しくエンティティが生成されること", () => {
      // Arrange
      const data: IUser = {
        firstName: "山田",
        lastName: "太郎",
        email: "tyamada@immutable.co.jp",
        comments: comments,
        nested: {
          item1: "item1",
          item2: 2,
          item3: true,
        },
      };

      // Act
      const entity = new User(data);

      // Assert
      // 各フィールドに過不足なく反映されること
      expect(entity.firstName).toBe(data.firstName);
      expect(entity.lastName).toBe(data.lastName);
      expect(entity.comments).toEqual(data.comments);
      expect(entity.nested).toEqual(data.nested);
      expect(entity.nested.item1).toBe(data.nested.item1);
      expect(entity.nested.item2).toBe(data.nested.item2);
      expect(entity.nested.item3).toBe(data.nested.item3);
    });
    test.skip("不正な値ではエンティティが生成されないこと", () => {
    });
  });
  describe("with", () => {
    test("エンティティはイミュータブルであること", () => {
      // Arrange
      const data: IUser = {
        firstName: "山田",
        lastName: "太郎",
        email: "tyamada@immutable.co.jp",
        comments: comments,
        nested: {
          item1: "item1",
          item2: 2,
          item3: true,
        },
      };
      const entity = new User(data);
      const newData: IUser = {
        firstName: "山田",
        lastName: "花子",
        email: "hyamada@immutable.co.jp",
        comments: comments  // リストへの変更と追加
          .set(1, new Comment("002", undefined, undefined, undefined))
          .push(new Comment("04", "テキスト０４", new Date(), new Date())),
        nested: {
          item1: "item2",
          item2: 3,
          item3: false,
        },
      };

      // Act
      const newEntity = entity.with(newData);

      // Assert
      // entity はイミュータブル
      expect(entity.firstName).toBe(data.firstName);
      expect(entity.lastName).toBe(data.lastName);
      expect(entity.comments).toEqual(data.comments);
      expect(entity.nested).toEqual(data.nested);
      expect(entity.nested.item1).toBe(data.nested.item1);
      expect(entity.nested.item2).toBe(data.nested.item2);
      expect(entity.nested.item3).toBe(data.nested.item3);

      // newEntity には反映されている
      expect(newEntity.firstName).toBe(data.firstName);   // 触ってないので変化なし
      expect(newEntity.lastName).toBe(newData.lastName);
      expect(newEntity.comments).toEqual(newData.comments);
      expect(newEntity.comments.size).toBe(newData.comments.size);  // 反映されている
      expect(newEntity.comments.get(1).id).toBe(newData.comments.get(1).id);
      expect(newEntity.comments.get(3).id).toBe(newData.comments.get(3).id);
      expect(newEntity.nested).toEqual(newData.nested);
      expect(newEntity.nested.item1).toBe(newData.nested.item1);
      expect(newEntity.nested.item2).toBe(newData.nested.item2);
      expect(newEntity.nested.item3).toBe(newData.nested.item3);
    });
    test("項目の削除が正常に行われること", () => {
      // Arrange
      const data: IUser = {
        firstName: "山田",
        lastName: "太郎",
        email: "tyamada@immutable.co.jp",
        comments: comments,
        nested: {
          item1: "item1",
          item2: 2,
          item3: true,
        },
      };
      const entity = new User(data);
      const newData: IUser = {
        comments: comments.delete(1),
        nested: {
          item1: "item2",
        },
      };

      // Act
      const newEntity = entity.with(newData);

      // Assert
      // entity はイミュータブル
      expect(entity.comments.size).toBe(data.comments.size); // 変化なし
      expect(entity.comments).toEqual(data.comments);
      expect(entity.nested).toEqual(data.nested);
      expect(entity.nested.item1).toBe(data.nested.item1);
      expect(entity.nested.item2).toBe(data.nested.item2);
      expect(entity.nested.item3).toBe(data.nested.item3);

      // newEntity には反映されている
      expect(newEntity.comments.size).toBe(newData.comments.size);  // 反映されている
      expect(newEntity.comments).toEqual(newData.comments);
      expect(newEntity.comments.get(0).id).toBe(newData.comments.get(0).id);
      expect(newEntity.comments.get(1).id).toBe(newData.comments.get(1).id);
      expect(newEntity.comments.get(2)).toBeUndefined();
      expect(newEntity.nested).toEqual(newData.nested);
      expect(newEntity.nested.item1).toBe(newData.nested.item1);
      expect(newEntity.nested.item2).toBeUndefined();
      expect(newEntity.nested.item3).toBeUndefined();

    });
    test.skip("不正な値では変更エンティティが生成されないこと", () => {
    });
  });
});

