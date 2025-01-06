
//model
  class NumberLineModel {
    constructor(range, snappingRange) {
      this.range = range; 
      this.snappingRange = snappingRange;
      this.start = 100;
      this.end = 700 // width - start;
      this.pointY = 200;
      this.pointX = this.mapValueToPixel(0);
    }

    mapValueToPixel(value) {
      return map(value, -this.range, this.range, this.start, this.end);
    }

    mapPixelToValue(value) {
      return map(value, this.start, this.end, -this.range, this.range);
    }

    snapToNearest() {
      const nearestValue = round(this.mapPixelToValue(this.pointX));
      this.pointX = this.mapValueToPixel(nearestValue);
      return nearestValue;
    
    }
  }