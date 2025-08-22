const fs = require('fs');
const path = require('path');

// Пример: данные приходят через API или форму
const scriptData = JSON.parse(process.env.SCRIPT_DATA || '{}'); // Замените на реальный источник данных
const { name, content, password } = scriptData;

// Простая обфускация (XOR + Base64)
function obfuscate(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return Buffer.from(result).toString('base64');
}

const obfuscatedContent = obfuscate(content, password);
const filePath = path.join('code', `${name}.lua`);

// Сохранение файла
fs.writeFileSync(filePath, `password:${password}\ncontent:${obfuscatedContent}`);
console.log(`Saved obfuscated script to ${filePath}`);
