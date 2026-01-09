import { Calendar, Users, TrendingUp } from 'lucide-react';

const HeroStats = ({ stats, isVisible }) => {
  return (
    <section className={`mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`card bg-gradient-to-br from-white to-gray-50 shadow-lg hover-lift card-shine stagger-${index + 1} animate-scale-in`}
            >
              <div className="card-body flex-row items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <h3 className="text-4xl font-bold text-[#1AA928] mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className="bg-[#1AA928] bg-opacity-10 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-[#1AA928]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroStats;
