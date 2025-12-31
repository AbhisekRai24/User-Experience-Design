import { Users, Target, Heart, Award, MapPin, Mail, Phone } from 'lucide-react';

const AboutUs = () => {
  // const stats = [
  //   { number: '500+', label: 'Community Events' },
  //   { number: '10K+', label: 'Active Members' },
  //   { number: '50+', label: 'Local Partners' },
  //   { number: '100%', label: 'Free to Join' }
  // ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe in the power of community and bringing people together through meaningful events and experiences.',
      color: '#57C478'
    },
    {
      icon: Target,
      title: 'Inclusive & Accessible',
      description: 'Everyone deserves to participate. We ensure all our events are welcoming and accessible to all community members.',
      color: '#4BA3F2'
    },
    {
      icon: Award,
      title: 'Quality Experiences',
      description: 'We partner with local organizers to deliver high-quality events that enrich our community and create lasting memories.',
      color: '#1AA928'
    },
    {
      icon: Users,
      title: 'Local Impact',
      description: 'Every event supports local businesses and strengthens neighborhood connections, creating positive change from within.',
      color: '#6B6B6B'
    }
  ];

  // const teamMembers = [
  //   {
  //     name: 'Sarah Johnson',
  //     role: 'Founder & CEO',
  //     image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=57C478&color=fff&size=200',
  //     bio: 'Passionate about building stronger communities'
  //   },
  //   {
  //     name: 'Michael Chen',
  //     role: 'Head of Operations',
  //     image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=4BA3F2&color=fff&size=200',
  //     bio: 'Ensuring smooth event experiences for all'
  //   },
  //   {
  //     name: 'Emily Rodriguez',
  //     role: 'Community Manager',
  //     image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=1AA928&color=fff&size=200',
  //     bio: 'Connecting people through shared interests'
  //   },
  //   {
  //     name: 'David Kim',
  //     role: 'Technology Lead',
  //     image: 'https://ui-avatars.com/api/?name=David+Kim&background=6B6B6B&color=fff&size=200',
  //     bio: 'Building the platform that brings us together'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1AA928] to-[#15861F] text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl font-bold mb-6">About Local Space</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to bring communities closer together through shared experiences,
            local events, and meaningful connections that make neighborhoods thrive.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="bg-white py-16 shadow-md">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#1AA928] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Our Story Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Local Space was born from a simple observation: in our increasingly digital world,
                people were craving real, meaningful connections with their neighbors and local community.
                We saw an opportunity to bridge this gap by creating a platform that makes it easy to
                discover and participate in local events.
              </p>
              <p>
                What started as a small project in 2023 has grown into a thriving platform connecting
                thousands of community members across neighborhoods. From yoga classes in the park to
                farmers markets, art workshops to music festivals, we've facilitated countless connections
                and created memories that last a lifetime.
              </p>
              <p>
                Today, we continue to expand our reach while staying true to our core mission: making
                local communities more connected, vibrant, and inclusive for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="card-body">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${value.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: value.color }} />
                    </div>
                    <h3 className="card-title text-2xl mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            The passionate people making Local Space possible
          </p>
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="avatar mb-4">
                  <div className="w-48 rounded-full ring ring-[#57C478] ring-offset-base-100 ring-offset-4 mx-auto">
                    <img src={member.image} alt={member.name} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#1AA928] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-gradient-to-r from-[#1AA928] to-[#15861F] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-white/90 mb-8">
            Have questions or want to partner with us? We'd love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:hello@localspace.com"
              className="btn btn-lg bg-white text-[#1AA928] border-none hover:bg-gray-100"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <a
              href="tel:+15551234567"
              className="btn btn-lg bg-white/20 text-white border-white hover:bg-white/30"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>Lalitpur, Nepal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;