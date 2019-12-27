import { createSwitchNavigator } from "react-navigation";
import { Home, Dashboard, Detail, Profile, Settings } from "../../screens";

const SwitchContainer = createSwitchNavigator({
  Home: Home,
  Dashboard: Dashboard,
  Detail: Detail,
  Profile: Profile,
  Settings: Settings
});

console.log(SwitchContainer);
export default SwitchContainer;
