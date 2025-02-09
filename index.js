const fs = require('fs');

const DATA_FILE = 'data.json';
const OUTPUT_FILE = 'output.json';
const LOG_FILE = 'process.log';

// Function to log messages
function logMessage(message) {
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
}

// Function to generate sample data
function generateData() {
  const numbers = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
  fs.writeFileSync(DATA_FILE, JSON.stringify(numbers, null, 2), 'utf8');
  logMessage('Generated new random data.');
}

// Function to read data from a file
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logMessage('Error reading data file.');
    return [];
  }
}

// Function to process numbers (filter evens, double them, sort)
function processNumbers(numbers) {
  const processed = numbers
    .filter(num => num % 2 === 0)
    .map(num => num * 2)
    .sort((a, b) => a - b);
  
  logMessage(`Processed ${numbers.length} numbers.`);
  return processed;
}

// Function to write processed data to a file
function saveResults(results) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf8');
  logMessage(`Saved ${results.length} processed numbers.`);
}

// Main function to run the program
function main() {
  if (!fs.existsSync(DATA_FILE)) {
    logMessage('Data file not found. Generating new data.');
    generateData();
  }

  const numbers = readData();
  if (numbers.length === 0) {
    logMessage('No valid data found.');
    return;
  }

  const processedNumbers = processNumbers(numbers);
  saveResults(processedNumbers);

  console.log('Processing complete. Check output.json.');
}

// Run the program
main();
