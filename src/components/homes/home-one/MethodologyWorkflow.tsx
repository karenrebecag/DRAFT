import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './MethodologyWorkflow.module.scss'

// Import Swiper styles
import 'swiper/css'

// Workflow Data - 5 Service Verticals (Executive Engineering Level)
const WORKFLOW_DATA = {
  "product-engineering": {
    label: "Product Engineering",
    steps: [
      { id: "01", title: "Technical Architecture & Blueprinting", desc: "We define the foundational tech stack tailored to your specific vision. We prioritize scalable database schemas, decoupled backend logic, and cloud-native infrastructure maps to ensure high availability from day one." },
      { id: "02", title: "Systems Design & Engineering", desc: "We translate complex User Journeys into a robust software blueprint. Our team engineers high-fidelity interactive prototypes and scalable design systems that bridge the gap between aesthetics and production-ready code." },
      { id: "03", title: "Full-Stack Development & Implementation", desc: "Our engineers build your product using modern frameworks like Next.js, NestJS, or native environments (Swift/Flutter). We implement complex business logic under clean, modular code standards and seamless third-party integrations." },
      { id: "04", title: "End-to-End Quality Assurance", desc: "Quality is non-negotiable. We apply rigorous unitary testing, integration testing, and UX research validation. Every feature is stress-tested to ensure absolute stability and peak performance before any deployment." }
    ]
  },
  "immersive-web": {
    label: "Creative Dev & Immersive",
    steps: [
      { id: "01", title: "Visual Narrative & Motion Logic", desc: "We don't just animate; we narrate. We define the motion language and interaction physics that will guide the user, ensuring every transition and micro-interaction serves a clear cognitive purpose within the 3D space." },
      { id: "02", title: "3D Asset Optimization & Topology", desc: "Performance makes or breaks immersion. We meticulously optimize geometry topology and apply Draco compression to GLB assets, ensuring cinema-quality visuals load instantly without compromising the browser's main thread." },
      { id: "03", title: "Custom Shaders & GLSL Engineering", desc: "Moving beyond standard libraries, we write custom GLSL shaders to create fluid distortions, refractions, and particle systems. This allows for unique visual signatures that are mathematically impossible in standard DOM styling." },
      { id: "04", title: "Frame-Rate Locking & Instancing", desc: "We engineer for a locked 60fps across devices. By utilizing geometry instancing and rigorous draw-call management, we ensure the experience remains buttery smooth on everything from high-end desktops to mobile GPUs." }
    ]
  },
  "advanced-ecommerce": {
    label: "Advanced E-commerce",
    steps: [
      { id: "01", title: "Ecosystem Audit & Strategy", desc: "We analyze technical debt and conversion bottlenecks in your current stack. Our engineers map out a headless migration strategy that decouples the frontend experience from backend logic to unlock true design freedom." },
      { id: "02", title: "Headless Architecture Implementation", desc: "Building on Shopify Hydrogen or custom Next.js frontends, we architect a shopping experience that feels like a native app. We implement edge-caching strategies to ensure sub-second page loads globally." },
      { id: "03", title: "Global Payments & Tax Logic", desc: "Scaling revenue means removing borders. We integrate complex multi-currency payment gateways and automate tax compliance logic, ensuring a frictionless checkout experience for every market you operate in." },
      { id: "04", title: "CRO & A/B Testing Integration", desc: "Launch is just Day One. We deploy with built-in experimentation suites that allow for granular A/B testing of pricing models and UI layouts, turning your platform into a self-optimizing revenue engine." }
    ]
  },
  "ai-automation": {
    label: "AI & Intelligent Integrations",
    steps: [
      { id: "01", title: "Operational Friction Analysis", desc: "We dissect your internal workflows to identify high-value automation opportunities. We map out where human creativity is essential and where intelligent agents can take over repetitive cognitive tasks." },
      { id: "02", title: "RAG Pipeline & Model Tuning", desc: "We don't just wrap generic APIs. We build Retrieval-Augmented Generation (RAG) pipelines that feed your specific company data into the model, ensuring the AI understands your unique context and tone of voice." },
      { id: "03", title: "Orchestration & API Connectivity", desc: "The power lies in connection. We engineer the middleware that allows AI agents to read from your CRM, write to your database, and trigger actions in Slack, creating a fully autonomous operational loop." },
      { id: "04", title: "Human-in-the-Loop Observability", desc: "Trust requires verification. We build custom dashboards that allow your team to monitor AI decisions in real-time, providing an oversight layer that ensures safety and accuracy before full autonomy is granted." }
    ]
  },
  "design-engineering": {
    label: "Design Engineering & Research",
    steps: [
      { id: "01", title: "Heuristic Evaluation & Discovery", desc: "We audit your product against rigorous usability heuristics and competitor benchmarks. We identify cognitive overload points and structural inconsistencies that are silently killing your user retention." },
      { id: "02", title: "Atomic Design Tokenization", desc: "We move beyond style guides into code-backed Design Tokens. By defining spacing, typography, and motion as variables, we ensure that a change in Figma propagates instantly to the codebase without regression." },
      { id: "03", title: "Living Documentation (Storybook)", desc: "We treat documentation as a product. We deploy interactive component environments (Storybook) that serve as a single source of truth, allowing developers and designers to audit UI logic in isolation." },
      { id: "04", title: "Zero-Gap Handoff Protocol", desc: "We eliminate the 'lost in translation' phase. We deliver pixel-perfect specifications with ready-to-use CSS/JSX snippets and motion curves, ensuring the final build is mathematically identical to the design vision." }
    ]
  }
}

