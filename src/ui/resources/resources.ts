
const modelFolder = "models/menu/"


export let roundedSquareAlpha = new Texture ("images/rounded_alpha_square.png")
export let dummySceneBG = new Texture ("images/dummy_scene.png")

//MENU
export let wardrobeShape =          new GLTFShape(modelFolder + "wardrobe.glb")
export let menuPillarsShape =       new GLTFShape(modelFolder + "menu_pillars.glb")
export let menuBaseShape =          new GLTFShape(modelFolder + "menu_base.glb")
export let menuTopEventsShape =     new GLTFShape(modelFolder + "menu_top_events.glb")
export let menuTopCrowdShape =      new GLTFShape(modelFolder + "menu_top_crowd.glb")
export let menuTopClassicsShape =   new GLTFShape(modelFolder + "menu_top_classics.glb")
export let dateBGShape =            new GLTFShape(modelFolder + "date_bg.glb")
export let hangerShape =            new GLTFShape(modelFolder + "hanger_clickable.glb")
export let buyButtonShape =         new GLTFShape(modelFolder + "buy_btn.glb")
export let detailsBGShape =         new GLTFShape(modelFolder + "details_bg.glb")
export let highlightFrameShape =    new GLTFShape(modelFolder + "highlight_frame.glb")
export let highlightRaysShape =     new GLTFShape(modelFolder + "highlight_rays.glb")
export let readMoreBtnShape =       new GLTFShape(modelFolder + "read_more_btn.glb")
export let coordsPanelShape =       new GLTFShape(modelFolder + "coords_panel.glb")
export let cardBGShape =            new GLTFShape(modelFolder + "wearable_card.glb")
export let liveSignShape =          new GLTFShape(modelFolder + "live_bg.glb")
export let timePanelShape =         new GLTFShape(modelFolder + "time_panel.glb")
export let scrollInstructionShape = new GLTFShape(modelFolder + "scroll_instructions.glb")
export let refreshShape =           new GLTFShape(modelFolder + "refresh_button.glb")
export let loadMoreShape =          new GLTFShape(modelFolder + "load_more_btn.glb")


export const dateBGColor:Color3 = Color3.FromHexString("#cdcdcd")
export const dateMonthColor:Color3 = Color3.FromHexString("#ff3333")
export const dateDayColor:Color3 = Color3.FromHexString("#000000")

export let dateUIBGMaterial = new Material()
dateUIBGMaterial.albedoColor = dateBGColor
dateUIBGMaterial.alphaTexture = roundedSquareAlpha
dateUIBGMaterial.transparencyMode = 2
dateUIBGMaterial.metallic = 0
dateUIBGMaterial.roughness = 1
dateUIBGMaterial.specularIntensity = 0


