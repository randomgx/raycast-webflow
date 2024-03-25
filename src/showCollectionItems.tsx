import { LaunchProps, Toast, showToast } from "@raycast/api";
import ShowCollections from "./components/ShowCollectionsWrapper";
import { WebflowProvider } from "./utils/context";
import ShowCollectionItems from "./components/ShowCollectionItemsWrapper";

function ShowCollectionItemsWrapper(props: LaunchProps<{ arguments: Arguments.ShowCollectionItems }>) {
  const { collectionId } = props.arguments;

  if (!collectionId) {
    showToast(Toast.Style.Failure, "Missing collection ID", "Please provide a collection ID to show collection items.");
    return null;
  }

  return (
    <WebflowProvider>
      <ShowCollectionItems collectionId={collectionId} />
    </WebflowProvider>
  );
}

export default ShowCollectionItemsWrapper;
