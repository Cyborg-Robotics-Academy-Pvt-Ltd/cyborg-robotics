"use client"
import React, { useState, useEffect } from 'react'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
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
    permanentAddress: ''
  });

  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);

  // Calculate age based on date of birth
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
        currentAge: age.toString()
      }));
    }
  }, [formData.dateOfBirth]);

  // Update permanent address when checkbox is toggled
  useEffect(() => {
    if (sameAsCurrentAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: formData.currentAddress
      }));
    }
  }, [sameAsCurrentAddress, formData.currentAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressCheckbox = (e) => {
    setSameAsCurrentAddress(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Student Registration Form</h1>
            <p className="text-red-100 text-center mt-2">Please fill in all the required information</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            {/* Student Details */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Student Information</h2>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="studentName">
                      NAME OF STUDENT <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="studentName"
                      name="studentName"
                      type="text"
                      placeholder="Enter full name"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dateOfBirth">
                      DATE OF BIRTH <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="currentAge">
                      CURRENT AGE (YEARS)
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="currentAge"
                      name="currentAge"
                      type="text"
                      placeholder="Auto-calculated"
                      value={formData.currentAge}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="schoolName">
                      SCHOOL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      placeholder="Enter school name"
                      value={formData.schoolName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="class">
                      CLASS <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="class"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="board">
                      BOARD <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="board"
                      name="board"
                      value={formData.board}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                      <option value="IB">IB</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Father's Details */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Father's Information</h2>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fatherName">
                      FATHER'S NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="fatherName"
                      name="fatherName"
                      type="text"
                      placeholder="Enter father's name"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fatherContact">
                      CONTACT NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="fatherContact"
                      name="fatherContact"
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.fatherContact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fatherEmail">
                      EMAIL ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="fatherEmail"
                      name="fatherEmail"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.fatherEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mother's Details */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Mother's Information</h2>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="motherName">
                      MOTHER'S NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="motherName"
                      name="motherName"
                      type="text"
                      placeholder="Enter mother's name"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="motherContact">
                      CONTACT NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="motherContact"
                      name="motherContact"
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.motherContact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="motherEmail">
                      EMAIL ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="motherEmail"
                      name="motherEmail"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.motherEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">4</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Address Information</h2>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="currentAddress">
                      CURRENT ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="currentAddress"
                      name="currentAddress"
                      rows="3"
                      placeholder="Enter current address"
                      value={formData.currentAddress}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

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

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="permanentAddress">
                      PERMANENT ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      id="permanentAddress"
                      name="permanentAddress"
                      rows="3"
                      placeholder="Enter permanent address"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      disabled={sameAsCurrentAddress}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
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
  )
}

export default RegisterPage