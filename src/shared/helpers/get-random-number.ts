export const getRandomNumber = (min: number, max: number): number => {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) {
    throw new Error('Invalid range');
  }

  const range = max - min + 1;

  if (range > 2 ** 32) {
    throw new Error('Range is too large');
  }

  const limit = Math.floor(2 ** 32 / range) * range;
  const random = new Uint32Array(1);

  let value: number;

  do {
    crypto.getRandomValues(random);
    value = random[0];
  } while (value >= limit);

  return min + (value % range);
};