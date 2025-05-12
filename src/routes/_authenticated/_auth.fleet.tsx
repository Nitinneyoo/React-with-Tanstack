import { createFileRoute, Link } from "@tanstack/react-router";
import type { FC } from "react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";

// Types
interface AboutData {
  title: string;
  intro: string;
  roboguardRole: string;
  benefits: string[];
  imageUrl: string;
}

// Mock API fetch function
const fetchAboutData = async (): Promise<AboutData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    title: "Industry Robots & Autonomous Security",
    intro:
      "Industrial robots have revolutionized modern industries by automating complex tasks with precision and efficiency. In the realm of security, autonomous robots like Robotics Guard are transforming how facilities are protected, offering real-time surveillance, threat detection, and rapid response without human intervention.",
    roboguardRole:
      "Robotics Gaurd leads the charge in autonomous security, leveraging advanced AI and omnidirectional sensors to provide unparalleled protection for industrial facilities, warehouses, and corporate campuses. Designed to operate in dynamic environments, Robotics Guard integrates seamlessly with existing systems, ensuring robust security with minimal oversight.",
    benefits: [
      "Enhanced Safety: Autonomous robots reduce human exposure to hazardous environments by patrolling high-risk areas.",
      "Cost Efficiency: 24/7 operation without the need for extensive human staff reduces operational costs.",
      "Real-Time Response: AI-driven threat detection enables immediate action, minimizing risks.",
      "Scalability: Swarm technology allows multiple robots to coordinate for large-scale security needs.",
      "Reliability: Weather-resistant designs and self-diagnostic systems ensure consistent performance.",
    ],
    imageUrl:
      "https://images.pexels.com/photos/8566627/pexels-photo-8566627.jpeg?auto=compress&cs=tinysrgb&w=600",
  };
};
    
// Reusable Components
const Header = memo(({ title }: { title: string }) => (
  <header className="bg-blue-900 text-white py-6">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-lg">The Future of Autonomous Security</p>
    </div>
  </header>
));

const IntroSection = memo(
  ({ intro, imageUrl }: { intro: string; imageUrl: string }) => (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">
            The Rise of Autonomous Security
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={imageUrl}
            alt="Industrial Robot"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
);

const RoleSection = memo(({ roboguardRole }: { roboguardRole: string }) => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Robotics Guard Role in Industrial Security
      </h3>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">{roboguardRole}</p>
    </div>
  </section>
));

const BenefitsSection = memo(({ benefits }: { benefits: string[] }) => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Benefits of Autonomous Security
      </h3>
      <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-2xl mx-auto">
        {benefits.map((benefit, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>{benefit}</li>
        ))}
      </ul>
      <div className="text-center mt-8">
        <Link
          to="/product"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          aria-label="Discover Robotics Guard"
        >
          Discover Robotics Guard
        </Link>
      </div>
    </div>
  </section>
));

const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
  </div>
);

// Main Component
const AboutPage: FC = () => {
  const { data, isLoading, error } = useQuery<AboutData, Error>({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
    retry: 2, // Retry failed queries twice
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
      <Header title={data.title} />
      <IntroSection intro={data.intro} imageUrl={data.imageUrl} />
      <RoleSection roboguardRole={data.roboguardRole} />
      <BenefitsSection benefits={data.benefits} />
    </div>
  );
};

// Route Definition
export const Route = createFileRoute("/_authenticated/_auth/fleet")({
  component: AboutPage,
});

export default AboutPage;
