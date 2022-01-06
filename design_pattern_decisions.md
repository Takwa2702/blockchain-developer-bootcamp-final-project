# Design Patterns Used
## Access Control Design Patterns
Ownable design pattern used in three functions: addSong(), removeSong() and changeArtistAddress(). These functions do not need to be used by anyone else apart from the artist (contract deployer), i.e. the musician/artist.

## Inheritance and Interfaces
MusicContract inherits the OpenZeppelin Ownable contract to enable ownership for one managing artist/party.