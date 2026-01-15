import { Target, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About CG Recruiting & Development</h1>
          <p className="text-xl text-primary-100">
            Empowering careers through expert recruiting and world-class development training since 2020.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                At CG Recruiting & Development, we believe that everyone deserves access to career opportunities
                and the skills needed to thrive in today's competitive job market.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                We combine professional recruiting services with cutting-edge development training to provide
                a comprehensive career advancement solution.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our team of industry experts is dedicated to helping individuals achieve their professional
                goals and companies find the talent they need to succeed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-700 dark:text-gray-300">Successful Placements</div>
              </div>
              <div className="bg-secondary-50 dark:bg-secondary-900/20 p-6 rounded-xl">
                <div className="text-4xl font-bold text-secondary-600 mb-2">2,000+</div>
                <div className="text-gray-700 dark:text-gray-300">Students Trained</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-700 dark:text-gray-300">Partner Companies</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-700 dark:text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive for excellence in everything we do, from candidate placement to course delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 dark:bg-secondary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building a supportive community of professionals who help each other grow.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Honest, transparent relationships built on trust and mutual respect.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous learning and development for sustained career success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Industry professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Recruiting Specialists</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our recruiting team has decades of combined experience placing candidates in top companies
                across various industries.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Development Instructors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn from developers who have worked at leading tech companies and built real-world
                applications used by millions.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Career Coaches</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our coaches provide personalized guidance to help you navigate your career path and
                achieve your professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
