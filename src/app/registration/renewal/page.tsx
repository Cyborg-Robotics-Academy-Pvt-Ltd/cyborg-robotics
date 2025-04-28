"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../../firebaseConfig";
import { User, Phone } from "lucide-react";

interface FormData {
  studentName: string;
  contactNumber: string;
  preferredDay: string;
  preferredTime: string;
  studentRegistrationNo: string;
  location: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    contactNumber: "",
    preferredDay: "",
    preferredTime: "",
    studentRegistrationNo: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.studentName) {
      toast.error("Please enter the name of the child.", {
        position: "top-center",
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactNumber) {
      toast.error("Please enter the contact number.", {
        position: "top-center",
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.preferredDay) {
      toast.error("Please select a preferred day.", {
        position: "top-center",
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.preferredTime) {
      toast.error("Please select a preferred time.", {
        position: "top-center",
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    // Convert time to AM/PM format
    const [hours, minutes] = formData.preferredTime.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const formattedTime = `${(+hours % 12 || 12).toString().padStart(2, "0")}:${minutes} ${period}`;

    // Combine time and other form data
    const submissionData = {
      ...formData,
      preferredTime: formattedTime, // Use the formatted time
    };

    try {
      const docRef = await addDoc(collection(db, "renewals"), submissionData);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Renewal submitted successfully!", {
        position: "top-center",
        duration: 3000,
      });

      setFormData({
        studentName: "",
        contactNumber: "",
        preferredDay: "",
        preferredTime: "",
        studentRegistrationNo: "",
        location: "",
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Submission failed. Please try again later.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster />

      <div className="max-w-4xl mx-auto mt-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Student Renewal Form
          </h1>
          <p className="mt-2 text-gray-600">
            Complete your registration in just a few steps
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-6 transform transition-all duration-300 opacity-100">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="studentName"
                  label="Name of the Child"
                  value={formData.studentName}
                  onChange={handleChange}
                  icon={User}
                />

                <FormField
                  id="studentRegistrationNo"
                  label="Student Registration No. (PRN)"
                  value={formData.studentRegistrationNo}
                  onChange={handleChange}
                />

                <FormField
                  id="contactNumber"
                  label="Contact Number"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="e.g., 123-456-7890"
                  icon={Phone}
                />

                <FormField
                  id="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleChange}
                />

                <div>
                  <label
                    className="flex items-center text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="preferredDay"
                  >
                    <span className="mr-2">📆</span>
                    Preferred Day <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="preferredDay"
                    name="preferredDay"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    value={formData.preferredDay}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a day
                    </option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                <div>
                  <label
                    className="flex items-center text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="preferredTime"
                  >
                    <span className="mr-2">⏰</span>
                    Preferred Time <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-2.5 px-8 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Renewal
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Need assistance? Contact us at support@example.com
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center transform transition-all duration-300 scale-100 opacity-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-10 w-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your renewal form has been submitted successfully. We will contact
              you shortly to confirm your registration.
            </p>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  icon?: React.ElementType;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  readOnly,
  placeholder,
  icon: Icon,
}) => (
  <div>
    <label
      className="flex items-center text-gray-700 text-sm font-semibold mb-2"
      htmlFor={id}
    >
      {Icon && (
        <span className="mr-2">
          <Icon className="h-4 w-4" />
        </span>
      )}
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${readOnly ? "bg-gray-100" : "bg-gray-50"}`}
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  </div>
);

export default Page;
