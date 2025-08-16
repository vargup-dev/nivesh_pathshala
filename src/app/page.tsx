import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, Target, TrendingUp, Zap } from 'lucide-react';
import Image from "next/image";

const modules = [
  {
    title: 'Stock Market Basics',
    description: 'Learn the fundamentals of stock market investing.',
    icon: <Book className="size-8 text-primary" />,
    progress: 75,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'stock market chart'
  },
  {
    title: 'Mutual Funds 101',
    description: 'An introduction to mutual funds and how they work.',
    icon: <TrendingUp className="size-8 text-primary" />,
    progress: 45,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'investment portfolio'
  },
  {
    title: 'Advanced Technical Analysis',
    description: 'Master chart patterns and indicators.',
    icon: <Target className="size-8 text-primary" />,
    progress: 20,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'financial graphs'
  },
  {
    title: 'Futures & Options',
    description: 'Dive into the world of derivatives trading.',
    icon: <Zap className="size-8 text-primary" />,
    progress: 0,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'trading screen'
  },
];

export default function LearnPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Learning Modules
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <Card key={module.title} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <Image src={module.image} alt={module.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={module.aiHint} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium font-headline">
                {module.title}
              </CardTitle>
              {module.icon}
            </CardHeader>
            <CardContent>
              <CardDescription>{module.description}</CardDescription>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} aria-label={`${module.title} progress`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
