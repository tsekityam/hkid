# hkid

Generate and Validate HKID

[![Node.js CI](https://github.com/tsekityam/hkid/actions/workflows/test.yml/badge.svg)](https://github.com/tsekityam/hkid/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/tsekityam/hkid/branch/main/graph/badge.svg?token=34ZuXbF3md)](https://codecov.io/gh/tsekityam/hkid)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid?ref=badge_shield)

## Installation

`yarn add hkid`

## Usage

```ts
import * as hkid from "hkid";

// generate valid HKID randomly
console.log(hkid.random()); // H3497811

// validate HKID
console.log(hkid.validate("H3497811")); // true
console.log(hkid.validate("h3497811")); // true
console.log(hkid.validate("H349781(1)")); // true
console.log(hkid.validate("h349781(1)")); // true
console.log(hkid.validate("H3497810")); // false
```

[CodeSandbox](https://codesandbox.io/s/ts-example-ch7zj)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftsekityam%2Fhkid?ref=badge_large)
