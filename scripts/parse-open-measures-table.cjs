const fs = require('fs');
const path = require('path');

// Check if running in GitHub Actions
const isCI = process.env.CI === 'true';

// TEMPORARY LOGGING
console.log('🔍 [DEBUG] Current Working Directory (cwd):', process.cwd());
console.log('🔍 [DEBUG] Script Directory (__dirname):', __dirname);
console.log('🔍 [DEBUG] Running in CI environment?', isCI);

//const CSV_PATH = path.join(__dirname, '../open-measures-content/Tools-example-table - Sheet1.csv');
let CSV_PATH;

if (isCI) {
  // In GitHub Actions, check root-level checkout (and fallback to nested if the repo has an inner folder)
  const primaryCIPath = path.join(__dirname, '../open-measures-content/Tools-example-table - Sheet1.csv');
  const nestedCIPath = path.join(__dirname, '../open-measures-content/open-measures-content/Tools-example-table - Sheet1.csv');
  console.log('🔍 [DEBUG] Checking CI candidate 1:', primaryCIPath, '-> Exists?', fs.existsSync(primaryCIPath));
  console.log('🔍 [DEBUG] Checking CI candidate 2:', nestedCIPath, '-> Exists?', fs.existsSync(nestedCIPath));
  CSV_PATH = fs.existsSync(primaryCIPath) ? primaryCIPath : nestedCIPath;
} else {
  CSV_PATH = path.join(__dirname, '../open-measures-content/Tools-example-table - Sheet1.csv');
}


const JSON_OUTPUT_PATH = path.join(__dirname, '../src/data/tableData.json');

// A robust CSV state-machine parser to handle commas trapped inside quotes
function parseCSV(csvText) {
  const result = [];
  let row = [''];
  const rows = [row];
  let insideQuote = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        row[row.length - 1] += '"'; // Handle escaped quotes ""
        i++;
      } else {
        insideQuote = !insideQuote; // Toggle quote state
      }
    } else if (char === ',' && !insideQuote) {
      row.push(''); // Move to next column
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row = [''];
      rows.push(row); // Move to next row
    } else {
      row[row.length - 1] += char;
    }
  }

  // Filter out any trailing empty rows
  const cleanRows = rows.filter(r => r.length > 1 || r[0] !== '');
  if (cleanRows.length === 0) return [];

  // Extract headers from the first row
  const headers = cleanRows[0].map(h => h.trim());
  
  // Build array of objects mapping headers to row values
  for (let i = 1; i < cleanRows.length; i++) {
    const currentRow = cleanRows[i];
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = currentRow[index] ? currentRow[index].trim() : '';
    });
    result.push(obj);
  }
  return result;
}

try {
  if (!fs.existsSync(CSV_PATH)) {
    console.warn(`⚠️ Warning: Local CSV file not found at ${CSV_PATH}. Skipping conversion.`);
    process.exit(0);
  }

  const csvData = fs.readFileSync(CSV_PATH, 'utf8');
  const jsonData = parseCSV(csvData);
  
  // Write out the clean JSON file
  fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(jsonData, null, 2));
  console.log('✅ Successfully compiled local CSV data into tableData.json!');
} catch (error) {
  console.error('❌ Failed to convert local CSV file:', error);
}