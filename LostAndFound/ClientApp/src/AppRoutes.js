import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import SimpleMap, {Listings, Map} from "./components/Listings";
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
    path: '/listings',
    element: <Listings/>
  }
];

export default AppRoutes;
