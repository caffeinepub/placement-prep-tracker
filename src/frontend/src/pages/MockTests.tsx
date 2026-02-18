import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Clock, TrendingUp, Award, Play, CheckCircle2 } from 'lucide-react';

const mockTests = [
  {
    id: 1,
    name: 'TCS NQT Mock Test 1',
    company: 'TCS',
    questions: 50,
    duration: 90,
    attempted: true,
    score: 38,
    accuracy: 76,
  },
  {
    id: 2,
    name: 'Infosys Aptitude Test',
    company: 'Infosys',
    questions: 40,
    duration: 60,
    attempted: true,
    score: 32,
    accuracy: 80,
  },
  {
    id: 3,
    name: 'Generic Placement Test',
    company: 'Generic',
    questions: 60,
    duration: 120,
    attempted: false,
    score: 0,
    accuracy: 0,
  },
  {
    id: 4,
    name: 'TCS Digital Mock Test',
    company: 'TCS',
    questions: 45,
    duration: 75,
    attempted: false,
    score: 0,
    accuracy: 0,
  },
];

const recentAttempts = [
  {
    test: 'TCS NQT Mock Test 1',
    score: 38,
    total: 50,
    accuracy: 76,
    time: 85,
    date: '2026-02-17',
  },
  {
    test: 'Infosys Aptitude Test',
    score: 32,
    total: 40,
    accuracy: 80,
    time: 55,
    date: '2026-02-15',
  },
  {
    test: 'Generic Placement Test',
    score: 45,
    total: 60,
    accuracy: 75,
    time: 110,
    date: '2026-02-12',
  },
];

export default function MockTests() {
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  const filteredTests =
    selectedCompany === 'all'
      ? mockTests
      : mockTests.filter((test) => test.company === selectedCompany);

  const avgAccuracy = Math.round(
    recentAttempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) / recentAttempts.length
  );

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Mock Tests</h1>
        <p className="text-muted-foreground">Practice with company-specific mock tests and track your performance</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tests Attempted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockTests.filter((t) => t.attempted).length}
            </div>
            <p className="text-xs text-muted-foreground">Out of {mockTests.length} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgAccuracy}%</div>
            <Progress value={avgAccuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">Infosys Aptitude Test</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">From first attempt</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Available Tests</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCompany === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCompany('all')}
            >
              All
            </Button>
            <Button
              variant={selectedCompany === 'TCS' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCompany('TCS')}
            >
              TCS
            </Button>
            <Button
              variant={selectedCompany === 'Infosys' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCompany('Infosys')}
            >
              Infosys
            </Button>
            <Button
              variant={selectedCompany === 'Generic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCompany('Generic')}
            >
              Generic
            </Button>
          </div>

          {/* Tests Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTests.map((test) => (
              <Card key={test.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {test.company}
                        </Badge>
                      </CardDescription>
                    </div>
                    {test.attempted && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span>{test.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{test.duration} min</span>
                    </div>
                  </div>

                  {test.attempted && (
                    <div className="space-y-2 rounded-lg border border-border/50 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Score</span>
                        <span className="font-medium">
                          {test.score}/{test.questions}
                        </span>
                      </div>
                      <Progress value={test.accuracy} />
                      <p className="text-xs text-muted-foreground">
                        Accuracy: {test.accuracy}%
                      </p>
                    </div>
                  )}

                  <Button className="w-full gap-2" variant={test.attempted ? 'outline' : 'default'}>
                    <Play className="h-4 w-4" />
                    {test.attempted ? 'Retake Test' : 'Start Test'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attempts</CardTitle>
              <CardDescription>Your mock test performance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttempts.map((attempt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{attempt.test}</p>
                        <p className="text-sm text-muted-foreground">{attempt.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <p className="font-medium">
                          {attempt.score}/{attempt.total}
                        </p>
                        <p className="text-muted-foreground">Score</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{attempt.accuracy}%</p>
                        <p className="text-muted-foreground">Accuracy</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{attempt.time} min</p>
                        <p className="text-muted-foreground">Time</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
