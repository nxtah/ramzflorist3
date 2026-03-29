const fs = require('fs');
const path = 'components/store-interface.tsx';
let s = fs.readFileSync(path, 'utf8');

s = s.replace(
    'result = result.filter(b => b.name.toLowerCase().includes(query) || b.description.toLowerCase().includes(query));',
    'result = result.filter(b => b.name.toLowerCase().includes(query));'
);

fs.writeFileSync(path, s);
console.log('Fixed type error in store-interface.tsx');
