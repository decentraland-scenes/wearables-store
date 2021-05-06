import { WearableMenuItem } from "./menuItemWearable"
import { AnimatedItem } from "./simpleAnimator"
import * as resource from "./resources/resources"
import * as sfx from "./resources/sounds"
import { MenuItem } from "./menuItem"




@Component("HorizontalScroller")
export class HorizontalScroller{  

    base:number = 0
    stops:number = 0
    currentItem:number = 0    
    scrollTarget:number = 0
    scrollStep:number = 2.2
    scrollFraction:number =0
    speed:number = 3
    currentMenuVelocity:number = 0   

    constructor(){          
    }

    scrollUp(){ 
        if(this.currentItem < this.stops - 1){                 
            this.currentItem += 1
            this.scrollTarget = this.base - this.currentItem * this.scrollStep
        }
    }

    scrollDown(){
        if(this.currentItem > 0){
            this.currentItem -= 1
            this.scrollTarget = this.base - this.currentItem * this.scrollStep            
        }
        
    }

    reset(){
        this.base = 0
        this.stops = 0
        this.currentItem = 0    
        this.scrollTarget = 0
        this.scrollStep = 2.2
        this.scrollFraction =0
        this.speed = 3
        this.currentMenuVelocity = 0  
    }
}

export class HorizontalScrollMenu extends Entity {

    items:MenuItem[]
    visibleItemCount:number = 5
    spacing:number = 1.2
    currentOffset:number = 0
    maxwidth:number = 1
    origin:Vector3 
    scrollerRootA:Entity    
    //menuFrame:Entity    
    topMesh:Entity
    baseMesh:Entity
    clickBoxes:Entity[]
    itemRoots:Entity[]
    instructions:Entity
    baseText:Entity
    baseTextShape:TextShape

    
    selectSound:Entity
    deselectSound:Entity
    scrollEndSound:Entity   

