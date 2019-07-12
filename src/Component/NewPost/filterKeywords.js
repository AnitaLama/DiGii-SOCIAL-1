const insults = ['idiot', 'moron', 'loser'];
const puttingDown = ['dumb', 'stupid', 'i hate you'];
const blacklist = [
  { array: insults, type: 'insults' },
  { array: puttingDown, type: 'puttingDown' }
];

const FilterKeyWords = input => {
  // const value = blacklist.find(item => (input.toLowerCase().includes(item.toLowerCase()) ? 'insults' : undefined));
  let value;
  blacklist.map(blacklistType => {
    const abc = blacklistType.array.find(item => input.includes(item));

    value = abc ? blacklistType.type : value;
  });
  return value;
};
export default FilterKeyWords;
