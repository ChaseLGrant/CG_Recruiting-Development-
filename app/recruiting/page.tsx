import Link from "next/link";
import { CheckCircle, Users, Target, Briefcase, Clock, TrendingUp } from "lucide-react";

export default function Recruiting() {
  const services = [
    {
      title: "Executive Search",
      price: "$2,500",
      description: "Premium placement services for senior leadership roles",
      features: [
        "Dedicated account manager",
        "Extensive candidate screening",
        "Interview coaching",
        "Salary negotiation support",
        "90-day placement guarantee",
        "Unlimited revisions"
      ]
    },
    {
      title: "Professional Placement",
      price: "$1,500",
      description: "Expert recruitment for mid-level professionals",
      features: [
        "Personalized job matching",
        "Resume optimization",
        "Interview preparation",
        "Salary guidance",
        "60-day placement guarantee",
        "Career consultation"
      ],
      popular: true
    },
    {
      title: "Entry Level",
      price: "$750",
      description: "Launch your career with expert guidance",
      features: [
        "Job search assistance",
        "Resume review",
        "Basic interview prep",
        "Entry-level job matching",
        "30-day support",
        "Career advice"
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Professional Recruiting Services</h1>
          <p className="text-xl text-primary-100 mb-8">
            Connect with your dream job through our expert recruiting services.
            We match talented professionals with leading companies.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-primary-100">Successful Placements</div>
            </div>
            <div>
              <div className="text-4xl font-bold">150+</div>
              <div className="text-primary-100">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold">95%</div>
              <div className="text-primary-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">1. Initial Consultation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We learn about your skills, experience, and career goals
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">2. Job Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We identify positions that align with your profile
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">3. Interview Prep</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get ready to impress with our coaching services
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">4. Get Hired</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start your new role with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Invest in your career with our professional recruiting services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 ${
                  service.popular ? 'ring-4 ring-primary-500 relative' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="text-4xl font-bold text-primary-600 mb-4">{service.price}</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/checkout?service=${encodeURIComponent(service.title)}&price=${encodeURIComponent(service.price)}`}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                    service.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Job?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Let our expert recruiters help you land the perfect role. Get started today!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
