import type { Project } from '../types/project';

const DB_NAME = 'addims_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'projects';
const LS_FALLBACK_KEY = 'addims_projects_data';
const INIT_FLAG_KEY = 'addims_portfolio_initialized_v2';

// Known dummy project IDs to purge
const DUMMY_PROJECT_IDS = new Set([
  'proj_policy_master',
  'proj_nexus_ai',
  'proj_grandsuite_hotel',
  'proj_medpulse_ehr',
  'proj_aura_restaurant',
]);



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
      const list: Project[] = JSON.parse(raw);
      return list.filter((p) => !DUMMY_PROJECT_IDS.has(p.id));
    }
  } catch (err) {
    console.error('LocalStorage read error:', err);
  }
  return [];
}

function saveToLocalStorage(projects: Project[]): void {
  try {
    const filtered = projects.filter((p) => !DUMMY_PROJECT_IDS.has(p.id));
    localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(filtered));
    localStorage.setItem(INIT_FLAG_KEY, 'true');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('addims_projects_updated'));
    }
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

/**
 * Purges any legacy dummy seed projects from IndexedDB and LocalStorage.
 */
export async function purgeDummyProjects(): Promise<void> {
  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY);
    if (raw) {
      const list: Project[] = JSON.parse(raw);
      const cleaned = list.filter((p) => !DUMMY_PROJECT_IDS.has(p.id));
      localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(cleaned));
    }
  } catch {
    localStorage.removeItem(LS_FALLBACK_KEY);
  }

  try {
    const db = await openDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    for (const id of DUMMY_PROJECT_IDS) {
      store.delete(id);
    }
  } catch {
    // Ignore if IDB not available
  }
}

/**
 * Initializes the database (cleans dummy data and sets up empty store for Admin-only projects).
 */
export async function initProjectDatabase(): Promise<void> {
  await purgeDummyProjects();
  localStorage.setItem(INIT_FLAG_KEY, 'true');
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
        const results: Project[] = (req.result || []).filter((p: Project) => !DUMMY_PROJECT_IDS.has(p.id));
        results.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        resolve(results);
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
    .filter((p) => p.status === 'Published' && p.visibility === 'Public' && !DUMMY_PROJECT_IDS.has(p.id))
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
  return all.find((p) => p.slug === slug && p.visibility === 'Public' && p.status === 'Published' && !DUMMY_PROJECT_IDS.has(p.id)) || null;
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
  if (DUMMY_PROJECT_IDS.has(id)) return null;
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