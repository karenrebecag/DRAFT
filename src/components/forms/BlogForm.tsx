
const BlogForm = () => {
   return (
      <form onClick={(e) => e.preventDefault()}>
         <div className="row">
            <div className="col-12">
               <div className="td-blog-postbox-comment-input mb-15">
                  <textarea placeholder="Write your Comment *"></textarea>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="td-blog-postbox-comment-input mb-15">
                  <input type="text" placeholder="David MalGlam" />
               </div>
            </div>
            <div className="col-lg-6">
               <div className="td-blog-postbox-comment-input mb-15">
                  <input type="text" placeholder="Your Email *" />
               </div>
            </div>
            <div className="col-lg-12">
               <div className="td-blog-postbox-comment-input mb-20">
                  <input type="text" placeholder="Website" />
               </div>
            </div>
            <div className="col-12">
               <div className="td-blog-postbox-comment-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">Save my name, email, and website in this browser for the next time I comment.</label>
                  <button type="submit" className="td-btn-group pt-30">
                     <span className="td-btn-circle">
                        <i className="fa-solid fa-arrow-right"></i>
                     </span>
                     <span className="td-btn-2 td-btn-primary">POST COMMENT</span>
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

export default BlogForm
