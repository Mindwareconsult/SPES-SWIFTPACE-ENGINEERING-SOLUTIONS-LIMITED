import { db } from './db';

export function seedAuthenticProjects() {
  console.log('Seeding authentic SPES Swiftpace projects and photographs...');

  // Begin transaction
  const runMigration = db.transaction(() => {
    // 1. Delete previous sample projects and project_images
    db.prepare('DELETE FROM project_images').run();
    db.prepare('DELETE FROM projects').run();

    // 2. Define the 5 verified genuine projects from the supplied photos
    const authenticProjects = [
      {
        title: 'Multi-Storey Commercial Development & Column Structural Shoring',
        slug: 'commercial-column-structural-shoring',
        category: 'Civil & Structural Engineering',
        location: 'South-West Nigeria (Coordinates: E3.4 N6.5)',
        client: 'Commercial Development Partner',
        project_status: 'Superstructure Phase',
        completion_date: 'Active Project',
        short_description: 'Precision structural engineering execution featuring reinforced concrete column formwork, heavy-duty adjustable shoring systems, and high-tensile steel rebar cages on an elevated commercial deck.',
        overview: 'This project captures active structural engineering and site construction coordination for a modern multi-storey commercial facility. The works showcase precision-engineered timber and steel column shuttering, rigid diagonal shoring systems designed to resist hydrostatic lateral pressures during concrete placement, and dense Grade 460B reinforcement bar assemblies executed in strict conformance with structural design specifications.',
        objectives: 'Ensure perfect vertical alignment (plumbness), eliminate differential deflection during concrete placement, guarantee watertight formwork joints to prevent grout leakage, and enforce occupational safety on elevated decks.',
        scope_of_work: 'Structural formwork fabrication and erection, rebar cutting, bending and cage placement, concrete cover spacer block distribution, laser leveling, plumb-line verification, and pre-pour technical sign-offs.',
        technical_approach: 'Utilized engineered modular formwork panels, heavy-duty adjustable steel push-pull props, calibrated steel tie-rods with high-torque wing-nuts, and Grade 460B high-yield deformed bars with controlled cover depth to safeguard against long-term carbonation.',
        project_outcome: 'Accurate column alignment across the multi-bay grid, zero honeycombing upon de-shuttering, and verified structural integrity in compliance with Nigerian National Building Codes.',
        cover_image: '/assets/projects/commercial-column-shoring/commercial-column-shoring-01.jpg',
        featured: 1,
        publication_status: 'published',
        seo_title: 'Multi-Storey Column Structural Shoring | SPES Swiftpace Engineering',
        meta_description: 'Case study of reinforced concrete column shuttering and structural shoring systems by SPES Swiftpace in South-West Nigeria.'
      },
      {
        title: 'Suspended Reinforced Concrete Floor Slab & Structural Rebar Assembly',
        slug: 'suspended-slab-rebar-assembly',
        category: 'Civil & Structural Engineering',
        location: 'Lagos, Nigeria',
        client: 'Private Commercial Stakeholder',
        project_status: 'Superstructure In Progress',
        completion_date: 'Active Project',
        short_description: 'Comprehensive suspended floor slab structural engineering in Lagos, Nigeria, including marine board decking, drop beam reinforcement cages, conduit integration, and on-site drawing verification.',
        overview: 'Located in Lagos, Nigeria, this project captures critical-path structural engineering execution and quality assurance. The assignment entails the complete formwork decking, beam rebar cage fabrication, top and bottom two-way slab mesh installation, electrical/mechanical conduit embedment, and column starter bar splice positioning.',
        objectives: 'Achieve maximum load-bearing stiffness, prevent plastic shrinkage cracking, ensure accurate bar spacing and lap lengths per BS 8110 / Eurocode 2, and maintain rigorous on-site drawing fidelity.',
        scope_of_work: 'Deck falsework and marine board shuttering, heavy main drop-beam cage assembly, shear link distribution, two-way slab rebar tying, conduit coordination, and engineer pre-pour inspection.',
        technical_approach: 'Continuous on-site blueprint review by resident project engineers, verifying tension anchorages, cranked bars, beam-column joint confinements, and placing concrete cover spacers prior to monolithic pour.',
        project_outcome: 'Flawlessly coordinated structural deck with verified rebar clearances, ready for monolithic ready-mix concrete placement under strict engineering supervision.',
        cover_image: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg',
        featured: 1,
        publication_status: 'published',
        seo_title: 'Suspended Concrete Slab & Rebar Engineering | SPES Swiftpace',
        meta_description: 'Structural slab engineering, drop beam rebar assembly, and drawing verification in Lagos, Nigeria by SPES Swiftpace.'
      },
      {
        title: 'Multi-Level Reinforced Concrete Structural Frame & Cantilevered Deck Construction',
        slug: 'multilevel-concrete-structural-frame',
        category: 'Building Construction',
        location: 'South-West Nigeria',
        client: 'Institutional / Commercial Client',
        project_status: 'Superstructure Execution',
        completion_date: 'Active Construction',
        short_description: 'Construction of a 3-storey reinforced concrete framed building with full-height staging, timber falsework propping, cantilevered balcony slabs, and integrated structural staircase.',
        overview: 'A substantial multi-level structural building construction project in South-West Nigeria demonstrating integrated concrete framing capabilities. The project features a monolithic cast-in-place reinforced concrete skeleton comprising ground-to-roof columns, floor beams, cantilevered balcony projections, and cast-in-place reinforced concrete staircases.',
        objectives: 'Construct an earthquake and wind-resistant multi-storey skeleton that optimizes internal clear spans and satisfies all statutory physical planning and structural regulations.',
        scope_of_work: 'Ground-to-roof structural staging, timber and tubular steel propping load calculations, rebar fixing, monolithic concrete casting, staircase framing, and curing supervision.',
        technical_approach: 'Floor-by-floor staging with vertical props calculated for wet-concrete loads plus dynamic construction traffic, cross-braced timber access stair towers, and sequential de-shuttering schedules tied to cube crush test results.',
        project_outcome: 'Robust multi-level skeleton delivered with precise dimensional tolerances, ready for external block infill masonry and architectural facade treatments.',
        cover_image: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-03.jpg',
        featured: 1,
        publication_status: 'published',
        seo_title: 'Multi-Level Reinforced Concrete Framing | SPES Swiftpace',
        meta_description: 'Construction case study of a 3-storey reinforced concrete framed building and cantilevered slabs by SPES Swiftpace.'
      },
      {
        title: '4-Storey Curvilinear Mixed-Use Architectural Development',
        slug: 'curvilinear-mixed-use-development',
        category: 'Architecture',
        location: 'Urban Commercial Hub, South-West Nigeria',
        client: 'Commercial Real Estate Investor',
        project_status: 'Finishing & Envelope Phase',
        completion_date: 'Active Project',
        short_description: 'Distinctive 4-storey contemporary architectural mixed-use development featuring smooth curved cantilevered balconies, custom window apertures, and perimeter safety scaffolding.',
        overview: 'An architectural landmark project showcasing contemporary spatial design and challenging curvilinear execution. The 4-level building features a sweeping curved frontal elevation, continuous cantilevered balconies on each upper floor, multi-coat exterior screeding, architectural parapet styling, and dedicated commercial/residential zoning.',
        objectives: 'Deliver a visually commanding contemporary building that maximizes frontal street presence, promotes natural cross-ventilation through curved balconies, and incorporates modern weatherproofing.',
        scope_of_work: 'Architectural design, radial formwork engineering, cantilevered balcony structural analysis, exterior screeding and weatherproofing, window frame installations, and modular scaffolding.',
        technical_approach: 'Custom radial formwork templates for curved floor slabs and balustrade curbs, high-durability polymer-modified sand-cement exterior rendering, and perimeter tubular steel scaffolding with protective safety mesh.',
        project_outcome: 'High aesthetic appeal achieved with smooth curvature, setting an architectural benchmark for modern commercial and residential mixed-use construction.',
        cover_image: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-01.jpg',
        featured: 1,
        publication_status: 'published',
        seo_title: '4-Storey Curvilinear Architectural Mixed-Use | SPES Swiftpace',
        meta_description: 'Architectural design and construction of a 4-storey curvilinear building with curved balconies by SPES Swiftpace.'
      },
      {
        title: 'Luxury Contemporary 2-Storey Residential Duplex & External Works',
        slug: 'contemporary-residential-duplex',
        category: 'Building Construction',
        location: 'Ado Ekiti & Regional Residential Hubs, Ekiti State',
        client: 'Private Residential Owner',
        project_status: 'Completed / Turnkey Delivery',
        completion_date: '2026 Turnkey Delivery',
        short_description: 'Turnkey architectural and building construction delivery of a luxury 2-storey duplex featuring clean white exterior screeding, architectural parapets, dark shingle roof, cantilevered balcony, and paved grounds.',
        overview: 'A modern private residential building construction project showcasing SPES Swiftpace’s turnkey craftsmanship. The duplex features high-end architectural styling, crisp multi-coat exterior screeding, contrasting dark slate-textured roof tiles, parapet moldings, tinted solar-control glazing, cantilevered balcony with feature brick cladding, and fully paved exterior grounds.',
        objectives: 'Deliver a private luxury residence meeting the highest standards of architectural refinement, structural durability, thermal comfort, and secure perimeter containment.',
        scope_of_work: 'Turnkey building construction from foundation to final finishes, roof trusses and slate shingle roofing, electrical and plumbing installations, exterior screeding and painting, and interlocking driveway paving.',
        technical_approach: 'Rigid raft foundation, reinforced concrete frame with sandcrete block infill, waterproofed parapet gutters, premium acoustic door and window joinery, and durable interlocking concrete pavers.',
        project_outcome: 'Completed and delivered on schedule, achieving exceptional client satisfaction, energy efficiency, and durable low-maintenance exterior finishes.',
        cover_image: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-01.jpg',
        featured: 1,
        publication_status: 'published',
        seo_title: 'Contemporary 2-Storey Residential Duplex | SPES Swiftpace',
        meta_description: 'Turnkey architectural planning and building construction of a luxury residential duplex in Ekiti State by SPES Swiftpace.'
      }
    ];

    const insertProject = db.prepare(`
      INSERT INTO projects (
        title, slug, category, location, client, project_status, completion_date,
        short_description, overview, objectives, scope_of_work, technical_approach,
        project_outcome, cover_image, featured, publication_status, seo_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertImage = db.prepare(`
      INSERT INTO project_images (
        project_id, image_path, image_caption, display_order
      ) VALUES (?, ?, ?, ?)
    `);

    // Mapping of gallery images per project
    const projectGalleries: Record<string, Array<{ path: string; caption: string }>> = {
      'commercial-column-structural-shoring': [
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-01.jpg', caption: 'Reinforced concrete column formwork assembly and vertical steel propping systems' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-02.jpg', caption: 'Heavy-duty column shuttering with diagonal tie-rod alignment shores' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-03.jpg', caption: 'Pre-pour inspection of vertical rebar cages and timber formwork framework' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-04.jpg', caption: 'Column perimeter structural supports with high-capacity steel jacks' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-05.jpg', caption: 'Overview of multi-column shuttering grid across the upper suspended deck' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-06.jpg', caption: 'Vertical elevation view of column rebar starter bars and shoring props' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-07.jpg', caption: 'Lateral bracing and structural alignment inspection on concrete columns' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-08.jpg', caption: 'Formwork alignment verification against structural grid specifications' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-09.jpg', caption: 'Column reinforcement cage positioning before concrete batch placement' },
        { path: '/assets/projects/commercial-column-shoring/commercial-column-shoring-10.jpg', caption: 'Safety-inspected column formwork ready for concrete placement' }
      ],
      'suspended-slab-rebar-assembly': [
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg', caption: 'Site supervisory engineers inspecting structural drawings directly on the suspended rebar deck' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-02.jpg', caption: 'Reviewing reinforcement schedule and column starter bar alignment with engineering drawings' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-03.jpg', caption: 'Drop-beam rebar cage placement and marine board formwork deck' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-04.jpg', caption: 'Suspended floor slab rebar grid tying with drop beams and perimeter stirrups' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-05.jpg', caption: 'Detailed view of main beam tensile reinforcement bars and shear links' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-06.jpg', caption: 'Operatives tying two-way slab reinforcement mesh according to bar-bending schedule' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-07.jpg', caption: 'Electrical conduits and mechanical piping integration within the reinforcement grid' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-08.jpg', caption: 'Pre-pour steel reinforcement inspection and concrete cover verification' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-09.jpg', caption: 'Engineers verifying lap lengths and anchorages for elevated concrete casting' },
        { path: '/assets/projects/suspended-slab-decking/suspended-slab-decking-10.jpg', caption: 'Completed suspended slab rebar assembly prepared for monolithic concrete pouring' }
      ],
      'multilevel-concrete-structural-frame': [
        { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-01.jpg', caption: 'Multi-level framed structure with dense vertical propping and formwork' },
        { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-02.jpg', caption: 'Floor-by-floor falsework staging and concrete frame construction' },
        { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-03.jpg', caption: 'Elevated view of 3-storey reinforced concrete skeleton with access staging' },
        { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-04.jpg', caption: 'Cantilevered slab falsework and perimeter column casting' },
        { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-05.jpg', caption: 'Structural access ramp and staircase installation within the building frame' },
        { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-06.jpg', caption: 'Upper-deck propping and masonry infill sequence on lower level' }
      ],
      'curvilinear-mixed-use-development': [
        { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-01.jpg', caption: 'Curved architectural facade with cantilevered front balconies and exterior screeding' },
        { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-02.jpg', caption: 'Side elevation showing window apertures and perimeter tubular steel scaffolding' },
        { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-03.jpg', caption: 'Street elevation with safety netting, external scaffolding, and commercial ground floor' },
        { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-04.jpg', caption: 'Detailed facade view of curved parapet, balcony balustrade recesses, and exterior plastering' }
      ],
      'contemporary-residential-duplex': [
        { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-01.jpg', caption: 'Front exterior view of completed contemporary 2-storey duplex villa with modern dark roof shingles' },
        { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-02.jpg', caption: 'Side elevation featuring architectural parapet profiles, window moldings, and drainage downpipes' },
        { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-03.jpg', caption: 'Entry porch with dark accent brickwork, cantilevered upper balcony, and granite entrance steps' },
        { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-04.jpg', caption: 'Site layout showing paved interlocking driveway, boundary security wall, and external utilities' }
      ]
    };

    for (const p of authenticProjects) {
      const res = insertProject.run(
        p.title, p.slug, p.category, p.location, p.client, p.project_status, p.completion_date,
        p.short_description, p.overview, p.objectives, p.scope_of_work, p.technical_approach,
        p.project_outcome, p.cover_image, p.featured, p.publication_status, p.seo_title, p.meta_description
      );
      const projectId = res.lastInsertRowid;

      const gallery = projectGalleries[p.slug] || [];
      gallery.forEach((img, idx) => {
        insertImage.run(projectId, img.path, img.caption, idx + 1);
      });
      console.log(`Inserted project: ${p.title} (ID: ${projectId}) with ${gallery.length} photos`);
    }

    // 3. Populate Media library with all authentic photos and official logo
    db.prepare('DELETE FROM media').run();
    const insertMedia = db.prepare(`
      INSERT INTO media (filename, file_path, file_type, file_size, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    // Insert official logo
    insertMedia.run('spes_official_logo.jpeg', '/assets/spes_logo.jpeg', 'image/jpeg', 122572, 'Company');

    // Insert all project photos into media library
    for (const [slug, gallery] of Object.entries(projectGalleries)) {
      let mediaCat = 'Projects';
      if (slug.includes('shoring') || slug.includes('slab')) mediaCat = 'Civil Engineering';
      else if (slug.includes('curvilinear') || slug.includes('duplex')) mediaCat = 'Architecture';
      else if (slug.includes('multilevel')) mediaCat = 'Building Construction';

      gallery.forEach((img) => {
        const fname = img.path.split('/').pop() || 'photo.jpg';
        insertMedia.run(fname, img.path, 'image/jpeg', 150000, mediaCat);
      });
    }

    // 4. Update website settings with the official Company Profile
    const updatedSettings: Record<string, string> = {
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
      hero_subtitle: 'SPES Swiftpace Engineering Solutions Limited provides integrated professional services across architecture, building construction, civil and structural engineering, construction management, consultancy and allied services.',
      company_overview: 'SPES Swiftpace Engineering Solutions Limited is an engineering, construction and consultancy company based in Ado Ekiti, Ekiti State, Nigeria. The company’s stated service areas span architecture, building construction, civil and structural engineering, construction management, consultancy and allied services. Operating from Ado Ekiti, Ekiti State, Nigeria, the company is positioned to serve individuals, businesses, institutions and organisations seeking practical solutions for the built environment. The company’s service offering brings together design-related capabilities, engineering input, construction activity and project coordination. Its stated approach places emphasis on technical precision, professional coordination, quality workmanship, functional design and effective project delivery.',
      company_vision: 'To become a recognised and trusted engineering and construction company, distinguished by technical excellence, innovative thinking, quality project delivery and sustainable contributions to the built environment.',
      company_mission: 'To provide professional, efficient and innovative engineering, construction and consultancy services through sound technical practices, effective project management and a commitment to quality, safety and client satisfaction.',
      contact_notice: 'Our engineering directorate in Ado Ekiti reviews all project briefs confidentially.'
    };

    const updateSetting = db.prepare(`
      INSERT INTO website_settings (setting_key, setting_value)
      VALUES (?, ?)
      ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value, updated_at = CURRENT_TIMESTAMP
    `);

    for (const [k, v] of Object.entries(updatedSettings)) {
      updateSetting.run(k, v);
    }
  });

  runMigration();
  console.log('Seeding completed successfully!');
}

seedAuthenticProjects();

