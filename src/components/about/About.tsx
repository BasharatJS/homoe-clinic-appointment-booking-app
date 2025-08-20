'use client'

import { motion } from 'framer-motion'

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="about"
      className="min-h-screen py-20 px-4 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl"></div>
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
            Meet Your Trusted Homeopathic Doctor
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Dedicated to providing compassionate homeopathic care with expertise
            in women's and children's health
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Side - Doctor Profile */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Doctor Image */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="w-full h-96 lg:h-[500px] mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border overflow-hidden backdrop-blur-sm">
                <img
                  src="https://img.freepik.com/premium-photo/young-arab-woman-doctor-hijab-medical-mask-gloves-standing-hospital-using-tablet_662214-408883.jpg"
                  alt="Dr. Gajala Parween"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold">
                    Dr. Gajala Parween
                  </h3>
                  <p className="text-white/80">BHMS(MU), DMT</p>
                </div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-pulse"></div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-4 text-center"
            >
              <div className="p-4 rounded-lg bg-muted border border-border">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-foreground/70">
                  Years Experience
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted border border-border">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-foreground/70">
                  Patients Treated
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted border border-border">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-foreground/70">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main Description */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Dr. Gajala Parween
              </h3>
              <div className="space-y-2">
                <p className="text-lg font-medium text-primary">
                  BHMS(MU), DMT
                </p>
                <p className="text-lg text-foreground/80">
                  Specialist in Women's and Children's Diseases
                </p>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed">
                With over 15 years of dedicated practice in homeopathic
                medicine, Dr. Gajala Parween has established herself as a
                trusted healthcare provider specializing in women's health and
                pediatric care. Her compassionate approach and deep
                understanding of natural healing methods have helped thousands
                of families achieve better health and wellness.
              </p>
            </motion.div>

            {/* Expertise Areas */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h4 className="text-2xl font-semibold text-foreground">
                Areas of Expertise
              </h4>
              <div className="grid gap-3">
                {[
                  {
                    icon: '👩‍⚕️',
                    title: "Women's Health",
                    desc: "Comprehensive care for all women's health issues",
                  },
                  {
                    icon: '👶',
                    title: 'Pediatric Care',
                    desc: "Gentle, natural treatment for children's ailments",
                  },
                  {
                    icon: '🌿',
                    title: 'Natural Healing',
                    desc: 'Holistic approach using homeopathic principles',
                  },
                  {
                    icon: '💊',
                    title: 'Chronic Conditions',
                    desc: 'Long-term management of chronic health issues',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors duration-300"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h5 className="font-semibold text-foreground">
                        {item.title}
                      </h5>
                      <p className="text-foreground/70">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-foreground/80 leading-relaxed">
              "To provide personalized, compassionate homeopathic care that
              addresses the root cause of illness while promoting natural
              healing and overall wellness. We believe in treating the person,
              not just the disease, with special focus on women's health and
              children's well-being."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
