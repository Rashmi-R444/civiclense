import { Eye, Shield, Users, BarChart3, Globe, Award } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import StatsBar from '@/components/StatsBar';

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
            <Eye className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold">About CivicLens</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            CivicLens is a civic transparency and accountability platform that empowers citizens to report, track, and verify public issues, projects, and government activities.
          </p>
        </div>

        <StatsBar />

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Transparency', desc: 'Every public project tracked openly with budget, timeline, and progress data.' },
            { icon: Users, title: 'Community-Driven', desc: 'Citizens report issues, upvote concerns, and hold authorities accountable.' },
            { icon: BarChart3, title: 'Data-Backed', desc: 'Real-time analytics and insights on civic issues across cities.' },
          ].map(f => (
            <div key={f.title} className="bg-card rounded-lg border p-6 text-center space-y-3">
              <f.icon className="w-8 h-8 text-accent mx-auto" />
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for civic good.</p>
          <p className="mt-1">Open Data API coming soon.</p>
        </div>
      </div>
    </AppLayout>
  );
}
