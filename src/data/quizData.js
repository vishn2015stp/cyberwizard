export const fallbackQuizQuestions = [
  {
    id: 1,
    question: "What does an IP address starting with 169.254.x.x (APIPA) signify on a Windows client?",
    options: [
      "The computer has successfully connected to the VPN gateway.",
      "The client failed to receive an IP address from the DHCP server.",
      "The computer is assigned a static public internet IP.",
      "The network interface card is operated in promiscuous mode."
    ],
    correctAnswer: 1,
    explanation: "APIPA (Automatic Private IP Addressing) is automatically assigned by Windows when a client cannot contact a DHCP server to receive a valid network lease.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 2,
    question: "Which file system format is ideal for a USB flash drive that needs to transfer files >4GB across Windows, macOS, and Linux?",
    options: [
      "FAT32",
      "NTFS",
      "exFAT",
      "ext4"
    ],
    correctAnswer: 2,
    explanation: "exFAT supports large file sizes over 4GB and offers native read/write compatibility across Windows, macOS, and Linux systems.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 3,
    question: "Which Windows CLI command scans all protected system files and replaces corrupted files with cached copies?",
    options: [
      "chkdsk C: /f",
      "sfc /scannow",
      "ipconfig /renew",
      "diskpart"
    ],
    correctAnswer: 1,
    explanation: "`sfc /scannow` (System File Checker) inspects protected OS files and restores corrupted system files from the Windows DLL cache.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 4,
    question: "What is the primary difference between MBR and GPT partition tables?",
    options: [
      "MBR supports up to 128 primary partitions, while GPT only supports 4.",
      "GPT requires legacy BIOS mode and cannot boot Windows 11.",
      "MBR is limited to 2TB disk size and 4 primary partitions; GPT supports drives >2TB & 128 partitions.",
      "GPT does not support UEFI booting."
    ],
    correctAnswer: 2,
    explanation: "MBR is a legacy partition scheme restricted to 2TB max disk capacity and 4 primary partitions, whereas GPT supports 128 partitions and modern >2TB storage drives.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 5,
    question: "In the 3-2-1 backup rule, what does the '1' stand for?",
    options: [
      "Keep 1 primary copy of your operating system.",
      "Perform backups once every 1 month.",
      "Maintain at least 1 backup offsite (e.g. cloud storage or remote location).",
      "Use only 1 password for all backup archives."
    ],
    correctAnswer: 2,
    explanation: "The 3-2-1 rule dictates keeping 3 copies of data, across 2 different media types, with 1 copy stored offsite to protect against physical disasters.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 6,
    question: "What hardware component is responsible for handling S.M.A.R.T telemetry monitoring?",
    options: [
      "RAM sticks",
      "SSD / HDD Storage Drives",
      "Power Supply Unit (PSU)",
      "Network Interface Card (NIC)"
    ],
    correctAnswer: 1,
    explanation: "S.M.A.R.T (Self-Monitoring, Analysis and Reporting Technology) is embedded in storage drives (SSDs and HDDs) to detect imminent hardware failures.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 7,
    question: "Which OSI layer is responsible for IP routing and logical packet addressing?",
    options: [
      "Layer 2 - Data Link Layer",
      "Layer 3 - Network Layer",
      "Layer 4 - Transport Layer",
      "Layer 7 - Application Layer"
    ],
    correctAnswer: 1,
    explanation: "Layer 3 (Network Layer) manages IP addressing, logical routing, and packet forwarding across network routers.",
    source: 'Cyber Wizard IT Bank'
  },
  {
    id: 8,
    question: "What port number does secure HTTPS protocol use by default?",
    options: [
      "Port 80",
      "Port 22",
      "Port 443",
      "Port 3389"
    ],
    correctAnswer: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) operates on TCP Port 443 with TLS/SSL encryption. Standard HTTP uses Port 80.",
    source: 'Cyber Wizard IT Bank'
  }
];

export function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
