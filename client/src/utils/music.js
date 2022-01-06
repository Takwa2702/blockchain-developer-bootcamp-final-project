export const contractAddress = "0x2fc21fC5B47d4F617c82Fd0eE920B6F7Cc2723F0";
//export const contractAddress = "0x2fc21fC5B47d4F617c82Fd0eE920B6F7Cc2723F0";


export const abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "songCount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "artistCreator",
				"type": "address"
			}
		],
		"name": "LogSongRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "lastListener",
				"type": "address"
			}
		],
		"name": "LogSubscriptionSold",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_songName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_creatorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_genre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imgUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_audioSrc",
				"type": "string"
			}
		],
		"name": "addSong",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buySong",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_newArtist",
				"type": "address"
			}
		],
		"name": "changeArtistAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getListenerStatus",
		"outputs": [
			{
				"internalType": "enum MusicContrac.State",
				"name": "state",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sId",
				"type": "uint256"
			}
		],
		"name": "getSong",
		"outputs": [
			{
				"internalType": "string",
				"name": "_songName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_creatorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_genre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imgUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_audioSrc",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastListener",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "songCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subscriptionPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];