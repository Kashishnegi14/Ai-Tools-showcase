import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeatureSection from "./components/Feature/FeatureSection";
import About from "./components/About/About";
import FeedbackSection from "./components/Feedback/FeedbackSection";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/chatbot/chatbot";

const App = () => {
  return (
    <div>
      <Chatbot />
      <Navbar />
      <Hero />
      <FeatureSection />
      <About />
      <FeedbackSection />
      <Footer />
    </div>
  );
};

export default App;
