import { getUserAccount } from "@decentraland/EthereumController";
import * as eth from "eth-connect";
import { getContract, ContractName } from "decentraland-transactions";
import { createMANAComponent } from "../store/components/mana";
import { createComponents, buy } from "../store/index";
import * as f from "../store/fetch";

import { WearableMenuItem } from "./menuItemWearable"
import { HorizontalScrollMenu } from "./horizontalScrollMenu"


import * as resource from "./resources/resources"
import * as sfx from "./resources/sounds"
import { wearableItemPlaceholder, collectionPlaceholder } from "./menuPlaceholders"
import { AnimatedItem } from './simpleAnimator'
import { loadMoreMenuItem } from './menuItemLoad'
import { CooldownActivated } from './cooldown'



// EVENTS MENU 
export function createWearablesHorizontalMenu (_transform: TranformConstructorArgs, _visibleItems:number ):HorizontalScrollMenu {

  let menuRoot = new Entity()
  let wearablesMenu = new HorizontalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  1.0,
  _visibleItems,
  resource.menuTopEventsShape,
  resource.wardrobeShape,
  "Events"
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  wearablesMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)
  
  //placeholder menuItems
 // for (let i = 0; i < vertEventMenu.visibleItemCount; i++){
  for (let i = 0; i < 10; i++){
    wearablesMenu.addMenuItem(new WearableMenuItem({    
        scale: new Vector3(1,1,1)
      },        
      resource.roundedSquareAlpha,
      collectionPlaceholder,
      wearableItemPlaceholder
    ))
  }

  let refreshRoot = new Entity()
  refreshRoot.addComponent(new Transform({
    position: new Vector3(2.35,-1.15,-0.65),
    rotation: Quaternion.Euler(27,0,0),
    scale: new Vector3(0.35, 0.35, 0.35)
  }))
  refreshRoot.addComponent(sfx.menuErrorSource)
  refreshRoot.setParent(wearablesMenu)

  let refreshButton = new Entity()
  refreshButton.addComponent(new Transform({
    position: new Vector3(0,0,-0.1),
    
  }))

  refreshButton.addComponent(new AnimatedItem(
    {
      position: new Vector3(0,0,-0.1),
      scale: new Vector3(1,1,1)
    },
    {
      position: new Vector3(0,0,0.0),
      scale: new Vector3(1,1,1)
    },
    2
  ))

  refreshButton.addComponent(new CooldownActivated(
    20,
    "REFRESH",
    "WAIT FOR COOLDOWN"
    ))
  refreshButton.addComponent(sfx.refreshSource)

  let cooldownText = new TextShape()
  cooldownText.value = "20"
  cooldownText.fontSize = 4

  refreshButton.addComponent(cooldownText)

  refreshButton.addComponent(resource.refreshShape)
  refreshButton.addComponent(
    new OnPointerDown(
      async function () {
        if(refreshButton.getComponent(CooldownActivated).active){
          refreshButton.getComponent(Transform).position.z = 0
          updateWearablesMenu(wearablesMenu, 30, false)
          refreshButton.getComponent(CooldownActivated).startCooldown()
          sfx.refreshSource.playOnce()
        } 
        else{
          sfx.menuErrorSource.playOnce()
        }
        
      },
      {
        button: ActionButton.POINTER,
        hoverText: "Refresh"
      }
    )
  )
 
  refreshButton.setParent(refreshRoot) 

  return wearablesMenu
}

export async function updateWearablesMenu(_menu:HorizontalScrollMenu, _count:number, _addLoadMoreButton:boolean){

  const { mana, store } = await createComponents();
  const storeContract = getContract(ContractName.CollectionStore, 80001);
  
  //log("MANA: " + eth.fromWei(await mana.balance(), "ether"))

  //const isApproved = await mana.isApproved(storeContract.address)

  //if(isApproved <  +eth.toWei(500, "ether")){
  //await mana.approve(storeContract.address, 1).catch(() => {});

  //}
  
  const { collections } = await f.storeCollections();
  const fromAddress = await getUserAccount();

  log(collections);
  let cubePosition = -1;
  let itemCount = 0
  log("number of Collections: " + collections.length)
  
  for (const collection of collections) {   
    log("number of items in collection: " + collection.items.length) 

    
    for (const item of collection.items) {
      
      if (+item.available > 0) {

        log("adding: " + item.metadata.wearable.name) 
        if(itemCount < _menu.items.length){
          _menu.items[itemCount].updateItemInfo(collection, item)
        }
        else{
          _menu.addMenuItem(new WearableMenuItem({    
              scale: new Vector3(1,1,1)
            },        
            new Texture("images/rounded_alpha.png"),
            collection,
            item
          ))
        }    
        itemCount++        
      }
    }
  }

  if(itemCount <= _menu.items.length){
    removeLastXItems(_menu, _menu.items.length - itemCount)
  } 

   //let events = await getEvents(_count)

  // if (events.length <= 0) {
  //   return
  // } 

  // // remove loadmore item
  // if(!_addLoadMoreButton){
  //   removeLastXItems(_menu, 1)
  // }
 

  // for(let i=0; i < events.length; i++){

  //   if (i < _menu.items.length){
  //     _menu.items[i].updateItemInfo(events[i])
  //   }
  //   else{
  //     _menu.addMenuItem(new EventMenuItem({    
  //         scale: new Vector3(2,2,2)
  //       },        
  //       new Texture("images/rounded_alpha.png"),
  //       events[i]
  //     ))
  //   }    
  // }
    

  // if(events.length <= _menu.items.length){
  //   removeLastXItems(_menu, _menu.items.length - events.length)
  // } 

  // if(_addLoadMoreButton){
  //   let loadButton = new loadMoreMenuItem({    
  //     scale: new Vector3(1,1,1)
  //     },
  //     _menu
  //     )
    
  //   loadButton.addComponent(
  //     new OnPointerDown(
  //       async function () { 
  //         loadButton.getComponent(Transform).position.z = 0
  //         updateWearablesMenu(_menu, 30, false)
  //       },
  //       {
  //         button: ActionButton.POINTER,
  //         hoverText: "LOAD MORE"
  //       }
  //     )
  //   )

  //   _menu.addMenuItem(loadButton)
  // }
 
  



  // _menu.resetScroll()
}

export async function fillWearablesMenu(_menu:HorizontalScrollMenu) {

  // let events = await getEvents(10)

  // if (events.length <= 0) {
  //   return
  // } 

  // for(let i=0; i < events.length; i++){
  //   _menu.addMenuItem(new EventMenuItem({    
  //     scale: new Vector3(2,2,2)
  //   },        
  //   new Texture("images/rounded_alpha.png"),
  //   events[i]
  // ))
  // }   
  
}


export function removeLastXItems(_menu:HorizontalScrollMenu, x:number){

  if(x >= 1 ){
    for(let i = 0; i < x; i++){
      _menu.removeMenuItem(_menu.items.length - 1)
    }
  }
  
}
