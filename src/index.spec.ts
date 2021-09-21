import assert from "assert";
import rewire from "rewire";

const hkid = rewire(".");

describe("hkid", function () {
  describe("validate", function () {
    [
      { candidate: "A1234", expected: false }, // incorrect length
      { candidate: "A123456789", expected: false }, // incorrect length
      { candidate: "L555555[0]", expected: false }, // invalid char `[`
      { candidate: "g323@22a", expected: false }, // invalid char `@`
      { candidate: "AB987654(3)", expected: false }, // invalid prefix `AB`
      { candidate: "K123BBB(3)", expected: false }, // invalid pattern `BBB`
      { candidate: "O123456(1)", expected: false }, // invalid prefix `O`
      { candidate: "A5632440", expected: false }, // incorrect check digit `0`
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

  describe("random", function () {
    [
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
      { candidate: hkid.random(), expected: true },
    ].forEach((param) => {
      const { candidate, expected } = param;
      const result = hkid.validate(candidate);

      it(`should return ${expected} for validate(hkid.random()) where random() is ${candidate}`, function () {
        assert.equal(result, expected);
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
