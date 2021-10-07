# Wearables Store

This store allows you to purchase wearables on the Polygon L2 layer from an in-world.

The scene is configured to display all of the wearables currently on sale on L2. You can configure this scene to only display certain collections of wearables, or certain individual items, for example to have a private store with only your collections.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start --web3
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

> Note: When running a preview of a scene that uses one of the ethereum libraries, you must have Metamask or Dapper open and you must add this string.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Scene usage

Click on the menu on the right to navigate the different collections. When a collection is selected, use E and F to scroll through the different items in that collection. Then select an item to see more details.

To buy an item, hit the `Buy` button. Note that you must be connected with a web3 browser extension by starting the preview with `dcl start --web3`, and the connected account must have MANA on the Polygon network.

On your first transaction, the UI will ask you to first sign an approval for letting this contract spend your Polygon MANA. This transaction is free of charge, as it runs on the Polygon network.

As of then, any purchases you do via this store will require no gas, only the cost in MANA of the item itself. You approve them by signing a message on Metamask or your web3 browser extension of choice.

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
