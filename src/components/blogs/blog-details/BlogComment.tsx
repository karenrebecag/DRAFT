import { Link } from "react-router-dom"
import BlogForm from "../../forms/BlogForm"

const BlogComment = () => {
   return (
      <div className="td-blog-comment-area pt-130 pb-160">
         <div className="container">
            <div className="row">
               <div className="col-lg-8">
                  <div className="td-blog-comment-form-wrap mr-70">
                     <h2 className="td-blog-comment-title mb-40">Comments(1)</h2>
                     <div className="td-blog-postbox-comment mb-80">
                        <ul>
                           <li className="mb-60">
                              <div className="td-blog-postbox-comment-avater mr-20">
                                 <img src="/assets/img/blog/sidebar/avatar.png" alt="" />
                              </div>
                              <div className="td-blog-postbox-text">
                                 <h6 className="td-blog-postbox-title mb-5">Esther Howard</h6>
                                 <div className="td-blog-postbox-date">
                                    <span className="dvdr">28 March, 2021</span>
                                    <span>12:02 pm</span>
                                 </div>
                                 <p className="td-blog-postbox-para pt-10 mb-20">We believe everyone should have the opportunity to create the progress technology
                                    & develop the skills. Only respondents said to use the frameworks.</p>
                                 <Link className="td-blog-postbox-btn" to="#">
                                    <svg className="mr-5" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M3.5 6.5L1 4L3.5 1.5" stroke="#1C1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M9 9.5V6C9 5.46957 8.78929 4.96086 8.41421 4.58579C8.03914 4.21071 7.53043 4 7 4H1" stroke="#1C1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Reply
                                 </Link>
                              </div>
                           </li>
                           <li className="children">
                              <div className="td-blog-postbox-comment-avater mr-20">
                                 <img src="/assets/img/blog/sidebar/avatar-3.png" alt="" />
                              </div>
                              <div className="td-blog-postbox-text">
                                 <h6 className="td-blog-postbox-title mb-5">Gloria Patel</h6>
                                 <div className="td-blog-postbox-date">
                                    <span className="dvdr">28 March, 2021</span>
                                    <span>12:02 pm</span>
                                 </div>
                                 <p className="td-blog-postbox-para pt-10 mb-20">We invite you to explore our trading blog for the latest industry insights and
                                    expert analysis and make decisions.</p>
                                 <Link className="td-blog-postbox-btn" to="#">
                                    <svg className="mr-5" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M3.5 6.5L1 4L3.5 1.5" stroke="#1C1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M9 9.5V6C9 5.46957 8.78929 4.96086 8.41421 4.58579C8.03914 4.21071 7.53043 4 7 4H1" stroke="#1C1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Reply
                                 </Link>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div className="td-blog-postbox-form">
                        <h2 className="td-blog-comment-title mb-10">Leave a Reply</h2>
                        <p className="mb-35">Your email address will not be published. Required fields are marked *</p>
                        <BlogForm />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogComment
