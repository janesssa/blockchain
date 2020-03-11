const sha256 = require("js-sha256").sha256;

const deleteWhitespace = str => {
  // console.log("Deleting white space...");
  const newStr = str.replace(/\s/g, "");
  // console.log(newStr)
  return newStr
};

const convertStringToCharArray = str => {
  let newArray = Array.from(str).map(value => {
    return isNaN(value) ? value.charCodeAt(0) : value;
  });
  // console.log("Converting string to ASCII array...");
  // console.log(newArray)
  return newArray;
};

const splitArrayIntoSingleNumbers = arr => {
  let splitArray = [];
  arr.forEach(value => {
    let str = value.toString();
    for (let i = 0; i < str.length; i++) {
      splitArray.push(parseInt(str.charAt(i)));
    }
  });
  // console.log("Splitting array into single numbers...");
  // console.log(splitArray)
  return splitArray;
};

const splitArrayIntoChunks = arr => {
  let array = [];
  let j = 10;
  for (let i = 0; i < arr.length; i += 10) {
    array.push(arr.slice(i, j));
    j += 10;
  }
  // console.log("Splitting array into chunks...");
  // console.log(array)
  return array;
};

const fillArrayUptoMultiplesOfTen = arr => {
  const array = arr[arr.length - 1]
    if (array.length % 10 !== 0) {
      for (let i = 0; i < 10; i++) {
        if (array.length % 10 !== 0) {
          array.push(i);
        }
      }
    }
  // console.log("Filling array up to a multiple of ten...");
  // console.log(arr)
  return arr;
};

const addArray = (first, second, firstChunk) => {
  if(first.length === 0 && second.length === 0){
    return firstChunk
  } else {
    firstChunk.push((first[0] + second[0]) % 10);
    first.shift()
    second.shift()
    // console.log('new: ',firstChunk)
    // console.log('first :', first)
    // console.log('second: ',second)
    return addArray(first, second, firstChunk)
  }
}

const calcNewArray = chunks => {
  // console.log('Chunking array...')
  if (chunks.length === 1) {
    return chunks[0];
  } else {
    // console.log('chunks',chunks)
    const firstArr = chunks.shift();
    const secondArr = chunks.shift();
    let chunk = []
    chunk = addArray(firstArr, secondArr, [])
    chunks.unshift(chunk);
    return calcNewArray(chunks);
  }
};

const applyHash = arr => {
  let str = arr.join("").toString();
  // console.log("Applying hash ", str);
  return sha256(str);
};

const hash = str => {
  let hash = deleteWhitespace(str);
  hash = convertStringToCharArray(hash);
  hash = splitArrayIntoSingleNumbers(hash);
  hash = splitArrayIntoChunks(hash);
  hash = fillArrayUptoMultiplesOfTen(hash);
  hash = calcNewArray(hash);
  return applyHash(hash);
};

module.exports = {
  deleteWhitespace,
  convertStringToCharArray,
  splitArrayIntoSingleNumbers,
  splitArrayIntoChunks,
  fillArrayUptoMultiplesOfTen,
  calcNewArray,
  applyHash,
  hash
};
