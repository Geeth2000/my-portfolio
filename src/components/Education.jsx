import React, { useEffect, useRef, useState } from "react";
import uocLogo from "../assets/uoc.png";
import vocationalLogo from "../assets/cot.png";
import advancedLogo from "../assets/school.png";

function Education() {
  const sectionRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  const educationData = [
    {
      institution: "University of Colombo",
      degree:
        "Bachelor of Information and Communication Technology (BICT Honours)",
      period: "2021 - Present",
      logo: uocLogo,
    },
    {
      institution: "College of Technology Badulla",
      degree: "Draughtmenship",
      period: "Completed 2022",
      logo: vocationalLogo,
    },
    {
      institution: "Bandarawela Dharmapala College",
      degree: "Advanced Level Studies",
      period: "2019 - 2021",
      logo: advancedLogo,
    },
  ];

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.length) return;
        const entry = entries[0];
        setIsTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (Number.isNaN(index)) return;

          if (entry.isIntersecting) {
            setVisibleIndexes((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          } else {
            setVisibleIndexes((prev) => prev.filter((idx) => idx !== index));
          }
        });
      },
      { threshold: 0.25 }
    );

    const section = sectionRef.current;
    const titleEl = section?.querySelector("#edu-title");
    const cards = section?.querySelectorAll(".edu-card") ?? [];

    if (titleEl) titleObserver.observe(titleEl);
    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#030108] text-white overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-500/10 rounded-full text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
            Learning Path
          </span>
          <h2
            id="edu-title"
            className={`text-4xl sm:text-5xl font-bold text-white mb-4 transition-all duration-700 ease-out ${
              isTitleVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            Academic <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A timeline of my educational milestones and achievements
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Central timeline line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent"></div>

          {educationData.map((edu, index) => {
            const isVisible = visibleIndexes.includes(index);

            return (
              <div
                key={index}
                data-index={index}
                className={`edu-card relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-[#030108] shadow-[0_0_20px_rgba(14,165,233,0.5)] z-10"></div>

                {/* Card - alternating sides on desktop */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:bg-white/[0.04] hover:border-sky-500/20 hover:-translate-y-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-white/5 p-2 flex-shrink-0">
                        <img
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {edu.institution}
                        </h3>
                        <span className="inline-block px-2.5 py-0.5 bg-sky-500/10 rounded-full text-xs font-medium text-sky-400 border border-sky-500/20 mt-1">
                          {edu.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {edu.degree}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;