import { ServiceDetailItem } from '../types';

export const servicesData: ServiceDetailItem[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    slug: 'architecture',
    iconName: 'Compass',
    shortDesc: 'Architectural planning and design support for functional, considered and context-appropriate built environments.',
    heroImage: '/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-01.jpg',
    detailedOverview: 'SPES Swiftpace Engineering Solutions Limited provides architectural planning and design support focused on functional, considered and context-appropriate built environments. Our design methodology unites spatial ergonomics, bioclimatic climate responsiveness, and cutting-edge 3D modeling with direct structural buildability to produce enduring built environments across commercial, civic, and residential sectors.',
    capabilities: [
      'Architectural planning and creative master planning',
      'Residential building design (contemporary villas, luxury duplexes, multi-family housing)',
      'Commercial, corporate, and institutional facility design',
      'Spatial layouts, functional ergonomics, and interior space planning',
      'Comprehensive architectural working drawings and statutory documentation',
      'Building renovation, adaptive reuse, and facade remodeling',
      'Interdisciplinary design coordination with structural and MEP engineers'
    ],
    clientBenefits: [
      { title: 'Optimized Spatial Efficiency', desc: 'Every square meter is programmed to maximize usability, natural daylighting, and circulation flow.' },
      { title: 'Bioclimatic Thermal Comfort', desc: 'Passive cooling, strategic solar shading, and cross-ventilation reduce continuous energy and HVAC costs.' },
      { title: 'Flawless Statutory Compliance', desc: 'Permit-ready working drawings engineered to adhere to state town planning regulations.' },
      { title: 'Timeless Aesthetic Identity', desc: 'Distinctive architectural form that elevates corporate prestige and real estate market value.' }
    ],
    processStages: [
      { step: '01', title: 'Client Brief & Site Analysis', desc: 'Clarifying the client’s objectives, site contours, requirements, and physical planning constraints.' },
      { step: '02', title: 'Conceptual Schematics', desc: 'Drafting preliminary spatial layouts, massing studies, and architectural volumetric concepts.' },
      { step: '03', title: 'Design Development & 3D Modeling', desc: 'Refining volumetric geometry, material finishes, photorealistic 3D renders, and walk-throughs.' },
      { step: '04', title: 'Detailed Working Drawings', desc: 'Compiling structural-compatible construction drawings, door/window schedules, and specifications.' },
      { step: '05', title: 'Statutory Permitting', desc: 'Assembling submission packages for government physical planning authority approval.' },
      { step: '06', title: 'Site Design Supervision', desc: 'Periodic architectural inspections ensuring on-site craftsmanship matches design intent.' }
    ],
    faqs: [
      { q: 'Can SPES design both residential and commercial buildings?', a: 'Yes. Our architectural team has experience across private residences, multi-unit residential developments, retail plazas, corporate office towers, and civic facilities.' },
      { q: 'Do you assist with physical planning building permits in Ekiti and South-West Nigeria?', a: 'Yes. We prepare full architectural packages tailored to meet the statutory codes and requirements of state urban development and physical planning authorities.' },
      { q: 'Can you work with an existing concept or remodel an older property?', a: 'Absolutely. We specialize in renovation, adaptive reuse, and modern facade updates for existing structures.' }
    ]
  },
  {
    id: 'building-construction',
    title: 'Building Construction',
    slug: 'building-construction',
    iconName: 'Building2',
    shortDesc: 'Building construction services focused on translating project requirements and design intent into built works.',
    heroImage: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-01.jpg',
    detailedOverview: 'SPES Swiftpace Engineering Solutions Limited provides building construction services dedicated to translating project requirements and design intent into high-quality built works. Operating from Ado Ekiti, Ekiti State, we provide ground-up construction management, substructure foundations, reinforced concrete frames, masonry infills, roofing systems, and turnkey finishes.',
    capabilities: [
      'Residential building construction (bespoke homes, luxury duplexes, gated estates)',
      'Commercial building construction (office complexes, shopping plazas, hospitality)',
      'Institutional and public sector facility construction',
      'Turnkey property development from site clearing to turnkey handover',
      'Structural renovation, building rehabilitation, and structural retrofitting',
      'Continuous on-site quality assurance and laboratory material testing',
      'Comprehensive construction supervision and sub-trade management'
    ],
    clientBenefits: [
      { title: 'Rigorous Material Standards', desc: 'We only deploy laboratory-tested cement, graded aggregates, and certified steel reinforcement bars.' },
      { title: 'Milestone-Driven Execution', desc: 'Clear timeline schedules prevent unwarranted downtime and protect your capital expenditure.' },
      { title: 'Zero Compromise on Safety', desc: 'Strict HSE protocols on every site minimize occupational hazards and site downtime.' },
      { title: 'Single-Source Accountability', desc: 'One professional corporate partner managing all trades, suppliers, and specialist artisans.' }
    ],
    processStages: [
      { step: '01', title: 'Mobilization & Site Setup', desc: 'Survey pegging, perimeter hoarding, site offices, and equipment logistics.' },
      { step: '02', title: 'Substructure & Foundation Works', desc: 'Excavation, blinding, steel rebar cage assembly, and foundation casting under supervision.' },
      { step: '03', title: 'Superstructure Framing', desc: 'Casting columns, beams, suspended floor slabs, and load-bearing blockwork.' },
      { step: '04', title: 'Roofing & Building Envelope', desc: 'Installation of engineered structural steel/timber trusses, roofing membranes, and facade cladding.' },
      { step: '05', title: 'Services & Finishes', desc: 'Concealed MEP installations, screeding, tiling, architectural glazing, and custom joinery.' },
      { step: '06', title: 'Snagging, Testing & Handover', desc: 'System commissioning, rigorous punch-list rectification, and client key handover.' }
    ],
    faqs: [
      { q: 'How do you ensure construction quality on site?', a: 'Every concrete pour undergoes standard slump tests and cube compression testing in accredited laboratories. We enforce strict supervision on rebar spacing, cover blocks, and mortar mix ratios.' },
      { q: 'Can you construct based on architectural drawings provided by another firm?', a: 'Yes. We routinely review external architectural and structural packages, perform constructability audits, and execute the physical build to exact specifications.' }
    ]
  },
  {
    id: 'civil-structural-engineering',
    title: 'Civil & Structural Engineering',
    slug: 'civil-structural-engineering',
    iconName: 'Boxes',
    shortDesc: 'Civil and structural engineering input supporting the planning, design and delivery of safe and functional infrastructure and building elements.',
    heroImage: '/assets/projects/commercial-column-shoring/commercial-column-shoring-01.jpg',
    detailedOverview: 'SPES Swiftpace provides civil and structural engineering input supporting the planning, design and delivery of safe, functional infrastructure and durable building elements. We deploy advanced structural modeling and soil mechanics calculations to ensure every foundation, column, beam, suspended slab, and retaining structure is engineered for maximum structural integrity and code fidelity.',
    capabilities: [
      'Comprehensive structural engineering design and finite element modeling',
      'Structural health assessments, integrity audits, and load capacity evaluation',
      'Subsurface foundation engineering (pad footings, raft foundations, piled systems)',
      'Reinforced concrete structural design for multi-storey edifices',
      'Structural steel design (trusses, portal frames, industrial warehouses, canopies)',
      'Civil infrastructure engineering (access roads, drainage channels, culverts, retaining walls)',
      'Detailed engineering calculation sheets, bar bending schedules (BBS), and structural drawings',
      'Structural defect investigation, crack remediation, and structural strengthening consultancy'
    ],
    clientBenefits: [
      { title: 'Guaranteed Structural Safety', desc: 'Engineered in strict accordance with relevant BS/Eurocode standards and Nigerian building codes.' },
      { title: 'Cost-Optimized Reinforcement', desc: 'Precise rebar calculations prevent both dangerous under-reinforcement and wasteful over-engineering.' },
      { title: 'Soil-Tailored Foundations', desc: 'Custom foundation solutions engineered specifically for local soil stratigraphy and groundwater conditions.' },
      { title: 'Longevity & Asset Protection', desc: 'Structures designed to remain durable, crack-free, and resilient across multi-decade lifespans.' }
    ],
    processStages: [
      { step: '01', title: 'Geotechnical Soil Assessment', desc: 'Reviewing soil bore logs, water table levels, and allowable bearing capacity.' },
      { step: '02', title: 'Load Modeling & Computational Analysis', desc: 'Calculating dead, live, wind, and seismic load combinations via structural software.' },
      { step: '03', title: 'Structural Member Sizing', desc: 'Dimensioning reinforced concrete beams, columns, suspended floor slabs, and foundations.' },
      { step: '04', title: 'Detailing & Bar-Bending Schedules', desc: 'Producing unambiguous rebar placement drawings, lap lengths, and reinforcement schedules.' },
      { step: '05', title: 'Statutory Endorsements', desc: 'Providing professional engineering calculation reports for approval.' },
      { step: '06', title: 'Site Inspection & Sign-off', desc: 'Mandatory on-site pre-pour inspections of reinforcement cages, shuttering, and cover blocks.' }
    ],
    faqs: [
      { q: 'Why is a structural engineering drawing mandatory for two-storey buildings and above?', a: 'Multi-storey buildings exert significant loads on soil and structural columns. A structural drawing ensures reinforcement sizes, beam depths, and foundation types prevent catastrophic deflection or collapse.' },
      { q: 'Do you carry out structural integrity tests on existing buildings?', a: 'Yes. We conduct non-destructive tests (rebound hammer tests, core sampling, ultrasonic pulse velocity) to assess the concrete quality and load capacity of existing or compromised structures.' }
    ]
  },
  {
    id: 'construction-management',
    title: 'Construction Management',
    slug: 'construction-management',
    iconName: 'ClipboardCheck',
    shortDesc: 'Project coordination and construction management support, with attention to planning, sequencing, resources, quality and delivery.',
    heroImage: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg',
    detailedOverview: 'SPES Swiftpace delivers construction management support centered around critical-path sequencing, site coordination, contractor accountability, and financial transparency. We act as the client’s authoritative technical representative, coordinating consultants, trade contractors, and suppliers to eliminate budget leakages and project delays.',
    capabilities: [
      'Critical Path Method (CPM) project scheduling and baseline tracking',
      'Comprehensive procurement strategy and material supply chain management',
      'Contract administration, contractor prequalification, and tender evaluation',
      'On-site quality control (QC), materials testing, and craftsmanship verification',
      'Occupational Health, Safety & Environment (HSE) site compliance enforcement',
      'Cost control, bill of quantities (BOQ) valuation, and milestone payment certification',
      'Regular client photographic progress logs and digital dashboard reporting'
    ],
    clientBenefits: [
      { title: 'Elimination of Cost Overruns', desc: 'Rigorous valuation of on-site works ensures contractors are only paid for verified milestones.' },
      { title: 'Strict Schedule Adherence', desc: 'Proactive critical-path management mitigates supply chain delays and trade bottlenecks.' },
      { title: 'Uncompromising Quality', desc: 'Daily engineering supervision eliminates shortcutting by artisans and trade crews.' },
      { title: 'Total Stakeholder Transparency', desc: 'Detailed milestone reports, photographic records, and expenditure tracking.' }
    ],
    processStages: [
      { step: '01', title: 'Project Charter & Work Breakdown', desc: 'Establishing scope boundaries, timeline milestones, budget allocations, and RACI matrices.' },
      { step: '02', title: 'Tendering & Contractor Selection', desc: 'Preparing tender documents, evaluating subcontractor bids, and structuring contract terms.' },
      { step: '03', title: 'Site Execution & Coordination', desc: 'Daily coordination of site meetings, labor allocation, and trade sequencing.' },
      { step: '04', title: 'Quality & Safety Audits', desc: 'Inspecting materials, verifying slump tests, and enforcing mandatory safety protocols.' },
      { step: '05', title: 'Financial Valuation & Claims', desc: 'Measuring work done, verifying variation orders, and issuing milestone valuation certificates.' },
      { step: '06', title: 'Commissioning & Project Closeout', desc: 'Comprehensive defect rectification, final account reconciliation, and handover.' }
    ],
    faqs: [
      { q: 'What is the difference between a building contractor and a construction manager?', a: 'A contractor is hired to execute specific physical works. A construction manager acts on behalf of the client to oversee, schedule, cost-manage, and quality-audit contractors, ensuring the client’s financial and quality interests are strictly protected.' },
      { q: 'Can SPES manage a project for clients based outside Ekiti or abroad in the diaspora?', a: 'Yes. A substantial part of our clientele includes diaspora property owners and corporate organizations who rely on our transparent milestone reports, video walkthroughs, and verified bank certificate disbursements.' }
    ]
  },
  {
    id: 'consultancy',
    title: 'Consultancy',
    slug: 'consultancy',
    iconName: 'Briefcase',
    shortDesc: 'Professional advisory and consultancy support to help clients assess project needs, options and implementation considerations.',
    heroImage: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-03.jpg',
    detailedOverview: 'SPES Swiftpace provides specialized engineering consultancy and professional advisory support. We help property owners, commercial enterprises, and institutional clients evaluate site suitability, analyze structural alternatives, navigate statutory physical planning frameworks, and resolve technical complexities before committing significant capital.',
    capabilities: [
      'Project feasibility studies and technical viability assessments',
      'Structural defect investigations, distress analysis, and rehabilitation schemes',
      'Value engineering reviews to optimize material costs without compromising structural safety',
      'Statutory compliance advisory, developmental approvals, and physical planning interface',
      'Pre-purchase structural and architectural condition surveys for existing real estate',
      'Expert witness technical reports and dispute resolution support',
      'Environmental and site sustainability impact appraisals'
    ],
    clientBenefits: [
      { title: 'De-Risked Capital Investment', desc: 'Uncover hidden geotechnical, structural, or legal constraints before capital commitment.' },
      { title: 'Value-Engineered Savings', desc: 'Identify design inefficiencies and excessive specifications to optimize total project expenditure.' },
      { title: 'Authoritative Technical Counsel', desc: 'Objective, certified guidance unclouded by commercial product sales or contractor bias.' },
      { title: 'Regulatory Peace of Mind', desc: 'Smooth navigation through local and state urban development planning frameworks.' }
    ],
    processStages: [
      { step: '01', title: 'Consultation Briefing', desc: 'Identifying client challenges, project objectives, and required technical deliverable scope.' },
      { step: '02', title: 'Site Inspection & Data Gathering', desc: 'Field investigations, non-destructive testing, drawing audits, and regulatory inquiries.' },
      { step: '03', title: 'Engineering Analysis', desc: 'Running diagnostic calculations, stress simulations, or financial feasibility modeling.' },
      { step: '04', title: 'Advisory Report Compilation', desc: 'Synthesizing findings into an authoritative, actionable technical report with clear recommendations.' },
      { step: '05', title: 'Stakeholder Presentation', desc: 'Briefing executive boards, property owners, or legal teams on strategic next steps.' },
      { step: '06', title: 'Implementation Support', desc: 'Assisting with specification drafting, contractor vetting, or supervisory monitoring.' }
    ],
    faqs: [
      { q: 'When should I engage SPES for an engineering consultancy?', a: 'As early as possible—ideally during land acquisition, prior to drawing finalization, or immediately upon noticing structural cracks, dampness, or settlement on an existing building.' },
      { q: 'Do you provide value engineering for drawings prepared by other consultants?', a: 'Yes. We routinely review existing structural and architectural packages to identify optimization opportunities that reduce construction costs while upholding safety codes.' }
    ]
  },
  {
    id: 'allied-services',
    title: 'Allied Services',
    slug: 'allied-services',
    iconName: 'Wrench',
    shortDesc: 'Related services that complement the company’s core architecture, engineering, construction and management activities.',
    heroImage: '/assets/projects/contemporary-duplex-villa/contemporary-duplex-villa-04.jpg',
    detailedOverview: 'To provide a truly seamless project delivery ecosystem, SPES Swiftpace Engineering Solutions Limited provides specialized allied technical services. These complementary capabilities encompass external works, drainage, site preparation, utility installations, and technical infrastructure support.',
    capabilities: [
      'Site preparation, bulk earthmoving, grading, and perimeter retaining walls',
      'Interlocking concrete paving, perimeter security walls, and entrance gatehouses',
      'Stormwater drainage channels, culvert construction, and soakaway systems',
      'Mechanical, Electrical & Plumbing (MEP) coordination and borehole utility setups',
      'Topographical land surveys and boundary demarcation verification',
      'Facility maintenance planning and post-handover preventative servicing',
      'Landscaping and external civil works integration'
    ],
    clientBenefits: [
      { title: 'Unified Project Delivery', desc: 'No need to coordinate external sub-vendors for perimeter fencing, paving, or drainage.' },
      { title: 'Durable Infrastructure Works', desc: 'Heavy-duty pavement designs and stormwater channels engineered to resist erosion.' },
      { title: 'Enhanced Kerb Appeal', desc: 'Refined external finishing that complements the primary architectural structure.' },
      { title: 'Long-Term Facility Performance', desc: 'Reliable water, electrical, and drainage infrastructure built to commercial standards.' }
    ],
    processStages: [
      { step: '01', title: 'Scope Definition', desc: 'Assessing civil infrastructure, external works, or auxiliary requirements.' },
      { step: '02', title: 'Site Alignment & Grading', desc: 'Establishing drainage fall levels, boundary pegs, and invert levels.' },
      { step: '03', title: 'Sub-base Preparation', desc: 'Compaction, subgrade stabilization, and geotextile installation where required.' },
      { step: '04', title: 'Installation & Construction', desc: 'Executing paving, drainage casting, utility piping, or electrical infrastructure.' },
      { step: '05', title: 'Testing & Commissioning', desc: 'Testing drainage flow, water pressure, and electrical circuitry.' },
      { step: '06', title: 'Handover & Integration', desc: 'Final clean-up, integration with the main facility, and operational verification.' }
    ],
    faqs: [
      { q: 'Can I contract SPES solely for external paving, drainage, and boundary fencing?', a: 'Yes. We accept dedicated civil external works, drainage canalization, and perimeter infrastructure projects for residential estates, schools, and commercial facilities.' },
      { q: 'Do you handle stormwater drainage in flood-prone areas?', a: 'Yes. Our civil engineers calculate catchment storm runoff volumes and construct properly graded reinforced concrete channels to permanently eliminate flooding.' }
    ]
  }
];
