/* =============================================================
   Site settings + the list of entries.
   To publish a new entry:
     1. Copy any file in /posts, rename it to <slug>.html (the site links
        to it without the .html, e.g. /posts/<slug>), set
        data-slug on its <body> and paste the article HTML into
        the <div class="prose" id="postBody"> block.
     2. Add one entry to POSTS below with the same slug.
   Home, Series, topic filters and related links update by themselves.
   ============================================================= */

window.SITE = {
  author: 'Fareedi Danish',
  initials: 'FD',
  linkedin: 'https://www.linkedin.com/in/danish-navarro-baloch-4a35253a2/',
  catalogUrl: 'https://labs.hol.vmware.com/HOL/catalog',
  catalogTarget: 60,           // Hands-on Labs you aim to finish in HOL LOG
  series: {                    // the two series: labs and study notes
    lab:   { name: 'HOL LOG',   page: 'series' },
    study: { name: 'STUDY LOG', page: 'study-log' }
  },
  topics: {                    // key used in "tags" → label and accent colour
    vcf:        { label: 'VCF',        color: '#a78bfa' },
    nsx:        { label: 'NSX',        color: '#22d3ee' },
    vsphere:    { label: 'vSphere',    color: '#3b82f6' },
    vdefend:    { label: 'vDefend',    color: '#fb7185' },
    avi:        { label: 'Avi',        color: '#f59e0b' },
    hcx:        { label: 'HCX',        color: '#34d399' },
    vsan:       { label: 'vSAN',       color: '#2dd4bf' },
    networking: { label: 'Networking', color: '#94a3b8' }
  }
};

/* type:      "lab" (HOL LOG: a Hands-on Lab, has a completion screenshot) or "study" (STUDY LOG)
   code:      official HOL lab code (e.g. HOL-26xx-xx-XXX). Leave '' to show "HOL LOG #NN".
   dateLabel: optional, for entries that span several days (e.g. '19–20 Oct 2026')
   status: "completed" or "in-progress" · date: YYYY-MM-DD · read: minutes · no: entry number within its own series */
