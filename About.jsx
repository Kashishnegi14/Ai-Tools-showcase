import React, { useEffect } from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play-icon.png";

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-section">
      <div className="about">
        <div className="about-left hidden">
          <img src={about_img} alt="About" className="about-img" />
          <img src={play_icon} alt="Play Icon" className="play-icon pulse" />
        </div>

        <div className="about-right hidden">
          <h3>ABOUT TOOLS</h3>
          <p>
            Discover a suite of intelligent AI tools designed to simplify your
            digital workflow — from generating high-quality text, enhancing
            images, to scheduling social media posts.
          </p>
          <p>
            At AI Tools Showcase, we aim to make advanced technology accessible
            to everyone. Whether you're a content creator, marketer, or just
            exploring the power of AI.
          </p>
          <p>
            From generating engaging text and enhancing images to scheduling
            social media posts — our AI-powered tools are built to save time,
            boost creativity, and streamline your workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
