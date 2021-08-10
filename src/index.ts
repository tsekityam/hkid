export const validate = (hkid: string): boolean => {
  const regexp = `^([A-Z]{1,2})([0-9]{6})(([0-9A])|\\(([0-9A])\\))$`;
  const found = hkid.toUpperCase().match(regexp);

  if (!found) {
    return false;
  }
  let prefix = found[1];
  const content = found[2];
  const checkDigit = found[4] ?? found[5];

  if (prefix.length === 1) prefix = ` ${prefix}`;

  if (checkPrefix(prefix) === false) {
    return false;
  }

  return checkDigit === calculateCheckDigit(`${prefix}${content}`);
};

export const random = (): string => {
  const randomIndex = Math.floor(Math.random() * knownPrefixes.length);
  const prefix = knownPrefixes[randomIndex];

  const digit = Math.random().toString().substr(2, 6);

  const candidate = `${prefix}${digit}`;

  const checkDigit = calculateCheckDigit(`${candidate}`);

  return `${candidate}${checkDigit}`.toUpperCase().trim();
};

/*
 * Known single-letter prefixes are ABCDEGHKMPRVYZ and double-letter prefixes are XA, XD, XE, XG.
 * source: https://webb-site.com/dbpub/idcheck.asp
 */
const knownPrefixes: string[] = [
  " A",
  " B",
  " C",
  " D",
  " E",
  " G",
  " H",
  " K",
  " M",
  " P",
  " R",
  " V",
  " Y",
  " Z",
  "XA",
  "XD",
  "XE",
  "XG",
];

const checkPrefix = (prefix: string): boolean => {
  return knownPrefixes.some((value) => value === prefix);
};

const calculateCheckDigit = (candidate: string): string => {
  let checkDigit = candidate
    .split("")
    .reduce((previousValue, currentValue, currentIndex) => {
      const weight = 9 - currentIndex;
      const value = getValue(currentValue);

      return previousValue + ((weight * value) % 11);
    }, 0);

  checkDigit = checkDigit % 11;

  if (checkDigit !== 0) {
    checkDigit = 11 - checkDigit;
  }

  return `${checkDigit === 10 ? "A" : checkDigit}`;
};

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const getValue = (char: string): number => {
  const charCode = char.charCodeAt(0);

  if (char === " ") {
    return 36;
  } else if (!isNaN(parseInt(char))) {
    return parseInt(char);
  } else if (charCode >= A && charCode <= Z) {
    return charCode - A + 10;
  }

  throw new Error();
};
