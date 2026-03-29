const fs = require('fs');
let s = fs.readFileSync('app/shop/page.tsx', 'utf8');

s = s.replace('const [categories, setCategories] = useState([]);', 'const [categories, setCategories] = useState<string[]>([]);');
s = s.replace('const [bouquets, setBouquets] = useState([]);', 'const [bouquets, setBouquets] = useState<Bouquet[]>([]);');
s = s.replace('const [selectedCategory, setSelectedCategory] = useState(\'All\');', 'const [selectedCategory, setSelectedCategory] = useState<string>(\'All\');');

fs.writeFileSync('app/shop/page.tsx', s);
