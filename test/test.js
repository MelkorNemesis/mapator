"use strict";
var expect = require("chai").expect;
var Mapator = require("../lib/index.js").default;

describe("mapator", () => {
  let mapper;

  before(() => {
    mapper = Mapator({
      abc: "123",
      def: "456",
      ghi: 789
    });
  });

  it("should throw an error when invoked with new", () => {
    expect(() => {
      new Mapator({ a: 1 });
    }).to.throw();
  });

  it("should throw an error for empty hashMap object", () => {
    expect(() => Mapator({})).to.throw();
  });

  it("should throw an error for undefined hashMap argument", () => {
    expect(() => Mapator(undefined)).to.throw();
  });

  it("should return object with public API after creation", () => {
    const mapper = Mapator({ a: 1 });
    expect(mapper).to.have.property("keyToValue");
    expect(mapper).to.have.property("valueToKey");
  });

  describe("valueToKey", () => {
    it("should return key when mapping exists", () => {
      expect(mapper.keyToValue("abc")).to.equal("123");
    });

    it("should return undefined when mapping does not exist", () => {
      expect(mapper.valueToKey("012")).to.equal(undefined);
    });

    it("should use onKeyNotFound when specified and no mapping found", () => {
      const _mapper = Mapator(
        { a: 1 },
        {
          onKeyNotFound(value) {
            throw new Error(`No key found for value "${value}".`);
          }
        }
      );
      expect(() => _mapper.valueToKey(2)).to.throw();
    });
  });

  describe("keyToValue", () => {
    it("should return value when mapping exists", () => {
      expect(mapper.keyToValue("abc")).to.equal("123");
    });

    it("should return undefined when mapping does not exist", () => {
      expect(mapper.keyToValue("jkl")).to.equal(undefined);
    });

    it("should use onValueNotFound when specified and no mapping found", () => {
      const _mapper = Mapator(
        { a: 1 },
        {
          onValueNotFound(value) {
            throw new Error(`No value found for key "${value}".`);
          }
        }
      );
      expect(() => _mapper.keyToValue("b")).to.throw();
    });
  });
});
