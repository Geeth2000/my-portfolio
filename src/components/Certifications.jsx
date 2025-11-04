import React, { useEffect, useRef, useState } from "react";

function Certifications() {
  const certs = [
    {
      name: "Certified Front-End Explorer",
      code: "CFE-101",
      provider: "UI Labs",
      credentialId: "CFE-2025-001",
      badge: "https://via.placeholder.com/120x120.png?text=CFE",
    },
    {
      name: "Responsive Web Foundations",
      code: "RWF-210",
      provider: "Design Academy",
      credentialId: "RWF-2025-045",
      badge: "https://via.placeholder.com/120x120.png?text=RWF",
    },
    {
      name: "JavaScript Essentials Badge",
      code: "JSB-150",
      provider: "Code Institute",
      credentialId: "JSB-2025-312",
      badge: "https://via.placeholder.com/120x120.png?text=JS",
    },
    {
      name: "Cloud Fundamentals Sampler",
      code: "CFS-090",
      provider: "CloudHub",
      credentialId: "CFS-2025-221",
      badge: "https://via.placeholder.com/120x120.png?text=Cloud",
    },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#1a002b]/70 via-[#20034d]/80 to-[#0b0014]/90 opacity-70"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-20"
            }`}
          >
            Certifications
          </h2>
          <div
            className={`h-1 w-24 bg-linear-to-r from-purple-400 to-pink-500 mx-auto transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* CERTIFICATE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {certs.map((cert, i) => (
            <div
              key={i}
              className={`group relative h-64 w-full max-w-sm transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative w-full h-full bg-linear-to-br from-[#1a002b]/70 to-black rounded-xl border border-purple-600/40 hover:border-purple-400 transition-all duration-300 overflow-hidden">
                {/* Front */}
                <div className="flex flex-col items-center justify-center h-full p-5 space-y-3 transition-opacity duration-300 group-hover:opacity-0">
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
                  <h3 className="text-lg font-bold text-white text-center">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{cert.provider}</p>
                </div>

                {/* Back Hover Layer */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-900 to-black p-5 flex flex-col items-center justify-center space-y-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img
                      src={cert.badge}
                      alt={cert.name}
                      className="w-full h-full object-contain filter brightness-90"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white text-center">
                    {cert.name}
                  </h3>
                  <p className="text-purple-300 text-sm text-center">
                    Credential ID: {cert.credentialId}
                  </p>
                  <div className="inline-flex items-center text-purple-200 group-hover:translate-x-1 transition-transform duration-300 cursor-pointer text-sm">
                    <span className="font-semibold">View Certificate</span>
                    <span className="ml-1">→</span>
                  </div>
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
