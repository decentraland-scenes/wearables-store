import { ThumbnailPlane } from "./thumbnail"
import { cleanString, monthToString, wordWrap, fixImageUrl, ethClean } from "./helperFunctions"
import { AnimatedItem } from "./simpleAnimator"
import * as resource from "./resources/resources"
import { MenuItem } from "./menuItem"
import { createComponents, buy } from "../store/index";
import * as sfx from "./resources/sounds"
import { lobbyCenter } from "./resources/globals"





//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class WearableMenuItem extends MenuItem {
    public thumbNail:ThumbnailPlane
    public scale:Vector3
    public scaleMultiplier:number

    itemCard:Entity
    cardOffset:Vector3
    title:Entity
    titleText:TextShape
    collectionText:Entity
    collectionTextShape:TextShape
    priceTextRoot:Entity
    priceTextShape:TextShape
    rarityTextRoot:Entity
    rarityTextShape:TextShape    
    leftDetailsRoot:Entity    
    detailsRoot:Entity
    buyButton:Entity
    buyButtonText:TextShape
    buyButtonTextRoot:Entity
    availableCounter:Entity
    availableText:TextShape
    
    highlightRays:Entity
    highlightFrame:Entity
    // detailEventTitle:Entity    
    // detailTitle:TextShape
    // detailTextContent:TextShape
    // detailText:Entity
    // detailTextPanel:Entity


    constructor(
        _transform:TranformConstructorArgs,        
        _alphaTexture:Texture,
        _collection:any,
        _item:any)
        {
        super()
        this.addComponent(new Transform(_transform))     
        this.scale = new Vector3(1,0.5,1)
        this.scaleMultiplier = 1.2
        this.defaultItemScale = new Vector3(1,1,1)
        this.cardOffset = new Vector3(0,-0.55,-0)

        //selection event animation
        this.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0,0),
                scale: new Vector3(this.defaultItemScale.x, this.defaultItemScale.y, this.defaultItemScale.z)
            },
            {
                position: new Vector3(0,0.3,-0.8),
                scale:  new Vector3(this.defaultItemScale.x * this.scaleMultiplier, this.defaultItemScale.y * this.scaleMultiplier, this.defaultItemScale.z * this.scaleMultiplier)
            },
            2            
        ))

        // event card root
        this.itemCard = new Entity()
        this.itemCard.addComponent(new Transform({
            position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z),
            scale: new Vector3(1,1,1),
            
        }))
        this.itemCard.addComponent(resource.cardBGShape)
        this.itemCard.setParent(this)

        
        this.thumbNail = new ThumbnailPlane(
            new Texture(fixImageUrl(_item.image)), 
            {
                position:new Vector3(0,0.04,0),
                scale: new Vector3(1,1,1)
            } ,
            _alphaTexture)   
                   
        this.thumbNail.setParent(this.itemCard)         

        this.leftDetailsRoot = new Entity()
        this.leftDetailsRoot.addComponent(new Transform({
            position: new Vector3(-0.32,0.28, -0.02),
            scale: new Vector3(0.9,0.9,0.9)
        }))
        this.leftDetailsRoot.setParent(this.itemCard)
        
        this.collectionText = new Entity()
        this.collectionTextShape = new TextShape()
        
        // DETAILS APPEARING ON SELECTION EVENT
        this.detailsRoot = new Entity()
        this.detailsRoot.addComponent(new Transform())
        this.detailsRoot.setParent(this)
        
        const detailFontSize = 1
        
        // TITLE
        this.titleText = new TextShape()
        this.title = new Entity()
        let rawText:string = _item.metadata.wearable.name 
        log("item name: " + rawText)
        //  remove non-UTF-8 characters   
        rawText = cleanString(rawText)

        rawText = wordWrap(rawText,20,3)
        this.titleText.value = rawText
        this.titleText.font = new Font(Fonts.SanFrancisco_Heavy)
        this.titleText.height = 20
        this.titleText.width = 2
        this.titleText.resizeToFit = true
        
        this.titleText.fontSize = 2
        this.titleText.color = Color3.Black()
        this.titleText.hTextAlign = 'center'
        this.titleText.vTextAlign = 'center'        
        
        this.title.addComponent(new Transform({
            position: new Vector3(0,-0.6, -0.01),
            scale: new Vector3(0.3,0.3,0.3)
        }))
        this.title.addComponent(this.titleText)

        this.title.setParent(this.itemCard)      

        // PRICE
        this.priceTextRoot = new Entity()
        this.priceTextRoot.addComponent(new Transform({
            position: new Vector3(0,-1.05,0)
        }))

        this.priceTextShape = new TextShape()
        this.priceTextShape.value = ethClean(_item.price)  + " MANA"
        
        this.priceTextShape.fontSize = detailFontSize
        this.priceTextShape.font = new Font(Fonts.SanFrancisco_Heavy)

        this.priceTextRoot.addComponent( this.priceTextShape)
        this.priceTextRoot.setParent(this.itemCard)

        // RARITY
        this.rarityTextRoot = new Entity()
        this.rarityTextRoot.addComponent(new Transform({
            position: new Vector3(0,-0.75,0)
        }))

        this.rarityTextShape = new TextShape()
        this.rarityTextShape.value = _item.rarity
        this.rarityTextShape.color = Color3.Black()        
        this.rarityTextShape.fontSize = detailFontSize
        this.rarityTextShape.font = new Font(Fonts.SanFrancisco_Heavy)

        this.rarityTextRoot.addComponent( this.rarityTextShape)
        this.rarityTextRoot.setParent(this.itemCard)
        

        //AVAILABLE COUNT
        
        this.availableCounter = new Entity()
        this.availableCounter.addComponent(new Transform({
            position: new Vector3(0,-0.85,0)
        }))

        this.availableText = new TextShape()
        this.availableText.value = (_item.available + "/" + _item.maxSupply)
        this.availableText.color = Color3.Black()        
        this.availableText.fontSize = detailFontSize
        this.availableText.font = new Font(Fonts.SanFrancisco_Heavy)

        this.availableCounter.addComponent( this.availableText)
        this.availableCounter.setParent(this.itemCard)

        // -- BUY BUTTON
        this.buyButton = new Entity()
        this.buyButton.addComponent(new Transform({
            position: new Vector3(this.cardOffset.x, this.cardOffset.y-0.2, this.cardOffset.z),            
            scale: new Vector3(0.4, 0.4, 0.4)
        }))
        this.buyButton.addComponent(resource.buyButtonShape)
        this.buyButton.setParent(this.detailsRoot)
        this.buyButton.addComponent(new AnimatedItem(
            {
                position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z + 0.2),
                scale: new Vector3(0.1, 0.1, 0.1)
            },
            {   
                position: new Vector3(this.cardOffset.x+0.55, this.cardOffset.y-0.25, this.cardOffset.z-0.05),                
                scale: new Vector3(0.35, 0.35, 0.35)
            },
            1.8
        ))

        this.buyButtonTextRoot = new Entity
        this.buyButtonText = new TextShape()
        
        this.buyButtonText.color = Color3.FromHexString("#FFFFFF")
        this.buyButtonText.font = new Font(Fonts.SanFrancisco_Heavy)
        this.buyButtonText.hTextAlign = "center"
        

        this.buyButtonTextRoot.addComponent(this.buyButtonText)
        this.buyButtonTextRoot.addComponent(new Transform({
            position: new Vector3(0, 0.0, -0.05),
            scale: new Vector3(0.22, 0.22, 0.22)
        }))
        
        this.buyButtonTextRoot.setParent(this.buyButton)

        
        this.buyButtonText.value = "BUY"
        this.buyButton.addComponent(new OnPointerDown( 
            async function () {
                    buy(_collection.id, _item.blockchainId, _item.price);
                },
                {
                button: ActionButton.POINTER,
                hoverText: "BUY WEARABLE",
                }
            //movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
        ))

        
        // highlights BG on selection
        this.highlightRays = new Entity()
        this.highlightRays.addComponent(new Transform())
        this.highlightRays.addComponent(resource.highlightRaysShape)
        this.highlightRays.setParent(this.detailsRoot)
        this.highlightRays.addComponent(new AnimatedItem(
            {
                position:  new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z + 0.05),
                scale: new Vector3(0,0,0)
            },
            {
                position:  new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z + 0.05) ,
                scale: new Vector3(1,1,1)

            },
            3
        ))

        this.highlightFrame = new Entity()
        this.highlightFrame.addComponent(new Transform())
        this.highlightFrame.addComponent(resource.highlightFrameShape)
        this.highlightFrame.setParent(this.highlightRays)
      
    }
    updateItemInfo(_collection:any, _item:any){
        
        //image
        
        this.thumbNail.updateImage(new Texture(fixImageUrl(_item.image)))          
        
        //price
        this.priceTextShape.value = ethClean(_item.price) + " MANA"
        
        //rarity
        this.rarityTextShape.value = _item.rarity

        //available
        this.availableText.value = (_item.available + "/" + _item.maxSupply)

        //update buy button
        this.buyButtonText.value = "BUY"
        this.buyButton.getComponent(OnPointerDown).callback =  
            async function () {                
               buy(_collection.id, _item.blockchainId, _item.price);
                }
        this.buyButton.getComponent(OnPointerDown).hoverText = "BUY"
        this.buyButton.getComponent(OnPointerDown).button = ActionButton.POINTER

        //title
        let rawText:string = _item.metadata.wearable.name 
        //  remove non-UTF-8 characters
        rawText = cleanString(rawText)
        rawText = wordWrap(rawText,36,3)
        this.title.getComponent(TextShape).value = rawText

        
        //detail text
        //remove non-UTF-8 characters and wrap
        //this.detailTitle.value = wordWrap( cleanString(_item.metadata.wearable.name ),45,3)

        //remove non-UTF-8 characters and wrap
        //this.detailTextContent.value = ("\n\n" + wordWrap(cleanString("details"), 75, 11) + "</cspace>")

       

    }
    select(){   
         

        if(!this.selected){
           // engine.addEntity(this.detailsRoot)
            this.selected = true 
            this.buyButton.getComponent(AnimatedItem).isHighlighted = true  
            //this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = true       
            this.highlightRays.getComponent(AnimatedItem).isHighlighted = true       
           
            
        }
    }
    deselect(_silent?:boolean){
        if(this.selected){
            this.selected = false           
        }
        this.buyButton.getComponent(AnimatedItem).isHighlighted = false      
        //this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = false   
        this.highlightRays.getComponent(AnimatedItem).isHighlighted = false              
       
          
        
        
    }
    show(){

    }
    hide(){

    }
}

