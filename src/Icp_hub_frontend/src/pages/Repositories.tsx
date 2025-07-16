import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  GitBranch, 
  Clock, 
  Lock, 
  Globe,
  Settings,
  Trash2,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for repositories
const mockRepositories = [
  {
    id: '1',
    name: 'defi-protocol',
    description: 'A decentralized finance protocol built on Ethereum with advanced yield farming capabilities',
    isPrivate: false,
    stars: 342,
    forks: 89,
    language: 'Solidity',
    languageColor: '#A855F7',
    updatedAt: '2 hours ago',
    status: 'active',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'nft-marketplace',
    description: 'Multi-chain NFT marketplace with advanced trading features and royalty management',
    isPrivate: true,
    stars: 156,
    forks: 23,
    language: 'TypeScript',
    languageColor: '#22D3EE',
    updatedAt: '1 day ago',
    status: 'active',
    size: '5.1 MB'
  },
  {
    id: '3',
    name: 'dao-governance',
    description: 'Decentralized autonomous organization governance system with proposal voting',
    isPrivate: false,
    stars: 98,
    forks: 34,
    language: 'Rust',
    languageColor: '#f97316',
    updatedAt: '3 days ago',
    status: 'archived',
    size: '1.8 MB'
  },
  {
    id: '4',
    name: 'cross-chain-bridge',
    description: 'Secure bridge for asset transfers between different blockchain networks',
    isPrivate: true,
    stars: 267,
    forks: 45,
    language: 'Go',
    languageColor: '#06B6D4',
    updatedAt: '5 days ago',
    status: 'active',
    size: '3.2 MB'
  },
  {
    id: '5',
    name: 'smart-contract-auditor',
    description: 'Automated smart contract vulnerability scanner and security audit tool',
    isPrivate: false,
    stars: 445,
    forks: 78,
    language: 'Python',
    languageColor: '#22C55E',
    updatedAt: '1 week ago',
    status: 'active',
    size: '4.7 MB'
  },
  {
    id: '6',
    name: 'web3-wallet-connector',
    description: 'Universal Web3 wallet connection library supporting multiple wallet providers',
    isPrivate: false,
    stars: 189,
    forks: 56,
    language: 'JavaScript',
    languageColor: '#EAB308',
    updatedAt: '2 weeks ago',
    status: 'active',
    size: '892 KB'
  }
];

export const Repositories = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredRepositories = mockRepositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'private' && repo.isPrivate) ||
                      (selectedTab === 'public' && !repo.isPrivate) ||
                      (selectedTab === 'archived' && repo.status === 'archived');
    return matchesSearch && matchesTab;
  });

  const handleCreateRepository = () => {
    navigate('/repositories/create');
  };

  const handleViewRepository = (id: string) => {
    navigate(`/repositories/${id}`);
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Your Repositories</h1>
              <p className="text-muted-foreground">Manage and organize your Web3 projects</p>
            </div>
            <Button className="btn-neon" onClick={handleCreateRepository}>
              <Plus className="w-4 h-4 mr-2" />
              New Repository
            </Button>
          </div>
        </motion.div>

        {/* Repositories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6"
        >
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search repositories..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Repository Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({mockRepositories.length})</TabsTrigger>
              <TabsTrigger value="public">Public ({mockRepositories.filter(r => !r.isPrivate).length})</TabsTrigger>
              <TabsTrigger value="private">Private ({mockRepositories.filter(r => r.isPrivate).length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({mockRepositories.filter(r => r.status === 'archived').length})</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Repository List */}
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredRepositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="interactive-card h-full">
                  <CardContent className="p-6 space-y-4">
                    {/* Repository Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <GitBranch className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <Link
                          to={`/repositories/${repo.id}`}
                          className="font-semibold text-foreground hover:text-cyber-purple transition-colors truncate"
                        >
                          {repo.name}
                        </Link>
                        {repo.isPrivate ? (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            <Lock className="w-3 h-3 mr-1" />
                            Private
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            <Globe className="w-3 h-3 mr-1" />
                            Public
                          </Badge>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card border-glass-border/50">
                          <DropdownMenuItem onClick={() => handleViewRepository(repo.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Repository
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Repository Description */}
                    <p className="text-sm text-muted-foreground break-words">
                      {repo.description}
                    </p>

                    {/* Repository Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitBranch className="w-4 h-4" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                      <Badge variant={repo.status === 'active' ? 'default' : 'secondary'}>
                        {repo.status}
                      </Badge>
                    </div>

                    {/* Repository Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-glass-border/50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: repo.languageColor }}
                          ></div>
                          <span className="text-sm text-muted-foreground">{repo.language}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{repo.updatedAt}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{repo.size}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRepositories.length === 0 && (
            <div className="text-center py-12">
              <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No repositories found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No repositories match your search criteria.' : 'Get started by creating your first repository.'}
              </p>
              <Button className="btn-neon" onClick={handleCreateRepository}>
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