    constructor(_transform:TranformConstructorArgs, _spacing:number, _numOfVisibleItems:number, _topMesh:GLTFShape, _baseMesh:GLTFShape, _baseTitle:string){
        super()

        const verticalOffset = 2.15
        this.visibleItemCount = _numOfVisibleItems

        this.items = []
        this.clickBoxes = []
        this.itemRoots = []
        // this.menuFrame = new Entity()
        // this.menuFrame.addComponent(new Transform({
        //     position: new Vector3(0,0,0.05),
        //     scale: new Vector3(1,1,1)
        // }))
        // this.menuFrame.addComponent(resource.menuPillarsShape)
        // this.menuFrame.addComponent(new OnPointerDown( (e) => {             
                 
        //     // 'F' to scroll up
        //     if(e.buttonId == 2){
        //         this.scrollUp()
        //     }

        //     // 'E' to scroll down
        //     if(e.buttonId == 1){   
        //         this.scrollDown()
        //     }           

        // },{distance:20, showFeedback:false} ))  

        // this.menuFrame.setParent(this)
        // this.menuFrame.addComponent(sfx.menuDownSource)

        this.topMesh = new Entity()
        this.topMesh.addComponent(new Transform({
            position: new Vector3(0, this.visibleItemCount * _spacing -1,0),
            scale: new Vector3(4,4,4)
        }))
        this.topMesh.addComponent(_topMesh)
        this.topMesh.setParent(this)

        this.addComponent(sfx.menuUpSource)


        this.addComponent(new Transform(_transform))

        this.baseMesh = new Entity()
        this.baseMesh.addComponent(new Transform({
            position: new Vector3(0,0,-0.4),
            scale: new Vector3(1,1,1)
        }))
        this.baseMesh.addComponent(_baseMesh)
        this.baseMesh.addComponent(new OnPointerDown( (e) => {                 
            // 'F' to scroll up
            if(e.buttonId == 2){
                this.scrollUp()
            }

            // 'E' to scroll down
            if(e.buttonId == 1){   
                this.scrollDown()
            }           

        },{distance:20, showFeedback:false} ))  
        this.baseMesh.setParent(this)
        this.baseMesh.addComponent(sfx.menuDownSource)

        this.baseText = new Entity
        this.baseTextShape = new TextShape()
        this.baseTextShape.value = _baseTitle
        this.baseTextShape.color = Color3.FromHexString("#111111")
        this.baseTextShape.font = new Font(Fonts.SanFrancisco_Heavy)
        this.baseTextShape.fontSize = 3

        this.baseText.addComponent(this.baseTextShape)
        this.baseText.addComponent(new Transform({
            position: new Vector3(0,-0.15,-0.16),
            scale: new Vector3(0.25, 0.25, 0.25),
            rotation: Quaternion.Euler(27,0,0)
        }))
        
        this.baseText.setParent(this.baseMesh)

        this.origin = new Vector3(0,0,0)
        this.origin.copyFrom(this.getComponent(Transform).position)

        this.spacing = _spacing             
        
        this.scrollerRootA = new Entity()
        this.scrollerRootA.addComponent(new Transform({
            position: new Vector3(0, verticalOffset, 0)
        }))

        this.scrollerRootA.addComponent(new HorizontalScroller())   
        this.scrollerRootA.getComponent(HorizontalScroller).base = this.scrollerRootA.getComponent(Transform).position.x
        this.scrollerRootA.getComponent(HorizontalScroller).scrollStep =  this.spacing   
        this.scrollerRootA.setParent(this)        

        engine.addEntity(this)

        this.instructions = new Entity()
        this.instructions.addComponent(new Transform({
            position: new Vector3(-3,0.25,-0.3),
            scale: new Vector3(1.5,1.5,1.5),
            rotation: Quaternion.Euler(0,-10,0)
        }))
        this.instructions.addComponent(resource.scrollInstructionShape)
        this.instructions.addComponent(new OnPointerDown( (e) => {  
                  
            // 'F' to scroll up
            if(e.buttonId == 2){
                this.scrollUp()
            }

            // 'E' to scroll down
            if(e.buttonId == 1){   
                this.scrollDown()
            }         

        },{distance:20, showFeedback:true, hoverText:"USE E/F TO SCROLL EVENTS"} ))   
        this.instructions.setParent(this)
        
        this.maxwidth = this.visibleItemCount * this.spacing + 1
        //this.menuFrame.getComponent(Transform).position.x = this.maxwidth/2 - this.spacing
        //this.menuFrame.getComponent(Transform).scale.x = this.maxwidth
        //this.collider.addComponent()        

        //sounds
        this.selectSound = new Entity()
        this.selectSound.addComponent(new Transform())
        this.selectSound.addComponent(sfx.menuSelectSource)
        this.selectSound.setParent(this)

        this.deselectSound = new Entity()
        this.deselectSound.addComponent(new Transform())
        this.deselectSound.addComponent(sfx.menuDeselectSource)
        this.deselectSound.setParent(this)

        this.scrollEndSound = new Entity()
        this.scrollEndSound.addComponent(new Transform())
        this.scrollEndSound.addComponent(sfx.menuScrollEndSource)
        this.scrollEndSound.setParent(this)

    }    

