import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from "react-icons/fi";
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
      href: "https://www.linkedin.com/in/geethanjana-karunarathna2000?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      icon: <FaLinkedinIn />,
    },
    {
      label: "GitHub",
      href: "https://github.com/Geeth2000",
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
      className="relative py-24 sm:py-32 bg-[#030108] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-500/10 rounded-full text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Let's <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Let's discuss how we can build it together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-sky-500/50 focus:bg-white/[0.04] outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-sky-500/50 focus:bg-white/[0.04] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-sky-500/50 focus:bg-white/[0.04] outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="text-center mt-4 text-green-400 text-sm">{status}</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 h-full">
              <h3 className="text-lg font-semibold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-5 mb-8">
                {[
                  {
                    icon: <FiMail className="text-lg" />,
                    title: "Email",
                    value: "geethanjankaru123@gmail.com",
                    link: "mailto:geethanjankaru123@gmail.com",
                  },
                  {
                    icon: <FiPhone className="text-lg" />,
                    title: "Phone",
                    value: "+94 71 1489213",
                    link: "tel:+94711489213",
                  },
                  {
                    icon: <FiMapPin className="text-lg" />,
                    title: "Location",
                    value: "Colombo, Sri Lanka",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                        {item.title}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-sm text-gray-300 hover:text-sky-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/20"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-16 flex justify-center">
          <a
            href="#profile"
            aria-label="Back to top"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-gray-400 text-sm transition-all duration-300 hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/20"
          >
            <FiArrowUp className="transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;