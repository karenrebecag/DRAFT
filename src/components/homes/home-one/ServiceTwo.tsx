import { Link } from "react-router-dom";
import { useState } from "react";

interface ThumbData {
   id: number;
   thumb: string;
}

const service_thumb: ThumbData[] = [
   {
      id: 1,
      thumb: "/assets/img/service/service-2/thumb.png",
   },
   {
      id: 2,
      thumb: "/assets/img/service/service-2/thumb-2.jpg",
   },
   {
      id: 3,
      thumb: "/assets/img/service/service-2/thumb-3.jpg",
   },
   {
      id: 4,
      thumb: "/assets/img/service/service-2/thumb-4.jpg",
   },
];

interface DataType {
   id: number;
   thumb: string;
   count: string;
   title: string;
}

const service_data: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/service/service-2/thumb.jpg",
      count: "01",
      title: "Branding strategy",
   },
   {
      id: 2,
      thumb: "/assets/img/service/service-2/thumb-2.jpg",
      count: "02",
      title: "Web development",
   },
   {
      id: 3,
      thumb: "/assets/img/service/service-2/thumb-3.jpg",
      count: "03",
      title: "Graphics design",
   },
   {
      id: 4,
      thumb: "/assets/img/service/service-2/thumb-4.jpg",
      count: "04",
      title: "Tech development",
   },
];

const Service = () => {

   const [activeId, setActiveId] = useState<number | null>(1);

   return (
      <div className="td-service-area hover-section td-btn-trigger">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-9 col-md-9">
                  <div className="td-service-2-title-wrap mb-40  wow fadeInLeft" data-wow-delay=".5s" data-wow-duration="1s">
                     <span className="td-section-2-subtitle mb-25 d-inline-block">//  Our services</span>
                     <h2 className="td-section-2-title">Our full creative <br />startup <span>agency<br /> service</span></h2>
                  </div>
               </div>
               <div className="col-lg-3 col-md-3 d-none d-md-block">
                  <div className="td-service-2-shape mb-40  td-btn-bounce">
                     <img src="/assets/img/service/service-2/ok.png" alt="" />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-5">
                  <div className="td-service-2-img-wrapper image-container mt-65 mb-40">
                     {service_thumb.map((item) => (
                        <div key={item.id} className={`hover-image ${activeId === item.id ? "active" : ""}`}>
                           <img className="thumb" src={item.thumb} alt="Service Image" />
                           <img className="shape" src="/assets/img/service/service-2/shape.png" alt="" />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="td-service-2-wrap mb-40">
                     {service_data.map((item) => (
                        <div key={item.id} className={`td-service-2-item service-item ${activeId === item.id ? "active" : ""}`}
                           onMouseEnter={() => setActiveId(item.id)}>
                           <Link to="/service-details">
                              <div className="title d-flex align-items-center mb-10">
                                 <span className="mr-65">{item.count}</span>
                                 {item.title}
                              </div>
                              <div className="icon mb-10">
                                 <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M1 12.965L13 0.959717" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M1 0.959717H13V12.965" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                 </span>
                              </div>
                           </Link>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Service
