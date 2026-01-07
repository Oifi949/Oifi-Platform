import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    return () => {
      if (popupTimeout) clearTimeout(popupTimeout);
    };
  }, [popupTimeout]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setShowPopup(true);
        const timeout = setTimeout(() => setShowPopup(false), 4000);
        setPopupTimeout(timeout);
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
        setShowPopup(true);
        const timeout = setTimeout(() => setShowPopup(false), 4000);
        setPopupTimeout(timeout);
      }
    } catch {
      setSubmitMessage("An error occurred. Please try again.");
      setShowPopup(true);
      const timeout = setTimeout(() => setShowPopup(false), 4000);
      setPopupTimeout(timeout);
    }

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className="text-3xl font-bold text-gray-900 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              OifiJo2
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>
            <button
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
        <div className="px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div className="mb-8" variants={itemVariants}>
              <motion.img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
                Oifi
              </span>
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl text-gray-600 mb-8 font-light"
              variants={itemVariants}
            >
              Full Stack Developer & UI/UX Designer
            </motion.p>
            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-12 mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Crafting exceptional digital experiences with modern technologies.
              Passionate about clean code, innovative design, and solving
              complex problems through elegant solutions.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-500 hover:text-blue-600 transition-colors"
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={slideInLeftVariants}>
              <motion.h3
                className="text-3xl font-semibold text-gray-900 mb-6"
                variants={itemVariants}
              >
                Who I Am
              </motion.h3>
              <motion.p
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                variants={itemVariants}
              >
                I'm a passionate full-stack developer with over 5 years of
                experience creating digital solutions that make a difference. My
                journey in tech started with a curiosity about how things work,
                and it has evolved into a career dedicated to building
                meaningful applications.
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community. I believe in continuous learning and
                staying up-to-date with the latest trends in web development.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-blue-50 px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-blue-600 font-semibold">5+ Years</span>
                  <p className="text-sm text-gray-600">Experience</p>
                </motion.div>
                <motion.div
                  className="bg-green-50 px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-green-600 font-semibold">50+</span>
                  <p className="text-sm text-gray-600">Projects</p>
                </motion.div>
                <motion.div
                  className="bg-purple-50 px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-purple-600 font-semibold">20+</span>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className="space-y-6" variants={slideInRightVariants}>
              <motion.div
                className="bg-gray-50 p-6 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <p className="text-gray-600">Bachelor's in Computer Science</p>
                <p className="text-sm text-gray-500">
                  University of Technology, 2019
                </p>
              </motion.div>
              <motion.div
                className="bg-gray-50 p-6 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  Current Role
                </h4>
                <p className="text-gray-600">Senior Full Stack Developer</p>
                <p className="text-sm text-gray-500">OWOjo2 Innovations Inc.</p>
              </motion.div>
              <motion.div
                className="bg-gray-50 p-6 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">San Francisco, NIG</p>
                <p className="text-sm text-gray-500">
                  Open to remote opportunities
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Frontend
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "Vue.js",
                  "Angular",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 font-medium">{skill}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full skill-bar"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Backend
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "MongoDB",
                  "Redis",
                  "GraphQL",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 font-medium">{skill}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full skill-bar"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Tools & Others
                </h3>
              </div>
              <div className="space-y-4">
                {["Docker", "AWS", "Git", "Figma", "Jest", "Webpack"].map(
                  (skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 font-medium">{skill}</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full skill-bar"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Code Snippet Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Code in Action
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mx-auto">
              A glimpse of my coding style and approach
            </p>
          </div>
          <div className="mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-700 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">
                  portfolio.tsx
                </span>
                <div className="w-16"></div>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="space-y-2">
                  <div>
                    <span className="text-blue-400">import</span>{" "}
                    <span className="text-white">
                      React, &#123; useState, useEffect &#125;
                    </span>{" "}
                    <span className="text-blue-400">from</span>{" "}
                    <span className="text-green-400">'react'</span>;
                  </div>
                  <div>
                    <span className="text-blue-400">import</span>{" "}
                    <span className="text-white">axios</span>{" "}
                    <span className="text-blue-400">from</span>{" "}
                    <span className="text-green-400">'axios'</span>;
                  </div>
                  <div></div>
                  <div>
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-yellow-400">Portfolio</span> = () =
                    &#123;
                  </div>
                  <div className="ml-4">
                    <span className="text-blue-400">const</span> [projects,
                    setProjects] ={" "}
                    <span className="text-yellow-400">useState</span>([]);
                  </div>
                  <div className="ml-4">
                    <span className="text-blue-400">const</span> [loading,
                    setLoading] ={" "}
                    <span className="text-yellow-400">useState</span>(
                    <span className="text-blue-400">true</span>);
                  </div>
                  <div></div>
                  <div className="ml-4">
                    <span className="text-blue-400">useEffect</span>(() = &#123;
                  </div>
                  <div className="ml-8">
                    <span className="text-blue-400">const</span> fetchProjects ={" "}
                    <span className="text-blue-400">async</span> () = &#123;
                  </div>
                  <div className="ml-12">
                    <span className="text-blue-400">try</span> &#123;
                  </div>
                  <div className="ml-16">
                    <span className="text-blue-400">const</span> response ={" "}
                    <span className="text-blue-400">await</span> axios.
                    <span className="text-yellow-400">get</span>('
                    <span className="text-green-400">/api/projects</span>');
                  </div>
                  <div className="ml-16">
                    setProjects(response.
                    <span className="text-white">data</span>);
                  </div>
                  <div className="ml-12">
                    &#125; <span className="text-blue-400">catch</span> (error)
                    &#123;
                  </div>
                  <div className="ml-16">
                    <span className="text-red-400">console</span>.
                    <span className="text-yellow-400">error</span>('Failed to
                    fetch projects:', error);
                  </div>
                  <div className="ml-12">
                    &#125; <span className="text-blue-400">finally</span> &#123;
                  </div>
                  <div className="ml-16">
                    setLoading(<span className="text-blue-400">false</span>);
                  </div>
                  <div className="ml-12">&#125;</div>
                  <div className="ml-8">&#125;;</div>
                  <div className="ml-8">fetchProjects();</div>
                  <div className="ml-4">&#125;, []);</div>
                  <div></div>
                  <div className="ml-4">
                    <span className="text-blue-400">return</span> (
                  </div>
                  <div className="ml-8">
                    &lt;<span className="text-orange-400">div</span>{" "}
                    <span className="text-blue-300">className</span>=
                    <span className="text-green-400">"portfolio"</span>&gt;
                  </div>
                  <div className="ml-12">&#123;loading ? (</div>
                  <div className="ml-16">
                    &lt;<span className="text-orange-400">LoadingSpinner</span>{" "}
                    /&gt;
                  </div>
                  <div className="ml-12">) : (</div>
                  <div className="ml-16">
                    &lt;<span className="text-orange-400">ProjectGrid</span>{" "}
                    <span className="text-blue-300">projects</span>
                    =&#123;projects&#125; /&gt;
                  </div>
                  <div className="ml-12">)&#125;</div>
                  <div className="ml-8">
                    &lt;/<span className="text-orange-400">div</span>&gt;
                  </div>
                  <div className="ml-4">);</div>
                  <div>&#125;;</div>
                  <div></div>
                  <div>
                    <span className="text-blue-400">export default</span>{" "}
                    Portfolio;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
                image:
                  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                github: "#",
                live: "#",
              },
              {
                title: "Task Management App",
                description:
                  "A collaborative task management application with real-time updates and team collaboration features.",
                image:
                  "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
                technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
                github: "#",
                live: "#",
              },
              {
                title: "Weather Dashboard",
                description:
                  "A responsive weather application with location-based forecasts and interactive maps.",
                image:
                  "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
                technologies: ["React", "TypeScript", "OpenWeather API"],
                github: "#",
                live: "#",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="project-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                      <a
                        href={project.github}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href={project.live}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-linear-to-r from-blue-100 to-purple-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-8">
                Let's Work Together
              </h3>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a project in mind or just want to
                chat about technology, feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    owolabifeolami@gmail.com
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-700">+234 907 198 1627</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-700">San Francisco, Nig</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none btn-primary"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            onClick={() => {
              setShowPopup(false);
              if (popupTimeout) clearTimeout(popupTimeout);
            }}
          >
            <motion.div
              className={`bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4 border-l-4 ${
                submitMessage.includes("successfully")
                  ? "border-green-500"
                  : "border-red-500"
              } cursor-pointer`}
            >
              <div className="flex items-center">
                {submitMessage.includes("successfully") ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      submitMessage.includes("successfully")
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {submitMessage.includes("successfully")
                      ? "Success!"
                      : "Error"}
                  </p>
                  <p className="text-gray-600 text-sm">{submitMessage}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPopup(false);
                    if (popupTimeout) clearTimeout(popupTimeout);
                  }}
                  className="ml-4 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-3xl font-bold">Oifi</h3>
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 Oifi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
