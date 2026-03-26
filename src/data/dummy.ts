export type ProjectStatus = 'Not Started' | 'Ongoing' | 'Completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  location: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  department: string;
  contractor: string;
  images: string[];
  issues: number;
}

export interface Issue {
  id: string;
  projectId: string;
  projectName: string;
  type: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Resolved';
  reporter: string;
  date: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin';
  points: number;
  badges: string[];
  avatar: string;
  joinDate: string;
  reportsCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  projectId?: string;
  type: 'update' | 'alert' | 'reward' | 'report';
}

export const projects: Project[] = [
  {
    id: 'p1', name: 'Highway 45 Expansion', description: 'Widening of Highway 45 from 4 to 6 lanes to reduce congestion and improve safety for commuters in the metropolitan corridor.',
    status: 'Ongoing', progress: 65, budget: 12500000, spent: 8125000, location: 'Downtown Metro', lat: 28.6139, lng: 77.209,
    startDate: '2025-01-15', endDate: '2026-06-30', department: 'Transport', contractor: 'BuildCorp Ltd.', images: [], issues: 3,
  },
  {
    id: 'p2', name: 'Central Park Renovation', description: 'Complete renovation of Central Park including new walking trails, playground equipment, and landscaping improvements.',
    status: 'Ongoing', progress: 40, budget: 3200000, spent: 1280000, location: 'Green District', lat: 28.625, lng: 77.215,
    startDate: '2025-03-01', endDate: '2025-12-31', department: 'Parks', contractor: 'GreenScape Inc.', images: [], issues: 1,
  },
  {
    id: 'p3', name: 'Water Treatment Plant', description: 'Construction of a new water treatment facility to serve 50,000 households with clean drinking water.',
    status: 'Not Started', progress: 0, budget: 8500000, spent: 0, location: 'Industrial Zone', lat: 28.59, lng: 77.22,
    startDate: '2026-01-01', endDate: '2027-12-31', department: 'Utilities', contractor: 'AquaPure Systems', images: [], issues: 0,
  },
  {
    id: 'p4', name: 'Smart Street Lighting', description: 'Installation of energy-efficient LED smart lights across 200 streets with IoT monitoring capability.',
    status: 'Completed', progress: 100, budget: 1800000, spent: 1650000, location: 'Citywide', lat: 28.63, lng: 77.2,
    startDate: '2024-06-01', endDate: '2025-02-28', department: 'Infrastructure', contractor: 'LightTech Solutions', images: [], issues: 0,
  },
  {
    id: 'p5', name: 'Community Health Center', description: 'Building a new primary health center with 30 beds, OPD services, and emergency care in the eastern suburb.',
    status: 'Ongoing', progress: 78, budget: 5000000, spent: 3900000, location: 'East Suburb', lat: 28.645, lng: 77.23,
    startDate: '2024-09-15', endDate: '2025-09-15', department: 'Health', contractor: 'MediBuilt Corp.', images: [], issues: 2,
  },
  {
    id: 'p6', name: 'School Digital Initiative', description: 'Equipping 50 government schools with computer labs, tablets, and high-speed internet connectivity.',
    status: 'Ongoing', progress: 55, budget: 2200000, spent: 1210000, location: 'Multiple', lat: 28.61, lng: 77.19,
    startDate: '2025-02-01', endDate: '2025-11-30', department: 'Education', contractor: 'EduTech Partners', images: [], issues: 1,
  },
];

