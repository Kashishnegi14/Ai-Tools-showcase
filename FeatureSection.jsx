import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaImage,
  FaCalendarAlt,
  FaTimes,
  FaInfoCircle,
  FaPlay,
  FaStop,
  FaArrowRight,
  FaDownload,
  FaUpload,
  FaCheck,
} from "react-icons/fa";
import "./FeatureSection.css";

const FeatureSection = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [activeDemo, setActiveDemo] = useState(null);
  const [showInfo, setShowInfo] = useState(null);
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [postPlatform, setPostPlatform] = useState("");
  const [postDateTime, setPostDateTime] = useState("");

  // Sample text generation function
  const generateSampleText = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedText(
        `Here's an AI-generated paragraph about your topic. The text is tailored to your selected tone and length preferences. AI writing tools can help you create content faster while maintaining quality and consistency across all your communications. This technology uses advanced natural language processing to understand context and generate human-like text.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  // Sample image enhancement function
  const enhanceImage = () => {
    if (!imagePreview) return;
    setIsEnhancing(true);
    setTimeout(() => {
      setEnhancedImage(imagePreview); // In a real app, this would be the enhanced version
      setIsEnhancing(false);
    }, 2000);
  };

  // Schedule post function
  const schedulePost = () => {
    if (!postContent || !postPlatform || !postDateTime) return;

    const newPost = {
      platform: postPlatform,
      content: postContent,
      date: postDateTime,
      id: Date.now(),
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    setPostContent("");
    setPostPlatform("");
    setPostDateTime("");

    // Show success message
    alert(`Post scheduled for ${new Date(postDateTime).toLocaleString()}`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const tools = [
    {
      id: 1,
      title: "AI Text Generator",
      description: "Generate human-like text instantly for any purpose",
      icon: <FaEdit className="tool-icon" />,
      info: "This tool uses advanced GPT-4 technology to create high-quality content for blogs, emails, and creative writing. It can adapt to different tones, styles, and formats to match your needs perfectly.",
      steps: [
        "Enter your topic or keywords",
        "Select tone (professional, casual, etc.)",
        "Choose length (short, medium, long)",
        "Generate and refine output",
        "Copy or export your content",
      ],
      demoContent: (
        <div className="demo-content">
          <textarea
            placeholder="Enter your topic here (e.g., 'benefits of AI in healthcare')..."
            className="demo-textarea"
            rows="4"
          ></textarea>
          <div className="demo-controls">
            <select className="demo-select">
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="academic">Academic</option>
              <option value="persuasive">Persuasive</option>
            </select>
            <select className="demo-select">
              <option value="short">Short (100 words)</option>
              <option value="medium">Medium (300 words)</option>
              <option value="long">Long (500+ words)</option>
            </select>
            <button
              className="demo-btn generate-btn"
              onClick={generateSampleText}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Text"}
            </button>
          </div>
          {generatedText && (
            <div className="generated-text">
              <h4>Generated Text:</h4>
              <p>{generatedText}</p>
              <div className="text-actions">
                <button className="demo-btn">Copy Text</button>
                <button className="demo-btn">Save as Document</button>
              </div>
            </div>
          )}
        </div>
      ),
      color: "pink",
      stats: "Saves 3+ hours per week",
      useCases: [
        "Blog posts",
        "Marketing copy",
        "Product descriptions",
        "Email templates",
      ],
    },
    {
      id: 2,
      title: "Image Enhancer Pro",
      description: "Improve image quality automatically with AI",
      icon: <FaImage className="tool-icon" />,
      info: "Uses neural networks to upscale resolution (up to 4x), reduce noise, enhance colors, and restore old photos automatically. Supports JPG, PNG, and WEBP formats.",
      steps: [
        "Upload your image file (drag & drop supported)",
        "Select enhancement type (basic, advanced, ultra)",
        "Adjust settings like brightness/contrast",
        "Preview changes in real-time",
        "Download enhanced version",
      ],
      demoContent: (
        <div className="demo-content">
          <div className="image-demo">
            <div className="image-container before">
              {imagePreview ? (
                <img src={imagePreview} alt="Original" />
              ) : (
                <div className="image-upload-placeholder">
                  <FaUpload className="upload-icon" />
                  <p>Upload an image to enhance</p>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-upload" className="upload-btn">
                    Choose File
                  </label>
                </div>
              )}
              <span>Original Image</span>
            </div>
            <div className="image-container after">
              {enhancedImage ? (
                <img src={enhancedImage} alt="Enhanced" />
              ) : (
                <div className="image-preview-placeholder">
                  {isEnhancing ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <FaImage className="preview-icon" />
                      <p>Enhanced preview will appear here</p>
                    </>
                  )}
                </div>
              )}
              <span>Enhanced Image</span>
            </div>
          </div>
          <div className="demo-controls">
            <select className="demo-select">
              <option value="basic">Basic Enhancement</option>
              <option value="advanced">Advanced Enhancement</option>
              <option value="ultra">Ultra HD (4x)</option>
            </select>
            <button
              className="demo-btn enhance-btn"
              onClick={enhanceImage}
              disabled={!imagePreview || isEnhancing}
            >
              {isEnhancing ? "Processing..." : "Enhance Now"}
            </button>
          </div>
          {enhancedImage && (
            <div className="download-section">
              <button className="demo-btn download-btn">
                <FaDownload /> Download Enhanced Image
              </button>
            </div>
          )}
        </div>
      ),
      color: "blue",
      stats: "Improves images by 300% on average",
      useCases: [
        "Product photos",
        "Social media images",
        "Old photo restoration",
        "Real estate listings",
      ],
    },
    {
      id: 3,
      title: "Smart Post Scheduler",
      description: "Automate social media posts with optimal timing",
      icon: <FaCalendarAlt className="tool-icon" />,
      info: "Smart scheduling based on audience engagement patterns with multi-platform support. Includes analytics to track performance and suggest improvements.",
      steps: [
        "Connect your social accounts (10+ platforms supported)",
        "Create or import post content",
        "Set schedule or use optimal timing suggestions",
        "Add images/videos and format for each platform",
        "Review calendar and publish",
      ],
      demoContent: (
        <div className="demo-content">
          <div className="scheduler-demo">
            <select
              className="demo-select platform-select"
              value={postPlatform}
              onChange={(e) => setPostPlatform(e.target.value)}
            >
              <option value="">Select Platform</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
            </select>
            <textarea
              placeholder="Write your post here..."
              className="demo-textarea"
              rows="3"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            <input
              type="datetime-local"
              className="demo-date"
              value={postDateTime}
              onChange={(e) => setPostDateTime(e.target.value)}
            />
            <div className="media-upload">
              <button className="media-upload-btn">
                <FaUpload /> Add Media
              </button>
              <span>Supports images, videos, and GIFs</span>
            </div>
          </div>
          <div className="demo-controls">
            <button
              className="demo-btn schedule-btn"
              onClick={schedulePost}
              disabled={!postContent || !postPlatform || !postDateTime}
            >
              Schedule Post
            </button>
            <button className="demo-btn suggestion-btn">
              Suggest Optimal Time
            </button>
          </div>

          {scheduledPosts.length > 0 && (
            <div className="scheduled-posts">
              <h4>Your Scheduled Posts:</h4>
              <ul>
                {scheduledPosts.map((post) => (
                  <li key={post.id}>
                    <div className="post-platform">{post.platform}</div>
                    <div className="post-content">
                      {post.content.substring(0, 50)}...
                    </div>
                    <div className="post-date">
                      {new Date(post.date).toLocaleString()}
                    </div>
                    <button className="post-edit-btn">Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
      color: "green",
      stats: "Increases engagement by 40%",
      useCases: [
        "Social media marketing",
        "Content calendars",
        "Multi-platform campaigns",
        "Timed promotions",
      ],
    },
  ];

  const toggleDemo = (toolId) => {
    setActiveDemo(activeDemo === toolId ? null : toolId);
  };

  const handleInfoClick = (e, toolId) => {
    e.stopPropagation();
    setShowInfo(toolId);
  };

  return (
    <section className="feature-section">
      <div className="section-header">
        <h2 className="section-title">AI Productivity Suite</h2>
        <p className="section-subtitle">
          Powerful tools to supercharge your workflow
        </p>
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">10x</div>
            <div className="stat-label">Faster Content Creation</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI Assistance</div>
          </div>
        </div>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`tool-card ${tool.color}`}
            onClick={() => setActiveTool(tool)}
          >
            <div className="tool-header">
              <div className="tool-icon-container">{tool.icon}</div>
              <h3 className="tool-title">{tool.title}</h3>
              <button
                className="info-icon"
                onClick={(e) => handleInfoClick(e, tool.id)}
                aria-label="More information"
              >
                <FaInfoCircle />
              </button>
            </div>

            <p className="tool-description">{tool.description}</p>

            <div className="tool-stats">
              <span className="stat-badge">
                <FaCheck className="stat-icon" /> {tool.stats}
              </span>
            </div>

            <div className="tool-use-cases">
              <h4>Perfect for:</h4>
              <ul>
                {tool.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="tool-footer">
              <button
                className={`demo-toggle ${
                  activeDemo === tool.id ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDemo(tool.id);
                }}
              >
                {activeDemo === tool.id ? (
                  <>
                    <FaStop /> Stop Demo
                  </>
                ) : (
                  <>
                    <FaPlay /> Try It
                  </>
                )}
              </button>

              <button
                className="learn-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTool(tool);
                }}
              >
                Learn More <FaArrowRight className="arrow-icon" />
              </button>
            </div>

            {activeDemo === tool.id && (
              <div className="demo-container">{tool.demoContent}</div>
            )}
          </div>
        ))}
      </div>

      {/* Information Modal */}
      {showInfo && (
        <div className="modal-overlay" onClick={() => setShowInfo(null)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowInfo(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <div className="modal-header">
              {tools.find((t) => t.id === showInfo).icon}
              <h3>{tools.find((t) => t.id === showInfo).title}</h3>
            </div>
            <p className="info-text">
              {tools.find((t) => t.id === showInfo).info}
            </p>
            <div className="modal-features">
              <h4>Key Features:</h4>
              <ul>
                {tools
                  .find((t) => t.id === showInfo)
                  .steps.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Full Tool Modal */}
      {activeTool && (
        <div className="modal-overlay" onClick={() => setActiveTool(null)}>
          <div className="tool-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setActiveTool(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="modal-header">
              <div className="modal-icon">{activeTool.icon}</div>
              <div>
                <h3>{activeTool.title}</h3>
                <p className="modal-subtitle">{activeTool.description}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="steps-section">
                <h4>How to Use:</h4>
                <ol className="steps-list">
                  {activeTool.steps.map((step, index) => (
                    <li key={index}>
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="use-cases-section">
                  <h4>Perfect For:</h4>
                  <div className="use-cases-grid">
                    {activeTool.useCases.map((useCase, index) => (
                      <div key={index} className="use-case-card">
                        <FaCheck className="use-case-icon" />
                        {useCase}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="demo-section">
                <h4>Live Demo:</h4>
                <div className="full-demo">{activeTool.demoContent}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cta-section">
        <h3>Ready to boost your productivity?</h3>
        <p>Join thousands of professionals using our AI tools daily</p>
        <div className="cta-buttons">
          <button className="cta-btn primary">Start Free Trial</button>
          <button className="cta-btn secondary">See Pricing Plans</button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
