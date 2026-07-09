const fs = require('fs');
const path = require('path');

const MAIN_SITE = __dirname;
// Adjust this relative path if Github repos aren't in the same parent
const SEPARATE_REPO = path.resolve(MAIN_SITE, '../open-measures'); 

const IGNORE_LIST = new Set([
  '.git',
  '.gitignore',
  '.github',
  'node_modules',
  'README.md',
  '.DS_Store'
]);

function setupDynamicLinks() {
  if (!fs.existsSync(SEPARATE_REPO)) {
    console.error(`❌ Error: Separate repository not found at: ${SEPARATE_REPO}`);
    process.exit(1);
  }

  console.log('🚀 Dynamically syncing local documentation shortcuts...');

  const repoItems = fs.readdirSync(SEPARATE_REPO);

  repoItems.forEach(item => {
    if (item.startsWith('.') || IGNORE_LIST.has(item)) {
      return;
    }

    const target = path.join(SEPARATE_REPO, item);
    const linkPath = path.join(MAIN_SITE, item);

    // Safely wipe out existing files, folders, or old symlinks in the main site
    try {
      fs.rmSync(linkPath, { recursive: true, force: true });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    const isDir = fs.statSync(target).isDirectory();

    if (isDir) {
      // Folders use junctions: No Admin required, allows live hot-reloading
      const type = process.platform === 'win32' ? 'junction' : 'dir';
      fs.symlinkSync(target, linkPath, type);
      console.log(`🔗 Linked directory: ${item}`);
    } else {
      // Files are copied: Bypasses Windows EPERM restrictions entirely
      fs.copyFileSync(target, linkPath);
      console.log(`📋 Copied config file: ${item}`);
    }
  });
}

setupDynamicLinks();