import type { Project } from '../types/project';

const DB_NAME = 'addims_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'projects';
const LS_FALLBACK_KEY = 'addims_projects_data';

// Initial seed projects to populate the database on first run
const INITIAL_SEED_PROJECTS: Project[] = [
  {
    id: 'proj_policy_master',
    name: 'Policy Master',
    slug: 'policy-master',
    shortTitle: 'Insurance & Policy Management Ecosystem',
    projectType: 'Client Project',
    category: 'Business Management',
    shortDescription:
      'Enterprise insurance lifecycle platform streamlining policy issuance, customer onboarding, automated premium calculation, renewal tracking, and cashback operations.',
    fullDescription:
      'Policy Master is a comprehensive enterprise insurance platform built to modernize how insurance agencies manage high-volume customer portfolios. Designed with an offline-first architecture, sub-second search indexing, and automated policy renewal reminders, the platform eliminates manual paperwork and cuts processing latency by over 80%. It features end-to-end agent commission tracking, multi-tier cashback calculation engines, and real-time regulatory compliance reporting.',
    clientName: 'Global Insurance Brokers Ltd.',
    clientIndustry: 'Fintech & Insurance',
    visibility: 'Public',
    coverImage: '/assets/panel_2_systems.jpg',
    galleryImages: [
      '/assets/panel_2_systems.jpg',
      '/assets/panel_1_devices.jpg',
      '/assets/panel_3_ai.jpg',
    ],
    features: [
      'Comprehensive Policy Lifecycle Management & Verification',
      'Automated Multi-Tier Renewal & Expiry Tracking',
      'Customer Onboarding & Document Vault Integration',
      'Dynamic Agent Commission & Cashback Engine',
      'Real-Time Business Analytics & Executive Reports',
      'Role-Based Granular Access & Audit Logging',
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    liveUrl: 'https://policymaster.example.com',
    demoUrl: 'https://demo.policymaster.example.com',
    githubUrl: '',
    status: 'Published',
    featured: true,
    displayOrder: 1,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj_nexus_ai',
    name: 'Nexus Autonomous AI Terminal',
    slug: 'nexus-autonomous-ai-terminal',
    shortTitle: 'Autonomous Enterprise AI & Multi-Agent Orchestration',
    projectType: 'ADDIMS Product',
    category: 'AI & Automation',
    shortDescription:
      'Real-time multi-agent reasoning orchestrator handling millions of concurrent autonomous agent workflows with sub-second feedback and knowledge graph integration.',
    fullDescription:
      'Nexus AI Terminal represents the next frontier in autonomous enterprise intelligence. Built for large organizations with complex multi-department workflows, Nexus coordinates autonomous AI agents that analyze incoming customer queries, synthesize documents, auto-trigger ERP updates, and generate actionable business intelligence in real time. Features enterprise vector database integration, sub-second latency SLA, and strict air-gapped security compliance.',
    clientName: 'ADDIMS Labs Internal Product',
    clientIndustry: 'Artificial Intelligence & SaaS',
    visibility: 'Public',
    coverImage: '/assets/panel_3_ai.jpg',
    galleryImages: [
      '/assets/panel_3_ai.jpg',
      '/assets/panel_1_devices.jpg',
      '/assets/panel_2_systems.jpg',
    ],
    features: [
      'Autonomous Multi-Agent Task Orchestration',
      'Sub-Second Hybrid Reasoning & Vector Retrieval',
      'Intelligent Customer Interaction & Workflow Routing',
      'Automated Ticket Resolution & CRM Event Synchronization',
      'High-Density Telemetry & Token Cost Optimization Matrix',
    ],
    technologies: ['Python', 'FastAPI', 'React 19', 'Vector DB', 'Redis', 'WebSockets', 'Three.js'],
    liveUrl: 'https://nexus.addims.io',
    demoUrl: 'https://nexus-demo.addims.io',
    githubUrl: '',
    status: 'Published',
    featured: true,
    displayOrder: 2,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj_grandsuite_hotel',
    name: 'GrandSuite Cloud Hotel OS',
    slug: 'grandsuite-cloud-hotel-os',
    shortTitle: 'Smart Hospitality & Guest Experience Management',
    projectType: 'Business System',
    category: 'Hotel Management',
    shortDescription:
      'Digital hotel operating system integrating smart room matrix, contactless keyless check-in, housekeeping dispatch, and multi-channel reservation booking.',
    fullDescription:
      'GrandSuite is a modern, cloud-native hotel operating platform designed for boutique luxury hotels and international hospitality chains. It unifies front-desk reservation management, IoT-connected smart room door access, real-time housekeeping status queues, guest billing, and restaurant POS sync into a cohesive touch-screen friendly interface with automated RevPAR yield management.',
    clientName: 'The Royal Azure Collection',
    clientIndustry: 'Luxury Hospitality & Tourism',
    visibility: 'Public',
    coverImage: '/assets/panel_1_devices.jpg',
    galleryImages: [
      '/assets/panel_1_devices.jpg',
      '/assets/panel_2_systems.jpg',
      '/assets/panel_3_ai.jpg',
    ],
    features: [
      'Interactive Room Availability Matrix & Instant Check-In',
      'Contactless Mobile Key & Guest Portal',
      'Housekeeping Dispatch & Maintenance Telemetry',
      'Automated Dynamic Pricing & Yield Optimization',
      'Consolidated Folio Billing & Multi-Currency POS Integration',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'IoT Gateway'],
    liveUrl: 'https://grandsuite.example.com',
    demoUrl: 'https://demo.grandsuite.example.com',
    githubUrl: '',
    status: 'Published',
    featured: true,
    displayOrder: 3,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj_medpulse_ehr',
    name: 'MedPulse Healthcare EHR',
    slug: 'medpulse-healthcare-ehr',
    shortTitle: 'Smart Clinical Telemetry & Hospital Workflow System',
    projectType: 'Business System',
    category: 'Healthcare',
    shortDescription:
      'HIPAA-compliant hospital management system designed to streamline patient records, diagnostic appointment scheduling, pharmacy inventory, and doctor telemetry.',
    fullDescription:
      'MedPulse Healthcare is an enterprise clinical informatics platform built to simplify patient care coordination across hospital departments. Featuring zero-latency medical record synchronization, smart diagnostic imaging previews, doctor round scheduling, and automated prescription billing, MedPulse ensures medical staff spend less time on administration and more time with patients.',
    clientName: 'Apex Diagnostic Care Network',
    clientIndustry: 'Healthcare & Diagnostics',
    visibility: 'Public',
    coverImage: '/assets/panel_2_systems.jpg',
    galleryImages: [
      '/assets/panel_2_systems.jpg',
      '/assets/panel_1_devices.jpg',
    ],
    features: [
      'Electronic Health Records (EHR) & Vitals History Tracking',
      'Multi-Specialty Appointment Scheduling & Queue Management',
      'Diagnostic Lab Telemetry & PDF Report Generation',
      'Pharmacy Inventory & Automated Reorder Alert Matrix',
      'Encrypted HIPAA/GDPR Compliant Audit Logging',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'WebRTC'],
    liveUrl: '',
    demoUrl: 'https://medpulse.example.com',
    githubUrl: '',
    status: 'Published',
    featured: false,
    displayOrder: 4,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj_aura_restaurant',
    name: 'Aura POS & Restaurant Management',
    slug: 'aura-pos-restaurant-management',
    shortTitle: 'High-Velocity Dining & Billing Engine',
    projectType: 'Business System',
    category: 'Restaurant & Billing',
    shortDescription:
      'Next-generation restaurant point-of-sale system featuring live table mapping, kitchen display system (KDS), split-bill payments, and automated ingredient inventory.',
    fullDescription:
      'Aura POS is engineered specifically for busy restaurants, cafes, and multi-location franchises. It eliminates order bottlenecks through lightning-fast capacitive touch ordering, real-time wireless kitchen ticket dispatch, automated tax/tip splits, and automatic ingredient depletion tracking with supplier restock integrations.',
    clientName: 'Velvet Dining Group',
    clientIndustry: 'Food & Beverage',
    visibility: 'Public',
    coverImage: '/assets/panel_1_devices.jpg',
    galleryImages: [
      '/assets/panel_1_devices.jpg',
      '/assets/panel_3_ai.jpg',
    ],
    features: [
      'Interactive Live Floorplan & Table Order Status',
      'Real-Time Kitchen Display System (KDS) Synchronization',
      'Fast Contactless Payments, Split Bills & Loyalty Points',
      'Real-Time Recipe-Level Ingredient Inventory Depletion',
      'Multi-Branch Revenue & Sales Shift Reconciliation',
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://aurapos.example.com',
    demoUrl: '',
    githubUrl: '',
    status: 'Published',
    featured: false,
    displayOrder: 5,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INIT_FLAG_KEY = 'addims_portfolio_initialized_v2';

// Open IndexedDB database helper
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('slug', 'slug', { unique: true });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('featured', 'featured', { unique: false });
        store.createIndex('displayOrder', 'displayOrder', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// LocalStorage Helpers
function getFromLocalStorage(): Project[] {
  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY);
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('LocalStorage read error:', err);
  }

  // If first time ever opening site, return seed projects
  if (!localStorage.getItem(INIT_FLAG_KEY)) {
    return INITIAL_SEED_PROJECTS;
  }
  return [];
}

function saveToLocalStorage(projects: Project[]): void {
  try {
    localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(projects));
    localStorage.setItem(INIT_FLAG_KEY, 'true');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('addims_projects_updated'));
    }
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

/**
 * Initializes the database with seed projects ONLY once on first site launch.
 */
export async function initProjectDatabase(): Promise<void> {
  const isAlreadyInit = localStorage.getItem(INIT_FLAG_KEY);
  if (isAlreadyInit) {
    return;
  }

  try {
    const db = await openDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const countReq = store.count();

    countReq.onsuccess = () => {
      if (countReq.result === 0) {
        for (const proj of INITIAL_SEED_PROJECTS) {
          store.put(proj);
        }
      }
      saveToLocalStorage(INITIAL_SEED_PROJECTS);
    };
  } catch (err) {
    console.warn('Falling back to LocalStorage project store:', err);
    saveToLocalStorage(INITIAL_SEED_PROJECTS);
  }
}

/**
 * Fetches ALL projects (for Admin management).
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const results: Project[] = req.result || [];
        if (results.length === 0 && !localStorage.getItem(INIT_FLAG_KEY)) {
          resolve(getFromLocalStorage());
        } else if (results.length === 0 && localStorage.getItem(LS_FALLBACK_KEY)) {
          resolve(getFromLocalStorage());
        } else {
          results.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          resolve(results);
        }
      };
      req.onerror = () => resolve(getFromLocalStorage());
    });
  } catch {
    return getFromLocalStorage();
  }
}

/**
 * Fetches all PUBLIC + PUBLISHED projects (for the Showcase page).
 * Sorted by newest creation timestamp first.
 */
export async function getPublicPublishedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter((p) => p.status === 'Published' && p.visibility === 'Public')
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

/**
 * Fetches the projects for the Homepage (maximum 3).
 * Prioritizes admin-featured projects, followed by newest published projects.
 */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const all = await getPublicPublishedProjects();
  const featured = all.filter((p) => p.featured === true);
  const nonFeatured = all.filter((p) => !p.featured);
  const ordered = [...featured, ...nonFeatured];
  return ordered.slice(0, limit);
}

/**
 * Fetches a single project by its unique slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug && p.visibility === 'Public' && p.status === 'Published') || null;
}

/**
 * Fetches related projects excluding current project slug.
 */
export async function getRelatedProjects(currentSlug: string, category: string, limit = 3): Promise<Project[]> {
  const all = await getPublicPublishedProjects();
  const sameCategory = all.filter((p) => p.slug !== currentSlug && p.category === category);
  const otherProjects = all.filter((p) => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...otherProjects].slice(0, limit);
}

/**
 * Fetches a project by its internal ID (for Admin edit).
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const all = await getAllProjects();
  return all.find((p) => p.id === id) || null;
}

/**
 * Creates a new project in the database.
 */
export async function createProject(
  data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Project> {
  const newProject: Project = {
    ...data,
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    featured: data.featured !== undefined ? data.featured : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.add(newProject);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IDB write fallback to LS:', err);
  }

  // Always sync LocalStorage with new project at top
  const existing = getFromLocalStorage();
  saveToLocalStorage([newProject, ...existing.filter((p) => p.id !== newProject.id)]);

  return newProject;
}

/**
 * Updates an existing project in the database.
 */
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Project with ID "${id}" not found`);
  }

  const updated: Project = {
    ...all[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(updated);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IDB update fallback to LS:', err);
  }

  all[index] = updated;
  saveToLocalStorage(all);

  return updated;
}

/**
 * Deletes a project from the database.
 */
export async function deleteProject(id: string): Promise<boolean> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IDB delete fallback to LS:', err);
  }

  const all = getFromLocalStorage();
  saveToLocalStorage(all.filter((p) => p.id !== id));

  return true;
}

/**
 * Toggles the publish status of a project (Draft <-> Published).
 */
export async function togglePublishProject(id: string): Promise<Project> {
  const current = await getProjectById(id);
  if (!current) throw new Error('Project not found');
  const nextStatus = current.status === 'Published' ? 'Draft' : 'Published';
  return updateProject(id, { status: nextStatus });
}

/**
 * Toggles the featured status of a project.
 */
export async function toggleFeaturedProject(id: string): Promise<Project> {
  const current = await getProjectById(id);
  if (!current) throw new Error('Project not found');
  return updateProject(id, { featured: !current.featured });
}

