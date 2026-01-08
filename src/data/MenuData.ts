
interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}

const menu_data: MenuItem[] = [
    {
        id: 1,
        title: "Home",
        link: "/",
        has_dropdown: false,
    },
    {
        id: 2,
        title: "Pages",
        link: "#",
        has_dropdown: true,
        sub_menus: [
            { link: "/about", title: "About" },
            { link: "/service", title: "Service" },
            { link: "/service-details", title: "Service Details" },
            { link: "/not-found", title: "Error" },
        ],
    },
    {
        id: 3,
        title: "Portfolio",
        link: "#",
        has_dropdown: true,
        sub_menus: [
            { link: "/portfolio", title: "Portfolio" },
            { link: "/portfolio-details", title: "Portfolio Details" },
        ],
    },
    {
        id: 4,
        title: "Blogs",
        link: "#",
        has_dropdown: true,
        sub_menus: [
            { link: "/blog", title: "Blog" },
            { link: "/blog-details", title: "Blog Details" },
        ],
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
];

export default menu_data;

// Navigation items for HeaderGlobal (with i18n support)
export interface NavItem {
    id: number;
    titleKey: string;
    link: string;
}

export const headerNavItems: NavItem[] = [
    { id: 1, titleKey: 'home', link: '/' },
    { id: 2, titleKey: 'aboutUs', link: '/about' },
    { id: 3, titleKey: 'services', link: '/service' },
    { id: 4, titleKey: 'portfolio', link: '/portfolio' },
    { id: 5, titleKey: 'blog', link: '/blog' },
];