// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Trophy, Award, Medal, Crown, TrendingUp, Calendar, Users } from 'lucide-react';

// // Medal/Trophy component based on rank
// const RankBadge = ({ rank }) => {
//     if (rank === 1) {
//         return (
//             <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
//                 <Crown className="w-7 h-7 text-white" />
//             </div>
//         );
//     } else if (rank === 2) {
//         return (
//             <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
//                 <Trophy className="w-6 h-6 text-white" />
//             </div>
//         );
//     } else if (rank === 3) {
//         return (
//             <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
//                 <Award className="w-6 h-6 text-white" />
//             </div>
//         );
//     } else {
//         return (
//             <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#1AA928] to-[#159023] rounded-full flex items-center justify-center shadow-md border-3 border-white z-10">
//                 <span className="text-white font-bold text-sm">#{rank}</span>
//             </div>
//         );
//     }
// };

// // Individual Attendee Card
// const AttendeeCard = ({ attendee, isActive }) => {
//     const getRankColor = (rank) => {
//         if (rank === 1) return 'from-yellow-50 to-yellow-100 border-yellow-300';
//         if (rank === 2) return 'from-gray-50 to-gray-100 border-gray-300';
//         if (rank === 3) return 'from-orange-50 to-orange-100 border-orange-300';
//         return 'from-green-50 to-green-100 border-green-300';
//     };

//     const getRankGlow = (rank) => {
//         if (rank === 1) return 'shadow-yellow-200';
//         if (rank === 2) return 'shadow-gray-200';
//         if (rank === 3) return 'shadow-orange-200';
//         return 'shadow-green-200';
//     };

//     return (
//         <div
//             className={`relative bg-gradient-to-br ${getRankColor(attendee.rank)} rounded-3xl p-8 border-2 transition-all duration-500 ${isActive ? `shadow-2xl ${getRankGlow(attendee.rank)} scale-100` : 'shadow-lg scale-95 opacity-70'
//                 }`}
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//         >
//             <RankBadge rank={attendee.rank} />

//             {/* Profile Section */}
//             <div className="flex flex-col items-center mb-6">
//                 <div className="relative mb-4">
//                     <img
//                         src={attendee.profileImage}
//                         alt={attendee.fullName}
//                         className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
//                     />
//                     {attendee.rank === 1 && (
//                         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-md">
//                             🌟 CHAMPION
//                         </div>
//                     )}
//                 </div>

//                 <h3 className="text-2xl font-bold text-[#2E3A3D] mb-1">{attendee.fullName}</h3>
//                 <p className="text-sm text-[#6B6B6B]">@{attendee.username}</p>
//             </div>

//             {/* Score Display */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-inner">
//                 <div className="text-center mb-4">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                         <Trophy className="w-5 h-5 text-[#1AA928]" />
//                         <span className="text-sm font-medium text-[#6B6B6B]">Total Score</span>
//                     </div>
//                     <div className="text-5xl font-bold bg-gradient-to-r from-[#1AA928] to-[#4BA3F2] bg-clip-text text-transparent">
//                         {attendee.score}
//                     </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
//                         <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
//                         <div className="text-2xl font-bold text-blue-700">{attendee.eventsAttended}</div>
//                         <div className="text-xs text-blue-600">Events</div>
//                     </div>

//                     <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
//                         <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
//                         <div className="text-2xl font-bold text-purple-700">{attendee.categoriesExplored}</div>
//                         <div className="text-xs text-purple-600">Categories</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Rank Position */}
//             <div className="text-center">
//                 <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
//                     <Medal className="w-4 h-4 text-[#1AA928]" />
//                     <span className="text-sm font-semibold text-[#2E3A3D]">
//                         Rank #{attendee.rank} of 5
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Main Carousel Component - Pass topAttendees as prop
// const TopAttendeesCarousel = ({ topAttendees = [], period = 'month', isLoading = false, error = null }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [autoPlay, setAutoPlay] = useState(true);

//     useEffect(() => {
//         if (!autoPlay || topAttendees.length === 0) return;

//         const interval = setInterval(() => {
//             setCurrentIndex((prev) => (prev + 1) % topAttendees.length);
//         }, 5000); // Change every 5 seconds

//         return () => clearInterval(interval);
//     }, [autoPlay, topAttendees.length]);

//     const handlePrevious = () => {
//         setCurrentIndex((prev) => (prev - 1 + topAttendees.length) % topAttendees.length);
//         setAutoPlay(false);
//     };

//     const handleNext = () => {
//         setCurrentIndex((prev) => (prev + 1) % topAttendees.length);
//         setAutoPlay(false);
//     };

//     const handleDotClick = (index) => {
//         setCurrentIndex(index);
//         setAutoPlay(false);
//     };

