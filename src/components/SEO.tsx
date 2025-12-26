import { useEffect } from "react";

type SEOProps = {
   pageTitle: string;
};

const SEO = ({ pageTitle }: SEOProps) => {
   useEffect(() => {
      document.title = `${pageTitle} - Parody - Digital Agency Portfolio React js Template`;
   }, [pageTitle]);

   return null;
};

export default SEO;