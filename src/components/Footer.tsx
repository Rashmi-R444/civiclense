import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
                <Eye className="w-3 h-3 text-accent-foreground" />
              </div>
              <span className="font-bold text-sm">CivicLens</span>
            </div>
            <p className="text-xs text-muted-foreground">Empowering citizens with transparency and accountability.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold mb-2">Platform</h4>
            <div className="space-y-1">
              <Link to="/map" className="block text-xs text-muted-foreground hover:text-foreground">Map View</Link>
              <Link to="/projects" className="block text-xs text-muted-foreground hover:text-foreground">Projects</Link>
              <Link to="/reports" className="block text-xs text-muted-foreground hover:text-foreground">Reports</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold mb-2">Company</h4>
            <div className="space-y-1">
              <Link to="/about" className="block text-xs text-muted-foreground hover:text-foreground">About</Link>
              <span className="block text-xs text-muted-foreground">Privacy Policy</span>
              <span className="block text-xs text-muted-foreground">Open Data API</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold mb-2">Contact</h4>
            <p className="text-xs text-muted-foreground">hello@civiclens.org</p>
            <p className="text-xs text-muted-foreground mt-1">Bengaluru, India</p>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-center text-xs text-muted-foreground">
          © 2026 CivicLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
