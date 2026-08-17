export const diagnosticSymptoms = [
  {
    id: 'no-display',
    title: 'PC Powers On, But No Display / Black Screen',
    category: 'Hardware',
    icon: 'MonitorOff',
    summary: 'Fans spin and LEDs light up, but monitor receives no signal or remains in standby mode.',
    steps: [
      {
        step: 1,
        title: "Check Video Cable & Input Source",
        action: "Ensure DisplayPort/HDMI cable is securely connected directly to GPU (not motherboard integrated port if dedicated GPU installed). Confirm monitor input is manually set to DP/HDMI."
      },
      {
        step: 2,
        title: "RAM Reseating & Single-Stick Test",
        action: "Power down, unplug PSU. Remove RAM sticks, clean gold contacts with soft eraser or microfiber cloth. Insert 1 stick into slot 2 (A2) and attempt boot."
      },
      {
        step: 3,
        title: "Reset Motherboard CMOS",
        action: "Disconnect power cord. Remove CR2032 coin battery on motherboard for 5 minutes or short CLRTC jumper pins for 10 seconds to restore factory BIOS defaults."
      },
      {
        step: 4,
        title: "Inspect Motherboard EZ Debug LEDs",
        action: "Observe CPU, DRAM, VGA, BOOT LEDs on motherboard. If DRAM or VGA light stays solid, inspect RAM seat or GPU PCIe power cables."
      }
    ],
    recommendedTools: ['cpuz', 'hwinfo']
  },
  {
    id: 'bsod',
    title: 'Blue Screen of Death (BSOD) / Random System Crashes',
    category: 'OS & Memory',
    icon: 'AlertTriangle',
    summary: 'Windows crashes with stop code errors (e.g. IRQL_NOT_LESS_OR_EQUAL, MEMORY_MANAGEMENT, KERNEL_DATA_INPAGE_ERROR).',
    steps: [
      {
        step: 1,
        title: "Note Down the BSOD Stop Code",
        action: "Identify the stop code listed at the bottom of the blue screen or check Windows Event Viewer (System log -> Filter by Event ID 41 / BugCheck)."
      },
      {
        step: 2,
        title: "Run System Integrity Repair",
        action: "Open CMD as Administrator and run `sfc /scannow` followed by `DISM /Online /Cleanup-Image /RestoreHealth` to fix corrupt system binaries."
      },
      {
        step: 3,
        title: "Test Memory (RAM) Integrity",
        action: "Run Windows Memory Diagnostic (`mdsched.exe`) or boot MemTest86 from a USB flash drive to detect hardware memory errors."
      },
      {
        step: 4,
        title: "Inspect SSD/HDD Health Status",
        action: "Run CrystalDiskInfo to inspect S.M.A.R.T attributes for bad sectors, CRC error counts, or overheating drives."
      }
    ],
    recommendedTools: ['crystaldiskinfo', 'hwinfo', 'rufus']
  },
  {
    id: 'overheating',
    title: 'PC Overheating / CPU Throttling / Loud Fans',
    category: 'Thermals & Cooling',
    icon: 'Flame',
    summary: 'System shuts down unexpectedly under load, CPU temps exceed 90°C, or fans spin continuously at 100% maximum RPM.',
    steps: [
      {
        step: 1,
        title: "Check CPU Temps in HWiNFO",
        action: "Launch HWiNFO64 sensor panel. Monitor idle and load temperatures. Idle should be 35-50°C, load should not exceed 85-90°C."
      },
      {
        step: 2,
        title: "Clean Dust & Inspect Fans",
        action: "Use compressed air or electric duster to clean CPU heatsink fins, radiator, case filters, and fan blades."
      },
      {
        step: 3,
        title: "Repaste CPU Thermal Compound",
        action: "Remove CPU cooler, wipe old thermal paste using 99% Isopropyl alcohol, apply new pea-sized thermal compound, re-torque cooler evenly."
      },
      {
        step: 4,
        title: "Verify AIO Pump Operation (If Liquid Cooled)",
        action: "Feel both AIO tubes while PC is running. If one tube is scorching hot and the other cold, the pump impeller has failed or air-locked."
      }
    ],
    recommendedTools: ['hwinfo', 'cpuz']
  },
  {
    id: 'no-internet',
    title: 'Connected to WiFi/Ethernet But No Internet Access',
    category: 'Networking',
    icon: 'WifiOff',
    summary: 'Yellow exclamation icon on network tray, web pages fail to load with DNS_PROBE_FINISHED_NXDOMAIN or Connection Timed Out.',
    steps: [
      {
        step: 1,
        title: "Flush DNS & Reset IP Stack",
        action: "Run elevated CMD: `ipconfig /flushdns` -> `netsh winsock reset` -> `netsh int ip reset`. Restart computer."
      },
      {
        step: 2,
        title: "Check APIPA Auto-IP Assignment",
        action: "Run `ipconfig`. If IPv4 address begins with 169.254.x.x, device failed to acquire IP from DHCP router. Restart router/modem."
      },
      {
        step: 3,
        title: "Test Public IP Ping",
        action: "Run `ping 8.8.8.8`. If ping succeeds but websites don't open, issue is DNS server. Change DNS to 1.1.1.1 or 8.8.8.8."
      }
    ],
    recommendedTools: ['wireshark', 'putty']
  }
];
