import React from "react";
import { TrendingUp, Users, FileText, Star } from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      number: "50K+",
      label: "Active Job Seekers",
      description: "Professionals trust our platform",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      number: "25K+",
      label: "Resumes Created",
      description: "Professional resumes built monthly",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      number: "85%",
      label: "Success Rate",
      description: "Users get interview calls",
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      number: "4.9/5",
      label: "User Rating",
      description: "Based on 10,000+ reviews",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their
            dream jobs using our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {stat.number}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </p>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
