import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation Links */}
      <div className="absolute top-8 left-8 z-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">Resume</span>
          </a>
          
          <a 
            href="https://github.com/Badams1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="font-medium">GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/benjamin-adams-444651292/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-relaxed py-2">
            Benjamin Adams
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xl text-gray-600 dark:text-gray-300">
            <span className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm">
              Software Developer
            </span>
            <span className="hidden sm:block text-gray-400">•</span>
            <span className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm">
              CS Student
            </span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* MiniShell Card */}
            <Card className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/5 dark:to-indigo-400/5"></div>
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      💻
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">MiniShell</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">Unix Terminal Emulator</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  A Linux-like command line interface written in C, compiled to WebAssembly 
                  for seamless browser integration.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['C Programming', 'WebAssembly', 'Next.js', 'Unix Systems'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" asChild className="flex-1 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20">
                    <a href="/terminal/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Try Terminal
                    </a>
                  </Button>
                  <Button asChild className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <a href="https://github.com/Badams1/MiniShell" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* LeetGenie Card */}
            <Card className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-400/5 dark:to-amber-400/5"></div>
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      💡
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">LeetGenie</h3>
                      <p className="text-orange-600 dark:text-orange-400 font-medium">Chrome Extension</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  A Chrome extension that provides AI-powered hints for LeetCode problems without spoiling 
                  the solution.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Chrome APIs', 'OpenAI GPT', 'Content Scripts'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" asChild className="flex-1 border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20">
                    {/* TODO: Replace with actual Chrome Web Store URL once published */}
                    {/* Format: https://chrome.google.com/webstore/detail/leetgenie/[EXTENSION_ID] */}
                    <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Chrome Store
                    </a>
                  </Button>
                  <Button asChild className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                    <a href="https://github.com/Badams1/LeetGenie" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CodeScope Card */}
            <Card className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/5 dark:to-teal-400/5"></div>
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      🛡️
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">CodeScope</h3>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">Security Analysis Tool</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  A security-focused code analyzer that uses GPT to provide smart suggestions 
                  and identify potential vulnerabilities in your code.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python Backend', 'React Frontend', 'OpenAI GPT', 'Static Analysis'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" asChild className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/20">
                    <a href="/codescope/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Try Live Demo
                    </a>
                  </Button>
                  <Button asChild className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    <a href="https://github.com/Badams1/CodeScope" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Introduction - Left Side */}
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Background</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Growing up with video games sparked my curiosity about how software works, which eventually led me to study CS at Northeastern. 
                Now I have a passion for Software Development, AI, and building tools that make a difference.
              </p>
            </div>

            {/* Work Experience - Right Side */}
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Work Experience</h3>
              
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Software Engineering Intern</h4>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Snipp Interactive</p>
                </div>
                <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  Jan – Jun 2024
                </div>
              </div>
              
              <div className="space-y-4">
                {/* AI Product Formatting API */}
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AI-Powered Product Data API
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['AWS Cloud9', 'Node.js', 'OpenAI API', 'AWS S3'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location Normalization API */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Global Location Normalization API
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['Express.js', 'LibPostal', 'AWS EC2', 'AWS Cloud9'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* S3 Asset Management UI */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AWS S3 Asset Management UI
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['Vue 3', 'HTML/CSS', 'AWS S3', 'CDN'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Internship Status - Below both columns */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg">
              Currently seeking Fall 2025 internship opportunities
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
               Lets Connect!  
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3">
              <a href="mailto:adams.be@northeastern.edu" className="flex items-center gap-2">
                adams.be@northeastern.edu
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
