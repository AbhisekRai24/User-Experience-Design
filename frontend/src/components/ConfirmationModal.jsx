// src/components/ConfirmationModal.jsx
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, isLoading, confirmButtonColor = 'red' }) => {
  if (!isOpen) return null;

  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon centered at top */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-bounce-subtle">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Title centered */}
        <h3 className="text-xl font-semibold text-[#2E3A3D] text-center mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h3>

        {/* Message centered */}
        <p className="text-[14px] text-[#6B6B6B] text-center mb-6 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-[14px] font-medium text-[#6B6B6B] hover:bg-gray-50 hover:scale-105 transition-all disabled:opacity-50"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-xl text-white text-[14px] font-medium hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2 ${colorClasses[confirmButtonColor]}`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;