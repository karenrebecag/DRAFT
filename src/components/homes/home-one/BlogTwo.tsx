import { Link } from "react-router-dom";

interface DataType {
   id: number;
   avatar: string;
   name: string;
   designation: string;
   date: string;
   thumb: string;
   title: string;
}

const blog_data: DataType[] = [
   {
      id: 1,
      avatar: "/assets/img/blog/blog-2/avatar.png",
      name: "David Marlon",
      designation: "Designer",
      date: "August 12, 2024",
      thumb: "/assets/img/blog/blog-2/blog.jpg",
      title: "Our mission is to revolutionize of creative work for companies"
   },
   {
      id: 2,
      avatar: "/assets/img/blog/blog-2/avatar-2.png",
      name: "Huaka Brain",
      designation: "Designer",
      date: "August 12, 2024",
      thumb: "/assets/img/blog/blog-2/blog-2.jpg",
      title: "Our brand strategy services focus on creating a cohesive"
   },
   {
      id: 3,
      avatar: "/assets/img/blog/blog-2/avatar-3.png",
      name: "Navana Juisa",
      designation: "Designer",
      date: "August 12, 2024",
      thumb: "/assets/img/blog/blog-2/blog-3.jpg",
      title: "Our mission is to revolutionize of creative work for companies"
   },
];

const Blog = () => {
   return (
      <div className="td-blog-area pt-155">
         <div className="container">
            <div className="row align-items-end">
               <div className="col-lg-7">
                  <div className="td-service-2-title-wrap mb-60 td-title-anim">
                     <span className="td-section-2-subtitle mb-25 d-block">//  Parody working process</span>
                     <h2 className="td-section-2-title d-inline-block">Our standard design thinking <span>process</span></h2>
                  </div>
               </div>
               <div className="col-lg-5 mb-80">
                  <div className="td-blog-2-btn text-lg-end td-title-anim">
                     <div className="td-btn-group  td-btn-group-black">
                        <Link className="td-btn-circle" to="/blog">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                        <Link className="td-btn-2 td-btn-primary" to="/blog">VIEW ALL POST</Link>
                        <Link className="td-btn-circle" to="/blog">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               {blog_data.map((item) => (
                  <div key={item.id} className="col-xl-4 col-lg-6 col-md-6  wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                     <div className="td-blog-2-wrap mb-30">
                        <div className="td-blog-2-avatar-wrap mb-25 d-flex justify-content-between align-items-center">
                           <div className="d-flex align-items-center">
                              <div className="td-blog-2-avatar-thumb mr-15">
                                 <img src={item.avatar} alt="" />
                              </div>
                              <div className="td-blog-2-avatar-content">
                                 <h6 className="mb-0">{item.name}</h6>
                                 <span>{item.designation}</span>
                              </div>
                           </div>
                           <div className="td-blog-2-avatar-date">
                              <span>{item.date}</span>
                           </div>
                        </div>
                        <div className="td-blog-2-thumb td-rounded-10 fix mb-25">
                           <img className="w-100 td-rounded-10" src={item.thumb} alt="" />
                        </div>
                        <h3 className="td-blog-2-title"><Link to="/blog-details">{item.title}</Link></h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Blog
