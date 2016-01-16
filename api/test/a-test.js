import test from 'blue-tape';

const greet = (person) => `Hello ${person}!`;

test('A passing test', assert => (new Promise((resolve, reject) => {
  assert.equal(greet('Woz'), 'Hello Woz!');
  resolve();
})));

test('A failing test', assert => (new Promise((resolve, reject) => {
  assert.equal(greet('Steve'), 'Hello Not Woz!');
  resolve();
})));
