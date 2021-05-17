import { storeCollections } from "./store/fetch";
import { getUserAccount } from "@decentraland/EthereumController";
import * as eth from "eth-connect";
import { getContract, ContractName } from "decentraland-transactions";
import { createMANAComponent } from "./store/components/mana";
import { createComponents, buy } from "./store/index";
import * as f from "./store/fetch";
import { createCollectionsVerticalMenu, createWearablesHorizontalMenu, updateCollectionsMenu, updateWearablesMenu } from "./ui/menuMainFunctions";
import { fixImageUrl } from "./ui/helperFunctions";
import { collectionPlaceholder } from "./ui/menuPlaceholders";


const center = new Vector3(8,0,8)
const collectionMenuOffset = new Vector3(1.6, 2.05, -0.5)
// Horizontal MENUS
let rotation = Quaternion.Euler(0,45,0)
let posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(0,0,0))

// -- wearables menu
let wearablesMenu = createWearablesHorizontalMenu({
  position: posVec,
  rotation: rotation,
  scale: new Vector3(1,1,1)
  },
  2    
)

// -- Collections Menu
let collectionsMenu = createCollectionsVerticalMenu({
  //position: new Vector3(posVec.x -1.6, posVec.y +2.2, posVec.z-0.6),
  position: new Vector3(collectionMenuOffset.x, collectionMenuOffset.y, collectionMenuOffset.z),
  scale: new Vector3(1,1,1)
  },
  wearablesMenu,
  7 
)
updateCollectionsMenu(collectionsMenu, wearablesMenu, 10, true)




// function spawnCube(x: number, y: number, z: number, collection: any, item: any) {
//   const cube = new Entity();
//   cube.addComponent(
//     new Transform({
//       position: new Vector3(x, y, z),
//       scale: new Vector3(2, 3, 0.1),
//     })
//   );
//   cube.addComponent(new BoxShape());
//   cube.addComponent(
//     new OnClick(async () => {
//       buy(collection.id, collection.items[0].blockchainId, collection.items[0].price);
//     })
//   );
//   engine.addEntity(cube);

//   const text = new Entity();
//   text.setParent(cube);
//   text.addComponent(
//     new TextShape(
//       `Collection:\n${collection.name}\n\nItem:\n${item.metadata.wearable.name}\nPrice: ${eth.fromWei(
//         item.price,
//         "ether"
//       )} MANA\nRemaining: ${item.available}/${item.maxSupply}`
//     )
//   );
//   text.getComponent(TextShape).fontSize = 1;
//   text.getComponent(TextShape).hTextAlign = "left";
//   text.getComponent(TextShape).color = Color3.Black();
//   text.addComponent(
//     new Transform({
//       position: new Vector3(-0.45, 0.2, -0.9),
//       scale: new Vector3(3 / 3, 2 / 3, 1),
//     })
//   );

//   const image = new Entity();
//   image.setParent(cube);
//   image.addComponent(new PlaneShape());
//   image.addComponent(new BasicMaterial());
//   image.getComponent(BasicMaterial).texture = new Texture(fixImageUrl(item.image));
//   image.addComponent(
//     new Transform({
//       position: new Vector3(0, -0.3, -0.9),
//       scale: new Vector3(3 / 4, 2 / 4, 1),
//       rotation: new Vector3(0, 0, 180).toQuaternion(),
//     })
//   );
//   return cube;
// }



// executeTask(async () => {
//   const { mana, store } = await createComponents();
//   const storeContract = getContract(ContractName.CollectionStore, 80001);
  
//   //log("MANA: " + eth.fromWei(await mana.balance(), "ether"))

//   //const isApproved = await mana.isApproved(storeContract.address)

//   //if(isApproved <  +eth.toWei(500, "ether")){
//   //await mana.approve(storeContract.address, 1).catch(() => {});

//   //}
  
//   const { collections } = await f.storeCollections();
//   const fromAddress = await getUserAccount();

//   log(collections);
//   let cubePosition = -1;
//   for (const collection of collections) {    
//     for (const item of collection.items) {
//       if (+item.available > 0) {
//         spawnCube((cubePosition += 2.5), 1.7, 14, collection, item);
//       }
//     }
//   }
// });

