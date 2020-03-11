const operations = require("./operations.js");
const mine = require("./mine.js");
const assert = require("assert").strict;

describe("Operations", function() {
  describe("Convert to array", function() {
    it("Should delete whitespace", function() {
      let input = operations.deleteWhitespace("Deze text heeft whitespace");
      let result = "Dezetextheeftwhitespace";

      assert.deepEqual(input, result);
    });
    it("Should convert text to ASCII array", function() {
      let input = operations.convertStringToCharArray("text");
      let result = [116, 101, 120, 116];

      assert.deepEqual(input, result);
    });
    it("Should convert array into seperate numbers", function() {
      let input = operations.splitArrayIntoSingleNumbers([116, 101, 120, 116]);
      let result = [1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6];

      assert.deepEqual(input, result);
    });
  });
  describe("Chunk arrays", function() {
    it("Should split array into chunks of 10", function() {
      let input = operations.splitArrayIntoChunks([1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6]);
      let result = [
        [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
        [1, 6]
      ];

      assert.deepEqual(input, result);
    });
    it("Should complete chunks to mulitple of 10", function() {
      let input = operations.fillArrayUptoMultiplesOfTen([
        [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
        [1, 6]
      ]);
      let result = [
        [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
        [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]
      ];

      assert.deepEqual(input, result);
    });
  });
  describe("Calculating", function() {
    it("Should calculate new array", function() {
      let input = operations.calcNewArray([
        [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
        [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]
      ]);
      let result = [2, 7, 6, 2, 2, 4, 5, 7, 6, 8];

      assert.deepEqual(input, result);
    });
  });
  describe("Hashing", function() {
    it("Should generate correct hash", function() {
      let input = operations.applyHash([2, 7, 6, 2, 2, 4, 5, 7, 6, 8]);
      let result =
        "d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079";

      assert.deepEqual(input, result);
    });
    it("Should generate correct hash (start to finish)", function() {
      let input = operations.hash("000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312");
      let result = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf"

      assert.deepEqual(input, result);
    })
  });
});

describe("Mining", function () {
  describe("Create new hash", () => {
    let data = {
      blockchain: {
        _id: "5c5003d55c63d51f191cadd6",
        algorithm: "mod10sha,0000",
        hash:
          "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8",
        nonce: "10312",
        timestamp: 1548747788716,
        __v: 0,
        data: [
          {
            _id: "5c4f20695c63d51f191cadd1",
            from: "CMGT Mining Corporation",
            to: "Bob PIKAB",
            amount: 1,
            timestamp: 1548689513858
          }
        ]
      },
      transactions: [
        {
          _id: "5c5003d55c63d51f191cadd7",
          from: "CMGT Mining Corporation",
          to: "Bas BOOTB",
          amount: 1,
          timestamp: 1548747733261,
          __v: 0
        }
      ],
      timestamp: 1548748101396,
      algorithm: "mod10sha,0000",
      open: true,
      countdown: 57235
    };
    it("Should generate initial hashstring", () => {
      let input = mine.createHash(data);
      let result = "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312"

      assert.deepEqual(input, result);
    })
    it("Should hash initial string", () => {
      let input = mine.hashString("000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312");
      let result = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf";

      assert.deepEqual(input, result);
    })
    it("hash from documentation", () => {
      let input = mine.createNewHashString("00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cfCMGT Mining CorporationBas BOOTB115487477332611548748101396",3926);
      let result = "000068fe4cbbe34a1efaffb8959758fde8da0bdb82aad9e8b78815a22823afd4";

      assert.deepEqual(input, result);
    })
   
    it("Should generate new hashstring without nonce", () => {
      let input = mine.createNewHashStringWithoutNonce(data, "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf");
      let result = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cfCMGT Mining CorporationBas BOOTB115487477332611548748101396"

      assert.deepEqual(input, result);
    })
    // it("Should generate new hashstring with nonce", () => {
    //   let input = mine.createNewHashString("00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cfCMGT Mining CorporationBas BOOTB115487477332611548748101396", 1234);
    //   let result = "71b15c7a4e749cad039961de435520369e0bd428afe1063b39a00ab7dee717fb"
    //   // Is this result correct?

    //   assert.deepEqual(input, result);
    // })
  })
})
