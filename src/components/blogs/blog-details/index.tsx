import Breadcrumb from "./Breadcrumb"
import BlogDetailsArea from "./BlogDetailsArea"
import BlogComment from "./BlogComment"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import FooterGlobal from "../../../layouts/footers/FooterGlobal"

const BlogDetails = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <Breadcrumb />
                  <BlogDetailsArea />
                  <BlogComment />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default BlogDetails
