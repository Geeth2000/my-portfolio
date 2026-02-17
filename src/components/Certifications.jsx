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
      { threshold: 0.1, rootMargin: "72px 0px -55% 0px" },
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (Number.isNaN(index)) return;

          if (entry.isIntersecting) {
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index],
            );
          } else {
            setVisibleCards((prev) => prev.filter((idx) => idx !== index));
          }
        });
      },
      { threshold: 0.3 },
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
      className="relative py-24 sm:py-32 bg-[#030108] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-500/10 rounded-full text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
            Professional Growth
          </span>
          <h2
            id="certifications-title"
            className={`text-4xl sm:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Credentials that validate my expertise and continuous learning
          </p>
        </div>

        {/* CERTIFICATE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((cert, i) => (
            <div
              key={i}
              data-index={i}
              className={`cert-card group relative transition-all duration-500 ${
                visibleCards.includes(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-full p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:bg-white/[0.04] hover:border-sky-500/20 hover:-translate-y-1 overflow-hidden">
                {/* Badge */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white/5 p-2 flex items-center justify-center">
                    <img
                      src={cert.badge}
                      alt={cert.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Code badge */}
                <div className="flex justify-center mb-3">
                  <span className="px-3 py-1 bg-sky-500/10 rounded-full text-xs font-medium text-sky-400 border border-sky-500/20">
                    {cert.code}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white text-center mb-2 line-clamp-2">
                  {cert.name}
                </h3>

                {/* Provider */}
                <p className="text-gray-500 text-sm text-center mb-4">
                  {cert.provider}
                </p>

                {/* View link */}
                <div className="text-center">
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    View Certificate
                    <svg
                      className="w-4 h-4"
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
