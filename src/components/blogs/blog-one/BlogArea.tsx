import { Link } from "react-router-dom"
import blog_data from "../../../data/BlogData"
import { useMemo } from "react";

const BlogArea = () => {

  const filteredData = useMemo(() => {
    return blog_data.filter((items) => items.page === "blog_1");
  }, []);

  return (
    <div className="td-blog-area pt-140 pb-100">
      <div className="container">
        <div className="row">
          {filteredData.map((item) => (
            <div key={item.id} className="col-xl-4 col-lg-6 col-md-6  wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
              <div className="td-blog-wrap mb-60">
                <div className="td-blog-thumb fix mb-25">
                  <img className="w-100" src={item.thumb} alt="" />
                </div>
                <div className="td-blog-content">
                  <h3 className="td-blog-title mb-30"><Link to="/blog-details">{item.title}</Link></h3>
                  <div className="td-blog-cetagory d-flex align-items-center">
                    <span className="cetagory">{item.tag}</span>
                    <span className="td-border ml-20 mr-15 d-inline-block"></span>
                    <span className="dates">{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogArea
