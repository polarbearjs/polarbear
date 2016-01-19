import test from 'blue-tape';

test('Should support object spread', assert => (new Promise((resolve) => {
  const obj1 = { a: 'a' };
  const obj2 = { b: 'a' };
  const obj3 = {
    ...obj1,
    ...obj2,
  };

  assert.deepEqual(obj3, Object.assign(obj1, obj2));
  resolve();
})));
