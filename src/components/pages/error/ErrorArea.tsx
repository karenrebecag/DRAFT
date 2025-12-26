import { Link } from "react-router-dom"

const ErrorArea = () => {
   return (
      <div className="td-error-area td-error-bg fix" style={{ backgroundImage: `url(/assets/img/error/bg.jpg)` }}>
         <div className="container-fluid p-0">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="td-error-thumb d-none d-lg-block">
                     <img src="/assets/img/error/thumb.jpg" alt="" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="td-error-content">
                     <h2 >404</h2>
                     <h3 className="sm-title">Oopsie! Something's Missing...</h3>
                     <p className="mb-35">The page you are looking for doesn't exist. It may have been moved
                        or  removed altogether. Please try searching for some other page,
                        or return  to the website's homepage to find what
                        you're looking for.</p>
                     <div className="td-btn-group mb-35">
                        <Link className="td-btn-circle" to="/">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                        <Link className="td-btn-2 td-btn-primary" to="/">back to home</Link>
                        <Link className="td-btn-circle" to="/">
                           <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ErrorArea
