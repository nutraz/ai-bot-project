import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  GitBranch, 
  Eye, 
  Download, 
  Settings,
  Folder,
  File,
  Clock,
  User,
  Code,
  FileText,
  ChevronRight,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock repository data
const mockRepository = {
  id: '1',
  name: 'defi-protocol',
  description: 'A decentralized finance protocol built on Ethereum with advanced yield farming capabilities',
  isPrivate: false,
  stars: 342,
  forks: 89,
  watchers: 28,
  language: 'Solidity',
  languageColor: '#A855F7',
  updatedAt: '2 hours ago',
  size: '2.4 MB',
  defaultBranch: 'main',
  commits: 156,
  contributors: 12,
  owner: 'alice-crypto'
};

// Mock file tree data
const mockFileTree = [
  {
    name: 'contracts',
    type: 'folder',
    children: [
      { name: 'DeFiProtocol.sol', type: 'file', size: '2.1 KB', lastModified: '2 hours ago' },
      { name: 'TokenVault.sol', type: 'file', size: '1.8 KB', lastModified: '1 day ago' },
      { name: 'YieldFarm.sol', type: 'file', size: '3.2 KB', lastModified: '3 days ago' }
    ]
  },
  {
    name: 'scripts',
    type: 'folder',
    children: [
      { name: 'deploy.js', type: 'file', size: '892 B', lastModified: '5 days ago' },
      { name: 'verify.js', type: 'file', size: '654 B', lastModified: '1 week ago' }
    ]
  },
  {
    name: 'test',
    type: 'folder',
    children: [
      { name: 'DeFiProtocol.test.js', type: 'file', size: '4.1 KB', lastModified: '2 days ago' },
      { name: 'TokenVault.test.js', type: 'file', size: '2.8 KB', lastModified: '4 days ago' }
    ]
  },
  { name: 'README.md', type: 'file', size: '1.2 KB', lastModified: '1 week ago' },
  { name: 'package.json', type: 'file', size: '834 B', lastModified: '2 weeks ago' },
  { name: 'hardhat.config.js', type: 'file', size: '567 B', lastModified: '3 weeks ago' }
];

// Mock README content
const mockReadmeContent = `# DeFi Protocol

A decentralized finance protocol built on Ethereum with advanced yield farming capabilities.

## Features

- 🌾 **Yield Farming**: Stake tokens to earn rewards
- 🔒 **Token Vault**: Secure token storage and management  
- 📊 **Analytics**: Real-time farming statistics
- 🛡️ **Security**: Audited smart contracts

## Getting Started

\`\`\`bash
npm install
npx hardhat compile
npx hardhat test
\`\`\`

## Deployment

\`\`\`bash
npx hardhat run scripts/deploy.js --network mainnet
\`\`\`

## Contributing

We welcome contributions! Please read our contributing guidelines.

## License

MIT License - see LICENSE file for details.`;

export const RepositoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<string | null>('README.md');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['contracts']);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileIcon = (type: string, name: string) => {
    if (type === 'folder') {
      return <Folder className="w-4 h-4 text-neon-cyan" />;
    }
    
    const extension = name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'sol':
        return <FileText className="w-4 h-4 text-cyber-purple" />;
      case 'js':
      case 'ts':
        return <Code className="w-4 h-4 text-warning-orange" />;
      case 'md':
        return <FileText className="w-4 h-4 text-terminal-green" />;
      case 'json':
        return <FileText className="w-4 h-4 text-neon-cyan" />;
      default:
        return <File className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const renderFileTree = (items: any[], depth = 0) => {
    return items.map((item, index) => (
      <div key={`${item.name}-${index}`}>
        <div 
          className={`flex items-center space-x-2 px-3 py-2 hover:bg-glass-bg/50 rounded-md cursor-pointer transition-colors ${
            selectedFile === item.name ? 'bg-cyber-purple/10 border-l-2 border-cyber-purple' : ''
          }`}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.name);
            } else {
              setSelectedFile(item.name);
            }
          }}
        >
          {item.type === 'folder' && (
            <ChevronRight 
              className={`w-3 h-3 text-muted-foreground transition-transform ${
                expandedFolders.includes(item.name) ? 'rotate-90' : ''
              }`}
            />
          )}
          {renderFileIcon(item.type, item.name)}
          <span className="text-sm text-foreground">{item.name}</span>
        </div>
        
        {item.type === 'folder' && expandedFolders.includes(item.name) && item.children && (
          <div>
            {renderFileTree(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
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
          
          {/* Repository Header */}
          <div className="glass-card p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyber-purple to-neon-cyan rounded-lg flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      <Link to={`/profile/${mockRepository.owner}`} className="text-muted-foreground hover:text-cyber-purple">
                        {mockRepository.owner}
                      </Link>
                      <span className="mx-1">/</span>
                      <span className="gradient-text">{mockRepository.name}</span>
                    </h1>
                    {!mockRepository.isPrivate && (
                      <Badge variant="outline" className="mt-1">Public</Badge>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{mockRepository.description}</p>
                
                {/* Repository Stats */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{mockRepository.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitBranch className="w-4 h-4" />
                    <span>{mockRepository.forks}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{mockRepository.watchers}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: mockRepository.languageColor }}
                    ></div>
                    <span>{mockRepository.language}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Star
                </Button>
                <Button variant="outline" size="sm">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Fork
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Clone
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Repository Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="code" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="code">
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger value="issues">Issues (0)</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-6">
              {/* Branch and Clone Info */}
              <div className="glass-card p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{mockRepository.defaultBranch}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mockRepository.commits} commits
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      HTTPS
                    </Button>
                    <Button className="btn-neon" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download ZIP
                    </Button>
                  </div>
                </div>
              </div>

              {/* File Browser */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* File Tree */}
                <div className="lg:col-span-1">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Files</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-96 overflow-y-auto">
                        {renderFileTree(mockFileTree)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* File Content */}
                <div className="lg:col-span-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {renderFileIcon('file', selectedFile || '')}
                          <span className="font-medium">{selectedFile}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          1.2 KB
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedFile === 'README.md' ? (
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-foreground bg-glass-bg/30 p-4 rounded-lg border border-glass-border/50">
                            {mockReadmeContent}
                          </pre>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <File className="w-12 h-12 mx-auto mb-4" />
                          <p>File preview not available</p>
                          <p className="text-sm">Click "Download" to view this file</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="issues">
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <p>Issues tracking coming soon!</p>
                    <p className="text-sm mt-2">Track bugs, feature requests, and project discussions.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <p>Repository settings coming soon!</p>
                    <p className="text-sm mt-2">Manage repository access, webhooks, and integrations.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};