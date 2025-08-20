'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import AppointmentModal from '@/components/modal/AppointmentModal'

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const services = [
    {
      icon: '👩‍⚕️',
      title: "Women's Health & Gynecology",
      shortDesc: "Complete care for women's reproductive and hormonal health",
      initialPrice: '₹500',
      followupPrice: '₹300',
      duration: '45 minutes',
      conditions: [
        'PCOS & Ovarian Cysts',
        'Irregular Menstruation',
        'Fertility Enhancement',
        'Pregnancy Care',
        'Menopause Management',
        'Hormonal Imbalances',
      ],
      fullDesc:
        'Specialized treatment for PCOS, irregular periods, fertility issues, pregnancy care, menopause symptoms, and hormonal imbalances using gentle homeopathic remedies.',
    },
    {
      icon: '👶',
      title: 'Pediatric & Child Care',
      shortDesc:
        "Gentle healing solutions for children's health and development",
      initialPrice: '₹400',
      followupPrice: '₹250',
      duration: '30 minutes',
      conditions: [
        'Recurring Cold & Cough',
        'Allergies & Skin Issues',
        'Digestive Problems',
        'Behavioral Disorders',
        'Growth & Development',
        'Immunity Building',
      ],
      fullDesc:
        'Safe and effective treatment for childhood illnesses, behavioral issues, growth problems, and developmental concerns without harmful side effects.',
    },
    {
      icon: '⚕️',
      title: 'Chronic Disease Management',
      shortDesc: 'Long-term care for persistent health conditions',
      initialPrice: '₹600',
      followupPrice: '₹350',
      duration: '60 minutes',
      conditions: [
        'Diabetes Management',
        'Hypertension Control',
        'Arthritis & Joint Pain',
        'Autoimmune Disorders',
        'Thyroid Problems',
        'Chronic Fatigue',
      ],
      fullDesc:
        'Comprehensive management of chronic conditions like diabetes, hypertension, arthritis, and autoimmune disorders through constitutional homeopathic treatment.',
    },
    {
      icon: '🍃',
      title: 'Digestive Health',
      shortDesc: 'Natural solutions for digestive and gastrointestinal issues',
      initialPrice: '₹450',
      followupPrice: '₹275',
      duration: '40 minutes',
      conditions: [
        'IBS & Digestive Issues',
        'Acidity & GERD',
        'Constipation',
        'Food Allergies',
        'Liver Disorders',
        'Stomach Ulcers',
      ],
      fullDesc:
        'Treatment for various digestive disorders including IBS, acidity, constipation, and food allergies using personalized homeopathic remedies.',
    },
    {
      icon: '🧠',
      title: 'Mental Health & Wellness',
      shortDesc: 'Holistic approach to emotional and psychological well-being',
      initialPrice: '₹550',
      followupPrice: '₹325',
      duration: '50 minutes',
      conditions: [
        'Anxiety & Panic Disorders',
        'Depression & Mood Swings',
        'Stress Management',
        'Sleep Disorders',
        'ADHD in Children',
        'Emotional Imbalances',
      ],
      fullDesc:
        'Support for anxiety, depression, stress-related disorders, and emotional imbalances through gentle homeopathic treatment and counseling.',
    },
    {
      icon: '🛡️',
      title: 'Preventive Care & Immunity',
      shortDesc: 'Building strong immunity and preventing illness naturally',
      initialPrice: '₹350',
      followupPrice: '₹200',
      duration: '30 minutes',
      conditions: [
        'Immunity Boosting',
        'Seasonal Illness Prevention',
        'Vaccination Support',
        'Health Maintenance',
        'Detoxification',
        'Lifestyle Counseling',
      ],
      fullDesc:
        'Preventive healthcare programs to boost immunity, prevent seasonal illnesses, and maintain optimal health for the entire family.',
    },
  ]

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <section
      id="services"
      className="min-h-screen py-20 px-4 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-16 w-80 h-80 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl"></div>
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
            Specialized Homeopathic Services
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Comprehensive homeopathic healthcare solutions for your entire
            family's wellness needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div
                className={`relative rounded-2xl bg-background border border-border backdrop-blur-sm shadow-lg transition-all duration-500 ${
                  hoveredCard === index ? 'h-auto pb-6' : 'h-96'
                } hover:shadow-xl hover:border-primary/50`}
              >
                {/* Bottom-to-top Gradient Overlay */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-secondary to-primary opacity-90 transition-all duration-500 rounded-2xl ${
                    hoveredCard === index ? 'h-full' : 'h-0'
                  }`}
                ></div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* Icon & Title */}
                  <div className="mb-4">
                    <motion.div
                      className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3
                      className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                        hoveredCard === index ? 'text-white' : 'text-foreground'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Short Description (Always Visible) */}
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      hoveredCard === index
                        ? 'text-white/90'
                        : 'text-foreground/70'
                    }`}
                  >
                    {service.shortDesc}
                  </p>

                  {/* Pricing (Always Visible) */}
                  <div className="mt-4 flex justify-between items-center">
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        hoveredCard === index
                          ? 'text-white/80'
                          : 'text-foreground/60'
                      }`}
                    >
                      <div>
                        Initial:{' '}
                        <span className="font-semibold">
                          {service.initialPrice}
                        </span>
                      </div>
                      <div>
                        Follow-up:{' '}
                        <span className="font-semibold">
                          {service.followupPrice}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium transition-colors duration-300 ${
                        hoveredCard === index ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {service.duration}
                    </div>
                  </div>

                  {/* Conditions Preview (Always Visible) */}
                  {hoveredCard !== index && (
                    <div className="mt-4">
                      <h4 className="text-foreground/70 font-medium text-sm mb-2">
                        Conditions Treated:
                      </h4>
                      <div className="space-y-1">
                        {service.conditions.slice(0, 3).map((condition, idx) => (
                          <div key={idx} className="text-foreground/60 text-sm flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 flex-shrink-0"></span>
                            <span className="line-clamp-1">{condition}</span>
                          </div>
                        ))}
                        <div className="text-primary/70 text-sm font-medium">
                          +{Math.max(0, service.conditions.length - 3)} more...
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded Content (Visible on Hover) */}
                  {hoveredCard === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-6 space-y-4"
                    >
                      {/* Conditions Treated */}
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          Conditions Treated:
                        </h4>
                        <div className="grid grid-cols-1 gap-1">
                          {service.conditions.map((condition, idx) => (
                            <div
                              key={idx}
                              className="text-white/80 text-sm flex items-center"
                            >
                              <span className="w-1.5 h-1.5 bg-white/60 rounded-full mr-2"></span>
                              {condition}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Full Description */}
                      <p className="text-white/90 text-sm leading-relaxed">
                        {service.fullDesc}
                      </p>

                      {/* Book Appointment Button */}
                      <motion.button
                        onClick={openModal}
                        className="w-full mt-4 py-3 px-6 rounded-lg bg-white text-primary font-semibold transition-all duration-300 hover:bg-white/90 hover:scale-105"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Appointment
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300"></div>
              </div>

              {/* Floating Decoration */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full opacity-60"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
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
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={openModal}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg btn-hover-effect relative z-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Your Consultation
            </motion.button>

            <motion.button
              onClick={() =>
                window.open(
                  'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20would%20like%20to%20book%20an%20appointment%20for%20your%20homeopathic%20services%20through%20WhatsApp.',
                  '_blank'
                )
              }
              className="px-8 py-4 rounded-lg border-2 border-[#25D366] text-[#25D366] font-semibold text-lg relative z-10 overflow-hidden transition-all duration-300 flex items-center space-x-2 hover:text-white before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-[#25D366] before:transition-all before:duration-300 before:z-[-1] hover:before:left-0"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
              </svg>
              <span>Book on WhatsApp</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
