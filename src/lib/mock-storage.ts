/**
 * In-browser demo database for AbhiEdit.
 * All data here is invented sample data for demo purposes.
 */

export const STORAGE_KEY = "abhiedit_media_ops_db_v1";

export type Role = "admin" | "employee";
export type Track = "physical" | "digital";
export type Health = "queued" | "in-progress" | "delivered" | "needs-attention";

export const STAGES = [
  "Pre-Production",
  "Shooting",
  "Ingest & Sync",
  "Rough Cut",
  "Fine Cut",
  "Color & Sound Mix",
  "Client Review",
  "Delivered",
] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_TRACK: Record<Stage, Track> = {
  "Pre-Production": "physical",
  Shooting: "physical",
  "Ingest & Sync": "physical",
  "Rough Cut": "digital",
  "Fine Cut": "digital",
  "Color & Sound Mix": "digital",
  "Client Review": "digital",
  Delivered: "digital",
};

export type ProjectType =
  | "Commercial Ad"
  | "YouTube Series"
  | "Music Video"
  | "Reels"
  | "Corporate Brand Film"
  | "Event";

export interface Employee {
  id: string;
  name: string;
  role: Role;
  title: string;
  department: string;
  track: Track;
  hourlyCost: number;
  score: number;
  punctuality: number;
  hoursThisMonth: number;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  city: string;
  projects: number;
}

export interface Lead {
  id: string;
  client: string;
  type: ProjectType;
  budget: number;
  source: "Referral" | "Instagram" | "Cold outreach" | "Website";
  status: "New Inquiry" | "Meeting Scheduled" | "Proposal Sent" | "Won/Converted" | "Lost/Closed";
  lostReason?: "Budget mismatch" | "Timeline mismatch" | "Went with competitor" | "Ghosted";
  createdAt: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  clientId: string;
  type: ProjectType;
  stage: Stage;
  health: Health;
  budget: number;
  actual: number;
  invoiced: number;
  revisions: number;
  revisionCap: number;
  assignees: string[];
  shootDate?: string;
  deadline: string;
  storageTb: number;
  delayed: boolean;
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  assigneeId: string;
  priority: "Low" | "Medium" | "High";
  status: "Queued" | "In Progress" | "Blocked" | "Done";
  due: string;
}

export interface WorkLog {
  id: string;
  employeeId: string;
  projectId: string;
  date: string;
  hours: number;
  summary: string;
  blocker?: string;
}

export interface InvoiceLine {
  description: string;
  hsn: string;
  gst: number;
  qty: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  projectId: string;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  issuedOn: string;
  lines: InvoiceLine[];
}

export interface RateCard {
  id: string;
  name: string;
  unit: string;
  rate: number;
  hsn: string;
  gst: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  bookings: { projectId: string; from: string; to: string }[];
}

export interface AssetFile {
  id: string;
  name: string;
  projectId: string;
  kind: "Raw footage" | "Working file" | "Stock" | "Music" | "Delivery";
  sizeGb: number;
  licenseExpiry?: string;
  licenseScope?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  in: string;
  out: string;
  status: "On time" | "Late" | "Absent";
}

export interface Leave {
  id: string;
  employeeId: string;
  from: string;
  to: string;
  type: "Casual" | "Sick" | "Unpaid";
  status: "Pending" | "Approved" | "Rejected";
}

export interface Db {
  employees: Employee[];
  clients: Client[];
  leads: Lead[];
  projects: Project[];
  tasks: Task[];
  worklogs: WorkLog[];
  invoices: Invoice[];
  rateCards: RateCard[];
  equipment: Equipment[];
  files: AssetFile[];
  attendance: Attendance[];
  leaves: Leave[];
}

export const CURRENT_EMPLOYEE_ID = "emp-3";

