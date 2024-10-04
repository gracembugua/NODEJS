const fs = require('fs');
const path = require('path');

const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

const directoryToTree = (rootDir, depth) => {
  const stats = fs.statSync(rootDir);
  const name = path.basename(rootDir);
  const result = {
    path: rootDir,
    name: name,
    type: stats.isDirectory() ? 'dir' : 'file',
    size: getFileSize(rootDir),
  };

  if (stats.isDirectory() && depth > 0) {
    result.children = [];
    const items = fs.readdirSync(rootDir);

    for (let item of items) {
      const itemPath = path.join(rootDir, item);
      const child = directoryToTree(itemPath, depth - 1);
      result.children.push(child);
    }
  }

  return result;
};

const tree = directoryToTree('dummy_dir', 5);
console.log(JSON.stringify(tree, null, 2));
