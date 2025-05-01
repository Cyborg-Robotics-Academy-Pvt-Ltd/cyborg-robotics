"use client";
import Footer from "@/components/Footer";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Loader2,
  Phone,
  MailCheck,
  MapPin,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 lg:px-8 mt-4 ">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold w-full mt-6 md:mt-24">
          <div className="flex items-center justify-center gap-2 mb-10 ">
            <span className="text-[#8D0F11]">Reach</span>
            <span>Us</span>
          </div>
        </h1>

        <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-6 lg:gap-12">
          {/* Contact Info Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
                Cyborg Robotics Academy Private Limited
              </h1>
              <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <Phone size={20} />
                  <span className="text-sm sm:text-base">+91-9175159292</span>
                </div>
                <div className="flex gap-2 items-center">
                  <MailCheck size={20} />
                  <span className="text-sm sm:text-base">
                    info@cyborgrobotics.in
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin size={28} />
                <h1 className="text-sm sm:text-base lg:text-lg">
                  Head Office: Plot No. 13, Flat No. 2, Kalyani Nagar,
                  Ramnarayan House, Pune - 411014
                </h1>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-yellow-100 p-3 rounded-full">
                <MessageSquare className="text-yellow-600 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-3">
                Contact Us
              </h2>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-green-800 mb-1">
                  Message Sent!
                </h3>
                <p className="text-green-700">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className={`w-full bg-gray-50 pl-10 pr-4 py-3 rounded-xl border ${errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-yellow-500"} focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
                      placeholder="John Smith"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className={`w-full bg-gray-50 pl-10 pr-4 py-3 rounded-xl border ${errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-yellow-500"} focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
                      placeholder="john@example.com"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    className={`w-full bg-gray-50 px-4 py-3 rounded-xl border ${errors.message ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-yellow-500"} focus:border-transparent focus:outline-none focus:ring-2 transition duration-200 min-h-32`}
                    rows={4}
                    placeholder="How can we help you today?"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
