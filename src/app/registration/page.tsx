"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  studentName: string;
  dateOfBirth: string;
  currentAge: string;
  schoolName: string;
  class: string;
  board: string;
  fatherName: string;
  fatherContact: string;
  fatherEmail: string;
  motherName: string;
  motherContact: string;
  motherEmail: string;
  currentAddress: string;
  permanentAddress: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    dateOfBirth: '',
    currentAge: '',
    schoolName: '',
    class: '',
    board: '',
    fatherName: '',
    fatherContact: '',
    fatherEmail: '',
    motherName: '',
    motherContact: '',
    motherEmail: '',
    currentAddress: '',
    permanentAddress: '',
  });

  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState<boolean>(false);

  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({
        ...prev,
        currentAge: age.toString(),
      }));
    }
  }, [formData.dateOfBirth]);

  useEffect(() => {
    if (sameAsCurrentAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: formData.currentAddress,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permanentAddress: '',
      }));
    }
  }, [sameAsCurrentAddress, formData.currentAddress]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setSameAsCurrentAddress(e.target.checked);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-2 md:py-12 px-4 sm:px-6 lg:px-8 md:mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-800 to-red-600 px-4 sm:px-6 py-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">Student Registration Form</h1>
            <p className="text-sm sm:text-base text-red-100 text-center mt-2">Please fill in all the required information</p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            <SectionTitle number="1" title="Student Information" />
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {["studentName", "dateOfBirth", "currentAge", "schoolName"].map((id) => (
                  <FormField
                    key={id}
                    id={id}
                    label={id.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    value={formData[id as keyof FormData]}
                    onChange={handleChange}
                    type={id === "dateOfBirth" ? "date" : "text"}
                    readOnly={id === "currentAge"}
                    required
                  />
                ))}

                <DropdownField
                  id="class"
                  label="CLASS"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  options={Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)}
                />

                <DropdownField
                  id="board"
                  label="BOARD"
                  value={formData.board}
                  onChange={handleChange}
                  required
                  options={["CBSE", "ICSE", "State Board", "IB", "Other"]}
                />
              </div>
            </div>

            <SectionTitle number="2" title="Father's Information" />
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField id="fatherName" label="FATHER'S NAME" type="text" value={formData.fatherName} onChange={handleChange} required />
                <FormField id="fatherContact" label="CONTACT NUMBER" type="tel" value={formData.fatherContact} onChange={handleChange} required />
                <FormField id="fatherEmail" label="EMAIL ID" type="email" value={formData.fatherEmail} onChange={handleChange} required fullWidth />
              </div>
            </div>

            <SectionTitle number="3" title="Mother's Information" />
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField id="motherName" label="MOTHER'S NAME" type="text" value={formData.motherName} onChange={handleChange} required />
                <FormField id="motherContact" label="CONTACT NUMBER" type="tel" value={formData.motherContact} onChange={handleChange} required />
                <FormField id="motherEmail" label="EMAIL ID" type="email" value={formData.motherEmail} onChange={handleChange} required fullWidth />
              </div>
            </div>

            <SectionTitle number="4" title="Address Information" />
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <TextareaField id="currentAddress" label="CURRENT ADDRESS" value={formData.currentAddress} onChange={handleChange} required />

                <div className="flex items-center mb-2">
                  <input
                    id="sameAddress"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={sameAsCurrentAddress}
                    onChange={handleAddressCheckbox}
                  />
                  <label htmlFor="sameAddress" className="ml-2 text-sm font-medium text-gray-700">
                    Permanent address is same as current address
                  </label>
                </div>

                <TextareaField id="permanentAddress" label="PERMANENT ADDRESS" value={formData.permanentAddress} onChange={handleChange} required disabled={sameAsCurrentAddress} />
              </div>
            </div>

            <div className="flex items-center justify-center mt-8">
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 md:px-12 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all hover:scale-105"
                type="submit"
              >
                Submit Registration
              </button>
            </div>

            <p className="text-center text-red-500 text-sm mt-4">
              Fields marked with <span className="font-bold">*</span> are required
            </p>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Your information will be kept confidential and used only for registration purposes.
        </p>
      </div>
    </div>
  );
};

interface SectionTitleProps {
  number: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ number, title }) => (
  <div className="flex items-center mb-4 mt-10">
    <div className="bg-red-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
      <span className="text-white font-bold">{number}</span>
    </div>
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
  </div>
);

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, type = "text", value, onChange, required, readOnly, fullWidth }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={id}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${readOnly ? "bg-gray-100" : ""}`}
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
    />
  </div>
);

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ id, label, value, onChange, required, disabled }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={id}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      id={id}
      name={id}
      rows={3}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  </div>
);

interface DropdownFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: string[];
}

const DropdownField: React.FC<DropdownFieldProps> = ({ id, label, value, onChange, required, options }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={id}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt.replace("Class ", "")}>{opt}</option>
      ))}
    </select>
  </div>
);

export default RegisterPage;
