import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeOnemain from '../pages/HomeOnemain';
import AboutMain from '../pages/AboutMain';
import ServiceMain from '../pages/ServiceMain';
import ServiceDetailsMain from '../pages/ServiceDetailsMain';
import PortfolioTwoMain from '../pages/PortfolioTwoMain';
import PortfolioDetailsMain from '../pages/PortfolioDetailsMain';
import BlogOneMain from '../pages/BlogOneMain';
import BlogDetailsMain from '../pages/BlogDetailsMain';
import ContactMain from '../pages/ContactMain';
import ErrorMain from '../pages/ErrorMain';

const AppNavigation = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<HomeOnemain />} />
            <Route path="/about" element={<AboutMain />} />
            <Route path="/service" element={<ServiceMain />} />
            <Route path="/service-details" element={<ServiceDetailsMain />} />
            <Route path="/portfolio" element={<PortfolioTwoMain />} />
            <Route path="/portfolio-details" element={<PortfolioDetailsMain />} />
            <Route path="/blog" element={<BlogOneMain />} />
            <Route path="/blog-details" element={<BlogDetailsMain />} />
            <Route path="/contact" element={<ContactMain />} />
            <Route path="*" element={<ErrorMain />} />
         </Routes>
      </Router>
   );
};

export default AppNavigation;