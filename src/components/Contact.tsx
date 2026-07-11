"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // NOTE: Get your free access key by typing your email at https://web3forms.com
  // Replace this placeholder with your Web3Forms Access Key
  const WEB3FORMS_ACCESS_KEY: string = "ae90d24e-5ee6-4662-a5b2-693715bf0c5e";

  const handleRequestPhoneNumber = () => {
    setFormData((prev) => ({
      ...prev,
      subject: "Request for Contact Number",
      message: "Hi Anuraj, I would like to request your contact number to schedule a discussion regarding SDE opportunities. Looking forward to connecting!",
    }));
    
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("recruiter-action", { detail: "contact" }));
    }

    // Focus and scroll to the name input element
    const nameInput = document.getElementsByName("name")[0] as HTMLInputElement;
    if (nameInput) {
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Me",
      value: "anurajkhandagale52a@gmail.com",
      href: "mailto:anurajkhandagale52a@gmail.com",
      color: "text-[#d4a574] bg-[#d4a574]/10",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: "Request via Form",
      isAction: true,
      onClick: handleRequestPhoneNumber,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "anuraj-khandagale-10020732",
      href: "https://linkedin.com/in/anuraj-khandagale-10020732",
      color: "text-amber-300/80 bg-amber-300/80/10",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "anurajkhandagale",
      href: "https://github.com/anurajkhandagale",
      color: "text-stone-400 bg-stone-400/10",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      tempErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `Portfolio Submission from ${formData.name}`,
        message: formData.message,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok || result.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("recruiter-action", { detail: "contact" }));
        }
        // Reset form fields
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to submit message.");
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err.message || "Something went wrong. Please verify your Web3Forms access key."
      );
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      {/* Centered scroll-revealed viewport */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6"
      >
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4a574] font-mono font-bold">
            // 08. CONTACT
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-3">
            Let&apos;s Build Something Great.
          </h2>
          <div className="h-[1px] w-full bg-white/5 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">
              Contact Information
            </h3>
            
            {contactInfo.map((info, idx) => {
              const IconComponent = info.icon;
              const isAction = info.isAction;

              const CardContent = (
                <>
                  <div className={`p-3 rounded-lg ${info.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="text-[10px] text-[#a0a0a0] font-mono font-bold block uppercase">
                      {info.label}
                    </span>
                    <span className="text-sm font-semibold text-white block truncate">
                      {info.value}
                    </span>
                  </div>
                </>
              );

              if (isAction) {
                return (
                  <button
                    key={idx}
                    onClick={info.onClick}
                    className="w-full flex items-center gap-4 p-4 rounded-xl glass-card glass-card-hover group cursor-pointer border-none outline-none focus:outline-none bg-transparent"
                  >
                    {CardContent}
                  </button>
                );
              }

              return (
                <a
                  key={idx}
                  href={info.href}
                  target={info.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass-card glass-card-hover group cursor-pointer"
                >
                  {CardContent}
                </a>
              );
            })}
          </div>

          {/* Form panel */}
          <div className="lg:col-span-7">
            <div className="rounded-xl glass-card p-8">
              {isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-2 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-[#a0a0a0] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. I have received your message and it has been forwarded directly to my email.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2.5 rounded-lg bg-[#d4a574] hover:bg-[#a0a0a0] text-xs font-semibold text-white transition-all active:scale-95 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Web3Forms Setup Helper Info Banner */}
                  {WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" && (
                    <div className="p-3.5 rounded-lg border border-yellow-500/10 bg-yellow-500/5 text-xs text-yellow-500 flex items-start gap-2.5 leading-normal">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Form Submission Setup:</span> To receive email notifications, register your email at <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#d4a574]">web3forms.com</a> (instantly free key) and paste it into <code className="font-mono text-[10px] bg-white/5 px-1 py-0.5 rounded text-white">Contact.tsx:L32</code>.
                      </div>
                    </div>
                  )}

                  {/* Submission Error Warning banner */}
                  {submitError && (
                    <div className="p-3.5 rounded-lg border border-rose-500/10 bg-rose-500/5 text-xs text-rose-500 flex items-start gap-2.5 leading-normal">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <div>{submitError}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#a0a0a0]">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-[#050505] text-white text-sm outline-none focus:ring-1 focus:ring-[#d4a574] transition-colors ${
                          errors.name ? "border-rose-500" : "border-white/10"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#a0a0a0]">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-[#050505] text-white text-sm outline-none focus:ring-1 focus:ring-[#d4a574] transition-colors ${
                          errors.email ? "border-rose-500" : "border-white/10"
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#a0a0a0]">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#050505] text-white text-sm outline-none focus:ring-1 focus:ring-[#d4a574] transition-colors"
                      placeholder="Opportunities, Collaboration, etc."
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#a0a0a0]">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-[#050505] text-white text-sm outline-none focus:ring-1 focus:ring-[#d4a574] transition-colors resize-none ${
                        errors.message ? "border-rose-500" : "border-white/10"
                      }`}
                      placeholder="Write your message here..."
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg bg-[#d4a574] hover:bg-[#a0a0a0] text-white font-semibold transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
