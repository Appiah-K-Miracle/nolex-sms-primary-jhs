
// @ts-nocheck
// cspell:ignore Nolex

import { 
  Book, 
  User, 
  Shield, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Globe,
  School,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  Play,
  Quote,
  Heart,
  Zap,
  Target,
  BarChart3,
  Calendar
} from "lucide-react";
import DashboardCard from "@/components/landing-page/dashboard-card";
import cardData from "@/data/dashboard-cards.json";
import Link from "next/link";

const icons = {
  Shield: <Shield className="w-12 h-12 text-green-600" aria-label="Shield icon" />,
  Book: <Book className="w-12 h-12 text-cyan-600" aria-label="Book icon" />,
  User: <User className="w-12 h-12 text-yellow-500" aria-label="User icon" />,
  Users: <Users className="w-12 h-12 text-purple-500" aria-label="Users icon" />,
};

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your school data is protected with enterprise-grade encryption and security protocols.",
    color: "green"
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Make data-driven decisions with comprehensive reporting and performance insights.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Multi-Role Management",
    description: "Seamlessly manage headmasters, teachers, students, and parents in one platform.",
    color: "purple"
  },
  {
    icon: Globe,
    title: "Cloud-Based Access",
    description: "Access your school management system from anywhere, anytime, on any device.",
    color: "cyan"
  },
  {
    icon: Clock,
    title: "Time-Saving Automation",
    description: "Automate routine tasks and focus on what matters most - education excellence.",
    color: "orange"
  },
  {
    icon: Award,
    title: "Academic Excellence",
    description: "Track student progress, manage curricula, and ensure educational quality standards.",
    color: "indigo"
  }
];

const testimonials = [
  {
    quote: "Nolex SMS transformed how we manage our school. The efficiency gains have been remarkable, and parents love the transparency.",
    author: "Dr. Sarah Johnson",
    role: "Headmaster",
    school: "Greenfield Primary School",
    rating: 5
  },
  {
    quote: "As a teacher, I can now focus more on teaching and less on paperwork. The grade management system is intuitive and powerful.",
    author: "Mr. Emmanuel Asante",
    role: "Mathematics Teacher",
    school: "Royal Academy JHS",
    rating: 5
  },
  {
    quote: "The parent portal keeps me connected with my child's education journey. I always know how she's progressing in real-time.",
    author: "Mrs. Akosua Mensah",
    role: "Parent",
    school: "Excellence International School",
    rating: 5
  }
];

const stats = [
  { number: "500+", label: "Schools Trust Us", icon: School },
  { number: "50K+", label: "Active Students", icon: Users },
  { number: "5K+", label: "Dedicated Teachers", icon: User },
  { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Accessibility: Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-white text-green-700 px-4 py-2 rounded shadow-lg">
        Skip to main content
      </a>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-20 left-20 text-white/10 animate-float">
            <School className="w-16 h-16" />
          </div>
          <div className="absolute bottom-20 right-20 text-white/10 animate-float delay-1000">
            <Book className="w-12 h-12" />
          </div>
          <div className="absolute top-40 right-40 text-white/10 animate-float delay-500">
            <Users className="w-14 h-14" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="text-center text-white">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl text-white px-8 py-4 rounded-full text-sm font-semibold mb-12 border border-white/20 shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Sparkles className="w-5 h-5 text-green-300" />
              <span>Trusted by 500+ Educational Institutions Worldwide</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Main Heading with Better Typography */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight">
              <span className="block text-white drop-shadow-lg">Revolutionize</span>
              <span className="block bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                School Excellence
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <div className="max-w-4xl mx-auto mb-16">
              <p className="text-2xl sm:text-3xl text-green-50 mb-6 leading-relaxed font-light">
                Transform education with <span className="font-bold text-white">Nolex SMS</span> - 
                the next-generation platform for Primary and J.H.S institutions
              </p>
              <p className="text-lg text-green-200 max-w-2xl mx-auto">
                Streamline operations • Enhance communication • Boost academic performance
              </p>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link href="/login" className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-3 text-lg">
                <span>Start Free Trial</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
              </Link>
              <button className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold py-5 px-10 rounded-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-1 flex items-center gap-3 text-lg shadow-2xl">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 transform hover:-translate-y-2 border border-white/10 hover:border-white/20">
                    <div className="bg-gradient-to-br from-green-400 to-cyan-400 p-4 rounded-xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                    <div className="text-green-200 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-12 border-2 border-white/30 rounded-full flex justify-center animate-bounce">
              <div className="w-1 h-4 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Dashboard Cards Section */}
      <section id="main-content" className="py-32 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Target className="w-4 h-4" />
              Role-Based Access
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Choose Your
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience tailored interfaces designed specifically for your role. 
              Each dashboard provides the exact tools and insights you need to excel.
            </p>
          </div>

          {/* Premium Dashboard Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {cardData.map((card, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform scale-105"></div>
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-green-200 overflow-hidden">
                  {/* Card Header with Gradient */}
                  <div className={`p-8 bg-gradient-to-br ${
                    index === 0 ? 'from-green-500 to-green-600' :
                    index === 1 ? 'from-cyan-500 to-cyan-600' :
                    index === 2 ? 'from-yellow-500 to-orange-500' :
                    'from-purple-500 to-purple-600'
                  } text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                        {icons[card.icon]}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                      <p className="text-white/90 leading-relaxed">{card.description}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {card.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enhanced CTA */}
                    <Link 
                      href={card.href} 
                      className={`group/cta w-full bg-gradient-to-r ${
                        index === 0 ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                        index === 1 ? 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700' :
                        index === 2 ? 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' :
                        'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                      } text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl`}
                    >
                      <span>Access Dashboard</span>
                      <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Trust Section */}
          <div className="text-center mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Secure & Reliable</div>
                    <div className="text-sm text-gray-600">Enterprise-grade security</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Award Winning</div>
                    <div className="text-sm text-gray-600">Recognized excellence</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">24/7 Support</div>
                    <div className="text-sm text-gray-600">Always here to help</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Schools Choose Nolex SMS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make Nolex SMS the preferred choice 
              for educational institutions across Ghana and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Educators Nationwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what headmasters, teachers, and parents are saying about their experience with Nolex SMS.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-green-600 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="border-t border-green-200 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-green-600 font-medium">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-blue-600/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <School className="w-16 h-16 text-white mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-green-100 mb-10 leading-relaxed">
            Join hundreds of schools already using Nolex SMS to streamline operations, 
            improve communication, and enhance educational outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="bg-white hover:bg-gray-100 text-green-700 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-3">
              Schedule Demo
              <Calendar className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/20 rounded-full animate-bounce"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <School className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold">Nolex SMS</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering educational institutions with comprehensive school management solutions 
                that drive academic excellence and operational efficiency.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400">Made with love for education in Ghana</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-green-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-green-400 transition-colors">Request Demo</Link></li>
                <li><Link href="/support" className="hover:text-green-400 transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@nolexsms.com</li>
                <li>📞 +233 XX XXX XXXX</li>
                <li>📍 Accra, Ghana</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} <span className="font-semibold text-green-400">Nolex SMS</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
