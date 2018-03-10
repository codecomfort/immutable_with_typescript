import {List} from "immutable";

import {Card, ICard, Comment} from "../Card";

describe("Card", () => {
  const comments = List([
    new Comment("01", "テキスト０１", new Date(), new Date()),
    new Comment("02", "テキスト０２", new Date(), new Date()),
    new Comment("03", "テキスト０３", new Date(), new Date()),
  ]);
  describe("constructor", () => {
    test("正しくエンティティが生成されること", () => {
      // Arrange
      const data: ICard = {
        id: undefined,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
        nested: {
          item1: "item1",
          item2: 2,
          item3: true,
        },
      };

      // Act
      const entity = new Card(data);

      // Assert
      // 各フィールドに過不足なく反映されること
      expect(entity.id).toBeUndefined();
      expect(entity.title).toBe(data.title);
      expect(entity.description).toBe(data.description);
      expect(entity.comments.size).toBe(data.comments.size);
      expect(entity.comments).toEqual(data.comments);
      expect(entity.due).toEqual(data.due);
      expect(entity.nested).toEqual(data.nested);
      expect(entity.nested.item1).toBe(data.nested.item1);
      expect(entity.nested.item2).toBe(data.nested.item2);
      expect(entity.nested.item3).toBe(data.nested.item3);
    });
    test("不正な値ではエンティティが生成されないこと", () => {
      // Arrange
      const data: ICard = {
        id: undefined,
        title: undefined,
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };

      // Act, Assert
      expect(() => new Card(data)).toThrow(`title は必須です`);
    });
  });
  describe("with", () => {
    test("エンティティはイミュータブルであること", () => {
      // Arrange
      const data: ICard = {
        id: undefined,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
        nested: {
          item1: "item1",
          item2: 2,
          item3: true,
        },
      };
      const entity = new Card(data);
      const newData: ICard = {
        title: "カードのタイトルを変更しました",
        due: new Date(2017, 11, 13),
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
      expect(entity.id).toBeUndefined();
      expect(entity.title).toBe(data.title);
      expect(entity.description).toBe(data.description);
      expect(entity.comments.size).toBe(data.comments.size); // 変化なし
      expect(entity.comments).toEqual(data.comments);
      expect(entity.due).toEqual(data.due);
      expect(entity.nested).toEqual(data.nested);
      expect(entity.nested.item1).toBe(data.nested.item1);
      expect(entity.nested.item2).toBe(data.nested.item2);
      expect(entity.nested.item3).toBe(data.nested.item3);

      // newEntity には反映されている
      expect(newEntity.id).toBeUndefined();
      expect(newEntity.title).toBe(newData.title);
      expect(newEntity.description).toBe(data.description); // 触ってないので変化なし
      expect(newEntity.comments.size).toBe(newData.comments.size);  // 反映されている
      expect(newEntity.comments).toEqual(newData.comments);
      expect(newEntity.comments.get(1).id).toBe(newData.comments.get(1).id);
      expect(newEntity.comments.get(3).id).toBe(newData.comments.get(3).id);
      expect(newEntity.due).toEqual(newData.due);
      expect(newEntity.nested).toEqual(newData.nested);
      expect(newEntity.nested.item1).toBe(newData.nested.item1);
      expect(newEntity.nested.item2).toBe(newData.nested.item2);
      expect(newEntity.nested.item3).toBe(newData.nested.item3);
    });
    test("項目の削除が正常に行われること", () => {
      // Arrange
      const data: ICard = {
        id: undefined,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
        nested: {
          item1: "item1",
          item2: 2,
          item3: true,
        },
      };
      const entity = new Card(data);
      const newData = {
        title: "カードのタイトルを変更しました",
        comments: comments.delete(1),
        nested: {
          item1: "item2",
        },
      };

      // Act
      const newEntity = entity.with(newData);

      // Assert
      // entity はイミュータブル
      expect(entity.id).toBeUndefined();
      expect(entity.title).toBe(data.title);
      expect(entity.description).toBe(data.description);
      expect(entity.comments.size).toBe(data.comments.size); // 変化なし
      expect(entity.comments).toEqual(data.comments);
      expect(entity.due).toEqual(data.due);
      expect(entity.nested).toEqual(data.nested);
      expect(entity.nested.item1).toBe(data.nested.item1);
      expect(entity.nested.item2).toBe(data.nested.item2);
      expect(entity.nested.item3).toBe(data.nested.item3);

      // newEntity には反映されている
      expect(newEntity.id).toBeUndefined();
      expect(newEntity.title).toBe(newData.title);
      expect(newEntity.description).toBe(data.description); // 触ってないので変化なし
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
    test("不正な値では変更エンティティが生成されないこと", () => {
      // Arrange
      const data: ICard = {
        id: undefined,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);
      const updated: ICard = {
        title: undefined,
        due: new Date(2017, 11, 13),
      };

      // Act, Assert
      // 不正なデータでは変更できない
      expect(() => entity.with(updated)).toThrow();
    });
  });
});

