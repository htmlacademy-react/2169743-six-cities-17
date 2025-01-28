type ValidationValue = string | number;

function convertToNumber(value: ValidationValue) {
  return typeof value === 'string'
    ? value.trim().length
    : value;
}

export function valueRange(value: ValidationValue, min: number, max: number) {
  const tempValue = convertToNumber(value);
  return tempValue >= min && tempValue < max;
}

export function valueMin(value: ValidationValue, min: number) {
  const tempValue = convertToNumber(value);
  return tempValue >= min;
}
