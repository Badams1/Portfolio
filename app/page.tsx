import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block animate-pulse mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              BA
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
            Ben Adams
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I'm a passionate <span className="font-semibold text-blue-600 dark:text-blue-400">Northeastern CS student</span> with 
              a deep interest in <span className="font-semibold text-purple-600 dark:text-purple-400">Software Development</span>, 
              <span className="font-semibold text-emerald-600 dark:text-emerald-400"> AI</span>, and building tools that make a difference.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg">
              Currently seeking Fall 2025 internship opportunities
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Let's Connect</h2>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Ready to discuss opportunities or collaborate on exciting projects?
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
