// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Contract for music/songs  
 * @author Takua Mokhamed
 * @notice Allows an artists to put up their songs for selling the license for listening them
 * @dev Songs license for listening them will be purchased and ether will be sent to the artist (creator of the song)
 */
contract MusicContract is Ownable {

    /// @notice Emitted when an Artist added the song 
    /// @param songCount Song id
    /// @param artistCreator Artist (creator) address
    event LogSongRegistered(uint indexed songCount, address indexed artistCreator);

    /// @notice Emitted when an Listener buys the license for listening the songs 
    /// @param lastListener listener address
    event LogSubscriptionSold(address indexed lastListener);
   
    /// @dev Tracks given song ids. Current value is the newest song id.
    uint public songCount = 0;
  
    // address payable public  artist; 
    address payable public  lastListener;

    constructor() {
        // //  Initialize the song count to 0 and artist already has licences to listen
        // artist = payable(msg.sender);
       
    }
    
    struct Song {
        uint songId;
        string sname;
        string creatorName;
        string genre;
        // address payable creator;
        // address lastListener;
        string imgUrl;
        string audioSrc;
    }
  
    mapping(uint => Song) private songs;
    
    enum State { 
      UNBUYED, 
      BUYED
    }

    /// @dev Tracks listeners buyed license for listening songs
    mapping(address => State) private listenerSongs;
    
    uint public constant subscriptionPrice = 50000000000000000; 


    modifier paidEnough() { 
    require(msg.value >= subscriptionPrice, "Not enough payment value"); 
        _;
    }

    modifier checkValue() {
      _;
      //refund them after pay for item 
      if( msg.value > subscriptionPrice)
      { 
        uint amountToRefund = msg.value - subscriptionPrice;
        address payable Listener = payable(msg.sender);
        (bool success, ) = Listener.call{ value: amountToRefund }("") ;
        require(success, "Buying song and returining the excess value to listtener failed." );
      }
    }


    /// @notice function to add a new song 
    /// @dev only artist (owner) can add song to list of songs 
    /// @param _songName is a song name
    /// @param _creatorName is a song creator name 
    /// @param _genre is a song genre
    /// @param _imgUrl is song imgUrl
    /// @param _audioSrc is song audioSrc
     function addSong(
      string memory _songName, 
      string memory _creatorName, 
      string memory _genre, 
      string memory _imgUrl,
      string memory _audioSrc) public
      onlyOwner returns (bool success){
        
        songs[songCount] = Song({
        songId: songCount,
        sname: _songName, 
        creatorName: _creatorName,
        genre: _genre,
        imgUrl: _imgUrl,
        audioSrc: _audioSrc
        });

        listenerSongs[msg.sender] = State.BUYED;

        songCount = songCount + 1;
      
       emit LogSongRegistered(songCount, msg.sender);

    return true;
    }

    /// @notice function to buy a song 
    /// @dev the function checks if the value transfered is enough to buy  song for listening it. 
    /// if the value is greater than the price of the song, then the value will be refunded.
    function buySong() public payable paidEnough() checkValue(){
        lastListener = payable(msg.sender);
        (bool success, ) = owner().call{ value: subscriptionPrice }("") ;
        require(success, "Buying song and adding the listtener to song failed." );
        listenerSongs[msg.sender] = State.BUYED;
        emit LogSubscriptionSold(msg.sender);
    }

    /// @notice function to change the artist;s address
    /// @dev only artist can change artist's address 
    /// @param _newArtist is a new adress of the song creator 
    function changeArtistAddress(
    address payable _newArtist)
    external onlyOwner returns (bool){
       transferOwnership(_newArtist);
       return true;
    }

    /// @notice function to get the song information according to the song's id passed
    /// @param _sId is an id of song
    // it is needed for front end
   function getSong(uint _sId) external view
     returns (
     string memory _songName,
     string memory _creatorName, 
     string memory _genre, 
     string memory _imgUrl, 
     string memory _audioSrc ) 
   { 
     _songName = songs[_sId].sname; 
     _creatorName = songs[_sId].creatorName; 
     _genre = songs[_sId].genre;  
     _imgUrl = songs[_sId].imgUrl;
     _audioSrc = songs[_sId].audioSrc;
     return (_songName, _creatorName, _genre, _imgUrl, _audioSrc); 
   } 
   
  /// @notice function to get the staus of listener; the listener paid 
  ///for subscription and byed the license to listen songs
  /// @param _address is an address of listener
  /// it is needed for front end
  function getListenerStatus(address _address) 
  external view  
  returns (State state){
   state = listenerSongs[_address];
   return state;
  }
  /// @notice Remove song from a listing
  /// @dev Only the artist can call this
  function removeSong() private onlyOwner  {
    // TODO: remove song from a listing and set status to NotAvailable
  }
    
}