'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { initializeWeb3Auth } from '../../../lib/web3auth';
import MintAchievement from '../../../components/Mint';
import { uploadImageAndMetadataToIPFS } from '../../../lib/ipfs';

// Types pour MintAchievement
interface MintProps {
  challengeId: number;
  wallet: any;
  imageFile: File;
  metadata: any;
}

// Props de ChallengeContent
interface ChallengeContentProps {
  type: 'text' | 'image' | 'video' | 'button';
  content: string;
}

const challenges = [
  {
    id: 1,
    title: "Water Quality Basics",
    description: "Learn the fundamentals of water quality testing",
    content: [
      { type: "text" as const, content: "Welcome to Water Quality Basics. In this challenge, you'll learn how to test water quality effectively." },
      { type: "image" as const, content: "/images/water-testing.jpg" },
      { type: "text" as const, content: "Congratulations! You've successfully completed the Water Quality Basics challenge. You've learned valuable skills in water quality testing and analysis." },
      { type: "button" as const, content: "Mint Achievement NFT" }
    ]
  },
  // Ajoutez d'autres challenges si nécessaire
];

interface Challenge {
  id: number;
  title: string;
  description: string;
  content: ChallengeContentProps[];
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [challenge, setChallenge] = React.useState<Challenge | null>(null);
  const wallet = initializeWeb3Auth();

  React.useEffect(() => {
    const challengeData = challenges.find(c => c.id === parseInt(params.id));
    if (!challengeData) {
      console.warn(`Challenge with id ${params.id} not found`);
      router.push('/challenges');
      return;
    }
    setChallenge(challengeData);
  }, [params.id, router]);

  if (!challenge) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b p-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Button>
        <h1 className="text-2xl font-bold mt-2">{challenge.title}</h1>
      </div>

      <div className="flex-1 p-6 flex items-center justify-center">
        <ChallengeContent 
          {...challenge.content[currentPage]} 
          challengeId={challenge.id}
          wallet={wallet}
          imageFile={new File(["sample"], "sample.jpg")}  // Remplacez par une image réelle
          metadata={{ title: challenge.title, description: challenge.description }}
        />
      </div>

      <div className="border-t p-4">
        <div className="max-w-2xl mx-auto">
          <Progress 
            value={(currentPage + 1) / challenge.content.length * 100} 
            className="mb-4" 
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === challenge.content.length - 1}
            >
              {currentPage === challenge.content.length - 2 ? 'Complete' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChallengeContent({ type, content, challengeId, wallet, imageFile, metadata }: ChallengeContentProps & MintProps) {
  switch (type) {
    case 'text':
      return <div className="prose max-w-2xl">{content}</div>;
    case 'image':
      return (
        <Image 
          src={content} 
          alt="Challenge content"
          width={672}
          height={378}
          className="max-w-2xl rounded-lg"
        />
      );
    case 'video':
      const videoId = content.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <div className="aspect-video w-full max-w-2xl">
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    case 'button':
      return (
        <MintAchievement 
          challengeId={challengeId}
          wallet={"rQEWwQALcEjkUFuxKH9VzsK4CFkCRBw9Bk"}
          imageFile={imageFile}
          metadata={metadata}
        /> 

      );
    default:
      return null;
  }
}
