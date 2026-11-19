/* =============================================================
   Site settings + the list of entries.
   To publish a new entry:
     1. Copy any file in /posts, rename it to <slug>.html (the site links
        to it without the .html, e.g. /posts/<slug>), set
        data-slug on its <body> and paste the article HTML into
        the <div class="prose" id="postBody"> block.
     2. Add one entry to POSTS below with the same slug.
   Home, Series, Blog, topic filters and related links update by themselves.
   ============================================================= */

window.SITE = {
  author: 'Fareedi Danish',
  initials: 'FD',
  linkedin: 'https://www.linkedin.com/in/danish-navarro-baloch-4a35253a2/',
  catalogUrl: 'https://labs.hol.vmware.com/HOL/catalog',
  catalogTarget: 60,           // Hands-on Labs you aim to finish in HOL LOG
  series: {                    // the one series: Hands-on Labs
    lab: { name: 'HOL LOG', page: 'series' }
  },
  blog: { name: 'Blog', page: 'blog' },   // articles that are not part of any series
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

/* type:      "lab" (HOL LOG: a Hands-on Lab, has a completion screenshot) or "blog" (a Blog article, not in any series)
   code:      official HOL lab code (e.g. HOL-26xx-xx-XXX). Leave '' to show "HOL LOG #NN".
   dateLabel: optional, for entries that span several days (e.g. '19–20 Oct 2026')
   date: YYYY-MM-DD · read: minutes
   labs only: no (HOL LOG entry number) · status: "completed" or "in-progress" */
window.POSTS = [
  /* ---------- November ---------- */
  { type: 'blog', slug: 'migrate-to-avi-with-avi-conversion-tool',
    title: 'Fixing the Staging Controller Version Error in the Avi Conversion Tool Lab',
    excerpt: 'If the F5 migration in HOL-2740-05-ANS-L fails with this error and no iRules show up, enter 32.1.1 as the controller version, not 31.1.1.',
    tags: ['avi'], date: '2026-11-20', read: 2 },

  { no: 15, type: 'lab', slug: 'application-resiliency-with-avi-gslb', code: 'HOL-2740-04-ANS-L',
    title: 'Application Resiliency with Avi Global Server Load Balancing',
    excerpt: 'Avi GSLB across two sites: a DNS virtual service in each region, a leader and a follower site, then a basic, an advanced and a geo-aware global service.',
    tags: ['avi', 'vcf'], date: '2026-11-19', status: 'completed', read: 8 },

  { no: 14, type: 'lab', slug: 'getting-started-with-avi-for-vcf', code: 'HOL-2740-02-ANS-L',
    title: 'Getting Started with Avi for VCF',
    excerpt: 'Avi Load Balancer in VCF 9.1: the controller, Service Engines and SE groups, then a Layer 4 and a Layer 7 load balancer deployed from VCF Automation.',
    tags: ['avi', 'vcf'], date: '2026-11-18', status: 'completed', read: 8 },

  { no: 13, type: 'lab', slug: 'vdefend-firewall-technology-deep-dive', code: 'HOL-2770-05-ANS-L',
    title: 'VMware vDefend Firewall Technology Deep Dive',
    excerpt: 'Locking down a 3-tier app with the distributed firewall, a Layer 7 rule for MySQL, GeoIP blocking on the gateway firewall, rule analysis and the AI Assistant for Firewall.',
    tags: ['vdefend', 'nsx'], date: '2026-11-17', status: 'completed', read: 7 },

  { no: 12, type: 'lab', slug: 'vdefend-firewall-advanced-threat-prevention', code: 'HOL-2770-02-ANS-L',
    title: 'VMware vDefend Firewall with Advanced Threat Prevention',
    excerpt: 'Turning on IDS/IPS in NSX, going from detect to prevent, virtual patching a CVE, then Network Traffic Analysis and an NDR campaign in the Security Services Platform.',
    tags: ['vdefend', 'nsx'], date: '2026-11-16', status: 'completed', read: 6 },

  { no: 11, type: 'lab', slug: 'vdefend-firewall-security-journey', code: 'HOL-2770-01-ANS-L',
    title: 'vDefend Firewall Security Journey: DFW 1-2-3-4',
    excerpt: 'Importing assets into the Security Services Platform, scoring the datacenter, then locking down shared services, environments and one app with ringfencing.',
    tags: ['vdefend', 'nsx'], date: '2026-11-15', status: 'completed', read: 8 },

  { no: 10, type: 'lab', slug: 'secure-vcf-infrastructure-vdefend-firewall', code: 'HOL-2770-03-ANS-L',
    title: 'Secure VCF Infrastructure with VMware vDefend Firewall',
    excerpt: 'Locking down the VCF management domain with the DFW: clearing the exclusion list and enabling the Infrastructure, Environment and Application rules.',
    tags: ['vdefend', 'nsx'], date: '2026-11-12', status: 'completed', read: 4 },

  { no: 9, type: 'lab', slug: 'vsan-9-1-getting-started-advanced-topics', code: 'HOL-2734-01-VCF-L',
    title: 'VMware vSAN 9.1: Getting Started and Advanced Topics',
    excerpt: 'A networking person learning vSAN: Auto-RAID, scaling an ESA cluster, health and capacity, encryption, stretched and storage clusters, file services and data protection.',
    tags: ['vsan', 'vcf'], date: '2026-11-11', status: 'completed', read: 8 },

  { no: 8, type: 'lab', slug: 'advanced-networking-vcf-9-1', code: 'HOL-2705-02-VCF-L',
    title: 'Advanced Networking in VMware Cloud Foundation 9.1',
    excerpt: 'Onboarding Frankfurt into NSX Federation, RTEPs, a stretched Tier-0 with BGP and an AS path prepend, and stretched segments for a two-tier app.',
    tags: ['nsx', 'vcf'], date: '2026-11-10', status: 'completed', read: 6 },

  { no: 7, type: 'lab', slug: 'vcf-9-1-advanced-networking-cross-vpc', code: 'HOL-2704-08-VCF-L',
    title: 'VMware Cloud Foundation 9.1: Advanced Networking and Cross VPC Connectivity',
    excerpt: 'VPC networking without NSX Edge nodes: VNA clusters, automatic SNAT, VPCs from vCenter and VCF Automation, and controlling which VPCs can talk.',
    tags: ['nsx', 'vcf'], date: '2026-11-10', status: 'completed', read: 9 },

  { no: 6, type: 'lab', slug: 'building-resilient-networks-nsx', code: 'HOL-2704-02-VCF-L',
    title: 'Building Resilient Networks with VMware NSX',
    excerpt: 'Distributed and centralized transit gateways, a three-tier app on VPCs, and handing networking to tenants with projects, quotas and roles.',
    tags: ['nsx', 'vcf'], date: '2026-11-09', status: 'completed', read: 10 },

  { no: 5, type: 'lab', slug: 'performance-benchmarking-monitoring-vcf-9-1', code: 'HOL-2704-04-VCF-L',
    title: 'Performance Benchmarking and Monitoring on VCF 9.1',
    excerpt: 'Reading cluster performance in VCF Operations, the real-time metrics view, the esxtop columns that matter and a first look at VMmark.',
    tags: ['vcf', 'vsphere'], date: '2026-11-04', status: 'completed', read: 4 },

  { no: 4, type: 'lab', slug: 'deep-dive-compute-vcf-9-1', code: 'HOL-2706-02-VCF-L',
    title: 'Deep Dive: Compute on VCF 9.1',
    excerpt: 'Licensing views and rightsizing in VCF Operations, cluster desired state and fixing drift, plus planning tools worth bookmarking.',
    tags: ['vcf', 'vsphere'], date: '2026-11-04', status: 'completed', read: 3 },

  { no: 3, type: 'lab', slug: 'memory-tiering-vcf-9-1-spotlight', code: 'HOL-2703-01-VCF-L',
    title: 'Memory Tiering in VCF 9.1: Spotlight',
    excerpt: 'A focused look at memory tiering: the NVMe tier, per-VM advanced parameters and enabling it again from the CLI.',
    tags: ['vsphere', 'vcf'], date: '2026-11-03', status: 'completed', read: 3 },

  { no: 2, type: 'lab', slug: 'whats-new-vsphere-compute-vcf-9-1', code: 'HOL-2706-01-VCF-L',
    title: "What's New in vSphere: Compute in VCF 9.1",
    excerpt: 'Memory tiering, cluster-level configuration management, vLCM images and live patching without full maintenance mode.',
    tags: ['vsphere', 'vcf'], date: '2026-11-03', status: 'completed', read: 3 },

  { no: 1, type: 'lab', slug: 'virtualization-101', code: 'HOL-2535-01-VCF-L',
    title: 'Virtualization 101',
    excerpt: 'A broad vSphere refresher: templates, tags, HA and DRS, alarms with actions, switches, lockdown mode, SSO and datastores.',
    tags: ['vsphere'], date: '2026-11-01', status: 'completed', read: 3 }
];
