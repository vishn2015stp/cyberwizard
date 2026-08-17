export const fundamentalsCategories = [
  { id: 'hardware', label: 'Hardware Architecture', icon: 'Cpu' },
  { id: 'os', label: 'Operating Systems & Files', icon: 'HardDrive' },
  { id: 'networking', label: 'Networking Basics', icon: 'Globe' },
  { id: 'security', label: 'Maintenance & Security', icon: 'ShieldCheck' }
];

export const fundamentalsContent = {
  hardware: [
    {
      title: "CPU (Central Processing Unit)",
      subtitle: "The Brain of the Computer",
      summary: "Executes program instructions, performs arithmetic and logic calculations, and coordinates hardware operations.",
      icon: "Cpu",
      specs: [
        { label: "Cores & Threads", val: "Cores are physical processing units; threads allow simultaneous parallel processing." },
        { label: "Clock Speed", val: "Measured in GHz (Gigahertz), indicating billions of cycles executed per second." },
        { label: "Cache (L1, L2, L3)", val: "High-speed memory built into the CPU to reduce RAM access delays." }
      ],
      techTips: "When diagnosing thermal throttling, check CPU temps with HWiNFO. Clean old thermal paste and apply a pea-sized dot of quality compound (e.g. Arctic MX-4)."
    },
    {
      title: "RAM (Random Access Memory)",
      subtitle: "Volatile High-Speed System Memory",
      summary: "Temporarily holds active operating system files, running apps, and cache data for instant CPU access.",
      icon: "Server",
      specs: [
        { label: "DDR Generation", val: "DDR4 (2133-3600 MHz) vs DDR5 (4800-7200+ MHz). Not backward compatible." },
        { label: "Dual-Channel", val: "Using matching RAM sticks in pairs doubles memory bandwidth." },
        { label: "Latency (CL)", val: "Column Address Strobe latency — lower CL means faster memory response." }
      ],
      techTips: "If Windows crashes with random BSODs (MEMORY_MANAGEMENT), run MemTest86 or Windows Memory Diagnostic to detect faulty RAM modules."
    },
    {
      title: "Storage (SSD vs HDD vs NVMe)",
      subtitle: "Non-Volatile Data Storage",
      summary: "Stores operating systems, applications, and files permanently even when power is turned off.",
      icon: "HardDrive",
      specs: [
        { label: "NVMe M.2 SSD", val: "PCIe interface, speeds up to 7000+ MB/s. Best for OS boot drive." },
        { label: "SATA SSD", val: "2.5-inch or M.2 form factor, speeds around 550 MB/s. Great budget upgrade." },
        { label: "HDD (Mechanical)", val: "Spinning magnetic platters (5400/7200 RPM). High capacity, lower cost per GB." }
      ],
      techTips: "Check drive health using S.M.A.R.T. monitoring tools like CrystalDiskInfo. Look out for Reallocated Sector Count on mechanical HDDs."
    },
    {
      title: "Motherboard & Expansion",
      subtitle: "The Central Circuit Spine",
      summary: "Connects all computer components via buses, chipsets, power delivery VRMs, and expansion slots.",
      icon: "Layers",
      specs: [
        { label: "Form Factors", val: "ATX (Standard), Micro-ATX (Compact), Mini-ITX (Ultra-compact)." },
        { label: "Chipset", val: "Determines overclocking support, PCIe lane count, and USB connectivity." },
        { label: "BIOS / UEFI", val: "Low-level firmware that initializes hardware before booting the OS." }
      ],
      techTips: "If a system fails to POST (Power On Self Test), clear CMOS by shorting the CLRTC pins or removing the CR2032 coin battery for 5 minutes."
    }
  ],

  os: [
    {
      title: "Windows vs Linux File Systems",
      subtitle: "Storage Formats & Partition Structures",
      summary: "Understand how OS platforms structure partitions, access permissions, and store file metadata.",
      icon: "FolderTree",
      specs: [
        { label: "NTFS (Windows)", val: "Supports journal logging, file permissions (ACLs), compression, & large files up to 8PB." },
        { label: "FAT32 / exFAT", val: "FAT32 limit 4GB per file. exFAT is universal cross-platform for USB flash drives." },
        { label: "ext4 / Btrfs (Linux)", val: "Native Linux filesystems featuring journaling, snapshots, and high stability." }
      ],
      techTips: "Use Rufus to format flash drives to exFAT for universal compatibility across Windows, Mac, and Linux maintenance machines."
    },
    {
      title: "Boot Process: MBR vs GPT & UEFI",
      subtitle: "How Computers Initialize & Boot OS",
      summary: "Master the fundamental differences between legacy BIOS/MBR and modern UEFI/GPT boot modes.",
      icon: "Power",
      specs: [
        { label: "MBR (Master Boot Record)", val: "Legacy partition scheme. Max 4 primary partitions, max drive size 2TB." },
        { label: "GPT (GUID Partition Table)", val: "Modern standard. Supports 128 primary partitions, drives over 2TB, & Secure Boot." },
        { label: "UEFI Mode", val: "Replaces legacy BIOS with graphical interface, faster initialization, & hardware encryption." }
      ],
      techTips: "Convert legacy MBR disks to GPT in Windows without data loss using the `mbr2gpt /convert /allowFullOS` CLI tool."
    }
  ],

  networking: [
    {
      title: "IP Addressing & Subnetting",
      subtitle: "IPv4, IPv6, & Subnet Masks",
      summary: "Unique numerical labels assigned to devices on a computer network for identification and routing.",
      icon: "Globe",
      specs: [
        { label: "IPv4 Structure", val: "32-bit address split into 4 octets (e.g., 192.168.1.100)." },
        { label: "Private IP Ranges", val: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (Non-routable over public internet)." },
        { label: "Subnet Mask", val: "Separates Network ID from Host ID (e.g. 255.255.255.0 = /24 mask)." }
      ],
      techTips: "APIPA IP range (169.254.x.x) indicates the client failed to reach a DHCP server. Check network cabling or DHCP server service."
    },
    {
      title: "DNS, DHCP, & Gateway",
      subtitle: "Core Network Infrastructure Services",
      summary: "Automated services that handle IP distribution, domain name translation, and internet routing.",
      icon: "Network",
      specs: [
        { label: "DHCP", val: "Dynamic Host Configuration Protocol automatically assigns IP, Subnet, & Gateway to clients." },
        { label: "DNS", val: "Domain Name System resolves domain names (e.g. google.com) into IP addresses (142.250.x.x)." },
        { label: "Default Gateway", val: "The router interface address that forwards local traffic outside the local network." }
      ],
      techTips: "Flush DNS cache on Windows when websites fail to load: `ipconfig /flushdns`."
    }
  ],

  security: [
    {
      title: "System Maintenance & Backup Strategy",
      subtitle: "The 3-2-1 Backup Rule",
      summary: "Best practice protocol for preventing data loss from hardware failure, ransomware, or user error.",
      icon: "ShieldAlert",
      specs: [
        { label: "3 Copies of Data", val: "Keep 1 primary operational data set and 2 backup copies." },
        { label: "2 Different Media", val: "Store backups across different storage types (e.g. NVMe SSD + External HDD / NAS)." },
        { label: "1 Offsite Backup", val: "Maintain 1 copy offsite in encrypted cloud storage (Backblaze, OneDrive, Google Drive)." }
      ],
      techTips: "Create a system restore point or system image backup using Macrium Reflect before executing major driver updates or registry tweaks."
    }
  ]
};
