import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiArrowLeft } from "react-icons/fi";
import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/geethanjana-karunarathna/",
      icon: <FaLinkedinIn />,
    },
    {
      label: "GitHub",
      href: "https://github.com/iro2002",
      icon: <FaGithub />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FaFacebookF />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: <FaInstagram />,
    },
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const { name, email, message } = formData;
    const subject = `Portfolio message from ${name || "Visitor"}`;
    const emailBody = [
      `Name: ${name || "N/A"}`,
      `Email: ${email || "N/A"}`,
      "",
      message,
    ].join("\n");

    const mailtoLink = `mailto:geethanjankaru123@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setStatus("Opening your email client...");
      setIsSubmitting(false);
    }, 150);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* purple background grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-[#1a002b]/70 via-[#20034d]/80 to-[#0b0014]/90"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text mb-4">
            Let’s Connect
          </h2>
          <div className="h-1 w-24 bg-linear-to-r from-purple-400 to-pink-500 mx-auto mb-6" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let’s discuss how we can build it together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info card */}
          <div className="lg:order-2">
            <div className="bg-linear-to-br from-[#1a002b]/70 to-[#0b0014]/90 p-8 rounded-2xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text">
                Get in Touch
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <FiMail />,
                    title: "Email",
                    value: "geethanjankaru123@gmail.com",
                    link: "mailto:geethanjankaru123@gmail.com",
                  },
                  {
                    icon: <FiPhone />,
                    title: "Phone",
                    value: "+94 71 1489213",
                    link: "tel:+94711489213",
                  },
                  {
                    icon: <FiMapPin />,
                    title: "Location",
                    value: "Colombo, Sri Lanka",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="text-xl text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {item.title}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-200 hover:text-purple-400 transition-colors text-base"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-200 text-base">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Follow
                </p>
                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 text-purple-300 transition-all duration-300 hover:text-fuchsia-400 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.35)] focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <span className="text-lg">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "email"].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    {field === "name" ? "Your Name" : "Your Email"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={
                      field === "name" ? "John Doe" : "john@example.com"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-[#0b0014]/70 border border-purple-700/40 rounded-lg text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-600/40 outline-none transition-all duration-300"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-[#0b0014]/70 border border-purple-700/40 rounded-lg text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-600/40 outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group px-8 py-4 rounded-lg font-bold overflow-hidden text-white 
                           border border-purple-600/40 transition-all duration-300 hover:scale-105 
                           hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <div
                  className="absolute inset-0 bg-linear-to-r from-purple-600 via-fuchsia-500 to-purple-700 
                                transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-90"
                />
              </button>

              {status && (
                <p className="text-center mt-4 text-green-400">{status}</p>
              )}
            </form>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href="#profile"
            aria-label="Back to Profile"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-purple-600/40 text-purple-300 transition-colors duration-300 hover:text-fuchsia-400 hover:border-fuchsia-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <FiArrowLeft className="text-xl" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
