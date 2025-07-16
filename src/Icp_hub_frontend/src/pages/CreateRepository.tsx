import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, Lock, Globe, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export const CreateRepository = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    privacy: 'public',
    initializeWithReadme: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Repository name required",
        description: "Please enter a name for your repository.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Repository created successfully!",
        description: `${formData.name} has been created and is ready to use.`
      });

      // Navigate to the new repository (using a mock ID)
      navigate(`/repositories/new-repo-${Date.now()}`);
    } catch (error) {
      toast({
        title: "Failed to create repository",
        description: "There was an error creating your repository. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/repositories')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Repositories
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyber-purple to-neon-cyan rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Create New Repository</h1>
              <p className="text-muted-foreground">Start your next Web3 project</p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-cyber-purple" />
                  <span>Repository Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Repository Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Repository name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="my-awesome-dapp"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Great repository names are short and memorable. Need inspiration? How about 
                      <span className="text-cyber-purple"> defi-protocol</span> or 
                      <span className="text-neon-cyan"> nft-marketplace</span>?
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description (optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="A short description of your project..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full min-h-[100px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Help others understand what your repository is about
                    </p>
                  </div>

                  {/* Privacy Settings */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Repository visibility</Label>
                    <RadioGroup
                      value={formData.privacy}
                      onValueChange={(value) => handleInputChange('privacy', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-glass-border/50 hover:border-cyber-purple/50 transition-colors">
                        <RadioGroupItem value="public" id="public" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Globe className="w-4 h-4 text-terminal-green" />
                            <Label htmlFor="public" className="font-medium cursor-pointer">
                              Public
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Anyone on the internet can see this repository. You choose who can commit.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-glass-border/50 hover:border-cyber-purple/50 transition-colors">
                        <RadioGroupItem value="private" id="private" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Lock className="w-4 h-4 text-warning-orange" />
                            <Label htmlFor="private" className="font-medium cursor-pointer">
                              Private
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            You choose who can see and commit to this repository.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Initialize Options */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Initialize this repository with:</Label>
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-glass-border/50">
                      <Checkbox
                        id="readme"
                        checked={formData.initializeWithReadme}
                        onCheckedChange={(checked) => handleInputChange('initializeWithReadme', checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-neon-cyan" />
                          <Label htmlFor="readme" className="font-medium cursor-pointer">
                            Add a README file
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This is where you can write a long description for your project.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/repositories')}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn-neon"
                      disabled={isLoading || !formData.name.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <GitBranch className="w-4 h-4 mr-2" />
                          Create Repository
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use descriptive names that reflect your project's purpose</li>
                  <li>• Start with a private repository if you're not ready to share</li>
                  <li>• Add a README to help others understand your project</li>
                  <li>• Consider using conventional naming patterns for Web3 projects</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};