import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import SimpleMap, {Map} from "./components/Map";
import {LogIn} from "./components/LogIn";
import {Registration} from "./components/Registration";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/registration',
    element: <Registration/>
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/Map',
    element: <SimpleMap/>
  }
];

export default AppRoutes;
