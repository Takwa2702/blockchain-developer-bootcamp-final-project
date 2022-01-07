import { useEffect, useRef, useState } from "react"; 
import initWeb3 from "./utils/web3";
import { abi, contractAddress } from "./utils/music";
import ReactPlayer from "react-player";
import "./App.css";
import { ChainId } from "./utils/connectors";
import {listOfMessages } from "./utils/constants";
import { shortenAddress } from './utils/shortenAddress';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const { ethereum } = window;



function App() {
  const musicContract = useRef(null);
  const [web3, setWeb3] = useState(null);
  const [doneCheckingForMetaMask, setDoneCheckingForMetaMask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isRinkebyChain, setIsRinkebyChain] = useState(false);
  const [userBalance, setBalance] = useState("");
 


  const [hasPaid, setHasPaid] = useState(false); 
  const [artist, setArtist] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [songCount, setSongCount] = useState(0);
  const [songs, setSongs] = useState([]);
  const [lastListener, setLastListener] =  useState();

  const [songNameInputByArtist, setSongNameInputByArtist] = useState("");
  const [creatorNameInputByArtist, setCreatorNameInputByArtist] = useState("");
  const [genreInputByArtist, setGenreInputByArtist] = useState("");
  const [imagUrlInputByArtist, setImagUrlInputByArtist] = useState("");
  const [audioSrcInputByArtist, setAudioSrcInputByArtist] = useState("");
  const [newAddressInputByArtist, setNewAddressInputByArtist] = useState("");
  const [message, setMessage] = useState("");
  // // const [status, setStatus] = useState("...");

  // const [addingRecyclable, setAddingRecyclable] = useState(false);
  // const [rewardingUser, setRewardingUser] = useState(false);
  const [requestingAddSong, setRequestingAddSong] = useState(false);
  const [requestingChangingAddress, setRequestingChangingAddress] = useState(false);
  const [isloading, setLoading] =  useState(false);

  

  useEffect(() => {
    let cancelled = false;

    async function initWeb3WithProvider() {
      if (web3 === null) {
        if (!cancelled) {
          setDoneCheckingForMetaMask(false);
          const web3Instance = await initWeb3();
          setWeb3(web3Instance);

          // Transactions done in this app must be done on the Rinkeby test network.
          const chainId = await ethereum.request({ method: "eth_chainId" });
          if (chainId === "0x4") {
            setIsRinkebyChain(true);
          }

          setDoneCheckingForMetaMask(true);

          if (web3Instance !== null) {
            // Create Contract JS object.
            musicContract.current = new web3Instance.eth.Contract(
              abi,
              contractAddress
            );

            // Check to see if user is already connected.
            try {
              const accounts = await ethereum.request({
                method: "eth_accounts",
              });
              if (accounts.length > 0 && ethereum.isConnected()) {
                setConnected(true);
              }
            } catch (error) {
              console.error(error);
            }

            // Implement `accountsChanged` event handler.
            ethereum.on("accountsChanged", handleAccountsChanged);
          }
        }
      }
    }

    initWeb3WithProvider();
  

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    let cancelled = false;
    

    if (connected) {
      async function handler() {
         const artist = await musicContract.current.methods.owner().call();
         const subscriptionPrice = await musicContract.current.methods.subscriptionPrice().call();
         const songCount = await musicContract.current.methods.songCount().call();
         const lastListener = await musicContract.current.methods.lastListener().call();

        if (!cancelled) {
          setArtist(artist);
          setSubscriptionPrice(subscriptionPrice);
          await checkUserBalance();
          setSongCount(songCount);
          setLastListener(lastListener);
        }
      }
    
      handler();

      loadBlockchainData()
         
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);



  // .call() to get blockchain data
  // .send() to set transaction
  async function loadBlockchainData() {
   
      setLoading(true);
      const songCount = await musicContract.current.methods.songCount().call();
      setSongCount(songCount);
       
      const lastListener = await musicContract.current.methods.lastListener().call();
      setLastListener(lastListener);
      const user = await musicContract.current.methods.getListenerStatus(ethereum.selectedAddress).call();

      if(user === '1'){
        setHasPaid(true);
      }

      const songslist = [];
      // songs
      for(var i = 0; i < songCount; i++) {
          const songData = await musicContract.current.methods.getSong(i).call();
  
          const title = songData._songName;
          // setTitle(title);
          const creator = songData._creatorName;
          // setCreator(creator);
          const genre = songData._genre;
          // setGenre(songData._genre);
          // const creatorAddress = songData._creator;
          // // setCreatorAddress(creatorAddress);
          // const lastListener = songData._lastListener;
          // // setLastListener(songData._lastListener);
          const image = songData._imgUrl;
          // setImage(image);
          const audioSrc = songData._audioSrc;
          // setAudioSrc(audioSrc);
      
          const song = {
             i,
            title, 
            creator, 
            genre,
            // creatorAddress, 
            // lastListener, 
            image, 
            audioSrc};
           
          console.log(song);
          songslist.push(song);
        }

     console.log("Data Loaded Successfully");  
     setSongs(songslist);
     setLoading(false) 
    
  }

  const getAccount = async (_event) => {
    setConnecting(true);
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {}
    setConnecting(false);
  };

  const handleAccountsChanged = (_accounts) => {
    window.location.reload();
  };
 
  const handleChangeNetwork = async () => {
    if (window == null) {
      return;
    }

    await window?.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${ChainId.Rinkeby.toString(16)}` }],
    });
  };


  /**
   *
   * @dev All functions handling form submissions are defined in this section
   */
   const handleUserBuySong = async (event) => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();
      showMessage(listOfMessages[2]);
      NotificationManager.warning(message, 'Wating', 12000);
      await musicContract.current.methods
        .buySong()
        .send({
          from: accounts[0],
          value: subscriptionPrice,
        },  function(error, result) {
          if (error) {
            console.log(`Error: transaction rejectd`);
            showMessage(listOfMessages[5]);
            NotificationManager.error(message, 'faild', 5000);
          } 
          // else {
          //   console.log('Success TX: <b>' + result + '</b>');
          //   showMessage(listOfMessages[4]);
          //   NotificationManager.success(message, 'Successfull');
           
          // }
        });
        showMessage(listOfMessages[4]);
        NotificationManager.success(message, 'Successfull');
        window.setTimeout(function(){window.location.reload(false)},3000)
        console.log("Bueyd licence to listen the songs successfully");
  };

  const checkUserBalance = async () => {
    var userAdd = await web3.eth.getAccounts();
    var balance = await web3.eth.getBalance(userAdd[0]);
    var balanceInEther = web3.utils.fromWei(balance, "ether");
    setBalance(balanceInEther);
  };

  const showMessage = async (msg) => {
    setMessage(msg);
  };



  const handleArtistSubmission = async (event) => {
    event.preventDefault();
    
    if (songNameInputByArtist === "" || creatorNameInputByArtist === "" || audioSrcInputByArtist === "" || imagUrlInputByArtist === "") {
      showMessage(listOfMessages[0]);
      NotificationManager.error(message, 'Uncomplete');
    } else {
      setRequestingAddSong(true);
      showMessage(listOfMessages[2]);
     
      NotificationManager.warning(message, 'Waiting', 12000);
      await musicContract.current.methods
        .addSong(songNameInputByArtist, creatorNameInputByArtist, genreInputByArtist, imagUrlInputByArtist, audioSrcInputByArtist)
        .send({
          from: artist,
        },  function(error, result) {
          if (error) {
            console.log(`Error: transaction rejectd`);
            showMessage(listOfMessages[5]);
            NotificationManager.error(message, 'Faild', 5000);
          } 
          // else {
          //   console.log('Success TX: <b>' + result + '</b>');
            
           
          // }
         }) ;
    
      // NotificationManager.warning(message, 'Waiting', 5000);
      showMessage(listOfMessages[3]);
      NotificationManager.success(message, 'Successfull');
      
      setRequestingAddSong(false);

      window.setTimeout(function(){window.location.reload(false)},3000)
      console.log("New Song Added successfully"); 
    }
  };

  const handleArtistAddressChangeSubmission = async (event) => {
    event.preventDefault();
    
    if (newAddressInputByArtist === "") {
      showMessage(listOfMessages[0]);
      NotificationManager.error(message, 'Uncomplete');
    } else {
      setRequestingChangingAddress(true);
      showMessage(listOfMessages[2]);
     
      NotificationManager.warning(message, 'Waiting', 12000);
      await musicContract.current.methods
        .changeArtistAddress(newAddressInputByArtist)
        .send({
          from: artist,
        },  function(error, result) {
          if (error) {
            console.log(`Error: transaction rejectd`);
            showMessage(listOfMessages[5]);
            NotificationManager.error(message, 'Faild', 5000);
          // } else {
          //   console.log('Success TX: <b>' + result + '</b>');
            // showMessage(listOfMessages[4]);
            // NotificationManager.success(message, 'Successfull');
           }
           });
      
      setRequestingChangingAddress(false);
      showMessage(listOfMessages[4]);
      NotificationManager.success(message, 'Successfull');

      // window.location.reload(false);
      window.setTimeout(function(){window.location.reload(false)},3000)
      console.log("Address of the artist changed successfully"); 
    }
  };

  const handleDropdown = (event) => {
    var selection = event.target.value;

    if (selection === "DEFAULT") {
      setGenreInputByArtist("");
    } else {
      setGenreInputByArtist(event.target.value);
    }
  };

 

  
  return (
    <div className="App">
      {web3 === null && !doneCheckingForMetaMask && (
        <div className="page-center">
          <div className="alert info">
            <h1 className="no-margin-top">Music Contract</h1>
            <p className="no-margin">
              Checking for MetaMask Ethereum Provider...
            </p>
          </div>
        </div>
      )}

      {web3 === null && doneCheckingForMetaMask && (
        <div className="page-center">
          <div className="alert error">
            <h1 className="no-margin-top">Music Contract</h1>
            <p className="no-margin">
              MetaMask is required to run this app! Please install MetaMask and
              then refresh this page.
            </p>
          </div>
        </div>
      )}

      {web3 !== null && doneCheckingForMetaMask && !isRinkebyChain && (
        <div className="page-center">
          <section className="card">
            <h1 className="no-margin-top">Music Contract</h1>
            <p className="no-margin">
              You must be connected to the <strong>Rinkeby test network</strong>{" "}
              for Ether transactions made via this app.
            </p>
            <div className="center">
            <button
             className="btn primaryBtn"
             type="button"
             onClick={handleChangeNetwork}>Switch to Rinkeby</button>
             </div>
          </section>
        </div>
      )}

      {web3 !== null && !connected && isRinkebyChain && (
        <div className="page-center">
          <section className="card">
            <h1 className="no-margin-top">Music Contract</h1>
            <p>Connect with MetaMask, buy music and start listening!</p>
            <div className="center">
              <button
                className="btn primaryBtn"
                type="button"
                onClick={getAccount}
                disabled={connecting}
              >
                Connect with MetaMask
              </button>
            </div>
          </section>
        </div>
      )}

     {web3 !== null && connected && isRinkebyChain && (
        <div className="page-center">
           <section className="card">
              <h1 className="no-margin-top">
                <img className="App-logo" src="https://img.icons8.com/plasticine/100/000000/headphones--v2.png"/>
                  Your Portal to Music
              </h1>
             
            </section>
              <span className="address-card"><p> Your Address: {shortenAddress(ethereum.selectedAddress)} </p></span>
              <span className="get-some-ether"><p> You can get some ethere from <br/> <a href="https://faucet.rinkeby.io/" target="_blank">Rinkeby Authenticated Faucet</a> </p></span>
              <span className="balance-card"><p> ETH balance: {parseFloat(userBalance).toFixed(4)} </p></span>
              <NotificationContainer/>
              {(hasPaid !== true) && (<button
                className="buyBtn"
                type="button"
                onClick={handleUserBuySong}
              >
                Buy Permission to Listen Song
              </button>
              )}
              <span className="lastListener"><p> Last listener: {shortenAddress(lastListener)} </p></span>
            { isloading === false && songs.length !== 0 && (<div>
              
              <table className="center">
                <tbody>
                { songs.map((songData, i) => (
                  <tr key={i} >
                    <td rowSpan={2}>
                      <div className="audio-player">
                          <div className="track-info">
                                    <img className="artwork" src={songData.image} alt={`track artwork for ${songData.title} by ${songData.creator}`} />
                                    <h2 className="title">{songData.title}</h2>
                                    <h3 className="artist">{songData.creator} - {songData.genre}</h3>
                                    <h4 className="genre"></h4>
                                    { (hasPaid) && (<ReactPlayer
                                        url= {songData.audioSrc}
                                        width="278px"
                                        height="50px"
                                        playing={false}
                                        controls={true}
                                      />)} 
                                </div>
                              </div>
                          </td>
                        </tr>))}
                      </tbody>
                    </table>
                  </div>)}
            
            { isloading === false && songs.length === 0 && (
                  <div>
                    <p className="no-margin" style={{ alignItems: 'center' }}>
                    No Music Added 🤷</p>
                  </div>
            )}
            {/* Only artist fills this form */}
            
           {artist.toLowerCase() === ethereum.selectedAddress && (
              <div className="page-center">
              <div className="artist-fill-form">
                <form onSubmit={handleArtistSubmission}>
                  <h4>Want to add a song?</h4>
                  <div className="input-area">
                    <label>Enter song name:</label>{" "}
                    <input
                      value={songNameInputByArtist}
                      onChange={(event) =>
                        setSongNameInputByArtist(event.target.value)
                      }
                      required/>{" "}
                  </div>
                  <div className="input-area">
                    <label>Enter artist name:</label>{" "}
                    <input
                      value={creatorNameInputByArtist}
                      onChange={(event) => setCreatorNameInputByArtist(event.target.value)}
                      required/>{" "}
                  </div>
                  <div className="input-area">
                    <label>Select genre of song:</label>{" "}
                    <select name="genre" onChange={handleDropdown} required>
                        <option value="DEFAULT">-- Select an option --</option>
                        <option value="Classical">Classical</option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Country">Country</option>
                     </select>{" "}
                  </div>
                  <div className="input-area">
                    <label>Enter image url:</label>{" "}
                    <input
                      value={imagUrlInputByArtist}
                      onChange={(event) => setImagUrlInputByArtist(event.target.value)}
                    required/>{" "}
                  </div>
                  <div className="input-area">
                    <label>Enter audio url:</label>{" "}
                    <input
                      value={audioSrcInputByArtist}
                      onChange={(event) => setAudioSrcInputByArtist(event.target.value)}
                      required />{" "}
                  </div>
                  <div className="input-area">
                    <button
                      className="btn primaryBtn"
                      type="submit"
                      disabled={requestingAddSong}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
               </div>
               
              </div>
            
            )} 
             {artist.toLowerCase() === ethereum.selectedAddress && (
              <div className="page-center">
              <div className="artist-fill-form">
                <form onSubmit={handleArtistAddressChangeSubmission}>
                  <h4>Want to change artist's Address?</h4>
                  <div className="input-area">
                    <label>Enter a new Address:</label>{" "}
                    <input
                      value={newAddressInputByArtist}
                      onChange={(event) =>
                        setNewAddressInputByArtist(event.target.value)
                      }
                      required/>{" "}
                  </div>
                  <div className="input-area">
                    <button
                      className="btn primaryBtn"
                      type="submit"
                      disabled={requestingChangingAddress}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
               </div>
               
              </div>
            
            )} 
     

        </div>
        
      )}
     
      <footer>
        &copy; Music Blockchain | Made by{" "}
        <a className="App-link"
          href="https://github.com/Takwa2702/blockchain-developer-bootcamp-final-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Takwa2702 
        </a>
        <br />
        Final Project for Consensys Blockchain Bootcamp 2021
      </footer>

    </div>
  );
}

export default App;