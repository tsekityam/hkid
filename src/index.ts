export const validate = (hkid: string) => {
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

  try {
    return candidate[candidate.length - 1] === getCheckDigit(candidate);
  } catch {
    return false;
  }
};

const getCheckDigit = (candidate: string[]): string => {
  var checkDigit = candidate.reduce(
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
