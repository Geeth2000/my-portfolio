import React, { useEffect, useRef, useState } from "react";
import mernBadge from "../assets/ifs.png";
import postmanBadge from "../assets/postmon.png";
import pythonBadge from "../assets/image.png";
import aviatrixBadge from "../assets/ace.png";

function Certifications() {
  const certs = [
    {
      name: "Full-Stack Web Development (MERN)",
      code: "FSWD-301",
      provider: "SKYREK Academy",
      credentialId: "SKYREK-2025-089",
      //badge: mernBadge,
      certificateUrl:
        "https://www.skyrekacademy.com/certificates/FSWD-301-2025-089",
    },
    {
      name: "Postman API Fundamentals Student Expert",
      code: "PAF-200",
      provider: "Postman",
      credentialId: "POSTMAN-2025-014",
      badge: postmanBadge,
      certificateUrl: "src/assets/postman2.png",
    },
    {
      name: "Python for Beginners",
      code: "PYB-110",
      provider: "University of Moratuwa",
      credentialId: "UOM-2025-233",
      badge: pythonBadge,
      certificateUrl: "src/assets/image.png",
    },
    {
      name: "Multicloud Network Associate",
      code: "MNA-260",
      provider: "Aviatrix Cloud Networking Platform",
      credentialId: "AVIATRIX-2025-041",
      badge: aviatrixBadge,
      certificateUrl: "src/assets/ace.png",
    },
  ];

  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  // Intersection Observer for animation
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.length) return;
        const entry = entries[0];
        setTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "72px 0px -55% 0px" }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (Number.isNaN(index)) return;

          if (entry.isIntersecting) {
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          } else {
            setVisibleCards((prev) => prev.filter((idx) => idx !== index));
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = sectionRef.current;
    const titleEl = section?.querySelector("#certifications-title");
    const cards = section?.querySelectorAll(".cert-card") ?? [];

    if (titleEl) titleObserver.observe(titleEl);
    cards.forEach((card) => cardsObserver.observe(card));

    return () => {
      titleObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#1a002b]/70 via-[#20034d]/80 to-[#0b0014]/90 opacity-70"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2
            id="certifications-title"
            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-20"
            }`}
          >
            Certifications
          </h2>
          <div
            className={`h-1 w-24 bg-linear-to-r from-purple-400 to-pink-500 mx-auto transition-opacity duration-700 ${
              titleVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* CERTIFICATE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 place-items-center">
          {certs.map((cert, i) => (
            <div
              key={i}
              data-index={i}
              className={`cert-card group relative h-64 w-full max-w-xs sm:max-w-sm transition-all duration-700 ${
                visibleCards.includes(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative w-full h-full bg-linear-to-br from-[#1a002b]/70 to-black rounded-xl border border-purple-600/40 hover:border-purple-400 transition-all duration-300 overflow-hidden">
                {/* Front */}
                <div className="flex flex-col items-center justify-center h-full px-6 py-5 space-y-3 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img
                      src={cert.badge}
                      alt={cert.name}
                      className="w-full h-full object-contain filter brightness-95 group-hover:brightness-125 transition-all duration-300"
                    />
                  </div>
                  <div className="inline-block px-3 py-1 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/30">
                    <span className="text-xs font-bold text-purple-300">
                      {cert.code}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white text-center">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {cert.provider}
                  </p>
                </div>

                {/* Back Hover Layer */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-900 to-black px-6 py-5 flex flex-col items-center justify-center space-y-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img
                      src={cert.badge}
                      alt={cert.name}
                      className="w-full h-full object-contain filter brightness-90"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white text-center">
                    {cert.name}
                  </h3>
                  <p className="text-purple-300 text-xs sm:text-sm text-center">
                    Credential ID: {cert.credentialId}
                  </p>
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-200 group-hover:translate-x-1 transition-transform duration-300 cursor-pointer text-xs sm:text-sm"
                  >
                    View Certificate→
                  </a>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent group-hover:via-pink-500 transition-colors duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
