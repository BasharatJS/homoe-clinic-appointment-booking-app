'use client'

import { useState } from 'react'
import TopHeader from '@/components/header/TopHeader'
import NavItemsHeader from '@/components/header/NavItemsHeader'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import WhyChooseUs from '@/components/why-choose-us/WhyChooseUs'
import Services from '@/components/services/Services'
import Testimonial from '@/components/testimonial/Testimonial'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import AppointmentModal from '@/components/modal/AppointmentModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <TopHeader onOpenModal={openModal} />
        <NavItemsHeader />
      </header>

      {/* Main Content */}
      <main className="pt-32">
        <Hero />
        <About />
        <WhyChooseUs />
        <Services />
        <Testimonial />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