    addMenuItem(_item:MenuItem){   

        let itemRoot = new Entity()
        itemRoot.addComponent(new Transform({
            position: new Vector3(this.currentOffset, 0, 0)
        }))           

        this.itemRoots.push(itemRoot)
        //itemRoot.addComponent(sfx.menuSelectSource)  
        
        
        // COLLIDER BOX FOR USER INPUT
        let clickBox = new Entity    
        clickBox.addComponent(new Transform({
        // position: new Vector3(1, this.currentOffset, 0)
        }))
        clickBox.addComponent(resource.hangerShape)
        clickBox.setParent(itemRoot)    
        clickBox.addComponent(new OnPointerDown( (e) => {    
            const scrollInfo = this.scrollerRootA.getComponent(HorizontalScroller) 
            
            // click to select
            if(e.buttonId == 0){
                
                if(!_item.selected){
                    this.selectItem(_item)
                    clickBox.getComponent(OnPointerDown).hoverText = "DESELECT" 
                    sfx.menuSelectSource.playOnce()   
                }
                else{
                    this.deselectItem(_item, false)
                    clickBox.getComponent(OnPointerDown).hoverText = "SELECT" 
                    sfx.menuDeselectSource.playOnce()   
                }                
                          
            }     
                 
            // 'F' to scroll up
            if(e.buttonId == 2){
                this.scrollUp()
            }

            // 'E' to scroll down
            if(e.buttonId == 1){   
                this.scrollDown()
            }         

        },{distance:20, showFeedback:true, hoverText:"SELECT"} ))        

        
        this.items.push(_item)
        this.clickBoxes.push(clickBox)

        if(this.itemRoots.length <= this.visibleItemCount){
            itemRoot.setParent(this.scrollerRootA)
            _item.setParent(itemRoot)
        }

        
        // _item.getComponent(Transform).position.y = this.currentOffset
        this.currentOffset += this.spacing
        // this.maxHeight = this.items.length * this.verticalSpacing + 1
        
        this.scrollerRootA.getComponent(HorizontalScroller).stops = this.items.length        
        
    }
    

    removeMenuItem(index:number){
        
        if (index > -1) {
           // engine.removeEntity(this.items[index])
            engine.removeEntity(this.itemRoots[index])
           // engine.removeEntity(this.clickBoxes[index])

            this.items.splice(index, 1)
            this.itemRoots.splice(index, 1)
            this.clickBoxes.splice(index, 1)

            this.scrollerRootA.getComponent(HorizontalScroller).stops = this.items.length   
            this.currentOffset -= this.spacing
        }        

    }

    scrollUp(){
        const scrollInfo = this.scrollerRootA.getComponent(HorizontalScroller) 
        // scrollable
        if(scrollInfo.currentItem < scrollInfo.stops - 1){                          
            scrollInfo.scrollUp() 
            this.deselectAll()

            // show new topmost item
            this.showItem(scrollInfo.currentItem + (this.visibleItemCount-1))

            // hide bottom item
            this.hideItem(scrollInfo.currentItem - 2)

            //make the second item from the bottom smaller (avoid clipping through base)
            this.halveSizeItem(scrollInfo.currentItem -1)   

            // make second item from the bottom full size                    
            this.fullSizeItem(scrollInfo.currentItem + this.visibleItemCount -2)

            sfx.menuUpSource.playOnce()
        }
        //reached the end
        else{
            this.scrollerRootA.getComponent(Transform).position.x -= 0.3
            sfx.menuScrollEndSource.playOnce()
        }
    }

    scrollDown(){
        const scrollInfo = this.scrollerRootA.getComponent(HorizontalScroller) 

        // scrollable
        if(scrollInfo.currentItem > 0){             
            scrollInfo.scrollDown() 
            this.deselectAll()

            // show new bottom item
            this.showItem(scrollInfo.currentItem - 1)

            // hide topmost item
            this.hideItem(scrollInfo.currentItem + this.visibleItemCount)

            //make the second item from the bottom smaller (avoid clipping through base)
            this.halveSizeItem(scrollInfo.currentItem + this.visibleItemCount -1) 
            // make second item from the bottom full size                    
            this.fullSizeItem(scrollInfo.currentItem )

            sfx.menuDownSource.playOnce()
        }
        //reached the end
        else{
            this.scrollerRootA.getComponent(Transform).position.x += 0.3
            sfx.menuScrollEndSource.playOnce()
        }

    }

