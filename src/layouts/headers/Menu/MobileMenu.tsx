import { Link } from "react-router-dom";
import { useI18n } from "../../../i18n";

// Get navigation items with translations
const getNavItems = (t: ReturnType<typeof useI18n>["t"]) => [
   {
      id: 1,
      title: t.nav.aboutUs,
      link: "/about",
   },
   {
      id: 2,
      title: t.nav.services,
      link: "/service",
   },
   {
      id: 3,
      title: t.nav.portfolio,
      link: "/portfolio",
   },
   {
      id: 4,
      title: t.nav.blog,
      link: "/blog",
   },
];

const MobileMenu = () => {
   const { t } = useI18n();
   const navItems = getNavItems(t);

   return (
      <ul className="navigation">
         {navItems.map((item) => (
            <li key={item.id}>
               <Link to={item.link}>
                  {item.title}
               </Link>
            </li>
         ))}
      </ul>
   );
};

export default MobileMenu;
