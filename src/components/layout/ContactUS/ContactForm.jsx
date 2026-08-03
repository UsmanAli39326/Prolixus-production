// components/ContactSection.jsx
"use client";
import React, { useState } from "react";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Button from "@/components/ui/Button";
import { getAboutPayload } from "@/app/api/about/about";
import { submitContactForm } from "@/app/api/contact/contact";
import Toast from "@/components/ui/Toast";


const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  messageDescription: "",
};

export default function ContactSection({ localization }) {
  const [about, setAbout] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  React.useEffect(() => {
    getAboutPayload().then((res) => {
      if (res) setAbout(res);
    });
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast((prev) => ({ ...prev, show: false }));

    try {
      const response = await submitContactForm(formData);
      if (response?.success) {
        setToast({
          show: true,
          type: "success",
          message: localization?.contact_success_message,
        });
        setFormData(INITIAL_FORM);
      } else {
        throw new Error(response?.message || localization?.error_submission_failed);
      }
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: error.message || localization?.error_unexpected,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full h-12 px-4 rounded-xl border border-divider bg-white text-text placeholder:text-text/50 text-sm font-default outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section className="py-24 relative">
      {/* Toast notification */}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <div className="mx-auto w-full max-w-full px-4">
        <div className="rounded-3xl border border-divider bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: FORM */}
            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <FaderInAnimation direction="up">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-accent">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                    {localization?.contact_form_label}
                  </p>
                </FaderInAnimation>

                <FaderInAnimation direction="up">
                  <h2 className="text-primary text-3xl sm:text-4xl font-semibold leading-tight font-default">
                    {localization?.contact_form_title_main}{" "}
                    <span className="font-accent italic font-normal">{localization?.contact_form_title_accent}</span>
                  </h2>
                </FaderInAnimation>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4"
              >
                {/* Name row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FaderInAnimation direction="up">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={localization?.contact_first_name_placeholder}
                      className={fieldClass}
                      required
                    />
                  </FaderInAnimation>

                  <FaderInAnimation direction="up">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={localization?.contact_last_name_placeholder}
                      className={fieldClass}
                      required
                    />
                  </FaderInAnimation>
                </div>

                {/* Email */}
                <FaderInAnimation direction="up">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={localization?.contact_email_placeholder}
                    className={fieldClass}
                    required
                  />
                </FaderInAnimation>

                {/* Phone */}
                <FaderInAnimation direction="up">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={localization?.contact_phone_placeholder}
                    className={fieldClass}
                    required
                  />
                </FaderInAnimation>

                {/* Message */}
                <FaderInAnimation direction="up">
                  <textarea
                    name="messageDescription"
                    value={formData.messageDescription}
                    onChange={handleChange}
                    rows={5}
                    placeholder={localization?.contact_message_placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-divider bg-white text-text placeholder:text-text/50 text-sm font-default outline-none resize-vertical transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 min-h-[130px]"
                    required
                  />
                </FaderInAnimation>

                {/* Submit */}
                <FaderInAnimation direction="up">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-2 w-fit !rounded-full"
                  >
                    {isSubmitting ? localization?.contact_submitting_button : localization?.contact_submit_button}
                  </Button>
                </FaderInAnimation>
              </form>
            </div>

            {/* RIGHT: MAP */}
            <div className="min-h-80 border-t border-divider lg:min-h-full lg:border-l lg:border-t-0">
              <iframe
                title="Google Map"
                className="h-full w-full"
                src={
                  about?.googleMap ||
                  "https://www.google.com/maps?q=Filder+Str.+63,+47441+Moers,+Germany&output=embed"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
