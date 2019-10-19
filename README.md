Election - DAPP
Build my first decentralized application, or Dapp, on the Ethereum Network!

Follow the steps below to download, install, and run this project.

Dependencies

NPM: https://nodejs.org

Truffle: https://github.com/trufflesuite/truffle

Ganache: http://truffleframework.com/ganache/

Metamask: https://metamask.io/

Step 1. Clone the project
git clone https://github.com/0x27b68e/Election.git

Step 2. Install dependencies
$ cd election
$ npm install

Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.

Step 4. Compile & Deploy Election Smart Contract
$ truffle migrate --reset You must migrate the election smart contract each time your restart ganache.

Step 5. Configure Metamask
Login to Metamask, choose RPC custom, in "New RPC URL" you past "localhost:8545"

Step 6. Run the Front End Application
$ npm run dev and Visit this URL in your browser: http://localhost:3000, Done 
