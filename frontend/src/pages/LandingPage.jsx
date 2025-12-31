import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events';
import { Calendar, ArrowRight, Sparkles, MapPin, Clock, Search, Heart, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: events = [] } = useQuery({
    queryKey: ['events', 'All Events'],
    queryFn: () => getEvents('All Events'),
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredEvents = events.slice(0, 3);

  // Promotional banners - can be fetched from API or hardcoded
  const promoSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop',
      title: 'Summer Festival 2025',
      subtitle: 'Join the biggest community celebration',
      ctaText: 'Learn More',
      ctaAction: () => navigate('/events')
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=400&fit=crop',
      title: 'Volunteer Programs',
      subtitle: 'Make a difference in your community',
      ctaText: 'Get Involved',
      ctaAction: () => navigate('/events')
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=400&fit=crop',
      title: 'Workshop Series',
      subtitle: 'Learn new skills and meet new people',
      ctaText: 'View Schedule',
      ctaAction: () => navigate('/events')
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [promoSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  };

  const features = [
    {
      icon: Search,
      label: 'Browse Freely',
      description: 'No login needed to explore events',
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: Heart,
      label: 'Find Your Passion',
      description: 'Events tailored for your interests',
      color: 'bg-pink-500',
      gradient: 'from-pink-400 to-pink-600'
    },
    {
      icon: Users,
      label: 'Join Community',
      description: 'Connect with like-minded locals',
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600'
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        .stagger-5 { animation-delay: 0.5s; opacity: 0; }

        .gradient-text {
          background: linear-gradient(135deg, #1AA928, #15861F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .shine {
          position: relative;
          overflow: hidden;
        }

        .shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .shine:hover::before {
          left: 100%;
        }

        .feature-card {
          position: relative;
          overflow: hidden;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover::after {
          opacity: 1;
        }

        .promo-slide {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* <div className="flex justify-center mb-6">
                <Sparkles className="w-12 h-12 text-[#1AA928] animate-float" />
              </div> */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Discover Amazing
                <span className="gradient-text block mt-2">Local Events</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Join your community in exciting events, workshops, and activities.
                Connect with like-minded people and create memorable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/events')}
                  className="btn btn-lg bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F] shine px-8"
                >
                  Browse Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn btn-lg btn-outline text-[#1AA928] border-[#1AA928] hover:bg-[#1AA928] hover:text-white px-8"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Promotional Banner Carousel */}
      <section className={`py-8 px-4 bg-gray-100 ${isVisible ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
        <div className="container mx-auto max-w-9xl">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Slides */}
            {promoSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`promo-slide ${index === currentSlide ? 'block' : 'hidden'}`}
              >
                <div className="relative h-96 md:h-[700px]">
                  {/* Background Image with Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-8 md:px-16">
                      <div className="max-w-2xl animate-slide-in">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                          {slide.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-white mb-8 opacity-90">
                          {slide.subtitle}
                        </p>
                        <button
                          onClick={slide.ctaAction}
                          className="btn btn-lg bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F] shine px-8"
                        >
                          {slide.ctaText}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle bg-white/20 hover:bg-white/40 border-none backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle bg-white/20 hover:bg-white/40 border-none backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {promoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Replaced Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Local Space?</h2>
            <p className="text-lg text-gray-600">Experience the best way to discover and join local events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className={`card bg-gradient-to-br ${feature.gradient} shadow-xl card-hover feature-card ${isVisible ? 'animate-scale-in' : 'opacity-0'} stagger-${index + 2}`}
                >
                  <div className="card-body items-center text-center text-white">
                    <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4 backdrop-blur-sm">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.label}</h3>
                    <p className="text-white text-opacity-90 text-base">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center ${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
              <div className="bg-[#1AA928] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p className="text-gray-600">Browse events without signing up. Explore what's happening in your community.</p>
            </div>

            <div className={`text-center ${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
              <div className="bg-[#1AA928] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Choose</h3>
              <p className="text-gray-600">Find events that match your interests. Filter by category.</p>
            </div>

            <div className={`text-center ${isVisible ? 'animate-fade-in-up stagger-5' : 'opacity-0'}`}>
              <div className="bg-[#1AA928] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Join</h3>
              <p className="text-gray-600">Quick signup to participate. Start building connections in your community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-xl text-gray-600">Check out what's happening in your community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredEvents.map((event, index) => (
              <div
                key={event._id}
                className={`card bg-base-100 shadow-xl card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-${index + 3}`}
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#1AA928]" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1AA928]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#1AA928]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => navigate('/events')}
                      className="btn btn-sm bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F]"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/events')}
              className="btn btn-lg bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F]"
            >
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#1AA928] to-[#15861F]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join the Community?
            </h2>
            <p className="text-xl text-white mb-8 opacity-90">
              Sign up now and start discovering amazing events in your area
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="btn btn-lg bg-white text-[#1AA928] hover:bg-gray-100 border-white px-8"
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;