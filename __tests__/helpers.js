const fs = require('fs');
const path = require('path');

const reactDocs = require('react-docgen');

const customHandler = require('../index.js'); // index.js (module under test)

// Small helper to normalize single vs multi-component output
function getFirstDoc(doc) {
  return Array.isArray(doc) ? doc[0] : doc;
}

// Parses a fixture file from __tests__/fixtures and returns the first component doc
function parseFixture(relativePath) {
  const filePath = path.join(__dirname, '..', 'fixtures', relativePath);
  const src = fs.readFileSync(filePath, 'utf8');

  const result = reactDocs.parse(
    src,
    null,
    [customHandler, ...reactDocs.defaultHandlers],
    // fix for node.js environment
    {
      filename: filePath, // 👈 tells react-docgen this is TSX
    }
  );

  return getFirstDoc(result);
}

module.exports = {
  parseFixture,
};
