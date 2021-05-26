var { Shop, Item } = require("../src/gilded_rose.js");
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 2 pour Backstage passes quand sellIn < 10 et sellIn > 5", function () {
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: 7, quality: 32 }];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Augmenter la qualité de 3 pour Backstage passes quand sellIn < 5 et sellIn > 0", function () {
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: 0, quality: 33 }];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("la qualité pour Backstage tombe a 0 quand son sellIn est inferieur a 0", function () {
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: -2, quality: 0 }];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("la qualité d'un produit ne peut pas exceder 50 ", function () {
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 51)
    );
    listItems.push(new Item("Aged Brie", 20, 70000));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("la qualité d'un produit ne peut pas descendre en dessous de 0 ", function () {
    listItems.push(new Item("Aged Brie", -1, -1000));
    listItems.push(new Item("Aged Brie", 33, -1000));
    listItems.push(new Item("produit lamba", 20, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 0 },
      { sellIn: 32, quality: 0 },
      { sellIn: 19, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("le legendaire 'Sulfuras, Hand of Ragnaros' n'as pas de sellIn et ne se degrade pas", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", null, 5));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: null, quality: 80 }];

    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("un produit conjured se degrade 2 fois plus vite, son sellin est multiplié par 2", function () {
    listItems.push(new Item("yolo conjured ", 30, 30));
    listItems.push(new Item("conjured truc ", -1, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 29, quality: 28 },
      { sellIn: -2, quality: 26 },
    ];

    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});
