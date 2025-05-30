import React, { useEffect, useState } from "react";
import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.png";
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";

const bgImages = [hero1, hero2, hero3];
const typingText = "Build Smarter With AI Tools";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Background image cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (charIndex < typingText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + typingText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex]);

  return (
    <div className="hero-container">
      {bgImages.map((image, index) => (
        <div
          key={index}
          className={`hero ${index === currentImage ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          {index === currentImage && (
            <div className="hero-text">
              <h1>{displayedText}</h1>
              <p>
                Discover powerful AI utilities that boost creativity,
                productivity, and automation – all in one place.
              </p>
              <button className="btn">
                Explore more <img src={dark_arrow} alt="" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Hero;
