export const quizQuestions = [
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
    explanation: "APIPA (Automatic Private IP Addressing) is automatically assigned by Windows when a client cannot contact a DHCP server to receive a valid network lease."
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
    explanation: "exFAT supports large file sizes over 4GB and offers native read/write compatibility across Windows, macOS, and Linux systems."
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
    explanation: "`sfc /scannow` (System File Checker) inspects protected OS files and restores corrupted system files from the Windows DLL cache."
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
    explanation: "MBR is a legacy partition scheme restricted to 2TB max disk capacity and 4 primary partitions, whereas GPT supports 128 partitions and modern >2TB storage drives."
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
    explanation: "The 3-2-1 rule dictates keeping 3 copies of data, across 2 different media types, with 1 copy stored offsite to protect against physical disasters."
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
    explanation: "S.M.A.R.T (Self-Monitoring, Analysis and Reporting Technology) is embedded in storage drives (SSDs and HDDs) to detect imminent hardware failures."
  }
];
