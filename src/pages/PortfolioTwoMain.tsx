import Wrapper from '../layouts/Wrapper'
import SEO from '../components/SEO'
import PortfolioTwo from '../components/portfolios/portfolio-two'

const PortfolioTwoMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'PortfolioTwo'} />
         <PortfolioTwo />
      </Wrapper>
   )
}

export default PortfolioTwoMain
