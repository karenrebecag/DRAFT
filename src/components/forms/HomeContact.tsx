
const HomeContact = () => {
   return (
      <form onSubmit={(e) => e.preventDefault()}>
         <div className="row">
            <div className="col-lg-6">
               <div className="td-contact-7-input-item mb-25">
                  <label className="labels" htmlFor="names">Name</label>
                  <input className="inputs" type="text" id="names" placeholder="Rober Crues" />
               </div>
            </div>
            <div className="col-lg-6">
               <div className="td-contact-7-input-item mb-25">
                  <label className="labels" htmlFor="email">Email</label>
                  <input className="inputs" type="text" id="email" placeholder="don@gmail.com" />
               </div>
            </div>
            <div className="col-lg-6">
               <div className="td-contact-7-input-item mb-25">
                  <label className="labels" htmlFor="subject">Subject</label>
                  <input className="inputs" type="text" id="subject" placeholder="Your subject" />
               </div>
            </div>
            <div className="col-lg-6">
               <div className="td-contact-7-input-item mb-25">
                  <label className="labels" htmlFor="phone">Phone</label>
                  <input className="inputs" type="text" id="phone" placeholder="+999" />
               </div>
            </div>
            <div className="col-lg-12">
               <div className="td-contact-7-input-item mb-25">
                  <label className="labels" htmlFor="textareas">Message</label>
                  <textarea className="inputs textareas" id="textareas" placeholder="Write your message"></textarea>
               </div>
               <button className="td-contact-7-btn" type="submit">Let’s Talk</button>
            </div>
         </div>
      </form>
   )
}

export default HomeContact
