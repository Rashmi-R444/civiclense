export type ProjectCategory = 'government' | 'ngo' | 'private';
export type ProjectStatus = 'In Progress' | 'Delayed' | 'Completed' | 'Stalled' | 'Active' | 'Proposed' | 'Under Review' | 'Ongoing';
export type IssueCategory = 'infrastructure' | 'corruption' | 'environment' | 'public-safety' | 'health' | 'education';
export type ReportStatus = 'Submitted' | 'Verified' | 'Authority Notified' | 'Resolved';

export interface CivicProject {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number;
  budget: string;
  budgetNum: number;
  spent: number;
  department: string;
  contractor: string;
  location: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  lastUpdated: string;
  followers: number;
  issueCategory: IssueCategory;
  volunteers?: number;
  beneficiaries?: string;
  orgName?: string;
  sector?: string;
  publicBenefit?: string;
  controversy?: boolean;
}

export interface CivicReport {
  id: string;
  title: string;
  category: IssueCategory;
  description: string;
  location: string;
  lat: number;
  lng: number;
  status: ReportStatus;
  reporter: string;
  date: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  anonymous: boolean;
  photoUrl?: string;
}

export interface Evidence {
  id: string;
  imageUrl: string;
  lat: number;
  lng: number;
  locationLabel: string;
  timestamp: string;
  linkedReportId?: string;
}

export interface CivicUser {
  id: string;
  name: string;
  email: string;
  role: 'Citizen' | 'Verified Reporter' | 'NGO Partner' | 'Government Official';
  reputation: number;
  reportsCount: number;
  followingCount: number;
  avatar: string;
  joinDate: string;
}

