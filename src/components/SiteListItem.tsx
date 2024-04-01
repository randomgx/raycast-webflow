import {
  Action,
  ActionPanel,
  Icon,
  LaunchType,
  List,
  Toast,
  confirmAlert,
  launchCommand,
  open,
  showToast,
} from "@raycast/api";
import { Webflow } from "webflow-api";
import { publishSite } from "../webflow/client";

export default function SiteListItem(props: { site: Webflow.Site }) {
  const { site } = props;

  const name = site.displayName ?? "Untitled Site";
  const customDomain = site.customDomains?.[0]?.url ?? "Staging only";
  const imageUrl = site.previewUrl ?? Icon.BlankDocument;

  return (
    <List.Item
      title={name}
      subtitle={customDomain}
      icon={{ source: imageUrl }}
      actions={
        <ActionPanel title={name}>
          <Action
            title="Open Pages"
            icon={Icon.Document}
            onAction={() => {
              launchCommand({
                name: "showSitePages",
                type: LaunchType.UserInitiated,
                arguments: { siteId: site.id, siteSlug: site.shortName },
              });
            }}
          />
          <Action
            title="Open in Webflow"
            icon={Icon.Link}
            onAction={() => {
              const url = `https://${site.shortName}.design.webflow.com`;
              open(url);
            }}
          />
          <Action
            title="Open CMS Collections"
            icon={Icon.List}
            onAction={() => {
              launchCommand({
                name: "showCollections",
                type: LaunchType.UserInitiated,
                arguments: { siteId: site.id },
              });
            }}
          />
          <Action
            title="Publish Site"
            icon={Icon.Upload}
            onAction={async () => {
              if (
                await confirmAlert({
                  title: "Publish Site",
                  message: "Are you sure you want to publish this site?",
                  icon: Icon.Warning,
                  primaryAction: { title: "Publish" },
                })
              ) {
                publishSite(site.id);
                showToast(Toast.Style.Success, "Site published successfully");
              }
            }}
          />
        </ActionPanel>
      }
    />
  );
}
