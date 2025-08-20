'use client'

import { motion } from 'framer-motion'

export default function WhyChooseUs() {
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const reasons = [
    {
      icon: "👩‍⚕️",
      title: "Experienced Homeopathic Doctor",
      description: "Dr. Gajala Parween is a qualified BHMS (MU), DMT with years of expertise in women's and children's health. Trusted by thousands of families for safe and effective treatment with proven results."
    },
    {
      icon: "🎯",
      title: "Holistic Treatment Approach",
      description: "We focus on treating the root cause of illness, not just symptoms, for long-lasting relief. Our comprehensive approach addresses physical, mental, and emotional well-being for complete healing."
    },
    {
      icon: "🌿",
      title: "Safe & Natural Medicines",
      description: "100% natural homeopathic remedies with no harmful side effects. Our carefully selected medicines work gently with your body's natural healing process, suitable for all ages."
    },
    {
      icon: "💯",
      title: "Personalized Care",
      description: "Each patient receives customized treatment tailored to their specific health needs. We understand every individual is unique and deserves a treatment plan designed just for them."
    },
    {
      icon: "👶",
      title: "Specialist in Women & Children's Health",
      description: "Trusted care for maternal health, hormonal issues, and childhood diseases. From pregnancy support to pediatric care, we provide specialized treatment with gentle, effective remedies."
    },
    {
      icon: "🤝",
      title: "Patient-Centered Service",
      description: "Friendly consultation, easy appointment booking, and continuous follow-up support. We believe in building lasting relationships with our patients and providing care beyond just treatment sessions."
    }
  ]

  return (
    <section id="why-choose-us" className="min-h-screen py-20 px-4 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-80 h-80 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Why Choose Us
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Experience the difference with our comprehensive homeopathic care, dedicated expertise, and commitment to your family's health and wellness
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden"
            >
              {/* Card */}
              <div className="relative p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-500 h-full backdrop-blur-sm shadow-lg hover:shadow-xl">
                {/* Hover Gradient Overlay */}
                <div className="absolute top-0 left-0 right-0 h-0 bg-gradient-to-b from-secondary to-primary opacity-90 transition-all duration-500 group-hover:h-full rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    {reason.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-white mb-4 transition-colors duration-300">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                    {reason.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300"></div>
                </div>

              </div>

              {/* Floating Decoration */}
              <motion.div 
                className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => window.open('https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20would%20like%20to%20know%20more%20about%20your%20services.', '_blank')}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg btn-hover-effect relative z-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}