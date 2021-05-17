// const sceneSize = 32

// let whiteBasicMat = new BasicMaterial()

// let leftPlane = new Entity()
// leftPlane.addComponent(new Transform({
//     position: new Vector3(0,sceneSize/2, sceneSize/2),
//     scale: new Vector3(sceneSize, sceneSize, sceneSize),
//     rotation: Quaternion.Euler(0,90,0)
// }))
// leftPlane.addComponent(new PlaneShape())
// leftPlane.addComponent(whiteBasicMat)
// leftPlane.getComponent(PlaneShape).withCollisions = false
// engine.addEntity(leftPlane)

// let rightPlane = new Entity()
// rightPlane.addComponent(new Transform({
//     position: new Vector3(sceneSize,sceneSize/2, sceneSize/2),
//     scale: new Vector3(sceneSize, sceneSize, sceneSize),
//     rotation: Quaternion.Euler(0,90,0)
// }))
// rightPlane.addComponent(new PlaneShape())
// rightPlane.addComponent(whiteBasicMat)
// rightPlane.getComponent(PlaneShape).withCollisions = false
// engine.addEntity(rightPlane)

// let frontPlane = new Entity()
// frontPlane.addComponent(new Transform({
//     position: new Vector3(sceneSize/2,sceneSize/2, 0),
//     scale: new Vector3(sceneSize, sceneSize, sceneSize),
//     rotation: Quaternion.Euler(0,0,0)
// }))
// frontPlane.addComponent(new PlaneShape())
// frontPlane.addComponent(whiteBasicMat)
// frontPlane.getComponent(PlaneShape).withCollisions = false
// engine.addEntity(frontPlane)

// let backPlane = new Entity()
// backPlane.addComponent(new Transform({
//     position: new Vector3(sceneSize/2,sceneSize/2, sceneSize),
//     scale: new Vector3(sceneSize, sceneSize, sceneSize),
//     rotation: Quaternion.Euler(0,0,0)
// }))
// backPlane.addComponent(new PlaneShape())
// backPlane.addComponent(whiteBasicMat)
// backPlane.getComponent(PlaneShape).withCollisions = false
// engine.addEntity(backPlane)

// let groundPlane = new Entity()
// groundPlane.addComponent(new Transform({
//     position: new Vector3(sceneSize/2,0, sceneSize/2),
//     scale: new Vector3(sceneSize, sceneSize, sceneSize),
//     rotation: Quaternion.Euler(90,0,0)
// }))
// groundPlane.addComponent(new PlaneShape())
// groundPlane.addComponent(whiteBasicMat)
// groundPlane.getComponent(PlaneShape).withCollisions = false
// engine.addEntity(groundPlane)

// let topPlane = new Entity()
// topPlane.addComponent(new Transform({
//     position: new Vector3(sceneSize/2,20, sceneSize/2),
//     scale: new Vector3(sceneSize, sceneSize, sceneSize),
//     rotation: Quaternion.Euler(90,0,0)
// }))
// topPlane.addComponent(new PlaneShape())
// topPlane.addComponent(whiteBasicMat)
// topPlane.getComponent(PlaneShape).withCollisions = false
// engine.addEntity(topPlane)