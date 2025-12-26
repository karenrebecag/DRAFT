import FooterGlobal from "../../../layouts/footers/FooterGlobal"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import BlogArea from "./BlogArea"
import BlogThumb from "./BlogThumb"

const BlogOne = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <BlogThumb />
                  <BlogArea />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default BlogOne
