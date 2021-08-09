import assert from "assert";
import * as hkid from "../src";

describe("hkid", function () {
  describe("validate", function () {
    [
      { candidate: "A1234", expected: false }, // incorrect length
      { candidate: "A123456789", expected: false }, // incorrect length
      { candidate: "L555555[0]", expected: false }, // invalid char `[`
      { candidate: "g323@22a", expected: false }, // invalid char `@`
      { candidate: "AB987654(3)", expected: false }, // invalid prefix `AB`
      { candidate: "K123BBB(3)", expected: false }, // invalid pattern `BBB`
      { candidate: "L555555(0)", expected: false }, // invalid prefix `L`
      { candidate: "A5632440", expected: false }, // incorrect check digit `0`
      { candidate: "D5355770", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "Y477744a", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "P067688(1)", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "Y8312883", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "b6518406", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
      { candidate: "Xe005186(A)", expected: true }, // valid hkid, verified by https://webb-site.com/dbpub/idcheck.asp
    ].forEach((param) => {
      const { candidate, expected } = param;
      const result = hkid.validate(candidate);

      it(`should return ${expected} for validate(${candidate})`, function () {
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

      it(`should return ${expected} for validate(hkid.random()) when random() is ${candidate}`, function () {
        assert.equal(result, expected);
      });
    });
  });
});
