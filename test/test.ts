import assert from "assert";
import { validate } from "../lib";

describe("hkid", function () {
  describe("validate", function () {
    [
      { hkid: "A1234", expected: false }, // too short
      { hkid: "A123456789", expected: false }, // too long
      { hkid: "L555555[0]", expected: false }, // invalid char
      { hkid: "ABCD123(4)", expected: false }, // too many leading alphabets 
      { hkid: "AY987654(A)", expected: false },
      { hkid: "G123456(A)", expected: true },
      { hkid: "L555555(0)", expected: true },
      { hkid: "AB987654(3)", expected: true },
      { hkid: "C123456(9)", expected: true },
    ].forEach((param) => {
      const { hkid, expected } = param;
      const result = validate(hkid);

      it(`should return ${expected} for validate(${hkid})`, function () {
        assert.equal(result, expected);
      });
    });
  });
});
