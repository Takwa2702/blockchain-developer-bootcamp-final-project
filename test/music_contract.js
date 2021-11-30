let BN = web3.utils.BN;
const MusicContract = artifacts.require("MusicContract");
let { catchRevert } = require("./exceptionsHelpers.js");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MusicContract", function ( accounts ) {
  const [_artist, listener] = accounts;

  const songName = "Start Again";
  const creatorName = "OneRepublic";
  const genre = "Pop";
  const amountWei = web3.utils.toWei("0.05", "ether"); // 0.001 ether = 1000000000000000 wei
  const lastListener = "0x0000000000000000000000000000000000000000";
  let mcInstance;

  beforeEach(async () => {
    mcInstance = await MusicContract.new({from: _artist});
  });

  describe("Use Cases", () => {

      it("should have an artist assigned", async () => {
        assert.equal(
          typeof mcInstance.artist,
          "function",
          "artist address is not set"
        );
      });

      it("SongCounter has an initial value of 0", async () => {
        // verify is has an initila value of 0 
        const artistCounter = await mcInstance.songCount.call();
        assert.equal(artistCounter, 0, `Initial state should be zero`);
      });


     it("Artist should add song with provided song name, creator name, and genre", async () => {
      await mcInstance.addSong(songName, creatorName, genre, { from: _artist });

      const result = await mcInstance.getSong.call(0);

      assert.equal(
        result[0],
        songName,
        "the name of the last song does not match the expected value",
      );
      assert.equal(
        result[1],
        creatorName,
        "the name of the song's creator does not match the expected value",
      );
      assert.equal(
        result[2],
        genre,
        'the genre of the song does not match the expected value',
      );
      assert.equal(
        result[3],
        _artist,
        "the address adding the song should be listed as the artist",
      );
      assert.equal(
        result[4],
        lastListener,
        "the last listener address should be set to 0 when a song is added",
      );
     });


     it("should allow someone to buy the licence for listening the song and update the lastListner address in song", async () => {
      await mcInstance.addSong(songName, creatorName, genre, { from: _artist });
      var artistBalanceBefore = await web3.eth.getBalance(_artist);
      var listenerBalanceBefore = await web3.eth.getBalance(listener);

      await mcInstance.buySong(0, { from: listener, value: amountWei });

      var artistBalanceAfter = await web3.eth.getBalance(_artist);
      var listenerBalanceAfter = await web3.eth.getBalance(listener);

      const result = await mcInstance.getSong.call(0);

      assert.equal(
        result[4],
        listener,
        "the last listener address should be set listener when he buy a song",
      );

      assert.equal(
        new BN(artistBalanceAfter).toString(),
        new BN(artistBalanceBefore).add(new BN(amountWei)).toString(),
        "artist's balance should be increased by the price of the song",
      );

      assert.isBelow(
        Number(listenerBalanceAfter),
        Number(new BN(listenerBalanceBefore).sub(new BN(amountWei))),
        "listener's balance should be reduced by more than the price of the song (including gas costs)",
      );
    });

    it("should error when not enough value is sent when buying a song", async () => {
      await mcInstance.addSong(songName, creatorName, genre, { from: _artist });
      await catchRevert(mcInstance.buySong(0, { from: listener, value: 1 }));
    });

    it("should revert when someone that is not the artist tries to call addSong()", async () => {
      await catchRevert(mcInstance.addSong(songName, creatorName, genre, { from: listener }));
    });

   });

    

});
