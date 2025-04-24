
import { createFileRoute, Link } from "@tanstack/react-router";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Types
interface Feature {
  title: string;
  description: string;
}

interface ProductExtraDetails {
  extendedFeatures: Feature[];
  technologyStack: string[];
  securityProtocols: string[];
}

// Mock fetch function
const fetchProductDetails = async (): Promise<ProductExtraDetails> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    extendedFeatures: [
      {
        title: "AI Threat Classification",
        description:
          "Categorizes threats based on behavior, urgency, and location in real-time.",
      },
      {
        title: "Remote Firmware Updates",
        description:
          "Stay up-to-date with the latest features and patches delivered over-the-air.",
      },
      {
        title: "Secure Data Sync",
        description:
          "Encrypted cloud synchronization to protect user data and system logs.",
      },
    ],
    technologyStack: [
      "Edge AI Processing Units",
      "High-Fidelity LIDAR Sensors",
      "End-to-End Encrypted Communication",
      "React + TypeScript Frontend",
      "Cloud-native Microservices (AWS Lambda)",
    ],
    securityProtocols: [
      "AES-256 Encryption",
      "Zero Trust Architecture",
      "Two-Factor Authentication (2FA)",
      "Intrusion Detection & Logging",
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
    <Tag ref={ref} className={`${className} ${styles}`}>
      {children}
    </Tag>
  );
};

// Loading Spinner
const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
  </div>
);

// Sections
const ExtendedFeatures: FC<{ features: Feature[] }> = ({ features }) => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <AnimatedElement as="h2" className="text-3xl font-bold text-center text-gray-800 mb-8">
        Extended Features
      </AnimatedElement>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
            <AnimatedElement as="h4" className="text-xl font-semibold text-gray-800">
              {feature.title}
            </AnimatedElement>
            <AnimatedElement as="p" className="mt-2 text-gray-600">
              {feature.description}
            </AnimatedElement>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ListSection: FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <AnimatedElement as="h3" className="text-3xl font-bold text-center text-gray-800 mb-8">
        {title}
      </AnimatedElement>
      <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-2xl mx-auto">
        {items.map((item, index) => (
          <li key={index}>
            <AnimatedElement as="p" className="text-gray-600">
              {item}
            </AnimatedElement>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Main Component
const DetailsPage: FC = () => {
  const { data, isLoading, error } = useQuery<ProductExtraDetails, Error>({
    queryKey: ["productExtraDetails"],
    queryFn: fetchProductDetails,
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
        <p className="text-xl text-gray-600">No additional details available</p>
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
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <AnimatedElement as="h1" className="text-3xl font-bold">
            Robotics Guard Details
          </AnimatedElement>
          <AnimatedElement as="p" className="mt-2 text-lg">
            Dig deeper into the tech that powers Robotics Guard
          </AnimatedElement>
        </div>
      </header>
      <ExtendedFeatures features={data.extendedFeatures} />
      <ListSection title="Technology Stack" items={data.technologyStack} />
      <ListSection title="Security Protocols" items={data.securityProtocols} />
      <div className="text-center py-8">
        <Link
          to="/product"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Overview
        </Link>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/details")({
  component: DetailsPage,
});

export default DetailsPage;