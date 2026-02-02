import '@testing-library/jest-dom'

// Polyfill for crypto.randomUUID in test environment
if (typeof crypto === 'undefined' || !crypto.randomUUID) {
  const cryptoPolyfill = {
    randomUUID: () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
  };

  Object.defineProperty(global, 'crypto', {
    value: cryptoPolyfill,
    writable: true,
  });
}
