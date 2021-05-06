import * as dclTx from "decentraland-transactions";
import * as eth from "eth-connect";
import { getProvider, Provider } from "@decentraland/web3-provider";
import { getUserAccount } from "@decentraland/EthereumController";
import { createMANAComponent } from "./components/mana";
import { createStoreComponent } from "./components/store";
import * as UI from "@dcl/ui-scene-utils";
import * as ECS from "@dcl/ecs-scene-utils";

export async function createComponents() {
  const provider = await getProvider();
  const requestManager: any = new eth.RequestManager(provider);
  const metaProvider: any = new eth.WebSocketProvider("wss://ws-mumbai.matic.today");
  const fromAddress = await getUserAccount();
  const metaRequestManager: any = new eth.RequestManager(metaProvider);
  const providers = {
    provider,
    requestManager,
    metaProvider,
    metaRequestManager,
    fromAddress,
  };

  const mana = await createMANAComponent(providers);
  const store = await createStoreComponent(providers);
  return { mana, store };
}

export async function buy(collectionId: string, blockchainId: string, price: string, forceApprove?: boolean) {
  if (!+price) return;
  const priceInEther = eth.fromWei(price, "ether");
  log(priceInEther);
  const { mana, store } = await createComponents();
  const storeContract = dclTx.getContract(dclTx.ContractName.CollectionStore, 80001);
  const balance = await mana.balance();
  const allowance = await mana.isApproved(storeContract.address);
  if (+price > +balance) {
    new UI.OkPrompt("Sorry, you do not have enough MANA", undefined, undefined, true);
    return;
  }
  log(+allowance);

  if (+price > +allowance && !forceApprove) {
    new UI.OptionPrompt(
      "Approve MANA",
      "Authorize the Store contract to operate MANA on your behalf",
      async () => {
        const custom = new UI.CustomPrompt("dark", undefined, 200);
        custom.addText("Please wait.\nThe transaction is being processed", 0, 50, undefined, 20);
        const loading = new UI.LoadingIcon(undefined, 0, -120);

        await mana.approve(storeContract.address).catch(() => {});
        await delay(1000);
        custom.hide();
        loading.hide();
        buy(collectionId, blockchainId, price, true);
        return;
      },
      async () => {
        await delay(200);
        log("reject, new prompt");
        new UI.OkPrompt(
          "You need to authorize the Store contract to be able to buy this item",
          undefined,
          undefined,
          true
        );
      },
      "Authorize",
      "Reject",
      true
    );
    return;
  }
  new UI.OkPrompt(
    `You are about to buy an item for ${eth.fromWei(price, "ether")} MANA`,
    () => {
      store.buy(collectionId, blockchainId, price);
    },
    undefined,
    true
  );

  return {
    balance: eth.fromWei(balance, "ether"),
    allowance: eth.fromWei(allowance, "ether"),
  };
}

export type Providers = {
  provider: Provider;
  requestManager: eth.RequestManager;
  metaProvider: Provider;
  metaRequestManager: eth.RequestManager;
  fromAddress: string;
};

export function delay(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const ent = new Entity();
    engine.addEntity(ent);
    ent.addComponent(
      new ECS.Delay(ms, () => {
        resolve();
        engine.removeEntity(ent);
      })
    );
  });
}