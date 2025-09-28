# hkid

Generate and Validate HKID

[![npm version](https://badge.fury.io/js/hkid.svg)](https://badge.fury.io/js/hkid)
[![Node.js CI](https://github.com/tsekityam/hkid/actions/workflows/test.yml/badge.svg)](https://github.com/tsekityam/hkid/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/tsekityam/hkid/badge.svg?branch=main)](https://coveralls.io/github/tsekityam/hkid?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/tsekityam/hkid/badge.svg)](https://snyk.io/test/github/tsekityam/hkid)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid?ref=badge_shield)

## Installation

`yarn add hkid`

## Usage

```ts
import * as hkid from "hkid";
```

### `random()`

generate valid HKID randomly

```ts
console.log(hkid.random()); // H3497811
```

### `validate(candidate: string, option?: { checkPrefix?: boolean})`

validate HKID

- `checkPrefix`: check candidate against [the known prefix list](./src/index.ts#L38-L67). If the prefix of candidate is not in the list, consider it as validation failure. _(default: false)_

  **Note: the known prefix list may be incomplete, so false negative may be returned if `checkPrefix` is set to `true`.**

```ts
console.log(hkid.validate("H3497811")); // true
console.log(hkid.validate("h3497811")); // true
console.log(hkid.validate("H349781(1)")); // true

console.log(hkid.validate("H3497810")); // false

console.log(hkid.validate("YK1597716")); // true
console.log(hkid.validate("YK1597716", { checkPrefix: false })); // true
console.log(hkid.validate("YK1597716", { checkPrefix: true })); // false
```

[CodeSandbox](https://codesandbox.io/s/ts-example-ch7zj)

## References

- [有關香港身份證號碼的特殊英文字頭所代表的意思和發出時間](https://accessinfo.hk/en/request/you_guan_xiang_gang_shen_fen_zhe_2)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid?ref=badge_large)
