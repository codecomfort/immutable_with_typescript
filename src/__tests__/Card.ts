import * as Im from "immutable";

import {Card, CardData, Comment} from "../Card";

describe("Card", () => {
  describe("constructor", () => {
    test("正しくエンティティが生成されること", () => {
      const data: CardData = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: Im.List([new Comment()]),
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);

      // 各フィールドに過不足なく反映されること
      expect(entity.id).toBeNull();
      expect(entity.title).toBe("カードのタイトルです");
      expect(entity.description).toBe("カードの詳細説明です");
      expect(entity.comments.size).toBe(1);
      expect(entity.comments).toEqual(Im.List([new Comment()]));
      expect(entity.due).toEqual(new Date(2017, 11, 12));
    });
    test("不正な値ではエンティティが生成されないこと", () => {
      const data: CardData = {
        id: null,
        title: null,
        description: "カードの詳細説明です",
        comments: Im.List([new Comment()]),
        due: new Date(2017, 11, 12),
      };

      expect(() => new Card(data)).toThrow();
    });
  });
  describe("with", () => {
    test("エンティティはイミュータブルであること", () => {
      const data: CardData = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: Im.List([new Comment()]),
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);

      const updated: CardData = {
        title: "カードのタイトルを変更しました",
        due: new Date(2017, 11, 13),
      };

      const newEntity = entity.with(updated);

      // entity はイミュータブル
      expect(entity.id).toBeNull();
      expect(entity.title).toBe("カードのタイトルです");
      expect(entity.description).toBe("カードの詳細説明です");
      expect(entity.comments.size).toBe(1);
      expect(entity.comments).toEqual(Im.List([new Comment()]));
      expect(entity.due).toEqual(new Date(2017, 11, 12));

      // newEntity には反映されている
      expect(newEntity.id).toBeNull();
      expect(newEntity.title).toBe("カードのタイトルを変更しました");
      expect(newEntity.description).toBe("カードの詳細説明です");
      expect(newEntity.comments.size).toBe(1);
      expect(newEntity.comments).toEqual(Im.List([new Comment()]));
      expect(newEntity.due).toEqual(new Date(2017, 11, 13));
    });
    test("不正な値では変更エンティティが生成されないこと", () => {
      const data: CardData = {
        id: null,
        title: "カードのタイトルです",
        description: "カードの詳細説明です",
        comments: Im.List([new Comment()]),
        due: new Date(2017, 11, 12),
      };
      const entity = new Card(data);

      const updated: CardData = {
        title: null,
        due: new Date(2017, 11, 13),
      };

      // 不正なデータでは変更できない
      expect(() => entity.with(updated)).toThrow();
    });
  });
});

