test('SecondHandPage module loads', () => {
  const mod = require('./SecondHandPage');
  expect(mod).toBeDefined();
});

test('SecondHandPage has a default export', () => {
  const mod = require('./SecondHandPage');
  expect(mod.default).toBeDefined();
});

test('SecondHandPage styles module loads', () => {
  const mod = require('./SecondHandPage.styles');
  expect(mod).toBeDefined();
});

test('SecondHandPage styles exports Facebook card components', () => {
  const styles = require('./SecondHandPage.styles');
  expect(styles.FacebookIconRing).toBeDefined();
  expect(styles.FacebookCardHandle).toBeDefined();
  expect(styles.FacebookCardTitle).toBeDefined();
  expect(styles.FacebookCardBody).toBeDefined();
  expect(styles.FacebookCardDivider).toBeDefined();
  expect(styles.FacebookCardButton).toBeDefined();
  expect(styles.FacebookWatermark).toBeDefined();
});

test('SecondHandPage styles exports AboutCard', () => {
  const { AboutCard } = require('./SecondHandPage.styles');
  expect(AboutCard).toBeDefined();
});

export {};
