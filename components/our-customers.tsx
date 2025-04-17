export default function OurCustomers() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechNova Inc.",
      quote:
        "TechVision Solutions transformed our IT infrastructure, resulting in a 30% increase in operational efficiency. Their team's expertise and dedication were exceptional throughout the project.",
    },
    {
      name: "Michael Chen",
      company: "Global Finance Partners",
      quote:
        "The cybersecurity solutions implemented by TechVision Solutions have given us peace of mind. Their proactive approach to security has protected us from multiple potential threats.",
    },
    {
      name: "Emily Rodriguez",
      company: "Healthcare Solutions",
      quote:
        "Our custom software development project was delivered on time and exceeded our expectations. The solution has streamlined our patient management process significantly.",
    },
  ]

  const clients = [
    "TechNova Inc.",
    "Global Finance Partners",
    "Healthcare Solutions",
    "Toronto Manufacturing Group",
    "Canadian Retail Association",
    "Ontario Educational Services",
    "Atlantic Logistics",
    "Pacific Media Group",
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Our Customers</h2>
        <p className="mt-2">
          We're proud to work with organizations across various industries, helping them achieve their technology goals
          and business objectives.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Client Testimonials</h3>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="italic text-slate-700">"{testimonial.quote}"</p>
              <div className="mt-3">
                <p className="font-medium text-slate-800">{testimonial.name}</p>
                <p className="text-sm text-slate-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Our Clients</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, index) => (
            <div key={index} className="bg-white p-3 rounded border text-center">
              {client}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
