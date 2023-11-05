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
    protected: boolean
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
      protected: false
    },
    {
      path: "/Characters",
      component: Characters,
      name: "Characters",
      protected: false
    },
    {
      path: "/MyBook",
      component: MyBook,
      name: "MyBook",
      protected: true
    },
    {
      path: "/Abilities",
      component: Abilities,
      name: "Abilities",
      protected: false
    },
    {
      path: "/Feats",
      component: Feats,
      name: "Feats",
      protected: false
    },
    {
      path: "/Spells",
      component: Spells,
      name: "Spells",
      protected: false
    }
    
];

export default routes