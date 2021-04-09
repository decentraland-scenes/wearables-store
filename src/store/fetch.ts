export const allCollections = async () => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
    },
    query: `query Wearables($first: Int, $skip: Int) {\ncollections(first: $first, skip: $skip) {\nid\nname\nowner\nurn\nitems {\nimage\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

export const storeCollections = async (
  storeAddress: string = "0x56d5cd2a5f299854c2ab3ee4c3126f285140bb9b"
) => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
      storeAddress,
    },
    query: `query Wearables($first: Int, $skip: Int, $storeAddress: String) {\ncollections(first: $first, skip: $skip, where:{minters_contains:[$storeAddress]}) {\nid\nname\nowner\nurn\nitems {\nimage\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

export const collection = async (collectionURN: string) => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
      urn: collectionURN,
    },
    query: `query Wearables($first: Int, $skip: Int, $urn: String) {\ncollections(first: $first, skip: $skip, where:{urn: $urn}) {\nid\nname\nowner\nurn\nitems {\nimage\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

export const item = async (itemURN: string) => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
      urn: itemURN,
    },
    query: `query Wearables($first: Int, $skip: Int, $urn: String) {\nitems(first: $first, skip: $skip, where:{urn: $urn}) {\nimage\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

async function fetchGraph(request: Object) {
  return fetch(
    "https://api.thegraph.com/subgraphs/name/decentraland/collections-matic-mumbai",
    {
      method: "POST",
      body: JSON.stringify(request),
    }
  );
}
