/*
 * Clamps a number to min max inclusive
 *
 * */
export function clamp(n: number, min: number, max: number) {
  if (n > max) {
    return max;
  }
  if (n < min) {
    return min;
  }
  return n;
}

export function translate(
  valA: number,
  minA: number,
  maxA: number,
  minB: number,
  maxB: number
) {
  if (valA < minA) {
    return minB;
  }
  if (valA > maxA) {
    return maxB;
  }

  let distA = (valA - minA) / (maxA - minA);
  return (maxB - minB) * distA + minB;
}
