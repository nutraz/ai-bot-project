import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Grid, List, Star, GitBranch, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for repositories
const mockRepositories = [
  {
    id: 1,
    name: 'defi-protocol',
    description: 'A decentralized finance protocol built on Ethereum',
    isPrivate: false,
    stars: 342,
    forks: 89,
    language: 'Solidity',
    updatedAt: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    name: 'nft-marketplace',
    description: 'Multi-chain NFT marketplace with advanced trading features',
    isPrivate: true,
    stars: 156,
    forks: 23,
    language: 'TypeScript',
    updatedAt: '1 day ago',
    status: 'active'
  },
  {
    id: 3,
    name: 'dao-governance',
    description: 'Decentralized autonomous organization governance system',
    isPrivate: false,
    stars: 98,
    forks: 34,
    language: 'Rust',
    updatedAt: '3 days ago',
    status: 'archived'
  },
  {
    id: 4,
    name: 'cross-chain-bridge',
    description: 'Secure bridge for asset transfers between blockchains',
    isPrivate: true,
    stars: 267,
    forks: 45,
    language: 'Go',
    updatedAt: '5 days ago',
    status: 'active'
  }
];

const mockStats = [
  { label: 'Total Repositories', value: 24, change: '+3 this week' },
  { label: 'Active Projects', value: 8, change: '+2 this week' },
  { label: 'Total Stars', value: 1247, change: '+89 this week' },
  { label: 'Contributors', value: 34, change: '+7 this week' }
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const handleNewRepository = () => {
    navigate('/repositories');
  };

  const filteredRepositories = mockRepositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'private' && repo.isPrivate) ||
                      (selectedTab === 'public' && !repo.isPrivate) ||
                      (selectedTab === 'archived' && repo.status === 'archived');
    return matchesSearch && matchesTab;
  });

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
            </div>
            <Button className="btn-neon" onClick={handleNewRepository}>
              <Plus className="w-4 h-4 mr-2" />
              New Repository
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {mockStats.map((stat, index) => (
            <Card key={stat.label} className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-terminal-green">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Repositories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Your Repositories</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search repositories..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Repository Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Repository List */}
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredRepositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="interactive-card"
              >
                <div className="p-4 space-y-3">
                  {/* Repository Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground hover:text-cyber-purple transition-colors">
                        {repo.name}
                      </h3>
                      {repo.isPrivate && (
                        <Badge variant="secondary" className="text-xs">
                          <Lock className="w-3 h-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>

                  {/* Repository Description */}
                  <p className="text-sm text-muted-foreground">
                    {repo.description}
                  </p>

                  {/* Repository Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-cyber-purple rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{repo.updatedAt}</span>
                      </div>
                    </div>
                    <Badge variant={repo.status === 'active' ? 'default' : 'secondary'}>
                      {repo.status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRepositories.length === 0 && (
            <div className="text-center py-12">
              <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No repositories found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No repositories match your search.' : 'Get started by creating your first repository.'}
              </p>
              <Button className="btn-neon" onClick={handleNewRepository}>
                <Plus className="w-4 h-4 mr-2" />
                Create Repository
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};