export const projects: CivicProject[] = [
  // Government
  {
    id: 'g1', name: 'Smart City Infrastructure Upgrade – Phase 2', description: 'Comprehensive upgrade of city infrastructure including smart traffic signals, IoT-enabled waste management, and digital governance kiosks across 12 zones.',
    category: 'government', status: 'In Progress', progress: 58, budget: '₹450 Cr', budgetNum: 4500000000, spent: 2610000000,
    department: 'Urban Development', contractor: 'L&T Smart World', location: 'Bengaluru', lat: 12.9716, lng: 77.5946,
    startDate: '2024-03-01', endDate: '2025-12-31', lastUpdated: '2026-03-25', followers: 2340, issueCategory: 'infrastructure',
  },
  {
    id: 'g2', name: 'National Highway 48 Expansion', description: 'Widening NH-48 from 4 to 8 lanes between Bengaluru and Tumkur to reduce congestion and improve connectivity.',
    category: 'government', status: 'Delayed', progress: 35, budget: '₹1,200 Cr', budgetNum: 12000000000, spent: 4200000000,
    department: 'NHAI', contractor: 'IRB Infra', location: 'Bengaluru-Tumkur', lat: 13.1007, lng: 77.4872,
    startDate: '2023-06-15', endDate: '2026-06-30', lastUpdated: '2026-03-20', followers: 5120, issueCategory: 'infrastructure',
  },
  {
    id: 'g3', name: 'PM Awas Yojana Housing Units – Bengaluru North', description: 'Construction of 2,400 affordable housing units for economically weaker sections under the PM Awas Yojana scheme.',
    category: 'government', status: 'Completed', progress: 100, budget: '₹80 Cr', budgetNum: 800000000, spent: 780000000,
    department: 'Housing & Urban Affairs', contractor: 'NBCC India', location: 'Bengaluru North', lat: 13.0827, lng: 77.5877,
    startDate: '2023-01-10', endDate: '2025-08-15', lastUpdated: '2025-09-01', followers: 1890, issueCategory: 'infrastructure',
  },
  {
    id: 'g4', name: 'Sewage Treatment Plant – Zone 4', description: 'Construction of a 50 MLD sewage treatment plant to serve Zone 4 residential areas and prevent untreated discharge into lakes.',
    category: 'government', status: 'Stalled', progress: 22, budget: '₹35 Cr', budgetNum: 350000000, spent: 77000000,
    department: 'BWSSB', contractor: 'VA Tech Wabag', location: 'Zone 4, Bengaluru', lat: 12.9352, lng: 77.6245,
    startDate: '2024-09-01', endDate: '2026-03-31', lastUpdated: '2026-02-14', followers: 870, issueCategory: 'environment',
  },
  // NGO
  {
    id: 'n1', name: 'Clean Bellandur Lake Campaign', description: 'Community-driven initiative to clean, restore and protect Bellandur Lake from industrial and sewage pollution.',
    category: 'ngo', status: 'Active', progress: 45, budget: '₹2.1 Cr', budgetNum: 21000000, spent: 9450000,
    department: 'Environment', contractor: '', location: 'Bellandur, Bengaluru', lat: 12.9352, lng: 77.6710,
    startDate: '2025-01-15', endDate: '2026-12-31', lastUpdated: '2026-03-22', followers: 4200, issueCategory: 'environment',
    orgName: 'Hasiru Dala', volunteers: 340,
  },
  {
    id: 'n2', name: 'Digital Literacy Drive – Rural Karnataka', description: 'Teaching digital skills to rural communities across Karnataka with mobile computer labs and trained volunteers.',
    category: 'ngo', status: 'Active', progress: 62, budget: '₹85 L', budgetNum: 8500000, spent: 5270000,
    department: 'Education', contractor: '', location: 'Rural Karnataka', lat: 14.7950, lng: 75.7133,
    startDate: '2025-04-01', endDate: '2026-03-31', lastUpdated: '2026-03-18', followers: 1560, issueCategory: 'education',
    orgName: 'Pratham', volunteers: 120, beneficiaries: '5,000+',
  },
  {
    id: 'n3', name: 'Urban Tree Planting Initiative', description: 'Planted 12,000 native trees across Bengaluru to increase green cover and combat urban heat island effect.',
    category: 'ngo', status: 'Completed', progress: 100, budget: '₹45 L', budgetNum: 4500000, spent: 4200000,
    department: 'Environment', contractor: '', location: 'Bengaluru', lat: 12.9816, lng: 77.5716,
    startDate: '2024-06-01', endDate: '2025-11-30', lastUpdated: '2025-12-05', followers: 3100, issueCategory: 'environment',
    orgName: 'SayTrees', volunteers: 890, beneficiaries: '50,000+',
  },
  {
    id: 'n4', name: 'Mid-Day Meal Quality Audit', description: 'Ongoing audit of mid-day meal quality across 500 government schools to ensure nutritional standards are met.',
    category: 'ngo', status: 'Ongoing', progress: 38, budget: '₹12 L', budgetNum: 1200000, spent: 456000,
    department: 'Education', contractor: '', location: 'Karnataka', lat: 12.3110, lng: 76.6553,
    startDate: '2025-08-01', endDate: '2026-07-31', lastUpdated: '2026-03-24', followers: 920, issueCategory: 'health',
    orgName: 'Akshaya Patra', volunteers: 65, beneficiaries: '120,000+',
  },
  // Private
  {
    id: 'pr1', name: 'Metro Phase 3 – Purple Line', description: 'Extension of Namma Metro Purple Line from Whitefield to Challaghatta with 14 new stations.',
    category: 'private', status: 'In Progress', progress: 42, budget: '₹7,500 Cr', budgetNum: 75000000000, spent: 31500000000,
    department: 'Transport', contractor: 'BMRCL', location: 'Bengaluru', lat: 12.9850, lng: 77.7100,
    startDate: '2023-11-01', endDate: '2027-12-31', lastUpdated: '2026-03-26', followers: 8400, issueCategory: 'infrastructure',
    sector: 'Public Sector',
  },
  {
    id: 'pr2', name: 'Tech Park SEZ Development – Whitefield', description: 'Development of a 50-acre Special Economic Zone for IT companies with sustainable building designs.',
    category: 'private', status: 'Under Review', progress: 15, budget: '₹2,200 Cr', budgetNum: 22000000000, spent: 3300000000,
    department: 'Commerce', contractor: 'Embassy Group', location: 'Whitefield, Bengaluru', lat: 12.9698, lng: 77.7500,
    startDate: '2026-01-01', endDate: '2028-12-31', lastUpdated: '2026-03-15', followers: 2100, issueCategory: 'infrastructure',
    sector: 'Private', controversy: true,
  },
  {
    id: 'pr3', name: 'Solar Rooftop Initiative – 10,000 Homes', description: 'Joint public-private initiative to install solar rooftop panels on 10,000 homes across Bengaluru.',
    category: 'private', status: 'Active', progress: 55, budget: '₹320 Cr', budgetNum: 3200000000, spent: 1760000000,
    department: 'Energy', contractor: 'BESCOM + Tata Power', location: 'Bengaluru', lat: 12.9600, lng: 77.5800,
    startDate: '2025-03-01', endDate: '2026-09-30', lastUpdated: '2026-03-20', followers: 3300, issueCategory: 'environment',
    sector: 'Public-Private', publicBenefit: 'Reduces energy costs by 40% for households',
  },
  {
    id: 'pr4', name: 'Waste-to-Energy Plant – Bidadi', description: 'Proposed waste-to-energy plant to process 2,000 tonnes of municipal waste daily.',
    category: 'private', status: 'Proposed', progress: 5, budget: '₹900 Cr', budgetNum: 9000000000, spent: 450000000,
    department: 'Environment', contractor: 'Ramky Enviro', location: 'Bidadi, Karnataka', lat: 12.7990, lng: 77.3870,
    startDate: '2026-06-01', endDate: '2029-06-30', lastUpdated: '2026-03-10', followers: 1450, issueCategory: 'environment',
    sector: 'Private', controversy: true, publicBenefit: 'Processes 2,000 tonnes waste/day',
  },
];

