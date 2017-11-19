export const WordParserModule = (() => {
  /*
  Copyright (c) 2011 Andrei Mackenzie
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
  function editDistance(a, b) {
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    const matrix = [];

    // increment along the first column of each row
    for(let i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }

    // increment each column in the first row
    for(let j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(let i = 1; i <= b.length; i++){
      for(let j = 1; j <= a.length; j++){
        if(b[i-1] == a[j-1]){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }
  /* end citation for Copyright (c) 2011 Andrei Mackenzie */

  function findClosestWord(a, words) {
    let bestWord = words[0];
    let bestDist = editDistance(a, words[0])
    for (let i = 1; i < words.length; i++) {
      let b = words[i];
      let dist = editDistance(a, b);
      if (dist < bestDist) {
        bestWord = b;
        bestDist = dist;
      }
    }
    return bestWord;
  }

  const numberMap = {
    "one": 1,
    "two": 2,
    "to": 2,
    "too": 2,
    "three": 3,
    "four": 4,
    "for": 4,
    "fore": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "ate": 8,
    "nine": 9,
    "ten": 10,
    "tan": 10,
    "eleven": 11,
    "twelve": 12,
    "twenty": 20,
  };

  const charMap = {
    "DEE": "D",
      "SEE": "C",
      "BE": "B",
      "PEE": "P",
      "JAY": "J",
      "JAIL": "J",
      "KAY": "K",
      "EL": "L",
      "OUR": "R",
      "ARE": "R",
      "SEA": "C",
      "GO": "O",
      "OH": "O",
      "YOU": "U",
      "TEE": "T",
      "TEA": "T",
      "WHY": "Y",
      "AGE": "H"
  }

  function parseToInteger(num) {
    let n = parseInt(num);
    console.log(num)
    return isNaN(n) ? numberMap[num] : n;
  }

  function parseToCharacter(val) {
    if(val.length > 1) return charMap[val];
    else return val;
  }

  return {
    parseToCharacter: parseToCharacter,
    parseToInteger: parseToInteger,
    findClosestWord: findClosestWord,
    editDistance: editDistance
  }
})();
