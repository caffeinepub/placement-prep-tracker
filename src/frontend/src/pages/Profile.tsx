import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User, Mail, GraduationCap, Building2, Target, Save } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

const branches = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other',
];

const companies = [
  'TCS',
  'Infosys',
  'Wipro',
  'Cognizant',
  'Accenture',
  'HCL',
  'Tech Mahindra',
  'Capgemini',
  'Amazon',
  'Microsoft',
  'Google',
  'Other Service Companies',
];

export default function Profile() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() || '';

  // Mock user data - will be fetched from backend
  const [formData, setFormData] = useState({
    name: 'Student Name',
    email: 'student@example.com',
    graduationYear: '2026',
    branch: 'Computer Science',
    targetCompanies: ['TCS', 'Infosys', 'Amazon'],
  });

  const handleCompanyToggle = (company: string) => {
    setFormData((prev) => ({
      ...prev,
      targetCompanies: prev.targetCompanies.includes(company)
        ? prev.targetCompanies.filter((c) => c !== company)
        : [...prev.targetCompanies, company],
    }));
  };

  const handleSave = () => {
    // TODO: Save to backend
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-2xl text-primary-foreground">
                  {formData.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{formData.name}</CardTitle>
            <CardDescription className="break-all">{formData.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>Class of {formData.graduationYear}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{formData.branch}</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Target className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {formData.targetCompanies.map((company) => (
                    <Badge key={company} variant="secondary" className="text-xs">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <p className="font-medium">Internet Identity</p>
              <p className="break-all text-xs text-muted-foreground">{principal}</p>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  <User className="mr-2 inline h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="mr-2 inline h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="graduationYear">
                  <GraduationCap className="mr-2 inline h-4 w-4" />
                  Graduation Year
                </Label>
                <Select
                  value={formData.graduationYear}
                  onValueChange={(value) => setFormData({ ...formData, graduationYear: value })}
                >
                  <SelectTrigger id="graduationYear">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">
                  <Building2 className="mr-2 inline h-4 w-4" />
                  Branch
                </Label>
                <Select
                  value={formData.branch}
                  onValueChange={(value) => setFormData({ ...formData, branch: value })}
                >
                  <SelectTrigger id="branch">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>
                <Target className="mr-2 inline h-4 w-4" />
                Target Companies
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {companies.map((company) => (
                  <div key={company} className="flex items-center space-x-2">
                    <Checkbox
                      id={`profile-${company}`}
                      checked={formData.targetCompanies.includes(company)}
                      onCheckedChange={() => handleCompanyToggle(company)}
                    />
                    <label
                      htmlFor={`profile-${company}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {company}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
