import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, Calendar, Target, BookOpen } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', minutes: 120, sessions: 3 },
  { day: 'Tue', minutes: 90, sessions: 2 },
  { day: 'Wed', minutes: 150, sessions: 4 },
  { day: 'Thu', minutes: 75, sessions: 2 },
  { day: 'Fri', minutes: 135, sessions: 3 },
  { day: 'Sat', minutes: 180, sessions: 5 },
  { day: 'Sun', minutes: 105, sessions: 3 },
];

const categoryData = [
  { category: 'DSA', hours: 12, percentage: 40 },
  { category: 'Aptitude', hours: 8, percentage: 27 },
  { category: 'Core', hours: 7, percentage: 23 },
  { category: 'English', hours: 3, percentage: 10 },
];

const readinessHistory = [
  { week: 'Week 1', score: 45 },
  { week: 'Week 2', score: 52 },
  { week: 'Week 3', score: 58 },
  { week: 'Week 4', score: 63 },
  { week: 'Week 5', score: 67 },
];

const topicProgress = [
  { topic: 'Arrays & Strings', confidence: 4.5, sessions: 8 },
  { topic: 'Dynamic Programming', confidence: 3.2, sessions: 6 },
  { topic: 'Profit & Loss', confidence: 4.8, sessions: 5 },
  { topic: 'Operating Systems', confidence: 3.8, sessions: 7 },
  { topic: 'Computer Networks', confidence: 4.2, sessions: 6 },
];

export default function Progress() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Progress Analytics</h1>
        <p className="text-muted-foreground">Visualize your preparation journey and track improvements</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">30 hrs</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Topics Covered</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Out of 50 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+22%</div>
            <p className="text-xs text-muted-foreground">Readiness score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="readiness">Readiness Trend</TabsTrigger>
          <TabsTrigger value="topics">Topic Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Activity</CardTitle>
              <CardDescription>Your study time and sessions over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="minutes" fill="hsl(var(--primary))" name="Minutes" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="sessions" fill="hsl(var(--accent))" name="Sessions" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>Study Time by Category</CardTitle>
              <CardDescription>Distribution of your study hours across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="category" type="category" className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categoryData.map((cat) => (
                  <div key={cat.category} className="rounded-lg border border-border/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cat.category}</span>
                      <Badge variant="secondary">{cat.percentage}%</Badge>
                    </div>
                    <p className="mt-1 text-2xl font-bold">{cat.hours}h</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readiness">
          <Card>
            <CardHeader>
              <CardTitle>Readiness Score Trend</CardTitle>
              <CardDescription>Track how your readiness score has improved over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={readinessHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                    name="Readiness Score"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="font-medium">Great progress!</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your readiness score has improved by 22 points over the past 5 weeks. Keep up the consistent effort!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Topic-wise Progress</CardTitle>
              <CardDescription>Your confidence level and practice frequency for each topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicProgress.map((topic, index) => (
                  <div key={index} className="rounded-lg border border-border/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-medium">{topic.topic}</h4>
                      <Badge variant="outline">{topic.sessions} sessions</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-medium">{topic.confidence}/5</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${(topic.confidence / 5) * 100}%` }}
                          />
                        </div>
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
