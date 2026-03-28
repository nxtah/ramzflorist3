const fs = require('fs');
const files = [
  'app/api/bouquets/route.ts',
  'app/api/categories/route.ts',
  'app/api/config/route.ts',
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes("export const dynamic")) {
    content = content.replace("export async function GET", "export const dynamic = 'force-dynamic';\n\nexport async function GET");
    fs.writeFileSync(file, content);
  }
}
