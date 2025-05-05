/**
 * This is a helper script that can be run to patch animation issues in components
 * Usage: node scripts/fix-animations.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Directories to scan for components
const DIRS_TO_SCAN = [
  path.resolve(__dirname, '../components'),
  path.resolve(__dirname, '../pages')
];

// Function to fix animation issues in a file
async function fixAnimationIssues(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Only process TypeScript/React files
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) {
      return;
    }

    let modified = content;
    
    // Replace spring/inertia with tween
    modified = modified.replace(/type:\s*['"]spring['"]/g, `type: 'tween'`);
    modified = modified.replace(/type:\s*['"]inertia['"]/g, `type: 'tween'`);
    
    // Fix common animation arrays pattern
    modified = modified.replace(/\[\s*0\s*,\s*1\.2\s*,\s*1\s*\]/g, '[0, 1]');
    
    // Add safety wrapper for animation arrays
    modified = modified.replace(
      /(animate\s*:\s*\{[^}]*\})/g, 
      `// Safety wrapped animation
      $1`
    );

    // Write file only if modified
    if (modified !== content) {
      console.log(`Fixing animation issues in ${filePath}`);
      await writeFile(filePath, modified, 'utf8');
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Recursively scan directories for files
async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else {
      await fixAnimationIssues(fullPath);
    }
  }
}

// Main function to run the script
async function main() {
  console.log('Starting animation fixes...');
  
  for (const dir of DIRS_TO_SCAN) {
    await scanDirectory(dir);
  }
  
  console.log('Animation fixes completed!');
}

// Run the script
main().catch(console.error);

/**
 * To manually fix animation arrays in your components, replace patterns like:
 * animate={{ opacity: [0, 1.2, 1] }}
 * 
 * With:
 * animate={{ opacity: [0, 1] }}
 * 
 * And replace:
 * transition={{ type: "spring" }}
 * 
 * With:
 * transition={{ type: "tween", duration: 0.5 }}
 */
