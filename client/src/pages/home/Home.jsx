import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Main from "../../components/main/Main";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import Services from "../../components/services/Services";
import Testimonials from "../../components/testimonials/Testimonials"
import ScrollToTopButton from "../../components/scrollTop/ScrollToTopButton";

const Home = () => {

  return (
    <div className="home-container">
      <Navbar />
      <Main />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTopButton/>
    </div>
  );
};

export default Home;
