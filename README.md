
# Live Weather Toronto
## TechVision Company(imaginary)


Hosting Link: [https://liveweathertoronto.vercel.app/]


A modern, responsive website for Techvision Inc., a Toronto-based IT consulting firm. This project showcases a professional web presence with real-time features like current date/time display and weather information.

## ✨ Features

- **Real-time Toronto Date/Time Display:** Updates every second with correct timezone
- **Live Weather Information:** Shows current weather conditions in Toronto
- **Responsive Design:** Works seamlessly on all device sizes
- **Content Sections:**
  - About Us
  - Our Services
  - Our Customers
- **Modern UI:** Clean, professional interface with animations and visual feedback
- **Comprehensive Testing:** Over 50% code coverage with unit tests
- **CI/CD Pipeline:** Automated testing and deployment to Vercel

## 🛠️ Technologies

| Component | Technology |
|-----------|------------|
| Frontend Framework | Next.js 14 |
| UI Library | React 18 |
| Styling | Tailwind CSS |
| Programming Language | TypeScript |
| Testing Framework | Jest + React Testing Library |
| CI/CD | Travis CI |
| API Integration | OpenWeatherMap API |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/company-website.git
   cd company-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   \`\`\`
   OPENWEATHER_API_KEY=your_api_key_here
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

\`\`\`
company-website/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── weather/      # Weather API endpoint
│   ├── tests/            # Unit tests
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── about-us.tsx      # About Us section
│   ├── our-services.tsx  # Services section
│   ├── our-customers.tsx # Customers section
│   └── weather-display.tsx # Weather display component
├── public/               # Static files
├── .github/              # GitHub Actions configuration
├── .travis.yml           # Travis CI configuration
├── jest.config.js        # Jest configuration
└── tailwind.config.ts    # Tailwind CSS configuration
\`\`\`

## 🧪 Testing

The project includes comprehensive tests using Jest and React Testing Library. The tests cover component rendering, API calls, state management, and user interactions.

### Running Tests

\`\`\`bash
# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
\`\`\`

### Test Coverage

The project maintains at least 50% code coverage, focusing on key functionality like:
- Weather data fetching and display
- Date/time formatting and updates
- Component rendering and interactions
- API endpoints

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

The layout adjusts based on screen size, ensuring a great user experience on all devices.

## 🔄 CI/CD Pipeline with Travis CI

The project uses Travis CI for continuous integration and deployment to Vercel:

1. **Automated Testing:** Every commit runs all tests in a headless browser
2. **Code Coverage:** Coverage reports are generated and tracked
3. **Automated Deployment:** Successful test runs on the main branch trigger automatic deployment to Vercel

### Travis CI Configuration

The `.travis.yml` file is configured to:
- Run tests in a headless Chrome browser
- Deploy to Vercel when tests pass on the main branch
- Use secure environment variables for Vercel authentication

## 🚀 Vercel Deployment

### Configuration for Vercel

1. Create a Vercel account and link your GitHub repository
2. Set up environment variables in the Vercel dashboard:
   - Add `OPENWEATHER_API_KEY` with your API key value

### Manual Deployment

1. Install Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. Login to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. Deploy to Vercel:
   \`\`\`bash
   vercel
   \`\`\`

4. For production deployment:
   \`\`\`bash
   vercel --prod
   \`\`\`

## 🌐 Vercel Features

- **Fast Content Delivery:** Global CDN ensures your site loads quickly worldwide
- **Free SSL Certificate:** Automatic HTTPS for secure connections
- **Custom Domains:** Connect your own domain name
- **Preview Deployments:** Every pull request gets its own preview URL
- **Analytics:** Built-in analytics to track performance and usage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [OpenWeatherMap API](https://openweathermap.org/) for weather data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Lucide Icons](https://lucide.dev/) for the icon set
