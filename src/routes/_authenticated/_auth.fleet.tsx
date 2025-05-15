
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import type { FC } from "react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth";

// Types
interface FleetData {
  title: string;
  intro: string;
  roboguardRole: string;
  benefits: string[];
  imageUrl: string;
}

// Mock API fetch function
const fetchFleetData = async (): Promise<FleetData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    title: "Autonomous Robot Fleets for Next-Gen Security",
    intro:
      "Fleets of autonomous security robots redefine protection for industrial complexes, data centers, and logistics hubs through decentralized control and intelligent task management. Operating as a networked system, these robots dynamically adapt to environmental changes, ensuring resilient and flexible security coverage across diverse operational landscapes.",
    roboguardRole:
      "Robotics Guard's autonomous fleets are engineered for adaptive security, utilizing real-time analytics and modular task allocation to manage complex operations. Each robot in the fleet processes environmental data independently, enabling decentralized decision-making that optimizes patrol routes, prioritizes alerts, and integrates with central command systems. This approach ensures high responsiveness and tailored security for facilities of any scale.",
    benefits: [
      "Dynamic Rerouting: Robots adjust patrol paths in real-time to address emerging threats or obstacles.",
      "Predictive Maintenance: Built-in diagnostics anticipate and schedule maintenance, minimizing downtime.",
      "Energy Optimization: Intelligent power management extends operational hours across the fleet.",
      "Customizable Operations: Modular configurations allow fleets to adapt to specific security protocols.",
      "Data-Driven Insights: Aggregated analytics provide actionable intelligence for security enhancements.",
    ],
    imageUrl:
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600",
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
            alt="Fleet of Robots"
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
        Robotics Guard Role in Fleet-Based Security
      </h3>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">{roboguardRole}</p>
    </div>
  </section>
));

const BenefitsSection = memo(({ benefits }: { benefits: string[] }) => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Benefits of Fleet-Based Security
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
const FleetPage: FC = () => {
  const { data, isLoading, error } = useQuery<FleetData, Error>({
    queryKey: ["FleetData"],
    queryFn: fetchFleetData,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
    retry: 2, // Retry failed queries twice
  });

  const {user} = useAuth ();
  const router = useRouter()

  if (!user) {
    router.navigate({ to: "/login" });
    return null;
  }


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
  component: FleetPage,
});

export default FleetPage;
