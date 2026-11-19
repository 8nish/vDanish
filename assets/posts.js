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
  { no: 16, type: 'lab', slug: 'migrate-to-avi-with-avi-conversion-tool', code: 'HOL-2740-05-ANS-L',
    title: 'Migrate to VMware Avi Load Balancer using the Avi Conversion Tool',
    excerpt: 'Moving an F5 BIG-IP config and its iRules into Avi with the Avi Conversion Tool, and a version mismatch on the way: the controller runs 32.1.1, not 31.1.1.',
    tags: ['avi', 'vcf'], date: '2026-11-20', status: 'in-progress', read: 4 },

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

  { type: 'blog', slug: 'avi-se-groups-and-ha',
    title: 'Avi Refresher: Service Engine Groups and HA',
    excerpt: 'Going back through the Avi workshop: packet walks, Controller failures, Service Engine sizing and the SE group HA modes.',
    tags: ['avi'], date: '2026-11-07', read: 2 },

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
    tags: ['vsphere'], date: '2026-11-01', status: 'completed', read: 3 },

  /* ---------- October ---------- */
  { type: 'blog', slug: 'intrinsic-security-ids-ips-malware',
    title: 'Intrinsic Security: IDS/IPS, Malware Prevention and NAPP',
    excerpt: 'Firewall best practices, network introspection, IDS/IPS architecture and how malware prevention handles known and unknown files.',
    tags: ['vdefend', 'nsx'], date: '2026-10-25', dateLabel: '25–27 Oct 2026', read: 3 },

  { type: 'blog', slug: 'nsx-federation-and-firewall-day-2',
    title: 'NSX Federation and Firewall Day-2 Operations',
    excerpt: 'Global and Local Managers, how configuration syncs between them, Tier-0 options across locations and why RTEP behaves differently from TEP.',
    tags: ['nsx', 'vdefend'], date: '2026-10-23', dateLabel: '23–24 Oct 2026', read: 3 },

  { type: 'blog', slug: 'vcenter-troubleshooting-and-vdefend-dfw',
    title: 'vCenter Troubleshooting and vDefend Firewall Basics',
    excerpt: 'A vMotion, HA and DRS refresher, then the building blocks of the Distributed Firewall: categories, context profiles and policy settings.',
    tags: ['vsphere', 'vdefend'], date: '2026-10-20', dateLabel: '20–21 Oct 2026', read: 3 },

  { type: 'blog', slug: 'nsx-notes-rewrite',
    title: 'Rewriting My NSX Notes: Switching and Routing',
    excerpt: 'Turning messy notes into permanent ones: Geneve packet walks, controller tables, DR and SR, gateway interfaces and failover timers.',
    tags: ['nsx'], date: '2026-10-19', dateLabel: '19–20 Oct 2026', read: 2 },

  { type: 'blog', slug: 'nsx-review-edges-and-transport',
    title: 'NSX Review: Edges, Transport Zones and TEPs',
    excerpt: 'Edge node and cluster options, transport zones, TEP pools and the NSX Manager cluster, revisited for the details I missed.',
    tags: ['nsx'], date: '2026-10-18', read: 2 },

  { type: 'blog', slug: 'vcf-multi-az-stretched-clusters',
    title: 'VCF Multi-AZ Stretched Clusters',
    excerpt: 'Host counts, witness placement, latency and bandwidth for stretching VCF across two availability zones.',
    tags: ['vcf', 'vsan'], date: '2026-10-17', read: 2 },

  { type: 'blog', slug: 'esx-host-preparation-troubleshooting',
    title: 'Troubleshooting ESX Host Preparation for NSX',
    excerpt: 'Common reasons host preparation fails, and why Force Remove is not the same as a clean host.',
    tags: ['nsx', 'vsphere'], date: '2026-10-16', read: 2 },

  { type: 'blog', slug: 'hcx-service-mesh-and-network-extension',
    title: 'HCX Service Mesh, Network Extension and MON',
    excerpt: 'Network and compute profiles, building the service mesh, extending networks without changing VM IPs and Mobility Optimized Networking.',
    tags: ['hcx', 'nsx'], date: '2026-10-14', read: 3 },

  { type: 'blog', slug: 'hcx-components-and-site-pairing',
    title: 'HCX Components and Site Pairing',
    excerpt: 'What HCX Cloud and Connector do, what each site needs, and how deployment and site pairing fit together.',
    tags: ['hcx'], date: '2026-10-11', read: 2 },

  { type: 'blog', slug: 'vpc-packet-paths-troubleshooting',
    title: 'VPC Packet Paths and Troubleshooting',
    excerpt: 'Tracing east-west and north-south traffic in distributed and centralized VPC topologies, and a flowchart for when it breaks.',
    tags: ['nsx', 'vcf'], date: '2026-10-10', read: 2 },

  { type: 'blog', slug: 'nsx-vpcs-and-transit-gateways',
    title: 'NSX VPCs and Transit Gateways',
    excerpt: 'Projects, VPC isolation, distributed versus centralized transit gateways and how each subnet type reaches the outside.',
    tags: ['nsx', 'vcf'], date: '2026-10-07', read: 3 },

  { type: 'blog', slug: 'nsx-edge-services-vrf-nat-vpn',
    title: 'NSX Edge Services: VRF Lite, NAT, DNS, DHCP and VPN',
    excerpt: 'Which services run on edges, where to place NAT, and the design trade-offs between stateful services and ECMP.',
    tags: ['nsx'], date: '2026-10-06', read: 3 },

  { type: 'blog', slug: 'nsx-routing-and-tunnel-troubleshooting',
    title: 'Troubleshooting NSX Routing and Tunnels',
    excerpt: 'Traceflow, routing tables and vmkping: finding out why a VM can reach its gateway but not the VM on the next host.',
    tags: ['nsx'], date: '2026-10-05', read: 3 },

  { type: 'blog', slug: 'nsx-logical-routing-t0-t1',
    title: 'NSX Logical Routing: Tier-0, Tier-1 and ECMP',
    excerpt: 'How Tier-0 and Tier-1 gateways split the work, single versus multi-tier designs, and what NSX does with BGP, OSPF and ECMP.',
    tags: ['nsx'], date: '2026-10-04', read: 2 },

  /* ---------- September ---------- */
  { type: 'blog', slug: 'fortigate-basics-and-nsx-manager-cluster',
    title: 'FortiGate Operations and NSX Manager Cluster Recovery',
    excerpt: 'Day-to-day firewall operations, a factory reset and first setup, then replacing a failed node in an NSX Manager cluster.',
    tags: ['networking', 'nsx'], date: '2026-09-28', read: 2 },

  { type: 'blog', slug: 'avi-architecture-notes',
    title: 'Avi Architecture Notes',
    excerpt: 'Turning Avi workshop notes into a report: Controller versus Service Engines, headless mode, licensing and SE groups.',
    tags: ['avi'], date: '2026-09-25', read: 2 },

  { type: 'blog', slug: 'avi-security-and-automation',
    title: 'Avi Load Balancer: Security, Automation and VCF Integration',
    excerpt: 'TLS and WAF, automating Avi through its REST API, upgrades, and how Avi plugs into VCF Operations and VCF Automation.',
    tags: ['avi', 'vcf'], date: '2026-09-24', read: 2 },

  { type: 'blog', slug: 'nsx-manager-dns-and-t0-bgp-opnsense',
    title: 'NSX Manager DNS, VCF 9 Import Prep and Tier-0 BGP',
    excerpt: 'Getting NSX Manager into DNS, what importing a vSphere 8 environment into VCF 9 needs, and peering a Tier-0 with an OPNsense firewall.',
    tags: ['nsx', 'vcf'], date: '2026-09-14', read: 2 },

  { type: 'blog', slug: 'high-availability-clusters',
    title: 'High Availability Clusters: Removing Single Points of Failure',
    excerpt: 'Standby versus load-sharing redundancy, building a two-device HA cluster and testing what happens when one side fails.',
    tags: ['networking'], date: '2026-09-13', read: 2 }
];
