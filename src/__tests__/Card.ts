import * as Im from "immutable";

import {Card, ICard, Comment} from "../Card";

describe("Card", () => {
  describe("constructor", () => {
    const comments = Im.List([
      new Comment("01", "テキスト０１", new Date(), new Date()),
      new Comment("02", "テキスト０２", new Date(), new Date()),
      new Comment("03", "テキスト０３", new Date(), new Date()),
    ]);
    test("正しくエンティティが生成されること", () => {
      const data: Partial<ICard> = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);

      // 各フィールドに過不足なく反映されること
      expect(entity.id).toBeNull();
      expect(entity.title).toBe("カードのタイトルです");
      expect(entity.description).toBe("カードの詳細説明です");
      expect(entity.comments.size).toBe(3);
      expect(entity.comments).toEqual(comments);
      expect(entity.due).toEqual(new Date(2017, 11, 12));
    });
    test("不正な値ではエンティティが生成されないこと", () => {
      const data: Partial<ICard> = {
        id: null,
        title: null,
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };

      expect(() => new Card(data)).toThrow(`title は必須です`);
    });
  });
  describe("with", () => {
    const comments = Im.List([
      new Comment("01", "テキスト０１", new Date(), new Date()),
      new Comment("02", "テキスト０２", new Date(), new Date()),
      new Comment("03", "テキスト０３", new Date(), new Date()),
    ]);
    test("エンティティはイミュータブルであること", () => {
      const data: Partial<ICard> = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: comments,
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);

      const newComment = new Comment("04", "テキスト０４", new Date(), new Date());
      const updated: Partial<ICard> = {
        title: "カードのタイトルを変更しました",
        due: new Date(2017, 11, 13),
        comments: comments  // リストへの変更と追加
          .set(1, new Comment("002", null, null, null))
          .push(newComment),
      };

      const newEntity = entity.with(updated);

      // entity はイミュータブル
      expect(entity.id).toBeNull();
      expect(entity.title).toBe("カードのタイトルです");
      expect(entity.description).toBe("カードの詳細説明です");
      expect(entity.comments.size).toBe(3); // 変化なし
      expect(entity.comments).toEqual(comments);
      expect(entity.due).toEqual(new Date(2017, 11, 12));

      // newEntity には反映されている
      expect(newEntity.id).toBeNull();
      expect(newEntity.title).toBe("カードのタイトルを変更しました");
      expect(newEntity.description).toBe("カードの詳細説明です");
      expect(newEntity.comments.size).toBe(4);  // 反映されている
      expect(newEntity.comments).toEqual(comments
        .set(1, new Comment("002", null, null, null))
        .push(newComment));
      expect(newEntity.comments.get(1).id).toBe("002");
      expect(newEntity.comments.get(3).id).toBe("04");
      expect(newEntity.due).toEqual(new Date(2017, 11, 13));
    });
    test("不正な値では変更エンティティが生成されないこと", () => {
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

      // 不正なデータでは変更できない
      expect(() => entity.with(updated)).toThrow();
    });
  });
});