//     if (isLoading) {
//         return (
//             <div className="bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-3xl p-8 shadow-xl">
//                 <div className="flex flex-col items-center justify-center py-12">
//                     <div className="w-16 h-16 border-4 border-[#1AA928] border-t-transparent rounded-full animate-spin mb-4"></div>
//                     <p className="text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                         Loading top attendees...
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 shadow-xl">
//                 <div className="flex flex-col items-center justify-center py-12">
//                     <p className="text-red-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                         Failed to load top attendees
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     if (topAttendees.length === 0) {
//         return (
//             <div className="bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-3xl p-8 shadow-xl">
//                 <div className="flex flex-col items-center justify-center py-12">
//                     <Users className="w-16 h-16 text-[#6B6B6B] opacity-50 mb-4" />
//                     <p className="text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                         No attendees data available yet
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-3xl p-6 md:p-8 shadow-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
//             {/* Header */}
//             <div className="text-center mb-6 md:mb-8">
//                 <div className="inline-flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
//                     <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1AA928] to-[#159023] rounded-2xl flex items-center justify-center shadow-lg">
//                         <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
//                     </div>
//                     <h2 className="text-2xl md:text-3xl font-bold text-[#2E3A3D]">
//                         🏆 Top Attendees of the {period === 'week' ? 'Week' : 'Month'}
//                     </h2>
//                 </div>
//                 <p className="text-sm md:text-base text-[#6B6B6B]">
//                     Celebrating our most active community members
//                 </p>
//             </div>

//             {/* Carousel */}
//             <div className="relative max-w-lg mx-auto lg:max-w-2xl">
//                 {/* Navigation Buttons */}
//                 <button
//                     onClick={handlePrevious}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#F5FAF7] transition-all z-20 hover:scale-110"
//                     aria-label="Previous"
//                 >
//                     <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#2E3A3D]" />
//                 </button>

//                 <button
//                     onClick={handleNext}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#F5FAF7] transition-all z-20 hover:scale-110"
//                     aria-label="Next"
//                 >
//                     <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#2E3A3D]" />
//                 </button>

//                 {/* Cards */}
//                 <div className="overflow-hidden">
//                     <div
//                         className="flex transition-transform duration-500 ease-out"
//                         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                     >
//                         {topAttendees.map((attendee, index) => (
//                             <div key={attendee.userId} className="w-full flex-shrink-0">
//                                 <AttendeeCard
//                                     attendee={attendee}
//                                     isActive={index === currentIndex}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Dots Indicator */}
//                 <div className="flex justify-center gap-2 mt-6">
//                     {topAttendees.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => handleDotClick(index)}
//                             className={`h-2 rounded-full transition-all ${index === currentIndex
//                                     ? 'w-8 bg-[#1AA928]'
//                                     : 'w-2 bg-[#6B6B6B]/30 hover:bg-[#6B6B6B]/50'
//                                 }`}
//                             aria-label={`Go to slide ${index + 1}`}
//                         />
//                     ))}
//                 </div>

//                 {/* Auto-play indicator */}
//                 <div className="text-center mt-4">
//                     <button
//                         onClick={() => setAutoPlay(!autoPlay)}
//                         className="text-xs text-[#6B6B6B] hover:text-[#2E3A3D] transition-colors"
//                     >
//                         {autoPlay ? '⏸️ Pause auto-play' : '▶️ Resume auto-play'}
//                     </button>
//                 </div>
//             </div>

//             {/* Period Toggle */}
//             <div className="flex justify-center mt-8">
//                 <div className="inline-flex bg-white rounded-full p-1 shadow-md">
//                     <button
//                         className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${period === 'week'
//                                 ? 'bg-[#1AA928] text-white shadow-md'
//                                 : 'text-[#6B6B6B] hover:text-[#2E3A3D]'
//                             }`}
//                     >
//                         This Week
//                     </button>
//                     <button
//                         className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${period === 'month'
//                                 ? 'bg-[#1AA928] text-white shadow-md'
//                                 : 'text-[#6B6B6B] hover:text-[#2E3A3D]'
//                             }`}
//                     >
//                         This Month
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopAttendeesCarousel;


import { Trophy, Award, Medal, Crown, Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';

// Medal/Trophy component based on rank
// const RankBadge = ({ rank }) => {
//     if (rank === 1) {
//         return (
//             <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10 animate-bounce">
//                 <Crown className="w-6 h-6 text-white" />
//             </div>
//         );
//     } else if (rank === 2) {
//         return (
//             <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white z-10">
//                 <Trophy className="w-5 h-5 text-white" />
//             </div>
//         );
//     } else if (rank === 3) {
//         return (
//             <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-3 border-white z-10">
//                 <Award className="w-5 h-5 text-white" />
//             </div>
//         );
//     } else {
//         return (
//             <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#1AA928] to-[#159023] rounded-full flex items-center justify-center shadow-md border-2 border-white z-10">
//                 <span className="text-white font-bold text-xs">#{rank}</span>
//             </div>
//         );
//     }
// };

// Individual Attendee Card
const AttendeeCard = ({ attendee, isPodium }) => {
    const getRankColor = (rank) => {
        if (rank === 1) return 'from-yellow-50 via-yellow-100 to-yellow-50 border-yellow-300 shadow-yellow-200';
        if (rank === 2) return 'from-gray-50 via-gray-100 to-gray-50 border-gray-300 shadow-gray-200';
        if (rank === 3) return 'from-orange-50 via-orange-100 to-orange-50 border-orange-300 shadow-orange-200';
        return 'from-green-50 via-green-100 to-green-50 border-green-300';
    };

    const getCardScale = (rank) => {
        if (rank === 1) return 'lg:scale-105';
        if (rank === 2) return 'lg:scale-100';
        if (rank === 3) return 'lg:scale-95';
        return 'lg:scale-90';
    };

    return (
        <div
            className={`relative bg-gradient-to-br ${getRankColor(attendee.rank)} rounded-2xl p-4 md:p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${getCardScale(attendee.rank)} ${isPodium ? 'shadow-xl' : 'shadow-lg'
                }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
        >
            {/* <RankBadge rank={attendee.rank} /> */}

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-4">
                <div className="relative mb-3">
                    <img
                        src={attendee.profileImage}
                        alt={attendee.fullName}
                        className={`rounded-full border-4 border-white shadow-lg object-cover ${isPodium ? 'w-20 h-20 md:w-24 md:h-24' : 'w-16 h-16'
                            }`}
                    />
                    {attendee.rank === 1 && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                            {/* <Sparkles className="w-3 h-3" />
                            CHAMPION */}
                        </div>
                    )}
                </div>

                <h3 className={`font-bold text-[#2E3A3D] text-center mb-1 ${isPodium ? 'text-lg md:text-xl' : 'text-base'}`}>
                    {attendee.fullName}
                </h3>
                <p className="text-xs text-[#6B6B6B]">@{attendee.username}</p>
            </div>

            {/* Score Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 mb-3">
                <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Trophy className="w-4 h-4 text-[#1AA928]" />
                        <span className="text-xs font-medium text-[#6B6B6B]">Score</span>
                    </div>
                    <div className={`font-bold bg-gradient-to-r from-[#1AA928] to-[#4BA3F2] bg-clip-text text-transparent ${isPodium ? 'text-3xl md:text-4xl' : 'text-2xl'
                        }`}>
                        {attendee.score}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 text-center">
                        <Calendar className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-700">{attendee.eventsAttended}</div>
                        <div className="text-xs text-blue-600">Events</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 text-center">
                        <TrendingUp className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-purple-700">{attendee.categoriesExplored}</div>
                        <div className="text-xs text-purple-600">Categories</div>
                    </div>
                </div>
            </div>

            {/* Rank Badge */}
            {/* <div className="text-center">
                <div className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <Medal className="w-3 h-3 text-[#1AA928]" />
                    <span className="text-xs font-semibold text-[#2E3A3D]">
                        Rank #{attendee.rank}
                    </span>
                </div>
            </div> */}
        </div>
    );
};

// Main Component - Horizontal Grid Layout
const TopAttendeesCarousel = ({ topAttendees = [], period = 'month', isLoading = false, error = null }) => {
    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-[#1AA928] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Loading top attendees...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-red-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Failed to load top attendees
                    </p>
                </div>
            </div>
        );
    }

    if (topAttendees.length === 0) {
        return (
            <div className="bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col items-center justify-center py-12">
                    <Users className="w-16 h-16 text-[#6B6B6B] opacity-50 mb-4" />
                    <p className="text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        No attendees data available yet
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] rounded-3xl p-6 md:p-8 shadow-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 md:gap-3 mb-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1AA928] to-[#159023] rounded-2xl flex items-center justify-center shadow-lg">
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2E3A3D]">
                        🏆 Top Attendees of the {period === 'week' ? 'Week' : 'Month'}
                    </h2>
                </div>
                <p className="text-sm md:text-base text-[#6B6B6B]">
                    Celebrating our most active community members
                </p>
            </div>

            {/* Horizontal Grid - Top 3 larger, rest smaller */}
            <div className="space-y-4">
                {/* Top 3 - Podium Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {topAttendees.slice(0, 3).map((attendee) => (
                        <AttendeeCard
                            key={attendee.userId}
                            attendee={attendee}
                            isPodium={true}
                        />
                    ))}
                </div>

                {/* Rest - Smaller Cards */}
                {topAttendees.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {topAttendees.slice(3, 5).map((attendee) => (
                            <AttendeeCard
                                key={attendee.userId}
                                attendee={attendee}
                                isPodium={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopAttendeesCarousel;