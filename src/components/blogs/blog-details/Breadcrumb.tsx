
const Breadcrumb = () => {
   return (
      <div className="td-breadcrumb-area td-breadcrumb-spacing mb-115">
         <div className="container">
            <div className="row">
               <div className="col-lg-9">
                  <div className="td-breadcrumb-wrap ml-75">
                     <span className="subtitle d-inline-block mb-15  wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">CREATIVE AGENCY</span>
                     <h2 className="td-section-page-title mb-55  wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">Emphasize on creative<br /> design <span>aspects</span></h2>
                     <div className="td-blog-details-author d-flex align-items-center  wow fadeInUp" data-wow-delay=".9s" data-wow-duration="1s">
                        <div className="td-blog-details-author-thumb d-flex align-items-center mr-80">
                           <img className="mr-20" src="/assets/img/blog/blog-details/avatar.jpg" alt="" />
                           <div className="td-blog-details-author-content">
                              <span>Written by</span>
                              <span className="bolds mt-5">Alexander</span>
                           </div>
                        </div>
                        <div className="td-blog-details-author-content">
                           <span>Viewed</span>
                           <span className="bolds mt-5">4 min read </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Breadcrumb
