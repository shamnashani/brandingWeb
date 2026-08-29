import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import WhoWeAre from "./section2";
import Divisions from "./section3";
import WhyChooseUs from "./whychooseUs";
import CTASection from "./CTASection";
import FloatingButtons from "./FloatingButtons";
import ReviewsHome from "./ReviewsHome";
import Footer from "./Footer";
import SEO from './SEO'


function Home() {

const location = useLocation();

useEffect(() => {
  if (location.state?.scrollTo) {
    setTimeout(() => {
      document
        .getElementById(location.state.scrollTo)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}, [location]);

  return (
    <>
    <SEO
        title="S1 Creations | StudioBits | Global Creative & Technology Solutions"
        description="S1 Creations and StudioBits deliver global solutions across film production, construction, interior design, technology, software, and digital innovation."
        path="/"
      />
      <Navbar />
      <Hero />
      <WhoWeAre/>
      <Divisions/>
      <WhyChooseUs/>
      <ReviewsHome/>
      <CTASection></CTASection>
      <Footer/>
      <FloatingButtons/>
    </>
  );
}

export default Home;