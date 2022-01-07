(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{229:function(e,t,n){},244:function(e,t){},246:function(e,t){},248:function(e,t){},252:function(e,t){},278:function(e,t){},280:function(e,t){},289:function(e,t){},291:function(e,t){},301:function(e,t){},303:function(e,t){},421:function(e,t){},423:function(e,t){},430:function(e,t){},431:function(e,t){},541:function(e,t,n){},547:function(e,t,n){"use strict";n.r(t);var a=n(2),s=n.n(a),r=n(36),c=n.n(r),i=(n(229),n(22)),o=n(14),u=n(12),l=n.n(u),d=n(217),p=n.n(d),b=n(218),j=n.n(b),h=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.next=3,p()({mustBeMetaMask:!0});case 3:return(n=e.sent)?(console.log("MetaMask Ethereum provider successfully detected!"),a=window,s=a.ethereum,t=new j.a(n),s.on("chainChanged",(function(e){window.location.reload()})),s.on("disconnect",(function(e){window.location.reload()}))):console.log("Please install MetaMask!"),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=h,f="0x7C4904cc8A5d6a47ac2aFD54791A9CbDB106163a",g=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"songCount",type:"uint256"},{indexed:!0,internalType:"address",name:"artistCreator",type:"address"}],name:"LogSongRegistered",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"lastListener",type:"address"}],name:"LogSubscriptionSold",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{inputs:[{internalType:"string",name:"_songName",type:"string"},{internalType:"string",name:"_creatorName",type:"string"},{internalType:"string",name:"_genre",type:"string"},{internalType:"string",name:"_imgUrl",type:"string"},{internalType:"string",name:"_audioSrc",type:"string"}],name:"addSong",outputs:[{internalType:"bool",name:"success",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"buySong",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address payable",name:"_newArtist",type:"address"}],name:"changeArtistAddress",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_address",type:"address"}],name:"getListenerStatus",outputs:[{internalType:"enum MusicContrac.State",name:"state",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_sId",type:"uint256"}],name:"getSong",outputs:[{internalType:"string",name:"_songName",type:"string"},{internalType:"string",name:"_creatorName",type:"string"},{internalType:"string",name:"_genre",type:"string"},{internalType:"string",name:"_imgUrl",type:"string"},{internalType:"string",name:"_audioSrc",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"lastListener",outputs:[{internalType:"address payable",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"songCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"subscriptionPrice",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"}],O=n(220),x=n.n(O),y=(n(541),n(221)),v={Mainnet:1,Ropsten:3,Rinkeby:4,Goerli:5,Kovan:42,Localhost:1337},w=(new y.a({supportedChainIds:[v.Localhost,v.Rinkeby]}),["\u274c You MUST fill the required fields!","\u23f3 Waiting on transaction success...","\u2705 Your song submission is successful","\u2705 Your request is successful","\u274c Your request is faild"]),N=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return e?!!e&&"".concat(e.substring(0,t+2),"...").concat(e.substring(e.length-t-1)):""},k=(n(542),n(23)),S=n(1),M=window.ethereum;var C=function(){var e=Object(a.useRef)(null),t=Object(a.useState)(null),n=Object(o.a)(t,2),s=n[0],r=n[1],c=Object(a.useState)(!1),u=Object(o.a)(c,2),d=u[0],p=u[1],b=Object(a.useState)(!1),j=Object(o.a)(b,2),h=j[0],O=j[1],y=Object(a.useState)(!1),C=Object(o.a)(y,2),T=C[0],A=C[1],_=Object(a.useState)(!1),L=Object(o.a)(_,2),E=L[0],q=L[1],B=Object(a.useState)(""),F=Object(o.a)(B,2),R=F[0],P=F[1],D=Object(a.useState)(!1),U=Object(o.a)(D,2),Y=U[0],I=U[1],W=Object(a.useState)(""),J=Object(o.a)(W,2),G=J[0],H=J[1],K=Object(a.useState)(""),z=Object(o.a)(K,2),Q=z[0],V=z[1],X=Object(a.useState)(0),Z=Object(o.a)(X,2),$=(Z[0],Z[1]),ee=Object(a.useState)([]),te=Object(o.a)(ee,2),ne=te[0],ae=te[1],se=Object(a.useState)(),re=Object(o.a)(se,2),ce=re[0],ie=re[1],oe=Object(a.useState)(""),ue=Object(o.a)(oe,2),le=ue[0],de=ue[1],pe=Object(a.useState)(""),be=Object(o.a)(pe,2),je=be[0],he=be[1],me=Object(a.useState)(""),fe=Object(o.a)(me,2),ge=fe[0],Oe=fe[1],xe=Object(a.useState)(""),ye=Object(o.a)(xe,2),ve=ye[0],we=ye[1],Ne=Object(a.useState)(""),ke=Object(o.a)(Ne,2),Se=ke[0],Me=ke[1],Ce=Object(a.useState)(""),Te=Object(o.a)(Ce,2),Ae=Te[0],_e=Te[1],Le=Object(a.useState)(""),Ee=Object(o.a)(Le,2),qe=Ee[0],Be=Ee[1],Fe=Object(a.useState)(!1),Re=Object(o.a)(Fe,2),Pe=Re[0],De=Re[1],Ue=Object(a.useState)(!1),Ye=Object(o.a)(Ue,2),Ie=Ye[0],We=Ye[1],Je=Object(a.useState)(!1),Ge=Object(o.a)(Je,2),He=Ge[0],Ke=Ge[1];function ze(){return ze=Object(i.a)(l.a.mark((function t(){var n,a,s,r,c,i,o,u,d,p,b;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return Ke(!0),t.next=3,e.current.methods.songCount().call();case 3:return n=t.sent,$(n),t.next=7,e.current.methods.lastListener().call();case 7:return a=t.sent,ie(a),t.next=11,e.current.methods.getListenerStatus(M.selectedAddress).call();case 11:"1"===t.sent&&I(!0),s=[],r=0;case 15:if(!(r<n)){t.next=30;break}return t.next=18,e.current.methods.getSong(r).call();case 18:c=t.sent,i=c._songName,o=c._creatorName,u=c._genre,d=c._imgUrl,p=c._audioSrc,b={i:r,title:i,creator:o,genre:u,image:d,audioSrc:p},console.log(b),s.push(b);case 27:r++,t.next=15;break;case 30:console.log("Data Loaded Successfully"),ae(s),Ke(!1);case 33:case"end":return t.stop()}}),t)}))),ze.apply(this,arguments)}Object(a.useEffect)((function(){var t=!1;function n(){return(n=Object(i.a)(l.a.mark((function n(){var a;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null!==s){n.next=25;break}if(t){n.next=25;break}return p(!1),n.next=5,m();case 5:return a=n.sent,r(a),n.next=9,M.request({method:"eth_chainId"});case 9:if("0x4"===n.sent&&q(!0),p(!0),null===a){n.next=25;break}return e.current=new a.eth.Contract(g,f),n.prev=14,n.next=17,M.request({method:"eth_accounts"});case 17:n.sent.length>0&&M.isConnected()&&O(!0),n.next=24;break;case 21:n.prev=21,n.t0=n.catch(14),console.error(n.t0);case 24:M.on("accountsChanged",Ve);case 25:case"end":return n.stop()}}),n,null,[[14,21]])})))).apply(this,arguments)}return function(){n.apply(this,arguments)}(),function(){t=!0}}),[]),Object(a.useEffect)((function(){var t=!1;if(h){var n=function(){var n=Object(i.a)(l.a.mark((function n(){var a,s,r,c;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.current.methods.owner().call();case 2:return a=n.sent,n.next=5,e.current.methods.subscriptionPrice().call();case 5:return s=n.sent,n.next=8,e.current.methods.songCount().call();case 8:return r=n.sent,n.next=11,e.current.methods.lastListener().call();case 11:if(c=n.sent,t){n.next=19;break}return H(a),V(s),n.next=17,$e();case 17:$(r),ie(c);case 19:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n(),function(){ze.apply(this,arguments)}()}return function(){t=!0}}),[h]);var Qe=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(!0),e.prev=1,e.next=4,M.request({method:"eth_requestAccounts"});case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:A(!1);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),Ve=function(e){window.location.reload()},Xe=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=window){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,null===(t=window)||void 0===t||null===(n=t.ethereum)||void 0===n?void 0:n.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x".concat(v.Rinkeby.toString(16))}]});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ze=function(){var t=Object(i.a)(l.a.mark((function t(n){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,s.eth.getAccounts();case 3:return a=t.sent,et(w[2]),k.NotificationManager.warning(qe,"Wating",12e3),t.next=8,e.current.methods.buySong().send({from:a[0],value:Q},(function(e,t){e&&(console.log("Error: transaction rejectd"),et(w[5]),k.NotificationManager.error(qe,"faild",5e3))}));case 8:et(w[4]),k.NotificationManager.success(qe,"Successfull"),window.setTimeout((function(){window.location.reload(!1)}),3e3),console.log("Bueyd licence to listen the songs successfully");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),$e=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.eth.getAccounts();case 2:return t=e.sent,e.next=5,s.eth.getBalance(t[0]);case 5:n=e.sent,a=s.utils.fromWei(n,"ether"),P(a);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),et=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Be(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),tt=function(){var t=Object(i.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),""!==le&&""!==je&&""!==Se&&""!==ve){t.next=6;break}et(w[0]),k.NotificationManager.error(qe,"Uncomplete"),t.next=16;break;case 6:return De(!0),et(w[2]),k.NotificationManager.warning(qe,"Waiting",12e3),t.next=11,e.current.methods.addSong(le,je,ge,ve,Se).send({from:G},(function(e,t){e&&(console.log("Error: transaction rejectd"),et(w[5]),k.NotificationManager.error(qe,"Faild",5e3))}));case 11:et(w[3]),k.NotificationManager.success(qe,"Successfull"),De(!1),window.setTimeout((function(){window.location.reload(!1)}),3e3),console.log("New Song Added successfully");case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),nt=function(){var t=Object(i.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),""!==Ae){t.next=6;break}et(w[0]),k.NotificationManager.error(qe,"Uncomplete"),t.next=16;break;case 6:return We(!0),et(w[2]),k.NotificationManager.warning(qe,"Waiting",12e3),t.next=11,e.current.methods.changeArtistAddress(Ae).send({from:G},(function(e,t){e&&(console.log("Error: transaction rejectd"),et(w[5]),k.NotificationManager.error(qe,"Faild",5e3))}));case 11:We(!1),et(w[4]),k.NotificationManager.success(qe,"Successfull"),window.setTimeout((function(){window.location.reload(!1)}),3e3),console.log("Address of the artist changed successfully");case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(S.jsxs)("div",{className:"App",children:[null===s&&!d&&Object(S.jsx)("div",{className:"page-center",children:Object(S.jsxs)("div",{className:"alert info",children:[Object(S.jsx)("h1",{className:"no-margin-top",children:"Music Contract"}),Object(S.jsx)("p",{className:"no-margin",children:"Checking for MetaMask Ethereum Provider..."})]})}),null===s&&d&&Object(S.jsx)("div",{className:"page-center",children:Object(S.jsxs)("div",{className:"alert error",children:[Object(S.jsx)("h1",{className:"no-margin-top",children:"Music Contract"}),Object(S.jsx)("p",{className:"no-margin",children:"MetaMask is required to run this app! Please install MetaMask and then refresh this page."})]})}),null!==s&&d&&!E&&Object(S.jsx)("div",{className:"page-center",children:Object(S.jsxs)("section",{className:"card",children:[Object(S.jsx)("h1",{className:"no-margin-top",children:"Music Contract"}),Object(S.jsxs)("p",{className:"no-margin",children:["You must be connected to the ",Object(S.jsx)("strong",{children:"Rinkeby test network"})," ","for Ether transactions made via this app."]}),Object(S.jsx)("div",{className:"center",children:Object(S.jsx)("button",{className:"btn primaryBtn",type:"button",onClick:Xe,children:"Switch to Rinkeby"})})]})}),null!==s&&!h&&E&&Object(S.jsx)("div",{className:"page-center",children:Object(S.jsxs)("section",{className:"card",children:[Object(S.jsx)("h1",{className:"no-margin-top",children:"Music Contract"}),Object(S.jsx)("p",{children:"Connect with MetaMask, buy music and start listening!"}),Object(S.jsx)("div",{className:"center",children:Object(S.jsx)("button",{className:"btn primaryBtn",type:"button",onClick:Qe,disabled:T,children:"Connect with MetaMask"})})]})}),null!==s&&h&&E&&Object(S.jsxs)("div",{className:"page-center",children:[Object(S.jsx)("section",{className:"card",children:Object(S.jsxs)("h1",{className:"no-margin-top",children:[Object(S.jsx)("img",{className:"App-logo",src:"https://img.icons8.com/plasticine/100/000000/headphones--v2.png"}),"Your Portal to Music"]})}),Object(S.jsx)("span",{className:"address-card",children:Object(S.jsxs)("p",{children:[" Your Address: ",N(M.selectedAddress)," "]})}),Object(S.jsx)("span",{className:"get-some-ether",children:Object(S.jsxs)("p",{children:[" You can get some ethere from ",Object(S.jsx)("br",{})," ",Object(S.jsx)("a",{href:"https://faucet.rinkeby.io/",target:"_blank",children:"Rinkeby Authenticated Faucet"})," "]})}),Object(S.jsx)("span",{className:"balance-card",children:Object(S.jsxs)("p",{children:[" ETH balance: ",parseFloat(R).toFixed(4)," "]})}),Object(S.jsx)(k.NotificationContainer,{}),!0!==Y&&Object(S.jsx)("button",{className:"buyBtn",type:"button",onClick:Ze,children:"Buy Permission to Listen Song"}),Object(S.jsx)("span",{className:"lastListener",children:Object(S.jsxs)("p",{children:[" Last listener: ",N(ce)," "]})}),!1===He&&0!==ne.length&&Object(S.jsx)("div",{children:Object(S.jsx)("table",{className:"center",children:Object(S.jsx)("tbody",{children:ne.map((function(e,t){return Object(S.jsx)("tr",{children:Object(S.jsx)("td",{rowSpan:2,children:Object(S.jsx)("div",{className:"audio-player",children:Object(S.jsxs)("div",{className:"track-info",children:[Object(S.jsx)("img",{className:"artwork",src:e.image,alt:"track artwork for ".concat(e.title," by ").concat(e.creator)}),Object(S.jsx)("h2",{className:"title",children:e.title}),Object(S.jsxs)("h3",{className:"artist",children:[e.creator," - ",e.genre]}),Object(S.jsx)("h4",{className:"genre"}),Y&&Object(S.jsx)(x.a,{url:e.audioSrc,width:"278px",height:"50px",playing:!1,controls:!0})]})})})},t)}))})})}),!1===He&&0===ne.length&&Object(S.jsx)("div",{children:Object(S.jsx)("p",{className:"no-margin",style:{alignItems:"center"},children:"No Music Added \ud83e\udd37"})}),G.toLowerCase()===M.selectedAddress&&Object(S.jsx)("div",{className:"page-center",children:Object(S.jsx)("div",{className:"artist-fill-form",children:Object(S.jsxs)("form",{onSubmit:tt,children:[Object(S.jsx)("h4",{children:"Want to add a song?"}),Object(S.jsxs)("div",{className:"input-area",children:[Object(S.jsx)("label",{children:"Enter song name:"})," ",Object(S.jsx)("input",{value:le,onChange:function(e){return de(e.target.value)},required:!0})," "]}),Object(S.jsxs)("div",{className:"input-area",children:[Object(S.jsx)("label",{children:"Enter artist name:"})," ",Object(S.jsx)("input",{value:je,onChange:function(e){return he(e.target.value)},required:!0})," "]}),Object(S.jsxs)("div",{className:"input-area",children:[Object(S.jsx)("label",{children:"Select genre of song:"})," ",Object(S.jsxs)("select",{name:"genre",onChange:function(e){var t=e.target.value;Oe("DEFAULT"===t?"":e.target.value)},required:!0,children:[Object(S.jsx)("option",{value:"DEFAULT",children:"-- Select an option --"}),Object(S.jsx)("option",{value:"Classical",children:"Classical"}),Object(S.jsx)("option",{value:"Pop",children:"Pop"}),Object(S.jsx)("option",{value:"Rock",children:"Rock"}),Object(S.jsx)("option",{value:"Country",children:"Country"})]})," "]}),Object(S.jsxs)("div",{className:"input-area",children:[Object(S.jsx)("label",{children:"Enter image url:"})," ",Object(S.jsx)("input",{value:ve,onChange:function(e){return we(e.target.value)},required:!0})," "]}),Object(S.jsxs)("div",{className:"input-area",children:[Object(S.jsx)("label",{children:"Enter audio url:"})," ",Object(S.jsx)("input",{value:Se,onChange:function(e){return Me(e.target.value)},required:!0})," "]}),Object(S.jsx)("div",{className:"input-area",children:Object(S.jsx)("button",{className:"btn primaryBtn",type:"submit",disabled:Pe,children:"Submit Request"})})]})})}),G.toLowerCase()===M.selectedAddress&&Object(S.jsx)("div",{className:"page-center",children:Object(S.jsx)("div",{className:"artist-fill-form",children:Object(S.jsxs)("form",{onSubmit:nt,children:[Object(S.jsx)("h4",{children:"Want to change artist's Address?"}),Object(S.jsxs)("div",{className:"input-area",children:[Object(S.jsx)("label",{children:"Enter a new Address:"})," ",Object(S.jsx)("input",{value:Ae,onChange:function(e){return _e(e.target.value)},required:!0})," "]}),Object(S.jsx)("div",{className:"input-area",children:Object(S.jsx)("button",{className:"btn primaryBtn",type:"submit",disabled:Ie,children:"Submit Request"})})]})})})]}),Object(S.jsxs)("footer",{children:["\xa9 Music Blockchain | Made by"," ",Object(S.jsx)("a",{className:"App-link",href:"https://github.com/Takwa2702/blockchain-developer-bootcamp-final-project",target:"_blank",rel:"noopener noreferrer",children:"@Takwa2702"}),Object(S.jsx)("br",{}),"Final Project for Consensys Blockchain Bootcamp 2021"]})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,552)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),r(e),c(e)}))};c.a.render(Object(S.jsx)(s.a.StrictMode,{children:Object(S.jsx)(C,{})}),document.getElementById("root")),T()}},[[547,1,2]]]);
//# sourceMappingURL=main.4196ba6e.chunk.js.map