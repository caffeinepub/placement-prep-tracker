import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Target,
  TrendingUp,
  Clock,
  Flame,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data - will be replaced with backend data
  const readinessScore = 67;
  const streak = 12;
  const todayMinutes = 45;
  const weeklyGoal = 300;

  const weakAreas = [
    { topic: 'Dynamic Programming', category: 'DSA', score: 35 },
    { topic: 'Logical Reasoning', category: 'Aptitude', score: 42 },
    { topic: 'Operating Systems', category: 'Core', score: 48 },
  ];

  const dailyPlan = [
    { topic: 'Arrays & Strings', duration: 60, completed: false },
    { topic: 'Time & Work Problems', duration: 30, completed: false },
    { topic: 'DBMS Normalization', duration: 45, completed: false },
  ];

  const recentActivity = [
    { topic: 'Binary Search', time: 45, confidence: 4, date: 'Today' },
    { topic: 'Profit & Loss', time: 30, confidence: 5, date: 'Today' },
    { topic: 'Computer Networks', time: 60, confidence: 3, date: 'Yesterday' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your preparation progress and stay on target</p>
      </div>

      {/* Key Metrics */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Readiness Score</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{readinessScore}%</div>
            <Progress value={readinessScore} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              +5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Flame className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{streak} days</div>
            <p className="mt-2 text-xs text-muted-foreground">Keep it going! 🔥</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todayMinutes} min</div>
            <Progress value={(todayMinutes / 120) * 100} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Goal: 120 min/day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Total</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{weeklyGoal} min</div>
            <p className="mt-2 text-xs text-muted-foreground">5 hours this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Today's Study Plan
            </CardTitle>
            <CardDescription>Recommended topics based on your weak areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dailyPlan.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.topic}</p>
                    <p className="text-sm text-muted-foreground">{item.duration} minutes</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Start
                </Button>
              </div>
            ))}
            <Button className="w-full gap-2" onClick={() => navigate({ to: '/study-log' })}>
              Log Study Session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Weak Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Weak Areas
            </CardTitle>
            <CardDescription>Topics that need more attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weakAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{area.topic}</span>
                    <Badge variant="outline" className="text-xs">
                      {area.category}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium text-destructive">{area.score}%</span>
                </div>
                <Progress value={area.score} className="h-2" />
              </div>
            ))}
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Focus on these topics to improve your readiness score by up to 15%
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest study sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.topic}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="font-medium">{activity.time} min</p>
                      <p className="text-muted-foreground">Time spent</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{activity.confidence}/5</p>
                      <p className="text-muted-foreground">Confidence</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full gap-2"
              onClick={() => navigate({ to: '/progress' })}
            >
              View All Activity
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
