// Script to generate 400 random customers with unique IDs
// Run with: node scripts/generateData.js

import { v4 as uuidv4 } from 'uuid';

const firstNames = [
  'Jane', 'John', 'Emily', 'Michael', 'Sarah', 'David', 'Emma', 'James',
  'Olivia', 'William', 'Sophia', 'Benjamin', 'Isabella', 'Lucas', 'Mia',
  'Henry', 'Charlotte', 'Alexander', 'Amelia', 'Daniel', 'Harper', 'Matthew',
  'Evelyn', 'Joseph', 'Abigail', 'Samuel', 'Ella', 'Sebastian', 'Avery', 'Jack',
  'Aiden', 'Luna', 'Ethan', 'Chloe', 'Mason', 'Penelope', 'Logan', 'Layla',
  'Owen', 'Riley', 'Liam', 'Zoey', 'Noah', 'Nora', 'Oliver', 'Lily', 'Elijah',
  'Eleanor', 'Leo', 'Hannah', 'Asher', 'Lillian', 'Caleb', 'Addison', 'Ryan'
];

const lastNames = [
  'Cooper', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson',
  'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez',
  'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis',
  'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres',
  'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall',
  'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Phillips', 'Evans'
];

const companies = [
  'Microsoft', 'Google', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'Adobe',
  'Salesforce', 'Oracle', 'IBM', 'Intel', 'Cisco', 'VMware', 'Shopify',
  'Spotify', 'Uber', 'Airbnb', 'Stripe', 'Square', 'Zoom', 'Slack', 'Dropbox',
  'Twitter', 'LinkedIn', 'PayPal', 'eBay', 'Nvidia', 'AMD', 'Qualcomm',
  'Samsung', 'Sony', 'LG', 'HP', 'Dell', 'Lenovo', 'Asus', 'Acer'
];

const countries = [
  'USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'Brazil',
  'India', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Singapore',
  'South Korea', 'China', 'Ireland', 'Switzerland', 'Norway', 'Denmark',
  'Belgium', 'Austria', 'Poland', 'Portugal', 'New Zealand', 'Argentina'
];

const avatarUrls = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5'
];

// Generate unique ID using UUID v4
function generateId() {
  return uuidv4();
}

// Random item from array
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate phone number
function generatePhone() {
  const area = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${prefix}-${line}`;
}

// Generate random date in last 2 years
function generateDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 730);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Generate 400 customers
const customers = [];
const usedIds = new Set();

for (let i = 0; i < 400; i++) {
  let id;
  do {
    id = generateId();
  } while (usedIds.has(id));
  usedIds.add(id);

  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const company = randomItem(companies);

  customers.push({
    id,
    name: `${firstName} ${lastName}`,
    company,
    phone: generatePhone(),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}.com`,
    country: randomItem(countries),
    status: Math.random() > 0.3 ? 'Active' : 'Inactive',
    createdAt: generateDate()
  });
}

// Calculate stats based on generated data
const activeCount = customers.filter(c => c.status === 'Active').length;

const data = {
  customers,
  stats: {
    totalCustomers: {
      count: customers.length,
      trend: 16
    },
    members: {
      count: activeCount,
      trend: -1
    },
    activeNow: {
      count: Math.floor(Math.random() * 50) + 150,
      avatars: avatarUrls
    }
  }
};

// Output JSON
console.log(JSON.stringify(data, null, 2));
