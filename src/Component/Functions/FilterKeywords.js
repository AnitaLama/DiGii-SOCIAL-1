const insults = ['idiot', 'moron', 'loser'];
const puttingDown = ['dumb', 'stupid', 'i hate you'];
const blacklist = [
  { array: insults, type: 'insults' },
  { array: puttingDown, type: 'puttingDown' }
];

const FilterKeyWords = input => {
  // const value = blacklist.find(item => (input.toLowerCase().includes(item.toLowerCase()) ? 'insults' : undefined));
  let value;
  const inputText = input.toLowerCase();
  blacklist.map(blacklistType => {
    const check = blacklistType.array.find(item => inputText.includes(item));

    value = check ? blacklistType.type : value;
    return true;
  });
  return value;
};
export default FilterKeyWords;
