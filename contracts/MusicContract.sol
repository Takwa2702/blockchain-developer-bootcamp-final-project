// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.16 <0.9.0;

/**
 * @title Contract for music/songs  
 * @author Takua Mokhamed
 * @notice Allows an artists to put up their songs for selling the license for listening them
 * @dev Songs license for listening them will be purchased and ether will be sent to the artist (creator of the song)
 */
contract MusicContract {
   
    uint public songCount;
    address public artist; //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    
    struct Song {
        string sname;
        string creatorName;
        string genre;
        address payable creator;
        address payable lastListener;
    }

    
    mapping(uint => Song) public songs;
    
    uint public constant songPrice = 50000000000000000; 

    constructor() public{
        //  Initialize the song count to 0
        songCount = 0;
        artist = msg.sender;
    }
    
    event LogSongRegistered(uint songCount);

    event LogSongSold(uint songCount);

    modifier paidEnough() { 
    require(msg.value >= songPrice, "Not enough payment value"); 
        _;
    }

    modifier checkValue() {
    _;
    //refund them after pay for item 
    uint amountToRefund = msg.value - songPrice;
    address payable buyer = msg.sender;
    (buyer).transfer(amountToRefund); 
     
    }

    modifier isArtist(address _address) { 
    require(_address == artist, "Not an artist! only artist can add song"); 
        _;
    }

    /// @notice function to add a new song 
    /// @dev only artist can add song to list of songs 
    /// @param _songName is a song name;
    /// @param _creatorName is a song creator name 
    /// @param _genre is a song genre
    function addSong(
      string memory _songName, 
      string memory _creatorName, 
      string memory _genre) public 
      isArtist(msg.sender) returns (bool success){

        songs[songCount++] = Song({
        sname: _songName, 
        creatorName: _creatorName,
        genre: _genre, 
        creator: msg.sender,
        lastListener: address(0)
        });
    
    emit LogSongRegistered(songCount);

    return true;
    }

    /// @notice function to buy a song 
    /// @dev the function checks if the value transfered is enough to buy  song for listening it. 
    /// if the value is greater than the price of the song, then the value will be refunded.
    /// @param _sId is an id of song
    function buySong(uint _sId) public payable  paidEnough() checkValue(){
    songs[_sId].lastListener = msg.sender;
    songs[_sId].creator.transfer(songPrice);
    emit LogSongSold(_sId);
    }

    /// @notice function to change the song  creator address and name
    /// @dev only artist can add song to list of songs
    /// @param _songId is an id of song
    /// @param _newName is a new creator name 
    /// @param _newcreator is a new adress of the song creator 
    function changeSongCreator(uint _songId,string memory _newName , address payable _newcreator) public isArtist(msg.sender) returns (bool){
       songs[_songId].creatorName = _newName;
       songs[_songId].creator = _newcreator;
       return true;
    }

    /// @notice function to get the song information according to the song's id passed
    /// @param _sId is an id of song
    // it is needed to run tests
   function getSong(uint _sId) public view
     returns (string memory _songName,string memory _creatorName, string memory _genre, address _creator, address _lastListener) 
   { 
     _songName = songs[_sId].sname; 
     _creatorName = songs[_sId].creatorName; 
     _genre = songs[_sId].genre;  
     _creator = songs[_sId].creator; 
     _lastListener = songs[_sId].lastListener; 
     return (_songName, _creatorName, _genre, _creator, _lastListener); 
   } 


    
}