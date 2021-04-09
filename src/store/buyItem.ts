import { getProvider } from "@decentraland/web3-provider";
import {
  ContractName,
  getContract,
  sendMetaTransaction,
} from "decentraland-transactions";
import * as eth from "eth-connect";

const buy = async (
  collectionId: string,
  blockchainId: string,
  price: string,
  buyerAddress: string
) => {
  const buy = new eth.SolidityFunction({
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC721CollectionV2",
            name: "collection",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "ids",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "prices",
            type: "uint256[]",
          },
        ],
        internalType: "struct CollectionStore.ItemToBuy[]",
        name: "_itemsToBuy",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  });
  const functionSignature = buy.toPayload([
    [[[collectionId, [blockchainId], [price]]], buyerAddress],
  ]);
  const provider = await getProvider();
  const requestManager: any = new eth.RequestManager(provider);
  const metaProvider: any = new eth.WebSocketProvider(
    "wss://ws-mumbai.matic.today"
  );
  const metaRequestManager: any = new eth.RequestManager(metaProvider);
  const manaConfig = getContract(ContractName.MANAToken, 80001);
  sendMetaTransaction(
    requestManager,
    metaRequestManager,
    functionSignature.data,
    manaConfig
  ).then((tx) => {
    log(tx);
  });
};

export default buy;
