/**
 * Prints hello and bye bye
 * @param {anything} a Something.
 * @return {anything} its input.
 */
function f(a) {
  console.log('hello');
  console.log('bye bye');
  return a;
}
/**
 * Does nothing
 */
function g() {}
module.exports = {
  f,
  g,
};
console.log(f());
