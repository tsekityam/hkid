import assert from "assert";
import { validate } from "../lib";

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
      { hkid: "C123456(9)", expected: true },
      { hkid: "C1234569", expected: true },
      { hkid: "XG1239876", expected: true },
      { hkid: "P7822980", expected: true },
      { hkid: "g323222a", expected: true },
    ].forEach((param) => {
      const { hkid, expected } = param;
      const result = validate(hkid);

      it(`should return ${expected} for validate(${hkid})`, function () {
        assert.equal(result, expected);
      });
    });
  });
});
