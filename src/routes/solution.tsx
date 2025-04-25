import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface UseCase {
  title: string;
  scenario: string;
  name: string;
  description: string;
}

interface SolutionDetails {
  industries: string[];
  useCases: UseCase[];
  impact: string[];
}

// Mock Fetch Function
const fetchSolutionData = async (): Promise<SolutionDetails> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    industries: [
      "Residential Security",
      "Corporate Campuses",
      "Industrial Facilities",
      "Public Infrastructure",
      "Event Security",
    ],
    useCases: [
      {
        title: "Nighttime Office Surveillance",
        scenario:
          "RoboGuard autonomously patrols office buildings after hours, detecting unauthorized access and notifying security teams in real-time.",
        name: "Nitin Singh",
        description:
          "I have been using RoboGuard for a few months now, and this is the best product I have ever used. It has changed my life!",
      },
      {
        title: "Warehouse Intrusion Prevention",
        scenario:
          "Detects motion in off-limits areas and activates deterrent alerts to prevent break-ins.",
        name: "Ashwanee Gupta",
        description:"This Robotics Guard is a game-changer for our security operations. The AI capabilities are impressive, and the real-time alerts have made a significant difference in our response times.",
      },

      {
        title: "Public Event Monitoring",
        scenario:
          "Provides real-time surveillance and crowd management during large public events, ensuring safety and security.",
        name: "Ankit Singh",
        description:
          "Robotics Guard has transformed our security operations. The AI capabilities are impressive, and the real-time alerts have made a significant difference in our response times.",
      },
      {
        title: "Residential Neighborhood Patrol",
        scenario:
          "Autonomously patrols residential areas, providing peace of mind to homeowners and deterring potential threats.",
        name: "Shivam Tiwari",
        description:
          "We have been using Robotics Guard for a few months now, and this is the best product I have ever used. It has changed my life!",
      },
      {
        title: "Construction Site Security",
        scenario:
          "Monitors construction sites for unauthorized access and equipment theft, ensuring safety and security.",
        name: "Ravi Kumar",
        description:
          "Our Organization has been using Robotics Guard for a few months now, and this is the best product I have ever used. It has changed my life!",  
      },
    ],
    impact: [
      "Reduced operational security costs by up to 40%",
      "Faster incident response with real-time threat notifications",
      "Higher deterrent rate thanks to visible autonomous patrolling",
      "Improved safety and peace of mind in residential areas",
    ],
  };
};

// Loading Spinner
const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
  </div>
);

// Components
const IndustryList: FC<{ industries: string[] }> = ({ industries }) => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Industries We Serve
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-2xl mx-auto">
        {industries.map((industry, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>{industry}</li>
        ))}
      </ul>
    </div>
  </section>
);

const UseCaseCards: FC<{ useCases: UseCase[] }> = ({ useCases }) => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Use Cases
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {useCases.map((useCase, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800">
              {useCase.title}
            </h4>
            <p className="mt-2 text-gray-600">{useCase.scenario}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ImpactSection: FC<{ impact: string[] }> = ({ impact }) => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Impact
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-2xl mx-auto">
        {impact.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

// Main Component
const SolutionPage: FC = () => {
  const { data, isLoading, error } = useQuery<SolutionDetails, Error>({
    queryKey: ["solutionData"],
    queryFn: fetchSolutionData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-red-600">Error: {error.message}</p>
      </div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">No solution data available</p>
      </div>
    );

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Real-World Solutions</h1>
          <p className="mt-2 text-lg">
            How RoboGuard is transforming safety and security
          </p>
        </div>
      </header>
      <IndustryList industries={data.industries} />
      <UseCaseCards useCases={data.useCases} />
      <ImpactSection impact={data.impact} />
      <div className="text-center py-8">
        <div className="mt-8 container mx-auto px-4 flex justify-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {data.useCases.map((useCase, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center aspect-square p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {useCase.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm">
                          {useCase.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Link
          to="/product"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Back to Product Overview
        </Link>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/solution")({
  component: SolutionPage,
});

export default SolutionPage;
