import React, { useState, useEffect } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  // Load saved data from local storage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save data to local storage on change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
    } else if (step === 2) {
      if (!formData.address1) newErrors.address1 = "Address Line 1 is required.";
      if (!formData.city) newErrors.city = "City is required.";
      if (!formData.state) newErrors.state = "State is required.";
      if (!formData.zip) newErrors.zip = "Zip Code is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert("Form submitted successfully!");
      localStorage.removeItem("formData");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-2xl w-full" style={{ minHeight: "500px" }}>
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Multi-Step Form</h2>

      <div className="flex justify-between items-center mb-10">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full transition-all ${
              step === num ? "bg-blue-500 text-white shadow-lg" : "bg-gray-300 text-gray-600"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 rounded-2xl shadow-inner" style={{ minHeight: "400px", position: "relative" }}>
        {step === 1 && (
          <div style={{ minHeight: "350px" }}>
            <h3 className="text-2xl font-bold mb-6 text-gray-700">Step 1: Personal Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        )}

        {step === 2 && (
          <div style={{ minHeight: "350px" }}>
            <h3 className="text-2xl font-bold mb-6 text-gray-700">Step 2: Address Information</h3>
            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.address1 ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.address1 && <p className="text-red-500 text-sm mb-4">{errors.address1}</p>}

            <input
              type="text"
              name="address2"
              placeholder="Address Line 2 (Optional)"
              value={formData.address2}
              onChange={handleChange}
              className="w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 border-gray-300"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.city ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.city && <p className="text-red-500 text-sm mb-4">{errors.city}</p>}

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.state ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.state && <p className="text-red-500 text-sm mb-4">{errors.state}</p>}

            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              className={`w-full px-5 py-4 mb-5 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 ${errors.zip ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>
        )}

        {step === 3 && (
          <div style={{ minHeight: "350px" }}>
            <h3 className="text-2xl font-bold mb-6 text-gray-700">Step 3: Confirmation</h3>
            <p className="mb-4 text-lg"><strong>Name:</strong> {formData.name}</p>
            <p className="mb-4 text-lg"><strong>Email:</strong> {formData.email}</p>
            <p className="mb-4 text-lg"><strong>Phone:</strong> {formData.phone}</p>
            <p className="mb-4 text-lg"><strong>Address 1:</strong> {formData.address1}</p>
            <p className="mb-4 text-lg"><strong>Address 2:</strong> {formData.address2}</p>
            <p className="mb-4 text-lg"><strong>City:</strong> {formData.city}</p>
            <p className="mb-4 text-lg"><strong>State:</strong> {formData.state}</p>
            <p className="mb-4 text-lg"><strong>Zip:</strong> {formData.zip}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-6 py-3 bg-gray-300 rounded-xl text-gray-600 disabled:opacity-50"
        >
          Back
        </button>

        {step < 3 && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Next
          </button>
        )}

        {step === 3 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
