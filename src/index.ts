export const validate = (hkid: string): boolean => {
  const candidate = hkid
    .replace("(", "")
    .replace(")", "")
    .toLowerCase()
    .split("");

  if (candidate.length !== 9 && candidate.length !== 8) {
    return false;
  } else if (candidate.length === 8) {
    candidate.unshift(" ");
  }

  if (checkPrefix(candidate) === false) {
    return false;
  }

  try {
    const checkDigit = candidate[candidate.length - 1];
    return checkDigit === calculateCheckDigit(candidate);
  } catch {
    return false;
  }
};

export const random = (): string => {
  const randomIndex = Math.floor(Math.random() * knownPrefixes.length);
  const prefix = knownPrefixes[randomIndex];

  const digit = Math.random().toString().substr(2, 6);

  const candidate: string = `${prefix}${digit}`.toLocaleLowerCase();

  const checkDigit = calculateCheckDigit([...candidate.split(""), "0"]);

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

const checkPrefix = (candidate: string[]): boolean => {
  const prefix = candidate.slice(0, 2).join("");
  return knownPrefixes.some((value) => value.toLowerCase() === prefix);
};

const calculateCheckDigit = (candidate: string[]): string => {
  let checkDigit = candidate.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      if (currentIndex === array.length - 1) {
        return previousValue;
      }

      const weight = array.length - currentIndex;
      const value = getValue(currentValue, currentIndex);

      return previousValue + ((weight * value) % 11);
    },
    0
  );

  checkDigit = checkDigit % 11;

  if (checkDigit !== 0) {
    checkDigit = 11 - checkDigit;
  }

  return `${checkDigit === 10 ? "a" : checkDigit}`;
};

const A = "a".charCodeAt(0);
const Z = "z".charCodeAt(0);

const getValue = (char: string, index: number): number => {
  const charCode = char.charCodeAt(0);

  if (index <= 1) {
    if (char === " ") {
      return 36;
    } else if (charCode >= A && charCode <= Z) {
      return charCode - A + 10;
    }
  } else if (index <= 8) {
    if (charCode >= 48 && charCode <= 57) {
      return parseInt(char);
    }
  }

  throw Error();
};