export const issues: Issue[] = [
  { id: 'i1', projectId: 'p1', projectName: 'Highway 45 Expansion', type: 'Safety Hazard', description: 'Open trenches near pedestrian crossing without proper barricades', status: 'Pending', reporter: 'Arun Mehta', date: '2026-03-20' },
  { id: 'i2', projectId: 'p1', projectName: 'Highway 45 Expansion', type: 'Delay', description: 'Construction halted for 2 weeks, no workers on site', status: 'Approved', reporter: 'Priya Sharma', date: '2026-03-18' },
  { id: 'i3', projectId: 'p1', projectName: 'Highway 45 Expansion', type: 'Quality', description: 'Substandard materials being used for road surface', status: 'Pending', reporter: 'Raj Kumar', date: '2026-03-15' },
  { id: 'i4', projectId: 'p2', projectName: 'Central Park Renovation', type: 'Environmental', description: 'Trees being cut without proper permits', status: 'Rejected', reporter: 'Maya Singh', date: '2026-03-12' },
  { id: 'i5', projectId: 'p5', projectName: 'Community Health Center', type: 'Budget', description: 'Cost overrun suspected — materials invoiced at 3x market rate', status: 'Pending', reporter: 'Vikram Patel', date: '2026-03-22' },
  { id: 'i6', projectId: 'p5', projectName: 'Community Health Center', type: 'Delay', description: 'Electrical work not started despite timeline', status: 'Approved', reporter: 'Neha Gupta', date: '2026-03-10' },
  { id: 'i7', projectId: 'p6', projectName: 'School Digital Initiative', type: 'Quality', description: 'Tablets provided are refurbished, not new as promised', status: 'Pending', reporter: 'Arun Mehta', date: '2026-03-24' },
];

export const users: User[] = [
  { id: 'u1', name: 'Arun Mehta', email: 'arun@example.com', role: 'citizen', points: 850, badges: ['Reporter', 'Watchdog'], avatar: '👤', joinDate: '2025-06-15', reportsCount: 12 },
  { id: 'u2', name: 'Priya Sharma', email: 'priya@example.com', role: 'citizen', points: 720, badges: ['Contributor', 'Reporter'], avatar: '👩', joinDate: '2025-08-01', reportsCount: 8 },
  { id: 'u3', name: 'Raj Kumar', email: 'raj@example.com', role: 'citizen', points: 650, badges: ['Watchdog'], avatar: '👨', joinDate: '2025-09-20', reportsCount: 6 },
  { id: 'u4', name: 'Maya Singh', email: 'maya@example.com', role: 'citizen', points: 480, badges: ['Reporter'], avatar: '👩‍💼', joinDate: '2025-11-10', reportsCount: 4 },
  { id: 'u5', name: 'Vikram Patel', email: 'vikram@example.com', role: 'citizen', points: 920, badges: ['Reporter', 'Watchdog', 'Contributor'], avatar: '🧑', joinDate: '2025-05-01', reportsCount: 15 },
  { id: 'u6', name: 'Neha Gupta', email: 'neha@example.com', role: 'admin', points: 0, badges: [], avatar: '👩‍💻', joinDate: '2025-01-01', reportsCount: 0 },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Project Update', message: 'Highway 45 Expansion progress updated to 65%', date: '2026-03-25', read: false, projectId: 'p1', type: 'update' },
  { id: 'n2', title: 'Issue Approved', message: 'Your report on construction delay has been approved', date: '2026-03-24', read: false, projectId: 'p1', type: 'alert' },
  { id: 'n3', title: 'Badge Earned!', message: 'You earned the "Watchdog" badge for 5+ reports', date: '2026-03-23', read: true, type: 'reward' },
  { id: 'n4', title: 'New Report Filed', message: 'A new quality concern was filed for School Digital Initiative', date: '2026-03-24', read: false, projectId: 'p6', type: 'report' },
  { id: 'n5', title: 'Project Completed', message: 'Smart Street Lighting project marked as completed', date: '2026-03-20', read: true, projectId: 'p4', type: 'update' },
];

export const leaderboard = users
  .filter(u => u.role === 'citizen')
  .sort((a, b) => b.points - a.points)
  .map((u, i) => ({ ...u, rank: i + 1 }));

export const formatCurrency = (n: number) =>
  '₹' + (n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 1000 ? (n / 1000).toFixed(0) + 'K' : n.toString());
