import { Link } from 'react-router-dom'
import SectionHeading from '../../ui/SectionHeading'
import DraggableMarquee from '../../ui/DraggableMarquee'
import styles from './Portfolio.module.scss'

interface PortfolioItem {
  id: number
  thumb: string
  year: string
  title: string
}

// Portfolio data - Row 1
const portfolioData: PortfolioItem[] = [
  { id: 1, thumb: '/assets/img/portfolio/2/thumb.jpg', year: '2024', title: 'Brand Identity System' },
  { id: 2, thumb: '/assets/img/portfolio/2/thumb-2.jpg', year: '2024', title: 'E-Commerce Platform' },
  { id: 3, thumb: '/assets/img/portfolio/2/thumb-3.jpg', year: '2024', title: 'Interactive 3D Experience' },
  { id: 4, thumb: '/assets/img/portfolio/2/thumb-4.jpg', year: '2024', title: 'SaaS Dashboard' },
  { id: 5, thumb: '/assets/img/portfolio/2/thumb-5.jpg', year: '2024', title: 'AI Agent Workflow' },
  { id: 6, thumb: '/assets/img/portfolio/2/thumb-6.jpg', year: '2024', title: 'Component Library' },
  { id: 7, thumb: '/assets/img/portfolio/2/thumb-7.jpg', year: '2024', title: 'Mobile App' },
  { id: 8, thumb: '/assets/img/portfolio/2/thumb-8.jpg', year: '2024', title: 'Shopify Store' },
]

// Portfolio data - Row 2
const portfolioData2: PortfolioItem[] = [
  { id: 9, thumb: '/assets/img/portfolio/2/thumb-7.jpg', year: '2024', title: 'WebGL Product Viewer' },
  { id: 10, thumb: '/assets/img/portfolio/2/thumb-8.jpg', year: '2024', title: 'AI Content Generator' },
  { id: 11, thumb: '/assets/img/portfolio/2/thumb.jpg', year: '2024', title: 'Design Token System' },
  { id: 12, thumb: '/assets/img/portfolio/2/thumb-2.jpg', year: '2024', title: 'Headless Commerce' },
  { id: 13, thumb: '/assets/img/portfolio/2/thumb-3.jpg', year: '2024', title: 'Real-time Dashboard' },
  { id: 14, thumb: '/assets/img/portfolio/2/thumb-4.jpg', year: '2024', title: 'Immersive Portfolio' },
  { id: 15, thumb: '/assets/img/portfolio/2/thumb-5.jpg', year: '2024', title: 'Automation Pipeline' },
  { id: 16, thumb: '/assets/img/portfolio/2/thumb-6.jpg', year: '2024', title: 'Enterprise Platform' },
]

const PortfolioItem = ({ item }: { item: PortfolioItem }) => (
  <div className={styles.portfolioItem}>
    <div className={styles.portfolioThumb}>
      <img src={item.thumb} alt={item.title} draggable={false} loading="eager" />
      <div className={styles.portfolioOverlay} />
    </div>
    <div className={styles.portfolioContent}>
      <div className={styles.portfolioMeta}>
        <span>{item.year}</span>
      </div>
      <Link className={styles.portfolioTitle} to="/portfolio-details">
        {item.title}
      </Link>
    </div>
  </div>
)

const Portfolio = () => {
  return (
    <section className={styles.portfolioSection}>
      {/* Header */}
      <div className={styles.header}>
        <SectionHeading
          titleLine1="Explore our"
          titleLine1Style="poppins"
          titleLine2="Works"
          titleLine2Style="arapey"
          description="Select a specialized service to explore our dedicated workflow."
          align="left"
        />
      </div>

      {/* Marquee 1 - Left direction */}
      <div className={styles.marqueeWrapper}>
        <DraggableMarquee direction="left" duration={40} multiplier={35} sensitivity={0.01}>
          {portfolioData.map((item) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </DraggableMarquee>
      </div>

      {/* Marquee 2 - Right direction */}
      <div className={styles.marqueeWrapper}>
        <DraggableMarquee direction="right" duration={40} multiplier={35} sensitivity={0.01}>
          {portfolioData2.map((item) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </DraggableMarquee>
      </div>
    </section>
  )
}

export default Portfolio
