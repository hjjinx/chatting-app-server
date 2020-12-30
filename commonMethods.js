module.exports.getPersonIconColor = getPersonIconColor = (x) => {
  x = x.toLowerCase();
  let total = 0;
  for (let char of x) {
    total += char.charCodeAt(0);
  }
  return `hsl(${total}, 50%, 50%)`;
};