function seed(): Db {
  const employees: Employee[] = [
    {
      id: "emp-1",
      name: "Arpan Chakraborty",
      role: "admin",
      title: "Founder / Creative Director",
      department: "Leadership",
      track: "digital",
      hourlyCost: 900,
      score: 94,
      punctuality: 97,
      hoursThisMonth: 168,
    },
    {
      id: "emp-2",
      name: "Ritika Sen",
      role: "employee",
      title: "Senior Editor",
      department: "Post-Production",
      track: "digital",
      hourlyCost: 550,
      score: 91,
      punctuality: 93,
      hoursThisMonth: 154,
    },
    {
      id: "emp-3",
      name: "Dev Malhotra",
      role: "employee",
      title: "Editor / Colorist",
      department: "Post-Production",
      track: "digital",
      hourlyCost: 480,
      score: 87,
      punctuality: 88,
      hoursThisMonth: 149,
    },
    {
      id: "emp-4",
      name: "Nikhil Rao",
      role: "employee",
      title: "Director of Photography",
      department: "Production",
      track: "physical",
      hourlyCost: 700,
      score: 89,
      punctuality: 84,
      hoursThisMonth: 138,
    },
    {
      id: "emp-5",
      name: "Meera Iyer",
      role: "employee",
      title: "Production Coordinator",
      department: "Production",
      track: "physical",
      hourlyCost: 420,
      score: 92,
      punctuality: 96,
      hoursThisMonth: 160,
    },
  ];

  const clients: Client[] = [
    {
      id: "cli-1",
      name: "Lumen Beverages",
      contact: "Sanya Kapoor",
      phone: "+91 90000 00001",
      email: "sanya@example.com",
      city: "Mumbai",
      projects: 3,
    },
    {
      id: "cli-2",
      name: "Northwind Fitness",
      contact: "Rahul Menon",
      phone: "+91 90000 00002",
      email: "rahul@example.com",
      city: "Bengaluru",
      projects: 2,
    },
    {
      id: "cli-3",
      name: "Kastura Jewels",
      contact: "Ira Shah",
      phone: "+91 90000 00003",
      email: "ira@example.com",
      city: "Jaipur",
      projects: 1,
    },
    {
      id: "cli-4",
      name: "Foundry Studios",
      contact: "Aman Gill",
      phone: "+91 90000 00004",
      email: "aman@example.com",
      city: "Delhi",
      projects: 2,
    },
  ];

  const leads: Lead[] = [
    {
      id: "lead-1",
      client: "Vireo Skincare",
      type: "Commercial Ad",
      budget: 450000,
      source: "Referral",
      status: "New Inquiry",
      createdAt: "2026-09-02",
    },
    {
      id: "lead-2",
      client: "Tanmay Vaidya",
      type: "YouTube Series",
      budget: 180000,
      source: "Instagram",
      status: "Meeting Scheduled",
      createdAt: "2026-08-28",
    },
    {
      id: "lead-3",
      client: "Sable Automotive",
      type: "Corporate Brand Film",
      budget: 720000,
      source: "Website",
      status: "Proposal Sent",
      createdAt: "2026-08-21",
    },
    {
      id: "lead-4",
      client: "Kastura Jewels",
      type: "Reels",
      budget: 150000,
      source: "Referral",
      status: "Won/Converted",
      createdAt: "2026-08-10",
    },
    {
      id: "lead-5",
      client: "Halcyon Events",
      type: "Event",
      budget: 95000,
      source: "Cold outreach",
      status: "Lost/Closed",
      lostReason: "Budget mismatch",
      createdAt: "2026-08-04",
    },
  ];

  const projects: Project[] = [
    {
      id: "prj-1",
      code: "AE-118",
      title: "Lumen Summer Campaign — Hero Film",
      clientId: "cli-1",
      type: "Commercial Ad",
      stage: "Fine Cut",
      health: "in-progress",
      budget: 620000,
      actual: 288000,
      invoiced: 310000,
      revisions: 1,
      revisionCap: 2,
      assignees: ["emp-2", "emp-3"],
      shootDate: "2026-08-26",
      deadline: "2026-09-24",
      storageTb: 3.4,
      delayed: false,
    },
    {
      id: "prj-2",
      code: "AE-119",
      title: "Northwind Fitness — Reels Pack (12)",
      clientId: "cli-2",
      type: "Reels",
      stage: "Rough Cut",
      health: "needs-attention",
      budget: 210000,
      actual: 141000,
      invoiced: 105000,
      revisions: 2,
      revisionCap: 2,
      assignees: ["emp-3"],
      shootDate: "2026-09-04",
      deadline: "2026-09-18",
      storageTb: 1.1,
      delayed: true,
    },
    {
      id: "prj-3",
      code: "AE-120",
      title: "Kastura Jewels — Festive Shoot",
      clientId: "cli-3",
      type: "Reels",
      stage: "Shooting",
      health: "in-progress",
      budget: 150000,
      actual: 62000,
      invoiced: 0,
      revisions: 0,
      revisionCap: 3,
      assignees: ["emp-4", "emp-5"],
      shootDate: "2026-09-14",
      deadline: "2026-10-02",
      storageTb: 0.8,
      delayed: false,
    },
    {
      id: "prj-4",
      code: "AE-121",
      title: "Foundry Studios — Brand Documentary",
      clientId: "cli-4",
      type: "Corporate Brand Film",
      stage: "Client Review",
      health: "queued",
      budget: 880000,
      actual: 512000,
      invoiced: 600000,
      revisions: 1,
      revisionCap: 2,
      assignees: ["emp-2", "emp-4"],
      shootDate: "2026-07-30",
      deadline: "2026-09-20",
      storageTb: 6.2,
      delayed: false,
    },
    {
      id: "prj-5",
      code: "AE-117",
      title: "Lumen Beverages — Product Teasers",
      clientId: "cli-1",
      type: "Commercial Ad",
      stage: "Delivered",
      health: "delivered",
      budget: 240000,
      actual: 158000,
      invoiced: 240000,
      revisions: 1,
      revisionCap: 2,
      assignees: ["emp-3"],
      shootDate: "2026-07-08",
      deadline: "2026-08-12",
      storageTb: 1.6,
      delayed: false,
    },
    {
      id: "prj-6",
      code: "AE-122",
      title: "Northwind Fitness — Studio Launch Film",
      clientId: "cli-2",
      type: "Corporate Brand Film",
      stage: "Pre-Production",
      health: "queued",
      budget: 380000,
      actual: 24000,
      invoiced: 0,
      revisions: 0,
      revisionCap: 2,
      assignees: ["emp-5", "emp-4"],
      shootDate: "2026-09-28",
      deadline: "2026-10-30",
      storageTb: 0.2,
      delayed: false,
    },
  ];

  const tasks: Task[] = [
    {
      id: "tsk-1",
      title: "Fine cut v3 — trim opening 8s",
      projectId: "prj-1",
      assigneeId: "emp-3",
      priority: "High",
      status: "In Progress",
      due: "2026-09-13",
    },
    {
      id: "tsk-2",
      title: "Reels 7–12 rough assembly",
      projectId: "prj-2",
      assigneeId: "emp-3",
      priority: "High",
      status: "Blocked",
      due: "2026-09-12",
    },
    {
      id: "tsk-3",
      title: "Sync audio from field recorder",
      projectId: "prj-3",
      assigneeId: "emp-5",
      priority: "Medium",
      status: "Queued",
      due: "2026-09-15",
    },
    {
      id: "tsk-4",
      title: "Colour pass — interview blocks",
      projectId: "prj-4",
      assigneeId: "emp-2",
      priority: "Medium",
      status: "In Progress",
      due: "2026-09-16",
    },
    {
      id: "tsk-5",
      title: "Export YouTube + Reels masters",
      projectId: "prj-1",
      assigneeId: "emp-3",
      priority: "Low",
      status: "Queued",
      due: "2026-09-20",
    },
    {
      id: "tsk-6",
      title: "Lock shot list with client",
      projectId: "prj-6",
      assigneeId: "emp-5",
      priority: "Medium",
      status: "Queued",
      due: "2026-09-19",
    },
  ];

  const worklogs: WorkLog[] = [
    {
      id: "log-1",
      employeeId: "emp-3",
      projectId: "prj-1",
      date: "2026-09-11",
      hours: 6.5,
      summary: "Fine cut pass on hero film, replaced B-roll in act two.",
    },
    {
      id: "log-2",
      employeeId: "emp-3",
      projectId: "prj-2",
      date: "2026-09-11",
      hours: 1.5,
      summary: "Started reels 7–9.",
      blocker: "Waiting on approved music licence from client.",
    },
    {
      id: "log-3",
      employeeId: "emp-2",
      projectId: "prj-4",
      date: "2026-09-11",
      hours: 7,
      summary: "Colour pass on interview blocks 1–4.",
    },
    {
      id: "log-4",
      employeeId: "emp-5",
      projectId: "prj-3",
      date: "2026-09-10",
      hours: 8,
      summary: "Festive shoot day one — 6 cards dumped, 0.8TB ingested.",
    },
  ];

  const rateCards: RateCard[] = [
    { id: "rc-1", name: "Reel edit (up to 60s)", unit: "per video", rate: 9000, hsn: "998366", gst: 18 },
    { id: "rc-2", name: "Colour grade", unit: "per hour", rate: 3500, hsn: "998366", gst: 18 },
    { id: "rc-3", name: "Shoot day — DOP + kit", unit: "per day", rate: 42000, hsn: "998387", gst: 18 },
    { id: "rc-4", name: "Sound mix & master", unit: "per deliverable", rate: 12000, hsn: "998366", gst: 18 },
    { id: "rc-5", name: "Rush delivery surcharge", unit: "percent", rate: 25, hsn: "998366", gst: 18 },
  ];

  const invoices: Invoice[] = [
    {
      id: "inv-1",
      number: "AE/2026-27/014",
      projectId: "prj-1",
      status: "Sent",
      issuedOn: "2026-09-01",
      lines: [
        { description: "Shoot day — DOP + kit", hsn: "998387", gst: 18, qty: 3, rate: 42000 },
        { description: "Colour grade", hsn: "998366", gst: 18, qty: 12, rate: 3500 },
      ],
    },
    {
      id: "inv-2",
      number: "AE/2026-27/013",
      projectId: "prj-5",
      status: "Paid",
      issuedOn: "2026-08-14",
      lines: [
        { description: "Reel edit (up to 60s)", hsn: "998366", gst: 18, qty: 8, rate: 9000 },
        { description: "Sound mix & master", hsn: "998366", gst: 18, qty: 4, rate: 12000 },
      ],
    },
    {
      id: "inv-3",
      number: "AE/2026-27/012",
      projectId: "prj-2",
      status: "Overdue",
      issuedOn: "2026-08-02",
      lines: [{ description: "Reel edit (up to 60s)", hsn: "998366", gst: 18, qty: 10, rate: 9000 }],
    },
    {
      id: "inv-4",
      number: "AE/2026-27/015",
      projectId: "prj-4",
      status: "Draft",
      issuedOn: "2026-09-10",
      lines: [{ description: "Colour grade", hsn: "998366", gst: 18, qty: 20, rate: 3500 }],
    },
  ];

  const equipment: Equipment[] = [
    {
      id: "eq-1",
      name: "FX6 body A",
      category: "Camera",
      bookings: [
        { projectId: "prj-3", from: "2026-09-14", to: "2026-09-15" },
        { projectId: "prj-6", from: "2026-09-28", to: "2026-09-29" },
      ],
    },
    {
      id: "eq-2",
      name: "Mavic 3 drone",
      category: "Aerial",
      bookings: [
        { projectId: "prj-3", from: "2026-09-14", to: "2026-09-15" },
        { projectId: "prj-1", from: "2026-09-14", to: "2026-09-16" },
      ],
    },
    { id: "eq-3", name: "Ronin RS3 gimbal", category: "Support", bookings: [] },
    {
      id: "eq-4",
      name: "Aputure 600d kit",
      category: "Lighting",
      bookings: [{ projectId: "prj-6", from: "2026-09-28", to: "2026-09-30" }],
    },
  ];

  const files: AssetFile[] = [
    { id: "fil-1", name: "AE118_A001_raw.mxf", projectId: "prj-1", kind: "Raw footage", sizeGb: 940 },
    { id: "fil-2", name: "AE118_finecut_v3.prproj", projectId: "prj-1", kind: "Working file", sizeGb: 4 },
    {
      id: "fil-3",
      name: "epidemic_track_rise.wav",
      projectId: "prj-1",
      kind: "Music",
      sizeGb: 0.1,
      licenseExpiry: "2026-09-28",
      licenseScope: "Web only",
    },
    {
      id: "fil-4",
      name: "stock_city_timelapse.mov",
      projectId: "prj-4",
      kind: "Stock",
      sizeGb: 12,
      licenseExpiry: "2027-03-01",
      licenseScope: "Broadcast",
    },
    { id: "fil-5", name: "AE120_cards_day1.zip", projectId: "prj-3", kind: "Raw footage", sizeGb: 810 },
    { id: "fil-6", name: "AE117_master_yt.mp4", projectId: "prj-5", kind: "Delivery", sizeGb: 8 },
  ];

  const attendance: Attendance[] = [
    { id: "att-1", employeeId: "emp-3", date: "2026-09-11", in: "10:04", out: "19:22", status: "On time" },
    { id: "att-2", employeeId: "emp-2", date: "2026-09-11", in: "09:52", out: "18:58", status: "On time" },
    { id: "att-3", employeeId: "emp-4", date: "2026-09-11", in: "11:26", out: "20:10", status: "Late" },
    { id: "att-4", employeeId: "emp-5", date: "2026-09-11", in: "09:45", out: "18:40", status: "On time" },
    { id: "att-5", employeeId: "emp-1", date: "2026-09-11", in: "10:12", out: "21:05", status: "On time" },
  ];

  const leaves: Leave[] = [
    { id: "lv-1", employeeId: "emp-3", from: "2026-09-19", to: "2026-09-20", type: "Casual", status: "Pending" },
    { id: "lv-2", employeeId: "emp-4", from: "2026-09-22", to: "2026-09-22", type: "Sick", status: "Approved" },
    { id: "lv-3", employeeId: "emp-2", from: "2026-10-02", to: "2026-10-04", type: "Casual", status: "Pending" },
  ];

  return {
    employees,
    clients,
    leads,
    projects,
    tasks,
    worklogs,
    invoices,
    rateCards,
    equipment,
    files,
    attendance,
    leaves,
  };
}

let cache: Db | null = null;

export function getDb(): Db {
  if (cache) return cache;
  if (typeof window === "undefined") {
    cache = seed();
    return cache;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as Db) : seed();
  } catch {
    cache = seed();
  }
  persist();
  return cache;
}

export function persist() {
  if (typeof window === "undefined" || !cache) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    /* storage unavailable — demo continues in memory */
  }
}

export function resetDb() {
  cache = seed();
  persist();
}

export function updateDb(mutate: (db: Db) => void) {
  const db = getDb();
  mutate(db);
  persist();
}
