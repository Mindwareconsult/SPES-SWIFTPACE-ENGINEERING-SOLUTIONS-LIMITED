import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { DB_PATH, syncSeedUploadsToUploadDir } from '../config/paths.ts';

syncSeedUploadsToUploadDir();

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      must_change_password INTEGER DEFAULT 0,
      token_version INTEGER DEFAULT 1,
      failed_attempts INTEGER DEFAULT 0,
      locked_until DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE TABLE IF NOT EXISTS revoked_tokens (
      jti TEXT PRIMARY KEY,
      expires_at INTEGER NOT NULL,
      revoked_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      location TEXT,
      client TEXT,
      project_status TEXT DEFAULT 'Completed',
      completion_date TEXT,
      short_description TEXT NOT NULL,
      overview TEXT,
      objectives TEXT,
      scope_of_work TEXT,
      technical_approach TEXT,
      project_outcome TEXT,
      cover_image TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      publication_status TEXT DEFAULT 'published',
      seo_title TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS project_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      image_caption TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blog_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category_id INTEGER,
      category_name TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      featured_image TEXT NOT NULL,
      author TEXT DEFAULT 'SPES Engineering Editorial Board',
      publication_status TEXT DEFAULT 'published',
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      seo_title TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(category_id) REFERENCES blog_categories(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      company_name TEXT,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_required TEXT NOT NULL,
      project_type TEXT NOT NULL,
      project_location TEXT NOT NULL,
      estimated_budget TEXT,
      preferred_contact_method TEXT DEFAULT 'Email',
      project_description TEXT NOT NULL,
      attachment_path TEXT,
      privacy_consent INTEGER DEFAULT 1,
      enquiry_status TEXT DEFAULT 'New',
      internal_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_type TEXT,
      file_size INTEGER,
      category TEXT DEFAULT 'general',
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS website_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_key TEXT UNIQUE NOT NULL,
      setting_value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe non-destructive schema migration for existing admins table
  const adminCols = db.prepare(`PRAGMA table_info(admins)`).all() as Array<{ name: string }>;
  const existingColNames = new Set(adminCols.map((c) => c.name));
  let migratedMustChange = false;

  if (!existingColNames.has('must_change_password')) {
    db.exec(`ALTER TABLE admins ADD COLUMN must_change_password INTEGER DEFAULT 0`);
    migratedMustChange = true;
  }
  if (!existingColNames.has('token_version')) {
    db.exec(`ALTER TABLE admins ADD COLUMN token_version INTEGER DEFAULT 1`);
  }
  if (!existingColNames.has('failed_attempts')) {
    db.exec(`ALTER TABLE admins ADD COLUMN failed_attempts INTEGER DEFAULT 0`);
  }
  if (!existingColNames.has('locked_until')) {
    db.exec(`ALTER TABLE admins ADD COLUMN locked_until DATETIME`);
  }

  // Cleanup expired revoked tokens periodically at startup
  const nowSec = Math.floor(Date.now() / 1000);
  db.prepare(`DELETE FROM revoked_tokens WHERE expires_at < ?`).run(nowSec);

  // Seed initial administrator ONLY if no admin exists (never overwrite existing admin)
  const adminCheck = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
  if (adminCheck.count === 0) {
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AdminSecure2026!';
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(initialPassword, salt);
    db.prepare(`
      INSERT INTO admins (username, email, password_hash, must_change_password, token_version)
      VALUES (?, ?, ?, 1, 1)
    `).run('spesadmin', 'spesengineeringlimited@gmail.com', hash);
  } else if (migratedMustChange) {
    // If existing account still uses the legacy initial password, flag must_change_password = 1
    const existingAdmin = db.prepare('SELECT id, password_hash FROM admins ORDER BY id ASC LIMIT 1').get() as
      | { id: number; password_hash: string }
      | undefined;
    if (existingAdmin && bcrypt.compareSync('AdminSecure2026!', existingAdmin.password_hash)) {
      db.prepare('UPDATE admins SET must_change_password = 1 WHERE id = ?').run(existingAdmin.id);
    }
  }

  // Seed default settings
  const defaultSettings: Record<string, string> = {
    company_name: 'SPES Swiftpace Engineering Solutions Limited',
    rc_number: 'RC:8978524',
    email: 'spesengineeringlimited@gmail.com',
    phone_primary: '+234 901 075 3592',
    phone_secondary: '+234 707 636 5837',
    whatsapp_primary: '2349010753592',
    whatsapp_secondary: '2347076365837',
    address_line1: 'Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road',
    address_city: 'Ado Ekiti',
    address_state: 'Ekiti State',
    address_country: 'Nigeria',
    hero_headline: 'Engineering Excellence. Building the Future.',
    hero_subtitle: 'SPES Swiftpace Engineering Solutions Limited delivers integrated architectural, engineering, construction and consultancy services designed to shape functional, durable and sustainable built environments.',
    contact_notice: 'Our engineering consultants typically respond to inquiries within 24 business hours.'
  };

  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO website_settings (setting_key, setting_value)
    VALUES (?, ?)
  `);

  for (const [key, value] of Object.entries(defaultSettings)) {
    insertSetting.run(key, value);
  }

  // Seed Blog Categories
  const categories = [
    { name: 'Architecture', slug: 'architecture', description: 'Concepts, spatial planning, and climate-responsive design.' },
    { name: 'Civil Engineering', slug: 'civil-engineering', description: 'Infrastructure, drainage systems, and site engineering.' },
    { name: 'Structural Engineering', slug: 'structural-engineering', description: 'Load analysis, reinforced concrete, and foundation safety.' },
    { name: 'Building Construction', slug: 'building-construction', description: 'Construction methodology, craftsmanship, and materials execution.' },
    { name: 'Construction Management', slug: 'construction-management', description: 'Project scheduling, quality control, and budget optimization.' },
    { name: 'Infrastructure', slug: 'infrastructure', description: 'Public works, bridges, highways, and civic development.' },
    { name: 'Engineering Innovation', slug: 'engineering-innovation', description: 'Cutting-edge materials, BIM, and smart built environment.' },
    { name: 'Industry Insights', slug: 'industry-insights', description: 'Regulatory frameworks, building codes, and Nigerian construction standards.' }
  ];

  const insertCategory = db.prepare(`
    INSERT OR IGNORE INTO blog_categories (name, slug, description)
    VALUES (?, ?, ?)
  `);
  for (const cat of categories) {
    insertCategory.run(cat.name, cat.slug, cat.description);
  }

  // Authentic projects and media assets are synced via ensureAuthenticProjectsAndMedia() at server startup.

  // Seed initial professional blog articles
  const blogCheck = db.prepare('SELECT COUNT(*) as count FROM blog_posts').get() as { count: number };
  if (blogCheck.count === 0) {
    const seedBlogs = [
      {
        title: 'The Importance of Structural Engineering in Modern Building Construction in Nigeria',
        slug: 'importance-of-structural-engineering-modern-construction-nigeria',
        category_name: 'Structural Engineering',
        excerpt: 'Understanding why professional structural analysis, concrete grade testing, and rigorous foundation calculations are indispensable to preventing building failures.',
        content: `
## Why Structural Integrity Dictates Building Longevity

Structural engineering is the invisible backbone of any durable built environment. In modern Nigeria, where urban growth is accelerating and architectural demands are increasingly ambitious, the importance of sound structural analysis cannot be overstated.

### 1. Geotechnical Ground Realities and Foundation Design
No two construction sites in Nigeria share identical soil bearing capacities. From expansive clay and sandy soils to seasonal waterlogged terrains in South-Western regions, foundation design must be informed by authentic geotechnical soil bore investigations. Over-simplifying foundation parameters frequently leads to differential settlement, hairline shear cracks, and tragic structural failures.

### 2. Quality Assurance in Reinforced Concrete
The durability of concrete depends heavily on:
- **Water-Cement Ratio:** Maintaining strict slump controls prevents honeycombing and porous cavities.
- **Steel Reinforcement Yield Strength:** Verifying the tensile strength and rib geometry of rebar ensures that tension loads are properly transferred.
- **Adequate Curing Cycles:** Hydration must proceed under moisture control for a minimum of 21 to 28 days to attain design compressive strength (e.g., C25/30 or C30/37).

### 3. Mitigating Environmental and Dynamic Loads
Beyond dead and live floor loads, multi-storey structures must resist significant horizontal forces such as localized gust wind pressures. Professional structural engineers utilize finite element structural modeling to distribute shear forces through shear walls, moment frames, and continuous reinforced slabs.

### Conclusion
Investing in comprehensive structural engineering before breaking ground is not an optional cost—it is the ultimate safeguard for human life, financial capital, and long-term asset value.
        `,
        featured_image: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-spes-team-rebar-02.jpg',
        author: 'Engr. SPES Technical Directorate',
        publication_status: 'published',
        published_at: '2026-02-15 09:00:00',
        seo_title: 'Importance of Structural Engineering in Nigeria | SPES Swiftpace',
        meta_description: 'In-depth analysis of structural engineering essentials, foundation design, and concrete quality control for projects in Nigeria.'
      },
      {
        title: 'Key Considerations Before Starting a Building Construction Project in Nigeria',
        slug: 'key-considerations-before-starting-building-project-nigeria',
        category_name: 'Building Construction',
        excerpt: 'A practical strategic roadmap covering statutory approvals, bills of quantities, contractor vetting, and site drainage planning.',
        content: `
## Navigating the Pre-Construction Phase with Confidence

Embarking on a residential, commercial, or institutional building project in Nigeria is a major financial and logistical commitment. Thorough pre-construction preparation prevents costly delays, regulatory halts, and scope creep.

### Step 1: Statutory Planning and Approvals
Before mobilizing plant and equipment to site, ensure that:
- Title documents (C of O, Deed of Assignment, Governor's Consent) are authenticated.
- Complete architectural, structural, electrical, and mechanical drawings are submitted to the relevant state Ministry of Physical Planning and Urban Development.
- Environmental impact assessments (EIA) are conducted where mandatory for large commercial developments.

### Step 2: Accurate Bills of Engineering Measurement and Evaluation (BEME / BOQ)
Never rely on guesswork or lump-sum verbal contractor estimates. A detailed, itemized Bill of Quantities prepared by a professional quantity surveyor establishes transparent benchmarks for material volumes, labor hours, plant hire, and contingency allowances.

### Step 3: Logistics and Materials Sourcing
Given seasonal market fluctuations, establishing fixed-rate material supply agreements for essential commodities—cement, granite, sharp sand, reinforcement bars, and timber formwork—protects your construction budget from unpredictable spikes.

### Conclusion
A disciplined pre-construction phase led by experienced professionals converts ambitious visions into structurally sound, financially controlled realities.
        `,
        featured_image: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-overview-01.jpg',
        author: 'SPES Construction Management Team',
        publication_status: 'published',
        published_at: '2026-02-28 10:30:00',
        seo_title: 'Key Considerations for Building Projects in Nigeria | SPES Swiftpace',
        meta_description: 'Essential checklist and practical considerations for commercial and residential construction projects in Nigeria.'
      },
      {
        title: 'Understanding the Role of Construction Management in Project Delivery',
        slug: 'understanding-the-role-of-construction-management',
        category_name: 'Construction Management',
        excerpt: 'How disciplined supervision, milestone tracking, and safety protocols prevent cost overruns and maintain quality standards on site.',
        content: `
## Bridging Design Intent and On-Site Execution

Construction management is the discipline that turns complex architectural blueprints and engineering specifications into a finished, functional building on time and within budget.

### 1. Critical Path Method (CPM) and Schedule Tracking
Modern construction projects involve dozens of concurrent and sequential activities—from earthworks and foundation pouring to electrical conduits, MEP rough-ins, screeding, and final finishes. A construction manager establishes a rigorous schedule with clear milestone dependencies to eliminate contractor downtime.

### 2. Quality Control & On-Site Inspection
A primary duty of the construction manager is ensuring that contractors adhere strictly to technical specifications:
- Verifying reinforcement bar diameters and concrete cover spacers.
- Monitoring concrete pouring to prevent cold joints.
- Inspecting plumbing pressure tests prior to drywall or floor tiling closures.

### 3. Occupational Health, Safety & Environment (HSE)
Safe job sites are productive job sites. Construction managers enforce mandatory personal protective equipment (PPE), secure scaffolding, hazard signage, and emergency protocols to protect workers and visitors alike.

### Summary
Partnering with a professional construction management firm like SPES Swiftpace ensures that your capital investment is safeguarded through daily oversight, contractual accountability, and engineering rigor.
        `,
        featured_image: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg',
        author: 'SPES Project Directorate',
        publication_status: 'published',
        published_at: '2026-03-01 14:15:00',
        seo_title: 'The Role of Construction Management | SPES Swiftpace',
        meta_description: 'Discover how professional construction management guarantees quality control, timeline compliance, and budget optimization.'
      },
      {
        title: 'Architectural Optimization: Climate-Responsive Design for Modern Nigerian Spaces',
        slug: 'architectural-optimization-climate-responsive-design-nigeria',
        category_name: 'Architecture',
        excerpt: 'Designing high-performance buildings that balance tropical cross-ventilation, daylighting, and contemporary visual sophistication.',
        content: `
## Architecture Tailored to Tropical Realities

Great architecture is a dialogue between human aspiration and environmental context. In Nigeria, contemporary architectural design must address intense tropical sunlight, high humidity, and seasonal rainfall while achieving world-class aesthetic appeal.

### Key Bioclimatic Design Strategies
1. **Solar Orientation:** Orienting building massing along the east-west axis minimizes direct solar heat gain on large facade glazing.
2. **Deep Overhangs and Brise-Soleil:** Incorporating architectural eaves and perforated shading screens protects windows from midday heat while diffusing natural daylight into interior rooms.
3. **Passive Cross-Ventilation:** Strategic placement of high and low window apertures harnesses natural convection breezes, reducing mechanical air conditioning requirements.
4. **Resilient Envelope Materials:** Selecting non-fading, moisture-resistant exterior finishes preserves building aesthetics despite torrential seasonal rainfall.

At SPES Swiftpace Engineering Solutions Limited, our architectural practice fuses regional responsiveness with cutting-edge 3D visualization and sustainable materials planning.
        `,
        featured_image: '/uploads/projects/architectural-facade-concepts/arch-terraced-streetscape-01.jpg',
        author: 'SPES Architectural Studio',
        publication_status: 'published',
        published_at: '2026-03-03 11:00:00',
        seo_title: 'Climate-Responsive Architecture in Nigeria | SPES Swiftpace',
        meta_description: 'How modern architectural design balances tropical climate responsiveness with contemporary luxury and spatial efficiency.'
      }
    ];

    const insertBlog = db.prepare(`
      INSERT INTO blog_posts (
        title, slug, category_name, excerpt, content, featured_image,
        author, publication_status, published_at, seo_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const b of seedBlogs) {
      insertBlog.run(
        b.title, b.slug, b.category_name, b.excerpt, b.content, b.featured_image,
        b.author, b.publication_status, b.published_at, b.seo_title, b.meta_description
      );
    }
  }

  // Seed sample initial enquiry for admin dashboard preview
  const enquiryCheck = db.prepare('SELECT COUNT(*) as count FROM enquiries').get() as { count: number };
  if (enquiryCheck.count === 0) {
    db.prepare(`
      INSERT INTO enquiries (
        full_name, company_name, email, phone, service_required, project_type,
        project_location, estimated_budget, preferred_contact_method, project_description,
        privacy_consent, enquiry_status, internal_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'Chief Adeleke Babatunde',
      'Highland Commercial Ventures Ltd',
      'adeleke.babatunde@example.com',
      '+234 803 456 7890',
      'Civil & Structural Engineering',
      'Commercial',
      'Iworoko Road, Ado Ekiti',
      '₦100 million–₦500 million',
      'Phone Call',
      'We are planning a 5-storey mixed-use commercial center with retail on ground floor and offices above. We need structural engineering analysis, foundation design, and construction management support.',
      1,
      'New',
      'Preliminary enquiry received. Scheduled for initial telephone briefing.'
    );
  }
}
