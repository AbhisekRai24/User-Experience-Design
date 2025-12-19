// import { X, User, Mail, Phone, Users } from "lucide-react";
// import { useState } from "react";

// const RegistrationFormModal = ({ isOpen, onClose, onSubmit, eventTitle }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     attendees: 1,
//     donation: {
//       cash: "",
//       items: ""
//     }
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });

//   if (!isOpen) return null;

//   const validateForm = () => {
//     const newErrors = {
//       name: "",
//       email: "",
//       phone: ""
//     };

//     let isValid = true;

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//       isValid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//       isValid = false;
//     }

//     // Phone is optional, but validate format if provided
//     if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       onSubmit(formData);
//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         attendees: 1,
//         donation: {
//           cash: "",
//           items: ""
//         }
//       });
//       setErrors({ name: "", email: "", phone: "" });
//     }
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleDonationChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       donation: {
//         ...prev.donation,
//         [field]: value
//       }
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
//       <div className="bg-white rounded-3xl w-full max-w-[600px] max-h-[90vh] flex flex-col" style={{ boxShadow: '0px 8px 32px rgba(0,0,0,0.12)' }}>
//         {/* Header - Fixed */}
//         <div className="flex items-center justify-between p-8 pb-4 flex-shrink-0">
//           <div>
//             <h2 className="font-semibold text-[24px] text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
//               Complete Registration
//             </h2>
//             <p className="text-[13px] text-[#6B6B6B] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
//               {eventTitle}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-10 h-10 bg-[#F5FAF7] rounded-full flex items-center justify-center hover:bg-[#E8F7EC] transition-colors flex-shrink-0"
//           >
//             <X className="w-5 h-5 text-[#2E3A3D]" />
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="overflow-y-auto px-8 pb-8 flex-1">
//           <form onSubmit={handleSubmit}>
//             {/* Full Name */}
//             <div className="mb-5">
//               <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => handleChange('name', e.target.value)}
//                   placeholder="Enter your full name"
//                   className={`w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
//                     }`}
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 />
//               </div>
//               {errors.name && (
//                 <p className="text-[12px] text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   {errors.name}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="mb-5">
//               <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                 Email Address *
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleChange('email', e.target.value)}
//                   placeholder="Enter your email"
//                   className={`w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
//                     }`}
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-[12px] text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Phone */}
//             <div className="mb-5">
//               <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                 Phone Number <span className="text-[#6B6B6B]">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => handleChange('phone', e.target.value)}
//                   placeholder="Enter your phone number"
//                   className={`w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
//                     }`}
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-[12px] text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   {errors.phone}
//                 </p>
//               )}
//             </div>

//             {/* Number of Attendees */}
//             <div className="mb-6">
//               <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                 Number of Attendees
//               </label>
//               <div className="relative">
//                 <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={formData.attendees}
//                   onChange={(e) => handleChange('attendees', parseInt(e.target.value) || 1)}
//                   className="w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] focus:outline-none focus:ring-2 focus:ring-[#4BA3F2] transition-all"
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 />
//               </div>
//             </div>

//             {/* Donation Section */}
//             <div className="mb-6 p-5 bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-2xl border-2 border-dashed border-[#57C478]">
//               <h3 className="text-[16px] font-semibold text-[#2E3A3D] mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                 <span className="w-6 h-6 bg-gradient-to-br from-[#57C478] to-[#4BA3F2] rounded-full flex items-center justify-center text-white text-[12px]">💚</span>
//                 Support This Event <span className="text-[#6B6B6B] font-normal text-[12px]">(Optional)</span>
//               </h3>

