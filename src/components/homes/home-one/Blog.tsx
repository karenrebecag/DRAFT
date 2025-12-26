import { Link } from "react-router-dom"
import blog_data from "../../../data/BlogData"
import { useMemo } from "react";

const Blog = () => {

   const filteredData = useMemo(() => {
      return blog_data.filter((items) => items.page === "home_1");
   }, []);

   return (
      <div className="td-blog-area pt-155 pb-130">
         <div className="container">
            <div className="row mb-50">
               <div className="col-lg-3">
                  <div className="mb-20">
                     <span className="td-section-subtitle">OUR LATEST BLOG</span>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div>
                     <h2 className="td-testimonial-title mb-30 td-text-invert">News from <br /> <span>Parody</span></h2>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="mb-30">
                     <p className="mb-35">We are excited for our work and how it positively
                        mpacts clients. With  over 12 years of experience
                        we have been constantly</p>
                     <div className="td-btn-group">
                        <Link className="td-btn-circle" to="/blog">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                        <Link className="td-btn-2 td-btn-primary" to="/blog">view ALL POST</Link>
                        <Link className="td-btn-circle" to="/blog">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               {filteredData.map((item) => (
                  <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
                     <div className="td-blog-wrap mb-30 wow fadeInLeft" data-wow-delay=".3s" data-wow-duration="1s">
                        <div className="td-blog-thumb fix mb-25">
                           <img className="w-100" src={item.thumb} alt="" />
                        </div>
                        <div className="td-blog-content">
                           <h3 className="td-blog-title mb-30"><Link to="/blog-details">{item.title}</Link></h3>
                           <div className="td-blog-cetagory d-flex align-items-center">
                              <span className="cetagory">{item.tag}</span>
                              <span className="td-border ml-20 mr-15 d-inline-block"></span>
                              <span className="dates">{item.date}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Blog
