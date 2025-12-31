"use client"

import { motion } from "motion/react"

const processSteps = [
  {
    title: "Research",
    description: "Análisis de negocio y mercado",
  },
  {
    title: "Diseño",
    description: "Interfaces y experiencias",
  },
  {
    title: "Desarrollo",
    description: "Código escalable y robusto",
  },
  {
    title: "Validación",
    description: "Testing y ajustes",
  },
  {
    title: "Soporte",
    description: "Acompañamiento continuo",
  },
]

const trustSignals = [
  {
    title: "100% Remote",
    description: "Equipo distribuido desde CDMX con alcance global",
  },
  {
    title: "Proyectos a medida",
    description: "Soluciones personalizadas para cada cliente",
  },
  {
    title: "Arquitecturas desacopladas",
    description: "Sistemas escalables y mantenibles",
  },
  {
    title: "Testing y soporte continuo",
    description: "Acompañamiento post-lanzamiento",
  },
]

const teamMembers = [
  {
    name: "Alex Rodríguez",
    role: "Lead Developer",
    description: "Especialista en arquitecturas escalables y frontend moderno",
    initials: "AR",
  },
  {
    name: "María González",
    role: "Product Designer",
    description: "Enfocada en experiencias digitales intuitivas y centradas en el usuario",
    initials: "MG",
  },
  {
    name: "Carlos Mendoza",
    role: "Full Stack Engineer",
    description: "Experto en integración de sistemas y desarrollo end-to-end",
    initials: "CM",
  },
  {
    name: "Sofia Torres",
    role: "UX Researcher",
    description: "Data-driven design y validación de hipótesis con usuarios reales",
    initials: "ST",
  },
  {
    name: "Diego López",
    role: "DevOps Engineer",
    description: "Optimización de despliegues y arquitectura cloud",
    initials: "DL",
  },
  {
    name: "Ana Martínez",
    role: "Project Manager",
    description: "Coordinación de equipos y entrega de proyectos a tiempo",
    initials: "AM",
  },
]

export function AboutSection() {
  return (
    <section className="px-6 py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Main About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="border border-zinc-800 py-1.5 px-4 rounded-full text-sm text-zinc-400 inline-block mb-6">
            Sobre Nosotros
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-6 text-balance tracking-tight">
            Design-led development para productos digitales modernos
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl text-pretty leading-relaxed">
            Somos un development studio con base en CDMX que diseña y construye productos digitales a medida, combinando
            criterio visual, frontend sólido y arquitecturas pensadas para escalar.
          </p>

          <div className="mb-16 p-8 md:p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-zinc-400 leading-relaxed mb-6 text-balance">
                Muchas agencias priorizan velocidad y plantillas. Otras priorizan ingeniería, pero descuidan la
                experiencia.
              </p>
              <p className="text-zinc-200 leading-relaxed text-balance text-lg">
                En DraftStudio trabajamos de forma distinta: integramos diseño, desarrollo y producto desde el inicio
                para crear soluciones que funcionan hoy y evolucionan mañana.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-zinc-100 mb-8 tracking-tight">
              Nuestro proceso es claro y colaborativo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300 group h-full">
                    <div className="text-xs font-medium text-zinc-500 mb-2">PASO {index + 1}</div>
                    <h4 className="text-zinc-100 font-semibold mb-2 group-hover:text-white transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <svg className="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {trustSignals.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 group"
              >
                <h4 className="text-zinc-100 font-semibold mb-2 text-lg group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Context */}
          <p className="text-zinc-400 leading-relaxed text-pretty text-lg">
            Trabajamos con equipos internacionales, en entornos remotos y con distintos niveles de complejidad: desde
            soluciones simples para negocios no-tech hasta productos personalizados de alto impacto.
          </p>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="border border-zinc-800 py-1.5 px-4 rounded-full text-sm text-zinc-400 inline-block mb-6">
              Nuestro Equipo
            </div>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
              El talento detrás de cada proyecto
            </h3>
            <p className="text-zinc-500 max-w-2xl mx-auto text-balance text-lg leading-relaxed">
              Un equipo multidisciplinario con experiencia internacional, listo para llevar tu visión al siguiente
              nivel.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/50 transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center mb-4 group-hover:from-zinc-600 group-hover:to-zinc-700 transition-all duration-300 border border-zinc-700/50">
                  <span className="font-heading text-2xl font-bold text-zinc-100">{member.initials}</span>
                </div>

                {/* Info */}
                <h4 className="font-heading text-lg font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                  {member.name}
                </h4>
                <p className="text-sm font-medium text-zinc-500 mb-3">{member.role}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-zinc-300 hover:text-zinc-100 transition-colors duration-300 group border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/30"
            >
              <span className="text-base font-medium">Conoce cómo trabajamos</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