//               {/* Cash Donation */}
//               <div className="mb-4">
//                 <label className="block text-[13px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Cash Donation
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-[#6B6B6B] font-medium">$</span>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={formData.donation.cash}
//                     onChange={(e) => handleDonationChange('cash', e.target.value)}
//                     placeholder="0.00"
//                     className="w-full h-[48px] bg-white rounded-xl pl-8 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#57C478] transition-all"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   />
//                 </div>
//               </div>

//               {/* Items/Services Donation */}
//               <div>
//                 <label className="block text-[13px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Donate Items or Services
//                 </label>
//                 <textarea
//                   value={formData.donation.items}
//                   onChange={(e) => handleDonationChange('items', e.target.value)}
//                   placeholder="E.g., refreshments, equipment, photography services..."
//                   rows={3}
//                   className="w-full bg-white rounded-xl p-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#57C478] transition-all resize-none"
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 h-[52px] bg-[#F5FAF7] text-[#2E3A3D] rounded-xl text-[16px] font-medium hover:bg-gray-200 transition-colors"
//                 style={{ fontFamily: 'Poppins, sans-serif' }}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 h-[52px] bg-[#1AA928] text-white rounded-xl text-[16px] font-semibold hover:bg-[#159023] transition-colors"
//                 style={{ fontFamily: 'Poppins, sans-serif' }}
//               >
//                 Complete Registration
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationFormModal;



import { X, User, Mail, Phone, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const RegistrationFormModal = ({ isOpen, onClose, onSubmit, eventTitle }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendees: 1,
    donation: {
      cash: "",
      items: ""
    }
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: ""
  });

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: ""
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = () => {
    // Just submit the data - don't show toast or close modal here
    // Let the parent component handle success/error
    onSubmit(formData);

    // Reset form for next use
    setFormData({
      name: "",
      email: "",
      phone: "",
      attendees: 1,
      donation: {
        cash: "",
        items: ""
      }
    });
    setErrors({ name: "", email: "", phone: "" });
    setCurrentStep(1);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleDonationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      donation: {
        ...prev.donation,
        [field]: value
      }
    }));
  };

  const handleCloseModal = () => {
    onClose();
    setCurrentStep(1);
    setErrors({ name: "", email: "", phone: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl w-full max-w-[600px] max-h-[90vh] flex flex-col" style={{ boxShadow: '0px 8px 32px rgba(0,0,0,0.12)' }}>
        <div className="flex items-center justify-between p-8 pb-4 flex-shrink-0">
          <div>
            <h2 className="font-semibold text-[24px] text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Complete Registration
            </h2>
            <p className="text-[13px] text-[#6B6B6B] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {eventTitle}
            </p>
          </div>
          <button
            onClick={handleCloseModal}
            className="w-10 h-10 bg-[#F5FAF7] rounded-full flex items-center justify-center hover:bg-[#E8F7EC] transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-[#2E3A3D]" />
          </button>
        </div>

        <div className="px-8 pb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className={`h-2 flex-1 rounded-full transition-all ${currentStep >= 1 ? 'bg-[#1AA928]' : 'bg-[#E5E5E5]'}`} />
              <div className={`h-2 flex-1 rounded-full transition-all ${currentStep >= 2 ? 'bg-[#1AA928]' : 'bg-[#E5E5E5]'}`} />
            </div>
            <span className="text-[13px] font-medium text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Step {currentStep} of 2
            </span>
          </div>
        </div>

        <div className="overflow-y-auto px-8 pb-8 flex-1">
          <div>
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h3 className="text-[18px] font-semibold text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Personal Information
                  </h3>
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Let us know who you are
                  </p>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                        }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[12px] text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                        }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[12px] text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Phone Number <span className="text-[#6B6B6B]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={`w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                        }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[12px] text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h3 className="text-[18px] font-semibold text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Event Details
                  </h3>
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Finalize your registration
                  </p>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Number of Attendees
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.attendees}
                      onChange={(e) => handleChange('attendees', parseInt(e.target.value) || 1)}
                      className="w-full h-[52px] bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-[14px] text-[#2E3A3D] focus:outline-none focus:ring-2 focus:ring-[#4BA3F2] transition-all"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-2xl border-2 border-dashed border-[#57C478]">
                  <h3 className="text-[16px] font-semibold text-[#2E3A3D] mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="w-6 h-6 bg-gradient-to-br from-[#57C478] to-[#4BA3F2] rounded-full flex items-center justify-center text-white text-[12px]">💚</span>
                    Support This Event <span className="text-[#6B6B6B] font-normal text-[12px]">(Optional)</span>
                  </h3>

                  <div className="mb-4">
                    <label className="block text-[13px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Cash Donation
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-[#6B6B6B] font-medium">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.donation.cash}
                        onChange={(e) => handleDonationChange('cash', e.target.value)}
                        placeholder="0.00"
                        className="w-full h-[48px] bg-white rounded-xl pl-8 pr-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#57C478] transition-all"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Donate Items or Services
                    </label>
                    <textarea
                      value={formData.donation.items}
                      onChange={(e) => handleDonationChange('items', e.target.value)}
                      placeholder="E.g., refreshments, equipment, photography services..."
                      rows={3}
                      className="w-full bg-white rounded-xl p-4 text-[14px] text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#57C478] transition-all resize-none"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {currentStep === 1 ? (
                <>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 h-[52px] bg-[#F5FAF7] text-[#2E3A3D] rounded-xl text-[16px] font-medium hover:bg-gray-200 transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-[52px] bg-[#1AA928] text-white rounded-xl text-[16px] font-semibold hover:bg-[#159023] transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-[52px] bg-[#F5FAF7] text-[#2E3A3D] rounded-xl text-[16px] font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="flex-1 h-[52px] bg-[#1AA928] text-white rounded-xl text-[16px] font-semibold hover:bg-[#159023] transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Complete Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormModal;