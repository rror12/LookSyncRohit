import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-deep-plum text-champagne-gold py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-headline italic">LookSync</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Perfectly coordinated complete looks for every special occasion. 
              Bridal, Festive, and Everyday elegance powered by AI.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/builder" className="hover:text-white transition-colors">Look Builder</Link></li>
              <li><Link href="/palette-matcher" className="hover:text-white transition-colors">Palette Matcher</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Explore Curated</Link></li>
              <li><Link href="/wardrobe" className="hover:text-white transition-colors">Wardrobe Manager</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Brand Portal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Connect</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pinterest</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">WhatsApp Community</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Customer Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-60">
          <p>© {new Date().getFullYear()} LookSync AI Styling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}