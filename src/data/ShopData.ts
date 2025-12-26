
interface DataType {
   id: number;
   thumb: string;
   status: string;
   category: string;
   color: string;
   title: string;
   price: number;
   offer?: string;
}

const shop_data: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/shop/01.jpg",
      status: "sale",
      category: "Cloathing",
      color: "Red",
      title: "Bamboo Basket",
      price: 63.99,
   },
   {
      id: 2,
      thumb: "/assets/img/shop/02.jpg",
      status: "stock",
      category: "Classic chair",
      color: "Dark Blue",
      title: "Rocking Chair",
      price: 520.99,
      offer: "20%",
   },
   {
      id: 3,
      thumb: "/assets/img/shop/03.jpg",
      status: "sale",
      category: "Hoodies",
      color: "Orange",
      title: "Wishbone Chair",
      price: 123.99,
   },
   {
      id: 4,
      thumb: "/assets/img/shop/04.jpg",
      status: "stock",
      category: "Tshirts",
      color: "Purple",
      title: "Chesterfield Chair",
      price: 160.00,
   },
   {
      id: 5,
      thumb: "/assets/img/shop/05.jpg",
      status: "sale",
      category: "Decor",
      color: "Purple",
      title: "Adirondack Chair",
      price: 450.29,
      offer: "20%",
   },
   {
      id: 6,
      thumb: "/assets/img/shop/06.jpg",
      status: "stock",
      category: "Lifestyle",
      color: "Yellow",
      title: "Armchair",
      price: 63.99,
   },
   {
      id: 7,
      thumb: "/assets/img/shop/07.jpg",
      status: "sale",
      category: "Music",
      color: "Green",
      title: "Table Lamer",
      price: 148.99,
   },
   {
      id: 8,
      thumb: "/assets/img/shop/08.jpg",
      status: "stock",
      category: "Rider pack",
      color: "Red",
      title: "Hanging Chair",
      price: 780.29,
      offer: "20%",
   },
   {
      id: 9,
      thumb: "/assets/img/shop/09.jpg",
      status: "sale",
      category: "Uncategorized",
      color: "Dark Blue",
      title: "Office Chair",
      price: 968.99,
   },
   {
      id: 10,
      thumb: "/assets/img/shop/01.jpg",
      status: "sale",
      category: "Cloathing",
      color: "Red",
      title: "Bamboo Basket",
      price: 63.99,
   },
   {
      id: 11,
      thumb: "/assets/img/shop/02.jpg",
      status: "stock",
      category: "Classic chair",
      color: "Dark Blue",
      title: "Rocking Chair",
      price: 520.99,
      offer: "20%",
   },
   {
      id: 12,
      thumb: "/assets/img/shop/03.jpg",
      status: "sale",
      category: "Hoodies",
      color: "Orange",
      title: "Wishbone Chair",
      price: 123.99,
   },
   {
      id: 13,
      thumb: "/assets/img/shop/04.jpg",
      status: "stock",
      category: "Tshirts",
      color: "Purple",
      title: "Chesterfield Chair",
      price: 160.00,
   },
];

export default shop_data;