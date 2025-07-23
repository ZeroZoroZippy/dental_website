#!/usr/bin/env node

/**
 * Comprehensive Test Runner Script
 * This script runs all tests and provides detailed feedback
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧪 Starting Comprehensive Test Suite...\n');

// Check if all test files exist
const testFiles = [
  'src/App.test.jsx',
  'src/components/__tests__/Navbar.test.jsx',
  'src/components/__tests__/Hero.test.jsx',
  'src/ui/__tests__/InfoBoxContainer.test.jsx',
  'src/ui/__tests__/BookAppointmentBox.test.jsx',
  'src/ui/__tests__/OpenNowBox.test.jsx',
  'src/ui/__tests__/WorkingHoursBox.test.jsx'
];

console.log('📋 Checking test files...');
testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

console.log('\n📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    '@testing-library/react',
    '@testing-library/jest-dom',
    'jest',
    'jest-environment-jsdom'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
    }
  });
} catch (error) {
  console.log('❌ Error reading package.json');
}

console.log('\n🔧 Checking Jest configuration...');
if (fs.existsSync('jest.config.js')) {
  console.log('✅ jest.config.js found');
} else {
  console.log('❌ jest.config.js not found');
}

if (fs.existsSync('src/setupTests.js')) {
  console.log('✅ src/setupTests.js found');
} else {
  console.log('❌ src/setupTests.js not found');
}

console.log('\n🚀 Running tests...\n');

try {
  // Run Jest with verbose output
  execSync('npm test -- --verbose --coverage --watchAll=false', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n🎉 All tests completed successfully!');
  
} catch (error) {
  console.log('\n❌ Tests failed. Error details:');
  console.log(error.message);
  
  console.log('\n🔍 Troubleshooting suggestions:');
  console.log('1. Make sure all dependencies are installed: npm install');
  console.log('2. Check Jest configuration in jest.config.js');
  console.log('3. Verify setupTests.js is properly configured');
  console.log('4. Check for any missing mock implementations');
  
  process.exit(1);
}