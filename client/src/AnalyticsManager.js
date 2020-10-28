import mixpanel from "mixpanel-browser";
import ReactGA from "react-ga";

ReactGA.initialize("G-K3GPQF95KG", {
  debug: true,
});
export const gaTrackRoutes = (route) => ReactGA.pageview(route);
mixpanel.init("8dc7be5bcb1271132c246e068c48986b");

export const trackRoutes = (route, data) => {
  if (!route || route.length === 0) {
    route = "home";
  }

  mixpanel.track(route + " page", data);
};
