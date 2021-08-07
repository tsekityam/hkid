import assert from "assert";
import { random, validate } from "../lib";

describe("hkid", function () {
  describe("validate", function () {
    [
      { hkid: "A1234", expected: false }, // incorrect length
      { hkid: "A123456789", expected: false }, // incorrect length
      { hkid: "L555555[0]", expected: false }, // invalid char `[`
      { hkid: "g323@22a", expected: false }, // invalid char `@`
      { hkid: "AB987654(3)", expected: false }, // invalid prefix `AB`
      { hkid: "K123BBB(3)", expected: false }, // invalid pattern `BBB`
      { hkid: "L555555(0)", expected: false }, // invalid prefix `L`
      { hkid: "A5632440", expected: false }, // incorrect check digit `0`
      { hkid: "D5355770", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { hkid: "Y477744a", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { hkid: "P067688(1)", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { hkid: "Y8312883", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { hkid: "b6518406", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
    ].forEach((param) => {
      const { hkid, expected } = param;
      const result = validate(hkid);

      it(`should return ${expected} for validate(${hkid})`, function () {
        assert.equal(result, expected);
      });
    });
  });

  describe("random", function () {
    [
      { hkid: random(), expected: true },
      { hkid: random(), expected: true },
      { hkid: random(), expected: true },
      { hkid: random(), expected: true },
      { hkid: random(), expected: true },
    ].forEach((param) => {
      const { hkid, expected } = param;
      const result = validate(hkid);

      it(`should return ${expected} for validate(random()) when random() is ${hkid}`, function () {
        assert.equal(result, expected);
      });
    });
  });
});
