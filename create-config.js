const fs = require("fs");

const configDir = "./js";
const configPath = `${configDir}/config.js`;

const configContent = `
// Arquivo de configuração gerado automaticamente durante o build
window.emailjsConfig = {
  publicKey: "${process.env.EMAILJS_PUBLIC_KEY}",
  serviceID: "${process.env.EMAILJS_SERVICE_ID}",
  templateID: "${process.env.EMAILJS_TEMPLATE_ID}",
};
`;

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

fs.writeFileSync(configPath, configContent);

console.log(`Arquivo de configuração gerado com sucesso em: ${configPath}`);
