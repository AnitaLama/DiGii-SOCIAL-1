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

const BlacklistedWords = input => {
  let inputText = input.toLowerCase();
  blacklist.map((blacklistType, i) => {
    blacklistType.array.map(blackListWord => {
      const regex = new RegExp(blackListWord, "g");
      inputText = inputText.replace(regex, ` <span> ${blackListWord} </span> `);
      
    });
  });
  return inputText;
};

const StrikedTerms = (input, terms) => {
  let value;
  let inputText = input.toLowerCase();
  terms
    && terms.length > 0
    && terms.map((term, i) => {
      const regex = new RegExp(term.Term, 'g');
      inputText = inputText.replace(regex, ` <span> ${term.Term} </span> `);
    });
  return inputText;
};

export { FilterKeyWords, BlacklistedWords, StrikedTerms };
