# AccoutEverywhere - More game composability
## Summary
New Composability Possibilities for NFT Games Game items and other data will be tied to account tokens, rather than wallets, making it possible to buy and sell entire accounts. In addition, trading account tokens will allow users to take over their play history on-chain, which has not previously been possible with NFT.

##Problem
There are two problems with the existing NFT game.

The first is trading accounts. The current NFT game is tied directly to the wallet and the NFT. This makes it difficult to perform transactions that have been done in previous online games, such as transferring accounts. In addition, non-NFT data on the game (e.g., play time, war history, etc.) is tied to the wallet and therefore cannot be used if transferred.

The second is chain selection.

The Ethereum chain has a large ecosystem and community, making it suitable for NFT transactions. However, it cannot create games that generate many transactions due to the high cost of gas. Conversely, Arbitrum is good for making full-on chain games because of its fast transactions and low gas prices, but its ecosystem is not as large as Ethereum's. As a result, it is difficult to make a satisfactory NFT game on one chain.


##Solution

For the first problem, the solution is to tie the NFT to the token. This allows not only the exchange of item NFTs as before, but also the trading of entire accounts; game data other than NFTs can also be referenced after the transfer, since they are tied to this account token and not to the wallet.

The second problem is solved by separating the data to be stored by chain.

The Ethereum chain controls ownership of the most important game data. This allows us to approach the Ethereum ecosystem. The actual game will be played on Arbitrum. This is where we store the item NFTs, as well as on-chain actions, SBTs, etc.

##User Flow
1.Purchase a gameplay account NFT
2.If No.1 is ETH, bridge and create an account on Arbitrum.
3.Minting characters for the game.
4.Play the game and fight the enemy
5.Owned characters, battle history, level, experience, etc. are tied to tokens.
6.Buying and selling account tokens makes the account transferable.

# deployed contract

## Arbitrum GOERLI

| contract  |                                                                                                                                                contract address |
| :-------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Item      | [0x9a98997826cb17cbab915e33f1e8604a11c76b9b](https://goerli-rollup-explorer.arbitrum.io/address/0x9a98997826cB17cBab915E33F1E8604A11C76b9b/tokens#address-tabs) |
| Accout    |                     [0x645914bf88184408c2a84029c83f576973f04d42](https://goerli-rollup-explorer.arbitrum.io/address/0x645914Bf88184408C2A84029C83f576973f04D42) |
| Chainlink |                     [0x816Ebc454c3d2A1058C6bd2CCA2d092B81bC47d9](https://goerli-rollup-explorer.arbitrum.io/address/0x816Ebc454c3d2A1058C6bd2CCA2d092B81bC47d9) |
