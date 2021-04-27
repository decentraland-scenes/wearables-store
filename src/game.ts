import { storeCollections } from "./store/fetch";
import { getUserAccount } from "@decentraland/EthereumController";
import * as eth from "eth-connect";
import { getContract, ContractName } from "decentraland-transactions";
import { createMANAComponent } from "./store/components/mana";
import { createComponents, buy } from "./store/index";
import * as f from "./store/fetch";

function spawnCube(x: number, y: number, z: number, textString: string = "", onClick?: OnClick) {
  const cube = new Entity();
  cube.addComponent(
    new Transform({
      position: new Vector3(x, y, z),
      scale: new Vector3(2, 3, 0.1),
    })
  );
  cube.addComponent(new BoxShape());
  engine.addEntity(cube);
  if (onClick) cube.addComponent(onClick);

  const text = new Entity();
  text.setParent(cube);
  text.addComponent(new TextShape(textString));
  text.getComponent(TextShape).fontSize = 1;
  text.getComponent(TextShape).hTextAlign = "left";
  text.getComponent(TextShape).color = Color3.Black();
  text.addComponent(new Transform({ position: new Vector3(-0.35, 0, -0.9) }));

  return cube;
}

executeTask(async () => {
  const { mana, store } = await createComponents();
  const storeContract = getContract(ContractName.CollectionStore, 80001);

  await mana.approve(storeContract.address, 1).catch(() => {});

  const { collections } = await f.storeCollections();
  const fromAddress = await getUserAccount();

  log(collections);
  let cubePosition = -1;
  for (const collection of collections) {
    for (const item of collection.items) {
      if (+item.available > 0) {
        const cube = new Entity();
        cube.addComponent(
          new Transform({
            position: new Vector3((cubePosition += 2.5), 1.7, 14),
            scale: new Vector3(2, 3, 0.1),
          })
        );
        cube.addComponent(new BoxShape());
        cube.addComponent(
          new OnClick(async () => {
            buy(collection.id, collection.items[0].blockchainId, collection.items[0].price);
          })
        );
        engine.addEntity(cube);

        const text = new Entity();
        text.setParent(cube);
        text.addComponent(
          new TextShape(
            `Collection:\n${collection.name}\n\nItem:\n${item.metadata.wearable.name}\nPrice: ${eth.fromWei(
              item.price,
              "ether"
            )} MANA\nRemaining: ${item.available}/${item.maxSupply}`
          )
        );
        text.getComponent(TextShape).fontSize = 1;
        text.getComponent(TextShape).hTextAlign = "left";
        text.getComponent(TextShape).color = Color3.Black();
        text.addComponent(
          new Transform({
            position: new Vector3(-0.45, 0.2, -0.9),
            scale: new Vector3(3 / 3, 2 / 3, 1),
          })
        );

        const image = new Entity();
        image.setParent(cube);
        image.addComponent(new PlaneShape());
        image.addComponent(new BasicMaterial());
        image.getComponent(BasicMaterial).texture = new Texture(fixImageUrl(item.image));
        image.addComponent(
          new Transform({
            position: new Vector3(0, -0.3, -0.9),
            scale: new Vector3(3 / 4, 2 / 4, 1),
            rotation: new Vector3(0, 0, 180).toQuaternion(),
          })
        );
      }
    }
  }
});

function fixImageUrl(imageUrl: string) {
  return "https://peer.decentraland.zone/lambdas" + imageUrl.split("/lambdas")[1];
}