    selectItem(_item:MenuItem){
        //if(_id < this.items.length){
           // this.items[_id].select()
           if(_item.hasComponent(AnimatedItem)){           

                if(!_item.selected){
                     this.deselectAll()
                    _item.getComponent(AnimatedItem).isHighlighted = true  
                    _item.select()              
                }
           }
           else{
                _item.select()  
           }    
        
    }
    deselectItem(_item:MenuItem, _silent:boolean){     
           if(_item.hasComponent(AnimatedItem)){           

                if(_item.selected){
                    _item.getComponent(AnimatedItem).isHighlighted = false  
                    _item.deselect(_silent)              
                }
           }
           else{
                _item.deselect(_silent)    
           }    
        
    }
    deselectAll(){
        for(let i=0; i< this.items.length; i++){            
                this.items[i].getComponent(AnimatedItem).isHighlighted = false            
                this.deselectItem(this.items[i], true)       
                this.clickBoxes[i].getComponent(OnPointerDown).hoverText = "SELECT"        
        }
    }
    hideItem(_id:number){
        if(_id < this.items.length && _id >= 0){
            engine.removeEntity(this.itemRoots[_id])
        }
    }
    showItem(_id:number){
        if(_id < this.itemRoots.length && _id >= 0){
            engine.addEntity(this.itemRoots[_id])
            this.itemRoots[_id].setParent(this.scrollerRootA)
            this.items[_id].setParent(this.itemRoots[_id])
           // this.items[_id].getComponent(Transform).scale.setAll(0)
           // this.items[_id].getComponent(Transform).position.z  = 2
        }
        
    }
    halveSizeItem(_id:number){
        if(_id < this.items.length && _id >= 0){
            if(this.items[_id].hasComponent(AnimatedItem)){
                const originalTransform = this.items[_id].getComponent(AnimatedItem).defaultTransform
                originalTransform.scale.x = this.items[_id].defaultItemScale.x *0.5 
                originalTransform.scale.y = this.items[_id].defaultItemScale.y *0.5  
                originalTransform.scale.z = this.items[_id].defaultItemScale.z *0.5 
            }
                        
        }
    }
    fullSizeItem(_id:number){
        
        if(_id < this.items.length && _id >= 0){            
            this.items[_id].getComponent(AnimatedItem).defaultTransform.scale.copyFrom(this.items[_id].defaultItemScale)
            
        }
    }

    resetScroll(){
        this.deselectAll()
        this.scrollerRootA.getComponent(HorizontalScroller).reset()
        //this.scrollerRootA.getComponent(VerticalScroller).base = 0
        this.scrollerRootA.getComponent(HorizontalScroller).scrollStep =  this.spacing   
        this.scrollerRootA.getComponent(HorizontalScroller).stops = this.items.length 

        for (let i=0; i< this.items.length; i++){
            if(i < this.visibleItemCount){
                this.showItem(i)
            }
            else{
                this.hideItem(i)
            }
            // reset menu item scaling
            this.items[i].getComponent(AnimatedItem).defaultTransform.scale.copyFrom(this.items[i].defaultItemScale)
        }
    }
    // showFirstXItems(_count:number){
    //     // only show the first 5 events on init
    //     for(let i=0; i< this.itemRoots.length; i++){
    //         if(i < _count){
    //             this.showItem(i)
    //         }
    //         else{
    //             this.hideItem(i)
    //         }
    //     }
    // }

}

export class clickScrollSystem {

    group = engine.getComponentGroup(HorizontalScroller, Transform)     

    update(dt:number){

        for(let entity of this.group.entities){
            const scrollInfo = entity.getComponent(HorizontalScroller)
            const scrollTransform = entity.getComponent(Transform)

            scrollTransform.position.x = this.springPos(scrollInfo.scrollTarget, scrollTransform.position.x, scrollInfo.currentMenuVelocity, dt)
        }
    }

    springPos(a_Target:number,
        a_Current:number,
        a_currentVelocity:number,            
        a_TimeStep:number 
        ):number
        {

        let currentToTarget = a_Target - a_Current
        let springForce = currentToTarget * 150
        //let dampingForce = -this.currentVelocity * 2 * Math.sqrt( SPRING_CONSTANT );
        let dampingForce = -a_currentVelocity * 2
        let force = springForce + dampingForce
        a_currentVelocity += force * a_TimeStep
        let displacement = a_currentVelocity * a_TimeStep

        return a_Current + displacement
    }
}
engine.addSystem(new clickScrollSystem())




