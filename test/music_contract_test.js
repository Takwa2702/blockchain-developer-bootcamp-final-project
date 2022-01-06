let BN = web3.utils.BN;
const MusicContract = artifacts.require("MusicContract");
let { catchRevert } = require("./exceptionsHelpers.js");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MusicContract", function ( accounts ) {
  const [_artist, listener, listener2] = accounts;

  const songName = "Start Again";
  const creatorName = "OneRepublic";
  // const newCreatorName = "OneRepublic ft. Logic"
  const genre = "Pop";
  const imageUrl = "https://i0.wp.com/dotunsblog.com.ng/wp-content/uploads/2018/05/One-Republic-–-Start-Again-Ft-Logic.jpg?resize=640%2C400&ssl=1";
  const audioUrl = "http://dotunsblog.com.ng/wp-content/uploads/2018/05/One_Republic_Ft_Logic_-_Start_Again_Dotunsblog.com.ng.mp3";
  const amountWei = web3.utils.toWei("0.05", "ether"); // 0.001 ether = 1000000000000000 wei
  const lastListener = "0x0000000000000000000000000000000000000000";
  let mcInstance;

  beforeEach(async () => {
    mcInstance = await MusicContract.new({from: _artist});
  });

  describe("Use Cases", () => {

      it("should have an artist assigned", async () => {
        assert.equal(
          typeof mcInstance.owner,
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
      await mcInstance.addSong(songName, creatorName, genre, imageUrl, audioUrl, { from: _artist });

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
        imageUrl,
        "the image url of the song does not match the expected value",
      );
      assert.equal(
        result[4],
        audioUrl,
        "the audio source url of the song does not match the expected value",
      );
     });


     it("should allow someone to buy the licence for listening the song, update the lastListner address and listener state as Buyed", async () => {
      await mcInstance.addSong(songName, creatorName, genre, imageUrl, audioUrl, { from: _artist });
      var artistBalanceBefore = await web3.eth.getBalance(_artist);
      var listenerBalanceBefore = await web3.eth.getBalance(listener);

      await mcInstance.buySong({ from: listener, value: amountWei });

      var artistBalanceAfter = await web3.eth.getBalance(_artist);
      var listenerBalanceAfter = await web3.eth.getBalance(listener);

      const result = await mcInstance.lastListener.call();
      const status = await mcInstance.getListenerStatus(listener, { from: listener });

      assert.equal(
        result,
        listener,
        "the last listener address should be set listener when he buy a song",
      );
      assert.equal(
        status,
        "1",
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
      await mcInstance.addSong(songName, creatorName, genre, imageUrl, audioUrl, { from: _artist });
      await catchRevert(mcInstance.buySong({ from: listener, value: 1 }));
    });

    it("should revert when someone that is not the artist tries to call addSong()", async () => {
      await catchRevert(mcInstance.addSong(songName, creatorName, genre, imageUrl, audioUrl, { from: listener2 }));
    });

    it("Artist should change artist's address with provided the new address", async () => {
      const tx = await mcInstance.changeArtistAddress(listener, { from: _artist });
  
      const result = await mcInstance.owner.call();
    
      assert.equal(
        result,
        listener,
        "the artist's address should be changed to the new address (listener)",
      );
     
     });

   });

 


});
