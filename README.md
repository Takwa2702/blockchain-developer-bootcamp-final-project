# Final Project -  Music Blockchain-based System

# Music Blockchain-based System
Artists may submit original compositions, self-publish, control license choices, and manage distributes on the Ethereum-based music blockchain system. The Ethereum platform facilitates music licensing by allowing musicians to be paid via smart contracts and cryptocurrency.
## App Link
https://takwa2702.github.io/blockchain-developer-bootcamp-final-project/

## Screencast
https://youtu.be/9rj4CDxD3eQ

## Ethereum Address for Certification
0x53e27218f314A233f49Cb278Db8A5a9a9d7Fe8a1

## How to run this project locally:
 ### Prerequisites
   - Node.js >= v14
   - Truffle and Ganache
   - Yarn
   
 ### Contracts
   - Run yarn install in project root to install Truffle build and smart contract dependencies
   - Have a Ganache server running on port 8545 
   - truffle migrate --network development
   - truffle develop
   - To deploy the contract on Ganache: migrate --development
   - To run the tests: test
 ### Front-end
  - cd client
  - yarn install
  - yarn start launches a react app that can viewed in your browser at http://localhost:3000

## Project Structure
  - client: Project's React frontend.
  - contracts: Smart contracts that are deployed in the Ropsten testnet.
  - migrations: Migration files for deploying contracts in contracts directory.
  - test: Tests for smart contracts.


## Workflow

If the user is not connected to Metamask they will be prompted to do so. After connecting to Metamask, the user can click on "Buy Permission to Listen Music" to buy the license for listening sogs uploaded by artist. Adding more, this action will save the address as user of the platform and unlock the music. so the 0.05 ether will be sent to the artist.

As for artist, there are two main functionalities of the platform: adding song functionality and changing artist address functionality (the ownership transfered to anouther address).

## Environment variables for deploying on a testnet
    ACCOUNT_MNEMONIC=
    RINKEBY_ENDPOINT=

## To-do features
   - Song removal




