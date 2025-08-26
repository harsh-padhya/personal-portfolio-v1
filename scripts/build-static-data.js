#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');

async function buildStaticData() {
  console.log('Building static data files for GitHub Pages...');
  
  const srcDataDir = path.join(process.cwd(), 'src', 'data');
  const publicDataDir = path.join(process.cwd(), 'public', 'data');
  const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');
  const adminBackupDir = path.join(process.cwd(), 'admin-backup');
  
  // Ensure public/data directory exists
  await fs.mkdir(publicDataDir, { recursive: true });
  
  try {
    // Move admin directory during production build
    if (process.env.NODE_ENV === 'production' || process.env.GITHUB_PAGES === 'true') {
      try {
        await fs.access(adminDir);
        console.log('Moving admin directory for production build...');
        await fs.rename(adminDir, adminBackupDir);
      } catch (error) {
        // Admin directory doesn't exist or already moved
      }
    }
    
    // Copy profile data
    const profilePath = path.join(srcDataDir, 'profile.json');
    const profileData = await fs.readFile(profilePath, 'utf-8');
    await fs.writeFile(path.join(publicDataDir, 'profile.json'), profileData);
    
    // Copy experience data
    const experiencePath = path.join(srcDataDir, 'experience.json');
    const experienceData = await fs.readFile(experiencePath, 'utf-8');
    await fs.writeFile(path.join(publicDataDir, 'experience.json'), experienceData);
    
    // Copy skills data
    const skillsPath = path.join(srcDataDir, 'skills.json');
    const skillsData = await fs.readFile(skillsPath, 'utf-8');
    await fs.writeFile(path.join(publicDataDir, 'skills.json'), skillsData);
    
    // Copy blogs directory
    const blogsDir = path.join(srcDataDir, 'blogs');
    const publicBlogsDir = path.join(publicDataDir, 'blogs');
    await copyDirectory(blogsDir, publicBlogsDir);
    
    // Build blog index for static access
    await buildBlogIndex(srcDataDir, publicDataDir);
    
    console.log('Static data files built successfully!');
  } catch (error) {
    console.error('Error building static data:', error);
    
    // Restore admin directory if build fails
    if (process.env.NODE_ENV === 'production' || process.env.GITHUB_PAGES === 'true') {
      try {
        await fs.access(adminBackupDir);
        await fs.rename(adminBackupDir, adminDir);
        console.log('Restored admin directory after build failure');
      } catch (restoreError) {
        // Backup doesn't exist
      }
    }
    
    process.exit(1);
  }
}

async function restoreAdminDirectory() {
  const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');
  const adminBackupDir = path.join(process.cwd(), 'admin-backup');
  
  try {
    await fs.access(adminBackupDir);
    await fs.rename(adminBackupDir, adminDir);
    console.log('Restored admin directory after successful build');
  } catch (error) {
    // Backup doesn't exist
  }
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function buildBlogIndex(srcDataDir, publicDataDir) {
  try {
    // Import blog-utils dynamically in an async context
    const blogUtilsPath = path.join(process.cwd(), 'src', 'lib', 'blog-utils.ts');
    
    // For now, let's build the index manually from the file system
    const blogsDir = path.join(srcDataDir, 'blogs');
    const categoriesPath = path.join(blogsDir, 'categories.json');
    
    // Read categories
    const categoriesData = await fs.readFile(categoriesPath, 'utf-8');
    const categories = JSON.parse(categoriesData);
    
    const posts = [];
    
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        const subcategoryPath = path.join(blogsDir, category.id, subcategory.id);
        
        try {
          const files = await fs.readdir(subcategoryPath);
          const jsonFiles = files.filter(file => file.endsWith('.json'));
          
          for (const file of jsonFiles) {
            const filePath = path.join(subcategoryPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const post = JSON.parse(fileContent);
            
            // Convert to BlogListItem (excluding content)
            const { content, ...listItem } = post;
            posts.push(listItem);
          }
        } catch (error) {
          // Directory might not exist, continue
          continue;
        }
      }
    }
    
    // Sort by publish date
    posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    // Write blog index
    await fs.writeFile(
      path.join(publicDataDir, 'blogs-index.json'),
      JSON.stringify(posts, null, 2)
    );
    
    console.log(`Built blog index with ${posts.length} posts`);
  } catch (error) {
    console.error('Error building blog index:', error);
    // Create empty index as fallback
    await fs.writeFile(
      path.join(publicDataDir, 'blogs-index.json'),
      JSON.stringify([], null, 2)
    );
  }
}

if (require.main === module) {
  buildStaticData();
}

module.exports = { buildStaticData, restoreAdminDirectory };
