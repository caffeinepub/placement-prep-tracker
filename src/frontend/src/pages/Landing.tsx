import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, BookOpen, Award, CheckCircle2, BarChart3 } from 'lucide-react';
import { useEffect } from 'react';

export default function Landing() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: BookOpen,
      title: 'Daily Study Tracking',
      description: 'Log your study sessions with time spent and confidence ratings for each topic.',
    },
    {
      icon: Target,
      title: 'Mock Test Analytics',
      description: 'Track your performance across company-specific mock tests with detailed accuracy metrics.',
    },
    {
      icon: TrendingUp,
      title: 'Readiness Score',
      description: 'Get a real-time readiness score based on consistency, accuracy, and topic coverage.',
    },
    {
      icon: Award,
      title: 'Weak Area Detection',
      description: 'Automatically identify and focus on topics that need more attention.',
    },
    {
      icon: CheckCircle2,
      title: 'Streak Counter',
      description: 'Build momentum with daily study streaks and stay consistent in your preparation.',
    },
    {
      icon: BarChart3,
      title: 'Progress Visualization',
      description: 'Visualize your improvement over time with comprehensive charts and insights.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
        <div className="container flex flex-col items-center gap-8 py-20 text-center md:py-32">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <Target className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Master Your Placement Preparation
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Track behavior, not just content. Get personalized insights, readiness scores, and daily guidance
              to ace your campus placements.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={login} disabled={isLoggingIn} className="gap-2">
              {isLoggingIn ? 'Connecting...' : 'Get Started'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/dashboard' })}>
              View Demo
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Behavior-based tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Real-time insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools designed for Tier-2/3 college students preparing for campus placements
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container py-20 text-center">
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Transform Your Preparation?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join students who are tracking their progress and improving their placement readiness every day.
            </p>
            <Button size="lg" onClick={login} disabled={isLoggingIn} className="gap-2">
              {isLoggingIn ? 'Connecting...' : 'Start Tracking Now'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
