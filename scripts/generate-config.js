// scripts/generate-config.js
const fs = require('fs');
const path = require('path');

// Ambil isi file constants
const constantsPath = path.join(__dirname, '../src/shared/constants/api.js');
const constantsContent = fs.readFileSync(constantsPath, 'utf-8');

// Regex untuk ambil nilai API_BASE_URL
const apiBaseUrlMatch = constantsContent.match(/API_BASE_URL\s*=\s*['"]([^'"]+)['"]/);
const apiBaseUrl = apiBaseUrlMatch ? apiBaseUrlMatch[1] : '';

// Tambahkan endpoint lain jika perlu, misal LOGIN_PATH
const loginPathMatch = constantsContent.match(/LOGIN_PATH\s*=\s*['"]([^'"]+)['"]/);
const loginPath = loginPathMatch ? loginPathMatch[1] : '';

const configContent = `window.APP_CONFIG = {
  API_BASE_URL: "${apiBaseUrl}",
  LOGIN_PATH: "${loginPath}"
};
`;

const outputPath = path.join(__dirname, '../public/js/config.js');
fs.writeFileSync(outputPath, configContent);
console.log('public/js/config.js generated!'); 