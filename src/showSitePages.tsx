import { LaunchProps, Toast, showToast } from "@raycast/api";
import { WebflowProvider } from "./utils/context";
import ShowSitePages from "./components/ShowSitePages";

function ShowSitePagesWrapper(props: LaunchProps<{ arguments: Arguments.ShowSitePages }>) {
  const { siteId, siteSlug } = props.arguments;

  if (!siteId) {
    showToast(Toast.Style.Failure, "Missing site ID", "Please provide a site ID to show collections.");
    return null;
  }

  return (
    <WebflowProvider>
      <ShowSitePages siteId={siteId} siteSlug={siteSlug} />
    </WebflowProvider>
  );
}

export default ShowSitePagesWrapper;
