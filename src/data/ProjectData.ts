
interface DataType {
   id: number;
   page: string;
   project_details: {
      id: number;
      class?: string;
      thumb: string;
      tag: string;
      title: string;
   }[];
}

const project_data: DataType[] = [

   // home_3

   {
      id: 1,
      page: "home_3",
      project_details: [
         {
            id: 1,
            thumb: "/assets/img/project/3/thumb.jpg",
            tag: "Branding",
            title: "Zumarcons firm",
         },
         {
            id: 2,
            thumb: "/assets/img/project/3/thumb-2.jpg",
            tag: "Identity",
            title: "Stellar vibes",
         },
         {
            id: 3,
            thumb: "/assets/img/project/3/thumb-3.jpg",
            tag: "Application",
            title: "Entherum app",
         },
      ],
   },
   {
      id: 2,
      page: "home_3",
      project_details: [
         {
            id: 1,
            thumb: "/assets/img/project/3/thumb-4.jpg",
            class: "mt",
            tag: "Business",
            title: "Electrobox ginny",
         },
         {
            id: 2,
            thumb: "/assets/img/project/3/thumb-5.jpg",
            tag: "Agency",
            title: "Zoik water",
         },
         {
            id: 3,
            thumb: "/assets/img/project/3/thumb-6.jpg",
            tag: "Creative",
            title: "Tommy hilfiger",
         },
      ],
   },
];

export default project_data;