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
        "Bachelor of Information and Communication Technology (BICT Honours)",
      period: "2021 – Present",
      logo: uocLogo,
    },
    {
      institution: "COLLEGE OF TECHNOLOGY BADULLA",
      degree: "Draughtmenship",
      period: "Completed",
      logo: vocationalLogo,
    },
    {
      institution: "Bandarawela Dharmapala College",
      period: "2019 – 2021",
      logo: advancedLogo,
    },
  ];

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsTitleVisible(true);
      },
      { threshold: 0.2 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleIndexes((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    const cards = document.querySelectorAll(".edu-card");

    if (section) titleObserver.observe(section.querySelector("#edu-title"));
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
      className="relative py-16 sm:py-20 md:py-24 min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Background grid & gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-[#1a002b]/70 via-[#20034d]/80 to-[#0b0014]/90"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            id="edu-title"
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text transition-all duration-1000 ease-out ${
              isTitleVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-32"
            }`}
          >
            Academic Journey
          </h2>
          <p
            className={`mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-opacity duration-1000 ${
              isTitleVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            A timeline of my educational milestones
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-600/40 h-full rounded-full hidden md:block"></div>

          {educationData.map((edu, index) => {
            const isVisible = visibleIndexes.includes(index);
            const direction = index % 2 === 0 ? "left" : "right";

            return (
              <div
                key={index}
                data-index={index}
                className={`edu-card relative mb-12 last:mb-0 flex flex-col md:flex-row items-center ${
                  direction === "left" ? "md:flex-row" : "md:flex-row-reverse"
                } transition-all duration-1000 ease-out ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : direction === "left"
                    ? "opacity-0 -translate-x-32"
                    : "opacity-0 translate-x-32"
                }`}
              >
                {/* dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-purple-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(168,85,247,0.8)] hidden md:block"></div>

                {/* card */}
                <div
                  className={`w-full md:w-5/12 max-w-xl p-6 sm:p-8 rounded-2xl bg-linear-to-b from-[#1a002b]/80 to-black border border-purple-600/30 shadow-lg transition-transform duration-500 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-2 ${
                    direction === "left" ? "md:mr-12" : "md:ml-12"
                  }`}
                  style={{ perspective: "1000px" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                      />
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {edu.institution}
                        </h3>
                        <p className="text-purple-300 text-sm sm:text-base">
                          {edu.period}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {edu.degree}
                  </p>
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
