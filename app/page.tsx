import Link from "next/link";
import { ArrowRight, Users, Code, TrendingUp, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Transform Your Career with Expert Guidance
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Professional recruiting services and cutting-edge development training to help you reach your full potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/recruiting"
                  className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Recruiting Services
                </Link>
                <Link
                  href="/courses"
                  className="bg-secondary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary-600 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  View Courses
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Recruiters</h3>
                      <p className="text-sm text-primary-100">Industry-leading professionals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Real-World Skills</h3>
                      <p className="text-sm text-primary-100">Practical development training</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Career Growth</h3>
                      <p className="text-sm text-primary-100">Accelerate your success</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CG?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We combine recruiting expertise with development education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional Recruiting</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connect with top employers and find your dream role. Our expert recruiters match your skills with perfect opportunities.
              </p>
              <Link href="/recruiting" className="text-primary-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-secondary-100 dark:bg-secondary-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Development Courses</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master modern development skills with hands-on courses taught by industry professionals.
              </p>
              <Link href="/courses" className="text-secondary-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Career Advancement</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get personalized guidance to accelerate your career growth and achieve your professional goals.
              </p>
              <Link href="/recruiting" className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of professionals who have advanced their careers with CG Recruiting & Development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recruiting"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
            >
              Find Your Next Role
            </Link>
            <Link
              href="/courses"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Start Learning Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
