import {
  encodeDelimitedNumericArray,
  decodeDelimitedNumericArray,
  encodeDelimitedArray,
  decodeDelimitedArray,
} from 'serialize-query-params';

/** Uses a comma to delimit entries. e.g. ['a', 'b'] => qp?=a,b */
export const CommaArrayParamNumber = {
  encode: (array: (number | null)[] | null | undefined) => encodeDelimitedNumericArray(array, ','),
  decode: (arrayStr: string | (string | null)[] | null | undefined) => decodeDelimitedNumericArray(arrayStr, ','),
};

/** Uses a comma to delimit entries. e.g. ['a', 'b'] => qp?=a,b */
export const CommaArrayParamString = {
  encode: (array: (string | null)[] | null | undefined) => encodeDelimitedArray(array, ','),
  decode: (arrayStr: string | (string | null)[] | null | undefined) => decodeDelimitedArray(arrayStr, ','),
};
