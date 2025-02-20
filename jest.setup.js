// jest.setup.js
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill window.crypto if not present
if (!window.crypto) {
  window.crypto = {};
}
if (!window.crypto.getRandomValues) {
  window.crypto.getRandomValues = function(array) {
    const crypto = require('crypto');
    const randomBytes = crypto.randomBytes(array.length);
    for (let i = 0; i < array.length; i++) {
      array[i] = randomBytes[i];
    }
    return array;
  };
}
if (!window.crypto.subtle) {
  window.crypto.subtle = {
    digest: (algorithm, data) => {
      return new Promise((resolve, reject) => {
        try {
          const crypto = require('crypto');
          const hash = crypto.createHash('sha256');
          hash.update(Buffer.from(data));
          const buffer = hash.digest();
          // Convert Node Buffer to an ArrayBuffer
          resolve(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
        } catch (error) {
          reject(error);
        }
      });
    }
  };
}

// Existing framer-motion mock
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
      tr: React.forwardRef((props, ref) => <tr ref={ref} {...props} />),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});
