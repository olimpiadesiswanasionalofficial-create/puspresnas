/**
 * Pure TypeScript SHA-256 Cryptographic Hash Implementation
 * FIPS 180-4 compliant. Works seamlessly in both Node.js unit tests and modern browsers without async overhead.
 */

function rightRotate(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

export function sha256(ascii: string): string {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let i = 0;
  let j = 0;

  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  // Initial hash values (first 32 bits of fractional parts of square roots of first 8 primes 2..19)
  const hash: number[] = [];
  const k: number[] = [];

  let primeCounter = 0;
  const isPrime = (n: number) => {
    for (let factor = 2; factor * factor <= n; factor++) {
      if (n % factor === 0) return false;
    }
    return true;
  };

  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (isPrime(candidate)) {
      if (primeCounter < 8) {
        hash[primeCounter] = (mathPow(candidate, 1 / 2) * maxWord) | 0;
      }
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter++;
    }
  }

  // Pre-processing
  let byteIndex = 0;
  for (i = 0; i < ascii.length; i++) {
    const charCode = ascii.charCodeAt(i);
    const wordIndex = byteIndex >> 2;
    words[wordIndex] = (words[wordIndex] || 0) | (charCode << ((3 - (byteIndex % 4)) * 8));
    byteIndex++;
  }

  // Append '1' bit
  const wordIndex = byteIndex >> 2;
  words[wordIndex] = (words[wordIndex] || 0) | (0x80 << ((3 - (byteIndex % 4)) * 8));

  // Pad to 56 mod 64 bytes
  const totalLengthWords = (((asciiBitLength + 64) >>> 9) << 4) + 15;
  while (words.length <= totalLengthWords) {
    words.push(0);
  }

  // Append length in bits (big-endian 64-bit integer, low 32 bits here)
  words[words.length - 1] = asciiBitLength;

  // Process each 512-bit chunk (16 32-bit words)
  const w: number[] = new Array(64);
  for (let chunk = 0; chunk < words.length; chunk += 16) {
    const h = [...hash];

    for (i = 0; i < 64; i++) {
      if (i < 16) {
        w[i] = words[chunk + i] || 0;
      } else {
        const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = ((w[i - 16] + s0 + w[i - 7] + s1) | 0);
      }

      const s1Major = rightRotate(h[4], 6) ^ rightRotate(h[4], 11) ^ rightRotate(h[4], 25);
      const ch = (h[4] & h[5]) ^ (~h[4] & h[6]);
      const temp1 = (h[7] + s1Major + ch + k[i] + w[i]) | 0;

      const s0Major = rightRotate(h[0], 2) ^ rightRotate(h[0], 13) ^ rightRotate(h[0], 22);
      const maj = (h[0] & h[1]) ^ (h[0] & h[2]) ^ (h[1] & h[2]);
      const temp2 = (s0Major + maj) | 0;

      h[7] = h[6];
      h[6] = h[5];
      h[5] = h[4];
      h[4] = (h[3] + temp1) | 0;
      h[3] = h[2];
      h[2] = h[1];
      h[1] = h[0];
      h[0] = (temp1 + temp2) | 0;
    }

    for (j = 0; j < 8; j++) {
      hash[j] = (hash[j] + h[j]) | 0;
    }
  }

  return hash
    .map((word) => (word >>> 0).toString(16).padStart(8, '0'))
    .join('');
}
