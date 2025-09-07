'use client';

import React, { useState, useRef } from 'react';
import { FiDownload, FiUpload, FiFileText, FiShield, FiZap, FiCode } from 'react-icons/fi';

// The test file content
const testFileContent = `import subprocess
import pickle

def insecure_eval():
    user_input = input("Enter code: ")
    eval(user_input)  # B101 - Use of eval detected

def insecure_pickle():
    data = pickle.loads(b"malicious-payload")  # B301 - Pickle load

def insecure_shell():
    subprocess.call("ls -l", shell=True)  # B602 - shell=True

def hardcoded_password():
    password = "hunter2"  # B105 - Possible hardcoded password

def insecure_exec():
    exec("print('Dangerous exec')")  # B102 - Use of exec detected`;

export default function CodeScopePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file download
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([testFileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'CodeScopeTest.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  // Mock analysis function
  const analyzeCode = async () => {
    setAnalysisResult("Analyzing...");
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(`Security Analysis Results:
      
🔴 HIGH RISK - Line 5: Use of eval() detected (B101)
   Risk: Arbitrary code execution vulnerability
   
🔴 HIGH RISK - Line 8: Unsafe pickle.loads() (B301)
   Risk: Code injection through deserialization
   
🟡 MEDIUM RISK - Line 11: shell=True in subprocess.call() (B602)
   Risk: Shell injection vulnerability
   
🟡 MEDIUM RISK - Line 14: Hardcoded password detected (B105)
   Risk: Credential exposure
   
🔴 HIGH RISK - Line 17: Use of exec() detected (B102)
   Risk: Arbitrary code execution vulnerability

📊 Summary: 4 HIGH risk, 1 MEDIUM risk vulnerabilities found`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <FiShield className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              CodeScope
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered security analysis and code review platform. Identify vulnerabilities, 
            bugs, and security issues in your code using advanced static analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Test File Display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiFileText className="text-white text-xl" />
                  <h2 className="text-xl font-semibold text-white">CodeScopeTest.py</h2>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <FiDownload className="text-sm" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                  <code>{testFileContent}</code>
                </pre>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiZap className="text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Test File Purpose</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  This file contains intentional security vulnerabilities for testing CodeScope's 
                  analysis capabilities. It includes common issues like eval(), hardcoded passwords, 
                  and unsafe deserialization.
                </p>
              </div>
            </div>
          </div>

          {/* Upload & Analysis Area */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiUpload className="text-blue-600" />
                Upload Your Code
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <FiCode className="text-blue-600 dark:text-blue-400 text-2xl" />
                  </div>
                  
                  {uploadedFile ? (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        📁 {uploadedFile.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Drop the test file here
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        or click to browse files
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".py,.js,.ts,.java,.cpp,.c,.php,.rb,.go,.rs"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {uploadedFile && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={analyzeCode}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiZap className="text-lg" />
                    Analyze Code
                  </button>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FiShield className="text-red-600" />
                  Analysis Results
                </h2>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {analysisResult}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Powered by Advanced Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-300">
                GPT-4 integration for intelligent code analysis and recommendations
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Security Focus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bandit and Semgrep integration for comprehensive security scanning
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiCode className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi-Language</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Support for Python, JavaScript, Java, C++, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 