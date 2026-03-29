const fs = require('fs');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let s = fs.readFileSync(filePath, 'utf8');
  
  // Fix imports
  if (s.includes('import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"')) {
      s = s.replace(
          'import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"',
          'import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"'
      );
  } else if (s.includes('SheetContent,\n    SheetTrigger,\n} from "@/components/ui/sheet"')) {
      s = s.replace(
        'SheetContent,\n    SheetTrigger,\n} from "@/components/ui/sheet"',
        'SheetContent,\n    SheetTrigger,\n    SheetHeader,\n    SheetTitle\n} from "@/components/ui/sheet"'
      );
  }

  // Replace h3 with SheetHeader/SheetTitle
  const h3Match = '                <h3 className="font-heading text-xl font-bold text-primary-900 mb-6">Kategori</h3>';
  const newHeader = '                <SheetHeader>\n                  <SheetTitle className="font-heading text-xl font-bold text-primary-900 mb-6 text-left">Kategori</SheetTitle>\n                </SheetHeader>';
  
  if (s.includes(h3Match)) {
      s = s.replace(h3Match, newHeader);
  } else {
      const h3Match2 = '                                    <h3 className="font-heading text-xl font-bold text-primary-900 mb-6">Kategori</h3>';
      const newHeader2 = '                                    <SheetHeader>\n                                      <SheetTitle className="font-heading text-xl font-bold text-primary-900 mb-6 text-left">Kategori</SheetTitle>\n                                    </SheetHeader>';
      s = s.replace(h3Match2, newHeader2);
  }

  fs.writeFileSync(filePath, s);
  console.log('Fixed', filePath);
}

fixFile('app/shop/page.tsx');
fixFile('components/store-interface.tsx');

