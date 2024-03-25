import { Grid, LaunchProps, List, Toast, showToast } from "@raycast/api";
import { WebflowProvider } from "../utils/context";
import { useEffect, useState } from "react";
import { getCMSCollections, getSites } from "../webflow/client";
import SiteListItem from "./SiteListItem";
import { Webflow } from "webflow-api";
import CollectionListItem from "./CollectionListItem";
import { Collection } from "webflow-api/api";

export default function ShowCollections(props: { siteId: string }) {
  const [searchText, setSearchText] = useState<string>();
  const [filteredCollections, setFilteredCollections] = useState<Webflow.CollectionList>();
  const [collections, setColletions] = useState<Webflow.CollectionList>();
  const response = getCMSCollections(props.siteId);

  if (response.error) {
    showToast(Toast.Style.Failure, "Failed to load site collections", response.error);
  }

  useEffect(() => {
    if (response.result) {
      setColletions(response.result);
      setFilteredCollections(response.result);
    }
  }, [response.result]);

  useEffect(() => {
    if (collections) {
      const filtered = collections?.collections?.filter((collection) => {
        return collection.displayName?.toLowerCase().includes(searchText?.toLowerCase() ?? "");
      });
      setFilteredCollections({ collections: filtered });
    }
  }, [searchText]);

  return (
    <List
      searchBarPlaceholder="Search collections..."
      onSearchTextChange={setSearchText}
      isLoading={response.isLoading}
      throttle
    >
      {filteredCollections?.collections?.map((collection) => (
        <CollectionListItem key={collection.id} collection={collection} />
      ))}
    </List>
  );
}
