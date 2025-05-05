/**
 * Script to add ESLint disable comment for unescaped entities
 * to all React component files in the project.
 * 
 * Usage: node scripts/add-eslint-disable.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Directories to scan
const DIRS_TO_SCAN = [
  path.resolve(__dirname, '../components'),
  path.resolve(__dirname, '../pages')
];

const ESLINT_COMMENT = '/* eslint-disable react/no-unescaped-entities */';

/**
 * Check if file already has the ESLint disable comment
 */
async function fileHasComment(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    return content.includes(ESLINT_COMMENT);
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error);
    return false;
  }
}

/**
 * Add ESLint disable comment to a file
 */
async function addCommentToFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Check if file already has the comment
    if (content.includes(ESLINT_COMMENT)) {
      console.log(`File already has comment: ${filePath}`);
      return;
    }
    
    // Add the comment at the top of the file
    const modifiedContent = `${ESLINT_COMMENT}\n${content}`;
    await writeFile(filePath, modifiedContent, 'utf8');
    console.log(`Added comment to: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

/**
 * Recursively process directories
 */
async function processDirectory(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (
        stat.isFile() && 
        (file.endsWith('.tsx') || file.endsWith('.jsx'))
      ) {
        // Check and process TypeScript/JSX React files
        const hasComment = await fileHasComment(fullPath);
        
        if (!hasComment) {
          await addCommentToFile(fullPath);
        } else {
          console.log(`Skipping (already has comment): ${fullPath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Adding ESLint disable comments to component files...');
  
  let fileCount = 0;
  
  for (const dir of DIRS_TO_SCAN) {
    try {
      // Check if directory exists
      if (fs.existsSync(dir)) {
        console.log(`Processing directory: ${dir}`);
        await processDirectory(dir);
        fileCount++;
      } else {
        console.warn(`Directory does not exist: ${dir}`);
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }
  
  console.log(`Completed! Processed ${fileCount} files.`);
}

// Run the script
main().catch(console.error);
