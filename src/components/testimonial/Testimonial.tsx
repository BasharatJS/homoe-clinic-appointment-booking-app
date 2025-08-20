'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AppointmentModal from '@/components/modal/AppointmentModal'

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const testimonials = [
    {
      name: 'Priya Sharma',
      age: '32',
      condition: 'PCOS & Irregular Periods',
      rating: 5,
      text: 'Dr. Gajala Parween completely transformed my life! After struggling with PCOS for years, her homeopathic treatment not only regulated my periods but also helped me conceive naturally. Her caring approach and effective medicines gave me hope when I had none.',
      location: 'Mumbai',
      avatar: 'PS',
      gradient: 'from-pink-400 to-purple-500',
    },
    {
      name: 'Rajesh & Meera Patel',
      age: 'Parents',
      condition: "Child's Recurring Cold & Allergies",
      rating: 5,
      text: "Our 6-year-old son was constantly falling sick with cold and allergies. Dr. Gajala's gentle homeopathic treatment boosted his immunity amazingly. It's been 8 months, and he's rarely sick now. We're so grateful for her expertise!",
      location: 'Pune',
      avatar: 'RP',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'Sunita Devi',
      age: '45',
      condition: 'Chronic Joint Pain & Arthritis',
      rating: 5,
      text: "I was suffering from severe joint pain and arthritis for 3 years. Allopathic medicines gave temporary relief but Dr. Gajala's constitutional treatment addressed the root cause. Now I can walk freely and do my daily activities without pain!",
      location: 'Delhi',
      avatar: 'SD',
      gradient: 'from-green-400 to-teal-500',
    },
    {
      name: 'Anita Reddy',
      age: '28',
      condition: 'Anxiety & Depression',
      rating: 5,
      text: 'Dr. Gajala helped me overcome severe anxiety and depression naturally. Her homeopathic approach not only treated my symptoms but also strengthened my mental resilience. I feel like myself again after months of suffering. Highly recommended!',
      location: 'Bangalore',
      avatar: 'AR',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      name: 'Vikram Singh',
      age: '38',
      condition: 'Chronic Digestive Issues',
      rating: 5,
      text: "Years of acidity and digestive problems were ruining my life. Dr. Gajala's personalized homeopathic treatment completely cured my IBS and GERD. I can now enjoy my meals without fear. Her treatment approach is simply outstanding!",
      location: 'Jaipur',
      avatar: 'VS',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      name: 'Kavitha Nair',
      age: '35',
      condition: 'Skin Allergies & Eczema',
      rating: 5,
      text: "My chronic eczema and skin allergies were affecting my confidence. Dr. Gajala's homeopathic treatment not only cleared my skin completely but also prevented recurrence. My skin is now healthy and glowing. Thank you, Doctor!",
      location: 'Chennai',
      avatar: 'KN',
      gradient: 'from-teal-400 to-green-500',
    },
  ]

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section
      id="testimonial"
      className="min-h-screen py-20 px-4 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl"></div>
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
            What Our Patients Say
          </h2>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto">
            Real experiences from families who found healing and hope through our homeopathic care
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="relative bg-background/80 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Current Testimonial */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Avatar & Info */}
                <div className="text-center">
                  <motion.div
                    className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${testimonials[currentSlide].gradient} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {testimonials[currentSlide].avatar}
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {testimonials[currentSlide].name}
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    {testimonials[currentSlide].age} •{' '}
                    {testimonials[currentSlide].location}
                  </p>
                  <p className="text-primary font-medium text-sm mt-2">
                    {testimonials[currentSlide].condition}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex justify-center mt-3">
                    {[...Array(testimonials[currentSlide].rating)].map(
                      (_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-yellow-400 text-lg"
                        >
                          ⭐
                        </motion.span>
                      )
                    )}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">
                      "
                    </div>
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed italic pl-8">
                      {testimonials[currentSlide].text}
                    </p>
                    <div className="absolute -bottom-4 -right-4 text-6xl text-primary/20 font-serif rotate-180">
                      "
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/80 text-white flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/80 text-white flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary w-8'
                  : 'bg-border hover:bg-primary/60'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Previews */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                index === currentSlide
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background/50 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white text-xs font-bold mb-2`}
              >
                {testimonial.avatar}
              </div>
              <p className="text-xs text-foreground font-medium truncate">
                {testimonial.name.split(' ')[0]}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: '500+', label: 'Happy Families' },
            { number: '98%', label: 'Success Rate' },
            { number: '5+', label: 'Years Experience' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-foreground/70 text-sm mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-foreground/70 mb-6">
            Ready to start your healing journey?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={openModal}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg btn-hover-effect relative z-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>

            <motion.button
              onClick={() =>
                window.open(
                  'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20read%20the%20amazing%20testimonials%20and%20would%20like%20to%20book%20an%20appointment%20through%20WhatsApp.',
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
