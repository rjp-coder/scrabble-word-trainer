import wordList from './words.json'

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },

  randomLetters: (length=1)=>{
    let letter = "";
    while (!letter.length)letter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
    console.info(letter);
    console.assert(letter.trim().length==length);
    return letter;
  },

  randomVowel: ()=>{
    return utils.randomFromArray(['a','e','i','o','u']);
  },

  randomFromArray: (arr)=>{
    let i = Math.floor(utils.random(0,arr.length-1));
    return arr[i];
  },

  randomThreeLetterWord: ()=>{
    let word = utils.randomLetters(3);
    word=utils.replaceRandomChar(word,utils.randomVowel());
    return word;
  },

  replaceRandomChar:(str,rep)=>{
    let i = utils.random(0,str.length-1);
    let wordArr = str.split("");
    console.assert(wordArr.length==str.length);
    wordArr[i]=rep;
    let word = wordArr.join("");
    console.assert(word.length==str.length-1+rep.length);
    return word;
  },

  getGapWord:()=>{
    let word = utils.randomFromArray(wordList);
    word = utils.replaceRandomChar(word," ");
    return word;
  },

  getGapSolutions:(word)=>{
    let solutions = [];
    for (let wl of wordList){
      let isSolution=true;
      let letter="";
      for (let i=0; i< word.length; i++){
        if (word[i]==" ") {letter=wl[i]; continue};
        if (word[i].toLowerCase()!=wl[i].toLowerCase()) {
          isSolution=false; 
          break;
        }
      }
      if (isSolution)solutions.push({word:wl, letter:letter, isFound:false});
    }
    return solutions;
   }
};

export default utils