import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconUserCircle,
  IconPoint,
  IconShoppingCart,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Menu",
  },

  {
    id: uniqueId(),
    title: "Perfil",
    icon: IconUserCircle,
    href: "/account-settings",
  },
  {
    id: uniqueId(),
    title: "Pedidos",
    icon: IconShoppingCart,
    href: "/pedidos",
    children: [
      {
        id: uniqueId(),
        title: "Uniformes",
        icon: IconPoint,
        href: "/apps/ecommerce/shop",
      },
    ],
  },
];

export default Menuitems;
