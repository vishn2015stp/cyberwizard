export const commandCategories = [
  { id: 'all', label: 'All Commands' },
  { id: 'network', label: 'Networking & IP' },
  { id: 'system', label: 'System Diagnostics & Repairs' },
  { id: 'disk', label: 'Disk & File Management' },
  { id: 'security', label: 'Processes & Security' }
];

export const commandsList = [
  {
    id: 'cmd-1',
    command: 'ipconfig /all',
    os: 'Windows',
    category: 'network',
    title: 'Detailed Network Adapter Specs',
    description: 'Displays full IP address, Subnet Mask, Default Gateway, DNS Servers, MAC (Physical) address, and DHCP status.',
    example: 'ipconfig /all'
  },
  {
    id: 'cmd-2',
    command: 'ipconfig /flushdns',
    os: 'Windows',
    category: 'network',
    title: 'Purge DNS Resolver Cache',
    description: 'Clears invalid or outdated DNS cache entries to fix domain resolution failures and connection timeouts.',
    example: 'ipconfig /flushdns'
  },
  {
    id: 'cmd-3',
    command: 'ping 8.8.8.8 -t',
    os: 'Windows / Linux',
    category: 'network',
    title: 'Continuous ICMP Reachability Test',
    description: 'Sends continuous ICMP echo packets to test internet latency, packet loss, and link stability.',
    example: 'ping 8.8.8.8 -t'
  },
  {
    id: 'cmd-4',
    command: 'sfc /scannow',
    os: 'Windows',
    category: 'system',
    title: 'System File Checker Repair',
    description: 'Scans all protected system files and replaces corrupted, missing, or altered files with cached Windows copies.',
    example: 'sfc /scannow'
  },
  {
    id: 'cmd-5',
    command: 'DISM /Online /Cleanup-Image /RestoreHealth',
    os: 'Windows',
    category: 'system',
    title: 'DISM Component Store Repair',
    description: 'Repairs the underlying Windows component store image using Windows Update source files when SFC fails.',
    example: 'DISM /Online /Cleanup-Image /RestoreHealth'
  },
  {
    id: 'cmd-6',
    command: 'chkdsk C: /f /r',
    os: 'Windows',
    category: 'disk',
    title: 'Check Disk Bad Sector & File System Repair',
    description: 'Fixes filesystem errors (/f) and locates bad sectors (/r) to recover readable data on specified drive.',
    example: 'chkdsk C: /f /r'
  },
  {
    id: 'cmd-7',
    command: 'netstat -ano | findstr :80',
    os: 'Windows',
    category: 'security',
    title: 'View Active Ports & Process IDs',
    description: 'Displays all active TCP/UDP ports, listening connections, and associated Process IDs (PID).',
    example: 'netstat -ano | findstr :80'
  },
  {
    id: 'cmd-8',
    command: 'taskkill /PID <PID_NUM> /F',
    os: 'Windows',
    category: 'security',
    title: 'Force Terminate Unresponsive Process',
    description: 'Forces immediate closure of a frozen or problematic background process using its Process ID.',
    example: 'taskkill /PID 4512 /F'
  },
  {
    id: 'cmd-9',
    command: 'tracert google.com',
    os: 'Windows',
    category: 'network',
    title: 'Trace Packet Routing Hops',
    description: 'Determines the path packets take to reach a destination host, highlighting routing delay or drops.',
    example: 'tracert google.com'
  },
  {
    id: 'cmd-10',
    command: 'sudo systemctl status apache2',
    os: 'Linux',
    category: 'system',
    title: 'Check Linux System Daemon Status',
    description: 'Queries status, operational uptime, and recent error logs for specified system service.',
    example: 'sudo systemctl status apache2'
  },
  {
    id: 'cmd-11',
    command: 'lsblk -f',
    os: 'Linux',
    category: 'disk',
    title: 'List Block Devices & Mount Points',
    description: 'Lists all connected storage disks, partitions, filesystem types (ext4, fat32), and current mount points.',
    example: 'lsblk -f'
  },
  {
    id: 'cmd-12',
    command: 'htop',
    os: 'Linux',
    category: 'security',
    title: 'Interactive Process & Resource Monitor',
    description: 'Color-coded terminal task manager displaying CPU core loads, memory usage, swap, and thread tree.',
    example: 'htop'
  }
];
