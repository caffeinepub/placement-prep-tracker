import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BookOpen, Clock, Star, Plus, Calendar } from 'lucide-react';

const categories = ['DSA', 'Aptitude', 'Core', 'English'];

const topicsByCategory = {
  DSA: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching'],
  Aptitude: ['Time & Work', 'Profit & Loss', 'Percentages', 'Logical Reasoning', 'Data Interpretation'],
  Core: ['Operating Systems', 'DBMS', 'Computer Networks', 'OOP Concepts', 'System Design'],
  English: ['Grammar', 'Vocabulary', 'Comprehension', 'Writing Skills'],
};

export default function StudyLog() {
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [confidence, setConfidence] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !topic || !timeSpent || !confidence) {
      toast.error('Please fill in all fields');
      return;
    }
    // TODO: Save to backend
    toast.success('Study session logged successfully!');
    // Reset form
    setCategory('');
    setTopic('');
    setTimeSpent('');
    setConfidence('');
  };

  const recentLogs = [
    { topic: 'Binary Search', category: 'DSA', time: 45, confidence: 4, date: '2026-02-18' },
    { topic: 'Profit & Loss', category: 'Aptitude', time: 30, confidence: 5, date: '2026-02-18' },
    { topic: 'Computer Networks', category: 'Core', time: 60, confidence: 3, date: '2026-02-17' },
    { topic: 'Dynamic Programming', category: 'DSA', time: 90, confidence: 3, date: '2026-02-17' },
    { topic: 'Grammar', category: 'English', time: 25, confidence: 4, date: '2026-02-16' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Study Log</h1>
        <p className="text-muted-foreground">Track your daily study sessions and build consistency</p>
      </div>

      <Tabs defaultValue="log" className="space-y-6">
        <TabsList>
          <TabsTrigger value="log" className="gap-2">
            <Plus className="h-4 w-4" />
            Log Session
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Calendar className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  New Study Session
                </CardTitle>
                <CardDescription>Record what you studied today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Select value={topic} onValueChange={setTopic} disabled={!category}>
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {category &&
                            topicsByCategory[category as keyof typeof topicsByCategory].map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="timeSpent"
                        type="number"
                        placeholder="e.g., 45"
                        value={timeSpent}
                        onChange={(e) => setTimeSpent(e.target.value)}
                        className="pl-10"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confidence">Confidence Level (1-5)</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Button
                          key={level}
                          type="button"
                          variant={confidence === String(level) ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setConfidence(String(level))}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              confidence === String(level) ? 'fill-current' : ''
                            }`}
                          />
                          {level}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      1 = Need more practice, 5 = Very confident
                    </p>
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Log Study Session
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Today's summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/50 p-4">
                  <p className="text-sm text-muted-foreground">Total Time Today</p>
                  <p className="text-2xl font-bold">75 min</p>
                </div>
                <div className="rounded-lg border border-border/50 p-4">
                  <p className="text-sm text-muted-foreground">Sessions Today</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="rounded-lg border border-border/50 p-4">
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold">4.5/5</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Study History</CardTitle>
              <CardDescription>Your recent study sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{log.topic}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                          <span>•</span>
                          <span>{log.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <p className="font-medium">{log.time} min</p>
                        <p className="text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">{log.confidence}/5</span>
                        </div>
                        <p className="text-muted-foreground">Confidence</p>
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
