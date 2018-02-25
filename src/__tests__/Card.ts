import * as Im from "immutable";

import {Card, ICard, Comment} from "../Card";

describe("Card", () => {
  const comments = Im.List([
    new Comment("01", "テキスト０１", new Date(), new Date()),
    new Comment("02", "テキスト０２", new Date(), new Date()),
    new Comment("03", "テキスト０３", new Date(), new Date()),
  ]);
  describe("constructor", () => {
    test("正しくエンティティが生成されること", () => {
      // Arrange
      const data: Partial<ICard> = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };

      // Act
      const entity = new Card(data);

      // Assert
      // 各フィールドに過不足なく反映されること
      expect(entity.id).toBeNull();
      expect(entity.title).toBe(data.title);
      expect(entity.description).toBe(data.description);
      expect(entity.comments.size).toBe(data.comments.size);
      expect(entity.comments).toEqual(data.comments);
      expect(entity.due).toEqual(data.due);
    });
    test("不正な値ではエンティティが生成されないこと", () => {
      // Arrange
      const data: Partial<ICard> = {
        id: null,
        title: null,
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
      const data: Partial<ICard> = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);
      const newData: Partial<ICard> = {
        title: "カードのタイトルを変更しました",
        due: new Date(2017, 11, 13),
        comments: comments  // リストへの変更と追加
          .set(1, new Comment("002", null, null, null))
          .push(new Comment("04", "テキスト０４", new Date(), new Date())),
      };

      // Act
      const newEntity = entity.with(newData);

      // Assert
      // entity はイミュータブル
      expect(entity.id).toBeNull();
      expect(entity.title).toBe(data.title);
      expect(entity.description).toBe(data.description);
      expect(entity.comments.size).toBe(data.comments.size); // 変化なし
      expect(entity.comments).toEqual(data.comments);
      expect(entity.due).toEqual(data.due);

      // newEntity には反映されている
      expect(newEntity.id).toBeNull();
      expect(newEntity.title).toBe(newData.title);
      expect(newEntity.description).toBe(data.description); // 触ってないので変化なし
      expect(newEntity.comments.size).toBe(newData.comments.size);  // 反映されている
      expect(newEntity.comments).toEqual(newData.comments);
      expect(newEntity.comments.get(1).id).toBe(newData.comments.get(1).id);
      expect(newEntity.comments.get(3).id).toBe(newData.comments.get(3).id);
      expect(newEntity.due).toEqual(newData.due);
    });
    test("不正な値では変更エンティティが生成されないこと", () => {
      // Arrange
      const data: Partial<ICard> = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);
      const updated: Partial<ICard> = {
        title: null,
        due: new Date(2017, 11, 13),
      };

      // Act, Assert
      // 不正なデータでは変更できない
      expect(() => entity.with(updated)).toThrow();
    });
  });
});

