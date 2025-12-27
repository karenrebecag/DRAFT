import { useEffect, useState } from "react";
import faq_data from "../../../data/FaqData";

interface DataType {
   id: number;
   page: string
   title: string;
   desc: string;
   showAnswer: boolean;
}

const Faq = () => {
   const [faqData, setFaqData] = useState<DataType[]>([]);

   useEffect(() => {
      const filtered = faq_data.filter(item => item.page === "inner_faq");
      const updatedData = filtered.map((item, index) => ({
         ...item,
         showAnswer: index === 0
      }));
      setFaqData(updatedData);
   }, []);

   const toggleAnswer = (faqId: number) => {
      setFaqData((prevFaqData) =>
         prevFaqData.map((faq) => ({
            ...faq,
            showAnswer: faq.id === faqId
         }))
      );
   };

   return (
      <div className="td-faq-2-area pt-100 pb-100 bg-white">
         <div className="container">
            <div className="row mb-50">
               <div className="col-lg-6">
                  <div className="td-faq-title-wrap">
                     <h2 className="td-section-title mb-30 td-text-invert">FAQ</h2>
                     <p className="td-section-text mr-200">Find answers to commonly asked questions about our services and process.</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-5 wow fadeInLeft" data-wow-delay=".5s" data-wow-duration="1s">
                  <div className="td-faq-2-thumb td-faq-main-thumb mt-40 mr-110 mb-30">
                     <img className="td-rounded-10" src="/assets/img/faq/main/thumb.jpg" alt="" />
                  </div>
               </div>
               <div className="col-lg-7 wow fadeInRight" data-wow-delay=".5s" data-wow-duration="1s">
                  <div className="td-faq-4-wrap-right td-faq-2-wrap-right td-faq-main-wrap-right mb-30">
                     <div className="td-faq-4-accordion">
                        <div className="accordion" id="accordionExample">
                           {faqData.map((item) => (
                              <div key={item.id} className="accordion-items">
                                 <h2 className="accordion-header" onClick={() => toggleAnswer(item.id)}>
                                    <button className={`accordion-buttons ${item.showAnswer ? "" : "collapsed"} `} type="button" data-bs-toggle="collapse"
                                       data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                       {item.title}
                                       <span className="plus-icon"></span>
                                    </button>
                                 </h2>
                                 <div id="collapseOne" className={`accordion-collapse collapse ${item.showAnswer ? "show" : ""}`}>
                                    <div className="accordion-body">
                                       <p>
                                          {item.desc}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Faq
