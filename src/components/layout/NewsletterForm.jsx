"use client";

import { useState } from "react";
import { FaAt, FaArrowRight, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { subscribeNewsletter } from "@/app/api/newsletter/newsletter";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsletterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await subscribeNewsletter(email);
      
      if (response?.success) {
        setStatus("success");
        setMessage(response?.message || t("newsletter_success_message", "Thank you for subscribing!"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(response?.message || t("newsletter_error_message", "Something went wrong. Please try again."));
      }
    } catch (error) {
      setStatus("error");
      setMessage(t("newsletter_error_connection", "Failed to subscribe. Please check your connection."));
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-(--white-color)/40 group-focus-within:text-(--accent-color) transition">
            <FaAt size={18} />
          </div>
          <input
            type="email"
            placeholder={t("newsletter_placeholder", "Enter your email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-(--white-color) font-default text-[15px] focus:outline-none focus:border-(--accent-color)/50 transition"
            required
            disabled={status === "loading"}
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          className="w-full rounded-xl! font-default tracking-wide group"
          loading={status === "loading"}
          disabled={status === "loading"}
          rightIcon={status !== "loading" && <FaArrowRight size={14} className="group-hover:translate-x-1 transition" />}
        >
          {status === "loading" ? t("newsletter_subscribing", "Subscribing...") : t("newsletter_submit_button", "Subscribe Now")}
        </Button>
      </form>

      {status === "success" && (
        <div className="flex items-center gap-2 text-green-400 text-sm font-default animate-fade-in">
          <FaCheckCircle size={14} />
          <span>{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm font-default animate-fade-in">
          <FaExclamationCircle size={14} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
