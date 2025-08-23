import React from 'react'
import { GitBranch, Github, Twitter, MessageCircle } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GitBranch className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">OpenKeyHub</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A decentralized GitHub alternative built on the Internet Computer Protocol, 
              providing censorship-resistant, on-chain-verifiable code repositories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Guides</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Examples</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} OpenKeyHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
