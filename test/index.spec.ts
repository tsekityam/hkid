import assert from "assert";
import rewire from "rewire";

const hkid = rewire("../src/index");

describe("hkid", function () {
  describe("validate", function () {
    [
      { candidate: "A1234", expected: false }, // incorrect length
      { candidate: "A123456789", expected: false }, // incorrect length
      { candidate: "L555555[0]", expected: false }, // invalid char `[`
      { candidate: "g323@22a", expected: false }, // invalid char `@`
      { candidate: "K123BBB(3)", expected: false }, // invalid pattern `BBB`
      { candidate: "A5632440", expected: false }, // incorrect check digit `0`
      { candidate: "YK1597716", expected: true }, // invalid prefix `YK`, however, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "O123456(1)", expected: true }, // invalid prefix `O`, however, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "D5355770", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "Y477744a", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "P067688(1)", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "Y8312883", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "b6518406", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "WX2313594", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
    ].forEach((param) => {
      const { candidate, expected } = param;
      const result = hkid.validate(candidate);

      it(`should return ${expected} for validate("${candidate}")`, function () {
        assert.equal(result, expected);
      });
    });
  });

  describe("validate, { checkPrefix: true }", function () {
    [
      { candidate: "YK1597716", expected: false }, // invalid prefix `YK`
      { candidate: "O123456(1)", expected: false }, // invalid prefix `O`
    ].forEach((param) => {
      const { candidate, expected } = param;
      const result = hkid.validate(candidate, { checkPrefix: true });

      it(`should return ${expected} for validate("${candidate}", { checkPrefix: true })`, function () {
        assert.equal(result, expected);
      });
    });
  });

  describe("validate, { checkPrefix: false }", function () {
    [
      { candidate: "YK1597716", expected: true }, // invalid prefix `YK`, however, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "O123456(1)", expected: true }, // invalid prefix `O`, however, verified by https://webb-site.com/dbpub/idcheck.asp
    ].forEach((param) => {
      const { candidate, expected } = param;
      const result = hkid.validate(candidate, { checkPrefix: false });

      it(`should return ${expected} for validate("${candidate}", { checkPrefix: false })`, function () {
        assert.equal(result, expected);
      });
    });
  });

  describe("random", function () {
    [
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
    ].forEach((param) => {
      const { candidate, expected } = param;

      const result0 = hkid.validate(candidate);
      it(`should return ${expected} for validate(hkid.random()) where random() is ${candidate}`, function () {
        assert.equal(result0, expected);
      });

      const result1 = hkid.validate(candidate, { checkPrefix: true });
      it(`should return ${expected} for validate(hkid.random(), { checkPrefix: true }) where random() is ${candidate}`, function () {
        assert.equal(result1, expected);
      });

      const result2 = hkid.validate(candidate, { checkPrefix: false });
      it(`should return ${expected} for validate(hkid.random(), { checkPrefix: false }) where random() is ${candidate}`, function () {
        assert.equal(result2, expected);
      });
    });
  });
});

describe("__private__", function () {
  const getValue = hkid.__get__("getValue");

  describe("getValue", function () {
    [
      { candidate: "5", expected: 5 },
      { candidate: "A", expected: 10 },
      { candidate: " ", expected: 36 },
    ].forEach((param) => {
      const { candidate, expected } = param;
      const result = getValue(candidate);

      it(`should return ${expected} for getValue("${candidate}")`, function () {
        assert.equal(result, expected);
      });
    });

    [{ candidate: "@" }, { candidate: "a" }, { candidate: "" }].forEach(
      (param) => {
        const { candidate } = param;

        it(`should throw error for getValue("${candidate}")`, function () {
          assert.throws(() => getValue(candidate));
        });
      }
    );
  });
});
