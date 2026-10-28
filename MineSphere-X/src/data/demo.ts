// DEMONSTRATION DATA — NOT LIVE MINE DATA. All values are illustrative and internally consistent.
export type Severity = "Low" | "Medium" | "High" | "Critical";

export const demoReports: {
  id: string; date: string; equipment: string; category: string; severity: Severity; status: "Open" | "In Progress" | "Verified";
}[] = [
  { id: "HZ-DEMO-1042", date: "2026-10-21", equipment: "Conveyor C-3", category: "Mechanical", severity: "High", status: "Open" },
  { id: "HZ-DEMO-1041", date: "2026-10-20", equipment: "Ventilation Fan V-2", category: "Ventilation", severity: "Medium", status: "In Progress" },
  { id: "HZ-DEMO-1039", date: "2026-10-18", equipment: "Haul Road Sector 4", category: "Ground", severity: "Critical", status: "Open" },
  { id: "HZ-DEMO-1036", date: "2026-10-15", equipment: "Panel E-7", category: "Electrical", severity: "Low", status: "Verified" },
  { id: "HZ-DEMO-1033", date: "2026-10-12", equipment: "Conveyor C-3", category: "Mechanical", severity: "High", status: "Verified" },
];

// Category counts sum to totalReports (48)
export const categoryData = [
  { name: "Mechanical", count: 16 },
  { name: "Electrical", count: 9 },
  { name: "Ground", count: 8 },
  { name: "Ventilation", count: 7 },
  { name: "Gas", count: 5 },
  { name: "Other", count: 3 },
];

// Monthly counts sum to 48
export const trendData = [
  { month: "May", reports: 6, recurring: 2 },
  { month: "Jun", reports: 8, recurring: 3 },
  { month: "Jul", reports: 7, recurring: 3 },
  { month: "Aug", reports: 10, recurring: 4 },
  { month: "Sep", reports: 9, recurring: 3 },
  { month: "Oct", reports: 8, recurring: 2 },
];

export const demoMetrics = {
  totalReports: 48,
  openActions: 12,
  highRisk: 7,
  verifiedClosures: 29,
  echoScore: 78,
  closureQuality: 92,
};

export type SensorStatus = "Normal" | "Abnormal" | "Unknown";
export const demoSensors: { name: string; equipment: string; status: SensorStatus; note: string }[] = [
  { name: "MPU6050 vibration", equipment: "Conveyor C-3 (simulated)", status: "Abnormal", note: "Simulated vibration above prototype threshold" },
  { name: "MPU6050 vibration", equipment: "Conveyor C-1 (simulated)", status: "Normal", note: "Within prototype threshold" },
  { name: "MPU6050 vibration", equipment: "Conveyor C-5 (simulated)", status: "Unknown", note: "No reading in last 10 minutes — shown as unknown" },
];
