
const ShopForm = () => {
   return (
      <form onClick={(e) => e.preventDefault()}>
         <div className="td-product-details-review-form-rating d-flex align-items-center mb-20">
            <p>Your Rating :</p>
            <div className="td-product-details-review-form-rating-icon d-flex align-items-center">
               <span><i className="fas fa-star"></i></span>
               <span><i className="fas fa-star"></i></span>
               <span><i className="fas fa-star"></i></span>
               <span><i className="fas fa-star"></i></span>
               <span><i className="fas fa-star"></i></span>
            </div>
         </div>
         <div className="td-contact-form-box">
            <div className="row">
               <div className="col-md-6 mb-25">
                  <label htmlFor="name">Name</label>
                  <input className="td-input" name="name" id="name" type="text" />
               </div>
               <div className="col-md-6 mb-25">
                  <label htmlFor="email">Email</label>
                  <input className="td-input" name="name" id="email" type="text" />
               </div>
               <div className="col-md-12 mb-30">
                  <label htmlFor="message">Message</label>
                  <textarea className="td-input message" name="message" id="message" cols={30} rows={10}></textarea>
               </div>
               <div className="col-12">
                  <button type="submit" className="td-btn-group">
                     <span className="td-btn-circle">
                        <i className="fa-solid fa-arrow-right"></i>
                     </span>
                     <span className="td-btn-2 td-btn-primary">Send  message</span>
                     <span className="td-btn-circle">
                        <i className="fa-solid fa-arrow-right"></i>
                     </span>
                  </button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default ShopForm
