import { Grid, LaunchProps, List, Toast, showToast } from "@raycast/api";
import { WebflowProvider } from "../utils/context";
import { useEffect, useState } from "react";
import { getCMSCollections, getCMSItems, getSites } from "../webflow/client";
import { Webflow } from "webflow-api";
import CollectionItemListItem from "./CollectionItemListItem";

export default function ShowCollectionItems(props: { collectionId: string }) {
  const [searchText, setSearchText] = useState<string>();
  const [filteredItems, setFilteredItems] = useState<Webflow.CollectionItemList>();
  const [items, setItems] = useState<Webflow.CollectionItemList>();
  const response = getCMSItems(props.collectionId);

  if (response.error) {
    showToast(Toast.Style.Failure, "Failed to load site collections", response.error);
  }

  useEffect(() => {
    if (response.result) {
      setItems(response.result);
      setFilteredItems(response.result);
    }
  }, [response.result]);

  useEffect(() => {
    if (items) {
      const filtered = filteredItems?.items?.filter((item) => {
        return item.fieldData?.name?.toLowerCase().includes(searchText?.toLowerCase() ?? "");
      });
      setFilteredItems({ items: filtered });
    }
  }, [searchText]);

  return (
    <List
      searchBarPlaceholder="Search collections..."
      onSearchTextChange={setSearchText}
      isLoading={response.isLoading}
      throttle
    >
      {filteredItems?.items?.map((item) => (
        <CollectionItemListItem key={item.id} collectionId={props.collectionId} item={item} />
      ))}
    </List>
  );
}
