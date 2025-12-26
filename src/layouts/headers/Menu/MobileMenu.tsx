import { Link } from "react-router-dom";
import { useState } from "react";
import menu_data from "../../../data/MenuData";

// Define types for menu and submenu
type SubMenu = {
   title: string;
   link: string;
};

type Menu = {
   id: number | string;
   title: string;
   link: string;
   has_dropdown?: boolean;
   sub_menus?: SubMenu[];
};

const MobileMenu = () => {
   const [navTitle, setNavTitle] = useState<string>("");
   const [, setSubNavTitle] = useState<string>("");

   // Open or close the parent menu
   const openMobileMenu = (menu: string) => {
      setNavTitle((prev: string) => (prev === menu ? "" : menu));
      setSubNavTitle("");
   };

   return (
      <ul className="navigation">
         {(menu_data as Menu[]).map((menu) => (
            <li key={menu.id} className={menu.has_dropdown ? "menu-item-has-children" : ""}>
               <Link to={menu.link}>
                  {menu.title}
               </Link>

               {menu.has_dropdown && (
                  <>
                     {menu.sub_menus && (
                        <>
                           <ul
                              className="sub-menu"
                              style={{ display: navTitle === menu.title ? "block" : "none" }}
                           >
                              {menu.sub_menus.map((sub_m, i) => (
                                 <li key={i}>
                                    <Link to={sub_m.link} >
                                       {sub_m.title}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                           <div
                              className={`dropdown-btn ${navTitle === menu.title ? "open" : ""}`}
                              onClick={() => openMobileMenu(menu.title)}
                           >
                              <span className="plus-line"></span>
                           </div>
                        </>
                     )}
                  </>
               )}
            </li>
         ))}
      </ul>
   );
};

export default MobileMenu;
