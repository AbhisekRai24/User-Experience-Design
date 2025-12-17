import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../../api/events';
import toast from 'react-hot-toast';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Nature',
    location: '',
    date: '',
    time: '',
    image: null,
  });

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        location: event.location,
        date: event.date.split('T')[0],
        time: event.time,
        image: null,
      });
    }
  }, [event]);

  const mutation = useMutation({
    mutationFn: (data) => updateEvent(id, data),
    onSuccess: () => {
      toast.success('Event updated successfully');
      queryClient.invalidateQueries(['events']);
      queryClient.invalidateQueries(['event', id]);
      navigate('/admin/events');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update event');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Event</h1>

      <div className="card bg-base-100 shadow-xl max-w-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Event Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="Nature">Nature</option>
                <option value="Photoshoot">Photoshoot</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Event Image (Leave empty to keep current)</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered"
                accept="image/*"
                onChange={handleImageChange}
              />
              {event && !formData.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="card-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Updating...' : 'Update Event'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate('/admin/events')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;

// import { useState, useEffect } from 'react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getEventById, updateEvent } from '../../api/events';
// import toast from 'react-hot-toast';
// import imageCompression from 'browser-image-compression';

// const EditEvent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'Nature',
//     location: '',
//     date: '',
//     time: '',
//     image: null,
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isCompressing, setIsCompressing] = useState(false);

//   const { data: event, isLoading } = useQuery({
//     queryKey: ['event', id],
//     queryFn: () => getEventById(id),
//     enabled: !!id,
//   });

//   useEffect(() => {
//     if (event) {
//       setFormData({
//         title: event.title,
//         description: event.description,
//         category: event.category,
//         location: event.location,
//         date: event.date.split('T')[0],
//         time: event.time,
//         image: null,
//       });
//       // Set existing image as preview
//       setImagePreview(event.image);
//     }
//   }, [event]);

//   const mutation = useMutation({
//     mutationFn: (data) => updateEvent(id, data),
//     onSuccess: () => {
//       toast.success('Event updated successfully');
//       queryClient.invalidateQueries(['events']);
//       queryClient.invalidateQueries(['event', id]);
//       navigate('/admin/events');
//     },
//     onError: (error) => {
//       const errorMessage = error.message || error.response?.data?.message || 'Failed to update event';
//       toast.error(errorMessage);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate(formData);
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid file type! Only JPEG, PNG, and WEBP are allowed.');
//       e.target.value = '';
//       return;
//     }

//     // Validate file size (10MB limit before compression)
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     if (file.size > maxSize) {
//       toast.error('File is too large! Maximum size is 10MB.');
//       e.target.value = '';
//       return;
//     }

//     setIsCompressing(true);

//     try {
//       console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB');

//       // Compression options
//       const options = {
//         maxSizeMB: 2, // Maximum 2MB after compression
//         maxWidthOrHeight: 1920, // Max dimension
//         useWebWorker: true,
//         fileType: file.type,
//       };

//       // Compress the image
//       const compressedFile = await imageCompression(file, options);
//       console.log('Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

//       // Create a new File object with the original name
//       const compressedFileWithName = new File(
//         [compressedFile],
//         file.name,
//         { type: compressedFile.type }
//       );

//       // Update form data with compressed image
//       setFormData(prev => ({ ...prev, image: compressedFileWithName }));

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(compressedFileWithName);

//       toast.success(`Image compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);

//     } catch (error) {
//       console.error('Compression error:', error);
//       toast.error('Failed to compress image. Please try a smaller file.');
//       e.target.value = '';
//     } finally {
//       setIsCompressing(false);
//     }
//   };

//   const removeImage = () => {
//     setFormData(prev => ({ ...prev, image: null }));
//     // Restore original image preview
//     if (event) {
//       setImagePreview(event.image);
//     }
//     // Reset file input
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) fileInput.value = '';
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <span className="loading loading-spinner loading-lg"></span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8">Edit Event</h1>

//       <div className="card bg-base-100 shadow-xl max-w-2xl">
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Event Title</span>
//               </label>
//               <input
//                 type="text"
//                 className="input input-bordered"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({ ...formData, title: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 className="textarea textarea-bordered h-24"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Category</span>
//               </label>
//               <select
//                 className="select select-bordered"
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData({ ...formData, category: e.target.value })
//                 }
//                 required
//               >
//                 <option value="Nature">Nature</option>
//                 <option value="Photoshoot">Photoshoot</option>
//                 <option value="Volunteer">Volunteer</option>
//               </select>
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Location</span>
//               </label>
//               <input
//                 type="text"
//                 className="input input-bordered"
//                 value={formData.location}
//                 onChange={(e) =>
//                   setFormData({ ...formData, location: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Date</span>
//                 </label>
//                 <input
//                   type="date"
//                   className="input input-bordered"
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Time</span>
//                 </label>
//                 <input
//                   type="time"
//                   className="input input-bordered"
//                   value={formData.time}
//                   onChange={(e) =>
//                     setFormData({ ...formData, time: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-control mb-6">
//               <label className="label">
//                 <span className="label-text">Event Image</span>
//                 <span className="label-text-alt text-xs">
//                   {formData.image ? 'New image selected' : 'Leave empty to keep current'}
//                 </span>
//               </label>
//               <input
//                 type="file"
//                 className="file-input file-input-bordered"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 disabled={isCompressing || mutation.isPending}
//               />

//               {isCompressing && (
//                 <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
//                   <span className="loading loading-spinner loading-sm"></span>
//                   <span>Compressing image...</span>
//                 </div>
//               )}

//               {imagePreview && !isCompressing && (
//                 <div className="mt-4 relative inline-block">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
//                   />
//                   {formData.image && (
//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
//                       title="Remove new image"
//                     >
//                       ✕
//                     </button>
//                   )}
//                   {formData.image && (
//                     <div className="mt-2 text-sm text-success font-medium">
//                       ✓ New image will be uploaded
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="card-actions">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={mutation.isPending || isCompressing}
//               >
//                 {mutation.isPending ? (
//                   <>
//                     <span className="loading loading-spinner loading-sm"></span>
//                     Updating...
//                   </>
//                 ) : (
//                   'Update Event'
//                 )}
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-ghost"
//                 onClick={() => navigate('/admin/events')}
//                 disabled={mutation.isPending || isCompressing}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditEvent;