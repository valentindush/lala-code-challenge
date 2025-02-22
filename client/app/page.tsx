"use client"

import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FeaturedListings from "@/components/FeaturedListings"
import Experiences from "@/components/Experiences"
import Destinations from "@/components/Destinations"
import HostCTA from "@/components/HostCTA"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedListings />
      <Experiences />
      <Destinations />
      <HostCTA />
      <Testimonials />
      <Footer />
    </div>
  )
}

