test('test common ', () => {
  expect(1 + 1).toBe(2);
  expect(2 + 2).not.toBe(5);
});

test('true or false ', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test('test number', () => {
  expect(3).toBeGreaterThan(2);
  expect(4).toBeLessThan(5);
});

test('test object', () => {
  const data = { name: 'zl' };
  data['age'] = 20;
  expect(data).toEqual({ name: 'zl', age: 20});
});
