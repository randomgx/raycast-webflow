import { LaunchProps, List, Toast, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { Webflow } from "webflow-api";
import { getPages } from "../webflow/client";
import PageListItem from "./PageListItem";

export default function ShowSitePages(props: { siteId: string; siteSlug: string }) {
  const [searchText, setSearchText] = useState<string>();
  const [filteredPages, setFilteredPages] = useState<Webflow.PageList>();
  const [pages, setPages] = useState<Webflow.PageList>();
  const response = getPages(props.siteId);

  if (response.error) {
    showToast(Toast.Style.Failure, "Failed to load sites", response.error);
  }

  useEffect(() => {
    if (response.result) {
      setPages(response.result);
      setFilteredPages(response.result);
    }
  }, [response.result]);

  useEffect(() => {
    if (pages) {
      const filtered = pages.pages?.filter((page) => {
        return page.title?.toLowerCase().includes(searchText?.toLowerCase() ?? "");
      });
      setFilteredPages({ pages: filtered });
    }
  }, [searchText]);

  return (
    <List
      searchBarPlaceholder="Search pages..."
      onSearchTextChange={setSearchText}
      isLoading={response.isLoading}
      throttle
    >
      {filteredPages?.pages?.map((page) => <PageListItem key={page.id} page={page} siteSlug={props.siteSlug} />)}
    </List>
  );
}
