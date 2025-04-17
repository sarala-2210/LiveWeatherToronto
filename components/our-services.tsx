import { Zap, Code, Cloud, Shield, BarChart3, Server } from "lucide-react"

export default function OurServices() {
  const services = [
    {
      title: "Strategic IT Consulting",
      description: "Align your technology investments with business goals through our strategic consulting services.",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed to address your unique business challenges.",
      icon: <Code className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Cloud Migration & Management",
      description: "Seamless transition to cloud platforms with ongoing optimization and management.",
      icon: <Cloud className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Cybersecurity Solutions",
      description: "Comprehensive security services to protect your digital assets and ensure compliance.",
      icon: <Shield className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Data Analytics & Business Intelligence",
      description: "Transform your data into actionable insights that drive business decisions.",
      icon: <BarChart3 className="h-5 w-5 text-red-500" />,
      color: "bg-red-50 border-red-200",
    },
    {
      title: "IT Infrastructure Optimization",
      description: "Modernize your infrastructure to improve performance, reliability, and cost-efficiency.",
      icon: <Server className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-200",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-800">Our Services</h2>
        <p className="mt-2 text-blue-600">
          TechVision Solutions offers a comprehensive range of IT consulting services designed to help businesses
          leverage technology for growth and competitive advantage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 hover:shadow-md transition-all transform hover:-translate-y-1 ${service.color}`}
          >
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full mr-3 shadow-sm">{service.icon}</div>
              <div>
                <h3 className="font-semibold text-blue-900">{service.title}</h3>
                <p className="text-sm text-blue-700 mt-1">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
