import { LaunchProps, Toast, showToast } from "@raycast/api";
import ShowCollections from "./components/ShowCollectionsWrapper";
import { WebflowProvider } from "./utils/context";

function ShowCollectionsWrapper(props: LaunchProps<{ arguments: Arguments.ShowCollections }>) {
  const { siteId } = props.arguments;

  if (!siteId) {
    showToast(Toast.Style.Failure, "Missing site ID", "Please provide a site ID to show collections.");
    return null;
  }

  return (
    <WebflowProvider>
      <ShowCollections siteId={siteId} />
    </WebflowProvider>
  );
}

export default ShowCollectionsWrapper;
