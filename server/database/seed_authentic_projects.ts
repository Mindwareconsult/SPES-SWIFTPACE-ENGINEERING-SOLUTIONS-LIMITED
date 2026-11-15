import fs from 'fs';
import path from 'path';
import { db } from './db';

interface SeedProject {
  title: string;
  slug: string;
  category: string;
  location: string;
  client: string;
  project_status: string;
  completion_date: string;
  short_description: string;
  overview: string;
  objectives: string;
  scope_of_work: string;
  technical_approach: string;
  project_outcome: string;
  cover_image: string;
  featured: number;
  publication_status: 'published' | 'draft';
  seo_title: string;
  meta_description: string;
  media_category: string;
  gallery: Array<{ path: string; caption: string }>;
}

const AUTHENTIC_PROJECTS: SeedProject[] = [
  {
    title: 'Substructure Pad Foundation & Blockwork Engineering — Ijebu Ode',
    slug: 'ijebu-ode-substructure-foundation-works',
    category: 'Civil & Structural Engineering',
    location: 'Taiwo Osipitan St, Ijebu Ode, Ogun State, Nigeria',
    client: 'Private Development Client (Editable in Admin)',
    project_status: 'Substructure / Active Construction',
    completion_date: 'Sept – Nov 2026 (Site Progress)',
    short_description:
      'Active substructure engineering and foundation construction in Ijebu Ode, Ogun State featuring excavated laterite pad footings, starter column reinforcement cages, concrete blinding, and sandcrete foundation blockwork.',
    overview:
      'On-site civil and structural substructure execution in Ijebu Ode, Ogun State, Nigeria. Site photography from September through November 2026 documents deep laterite soil excavations, weak-concrete trench blinding, fabricated high-tensile steel pad mats and column starter cages, cast concrete pad footings, and rising sandcrete block foundation walls supervised by SPES Swiftpace field operatives.',
    objectives:
      'Establish a stable load-bearing substructure within lateritic soil strata, ensure precise column grid geometry from starter cages, and construct properly aligned foundation blockwork walls ready for ground-beam capping and backfilling.',
    scope_of_work:
      'Setting out and trench/pit excavation, lean concrete blinding, pad footing and column starter rebar fabrication and tying, formwork boxing, pad concrete pouring, and substructure sandcrete masonry walling.',
    technical_approach:
      'Executed reinforced concrete isolated pad footings linked with starter column dowel cages anchored beneath blinding cover levels, followed by plumbed sandcrete block infill tied symmetrically around structural column pockets.',
    project_outcome:
      'Complete foundation footing grid and multi-bay substructure blockwork walls progressing on schedule with continuous SPES on-site supervision and PPE compliance.',
    cover_image: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-overview-01.jpg',
    featured: 1,
    publication_status: 'published',
    seo_title: 'Substructure Pad Foundation Engineering, Ijebu Ode | SPES Swiftpace',
    meta_description:
      'On-site pad foundation, starter column rebar tying, and substructure blockwork execution in Ijebu Ode, Ogun State by SPES Swiftpace Engineering Solutions Limited.',
    media_category: 'Civil Engineering',
    gallery: [
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-overview-01.jpg',
        caption: 'Wide site overview of foundation blockwork grid and structural column positions in Ijebu Ode, Ogun State (02/11/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-spes-team-rebar-02.jpg',
        caption: 'SPES field engineering operative in branded hi-vis vest tying pad footing reinforcement in Ijebu Ode (17/10/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-cast-pad-footing-03.jpg',
        caption: 'Cast reinforced concrete pad footing and column starter rebar cage along Taiwo Osipitan St, Ijebu Ode (22/10/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-pad-formwork-04.jpg',
        caption: 'Freshly cast concrete pad base with timber perimeter boxing and vertical starter reinforcement (22/10/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-blinded-trench-05.jpg',
        caption: 'Excavated laterite foundation trench prepared with lean concrete blinding in Ijebu Ode (30/09/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-column-starter-cage-06.jpg',
        caption: 'Vertical column starter reinforcement cage and stirrup links assembled in excavated footing pit (19/10/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-footing-mesh-tying-07.jpg',
        caption: 'Steel fixer crew tying bottom pad footing reinforcement mat prior to concrete placement (17/10/2026)'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-blockwork-08.jpg',
        caption: 'Substructure sandcrete blockwork rising symmetrically around cast concrete starter columns'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-substructure-walls-09.jpg',
        caption: 'Multi-bay foundation wall layout and starter column alignment across the laterite excavation'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-column-pocket-masonry-10.jpg',
        caption: 'Masonry alignment and column pocket framing along primary load-bearing grid lines'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-trench-rebar-grid-11.jpg',
        caption: 'Foundation trench layout showing footing depth and adjacent substructure blockwork'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-site-block-setting-12.jpg',
        caption: 'Plumbed sandcrete block setting and mortar jointing along substructure courses'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-crew-substructure-13.jpg',
        caption: 'Site masons and supervisors executing substructure blockwork wearing safety hi-vis vests'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-bay-14.jpg',
        caption: 'Internal partition walling inside the excavated substructure grid'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-corner-footing-15.jpg',
        caption: 'Corner substructure footing intersection and perimeter blockwork construction'
      },
      {
        path: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-perimeter-substructure-16.jpg',
        caption: 'Perimeter substructure progression showing container site office and material staging'
      }
    ]
  },
  {
    title: 'Contemporary Multi-Unit Terraced Residential Development',
    slug: 'contemporary-terraced-residential-development',
    category: 'Building Construction',
    location: 'Nigeria (Editable in Admin)',
    client: 'Residential Development Client (Editable in Admin)',
    project_status: 'Exterior Envelope & Courtyard Complete',
    completion_date: 'Verified Portfolio Record',
    short_description:
      'Contemporary two-storey multi-unit terraced residential development featuring stark white ground-floor colonnades, dark charcoal cantilevered upper volumes, glazed balcony balustrades, and full interlocking paved courtyard.',
    overview:
      'A modern multi-unit terraced residential development showcasing clean geometric massing and coordinated external paving works. Each two-storey residence pairs a crisp white rendered ground-level entry colonnade with a contrasting dark charcoal upper facade, recessed window apertures, tinted glass balcony railings, exterior solar floodlighting, and a continuous interlocking concrete paver courtyard.',
    objectives:
      'Deliver durable, low-maintenance contemporary multi-family residences with unified architectural rhythm, weather-resistant exterior finishes, and heavy-duty vehicular courtyard paving.',
    scope_of_work:
      'Superstructure masonry and reinforced concrete framing, cantilevered upper floor construction, multi-coat exterior screeding and two-tone painting, glass balcony balustrade installation, solar perimeter lighting, and interlocking driveway paving.',
    technical_approach:
      'Contrasting matte charcoal and bright white weather-shield exterior coatings protect the rendered blockwork envelope while cantilevered porch soffits shelter ground-level entryways and integrated courtyard drainage gradients channel surface runoff.',
    project_outcome:
      'Cohesive multi-unit residential terrace row delivered with crisp facade alignments, sheltered entry colonnades, and fully paved communal access.',
    cover_image: '/uploads/projects/contemporary-terraced-residential/terraced-residential-courtyard-01.jpg',
    featured: 1,
    publication_status: 'published',
    seo_title: 'Contemporary Terraced Residential Development | SPES Swiftpace',
    meta_description:
      'Modern two-storey white and charcoal terraced residential building construction and interlocking courtyard paving by SPES Swiftpace.',
    media_category: 'Building Construction',
    gallery: [
      {
        path: '/uploads/projects/contemporary-terraced-residential/terraced-residential-courtyard-01.jpg',
        caption: 'Wide entrance courtyard view of white and charcoal multi-unit terraced duplexes with interlocking concrete paving'
      },
      {
        path: '/uploads/projects/contemporary-terraced-residential/terraced-residential-perspective-02.jpg',
        caption: 'Perspective elevation of the terraced residential row displaying glazed balcony railings and upper cantilevered bays'
      },
      {
        path: '/uploads/projects/contemporary-terraced-residential/terraced-residential-corner-03.jpg',
        caption: 'Corner perspective highlighting ground colonnade pillars, exterior solar floodlighting, and paved forecourt'
      },
      {
        path: '/uploads/projects/contemporary-terraced-residential/terraced-residential-facade-04.jpg',
        caption: 'Close architectural detail of unit entry recess, parapet roof edge, and tinted balcony glazing'
      },
      {
        path: '/uploads/projects/contemporary-terraced-residential/terraced-residential-streetview-05.jpg',
        caption: 'Continuous street frontage of the terraced residential units and interlocking vehicular driveway'
      }
    ]
  },
  {
    title: 'Contemporary Residential & Multi-Unit Architectural Design Concepts',
    slug: 'residential-architectural-facade-concepts',
    category: 'Architecture',
    location: 'Nigeria (Design Portfolio)',
    client: 'SPES Architectural Studio Concepts',
    project_status: 'Architectural Design & 3D Visualization',
    completion_date: 'Design Portfolio',
    short_description:
      'Architectural design and 3D exterior visualization studies spanning modern terraced streetscapes, flat-roof contemporary duplexes, and pitched-roof residential villas with stone cladding and solar shading elements.',
    overview:
      'A curated collection of SPES architectural design studies illustrating versatile residential design languages—from high-density minimalist terraced townhomes with timber-slat screens and vertical shading louvers to bespoke detached two-storey family residences integrating textured stone veneers, illuminated entry stairs, and pitched dark-shingle rooflines.',
    objectives:
      'Explore climate-responsive facade articulation, natural daylighting through double-height glazing, sheltered balcony outdoor spaces, and rich material contrast prior to working drawings and site construction.',
    scope_of_work:
      'Architectural massing, 3D facade visualization, material palette specification, balcony and louver detailing, and external driveway layout planning.',
    technical_approach:
      'Balanced tropical solar control with modern residential geometry using recessed balconies, vertical timber/aluminum brise-soleil screens, deep cantilever soffits, and durable stone-cladding plinths.',
    project_outcome:
      'Client-ready architectural exterior concepts bridging contemporary design aesthetics with buildable structural configurations.',
    cover_image: '/uploads/projects/architectural-facade-concepts/arch-terraced-streetscape-01.jpg',
    featured: 1,
    publication_status: 'published',
    seo_title: 'Residential Architectural Design & Facade Concepts | SPES Swiftpace',
    meta_description:
      'Modern architectural facade designs and 3D residential building visualizations by SPES Swiftpace Engineering Solutions Limited.',
    media_category: 'Architecture',
    gallery: [
      {
        path: '/uploads/projects/architectural-facade-concepts/arch-terraced-streetscape-01.jpg',
        caption: 'Contemporary multi-unit terraced streetscape design featuring cantilevered frames and timber-slat balcony screens'
      },
      {
        path: '/uploads/projects/architectural-facade-concepts/arch-modernist-townhouse-02.jpg',
        caption: 'Minimalist white and charcoal terraced townhouse facade with vertical louvers and double-height glazing'
      },
      {
        path: '/uploads/projects/architectural-facade-concepts/arch-detached-flat-roof-03.jpg',
        caption: 'Modern flat-roof detached 2-storey residential concept with textured stone veneer and illuminated entry steps'
      },
      {
        path: '/uploads/projects/architectural-facade-concepts/arch-pitched-roof-villa-04.jpg',
        caption: 'Pitched dark-shingle roof residential villa concept pairing crisp white render with natural stone pier cladding'
      },
      {
        path: '/uploads/projects/architectural-facade-concepts/arch-ochre-duplex-concept-05.jpg',
        caption: 'Two-storey residential duplex concept with warm accent projections, glass balcony, and geometric paved driveway'
      }
    ]
  },
  {
    title: 'Contemporary Residential Interior Architecture & Bespoke Joinery',
    slug: 'contemporary-interior-architecture-finishing',
    category: 'Architecture',
    location: 'Nigeria (Interior Design Portfolio)',
    client: 'Residential Interior Portfolio',
    project_status: 'Interior Architecture & Finishing Concepts',
    completion_date: 'Design & Finishing Portfolio',
    short_description:
      'Comprehensive residential interior architecture and bespoke finishing studies featuring cove-lit living areas, fluted timber joinery, modern island kitchens, primary bedroom suites, and custom wardrobe systems.',
    overview:
      'Interior spatial planning, ceiling architecture, lighting integration, and custom millwork concepts crafted for modern residences. The visual studies demonstrate cohesive coordination between recessed perimeter POP/gypsum cove ceilings, warm architectural LED accent lighting, fluted timber paneling, stone countertops, and floor-to-ceiling modular cabinetry across kitchens, living lounges, and primary bedrooms.',
    objectives:
      'Harmonize functional ergonomics, concealed task and ambient lighting, durable stone/marble worktops, and clean-lined storage joinery across modern residential interiors.',
    scope_of_work:
      'Interior space planning, recessed ceiling and lighting design, kitchen island and cabinetry millwork detailing, bedroom headboard wall paneling, and custom wardrobe/vanity joinery concepts.',
    technical_approach:
      'Layered indirect warm LED strip illumination inside ceiling coves, floating wall partitions, and under-cabinet plinths alongside moisture-resistant cabinetry finishes and polished stone counters.',
    project_outcome:
      'Integrated interior architectural benchmarks guiding high-specification residential finishing and bespoke joinery execution.',
    cover_image: '/uploads/projects/interior-architecture-joinery/interior-primary-bedroom-suite-08.jpg',
    featured: 1,
    publication_status: 'published',
    seo_title: 'Residential Interior Architecture & Bespoke Joinery | SPES Swiftpace',
    meta_description:
      'Modern kitchen, living room, and primary bedroom interior architecture and finishing designs by SPES Swiftpace.',
    media_category: 'Architecture',
    gallery: [
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-open-kitchen-curve-01.jpg',
        caption: 'Open-plan contemporary kitchen featuring curved LED ceiling cove, fluted timber island, and globe pendant lights'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-living-media-wall-02.jpg',
        caption: 'Living and dining suite with backlit floating media partition, slatted wood wall detailing, and cove ceiling'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-white-living-cove-03.jpg',
        caption: 'Minimalist bright living/dining interior with recessed perimeter LED ceiling lighting and clean wall paneling'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-kitchen-island-charcoal-04.jpg',
        caption: 'Charcoal and beige kitchen with fluted wood breakfast island, black stone top, and geometric pendant lighting'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-kitchen-peninsula-marble-05.jpg',
        caption: 'Warm timber and marble-veined peninsula kitchen with fluted wood base and illuminated glass display cabinet'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-kitchen-greige-lshape-06.jpg',
        caption: 'Minimalist L-shaped kitchen cabinetry with integrated built-in oven and warm under-cabinet task lighting'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-kitchen-u-shape-07.jpg',
        caption: 'Dark charcoal and walnut U-shaped kitchen layout with LED plinth lighting and open corner shelving'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-primary-bedroom-suite-08.jpg',
        caption: 'Primary bedroom suite showcasing coffered cove-lit ceiling, vertical padded wall panels, and full-height glazing'
      },
      {
        path: '/uploads/projects/interior-architecture-joinery/interior-bespoke-wardrobe-vanity-09.jpg',
        caption: 'Bespoke floor-to-ceiling gloss wardrobe joinery with backlit arched mirror on fluted timber backdrop'
      }
    ]
  },
  {
    title: 'Multi-Storey Commercial Development & Column Structural Shoring',
    slug: 'commercial-column-structural-shoring',
    category: 'Civil & Structural Engineering',
    location: 'South-West Nigeria (Coordinates: E3.4 N6.5)',
    client: 'Commercial Development Partner',
    project_status: 'Superstructure Phase',
    completion_date: 'Active Project',
    short_description:
      'Precision structural engineering execution featuring reinforced concrete column formwork, heavy-duty adjustable shoring systems, and high-tensile steel rebar cages on an elevated commercial deck.',
    overview:
      'Active structural engineering and site construction coordination for a modern multi-storey commercial facility. The works showcase precision-engineered timber and steel column shuttering, rigid diagonal shoring systems designed to resist hydrostatic lateral pressures during concrete placement, and dense Grade 460B reinforcement bar assemblies executed in strict conformance with structural design specifications.',
    objectives:
      'Ensure vertical alignment (plumbness), eliminate differential deflection during concrete placement, guarantee watertight formwork joints to prevent grout leakage, and enforce occupational safety on elevated decks.',
    scope_of_work:
      'Structural formwork fabrication and erection, rebar cutting, bending and cage placement, concrete cover spacer block distribution, laser leveling, plumb-line verification, and pre-pour technical sign-offs.',
    technical_approach:
      'Utilized engineered modular formwork panels, heavy-duty adjustable steel push-pull props, calibrated steel tie-rods with high-torque wing-nuts, and Grade 460B high-yield deformed bars with controlled cover depth.',
    project_outcome:
      'Accurate column alignment across the multi-bay grid, clean concrete finishes upon de-shuttering, and verified structural integrity in compliance with Nigerian National Building Codes.',
    cover_image: '/assets/projects/commercial-column-shoring/commercial-column-shoring-01.jpg',
    featured: 1,
    publication_status: 'published',
    seo_title: 'Multi-Storey Column Structural Shoring | SPES Swiftpace Engineering',
    meta_description:
      'Case study of reinforced concrete column shuttering and structural shoring systems by SPES Swiftpace in South-West Nigeria.',
    media_category: 'Civil Engineering',
    gallery: [
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
    ]
  },
  {
    title: 'Suspended Floor Slab Assembly & On-Site Engineering Supervision',
    slug: 'suspended-slab-rebar-assembly',
    category: 'Construction Management',
    location: 'Lagos, Nigeria',
    client: 'Private Commercial Stakeholder',
    project_status: 'Superstructure In Progress',
    completion_date: 'Active Project',
    short_description:
      'On-site construction management and suspended floor slab structural coordination in Lagos, Nigeria, capturing resident engineers verifying blueprints, drop beam rebar cages, and conduit embedment.',
    overview:
      'Located in Lagos, Nigeria, this assignment showcases critical-path construction supervision and structural quality assurance on an elevated floor deck. Resident site engineers review structural working drawings directly on the slab prior to casting, inspecting marine board shuttering, main drop-beam rebar cages, two-way slab mesh, and MEP conduit routing.',
    objectives:
      'Maintain strict blueprint fidelity on site, verify bar spacing and lap lengths per BS 8110 / Eurocode 2, coordinate MEP rough-ins before concrete pouring, and eliminate rework.',
    scope_of_work:
      'On-site blueprint verification, deck falsework and marine board inspection, drop-beam and two-way slab rebar QA/QC, electrical conduit coordination, and pre-pour engineer sign-off.',
    technical_approach:
      'Continuous supervisory drawing audits by resident project engineers, verifying tension anchorages, cranked bars, beam-column joint confinements, and cover spacers before monolithic concrete placement.',
    project_outcome:
      'Coordinated structural deck with verified rebar clearances and MEP embeds ready for monolithic concrete casting under strict supervision.',
    cover_image: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg',
    featured: 1,
    publication_status: 'published',
    seo_title: 'Suspended Concrete Slab & On-Site Supervision | SPES Swiftpace',
    meta_description:
      'Construction management, suspended slab rebar assembly, and on-site drawing verification in Lagos, Nigeria by SPES Swiftpace.',
    media_category: 'Civil Engineering',
    gallery: [
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
    ]
  },
  {
    title: 'Multi-Level Reinforced Concrete Structural Frame & Cantilevered Deck Construction',
    slug: 'multilevel-concrete-structural-frame',
    category: 'Building Construction',
    location: 'South-West Nigeria',
    client: 'Institutional / Commercial Client',
    project_status: 'Superstructure Execution',
    completion_date: 'Active Construction',
    short_description:
      'Construction of a 3-storey reinforced concrete framed building with full-height staging, timber falsework propping, cantilevered balcony slabs, and integrated structural staircase.',
    overview:
      'A multi-level structural building construction project in South-West Nigeria demonstrating integrated concrete framing capabilities. The project features a monolithic cast-in-place reinforced concrete skeleton comprising ground-to-roof columns, floor beams, cantilevered balcony projections, and cast-in-place reinforced concrete staircases.',
    objectives:
      'Construct a laterally stable multi-storey skeleton that optimizes internal clear spans and satisfies statutory physical planning and structural regulations.',
    scope_of_work:
      'Ground-to-roof structural staging, timber and tubular steel propping, rebar fixing, monolithic concrete casting, staircase framing, and curing supervision.',
    technical_approach:
      'Floor-by-floor staging with vertical props sized for wet-concrete loads plus construction live traffic, cross-braced access towers, and sequential de-shuttering tied to curing milestones.',
    project_outcome:
      'Multi-level reinforced concrete skeleton delivered with consistent dimensional tolerances ready for masonry infill and architectural facade treatments.',
    cover_image: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-03.jpg',
    featured: 0,
    publication_status: 'published',
    seo_title: 'Multi-Level Reinforced Concrete Framing | SPES Swiftpace',
    meta_description:
      'Construction case study of a 3-storey reinforced concrete framed building and cantilevered slabs by SPES Swiftpace.',
    media_category: 'Building Construction',
    gallery: [
      { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-01.jpg', caption: 'Multi-level framed structure with dense vertical propping and formwork' },
      { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-02.jpg', caption: 'Floor-by-floor falsework staging and concrete frame construction' },
      { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-03.jpg', caption: 'Elevated view of 3-storey reinforced concrete skeleton with access staging' },
      { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-04.jpg', caption: 'Cantilevered slab falsework and perimeter column casting' },
      { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-05.jpg', caption: 'Structural access ramp and staircase installation within the building frame' },
      { path: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-06.jpg', caption: 'Upper-deck propping and masonry infill sequence on lower level' }
    ]
  },
  {
    title: '4-Storey Curvilinear Mixed-Use Architectural Development',
    slug: 'curvilinear-mixed-use-development',
    category: 'Architecture',
    location: 'Urban Commercial Hub, South-West Nigeria',
    client: 'Commercial Real Estate Investor',
    project_status: 'Finishing & Envelope Phase',
    completion_date: 'Active Project',
    short_description:
      'Distinctive 4-storey contemporary architectural mixed-use development featuring smooth curved cantilevered balconies, custom window apertures, and perimeter safety scaffolding.',
    overview:
      'An architectural landmark project showcasing contemporary spatial design and curvilinear execution. The 4-level building features a sweeping curved frontal elevation, continuous cantilevered balconies on each upper floor, multi-coat exterior screeding, architectural parapet styling, and mixed commercial/residential zoning.',
    objectives:
      'Deliver a visually commanding contemporary building that maximizes street frontage presence, promotes natural cross-ventilation through curved balconies, and incorporates durable weatherproofing.',
    scope_of_work:
      'Architectural design, radial formwork engineering, cantilevered balcony structural detailing, exterior screeding and rendering, window frame installations, and modular scaffolding.',
    technical_approach:
      'Custom radial formwork templates for curved floor slabs and balustrade curbs, weather-resistant sand-cement exterior rendering, and perimeter tubular steel scaffolding with safety netting.',
    project_outcome:
      'Distinctive curved frontal facade achieved with smooth radial continuity for contemporary commercial and residential occupancy.',
    cover_image: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-01.jpg',
    featured: 0,
    publication_status: 'published',
    seo_title: '4-Storey Curvilinear Architectural Mixed-Use | SPES Swiftpace',
    meta_description:
      'Architectural design and construction of a 4-storey curvilinear building with curved balconies by SPES Swiftpace.',
    media_category: 'Architecture',
    gallery: [
      { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-01.jpg', caption: 'Curved architectural facade with cantilevered front balconies and exterior screeding' },
      { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-02.jpg', caption: 'Side elevation showing window apertures and perimeter tubular steel scaffolding' },
      { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-03.jpg', caption: 'Street elevation with safety netting, external scaffolding, and commercial ground floor' },
      { path: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-04.jpg', caption: 'Detailed facade view of curved parapet, balcony balustrade recesses, and exterior plastering' }
    ]
  },
  {
    title: 'Luxury Contemporary 2-Storey Residential Duplex & External Works',
    slug: 'contemporary-residential-duplex',
    category: 'Building Construction',
    location: 'Ado Ekiti & Regional Residential Hubs, Ekiti State',
    client: 'Private Residential Owner',
    project_status: 'Completed Exterior Envelope',
    completion_date: 'Verified Portfolio Record',
    short_description:
      'Turnkey architectural and building construction delivery of a luxury 2-storey duplex featuring clean white exterior screeding, architectural parapets, dark shingle roof, cantilevered balcony, and paved grounds.',
    overview:
      'A modern private residential building construction project showcasing SPES Swiftpace’s craftsmanship. The duplex features contemporary architectural styling, crisp multi-coat exterior screeding, contrasting dark roof tiles, parapet moldings, tinted glazing, cantilevered balcony with accent brick cladding, and paved exterior grounds.',
    objectives:
      'Deliver a private luxury residence meeting high standards of architectural refinement, structural durability, thermal comfort, and secure perimeter containment.',
    scope_of_work:
      'Turnkey building construction from foundation to final finishes, roof framing and dark shingle roofing, electrical and plumbing installations, exterior screeding and painting, and interlocking driveway paving.',
    technical_approach:
      'Reinforced concrete frame with sandcrete block infill, waterproofed parapet gutters, tinted exterior glazing, and heavy-duty interlocking concrete compound paving.',
    project_outcome:
      'Completed exterior building envelope and compound paving with durable, low-maintenance finishes.',
    cover_image: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-01.jpg',
    featured: 0,
    publication_status: 'published',
    seo_title: 'Contemporary 2-Storey Residential Duplex | SPES Swiftpace',
    meta_description:
      'Turnkey architectural planning and building construction of a luxury residential duplex in Ekiti State by SPES Swiftpace.',
    media_category: 'Architecture',
    gallery: [
      { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-01.jpg', caption: 'Front exterior view of completed contemporary 2-storey duplex villa with modern dark roof shingles' },
      { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-02.jpg', caption: 'Side elevation featuring architectural parapet profiles, window moldings, and drainage downpipes' },
      { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-03.jpg', caption: 'Entry porch with dark accent brickwork, cantilevered upper balcony, and granite entrance steps' },
      { path: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-04.jpg', caption: 'Site layout showing paved interlocking driveway, boundary security wall, and external utilities' }
    ]
  }
];

function getFileSize(webPath: string): number {
  const clean = webPath.replace(/^\/+/, '');
  const candidate = clean.startsWith('assets/')
    ? path.join(process.cwd(), 'public', clean)
    : path.join(process.cwd(), clean);
  try {
    return fs.statSync(candidate).size;
  } catch {
    return 120000;
  }
}

export function ensureAuthenticProjectsAndMedia() {
  const runSync = db.transaction(() => {
    // 1. Replace legacy Unsplash sample placeholder projects (never touch authentic or admin-created projects)
    const unsplashProjects = db
      .prepare("SELECT id FROM projects WHERE cover_image LIKE '%images.unsplash.com%'")
      .all() as Array<{ id: number }>;
    for (const row of unsplashProjects) {
      db.prepare('DELETE FROM project_images WHERE project_id = ?').run(row.id);
      db.prepare('DELETE FROM projects WHERE id = ?').run(row.id);
    }

    // 2. Insert each authentic project if not already present (preserves admin edits to existing records)
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

    let insertedProjects = 0;
    for (const p of AUTHENTIC_PROJECTS) {
      const existing = db.prepare('SELECT id FROM projects WHERE slug = ?').get(p.slug) as
        | { id: number }
        | undefined;

      let projectId: number | bigint;
      if (!existing) {
        const res = insertProject.run(
          p.title,
          p.slug,
          p.category,
          p.location,
          p.client,
          p.project_status,
          p.completion_date,
          p.short_description,
          p.overview,
          p.objectives,
          p.scope_of_work,
          p.technical_approach,
          p.project_outcome,
          p.cover_image,
          p.featured,
          p.publication_status,
          p.seo_title,
          p.meta_description
        );
        projectId = res.lastInsertRowid;
        insertedProjects++;
      } else {
        projectId = existing.id;
      }

      const imgCount = (
        db.prepare('SELECT COUNT(*) as c FROM project_images WHERE project_id = ?').get(projectId) as { c: number }
      ).c;
      if (imgCount === 0 && p.gallery.length > 0) {
        p.gallery.forEach((img, idx) => {
          insertImage.run(projectId, img.path, img.caption, idx + 1);
        });
      }
    }

    // 3. Register all authentic media items idempotently (avoid duplicates)
    const checkMedia = db.prepare('SELECT id FROM media WHERE file_path = ?');
    const insertMedia = db.prepare(`
      INSERT INTO media (filename, file_path, file_type, file_size, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    const registerMedia = (filePath: string, category: string, customFilename?: string) => {
      if (checkMedia.get(filePath)) return;
      const filename = customFilename || path.basename(filePath);
      const size = getFileSize(filePath);
      insertMedia.run(filename, filePath, 'image/jpeg', size, category);
    };

    registerMedia('/assets/spes_logo.jpeg', 'Company', 'spes_official_logo.jpeg');

    for (const p of AUTHENTIC_PROJECTS) {
      for (const img of p.gallery) {
        registerMedia(img.path, p.media_category);
      }
    }

    // 4. Replace any remaining Unsplash featured_image on seeded blog posts with authentic SPES images
    const blogReplacements: Array<{ slug: string; image: string }> = [
      {
        slug: 'importance-of-structural-engineering-modern-construction-nigeria',
        image: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-spes-team-rebar-02.jpg'
      },
      {
        slug: 'key-considerations-before-starting-building-project-nigeria',
        image: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-overview-01.jpg'
      },
      {
        slug: 'understanding-the-role-of-construction-management',
        image: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg'
      },
      {
        slug: 'architectural-optimization-climate-responsive-design-nigeria',
        image: '/uploads/projects/architectural-facade-concepts/arch-terraced-streetscape-01.jpg'
      }
    ];

    const updateBlogImg = db.prepare(`
      UPDATE blog_posts SET featured_image = ?
      WHERE slug = ? AND featured_image LIKE '%images.unsplash.com%'
    `);
    for (const br of blogReplacements) {
      updateBlogImg.run(br.image, br.slug);
    }

    // 5. Ensure official Company Profile website_settings exist without overwriting admin changes
    const profileSettings: Record<string, string> = {
      company_overview:
        'SPES Swiftpace Engineering Solutions Limited is an engineering, construction and consultancy company based in Ado Ekiti, Ekiti State, Nigeria. Operating across architecture, building construction, civil and structural engineering, construction management, consultancy and allied services, the company delivers practical solutions grounded in technical precision and quality workmanship.',
      company_vision:
        'To become a recognised and trusted engineering and construction company, distinguished by technical excellence, innovative thinking, quality project delivery and sustainable contributions to the built environment.',
      company_mission:
        'To provide professional, efficient and innovative engineering, construction and consultancy services through sound technical practices, effective project management and a commitment to quality, safety and client satisfaction.'
    };

    const insertSettingIfMissing = db.prepare(`
      INSERT OR IGNORE INTO website_settings (setting_key, setting_value)
      VALUES (?, ?)
    `);
    for (const [k, v] of Object.entries(profileSettings)) {
      insertSettingIfMissing.run(k, v);
    }

    if (insertedProjects > 0) {
      console.log(`[SPES] Seeded ${insertedProjects} authentic engineering projects and media assets.`);
    }
  });

  runSync();
}

// Allow standalone CLI execution (`npx tsx server/database/seed_authentic_projects.ts`)
if (typeof require !== 'undefined' && require.main === module) {
  ensureAuthenticProjectsAndMedia();
  console.log('[SPES] Authentic project & media sync completed.');
}
