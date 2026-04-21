test('Icons module loads', () => {
  const mod = require('./Icons');
  expect(mod).toBeDefined();
});

test('IconFacebook is exported', () => {
  const { IconFacebook } = require('./Icons');
  expect(IconFacebook).toBeDefined();
  expect(typeof IconFacebook).toBe('function');
});

test('core icons are still exported after IconFacebook addition', () => {
  const { IconMapPin, IconPhone, IconMail, IconX, IconZoomIn } = require('./Icons');
  expect(IconMapPin).toBeDefined();
  expect(IconPhone).toBeDefined();
  expect(IconMail).toBeDefined();
  expect(IconX).toBeDefined();
  expect(IconZoomIn).toBeDefined();
});

export {};
