class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.IsBetterOlder = false;
    this.legendarySulfura = false;
    this.conjured = false;
  }

  GetStatus() {
    if (
      this.name.includes("Aged Brie") ||
      this.name.includes("Backstage passes to a TAFKAL80ETC concert")
    ) {
      this.IsBetterOlder = true;
    } else if (this.name.includes("Sulfuras, Hand of Ragnaros")) {
      this.legendarySulfura = true;
    }

    if (this.name.includes("conjured")) {
      this.conjured = true;
    }
  }

  ControlQualityMaxMin() {
    if (!this.legendarySulfura) {
      if (this.quality > 50) this.quality = 50;
      if (this.quality < 0) this.quality = 0;
    }
  }

  ControlSellIn() {
    if (this.IsBetterOlder) {
      if (this.sellIn <= 10 && this.sellIn > 5) {
        this.quality += 2;
      } else if (this.sellIn <= 5 && this.sellIn >= 0) {
        this.quality += 3;
      } else if (this.sellIn < 0) {
        this.quality = 0;
      } else {
        this.quality += 1;
      }
    } else {
      if (this.conjured) {
        if (this.sellIn < 0) {
          this.quality -= 4;
        } else {
          this.quality -= 2;
        }
      } else {
        if (this.sellIn < 0) {
          this.quality -= 2;
        } else {
          this.quality -= 1;
        }
      }
    }
  }

  OneDayPast() {
    if (this.legendarySulfura) {
      this.quality = 80;
    } else if (this.IsBetterOlder) {
      this.sellIn -= 1;
      this.ControlSellIn();
    } else {
      this.sellIn -= 1;
      this.ControlSellIn();
    }
    this.ControlQualityMaxMin();
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((product) => {
      product.GetStatus();
      product.OneDayPast();
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
