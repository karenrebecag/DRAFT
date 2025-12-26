import { Link } from "react-router-dom"

const About = () => {
   return (
      <div className="td-about-area">
         <div className="container">
            <div className="row">
               <div className="col-lg-4">
                  <div className="td-about-left mb-30">
                     <span>WHO WE ARE</span>
                     <div className="td-about-left-thumb ml-60 fix td-rounded-10">
                        <img data-speed=".9" src="/assets/img/about/thumb.jpg" alt="" />
                     </div>
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className="td-about-content mb-30">
                     <h2 className="td-about-title mb-30">We create and implement effective promotion strategies based on website, targeting, contextual advertising and social networking.</h2>
                     <p className="mb-45">A design studio is a creative space where designers, artists, and other professionals work to create
                        and refine visual concepts, products, and projects. The focus of a design studio can vary depending
                        on the type of design being created, such as graphic design</p>
                     <div className="td-btn-group mb-35">
                        <Link className="td-btn-circle" to="/about">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                        <Link className="td-btn-2 td-btn-primary" to="/about">ABOUT US</Link>
                        <Link className="td-btn-circle" to="/about">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                     </div>
                     <div className="td-about-thumb-wrap d-flex align-items-center justify-content-end">
                        <div className="mr-150 td-about-shape">
                           <img className="td-live-anim-spin" src="/assets/img/about/shape.png" alt="" />
                        </div>
                        <div className="td-about-thumb fix td-rounded-10">
                           <img data-speed=".9" src="/assets/img/about/thumb-2.jpg" alt="" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default About