window.POSTS = [
  /* ---------- November ---------- */
  { no: 9, type: 'lab', slug: 'building-resilient-networks-nsx', code: 'HOL-2704-02-VCF-L',
    title: 'Building Resilient Networks with VMware NSX',
    excerpt: 'Distributed and centralized transit gateways, a three-tier app on VPCs, and handing networking to tenants with projects, quotas and roles.',
    tags: ['nsx', 'vcf'], date: '2026-11-09', status: 'completed', read: 10 },

  { no: 20, type: 'study', slug: 'avi-se-groups-and-ha', code: '',
    title: 'Avi Refresher: Service Engine Groups and HA',
    excerpt: 'Going back through the Avi workshop: packet walks, Controller failures, Service Engine sizing and the SE group HA modes.',
    tags: ['avi'], date: '2026-11-07', status: 'completed', read: 2 },

  { no: 8, type: 'lab', slug: 'performance-benchmarking-monitoring-vcf-9-1', code: 'HOL-2704-04-VCF-L',
    title: 'Performance Benchmarking and Monitoring on VCF 9.1',
    excerpt: 'Reading cluster performance in VCF Operations, the real-time metrics view, the esxtop columns that matter and a first look at VMmark.',
    tags: ['vcf', 'vsphere'], date: '2026-11-04', status: 'completed', read: 4 },

  { no: 7, type: 'lab', slug: 'deep-dive-compute-vcf-9-1', code: 'HOL-2706-02-VCF-L',
    title: 'Deep Dive: Compute on VCF 9.1',
    excerpt: 'Licensing views and rightsizing in VCF Operations, cluster desired state and fixing drift, plus planning tools worth bookmarking.',
    tags: ['vcf', 'vsphere'], date: '2026-11-04', status: 'completed', read: 3 },

  { no: 6, type: 'lab', slug: 'memory-tiering-vcf-9-1-spotlight', code: 'HOL-2703-01-VCF-L',
    title: 'Memory Tiering in VCF 9.1: Spotlight',
    excerpt: 'A focused look at memory tiering: the NVMe tier, per-VM advanced parameters and enabling it again from the CLI.',
    tags: ['vsphere', 'vcf'], date: '2026-11-03', status: 'completed', read: 3 },

  { no: 5, type: 'lab', slug: 'whats-new-vsphere-compute-vcf-9-1', code: 'HOL-2706-01-VCF-L',
    title: "What's New in vSphere: Compute in VCF 9.1",
    excerpt: 'Memory tiering, cluster-level configuration management, vLCM images and live patching without full maintenance mode.',
    tags: ['vsphere', 'vcf'], date: '2026-11-03', status: 'completed', read: 3 },

  { no: 4, type: 'lab', slug: 'virtualization-101', code: 'HOL-2535-01-VCF-L',
    title: 'Virtualization 101',
    excerpt: 'A broad vSphere refresher: templates, tags, HA and DRS, alarms with actions, switches, lockdown mode, SSO and datastores.',
    tags: ['vsphere'], date: '2026-11-01', status: 'completed', read: 3 },

  /* ---------- October ---------- */
  { no: 3, type: 'lab', slug: 'vdefend-firewall-security-journey', code: 'HOL-2770-01-ANS-L',
    title: 'vDefend Firewall Security Journey: DFW 1-2-3-4',
    excerpt: 'Going from imported asset data to application ringfencing in four stages, inside the Security Services Platform UI.',
    tags: ['vdefend', 'nsx'], date: '2026-10-29', status: 'completed', read: 3 },

  { no: 2, type: 'lab', slug: 'vcf-9-1-cross-vpc-connectivity', code: 'HOL-2704-08-VCF-L',
    title: 'VCF 9.1 Advanced Networking and Cross VPC Connectivity',
    excerpt: 'Creating VPCs from vCenter and VCF Automation, adding private and public subnets, and attaching workloads to them.',
    tags: ['nsx', 'vcf'], date: '2026-10-29', status: 'completed', read: 3 },

  { no: 1, type: 'lab', slug: 'advanced-networking-vcf-9-1', code: 'HOL-2705-02-VCF-L',
    title: 'Advanced Networking in VMware Cloud Foundation 9.1',
    excerpt: 'Onboarding a second NSX Manager from the Global Manager, Tier-0 BGP with a route map, RTEPs on the edges and stretched segments.',
    tags: ['nsx', 'vcf'], date: '2026-10-29', status: 'completed', read: 3 },

  { no: 19, type: 'study', slug: 'intrinsic-security-ids-ips-malware', code: '',
    title: 'Intrinsic Security: IDS/IPS, Malware Prevention and NAPP',
    excerpt: 'Firewall best practices, network introspection, IDS/IPS architecture and how malware prevention handles known and unknown files.',
    tags: ['vdefend', 'nsx'], date: '2026-10-25', dateLabel: '25–27 Oct 2026', status: 'completed', read: 3 },

  { no: 18, type: 'study', slug: 'nsx-federation-and-firewall-day-2', code: '',
    title: 'NSX Federation and Firewall Day-2 Operations',
    excerpt: 'Global and Local Managers, how configuration syncs between them, Tier-0 options across locations and why RTEP behaves differently from TEP.',
    tags: ['nsx', 'vdefend'], date: '2026-10-23', dateLabel: '23–24 Oct 2026', status: 'completed', read: 3 },

  { no: 17, type: 'study', slug: 'vcenter-troubleshooting-and-vdefend-dfw', code: '',
    title: 'vCenter Troubleshooting and vDefend Firewall Basics',
    excerpt: 'A vMotion, HA and DRS refresher, then the building blocks of the Distributed Firewall: categories, context profiles and policy settings.',
    tags: ['vsphere', 'vdefend'], date: '2026-10-20', dateLabel: '20–21 Oct 2026', status: 'completed', read: 3 },

  { no: 16, type: 'study', slug: 'nsx-notes-rewrite', code: '',
    title: 'Rewriting My NSX Notes: Switching and Routing',
    excerpt: 'Turning messy notes into permanent ones: Geneve packet walks, controller tables, DR and SR, gateway interfaces and failover timers.',
    tags: ['nsx'], date: '2026-10-19', dateLabel: '19–20 Oct 2026', status: 'completed', read: 2 },

  { no: 15, type: 'study', slug: 'nsx-review-edges-and-transport', code: '',
    title: 'NSX Review: Edges, Transport Zones and TEPs',
    excerpt: 'Edge node and cluster options, transport zones, TEP pools and the NSX Manager cluster, revisited for the details I missed.',
    tags: ['nsx'], date: '2026-10-18', status: 'completed', read: 2 },

  { no: 14, type: 'study', slug: 'vcf-multi-az-stretched-clusters', code: '',
    title: 'VCF Multi-AZ Stretched Clusters',
    excerpt: 'Host counts, witness placement, latency and bandwidth for stretching VCF across two availability zones.',
    tags: ['vcf', 'vsan'], date: '2026-10-17', status: 'completed', read: 2 },

  { no: 13, type: 'study', slug: 'esx-host-preparation-troubleshooting', code: '',
    title: 'Troubleshooting ESX Host Preparation for NSX',
    excerpt: 'Common reasons host preparation fails, and why Force Remove is not the same as a clean host.',
    tags: ['nsx', 'vsphere'], date: '2026-10-16', status: 'completed', read: 2 },

  { no: 12, type: 'study', slug: 'hcx-service-mesh-and-network-extension', code: '',
    title: 'HCX Service Mesh, Network Extension and MON',
    excerpt: 'Network and compute profiles, building the service mesh, extending networks without changing VM IPs and Mobility Optimized Networking.',
    tags: ['hcx', 'nsx'], date: '2026-10-14', status: 'completed', read: 3 },

  { no: 11, type: 'study', slug: 'hcx-components-and-site-pairing', code: '',
    title: 'HCX Components and Site Pairing',
    excerpt: 'What HCX Cloud and Connector do, what each site needs, and how deployment and site pairing fit together.',
    tags: ['hcx'], date: '2026-10-11', status: 'completed', read: 2 },

  { no: 10, type: 'study', slug: 'vpc-packet-paths-troubleshooting', code: '',
    title: 'VPC Packet Paths and Troubleshooting',
    excerpt: 'Tracing east-west and north-south traffic in distributed and centralized VPC topologies, and a flowchart for when it breaks.',
    tags: ['nsx', 'vcf'], date: '2026-10-10', status: 'completed', read: 2 },

  { no: 9, type: 'study', slug: 'nsx-vpcs-and-transit-gateways', code: '',
    title: 'NSX VPCs and Transit Gateways',
    excerpt: 'Projects, VPC isolation, distributed versus centralized transit gateways and how each subnet type reaches the outside.',
    tags: ['nsx', 'vcf'], date: '2026-10-07', status: 'completed', read: 3 },

  { no: 8, type: 'study', slug: 'nsx-edge-services-vrf-nat-vpn', code: '',
    title: 'NSX Edge Services: VRF Lite, NAT, DNS, DHCP and VPN',
    excerpt: 'Which services run on edges, where to place NAT, and the design trade-offs between stateful services and ECMP.',
    tags: ['nsx'], date: '2026-10-06', status: 'completed', read: 3 },

  { no: 7, type: 'study', slug: 'nsx-routing-and-tunnel-troubleshooting', code: '',
    title: 'Troubleshooting NSX Routing and Tunnels',
    excerpt: 'Traceflow, routing tables and vmkping: finding out why a VM can reach its gateway but not the VM on the next host.',
    tags: ['nsx'], date: '2026-10-05', status: 'completed', read: 3 },

  { no: 6, type: 'study', slug: 'nsx-logical-routing-t0-t1', code: '',
    title: 'NSX Logical Routing: Tier-0, Tier-1 and ECMP',
    excerpt: 'How Tier-0 and Tier-1 gateways split the work, single versus multi-tier designs, and what NSX does with BGP, OSPF and ECMP.',
    tags: ['nsx'], date: '2026-10-04', status: 'completed', read: 2 },

  /* ---------- September ---------- */
  { no: 5, type: 'study', slug: 'fortigate-basics-and-nsx-manager-cluster', code: '',
    title: 'FortiGate Operations and NSX Manager Cluster Recovery',
    excerpt: 'Day-to-day firewall operations, a factory reset and first setup, then replacing a failed node in an NSX Manager cluster.',
    tags: ['networking', 'nsx'], date: '2026-09-28', status: 'completed', read: 2 },

  { no: 4, type: 'study', slug: 'avi-architecture-notes', code: '',
    title: 'Avi Architecture Notes',
    excerpt: 'Turning Avi workshop notes into a report: Controller versus Service Engines, headless mode, licensing and SE groups.',
    tags: ['avi'], date: '2026-09-25', status: 'completed', read: 2 },

  { no: 3, type: 'study', slug: 'avi-security-and-automation', code: '',
    title: 'Avi Load Balancer: Security, Automation and VCF Integration',
    excerpt: 'TLS and WAF, automating Avi through its REST API, upgrades, and how Avi plugs into VCF Operations and VCF Automation.',
    tags: ['avi', 'vcf'], date: '2026-09-24', status: 'completed', read: 2 },

  { no: 2, type: 'study', slug: 'nsx-manager-dns-and-t0-bgp-opnsense', code: '',
    title: 'NSX Manager DNS, VCF 9 Import Prep and Tier-0 BGP',
    excerpt: 'Getting NSX Manager into DNS, what importing a vSphere 8 environment into VCF 9 needs, and peering a Tier-0 with an OPNsense firewall.',
    tags: ['nsx', 'vcf'], date: '2026-09-14', status: 'completed', read: 2 },

  { no: 1, type: 'study', slug: 'high-availability-clusters', code: '',
    title: 'High Availability Clusters: Removing Single Points of Failure',
    excerpt: 'Standby versus load-sharing redundancy, building a two-device HA cluster and testing what happens when one side fails.',
    tags: ['networking'], date: '2026-09-13', status: 'completed', read: 2 }
];
