
export class ThumbnailPlane extends Entity{
    public material:Material
    public planeShape:PlaneShape

    constructor(_image:Texture, _transform:TransformConstructorArgs, _alphaImage?:Texture){
        super()        

        this.planeShape = new PlaneShape()
        this.planeShape.withCollisions = false
        this.material = new Material()
        this.material.albedoTexture = _image
        this.material.specularIntensity = 0
        this.material.metallic = 0
        this.material.roughness = 1

        if(_alphaImage)
            this.material.alphaTexture = _alphaImage

        //UV flip
        this.planeShape.uvs = [
            0,0,          
            1,0,          
            1,1,          
            0,1,
          //----
            1,0,          
            0,0,
            0,1,
            1,1,
        ]
        
        this.addComponent(this.planeShape)
        this.addComponent(this.material)
        this.addComponent(new Transform(
        {
            position: (_transform.position?.clone()) || Vector3.Zero(),
            scale: _transform.scale?.clone() || Vector3.One(),
        }
        ))

        
        

        //engine.addEntity(this)

    }
    updateImage(texture:Texture){
        this.material.albedoTexture = texture
    }
}