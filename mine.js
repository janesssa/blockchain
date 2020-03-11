const operations = require("./operations.js");
const fetch = require("node-fetch");

const fetchLastBlock = async () => {
  const res = await fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next');
  const json = await res.json();
  const open = json.open
  const count = json.countdown
  if(open){
    // console.log(json)
    return json
  } else {
    console.log(count, open)
    return count
  }
}

const createHash = data => {
  let hashString = [];
  let blockchain = data.blockchain;
  let blockData = blockchain.data;

  hashString.push(blockchain.hash);
  blockData.forEach(data => {
    hashString.push(data.from);
    hashString.push(data.to);
    hashString.push(data.amount);
    hashString.push(data.timestamp);
  });
  hashString.push(blockchain.timestamp);
  hashString.push(blockchain.nonce);
  // console.log('Creating initial hash string with following information\n', hashString);
  return hashString.join("");
};

const hashString = str => operations.hash(str);

const createNewHashStringWithoutNonce = (data, initHash) => {
    let newHashString = []
    let transactions = data.transactions

    newHashString.push(initHash)
    transactions.forEach(transaction => {
      newHashString.push(transaction.from)
      newHashString.push(transaction.to)
      newHashString.push(transaction.amount)
      newHashString.push(transaction.timestamp)
    });
    newHashString.push(data.timestamp)
    // console.log('Creating new hash string with the following information\n', newHashString)
    return newHashString.join('')
}

const createNewHashString = (newHashString, nonce) => {
    let hashString = newHashString + nonce
    // console.log('Generating hash...')
    let hash = operations.hash(hashString)
    return hash
}

const generateNonce = (str, nonce, count) => {
  let hash = "";
  while(!hash.startsWith('0000') && count >= 200){
    nonce++;
    hash = operations.hash(str + nonce)
    // console.log(hash, nonce, count)
  } 
  console.log('Succeeded hash: ', hash, ' with nonce ', nonce)
  return nonce
}

const postNonce = async (nonce) => {
  const data = {
    nonce: nonce,
    user: "Janessa 0935165"
  }
  const response = await fetch(
    "https://programmeren9.cmgt.hr.nl:8000/api/blockchain",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  console.log('Posting block with data: ', nonce, data, response)
  return await response.json();
}

const mine = async () => {
  const lastBlock = await fetchLastBlock()
  let nonce = ''
  if(!isNaN(lastBlock)){
    setTimeout(() => mine(), lastBlock - 2)
  } else {
    console.log('Go!')
    let initHash = createHash(lastBlock)
    initHash = hashString(initHash)
    let newHash = createNewHashStringWithoutNonce(lastBlock, initHash)
    nonce = generateNonce(newHash, 0, lastBlock.countdown)
    await postNonce(nonce).then((data) => {
      console.log(data)
    })
  }
}

mine()

module.exports = {
  createHash,
  hashString,
  createNewHashStringWithoutNonce, 
  generateNonce,
  createNewHashString, 
  fetchLastBlock
};