export const reports: CivicReport[] = [
  { id: 'r1', title: 'Massive pothole on MG Road near Trinity Circle', category: 'infrastructure', description: 'A pothole approximately 3 feet wide has formed on MG Road near Trinity Circle, causing multiple vehicle accidents. Reported to BBMP but no action taken for 3 weeks.', location: 'MG Road, Bengaluru', lat: 12.9758, lng: 77.6065, status: 'Verified', reporter: 'Arjun Reddy', date: '2026-03-20', upvotes: 342, downvotes: 5, comments: 28, anonymous: false },
  { id: 'r2', title: 'Illegal dumping in Varthur Lake outlet', category: 'environment', description: 'Industrial waste is being dumped into the Varthur Lake outlet channel during nighttime. Chemical smell is unbearable for nearby residents.', location: 'Varthur, Bengaluru', lat: 12.9416, lng: 77.7400, status: 'Authority Notified', reporter: 'Anonymous', date: '2026-03-18', upvotes: 891, downvotes: 12, comments: 67, anonymous: true },
  { id: 'r3', title: 'Missing funds in community center renovation', category: 'corruption', description: 'The Jayanagar community center renovation was budgeted at ₹45L but work completed appears to be worth ₹15L at most. RTI filed reveals no proper bills.', location: 'Jayanagar, Bengaluru', lat: 12.9279, lng: 77.5810, status: 'Submitted', reporter: 'Kavitha Murthy', date: '2026-03-22', upvotes: 1205, downvotes: 34, comments: 156, anonymous: false },
  { id: 'r4', title: 'Broken streetlights on Outer Ring Road stretch', category: 'public-safety', description: '14 consecutive streetlights non-functional on ORR between Marathahalli and Bellandur for over 2 months. Multiple chain-snatching incidents reported.', location: 'ORR, Bengaluru', lat: 12.9502, lng: 77.6984, status: 'Resolved', reporter: 'Suresh Kumar', date: '2026-02-28', upvotes: 567, downvotes: 8, comments: 43, anonymous: false },
  { id: 'r5', title: 'Contaminated water supply in Whitefield', category: 'health', description: 'Residents of Whitefield Phase 2 receiving yellow-tinted water with foul smell. Multiple children fell ill in the past week.', location: 'Whitefield, Bengaluru', lat: 12.9698, lng: 77.7500, status: 'Verified', reporter: 'Priya Nair', date: '2026-03-24', upvotes: 723, downvotes: 3, comments: 89, anonymous: false },
  { id: 'r6', title: 'School building wall collapsed, no safety measures', category: 'education', description: 'Government primary school in Yelahanka has a collapsed boundary wall. Children play near the debris. No temporary barriers erected.', location: 'Yelahanka, Bengaluru', lat: 13.1007, lng: 77.5963, status: 'Submitted', reporter: 'Anonymous', date: '2026-03-26', upvotes: 445, downvotes: 2, comments: 31, anonymous: true },
];

export const currentUser: CivicUser = {
  id: 'u1', name: 'Rashmi', email: 'rashmi@example.com',
  role: 'Verified Reporter', reputation: 850, reportsCount: 24,
  followingCount: 18, avatar: '👤', joinDate: '2025-03-15',
};

export const stats = {
  totalReports: 12480,
  projectsTracked: 384,
  citiesCovered: 28,
  issuesResolved: 3102,
};

export const issueCategoryConfig: Record<IssueCategory, { label: string; color: string; bgColor: string }> = {
  infrastructure: { label: 'Infrastructure', color: 'text-info', bgColor: 'bg-info/10' },
  corruption: { label: 'Corruption', color: 'text-destructive', bgColor: 'bg-destructive/10' },
  environment: { label: 'Environment', color: 'text-accent', bgColor: 'bg-accent/10' },
  'public-safety': { label: 'Public Safety', color: 'text-warning', bgColor: 'bg-warning/10' },
  health: { label: 'Health', color: 'text-accent', bgColor: 'bg-accent/10' },
  education: { label: 'Education', color: 'text-info', bgColor: 'bg-info/10' },
};

export const projectStatusConfig: Record<string, { color: string; bgColor: string }> = {
  'In Progress': { color: 'text-info', bgColor: 'bg-info/10' },
  'Delayed': { color: 'text-destructive', bgColor: 'bg-destructive/10' },
  'Completed': { color: 'text-accent', bgColor: 'bg-accent/10' },
  'Stalled': { color: 'text-destructive', bgColor: 'bg-destructive/10' },
  'Active': { color: 'text-accent', bgColor: 'bg-accent/10' },
  'Proposed': { color: 'text-muted-foreground', bgColor: 'bg-muted' },
  'Under Review': { color: 'text-warning', bgColor: 'bg-warning/10' },
  'Ongoing': { color: 'text-info', bgColor: 'bg-info/10' },
};
