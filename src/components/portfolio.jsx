import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Code2, 
  Database, 
  BarChart3, 
  BrainCircuit, 
  Terminal, 
  Award, 
  BookOpen, 
  Send,
  ExternalLink,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Components ---

const NetworkBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(20, 184, 166, 0.5)' : 'rgba(15, 23, 42, 0.5)'; // Teal in dark, Slate in light
        ctx.fill();
      });

      // Draw Connections
      connectParticles(particles);
      connectToMouse(particles);
    };

    const connectParticles = (particles) => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = darkMode 
              ? `rgba(20, 184, 166, ${1 - distance / maxDistance})` 
              : `rgba(100, 116, 139, ${1 - distance / maxDistance})`; // Teal fade vs Slate fade
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const connectToMouse = (particles) => {
      if (mouse.x === null || mouse.y === null) return;
      const maxDistance = 200;

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = darkMode 
            ? `rgba(45, 212, 191, ${1 - distance / maxDistance})` 
            : `rgba(37, 99, 235, ${1 - distance / maxDistance})`; // Brighter Teal vs Blue
          ctx.lineWidth = 1.5; // Slightly thicker connection to mouse
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
};

const ContactForm = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-slate-900 dark:text-white relative z-20 w-full">
      {/* IMPORTANT: 
        Replace 'YOUR_FORMSPREE_ID' with your actual Form ID from https://formspree.io/ 
        Example: https://formspree.io/f/xbjnqwzj
      */}
      <form 
        action="https://formspree.io/f/manrbenl" 
        method="POST" 
        target="_blank"
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
            placeholder="John Doe" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
            placeholder="john@example.com" 
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
          <textarea 
            name="message"
            id="message" 
            rows="4" 
            required 
            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none" 
            placeholder="Hello, I'd like to discuss..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          Send Message <Send size={18} />
        </button>
      </form>
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-16 text-center relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
      {title}
    </h2>
    <div className="h-1.5 w-20 bg-teal-500 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const SkillCard = ({ title, items, icon: Icon }) => (
  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-teal-500/50 transition-all duration-300 group relative z-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
        <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
      </div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((skill, idx) => (
        <span key={idx} className="px-3 py-1 text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-100 dark:border-slate-700">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ title, desc, bullets, repoLink, demoLink }) => (
  <div className="flex flex-col h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative z-10">
    <div className="p-6 md:p-8 flex flex-col flex-grow relative">
      <div className="flex justify-between items-start mb-4 relative z-20">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
          {title}
        </h3>
        <a 
          href={repoLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-400 hover:text-teal-500 transition-colors p-1" 
          title="View Code"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed relative z-20">
        {desc}
      </p>
      <ul className="space-y-2 mt-auto relative z-20">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
    
    {/* Buttons Area */}
    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 relative z-20">
      <a 
        href={repoLink} 
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex justify-center items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 cursor-pointer"
      >
        <Github className="w-4 h-4" /> Code
      </a>
      {demoLink && (
        <>
          <a 
            href={demoLink} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex justify-center items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors py-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40 border border-teal-200 dark:border-teal-800 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        </>
      )}
    </div>
  </div>
);

const TimelineItem = ({ title, org, date, desc, link, isLast }) => (
  <div className="relative pl-8 md:pl-10 pb-10">
    {!isLast && <div className="absolute left-[11px] top-2 h-full w-[2px] bg-slate-200 dark:bg-slate-800"></div>}
    <div className="absolute left-0 top-2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 bg-teal-500 z-10 shadow-sm transition-transform hover:scale-110"></div>
    
    <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
          {link ? (
             <a 
                href={link}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              >
                {title}
                <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-500" />
              </a>
          ) : (
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
          )}
          
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md mt-1 sm:mt-0 w-fit whitespace-nowrap">
            {date}
          </span>
        </div>
        <div className="text-teal-600 dark:text-teal-400 font-medium mb-2">{org}</div>
        {desc && <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{desc}</p>}
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-teal-600 dark:hover:bg-teal-600 px-4 py-2 rounded-full transition-colors mt-2 shadow-sm cursor-pointer"
          >
            View Certificate <ExternalLink className="w-3 h-3" />
          </a>
        )}
    </div>
  </div>
);

