# Using the DAPP

- you can start by creating a wallet after your have connected you EOA to the application

![image](https://github.com/Chaitu-Tatipamula/Account-Abstraction/assets/107246959/191c53da-a659-454d-8f99-b104023aa1af)

- adding more than one signers to the wallet is allowed here, so when you do a transaction you have to sign it in the other EOA's as well 

![image](https://github.com/Chaitu-Tatipamula/Account-Abstraction/assets/107246959/5b990416-1a61-4859-8838-54957b10b185)

- all the created wallets will be listed here in api/create-wallet route the wallet is initially undeployed after sending a transaction this gets deployed, but for you to do a transaction firstly you have to send some funds to it, send some of your GoerliETH to created wallet

![image](https://github.com/Chaitu-Tatipamula/Account-Abstraction/assets/107246959/424ce199-d3bd-4a72-836e-b89dfafdaa06)

- this page allows you to perform simple transactions such as asending ETH, you have to execute the transaction by signing the transaction in all the EOA's that you have added while creating the wallet

![image](https://github.com/Chaitu-Tatipamula/Account-Abstraction/assets/107246959/de8b3889-8cc1-4d2d-803e-b11a9c2f8061)


- in the transaction the userop went through the entrypoint contract and we're just revealing the address but not our public key anywhere..!!

WalletFactory address 0x3dDFb5a58408fE486308cE9C99dAf4Cac6fd9Be7

# Setting up the project
use these for project setup on your local machine

Next app setup:
```bash
npm install
```

also setup your .env file with these fields 
```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
DATABASE_URL=""
NEXT_PUBLIC_STACKUP_API_KEY=""
```
grab walletconnect project id from dashboard of https://walletconnect.com/ and stackup api key by signing up to https://www.stackup.sh/

you should be having a database which is already created to keep track of all the wallets that are created and the transactions that are carried out by our deployed wallets, so that we could show them on our frontend here i'm using postgresql from https://supabase.com/ you can get one as well
initialize a prisma client in your project with
```bash
npx prisma init
```
Your database must contain 3 tables which could store wallet info, transaction info and TransactionSignatures info
```bash
model Wallet {
  id Int @id @default(autoincrement())

  address    String   @unique
  signers    String[] @default([])
  isDeployed Boolean  @default(false)

  salt         String
  transactions Transaction[]
}

model Transaction {
  id Int @id @default(autoincrement())

  walletId Int
  wallet   Wallet @relation(fields: [walletId], references: [id])

  txHash String?

  userOp     Json
  signatures TransactionSignature[]
}

model TransactionSignature {
  id Int @id @default(autoincrement())

  transactionId Int
  transaction   Transaction @relation(fields: [transactionId], references: [id])

  signerAddress String
  signature     String
}
```
actually these things are done for you, you should only be doing this below step

after creating the model in scheme.prisma file in prisma folder do 
```bash
npx prisma db push
```
thats it, your database is ready with 3 tables: Wallet, Transaction and Transaction Signatures

if you don't have already deployed contracts of Wallet and WalletFactory 
set up contracts using foundry:
```bash
forge install
```
setup the .env file as below:
```bash
GOERLI_RPC_URL=""
PRIVATE_KEY=""
ETHERSCAN_API_KEY=""
```
you can get GOERLI_RPC_URL from alchemy dashboard https://dashboard.alchemy.com/apps, PRIVATE_KEY of metamask wallet account details, ETHERSCAN_API_KEY from etherscan dashboard https://etherscan.io/login
then ypu can run the deployment script using 
```bash
forge script script/WalletFactory.s.sol --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvv
```
go with these methods for building it from scratch:
```bash
forge init contracts
```
and then you can also mess around with the packages that i used:
1. openzeppelin-contracts
2. account-abstraction

```bash
forge install OpenZeppelin/openzeppelin-contracts
```
```bash
forge install eth-infinitism/account-abstraction
```
after that set the remappings for easy imports in foundry then start writing the smart contracts for Wallet and WalletFactory also give the deployment script or else you can deploy them in your own way but should have all the dependencies such as contracts like ECDSA.sol, IEntryPoint.sol, UserOperation.sol, BaseAccount.sol, UUPSUpgradeable.sol, TokenCallbackHandler.sol etc not only them you should be having all of the openzeppelin contracts and also contracts from accountt-abstraction sdk as well
and then just deploy using the deployment command of foundry


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
