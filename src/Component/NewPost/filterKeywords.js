const blacklist = ['idiot', 'moron', 'i hate you', 'loser'];

const FilterKeyWords = input => {
  const value = blacklist.find(item => input.toLowerCase().includes(item.toLowerCase()));
  return value;
};
export default FilterKeyWords;