type CategoryKey = keyof typeof WORKFLOW_DATA

const categories = Object.keys(WORKFLOW_DATA) as CategoryKey[]

const MethodologyWorkflow = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('product-engineering')
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const activeData = WORKFLOW_DATA[activeCategory]

  const handleCategoryChange = (category: CategoryKey) => {
    if (category !== activeCategory) {
      setActiveCategory(category)
      // Reset swiper position when category changes
      if (swiperRef.current) {
        swiperRef.current.slideTo(0)
      }
    }
  }

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  return (
    <div className={styles.workflow}>
      {/* Filter Chips */}
      <div className={styles.chipsContainer}>
        <div className={styles.chipsScroll}>
          {categories.map((key) => (
            <button
              key={key}
              className={`${styles.chip} ${activeCategory === key ? styles.chipActive : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              {WORKFLOW_DATA[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Section */}
      <div className={styles.swiperSection}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.swiperWrapper}
          >
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning)
                setIsEnd(swiper.isEnd)
              }}
              slidesPerView={1.25}
              spaceBetween={0}
              breakpoints={{
                480: {
                  slidesPerView: 1.8,
                },
                992: {
                  slidesPerView: 3.5,
                },
              }}
              className={styles.swiper}
            >
              {activeData.steps.map((step, index) => (
                <SwiperSlide key={`${activeCategory}-${step.id}`} className={styles.slide}>
                  <div className={styles.card}>
                    {/* Step Number */}
                    <span className={styles.cardNumber}>{step.id}</span>

                    {/* Content */}
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>{step.title}</h4>
                      <p className={styles.cardDesc}>{step.desc}</p>
                    </div>

                    {/* Decorative Line */}
                    <div className={styles.cardLine} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className={styles.controls}>
          <div className={styles.controlsInner}>
            <button
              className={`${styles.navButton} ${isBeginning ? styles.navButtonDisabled : ''}`}
              onClick={handlePrev}
              disabled={isBeginning}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className={`${styles.navButton} ${isEnd ? styles.navButtonDisabled : ''}`}
              onClick={handleNext}
              disabled={isEnd}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MethodologyWorkflow
