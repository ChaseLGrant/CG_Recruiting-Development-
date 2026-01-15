import Link from "next/link";
import { CheckCircle, Code, Database, Smartphone, Cloud, Globe, Shield, Users } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      title: "Full Stack Web Development",
      price: "$499",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      icon: Globe,
      description: "Master modern web development with React, Node.js, and TypeScript",
      features: [
        "React & Next.js fundamentals",
        "Node.js & Express backend",
        "TypeScript & modern JavaScript",
        "Database design & integration",
        "RESTful API development",
        "Deployment & DevOps basics",
        "Real-world projects",
        "Career support"
      ],
      popular: true
    },
    {
      title: "Mobile App Development",
      price: "$449",
      duration: "10 weeks",
      level: "Intermediate",
      icon: Smartphone,
      description: "Build native mobile apps with React Native and cross-platform tools",
      features: [
        "React Native fundamentals",
        "iOS & Android development",
        "Mobile UI/UX design",
        "Native modules & APIs",
        "State management",
        "App deployment",
        "Portfolio projects",
        "Mentorship included"
      ]
    },
    {
      title: "Cloud & DevOps Engineering",
      price: "$549",
      duration: "8 weeks",
      level: "Advanced",
      icon: Cloud,
      description: "Learn AWS, Docker, Kubernetes, and modern DevOps practices",
      features: [
        "AWS cloud services",
        "Docker containerization",
        "Kubernetes orchestration",
        "CI/CD pipelines",
        "Infrastructure as Code",
        "Monitoring & logging",
        "Security best practices",
        "Certification prep"
      ]
    },
    {
      title: "Database Engineering",
      price: "$399",
      duration: "6 weeks",
      level: "Intermediate",
      icon: Database,
      description: "Master SQL, NoSQL, and database architecture",
      features: [
        "SQL & PostgreSQL mastery",
        "MongoDB & NoSQL databases",
        "Database design patterns",
        "Query optimization",
        "Data modeling",
        "Scaling strategies",
        "Hands-on projects",
        "Industry practices"
      ]
    },
    {
      title: "Cybersecurity Fundamentals",
      price: "$599",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      icon: Shield,
      description: "Learn security principles, ethical hacking, and threat prevention",
      features: [
        "Security fundamentals",
        "Ethical hacking basics",
        "Network security",
        "Web application security",
        "Penetration testing",
        "Security tools & practices",
        "Compliance & standards",
        "Lab environments"
      ]
    },
    {
      title: "Advanced JavaScript & TypeScript",
      price: "$349",
      duration: "6 weeks",
      level: "Intermediate to Advanced",
      icon: Code,
      description: "Deep dive into modern JavaScript and TypeScript development",
      features: [
        "Advanced JS concepts",
        "TypeScript mastery",
        "Design patterns",
        "Performance optimization",
        "Testing strategies",
        "Build tools & bundlers",
        "Code quality practices",
        "Real-world applications"
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-600 to-primary-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Development Courses</h1>
          <p className="text-xl text-primary-100 mb-8">
            Master in-demand skills with our comprehensive development courses.
            Learn from industry experts and build real-world projects.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">2,000+</div>
              <div className="text-primary-100">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold">15+</div>
              <div className="text-primary-100">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold">98%</div>
              <div className="text-primary-100">Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Courses?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">Hands-On Learning</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Build real projects as you learn
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 dark:bg-secondary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="font-bold mb-2">Expert Mentors</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Learn from industry professionals
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Lifetime Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Access course materials forever
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold mb-2">Certificate</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Earn a verified certificate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Available Courses</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the course that matches your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow ${
                    course.popular ? 'ring-2 ring-secondary-500' : ''
                  }`}
                >
                  {course.popular && (
                    <div className="bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
                      Most Popular
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <div className="text-3xl font-bold text-secondary-600 mb-4">{course.price}</div>

                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span>⏱️ {course.duration}</span>
                    <span>📊 {course.level}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>

                  <ul className="space-y-2 mb-6">
                    {course.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                    {course.features.length > 5 && (
                      <li className="text-sm text-gray-500 dark:text-gray-400">
                        +{course.features.length - 5} more features
                      </li>
                    )}
                  </ul>

                  <Link
                    href={`/checkout?service=${encodeURIComponent(course.title)}&price=${encodeURIComponent(course.price)}&type=course`}
                    className="block w-full text-center py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700"
                  >
                    Enroll Now
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who have transformed their careers through our courses.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
          >
            Get Course Recommendations
          </Link>
        </div>
      </section>
    </div>
  );
}
