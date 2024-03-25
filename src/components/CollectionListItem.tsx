import { Action, ActionPanel, Icon, LaunchType, List, launchCommand, open } from "@raycast/api";
import { Webflow } from "webflow-api";
import { publishSite } from "../webflow/client";

export default function CollectionListItem(props: { collection: Webflow.CollectionListArrayItem }) {
  const { collection } = props;

  const name = collection.displayName ?? "Untitled Collection";
  const slug = collection.slug;

  return (
    <List.Item
      title={name}
      subtitle={slug}
      icon={{ source: Icon.HardDrive }}
      actions={
        <ActionPanel title={name}>
          <Action
            title="Show Collection Items"
            icon={Icon.List}
            onAction={() => {
              launchCommand({
                name: "showCollectionItems",
                type: LaunchType.UserInitiated,
                arguments: { collectionId: collection.id },
              });
            }}
          />
        </ActionPanel>
      }
    />
  );
}
