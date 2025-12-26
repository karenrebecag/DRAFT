import { Link } from "react-router-dom"

const ContactMap = () => {
   return (
      <div className="td-contact-map-area">
         <div className="container-fluid p-0">
            <div className="row">
               <div className="col-12">
                  <div className="td-contact-map p-relative">
                     <div className="td-contact-map-wrap">
                        <img className="mb-100" src="/assets/img/logo/logo-white-black.png" alt="" />
                        <h6 className="mb-25">Contact info:</h6>
                        <Link to="tel:+999235645689">+999 2356 45689</Link>
                        <Link className="mb-10" to="mailto:hello@parodyagency.com">hello@parodyagency.com</Link>
                        <Link to="#">Old Westbury 256, New York,
                           USA, NJ 3636459</Link>
                     </div>
                     <div className="td-contact-map-inner">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31078.361591144112!2d-74.0256365664179!3d40.705584751235754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1724572184688!5m2!1sen!2sbd" width="600" height="450" style={{ border: 0 }} loading="lazy"></iframe>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactMap
