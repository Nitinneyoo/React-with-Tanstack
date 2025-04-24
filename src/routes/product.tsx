
import { createFileRoute, Link } from "@tanstack/react-router";
import type { FC, MemoExoticComponent } from "react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Types
interface Feature {
  title: string;
  description: string;
}

interface ProductDetails {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  features: Feature[];
  keyFeatures: string[];
  futureImprovements: string[];
}

// Mock API fetch function
const fetchProductData = async (): Promise<ProductDetails> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    name: "Robotics Guard",
    tagline: "The Future of Autonomous Security",
    description:
      "Robotics Guard is an advanced robotic security system designed to provide unparalleled protection and surveillance for homes, offices, and industrial facilities.",
    imageUrl:
      "https://images.pexels.com/photos/19233057/pexels-photo-19233057/free-photo-of-assembling-machines-in-factory.jpeg?auto=compress&cs=tinysrgb&w=600",
    features: [
      {
        title: "Advanced AI",
        description:
          "Powered by cutting-edge artificial intelligence, RoboGuard can detect and analyze potential threats in real-time with 99.9% accuracy.",
      },
      {
        title: "360° Surveillance",
        description:
          "Equipped with high-definition cameras and omnidirectional sensors, RoboGuard provides complete coverage of its surroundings.",
      },
      {
        title: "Autonomous Navigation",
        description:
          "Navigate complex environments effortlessly with advanced pathfinding algorithms and obstacle avoidance technology.",
      },
    ],
    keyFeatures: [
      "Real-time threat detection and alerts",
      "Seamless integration with smart home systems",
      "24/7 cloud-based monitoring and data storage",
      "Customizable patrol routes and schedules",
      "Voice-activated commands and remote control via mobile app",
    ],
    futureImprovements: [
      "Enhanced AI Capabilities: Improved threat detection and decision-making through machine learning.",
      "Extended Battery Life: Next-generation batteries for longer operational times.",
      "Modular Design: Easily upgradable components for enhanced customization.",
      "Swarm Technology: Coordinated operation of multiple RoboGuard units for large-scale deployments.",
      "Improved Durability: Weather-resistant materials and self-diagnostic systems for increased reliability.",
    ],
  };
};

// Animation Component
const AnimatedElement: FC<{
  children: React.ReactNode;
  as: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
}> = ({ children, as: Tag, className = "" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const baseStyles = "transition-all duration-700 ease-out";
  const headingStyles = inView
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";
  const paragraphStyles = inView
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-6";

  const styles =
    Tag === "p" ? `${baseStyles} ${paragraphStyles}` : `${baseStyles} ${headingStyles}`;

  return (
    <Tag
      ref={ref}
      className={`${className} ${styles}`}
    >
      {children}
    </Tag>
  );
};

// Reusable Components
const Header = memo(({ name, tagline }: { name: string; tagline: string }) => (
  <header className="bg-blue-900 text-white py-6">
    <div className="container mx-auto px-4">
      <AnimatedElement as="h1" className="text-3xl font-bold">
        {name}
      </AnimatedElement>
      <AnimatedElement as="p" className="mt-2 text-lg">
        {tagline}
      </AnimatedElement>
    </div>
  </header>
));

const HeroSection = memo(
  ({
    name,
    description,
    imageUrl,
  }: {
    name: string;
    description: string;
    imageUrl: string;
  }) => (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <AnimatedElement as="h2" className="text-4xl font-bold text-gray-800">
            Meet {name}
          </AnimatedElement>
          <AnimatedElement as="p" className="mt-4 text-gray-600 leading-relaxed">
            {description}
          </AnimatedElement>
          <Link
            to="/about"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            aria-label="Learn More About RoboGuard"
          >
            Explore Features
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src={imageUrl} alt={name} className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  )
);

const FeatureCard = memo(
  ({ title, description, index }: Feature & { index: number }) => (
    <div
      className="bg-white p-6 rounded-lg shadow-md"
      aria-labelledby={`feature-${index}`}
    >
      <AnimatedElement
        as="h4"
        className="text-xl font-semibold text-gray-800"
        id={`feature-${index}`}
      >
        {title}
      </AnimatedElement>
      <AnimatedElement as="p" className="mt-2 text-gray-600">
        {description}
      </AnimatedElement>
    </div>
  )
) as MemoExoticComponent<FC<Feature & { index: number }>>;

const ProductDetailsSection = memo(({ features }: { features: Feature[] }) => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <AnimatedElement as="h3" className="text-3xl font-bold text-center text-gray-800 mb-8">
        Product Details
      </AnimatedElement>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </div>
  </section>
));

const KeyFeaturesSection = memo(
  ({ keyFeatures }: { keyFeatures: string[] }) => (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement as="h3" className="text-3xl font-bold text-center text-gray-800 mb-8">
          Key Features
        </AnimatedElement>
        <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-2xl mx-auto">
          {keyFeatures.map((feature, index) => (
            <li key={index}>
              <AnimatedElement as="p" className="text-gray-600">
                {feature}
              </AnimatedElement>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
);

const FutureImprovementsSection = memo(
  ({ futureImprovements }: { futureImprovements: string[] }) => (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedElement as="h3" className="text-3xl font-bold text-center text-gray-800 mb-8">
          Future Improvements
        </AnimatedElement>
        <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-2xl mx-auto">
          {futureImprovements.map((improvement, index) => (
            <li key={index}>
              <AnimatedElement as="p" className="text-gray-600">
                {improvement}
              </AnimatedElement>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
);

// Loading Spinner Component
const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
  </div>
);

// Main Component
const ProductPage: FC = () => {
  const { data, isLoading, error } = useQuery<ProductDetails, Error>({
    queryKey: ["productData"],
    queryFn: fetchProductData,
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
        imageUrl={data.imageUrl}
      />
      <ProductDetailsSection features={data.features} />
      <KeyFeaturesSection keyFeatures={data.keyFeatures} />
      <FutureImprovementsSection futureImprovements={data.futureImprovements} />
    </div>
  );
};

// Route Definition
export const Route = createFileRoute("/product")({
  component: ProductPage,
});

export default ProductPage;
