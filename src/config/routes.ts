import Home from '../pages/Home'
import Characters from '../pages/Characters'
import MyBook from '../pages/MyBook'
import Abilities from '../pages/Abilities';
import Feats from '../pages/Feats';
import Spells from '../pages/Spells';


interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
    },
    {
      path: "/Characters",
      component: Characters,
      name: "Characters",
    },
    {
      path: "/MyBook",
      component: MyBook,
      name: "MyBook",
    },
    {
      path: "/Abilities",
      component: Abilities,
      name: "Abilities",
    },
    {
      path: "/Feats",
      component: Feats,
      name: "Feats",
    },
    {
      path: "/Spells",
      component: Spells,
      name: "Spells",
    }
    
];

export default routes