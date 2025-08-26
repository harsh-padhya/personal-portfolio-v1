#!/usr/bin/env node

const { execSync } = require('child_process');
const { restoreAdminDirectory } = require('./build-static-data.js');

async function buildProduction() {
  try {
    // Build static data (this will move admin directory)
    execSync('node scripts/build-static-data.js', { stdio: 'inherit' });
    
    // Run Next.js build
    execSync('next build', { stdio: 'inherit' });
    
    console.log('Production build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  } finally {
    // Always restore admin directory
    await restoreAdminDirectory();
  }
}

if (require.main === module) {
  buildProduction();
}
