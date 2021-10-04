import {
  createCollectionsVerticalMenu,
  createWearablesHorizontalMenu,
  updateCollectionsMenu,
  updateWearablesMenu,
} from "./ui/menuMainFunctions";

export function createWearableStore(transform: Transform, collectionsList?: string[]) {
  // -- wearables menu
  let wearablesMenu = createWearablesHorizontalMenu(
    transform,
    2
  );

  // -- Collections Menu
  let collectionsMenu = createCollectionsVerticalMenu(
    {
      //position: new Vector3(posVec.x -1.6, posVec.y +2.2, posVec.z-0.6),
      position: new Vector3(1.6, 2.05, -0.5),
      scale: new Vector3(1, 1, 1),
    },
    wearablesMenu,
    7
  );
  updateCollectionsMenu(collectionsMenu, wearablesMenu, 10, true, collectionsList);
}
