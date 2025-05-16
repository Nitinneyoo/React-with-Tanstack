import { createFileRoute, Link } from "@tanstack/react-router";
import type { FC } from "react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Types
interface HomeData {
  name: string;
  tagline: string;
  description: string;
  heroImageUrl: string;
  keyFeature: string;
}

// Mock API fetch function
const fetchHomeData = async (): Promise<HomeData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    name: "Anscer Robotics",
    tagline: "The Future of Autonomous Security",
    description:
      "Discover Anscer Robotics, the cutting-edge robotic security system designed to protect homes, offices, and industrial facilities with unparalleled intelligence and precision.",
    heroImageUrl:
      "https://images.pexels.com/photos/9242858/pexels-photo-9242858.jpeg?auto=compress&cs=tinysrgb&w=600",
    keyFeature: "Real-time threat detection with 99.9% accuracy",
  };
};

// Animation Component
const HomeAnimatedElement: FC<{
  as: "h1" | "h2" | "h3" | "p" | "img";
  className?: string;
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}> = ({ as, className = "", children, src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const baseStyles = "transition-all ease-out";
  const headingStyles = inView ? "opacity-100 scale-100" : "opacity-0 scale-90";
  const paragraphStyles = inView
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";
  const imageStyles = inView
    ? "opacity-100 scale-100 translate-y-0"
    : "opacity-0 scale-95 translate-y-4";

  const styles =
    as === "p"
      ? `${baseStyles} duration-800 ${paragraphStyles}`
      : as === "img"
        ? `${baseStyles} duration-800 ${imageStyles}`
        : `${baseStyles} duration-600 ${headingStyles}`;

  if (as === "img") {
    if (!src || !alt) return null;
    return (
      <img ref={ref} src={src} alt={alt} className={`${className} ${styles}`} />
    );
  }

  return (
    <as ref={ref} className={`${className} ${styles}`}>
      {children}
    </as>
  );
};

// Reusable Components
const Header = memo(({ name, tagline }: { name: string; tagline: string }) => (
  <header className="bg-blue-900 text-white py-6">
    <div className="container mx-auto px-2 sm:px-6 flex flex-col mt-2">
      <HomeAnimatedElement as="h1" className="text-3xl sm:text-4xl font-bold">
        {name}
      </HomeAnimatedElement>
      <HomeAnimatedElement as="p" className="mt-2 text-lg sm:text-xl">
        {tagline}
      </HomeAnimatedElement>
    </div>
  </header>
));

const HeroSection = memo(
  ({
    name,
    description,
    heroImageUrl,
  }: {
    name: string;
    description: string;
    heroImageUrl: string;
  }) => (
    <section className="bg-primary-foreground py-12 sm:py-16 sm:mb-12 min-h-fit">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <HomeAnimatedElement
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-gray-800 flex"
          >
            Welcome to {name}
          </HomeAnimatedElement>
          <HomeAnimatedElement
            as="p"
            className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed flex"
          >
            {description}
          </HomeAnimatedElement>
          <Link
            to="/about"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
            aria-label="Learn More About Anscer Robotics"
          >
            Learn More
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative group overflow-hidden">
            <HomeAnimatedElement
              as="img"
              src={heroImageUrl}
              alt={name}
              className="rounded-lg shadow-md w-full max-h-96 object-cover group-hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  )
);

const FeatureTeaser = memo(({ keyFeature }: { keyFeature: string }) => (
  <section className="py-12 sm:py-16 bg-primary-foreground mb-4 sm:mb-12 min-h-fit">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <HomeAnimatedElement
        as="h3"
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center"
      >
        Why Choose Anscer Robotics?
      </HomeAnimatedElement>
      <HomeAnimatedElement
        as="p"
        className="text-base sm:text-lg text-gray-600 flex items-center justify-center"
      >
        {keyFeature}
      </HomeAnimatedElement>
      <Link
        to="/about"
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
        aria-label="Explore All Features"
      >
        Explore All Features
      </Link>
    </div>
  </section>
));

const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen bg-primary-foreground">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
  </div>
);

// Main Component
const HomePage: FC = () => {
  const { data, isLoading, error } = useQuery<HomeData, Error>({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .transition-all {
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}
      </style>
      <Header name={data.name} tagline={data.tagline} />
      <HeroSection
        name={data.name}
        description={data.description}
        heroImageUrl={data.heroImageUrl}
      />
      <FeatureTeaser keyFeature={data.keyFeature} />

      {/* About Robots */}
      <section className="py-12 sm:py-16 bg-white mb-4 sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              About Robots
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed flex"
            >
              Robots are advanced machines engineered to perform tasks with
              precision and efficiency. Systems like Anscer Robotics leverage
              cutting-edge AI, sensors, and automation to provide security and
              operational solutions. Industrial robots, including articulated
              robots, automated guided vehicles (AGVs), and pallet lifter
              robots, transform manufacturing, logistics, and security by
              automating repetitive tasks, enhancing safety, and improving
              productivity across various sectors.
            </HomeAnimatedElement>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Industrial robotic arm in action"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* How Robotics Industry Works */}
      <section className="py-12 sm:py-16 bg-gray-50 mb-4 sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              How Robotics Industry Works
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed flex"
            >
              The robotics industry integrates engineering, AI, and software to
              create intelligent machines. It involves research, design,
              manufacturing, and deployment of robots tailored to specific
              needs, such as security systems like Anscer Robotics. Companies
              collaborate with system integrators to embed robots into
              operational workflows, using IoT and data analytics for seamless
              performance. Continuous innovation in machine learning and sensor
              technology drives the industry, enabling robots to handle complex
              tasks autonomously.
            </HomeAnimatedElement>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Robotics manufacturing lab"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* How Robotics Security Works */}
      <section className="py-12 sm:py-16 bg-white sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              How Robotics Security Works
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed flex"
            >
              Robotics security, as exemplified by Anscer Robotics, uses advanced
              sensors (e.g., cameras, LIDAR) and AI to monitor environments in
              real-time. These systems detect threats, such as unauthorized
              access or anomalies, with high accuracy. Secure communication
              protocols and regular software updates protect against cyber
              threats, while autonomous response capabilities ensure rapid
              action. By reducing human exposure to risks, robotic security
              enhances safety in homes, offices, and industrial facilities.
            </HomeAnimatedElement>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://robotnik.eu/wp-content/uploads/2023/06/RB-WATCHER_ROBOTNIK_2-scaled.jpg"
                alt="Security robot patrolling"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* How Robots Can Help Us */}
      <section className="py-10 sm:py-16 bg-gray-50  sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              How Robots Can Help Us
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 flex"
            >
              Robots like Anscer Robotics revolutionize security and efficiency.
              They automate surveillance, reduce operational costs, and enhance
              safety by handling dangerous tasks. In broader applications,
              robots streamline manufacturing, optimize logistics, and support
              healthcare, minimizing errors and worker injuries. By integrating
              with smart systems, robots promote sustainability and drive
              innovation, augmenting human capabilities to create safer, more
              productive environments.
            </HomeAnimatedElement>
            <Link
              to="/about"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
              aria-label="Learn More About Robotics"
            >
              Learn More
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Collaborative robots in industry"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Route Definition
export const Route = createFileRoute("/")({
  component: HomePage,
});

export default HomePage;
