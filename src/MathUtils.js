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
   },

   getTileDistribution:(game="scrabble")=>{
    const tileDistributions = {
      scrabble:"A-9, B-2, C-2, D-4, E-12, F-2, G-3, H-2, I-9, J-1, K-1, L-4, M-2, N-6, O-8, P-2, Q-1, R-6, S-4, T-6, U-4, V-2, W-2, X-1, Y-2, Z-1, _-2",
      wordswithfriends:"_-2, E-13, A-9, I-8, O-8, T-7, R-6, S-5, D-5, N-5, L-4, U-4, H-4, G-3, Y-2, B-2, C-2, F-2, M-2, P-2, W-2, V-2, K-1, X-1, J-1, Q-1, Z-1"
    }
    const d = tileDistributions[game.toLowerCase()];
    if (!d) {
      console.error("Could not get tile distribution for " + game);
      return;
    }
    const arr = d.split(", ");
    let distribution = [];
    for (let a of arr){
      let letter = a.split("-")[0];
      let amount = a.split("-")[1];
      let i = 0;
      while (i<amount){
        distribution.push(letter);
        i++;
      }
    }
    return distribution;
   },

   solveTileRackForWords:(scrambleWord)=>{ //TODO start with answer list and work backwards
    let solutions = [];
    let answerList = wordList.map(word=>word.toLowerCase());
      for (let answer of answerList){
        let tileRack = scrambleWord.toLowerCase();
        let answerIsInRack = true;
        for (let letter of answer.split("")){
          if (tileRack.includes(letter)){
            tileRack=tileRack.replace(letter,"");
          } else if (tileRack.includes("_")){
            tileRack=tileRack.replace("_","");
          } else {
            answerIsInRack=false;
          }
        }
        if (answerIsInRack){
          solutions.push(answer);
        }
      }
      return solutions;
   },

   draw7Tiles:function (){
      let allTiles = utils.getTileDistribution("scrabble") ||[], i=0,scrambleWord="";
      while (i<7 && allTiles.length>0){
        let ri=Math.floor(Math.random()*allTiles.length);
        let tile = allTiles?.splice(ri,ri+1)[0];
        scrambleWord+=tile;
        i++;
      }
      return scrambleWord;
   }
};

export default utils