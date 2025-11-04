import React, { useEffect, useRef, useState } from "react";

function Projects() {
  const projects = [
    {
      title: "Project Aurora",
      description:
        "A concept dashboard that explores minimalist UI elements, responsive layouts, and lightweight animation hooks for quick prototypes.",
      technologies: "React, Tailwind CSS, Framer Motion",
      github: "https://github.com/example/project-aurora",
      tag: "project 1",
      image: "https://via.placeholder.com/600x400?text=Project+Aurora",
    },
    {
      title: "Project Nebula",
      description:
        "An experimental AI chatbot shell that mocks conversational flows, context windows, and canned responses for usability testing.",
      technologies: "React, Zustand, OpenAI SDK (mocked)",
      github: "https://github.com/example/project-nebula",
      tag: "project 2",
      image: "https://via.placeholder.com/600x400?text=Project+Nebula",
    },
    {
      title: "Project Horizon",
      description:
        "A dummy analytics page that simulates data fetching, renders placeholder charts, and illustrates theming support.",
      technologies: "React, Recharts (mocked), Styled Components",
      github: "https://github.com/example/project-horizon",
      tag: "project 3",
      image: "https://via.placeholder.com/600x400?text=Project+Horizon",
    },
    {
      title: "Project Zenith",
      description:
        "A sample landing page showcasing modular hero sections, feature grids, and call-to-action components.",
      technologies: "React, Vite, CSS Modules",
      github: "https://github.com/example/project-zenith",
      tag: "project 4",
      image: "https://via.placeholder.com/600x400?text=Project+Zenith",
    },
  ];

  const titleRef = useRef(null);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimateTitle(true);
      },
      { threshold: 0.5 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  return (
    <section id="projects" className="bg-black relative">
      {/* subtle purple grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a002b]/60 via-[#20034d]/70 to-[#0b0014]/90"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-20">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            animateTitle ? "animate-slide-in" : "opacity-0 translate-x-24"
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4 text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my latest work in DevOps, automation, and cloud deployment.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1a002b]/80 to-black rounded-3xl 
                         border border-purple-600/40 hover:border-purple-400 
                         transition-all duration-500 transform hover:-translate-y-3 
                         hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] overflow-hidden"
              style={{
                animation: `fadeIn 0.8s ease-out ${index * 0.2}s backwards`,
              }}
            >
              {project.image && (
                <div className="overflow-hidden rounded-2xl border border-purple-800/40 mt-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mt-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-gray-300 mt-2">{project.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  <span className="font-semibold text-purple-300">
                    Tech Stack:{" "}
                  </span>
                  {project.technologies}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-purple-300 hover:text-fuchsia-400 transition-colors font-semibold"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideInFromRight 0.8s ease-out forwards; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Projects;