// --- HomeView Component (Refactored outside) ---
const HomeView = ({ onNavClick }) => (
    <>
        {/* Hero Section */}
        <section id="about" className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden z-10">
          <div className="container mx-auto px-4 md:px-6 relative z-10 lg:pl-0 lg:pr-24">
            <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:ml-12">

              {/* LEFT COLUMN — TEXT */}
              <div className="text-left flex flex-col items-start">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  Available for opportunities
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                  Hi, I'm <br /> Yash Vasudeva
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 font-light">
                  Turning complex data into actionable insights.
                </p>

                <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                  <p>
                    I work at the intersection of data, machine learning, and decision-making—turning complex information into accurate, high-impact insights. I focus on correctness, automation, and real-world impact across analytics and ML systems.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                  <a
                    href="#contact"
                    onClick={(e) => onNavClick(e, { href: '#contact' })}
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-95 shadow-lg shadow-teal-500/10 cursor-pointer"
                  >
                    Contact Me <Send size={18} />
                  </a>
                </div>

              </div>

              {/* RIGHT COLUMN — IMAGE */}
              <div className="relative mb-10 translate-x-16 md:translate-x-24 lg:translate-x-50">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-70"></div>

                  <img
                    src="yash.jpeg"
                    alt="Yash Vasudeva"
                    className="relative w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[610px] object-contain rounded-3xl border-4 border-white dark:border-slate-900 shadow-2xl bg-slate-100 dark:bg-slate-800"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Skills Section */}
        <section id="skills" className="py-20 bg-transparent border-y border-slate-100 dark:border-slate-800/50 relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            <SectionTitle title="Technical Skills" subtitle="My toolkit for data science, analysis, and automation." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard 
                title="Languages" 
                icon={Code2}
                items={["C", "C++", "Python"]} 
              />
              <SkillCard 
                title="Data Analysis" 
                icon={BarChart3}
                items={["PowerBI", "Excel", "Tableau"]} 
              />
              <SkillCard 
                title="Frameworks" 
                icon={BrainCircuit}
                items={["NumPy", "Pandas", "Matplotlib", "Plotly", "SciPy", "Scikit-Learn", "TensorFlow", "PyTorch"]} 
              />
              <SkillCard 
                title="Development" 
                icon={Terminal}
                items={["MySQL", "PostgreSQL", "Streamlit", "Joblib", "Docker", "Git", "GitHub"]} 
              />
              <SkillCard 
                title="Automation" 
                icon={Database}
                items={["EDA Automation", "Agentic AI"]} 
              />
            </div>
          </div>
        </section>

        {/* Soft Skills Banner */}
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden border-b border-slate-100 dark:border-slate-800 relative z-10 backdrop-blur-sm">
           <div className="container mx-auto px-4 md:px-6">
              <SectionTitle title="Soft Skills" />
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {["Presentation", "Planning", "Problem Solving", "Critical Thinking", "Teamwork", "Adaptability"].map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    {index > 0 && <span className="hidden md:inline w-1 h-1 rounded-full bg-teal-500"></span>}
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            <SectionTitle title="Featured Projects" subtitle="Showcasing analytical depth and engineering capabilities." />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard 
                title="Dataset Cleaner & Analyzer"
                desc="Automated end-to-end ML workflow in Streamlit with integrated Gemini 2.5 Flash Lite assistant."
                bullets={[
                  "Supports upload → cleaning → EDA → ML training",
                  "Modular pipeline with feature-aware predictions",
                  "Generated automated summaries & reports"
                ]}
                repoLink="https://github.com/yashvasudeva1/Dataset-Cleaner-and-Analyzer"
                demoLink="https://dataset-cleaner-and-analyzer-mfkutrba9g8edaexgwyadd.streamlit.app/"
              />
              <ProjectCard 
                title="California Housing Predictor"
                desc="Linear regression model with extensive feature engineering and performance evaluation."
                bullets={[
                  "Feature engineering, scaling & cross-validation",
                  "Analyzed feature importance & key drivers",
                  "Used MAE & RMSE for precise evaluation"
                ]}
                repoLink="https://github.com/yashvasudeva1/california_housing_predictor"
                demoLink="https://californiahousingpredictor.streamlit.app/"
              />
              <ProjectCard 
                title="Sales–Profit Dashboard"
                desc="Comprehensive Power BI dashboard analyzing over 10,000 sales records for strategic insights."
                bullets={[
                  "Cleaned & processed 10k+ records",
                  "Built interactive KPI dashboard",
                  "Designed complex DAX measures"
                ]}
                repoLink="https://github.com/yashvasudeva1/Sales-Profit-Dashboard-PowerBI"
                demoLink="https://github.com/yashvasudeva1/Sales-Profit-Dashboard-PowerBI/blob/main/Microsoft%20Financial%20Sample/Sales%20and%20Profitability%20(Microsoft%20Sample%20Data).pbix"
              />
            </div>
          </div>
        </section>

        {/* Certifications & Education (Split Layout) */}
        <section className="py-24 bg-slate-50/50 dark:bg-slate-900/30 relative z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Certifications */}
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                  <Award className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Certifications</h2>
                </div>
                <div className="space-y-0">
                  <TimelineItem 
                    title="Fundamentals of AI"
                    org="NPTEL (IIT Guwahati)"
                    date="Oct 2025"
                    isLast={false}
                    link="https://drive.google.com/file/d/1S8C_GigKnH59O8rEuoR7mK_vM3yhgPkD/view"
                  />
                  <TimelineItem 
                    title="Young Professional"
                    org="TCS iON"
                    date="Sep 2025"
                    isLast={false}
                    link="https://drive.google.com/file/d/1f4LVz68TY_5rgMhNf1hB-wZCcf7wTStc/view"
                  />
                  <TimelineItem 
                    title="Artificial Intelligence"
                    org="Reliance Foundation"
                    date="July 2025"
                    isLast={false}
                    link="https://drive.google.com/file/d/1sIOa7QL-ck6f4OYINLk2bk3rtY54jnr9/view"
                  />
                  <TimelineItem 
                    title="Data Analytics Job Simulation"
                    org="Deloitte"
                    date="July 2025"
                    isLast={false}
                    link="https://drive.google.com/file/d/1vMlTG-BK6cyZ9YQHE2z6-8t5cnRczXUc/view"
                  />
                  <TimelineItem 
                    title="Prompt Engineering Basics"
                    org="Udemy"
                    date="Dec 2024"
                    isLast={true}
                    link="https://drive.google.com/file/d/15lNSTeTBPvZCP7PhduOgoGBmC09Pcmdo/view"
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                  <BookOpen className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
                </div>
                <div className="grid gap-6">
                  <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">B.Tech (Information Technology)</h3>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">2024 - Present</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">BPIT, GGSIPU</p>
                    <p className="text-sm font-medium text-slate-500">CGPA: 9.1/10</p>
                  </div>

                  <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm opacity-90 relative z-10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Class XII (CBSE)</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">2023 - 2024</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">S.D. Public School</p>
                    <p className="text-sm font-medium text-slate-500">Percentage: 88%</p>
                  </div>

                  <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm opacity-80 relative z-10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Class X (CBSE)</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">2021 - 2022</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">S.D. Public School</p>
                    <p className="text-sm font-medium text-slate-500">Percentage: 91%</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="py-24 relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            <SectionTitle title="Leadership & Experience" subtitle="Roles where I've demonstrated management and organizational skills." />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: "Junior Council",
                  org: "Namespace",
                  date: "Sep 2025 – Present",
                  desc: "Part of 2000+ member university tech community, fostering peer learning and events."
                },
                {
                  role: "Joint Director of Elysium",
                  org: "Rotaract District 3012",
                  date: "July 2025 – Present",
                  desc: "Coordinated mental health campaigns, supported clubs, and organized large-scale district events."
                },
                {
                  role: "Blood Donation Director",
                  org: "Rotaract Club of BPIT",
                  date: "May 2025 – Present",
                  desc: "Led blood donation drives, coordinated with hospitals/NGOs, and managed volunteer logistics."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50/90 dark:bg-slate-800/50 p-6 rounded-xl border-l-4 border-teal-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors backdrop-blur-sm">
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-mono">{item.date}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.role}</h3>
                  <div className="text-teal-600 dark:text-teal-400 font-medium mb-3">{item.org}</div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-900 text-white relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* Contact Info */}
              <div>
                <h2 className="text-4xl font-bold mb-6">Let's Connect.</h2>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                  I'm currently looking for new opportunities in Data Analysis and ML. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                
                <div className="space-y-6">
                  <a href="mailto:vasudevyash@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-teal-400 transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Email</div>
                      <div className="font-medium">vasudevyash@gmail.com</div>
                    </div>
                  </a>
                  
                  <a href="tel:+919318378900" className="flex items-center gap-4 text-slate-300 hover:text-teal-400 transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Phone</div>
                      <div className="font-medium">+91 9318378900</div>
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/yash-vasudeva/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-teal-400 transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">LinkedIn</div>
                      <div className="font-medium">Yash Vasudeva</div>
                    </div>
                  </a>

                  <a href="https://github.com/yashvasudeva1" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-teal-400 transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">GitHub</div>
                      <div className="font-medium">yashvasudeva1</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>
    </>
);

// --- Main App Component ---

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Handle Scroll for Navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(link.href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} selection:bg-teal-500/30`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 relative">
        
        {/* Animated Background */}
        <NetworkBackground darkMode={darkMode} />

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <a 
                href="#" 
                onClick={(e) => handleNavClick(e, {href: '#about'})}
                className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer"
            >
              <span>Yash <span className="">Vasudeva</span></span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-900 dark:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 md:hidden shadow-xl animate-in slide-in-from-top-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Content */}
        <HomeView onNavClick={handleNavClick} />

        {/* Footer */}
        <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500 text-sm relative z-10">
          <p>© {new Date().getFullYear()} Yash Vasudeva. Built with React & Tailwind.</p>
        </footer>

      </div>
    </div>
  );
}