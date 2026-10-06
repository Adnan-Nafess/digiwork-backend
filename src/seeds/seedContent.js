const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const connectDB = require("../config/db");

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

const text = (value) => ({
  type: "text",
  text: value,
});

const paragraph = (value) => ({
  type: "paragraph",
  content: [text(value)],
});

const heading = (value, level = 2) => ({
  type: "heading",
  attrs: { level },
  content: [text(value)],
});

const bulletList = (items) => ({
  type: "bulletList",
  content: items.map((item) => ({
    type: "listItem",
    content: [
      {
        type: "paragraph",
        content: [text(item)],
      },
    ],
  })),
});

const richContent = (nodes) => ({
  type: "doc",
  content: nodes,
});

const categoryContent = [
  {
    slug: "accounts-subscriptions",

    description:
      "Understand online accounts, sign-in methods, subscription plans, renewals, cancellations, and how to keep access under control.",

    content: richContent([
      paragraph(
        "Almost every modern service begins with an account. Before a file is synced, a show is streamed, a payment is processed, or a message is delivered, some system has to recognize who you are and what you are allowed to do. Accounts are the foundation that everything else is built on.",
      ),

      paragraph(
        "Subscriptions sit directly on top of that foundation. They determine which features are available, how long access continues, what happens when a payment fails, and what is lost when a plan ends. Understanding both together makes digital life far easier to manage.",
      ),

      heading('What "Accounts & Subscriptions" Actually Covers', 2),

      paragraph(
        "An account is a stored identity inside a service. It usually contains an identifier such as an email address or phone number, a verification method such as a password or code, and a record of settings, purchases, history, and permissions connected to that identity.",
      ),

      paragraph(
        "A subscription is a recurring agreement attached to that identity. It defines a plan, a billing period, a renewal date, and a set of entitlements. When the subscription changes, the account usually keeps existing but the available features change with it.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Creating, verifying and recovering accounts",
        "Sign-in methods, passwords and login codes",
        "Profile settings and account preferences",
        "Free trials and introductory offers",
        "Plan upgrades, downgrades and switching",
        "Renewals, cancellations and refunds",
        "Family plans, shared plans and member management",
        "Account deletion and data removal",
      ]),

      heading("Sign-In Methods and Why They Differ", 2),

      paragraph(
        "Services allow different ways of proving identity. Some use a traditional email and password combination, some send a one-time code to a phone or inbox, and some rely on a third-party sign-in from a larger provider. Each method affects recovery, portability and security differently.",
      ),

      paragraph(
        "Third-party sign-in is convenient because it avoids creating another password, but it also links the account to another provider. If access to that provider is lost, access to every connected service can become complicated. Knowing which method was originally used makes recovery much faster.",
      ),

      heading("Free Trials and Introductory Pricing", 2),

      paragraph(
        "A trial is temporary access that usually converts automatically into a paid subscription unless it is cancelled first. Introductory pricing works similarly, offering a reduced rate for an initial period before the standard rate begins.",
      ),

      paragraph(
        "The most common surprise is not the price itself but the timing. Trial length, renewal date, time zone, and the exact moment the charge is attempted all influence when a payment appears. Noting the renewal date at the moment of signup prevents most of these situations.",
      ),

      heading("Renewals, Cancellations and What Happens After", 2),

      paragraph(
        "Cancelling a subscription and losing access are rarely the same event. In many services, cancellation stops the next renewal but leaves access active until the current period ends. In others, access ends immediately and the remaining time is either refunded or forfeited.",
      ),

      paragraph(
        "Where the subscription was purchased also matters. A plan bought through an app store, a mobile carrier, a reseller, or the service's own website is often managed in that same place, and cancelling in the wrong location can leave the billing untouched.",
      ),

      heading("Shared, Family and Multi-User Plans", 2),

      paragraph(
        "Many services offer plans covering more than one person. These usually have an owner who controls billing and members who receive access. Rules around household location, device limits, simultaneous use, and profile separation vary widely between services.",
      ),

      paragraph(
        "Shared plans introduce questions that individual plans do not. Who keeps the account if the group changes, what happens to individual history or libraries, and how members are removed are all worth understanding before a plan is set up.",
      ),

      heading("Account Recovery and Lost Access", 2),

      paragraph(
        "Recovery depends almost entirely on what was set up in advance. A confirmed recovery email, a current phone number, backup codes, and saved authentication methods are what make recovery possible. Without them, verifying ownership can become extremely difficult.",
      ),

      bulletList([
        "Keep a recovery email that is separate from the main account.",
        "Keep phone numbers current, especially after changing carriers.",
        "Store backup codes somewhere reachable without the account itself.",
        "Record which sign-in method was originally used.",
        "Review connected apps and devices periodically.",
      ]),

      heading("Deleting an Account Versus Cancelling a Plan", 2),

      paragraph(
        "Cancelling stops payment. Deleting removes the identity and usually the data attached to it. These are separate actions, and cancelling alone does not remove stored information, while deleting alone does not always stop an active subscription billed elsewhere.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "The right approach depends on how the service is actually used. Usage frequency, the number of people sharing, where the purchase was made, how important stored history is, and whether the plan can be paused rather than cancelled all influence the best action.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below take these broad ideas and examine specific situations in greater detail, from sign-in problems and verification issues to plan changes, billing questions, and account removal.",
      ),
    ]),
  },

  {
    slug: "computers-operating-systems",

    description:
      "Understand operating systems, system settings, updates, user accounts, performance, and how desktop and laptop software actually works.",

    content: richContent([
      paragraph(
        "An operating system is the layer between hardware and everything a person actually does. It manages memory, schedules processing, controls files, draws the interface, handles devices, and decides which applications are allowed to run and how.",
      ),

      paragraph(
        "Understanding that layer explains a large share of everyday computer behaviour: why an update changes something, why a program will not install, why storage fills up, why performance drops over time, and why the same file behaves differently on two machines.",
      ),

      heading('What "Computers & Operating Systems" Actually Covers', 2),

      paragraph(
        "This category covers the software environment of a desktop or laptop rather than the physical parts inside it. That includes the operating system itself, system settings, updates, user accounts, permissions, drivers, background services, and the tools built into the platform.",
      ),

      paragraph(
        "It also covers how the operating system organizes work: the desktop, the file system, installed applications, startup behaviour, and the maintenance tasks that keep a machine running predictably over years of use.",
      ),

      heading("The Major Desktop Platforms", 2),

      paragraph(
        "Most personal computers run one of a small number of platforms, each with its own conventions for installation, file organization, updates, and system settings. The differences are not only visual, they affect which software is available and how the machine is maintained.",
      ),

      bulletList([
        "Windows on a wide range of hardware from many manufacturers",
        "macOS on Apple hardware with tight hardware and software integration",
        "Linux distributions with highly customizable configurations",
        "ChromeOS built around a browser-centred workflow",
      ]),

      heading("Updates and Why They Matter", 2),

      paragraph(
        "Updates deliver security fixes, bug corrections, driver improvements, and occasionally new features or interface changes. Feature updates change how the system behaves, while security updates usually change very little that is visible.",
      ),

      paragraph(
        "Delaying updates indefinitely eventually causes problems because applications, drivers, and services are built against supported versions. At the same time, installing a major update immediately on a machine that is critical for work carries its own risk, which is why timing and backups matter.",
      ),

      heading("User Accounts and Permissions", 2),

      paragraph(
        "A computer can host multiple user accounts, each with separate files, settings, and permissions. Administrator accounts can change system-wide settings and install software, while standard accounts are limited to their own environment.",
      ),

      paragraph(
        "Permission prompts exist because system-level changes affect every user and every application. Understanding why a prompt appears, and what is requesting the change, is one of the most practical security skills a computer user can develop.",
      ),

      heading("Storage, Files and System Space", 2),

      paragraph(
        "Operating systems reserve space for themselves beyond visible documents. Temporary files, caches, update packages, recovery data, system snapshots, and application data can occupy far more storage than expected, which is why a drive can fill up without obvious cause.",
      ),

      heading("Performance and Why Computers Slow Down", 2),

      paragraph(
        "Slowdowns rarely have a single cause. Background processes, startup programs, limited memory, full storage, thermal limits, outdated drivers, and heavier modern software can all contribute at the same time.",
      ),

      bulletList([
        "Too many programs launching at startup",
        "Insufficient memory for the current workload",
        "A nearly full storage drive",
        "Heat causing reduced sustained performance",
        "Background updates or indexing running during use",
        "Aging hardware paired with newer, heavier software",
      ]),

      heading("Installing and Removing Software", 2),

      paragraph(
        "Each platform has its own installation model, from application stores to downloaded installers and package managers. The installation method affects updates, permissions, uninstallation, and how completely a program is removed when it is no longer needed.",
      ),

      heading("Backups, Recovery and Reinstallation", 2),

      paragraph(
        "Every operating system provides some path back from failure, including restore points, recovery drives, reset options, and full reinstallation. These tools are useful only when a current backup exists, because recovery frequently means returning the system to a clean state.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Choosing and configuring a platform depends on required software, existing devices, file sharing needs, comfort with maintenance, security requirements, and how long the machine is expected to remain in service.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below move from these general principles into specific platform tasks, settings, update procedures, and the problems that appear most often in daily use.",
      ),
    ]),
  },

  {
    slug: "devices-hardware",

    description:
      "Understand computers, smartphones, displays, storage, networking hardware, peripherals, and connected devices.",

    content: richContent([
      paragraph(
        "Hardware is where digital life becomes physical. Before an application opens, a file is saved, a video is displayed, or a wireless connection is established, physical components are doing the work. Understanding those components makes device decisions and troubleshooting much easier.",
      ),

      paragraph(
        "From laptops and smartphones to monitors, storage devices, routers, printers, wearables, and smart-home equipment, every device has its own combination of components, capabilities, limitations, and compatibility requirements.",
      ),

      heading('What "Devices & Hardware" Actually Covers', 2),

      paragraph(
        "Hardware refers to the physical components of a technology system. These include processors, memory, storage, displays, batteries, cameras, microphones, speakers, ports, sensors, circuit boards, and the other components that make a device function.",
      ),

      paragraph(
        "Devices are the finished products built around those components. A laptop combines a processor, memory, storage, display, battery, keyboard, trackpad, wireless hardware, and an operating system. A smartphone combines many of the same ideas into a much smaller and more integrated design.",
      ),

      heading("The Major Device Categories", 2),

      paragraph(
        "Consumer hardware can be divided into several broad groups. Computers provide general-purpose processing, smartphones provide portable computing and communication, displays provide visual output, networking hardware connects devices, and peripherals extend what a primary device can do.",
      ),

      bulletList([
        "Desktop computers and laptops",
        "Smartphones and tablets",
        "Smart TVs and displays",
        "Routers and Wi-Fi equipment",
        "Storage devices",
        "Printers and scanners",
        "Keyboards, mice and other peripherals",
        "Wearables and connected devices",
      ]),

      heading("Computers: Desktops, Laptops and the Space Between", 2),

      paragraph(
        "Personal computers remain important for productivity, development, creative work, education, and gaming. A desktop generally provides more room for cooling, larger components, easier upgrades, and a wider selection of ports. A laptop trades some of that flexibility for portability.",
      ),

      paragraph(
        "Within laptops, different designs target different workloads. Thin machines generally emphasize portability and battery life, while larger performance-oriented systems can provide more sustained processing capability. The right design depends on what the computer will actually be used for.",
      ),

      heading("Smartphones and Tablets", 2),

      paragraph(
        "Smartphones are highly integrated computers that combine communication, cameras, storage, applications, sensors, connectivity, and battery management. The operating system also determines much of the software ecosystem and how the device interacts with other products.",
      ),

      paragraph(
        "Tablets occupy a middle position between phones and traditional computers. Their larger displays can make reading, media consumption, drawing, and certain productivity tasks more comfortable, while their software and accessories determine how far they can replace a conventional computer.",
      ),

      heading("Networking Hardware", 2),

      paragraph(
        "Every connected device depends on some form of networking hardware. Routers manage traffic between a local network and the internet, while Wi-Fi access points provide wireless connectivity. Larger homes may use multiple access points or mesh systems to improve coverage.",
      ),

      paragraph(
        "Network performance depends on more than the internet plan. Wireless interference, distance, walls, router capability, device capability, network configuration, and the service itself can all influence the final experience.",
      ),

      heading("Storage Devices", 2),

      paragraph(
        "Storage is where operating systems, applications, documents, photographs, videos, games, and other information are kept. Solid-state drives use flash memory and generally provide much faster access than traditional spinning hard drives.",
      ),

      paragraph(
        "External storage adds another option for backups, file transfers, and additional capacity. Network-attached storage can provide centralized storage that multiple devices on the same network can access.",
      ),

      heading("Peripherals and Accessories", 2),

      paragraph(
        "Monitors, keyboards, mice, webcams, headsets, drawing tablets, printers, docking stations, and other peripherals directly affect daily usability. Port selection and connection standards determine which accessories can be used and what capabilities they can provide.",
      ),

      heading("What Actually Determines Hardware Performance", 2),

      paragraph(
        "Hardware performance is not determined by a single specification. The processor, memory, graphics hardware, storage, cooling system, power limits, display, and workload all contribute to the experience.",
      ),

      bulletList([
        "CPU capability affects general processing workloads.",
        "RAM affects how much active information the system can comfortably keep available.",
        "GPU capability matters for graphics, gaming, video work and other visual workloads.",
        "SSD or HDD performance affects storage access and loading times.",
        "Cooling affects how long performance can be sustained.",
        "Battery capacity and efficiency affect portable use.",
      ]),

      heading("Compatibility Matters", 2),

      paragraph(
        "A device can have excellent specifications and still be inconvenient if it does not work properly with the rest of the setup. USB, HDMI, Bluetooth, Wi-Fi, charging standards, operating-system support, drivers, firmware, and physical dimensions can all affect compatibility.",
      ),

      paragraph(
        "Newer standards can often communicate with older standards, but the connection may operate according to the capabilities shared by both sides. Understanding compatibility before buying or connecting hardware prevents many unnecessary problems.",
      ),

      heading("The Variables That Shape Your Hardware Decision", 2),

      paragraph(
        "The most useful hardware decision starts with the actual workload. Browsing, documents, video calls, and ordinary office work generally require very different hardware from high-resolution video editing, 3D work, demanding games, or local AI workloads.",
      ),

      paragraph(
        "Budget, existing devices, ecosystem compatibility, portability, repairability, expected lifespan, available ports, and upgrade options also matter. More specification is useful only when it solves a real requirement.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below take these broad ideas and examine individual device families in greater detail. Once a reader enters a subcategory such as Smart TVs, Smartphones, or Laptops, the page can explain that specific technology before presenting individual how-to articles.",
      ),
    ]),
  },

  {
    slug: "email-communication",

    description:
      "Understand email, messaging, video calls, spam filtering, deliverability, and the tools people use to communicate online.",

    content: richContent([
      paragraph(
        "Communication tools carry the most personal and most important parts of digital life. An email address is often the key to every other account, a chat thread holds the working history of a project, and a video call replaces what used to require travel.",
      ),

      paragraph(
        "Because these tools sit at the centre of everything else, small misunderstandings cause disproportionate trouble: a message that never arrives, an address that fails verification, a call that will not connect, or a legitimate email that quietly lands in spam.",
      ),

      heading('What "Email & Communication" Actually Covers', 2),

      paragraph(
        "This category covers the systems used to send and receive messages between people. That includes email accounts and clients, instant messaging, video conferencing, voice calling over the internet, and the settings that control how all of them behave.",
      ),

      paragraph(
        "It also covers the infrastructure behind those systems, such as mail servers, protocols, filtering rules, contact management, and the delivery mechanics that determine whether a message reaches an inbox at all.",
      ),

      heading("How Email Actually Works", 2),

      paragraph(
        "Email moves between servers rather than directly between people. A message leaves an outgoing server, travels across the internet, and is accepted by a receiving server, which then makes it available to the recipient's mail application or web interface.",
      ),

      paragraph(
        "Protocols determine how that access works. Some keep messages stored on the server and synchronize them across devices, while others download messages to a single device. This difference explains why the same account can look different on a phone and a computer.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Email accounts, clients and webmail",
        "Sending, receiving and delivery problems",
        "Spam, phishing and filtering",
        "Folders, labels, rules and organization",
        "Contacts, groups and mailing lists",
        "Messaging and chat applications",
        "Video conferencing and voice calls",
        "Signatures, auto-replies and forwarding",
      ]),

      heading("Spam, Filtering and Deliverability", 2),

      paragraph(
        "Every mail provider filters aggressively because unwanted mail vastly outnumbers legitimate mail. Filtering considers sender reputation, authentication records, message content, recipient behaviour, and patterns across many accounts at once.",
      ),

      paragraph(
        "This is also why legitimate messages sometimes disappear into spam. The message itself may be perfectly ordinary while the sending domain, the server, or the sending pattern looks unusual to the filter.",
      ),

      heading("Recognizing Phishing and Impersonation", 2),

      paragraph(
        "Phishing messages imitate a familiar service to obtain credentials, payment details, or access. They usually create urgency, reference an account problem, and direct the reader to a link that leads somewhere other than the real service.",
      ),

      bulletList([
        "Unexpected urgency about accounts, payments or deliveries",
        "Sender addresses that almost match a real domain",
        "Links whose destination differs from the visible text",
        "Requests for codes, passwords or payment details",
        "Attachments that were never expected",
      ]),

      heading("Messaging and Chat Platforms", 2),

      paragraph(
        "Messaging applications differ in how they store history, whether messages are encrypted end to end, how they sync across devices, and whether an account is tied to a phone number, an email address, or a workplace directory.",
      ),

      paragraph(
        "Those differences affect practical questions such as whether history transfers to a new phone, whether a message can be recovered after deletion, and how a conversation is backed up.",
      ),

      heading("Video Calls and Voice Over the Internet", 2),

      paragraph(
        "Video conferencing depends on bandwidth, latency, camera and microphone access, and permission settings. Most call quality problems come from the network path or from device permissions rather than from the conferencing software itself.",
      ),

      heading("Organizing Communication", 2),

      paragraph(
        "Folders, labels, filters, rules, and search all exist to stop volume from becoming unmanageable. Automatic rules applied at arrival are usually more effective than manual sorting, because they work consistently without daily effort.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "The right setup depends on message volume, how many devices are used, whether communication is personal or professional, retention requirements, privacy expectations, and how much of the history must remain searchable years later.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below examine individual communication tools and problems in detail, from provider-specific settings to delivery failures, filtering rules, and call quality issues.",
      ),
    ]),
  },

  {
    slug: "files-data-cloud-storage",

    description:
      "Understand file formats, folder organization, syncing, backups, cloud storage services, and how data moves between devices.",

    content: richContent([
      paragraph(
        "Files are the durable part of digital life. Applications change, devices are replaced, and services come and go, but documents, photographs, recordings, spreadsheets, and archives are expected to survive all of it.",
      ),

      paragraph(
        "Cloud storage changed how that survival works. Instead of living in one place, data is now copied, synchronized, versioned, and shared across devices and services, which introduces both convenience and a new set of things that can go wrong.",
      ),

      heading('What "Files, Data & Cloud Storage" Actually Covers', 2),

      paragraph(
        "This category covers how information is stored, named, organized, moved, shared, protected, and recovered. That includes local storage on a device, external drives, network storage, and cloud services accessed over the internet.",
      ),

      paragraph(
        "It also covers the formats themselves, because the file type determines which applications can open it, how much space it uses, how much quality is preserved, and how well it will be readable in the future.",
      ),

      heading("File Formats and Why They Matter", 2),

      paragraph(
        "A file format is a convention for encoding information. Documents, images, audio, video, archives, and data files each have many formats, and each format makes different trade-offs between size, quality, compatibility, and editability.",
      ),

      bulletList([
        "Document formats for text, layout and printing",
        "Image formats with different compression and transparency behaviour",
        "Audio and video formats balancing quality against file size",
        "Archive formats that compress or bundle multiple files",
        "Data formats used for exporting and moving structured information",
      ]),

      heading("Syncing Versus Backing Up", 2),

      paragraph(
        "Synchronizing and backing up look similar but solve different problems. Synchronization keeps copies identical across devices, which means a deletion or an unwanted change propagates everywhere. A backup preserves an earlier state so that mistakes can be undone.",
      ),

      paragraph(
        "This distinction explains one of the most common data losses: a file deleted on one device disappears from every synced device, and without a separate backup or version history, there is nothing to restore from.",
      ),

      heading("How Cloud Storage Actually Works", 2),

      paragraph(
        "Cloud storage keeps files on servers operated by a provider and presents them through an application, a web interface, or a folder that behaves like a local one. Some files are downloaded fully, while others remain online until they are opened.",
      ),

      paragraph(
        "That on-demand behaviour is efficient but depends on connectivity. Understanding which files are stored locally and which are only placeholders prevents confusion when a device goes offline.",
      ),

      heading("Sharing, Permissions and Links", 2),

      paragraph(
        "Shared files carry permissions that determine who can view, comment, edit, or reshare. Link-based sharing is convenient but can expose content more broadly than intended if the link is forwarded or indexed.",
      ),

      bulletList([
        "Decide between view, comment and edit access deliberately",
        "Prefer sharing with named people for sensitive material",
        "Set expiry dates on temporary links where supported",
        "Review shared items periodically and revoke old access",
      ]),

      heading("Organization and Naming", 2),

      paragraph(
        "A consistent folder structure and naming convention does more for long-term retrieval than any search feature. Dates in a sortable format, meaningful names, and a small number of predictable top-level folders keep an archive usable as it grows.",
      ),

      heading("Storage Capacity and Running Out of Space", 2),

      paragraph(
        "Storage fills faster than expected because photographs, video, application caches, downloads, and version history all accumulate quietly. Shared drives and mailboxes often count toward the same quota, which is why a full account may not be caused by obvious files.",
      ),

      heading("Data Loss, Corruption and Recovery", 2),

      paragraph(
        "Data is lost through deletion, hardware failure, corruption, ransomware, service errors, and simple misplacement. A dependable approach keeps multiple copies, stores at least one of them separately from the others, and verifies occasionally that restoring actually works.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "The right storage approach depends on volume, sensitivity, how many people need access, whether files must be edited collaboratively, how long the data must survive, and how quickly it must be recoverable after a failure.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific storage services, file operations, conversion tasks, backup methods, and recovery procedures in practical detail.",
      ),
    ]),
  },

  {
    slug: "gaming",

    description:
      "Understand gaming platforms, consoles, PC gaming, performance settings, online play, accounts, and game libraries.",

    content: richContent([
      paragraph(
        "Gaming combines almost every other area of consumer technology at once. A single session depends on hardware performance, display capability, network quality, storage speed, account systems, digital storefronts, and software updates working together.",
      ),

      paragraph(
        "That is also why gaming problems can be difficult to diagnose. Stuttering, disconnections, long loading times, and failed installations can each come from several very different parts of the chain.",
      ),

      heading('What "Gaming" Actually Covers', 2),

      paragraph(
        "This category covers the platforms games run on, the hardware that determines performance, the services that deliver and store games, and the settings that shape the experience. It spans consoles, computers, handhelds, mobile devices, and cloud streaming.",
      ),

      heading("The Major Gaming Platforms", 2),

      bulletList([
        "Home consoles with fixed, standardized hardware",
        "Gaming PCs with configurable and upgradeable components",
        "Handheld consoles and portable gaming PCs",
        "Mobile phones and tablets",
        "Cloud gaming services that stream from remote hardware",
      ]),

      paragraph(
        "Consoles offer predictability because every unit is essentially identical, so games are optimized for known hardware. PCs offer flexibility and a much wider range of settings, at the cost of requiring more configuration and troubleshooting.",
      ),

      heading("What Determines Gaming Performance", 2),

      paragraph(
        "Frame rate and smoothness come from the interaction between graphics hardware, processor, memory, storage, display, and the settings chosen in the game. A weak link anywhere in that chain limits everything else.",
      ),

      bulletList([
        "Graphics hardware for rendering resolution and visual detail",
        "Processor capability for simulation, physics and background work",
        "Memory capacity for textures and level data",
        "Storage speed for loading and streaming assets",
        "Display refresh rate and response for perceived smoothness",
        "Cooling and power limits for sustained performance",
      ]),

      heading("Resolution, Frame Rate and Settings", 2),

      paragraph(
        "Graphics settings trade visual quality against performance. Resolution, texture detail, shadows, reflections, and effects each cost different amounts, and lowering the most expensive settings often restores smoothness with very little visible difference.",
      ),

      paragraph(
        "Upscaling and frame generation technologies render at a lower internal resolution and reconstruct the output, which can significantly improve performance but may introduce artefacts depending on the implementation and the settings used.",
      ),

      heading("Online Play and Network Quality", 2),

      paragraph(
        "Online gaming depends more on latency and stability than on raw bandwidth. A connection with high download speed can still perform poorly if latency is high, if packets are lost, or if other devices saturate the link during play.",
      ),

      paragraph(
        "Wired connections generally provide more consistent results than wireless, and server location, network congestion, and router configuration all influence the final experience.",
      ),

      heading("Accounts, Libraries and Digital Ownership", 2),

      paragraph(
        "Modern games are usually tied to a platform account rather than to a disc or a device. That account holds the library, saves, achievements, friends, and entitlements, which makes account security and recovery unusually important.",
      ),

      paragraph(
        "Cross-platform play, cross-progression, and cloud saves vary by title. Two accounts on different platforms do not automatically share progress unless the game specifically supports linking them.",
      ),

      heading("Storage, Installs and Updates", 2),

      paragraph(
        "Game installations have grown substantially, and patches frequently require additional temporary space during installation. Managing storage, understanding where games are installed, and moving libraries between drives are routine tasks for most players.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Platform and hardware choices depend on which games matter, who is played with, display capability, budget, tolerance for configuration, available space, and whether portability or maximum performance is the priority.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover individual platforms, storefronts, performance tuning, connectivity problems, and the specific tasks players encounter most often.",
      ),
    ]),
  },

  {
    slug: "internet-networking",

    description:
      "Understand internet connections, Wi-Fi, routers, speeds, IP addressing, DNS, and how home and mobile networks actually work.",

    content: richContent([
      paragraph(
        "Networking is invisible until it fails. Pages load, videos stream, calls connect, and files sync without any thought about the path the data travels. When something breaks, that path suddenly matters a great deal.",
      ),

      paragraph(
        "A connection involves a device, a local network, a router, an internet provider, and a destination server, with several systems translating names, routing traffic, and managing congestion along the way. Problems can occur at any of those points.",
      ),

      heading('What "Internet & Networking" Actually Covers', 2),

      paragraph(
        "This category covers how devices connect to each other and to the internet. That includes wired and wireless connections, routers and modems, internet service, mobile data, addressing, name resolution, and the settings that control all of it.",
      ),

      heading("The Building Blocks of a Connection", 2),

      bulletList([
        "A modem that connects to the internet provider's line",
        "A router that manages the local network and shares the connection",
        "Wi-Fi radios that provide wireless access",
        "Ethernet cabling for wired connections",
        "IP addressing that identifies devices on the network",
        "DNS that translates names into addresses",
      ]),

      heading("How Wi-Fi Actually Behaves", 2),

      paragraph(
        "Wi-Fi operates on shared radio frequencies, and performance depends on distance, obstructions, interference from neighbouring networks, the number of connected devices, and the capabilities of both the router and the client device.",
      ),

      paragraph(
        "Different frequency bands trade range against speed. Lower frequencies generally travel further and pass through walls more easily, while higher frequencies carry more data over shorter distances with less interference.",
      ),

      heading("Speed, Bandwidth and Latency", 2),

      paragraph(
        "Bandwidth is how much data can move at once, while latency is how long a single exchange takes. Browsing and calls are sensitive to latency, while large downloads and high-quality video depend more on bandwidth.",
      ),

      paragraph(
        "A speed test measures the path to a particular server at a particular moment. It is useful as a comparison over time but does not by itself explain a problem, especially when the issue only appears with one application or one device.",
      ),

      heading("Common Causes of Poor Connectivity", 2),

      bulletList([
        "Distance from the router or obstructions such as thick walls",
        "Congestion from many devices sharing the same network",
        "Interference from neighbouring wireless networks",
        "Outdated router firmware or aging hardware",
        "Incorrect DNS or network configuration",
        "Provider-side outages or line faults",
      ]),

      heading("Routers, Mesh Systems and Coverage", 2),

      paragraph(
        "A single router may not cover a large or awkwardly shaped home. Mesh systems and additional access points extend coverage by placing more radios closer to where devices are used, which usually works better than simply increasing transmit power.",
      ),

      paragraph(
        "Router placement matters more than most people expect. Central, elevated, and unobstructed positions generally outperform a router hidden in a cabinet or placed at the edge of a building.",
      ),

      heading("Addressing, DNS and Name Resolution", 2),

      paragraph(
        "Every device on a network has an address, usually assigned automatically. Names such as website addresses are translated into those numeric addresses by DNS, which is why a DNS problem can make the internet appear entirely down while the connection itself is fine.",
      ),

      heading("Mobile Data and Alternative Connections", 2),

      paragraph(
        "Mobile networks provide connectivity through cellular infrastructure, with performance depending on signal strength, network generation, congestion, and plan limits. Tethering, fixed wireless, and satellite services offer further alternatives where fixed lines are unavailable.",
      ),

      heading("Network Security Basics", 2),

      paragraph(
        "A home network is a shared space. Strong wireless encryption, a changed administrator password, current firmware, a separate guest network, and awareness of which devices are connected prevent most common problems.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Network decisions depend on the size and construction of the space, the number of devices, the activities involved, available service options, and whether consistency or peak speed is more important.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below go into router configuration, Wi-Fi troubleshooting, connection problems, network security, and the specific tasks involved in setting up and maintaining a reliable connection.",
      ),
    ]),
  },

  {
    slug: "payments-billing-commerce",

    description:
      "Understand online payments, billing cycles, invoices, refunds, digital wallets, and how e-commerce transactions actually work.",

    content: richContent([
      paragraph(
        "Money moving online involves more parties than most people realize. A single card payment passes through a merchant, a payment gateway, a processor, a card network, and a bank, each applying its own rules before the transaction is finally approved or declined.",
      ),

      paragraph(
        "Understanding that chain explains a large share of billing confusion: why a charge appears twice and then corrects itself, why a refund takes days, why a declined card gives no reason, and why an invoice total does not match the advertised price.",
      ),

      heading('What "Payments, Billing & Commerce" Actually Covers', 2),

      paragraph(
        "This category covers the mechanics of paying and being paid online. It includes payment methods, billing cycles, invoices and receipts, taxes and fees, refunds and disputes, and the platforms used to buy and sell.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Cards, bank transfers and digital wallets",
        "Recurring billing and subscription charges",
        "Invoices, receipts and billing statements",
        "Taxes, currency conversion and additional fees",
        "Refunds, chargebacks and disputes",
        "Online stores, marketplaces and checkout",
        "Failed, declined and duplicate payments",
      ]),

      heading("How an Online Payment Is Processed", 2),

      paragraph(
        "When a payment is submitted, the merchant requests authorization rather than an immediate transfer. The issuing bank checks available funds and risk signals, then approves or declines. The actual movement of money happens later, during settlement.",
      ),

      paragraph(
        "This is why a pending charge can appear and then vanish. An authorization temporarily reserves funds, and if the merchant never captures it, the reservation eventually expires and the amount returns to the available balance.",
      ),

      heading("Why Payments Get Declined", 2),

      paragraph(
        "Declines are often deliberately vague, because detailed reasons would help fraud attempts. The underlying cause is usually one of a small number of things, and the issuing bank is the only party that can confirm which.",
      ),

      bulletList([
        "Insufficient available balance or an exceeded limit",
        "Expired card details or an outdated billing address",
        "Fraud protection triggered by an unusual merchant or location",
        "International or online transactions blocked by default",
        "A card type not accepted by the merchant",
      ]),

      heading("Billing Cycles and Recurring Charges", 2),

      paragraph(
        "Recurring charges follow a cycle anchored to the original purchase date. Plan changes mid-cycle usually produce a prorated adjustment, which is why an invoice can show partial amounts, credits, and a new charge all at once.",
      ),

      paragraph(
        "The name appearing on a statement is frequently the payment processor or parent company rather than the service itself, which is a common reason a charge looks unfamiliar even when it is legitimate.",
      ),

      heading("Refunds, Chargebacks and Disputes", 2),

      paragraph(
        "A refund is initiated by the merchant and returns money through the original payment path. A chargeback is initiated through the bank and reverses the payment forcibly. Refunds are usually faster and simpler, and are the right first step in most situations.",
      ),

      paragraph(
        "Refund timing depends on the merchant, the processor, and the bank, so money that has already left the merchant may still take several business days to appear on a statement.",
      ),

      heading("Digital Wallets and Alternative Methods", 2),

      paragraph(
        "Wallets store payment credentials and present a substitute token to the merchant, which reduces exposure of the underlying card details. Bank transfers, instant payment systems, buy-now-pay-later services, and stored balances each have different reversal and protection rules.",
      ),

      heading("Buying and Selling Online Safely", 2),

      paragraph(
        "Checkout security depends on the connection, the merchant's reputation, and the payment method chosen. Methods offering strong dispute protection are safer for unfamiliar sellers, while direct transfers offer very little recourse once completed.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Payment decisions depend on the amount involved, the seller's reliability, the level of dispute protection needed, currency and cross-border fees, recurring versus one-time billing, and how easily the transaction can be reversed if something goes wrong.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below examine specific payment platforms, billing problems, refund procedures, and the practical steps involved in resolving transaction issues.",
      ),
    ]),
  },

  {
    slug: "productivity-office-tools",

    description:
      "Understand documents, spreadsheets, presentations, note-taking, task management, and the tools that organize daily work.",

    content: richContent([
      paragraph(
        "Productivity software is where most professional work actually happens. Documents carry decisions, spreadsheets carry numbers, presentations carry arguments, and task tools carry the sequence that holds everything together.",
      ),

      paragraph(
        "These tools have also changed substantially. What used to be a single application producing a single file is now a collaborative environment with version history, real-time editing, comments, permissions, and synchronized storage behind it.",
      ),

      heading('What "Productivity & Office Tools" Actually Covers', 2),

      paragraph(
        "This category covers the applications used to create, organize, and share work. That includes word processors, spreadsheets, presentation software, note applications, task and project managers, calendars, and the collaboration features built into them.",
      ),

      heading("The Main Tool Families", 2),

      bulletList([
        "Word processors for documents, reports and letters",
        "Spreadsheets for calculation, analysis and tracking",
        "Presentation tools for slides and visual explanation",
        "Note-taking and knowledge applications",
        "Task, project and workflow managers",
        "Calendars and scheduling tools",
        "PDF tools for reading, editing and signing",
      ]),

      heading("Documents and Formatting", 2),

      paragraph(
        "Most document frustration comes from formatting applied manually instead of structurally. Styles, headings, lists, and templates define structure once and apply it consistently, which makes long documents far easier to edit, navigate, and convert.",
      ),

      paragraph(
        "Structure also determines what happens during export. Headings become navigation and bookmarks, and a document built with proper styles converts cleanly, while one built with manual spacing and formatting usually does not.",
      ),

      heading("Spreadsheets and Calculation", 2),

      paragraph(
        "A spreadsheet is a calculation engine as much as a table. Formulas reference cells, functions perform operations, and references update as the sheet changes, which is why small structural mistakes can propagate through an entire workbook.",
      ),

      bulletList([
        "Keep raw data separate from calculations and presentation",
        "Use consistent column types rather than mixed text and numbers",
        "Prefer references over values typed directly into formulas",
        "Name ranges where formulas become hard to read",
        "Check for hidden rows, filters and stale references before trusting a total",
      ]),

      heading("Presentations", 2),

      paragraph(
        "Presentation software is most effective when slides support speech rather than replace it. Templates, consistent layouts, and master slides keep a deck coherent, while exports and compatibility settings determine how it appears on other systems.",
      ),

      heading("Collaboration, Versions and Permissions", 2),

      paragraph(
        "Real-time collaboration removes the problem of conflicting copies but introduces questions of access and history. Version history allows earlier states to be restored, and comments and suggestions separate discussion from the content itself.",
      ),

      paragraph(
        "Permission design matters as much as the content. Deciding who can view, comment, or edit, and reviewing that access over time, prevents both accidental changes and unintended exposure.",
      ),

      heading("Notes, Tasks and Organization", 2),

      paragraph(
        "Note and task systems work when capture is effortless and review is habitual. A system that requires elaborate maintenance tends to be abandoned, while a simple structure that is actually used consistently produces far better results.",
      ),

      heading("Compatibility Between Suites", 2),

      paragraph(
        "Files move between office suites regularly, and conversion is rarely perfect. Fonts, complex layouts, advanced formulas, macros, and embedded objects are the elements most likely to change appearance or behaviour when opened elsewhere.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Tool choice depends on how many people collaborate, whether work happens offline, required file compatibility, the complexity of the documents involved, organizational requirements, and how long the material must remain accessible.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific applications and tasks, from formulas and formatting to templates, conversion, collaboration settings, and recovery of unsaved work.",
      ),
    ]),
  },

  {
    slug: "security-privacy",

    description:
      "Understand passwords, two-factor authentication, malware, encryption, tracking, permissions, and practical digital protection.",

    content: richContent([
      paragraph(
        "Security is about preventing unauthorized access, and privacy is about controlling what is collected and shared. They overlap constantly, but they are not the same thing: a service can be secure and still gather far more information than expected.",
      ),

      paragraph(
        "Practical protection rarely comes from a single tool. It comes from a small number of habits applied consistently, because most real incidents exploit reused passwords, missing verification, outdated software, or a convincing message rather than sophisticated technical attacks.",
      ),

      heading('What "Security & Privacy" Actually Covers', 2),

      paragraph(
        "This category covers how accounts, devices, and data are protected, and how personal information is collected, used, and limited. It spans authentication, malware, encryption, permissions, tracking, and the settings that control all of them.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Passwords, password managers and credential hygiene",
        "Two-factor and multi-factor authentication",
        "Malware, ransomware and unwanted software",
        "Phishing, scams and social engineering",
        "Encryption, secure connections and VPNs",
        "App permissions and device access controls",
        "Tracking, advertising identifiers and data collection",
        "Breach response and account recovery",
      ]),

      heading("Passwords and Why Reuse Is the Real Problem", 2),

      paragraph(
        "Most account compromises do not involve guessing a password. Credentials exposed in one breach are tried automatically against many other services, which means a reused password turns a single incident into a chain of them.",
      ),

      paragraph(
        "A password manager solves this by making every password unique without requiring anyone to remember them. Length and uniqueness matter far more than complicated substitution patterns.",
      ),

      heading("Two-Factor Authentication", 2),

      paragraph(
        "A second factor requires something beyond the password, such as a code from an application, a hardware key, or a prompt on a trusted device. It blocks the large majority of attacks that rely on stolen credentials alone.",
      ),

      bulletList([
        "Hardware security keys offer the strongest protection",
        "Authenticator applications are strong and widely supported",
        "Push approvals are convenient but require careful attention",
        "Text message codes are better than nothing but weaker than the alternatives",
        "Backup codes should always be stored somewhere retrievable",
      ]),

      heading("Malware and Unwanted Software", 2),

      paragraph(
        "Malicious software arrives through downloads, attachments, compromised installers, browser extensions, and deceptive advertisements. Keeping software updated, installing from official sources, and being cautious about permissions prevents most infections.",
      ),

      paragraph(
        "Ransomware is a particular concern because it encrypts data rather than stealing it. The only reliable protection is a backup that is separated from the system it protects, so it cannot be encrypted alongside the original.",
      ),

      heading("Encryption and Secure Connections", 2),

      paragraph(
        "Encryption protects data in transit and at rest. Secure web connections protect information travelling between a browser and a server, while device encryption protects stored data if hardware is lost or stolen.",
      ),

      paragraph(
        "A VPN encrypts traffic between a device and the VPN provider, which is useful on untrusted networks. It does not make a user anonymous, and it shifts trust from the local network to the VPN operator rather than removing it.",
      ),

      heading("Permissions and Data Collection", 2),

      paragraph(
        "Applications request access to location, camera, microphone, contacts, files, and notifications. Reviewing these periodically often reveals permissions granted once for a specific purpose and never reconsidered.",
      ),

      paragraph(
        "Tracking works through identifiers, cookies, fingerprinting, and data shared between services. Browser settings, tracking protection, and advertising controls reduce it, though no single setting removes it entirely.",
      ),

      heading("Responding to a Breach", 2),

      paragraph(
        "When credentials are exposed, the priority order is changing the affected password, changing it anywhere it was reused, enabling a second factor, reviewing active sessions and connected applications, and checking recovery details for unauthorized changes.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "A sensible approach depends on what is being protected, who might realistically want access, the consequences of exposure, how many people share the devices or accounts, and how much friction can be tolerated day to day.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below address specific protections and problems, from setting up authentication and removing malware to managing permissions, reviewing sessions, and recovering compromised accounts.",
      ),
    ]),
  },

  {
    slug: "social-media",

    description:
      "Understand social platforms, profiles, privacy settings, content reach, account recovery, and how social systems actually operate.",

    content: richContent([
      paragraph(
        "Social platforms combine a publishing tool, a messaging system, an identity record, and a recommendation engine in one place. Every visible action is shaped by settings, algorithms, and policies that usually operate out of sight.",
      ),

      paragraph(
        "Understanding those mechanics answers the questions people ask most often: why reach changes without warning, who can actually see a post, why an account was restricted, and what remains visible after something is deleted.",
      ),

      heading('What "Social Media" Actually Covers', 2),

      paragraph(
        "This category covers the platforms used to share content and connect with others, including profiles and accounts, privacy and audience settings, posting and formats, messaging, moderation, and the analytics that describe performance.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Account creation, verification and recovery",
        "Profile setup and public presentation",
        "Privacy settings and audience control",
        "Posting formats, scheduling and editing",
        "Direct messages and requests",
        "Blocking, muting, reporting and moderation",
        "Reach, engagement and analytics",
        "Deactivation, deletion and data export",
      ]),

      heading("How Feeds and Recommendations Work", 2),

      paragraph(
        "Most feeds are ranked rather than chronological. Platforms estimate which content a given person is most likely to engage with, using signals such as past interaction, content type, recency, relationships, and early response to a new post.",
      ),

      paragraph(
        "This is why identical posts perform very differently at different times, and why reach fluctuates without any change in strategy. Ranking responds to behaviour across a whole audience, not to any single account's intentions.",
      ),

      heading("Privacy and Audience Control", 2),

      paragraph(
        "Visibility is governed by account-level settings, per-post audience choices, and platform defaults that change over time. A private account limits who can follow and see content, while a public account allows indexing, sharing, and resharing far more widely.",
      ),

      bulletList([
        "Review default audience settings after major platform updates",
        "Check what appears on a profile when logged out",
        "Limit discoverability by phone number or email if unwanted",
        "Understand that reshared content can outlive the original post",
      ]),

      heading("Account Security and Recovery", 2),

      paragraph(
        "Social accounts are frequent targets because they carry reputation and reach. Strong authentication, current recovery contacts, and periodic review of connected applications and active sessions prevent most takeovers.",
      ),

      paragraph(
        "Recovery usually depends on proving ownership through recovery email, phone number, or identity verification. Because a compromised account may have those details changed, the speed of response matters considerably.",
      ),

      heading("Moderation, Restrictions and Appeals", 2),

      paragraph(
        "Platforms enforce content policies through automated systems and human review. Restrictions range from reduced distribution to content removal, feature limits, and account suspension, and most systems provide an appeal process with defined timeframes.",
      ),

      heading("Content Formats and What They Favour", 2),

      paragraph(
        "Each platform favours particular formats, aspect ratios, lengths, and posting behaviours. Understanding the format expectations of a platform usually matters more than posting volume, because content that fits the format is distributed more readily.",
      ),

      heading("Deleting, Deactivating and Data Export", 2),

      paragraph(
        "Deactivation hides an account temporarily while deletion removes it, often after a waiting period. Most platforms allow a full data export beforehand, which is worth requesting before any permanent action.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Approach depends on whether the account is personal or professional, how public the presence should be, the audience being reached, the time available for consistent activity, and how much personal information is acceptable to share.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover individual platforms and tasks in detail, including settings, posting problems, recovery steps, and moderation questions.",
      ),
    ]),
  },

  {
    slug: "software-app-operations",

    description:
      "Understand installing, updating, configuring, licensing, and troubleshooting software across desktop and mobile platforms.",

    content: richContent([
      paragraph(
        "Software rarely fails in dramatic ways. It fails to install, refuses to update, loses a setting, conflicts with something else, or stops working after a system change. These operational problems account for most of the time people spend fighting their own tools.",
      ),

      paragraph(
        "Understanding how software is packaged, installed, permissioned, updated, and licensed turns most of those problems from mysteries into procedures with predictable steps.",
      ),

      heading('What "Software & App Operations" Actually Covers', 2),

      paragraph(
        "This category covers the lifecycle of an application rather than any single program's features. It includes obtaining software, installing it, granting permissions, configuring it, keeping it current, resolving conflicts, and removing it cleanly.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Downloading and installing applications",
        "Application stores, installers and package managers",
        "Updates, versions and release channels",
        "Licences, activation and product keys",
        "Settings, preferences and configuration files",
        "Extensions, plugins and add-ons",
        "Crashes, conflicts and compatibility problems",
        "Uninstalling and cleaning up leftovers",
      ]),

      heading("Where Software Comes From", 2),

      paragraph(
        "Applications may be distributed through an official store, downloaded directly from a developer, installed through a package manager, or delivered by an organization's management system. The source affects trust, update behaviour, and how the application is removed.",
      ),

      paragraph(
        "Store-delivered applications usually update automatically and run with restricted permissions. Directly downloaded software often has broader system access and relies on its own update mechanism, which makes the download source particularly important.",
      ),

      heading("Updates, Versions and Compatibility", 2),

      paragraph(
        "Version numbers usually signal the scale of a change, with major versions introducing significant differences and minor ones delivering fixes. Files created in a newer version may not open correctly in an older one, which matters when several people share documents.",
      ),

      paragraph(
        "Automatic updating keeps software secure but occasionally introduces changes at inconvenient moments. On systems used for critical work, controlling update timing while still applying security fixes is usually the right balance.",
      ),

      heading("Licences and Activation", 2),

      paragraph(
        "Software may be licensed perpetually, by subscription, per device, per user, or through a free tier with paid upgrades. Activation ties a licence to an account or a machine, which is why reinstalling on new hardware sometimes requires deactivating the old installation first.",
      ),

      heading("Why Applications Crash or Misbehave", 2),

      bulletList([
        "Corrupted installation or incomplete update",
        "Conflicts with another application or a background service",
        "Outdated drivers or an unsupported operating system version",
        "Damaged settings or cache files",
        "Insufficient memory, storage or permissions",
        "Extensions or plugins that have not kept pace with the host application",
      ]),

      paragraph(
        "A structured approach works better than trial and error: restart, update, disable extensions, reset settings, reinstall, and only then look deeper. Each step eliminates a whole class of causes.",
      ),

      heading("Extensions, Plugins and Add-Ons", 2),

      paragraph(
        "Add-ons extend functionality but also introduce risk and instability. They run with significant access inside the host application, can break after updates, and are a common source of slowdowns and unexpected behaviour.",
      ),

      heading("Uninstalling Properly", 2),

      paragraph(
        "Removing an application does not always remove its settings, cached data, background services, or registered components. Leftovers can cause conflicts during reinstallation, which is why a clean removal sometimes requires more than the standard uninstall option.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Software decisions depend on platform support, file compatibility with collaborators, licensing model and cost, update requirements, data portability, and whether the application will still be maintained in a few years.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific installation procedures, update problems, activation issues, and application-level troubleshooting in practical detail.",
      ),
    ]),
  },

  {
    slug: "streaming-entertainment",

    description:
      "Understand streaming services, video and music playback, quality settings, devices, subscriptions, and content availability.",

    content: richContent([
      paragraph(
        "Streaming replaced physical media with a delivery chain that depends on a service, a network, a device, an application, and a display working together. When playback is poor, the cause can sit anywhere along that chain.",
      ),

      paragraph(
        "Content availability adds another layer. Catalogues differ by region, licensing agreements expire, and the same title may appear on different services in different countries, which explains a great deal of everyday confusion.",
      ),

      heading('What "Streaming & Entertainment" Actually Covers', 2),

      paragraph(
        "This category covers services that deliver video, music, and other media over the internet, along with the devices that play them, the settings that control quality, and the subscriptions that provide access.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Video streaming services and applications",
        "Music and audio streaming",
        "Streaming devices, smart TVs and consoles",
        "Playback quality, resolution and audio formats",
        "Profiles, watchlists and parental controls",
        "Downloads and offline viewing",
        "Subscriptions, plans and simultaneous streams",
        "Buffering, errors and playback problems",
      ]),

      heading("How Streaming Actually Works", 2),

      paragraph(
        "Video is delivered in small segments at multiple quality levels. The player continuously measures available bandwidth and switches between those levels, which is why picture quality can shift mid-playback without any action from the viewer.",
      ),

      paragraph(
        "Buffering happens when the player cannot download segments faster than it plays them. That usually indicates a network constraint rather than a problem with the service, although server-side issues do occur.",
      ),

      heading("Quality, Resolution and Requirements", 2),

      paragraph(
        "High resolution and high dynamic range require the plan, the title, the device, the application, the connection, and the display to all support the format. A limitation in any one of them silently reduces the result.",
      ),

      bulletList([
        "The subscription tier must include the quality level",
        "The specific title must be available in that format",
        "The device and application must support it",
        "The connection must sustain the required bandwidth",
        "The display and cabling must be capable of the format",
      ]),

      heading("Devices and Platform Differences", 2),

      paragraph(
        "The same service often behaves differently across smart TVs, streaming sticks, consoles, phones, and browsers. Browser playback in particular is frequently limited to lower resolutions due to content protection requirements.",
      ),

      heading("Content Availability and Regions", 2),

      paragraph(
        "Licensing is negotiated by territory and by time period. A title can leave a service without notice, appear in one country and not another, and return later under a different arrangement, all without any change on the viewer's side.",
      ),

      heading("Profiles, Recommendations and Controls", 2),

      paragraph(
        "Profiles separate viewing history and recommendations between members of a household. Parental controls restrict content by rating and can require a code, though the exact granularity varies between services.",
      ),

      heading("Downloads and Offline Playback", 2),

      paragraph(
        "Downloaded content is stored in a protected form inside the application, usually with expiry rules and device limits. It cannot normally be moved between devices or played outside the service's own application.",
      ),

      heading("Diagnosing Playback Problems", 2),

      paragraph(
        "Testing the same title on another device, on another network, and in another application isolates the cause quickly. If the problem follows the title it is content-related, if it follows the device it is local, and if it follows the network the connection is the constraint.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Service choice depends on the content actually watched, the number of simultaneous viewers, quality requirements, device compatibility, offline needs, advertising tolerance, and the total cost of running several services at once.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover individual services and devices, playback troubleshooting, quality settings, and subscription management in practical detail.",
      ),
    ]),
  },

  {
    slug: "web-development-design",

    description:
      "Understand websites, hosting, domains, front-end and back-end development, design principles, and how web projects are built.",

    content: richContent([
      paragraph(
        "A website is several systems presented as one. A domain name points to a server, the server delivers files, a browser interprets those files, and design decisions determine whether the result is usable once it appears.",
      ),

      paragraph(
        "Separating those layers makes web work far more manageable. Most problems belong clearly to one of them: the domain, the hosting, the code, the content, or the design.",
      ),

      heading('What "Web Development & Design" Actually Covers', 2),

      paragraph(
        "This category covers building and maintaining websites and web applications. It includes domains and hosting, front-end and back-end development, content management systems, design and layout, performance, accessibility, and deployment.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Domains, DNS and hosting",
        "HTML, CSS and JavaScript fundamentals",
        "Front-end frameworks and component libraries",
        "Back-end languages, servers and databases",
        "Content management systems and site builders",
        "Responsive layout and visual design",
        "Performance, accessibility and search visibility",
        "Deployment, version control and maintenance",
      ]),

      heading("Domains, DNS and Hosting", 2),

      paragraph(
        "A domain is a registered name, DNS is the system that translates it into a server address, and hosting is where the site's files and code actually run. These are often purchased together but remain three separate things that can be changed independently.",
      ),

      paragraph(
        "Understanding this separation explains common situations: a site that works at one address but not another, changes that take time to appear globally, and a domain that continues to exist after hosting has ended.",
      ),

      heading("Front End Versus Back End", 2),

      paragraph(
        "The front end is everything the browser renders, built from markup, styling, and scripting. The back end runs on a server, handling data, authentication, business logic, and anything that must not be exposed to the browser.",
      ),

      paragraph(
        "The boundary between them defines security. Anything sent to the browser can be inspected and modified, so validation, permissions, and secrets must always be enforced on the server side.",
      ),

      heading("Design Fundamentals", 2),

      paragraph(
        "Good web design is mostly about hierarchy, spacing, contrast, and consistency. A clear visual order tells a visitor what matters first, and consistent patterns reduce the effort required to understand each new page.",
      ),

      bulletList([
        "Establish a limited, deliberate type scale",
        "Use consistent spacing rather than arbitrary values",
        "Ensure sufficient contrast for readability",
        "Design for small screens as a first-class case",
        "Keep interactive elements obviously interactive",
      ]),

      heading("Performance and Why It Matters", 2),

      paragraph(
        "Load time is affected by image sizes, script volume, server response, render-blocking resources, and layout stability. Performance affects both user experience and search visibility, and images are usually the largest and easiest thing to improve.",
      ),

      heading("Accessibility", 2),

      paragraph(
        "Accessible sites work with keyboards, screen readers, magnification, and reduced motion preferences. Semantic markup, meaningful alternative text, clear focus states, and adequate contrast address the majority of common barriers.",
      ),

      heading("Content Management and Site Builders", 2),

      paragraph(
        "Managed platforms and site builders trade flexibility for speed and simplicity, while custom development offers full control at a higher cost in time and maintenance. The right choice depends on how often content changes and who will be maintaining it.",
      ),

      heading("Deployment and Maintenance", 2),

      paragraph(
        "Live sites require ongoing attention: certificate renewal, software updates, backups, broken link checks, and monitoring. Version control and a staging environment make changes reversible instead of risky.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Project decisions depend on required functionality, expected traffic, who maintains the site, budget, timeline, integration requirements, and how much control over the underlying code is genuinely needed.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific technologies, platforms, and tasks, from domain configuration and hosting setup to layout techniques, performance work, and deployment procedures.",
      ),
    ]),
  },

  {
    slug: "mobile-apps",

    description:
      "Understand mobile applications, app stores, permissions, updates, storage, notifications, and cross-device app behaviour.",

    content: richContent([
      paragraph(
        "Mobile applications operate under tighter constraints than desktop software. Limited memory, background restrictions, battery management, permission systems, and store review processes all shape how an app behaves before a user touches it.",
      ),

      paragraph(
        "Those constraints explain much of what people notice: an app that reloads after being left open, notifications that arrive late, a feature that disappears after an update, or an application that exists on one platform but not another.",
      ),

      heading('What "Mobile Apps" Actually Covers', 2),

      paragraph(
        "This category covers applications on phones and tablets, including how they are installed, updated, permissioned, stored, and removed, along with the store platforms that distribute them and the settings that control their behaviour.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "App stores, installation and updates",
        "Permissions and privacy controls",
        "Notifications and background activity",
        "Storage, caches and app data",
        "Accounts, sign-in and data transfer between devices",
        "In-app purchases and subscriptions",
        "Crashes, freezes and compatibility problems",
        "Uninstalling, offloading and reinstalling",
      ]),

      heading("How Mobile Apps Are Distributed", 2),

      paragraph(
        "Most applications are installed through an official store that handles distribution, updates, payments, and a review process. This provides consistency and some security review, but also means availability can vary by region, device, and operating system version.",
      ),

      paragraph(
        "Installing from outside a store is possible on some platforms and bypasses that review. It offers flexibility but removes the protections and automatic updates that store distribution provides.",
      ),

      heading("Permissions and Privacy", 2),

      paragraph(
        "Applications must request access to sensitive capabilities such as location, camera, microphone, contacts, photos, and notifications. Modern systems allow granting access once, only while in use, or with reduced precision.",
      ),

      bulletList([
        "Prefer while-in-use access over permanent access",
        "Grant approximate location where exact position is unnecessary",
        "Limit photo access to selected items rather than an entire library",
        "Review permissions after major system updates",
      ]),

      heading("Background Activity and Battery", 2),

      paragraph(
        "Operating systems aggressively limit background work to preserve battery. An application that is closed or restricted may not refresh, sync, or deliver notifications promptly, which is a frequent cause of apparent malfunctions.",
      ),

      paragraph(
        "Battery optimization settings, low-power modes, and data saver features all influence this behaviour, and they differ substantially between manufacturers even on the same underlying platform.",
      ),

      heading("Storage and App Data", 2),

      paragraph(
        "An application's installed size is often far smaller than the space it eventually occupies. Caches, downloaded media, offline content, and message attachments accumulate over time and are usually the real reason storage fills up.",
      ),

      paragraph(
        "Clearing a cache is generally safe, while clearing app data resets the application to a fresh state and may remove local content that was never synced elsewhere.",
      ),

      heading("Notifications", 2),

      paragraph(
        "Notification behaviour is controlled at both the system and application level, with categories, priority levels, focus modes, and schedules interacting. Missing notifications usually come from this layering rather than from the application failing to send them.",
      ),

      heading("Moving Apps and Data to a New Device", 2),

      paragraph(
        "Applications transfer through the store account, but their data does not always follow. Content tied to a cloud account generally reappears after signing in, while purely local data requires a device backup or an in-app transfer process.",
      ),

      heading("Troubleshooting Mobile Applications", 2),

      paragraph(
        "A predictable sequence resolves most problems: force close, restart the device, check for an update, verify permissions and network access, clear the cache, and reinstall only if the data is safely stored elsewhere.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "App decisions depend on platform availability, permission requirements, storage cost, offline capability, whether data is portable to another service, and the subscription model behind the application.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific platforms, store procedures, permission settings, notification configuration, and application-level troubleshooting.",
      ),
    ]),
  },

  {
    slug: "printers-scanners",

    description:
      "Understand printers, scanners, drivers, connectivity, print quality, consumables, and document digitization.",

    content: richContent([
      paragraph(
        "Printing sits at the boundary between digital and physical, which is exactly why it causes such persistent trouble. A print job passes through an application, a driver, a spooler, a network connection, and the printer's own firmware before any ink reaches paper.",
      ),

      paragraph(
        "Scanning reverses the journey, converting a physical page into an image or a searchable document. Both processes involve compatibility, configuration, and consumables in ways that are rarely obvious until something goes wrong.",
      ),

      heading('What "Printers & Scanners" Actually Covers', 2),

      paragraph(
        "This category covers printing and scanning hardware along with the software that drives them. It includes printer types, connection methods, drivers, print settings, quality problems, consumables, scanning workflows, and document handling.",
      ),

      heading("The Main Printer Types", 2),

      bulletList([
        "Inkjet printers, versatile and strong for photographs",
        "Laser printers, fast and economical for high text volume",
        "All-in-one units combining printing, scanning and copying",
        "Ink tank printers with refillable reservoirs",
        "Label, photo and other specialty printers",
      ]),

      paragraph(
        "Inkjet technology sprays liquid ink and handles colour and photographs well, but ink can dry in the nozzles when the printer is used infrequently. Laser technology fuses toner powder, offering lower running costs and better reliability for occasional use.",
      ),

      heading("Connections and Drivers", 2),

      paragraph(
        "Printers connect through USB, wired networks, Wi-Fi, or direct wireless modes. Network connections allow sharing between devices but introduce the possibility of a printer disappearing when its address changes.",
      ),

      paragraph(
        "A driver translates a document into instructions the printer understands. Most modern systems include generic drivers that cover basic printing, while manufacturer drivers unlock full features such as duplexing, trays, and colour management.",
      ),

      heading("Common Printing Problems", 2),

      bulletList([
        "The printer appears offline despite being powered on",
        "Jobs accumulate in the queue without printing",
        "Output is faded, streaked or shows missing colours",
        "Pages jam or feed multiple sheets at once",
        "Wireless connection is lost after a router change",
        "Margins, scaling or orientation differ from the preview",
      ]),

      paragraph(
        "A useful first step is determining whether the problem is in the queue, the connection, or the hardware. Printing a test page directly from the printer separates hardware faults from software and network issues immediately.",
      ),

      heading("Print Quality and Settings", 2),

      paragraph(
        "Quality depends on resolution settings, paper type, colour profile, and the condition of the print head or toner. Selecting the correct paper type matters more than most people expect, because it changes how much ink is applied and how it is dried.",
      ),

      heading("Consumables and Running Costs", 2),

      paragraph(
        "The purchase price of a printer often has little relationship to its total cost. Cartridge yield, page coverage, replacement pricing, and whether the printer accepts third-party supplies determine what printing actually costs over several years.",
      ),

      heading("Scanning and Document Digitization", 2),

      paragraph(
        "Scanning produces either an image or a document, and resolution determines detail and file size. Text documents rarely benefit from very high resolution, while photographs and archival material do.",
      ),

      paragraph(
        "Optical character recognition converts scanned text into selectable and searchable content. Accuracy depends on scan quality, contrast, and the clarity of the original, which makes a good scan more valuable than heavy processing afterwards.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Printer choice depends on monthly volume, colour requirements, photograph quality needs, how often the printer sits idle, scanning needs, available space, network requirements, and long-term consumable costs.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover setup procedures, driver installation, wireless configuration, quality troubleshooting, and scanning workflows in practical detail.",
      ),
    ]),
  },

  {
    slug: "smart-home-iot",

    description:
      "Understand smart home devices, hubs, voice assistants, automation, connectivity standards, and connected-device security.",

    content: richContent([
      paragraph(
        "A smart home is a small network of specialized computers. Lights, plugs, locks, thermostats, cameras, speakers, and sensors each run software, connect to a network, and respond to instructions from an application or a voice assistant.",
      ),

      paragraph(
        "The difficulty is rarely any single device. It is the combination: multiple brands, several wireless protocols, different applications, and an assistant platform that may or may not support everything in the house.",
      ),

      heading('What "Smart Home & IoT" Actually Covers', 2),

      paragraph(
        "This category covers connected devices in the home, the hubs and platforms that coordinate them, the wireless standards they use, the automations that make them useful, and the security considerations they introduce.",
      ),

      heading("The Main Device Categories", 2),

      bulletList([
        "Smart lighting and switches",
        "Smart plugs and energy monitoring",
        "Thermostats and climate control",
        "Locks, doorbells and security cameras",
        "Speakers, displays and voice assistants",
        "Sensors for motion, contact, temperature and water",
        "Appliances and entertainment devices",
      ]),

      heading("Connectivity Standards", 2),

      paragraph(
        "Smart devices use several different wireless technologies. Some connect directly to Wi-Fi, some use low-power mesh protocols that require a hub, and some use Bluetooth for setup or short-range control.",
      ),

      paragraph(
        "Mesh protocols consume less power and relay messages between devices, which improves reliability across a large home. Wi-Fi devices avoid the need for a hub but add to the load on the router and depend entirely on it.",
      ),

      heading("Hubs, Platforms and Ecosystems", 2),

      paragraph(
        "A hub or platform coordinates devices from different manufacturers, providing a single application and a common automation engine. Without one, each brand tends to require its own application and its own rules.",
      ),

      paragraph(
        "Cross-platform standards have improved interoperability, but support varies by device and by firmware version. Checking compatibility with an existing platform before buying prevents the most common frustration in this category.",
      ),

      heading("Automations and Routines", 2),

      paragraph(
        "Automation is what separates a smart home from a collection of remote controls. Rules based on time, presence, sensor readings, or device state allow the house to respond without anyone opening an application.",
      ),

      bulletList([
        "Start with a small number of automations that solve real annoyances",
        "Keep a manual control path for every automated device",
        "Consider what happens when the internet or the hub is unavailable",
        "Avoid rules that can trigger each other in loops",
      ]),

      heading("Reliability and Network Design", 2),

      paragraph(
        "Smart homes fail in ways that ordinary devices do not, usually because of network problems rather than hardware faults. Router capacity, address assignment, Wi-Fi band selection, and firmware currency all influence day-to-day reliability.",
      ),

      heading("Privacy and Security", 2),

      paragraph(
        "Connected devices collect data and provide potential entry points into a home network. Cameras, microphones, and locks warrant particular care because the consequences of compromise are physical as well as digital.",
      ),

      paragraph(
        "Practical protection includes unique account passwords, two-factor authentication, current firmware, disabling unused remote access, and placing untrusted devices on a separate network segment.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Smart home decisions depend on the existing ecosystem, whether local control matters when the internet is down, the size and construction of the home, privacy expectations, whether a hub is acceptable, and long-term manufacturer support.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific device types, platform setup, automation configuration, connectivity troubleshooting, and security hardening for connected devices.",
      ),
    ]),
  },

  {
    slug: "photos-media",

    description:
      "Understand photo libraries, image formats, editing, video files, backups, and how media is organized and shared.",

    content: richContent([
      paragraph(
        "Photographs and video are the most irreplaceable files most people own. Documents can often be recreated and software can be reinstalled, but a photograph taken at a particular moment cannot be produced again.",
      ),

      paragraph(
        "That makes organization, format choice, and backup unusually important. Media files are also the largest consumers of storage, which is why libraries outgrow devices and services faster than anything else.",
      ),

      heading('What "Photos & Media" Actually Covers', 2),

      paragraph(
        "This category covers capturing, storing, organizing, editing, converting, sharing, and backing up images and video. It includes photo libraries and applications, file formats, metadata, editing workflows, and media transfer between devices.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Photo libraries and organization",
        "Image formats and compression",
        "Editing, filters and adjustments",
        "Video files, resolution and codecs",
        "Metadata, dates and location data",
        "Sharing, albums and permissions",
        "Backups, syncing and recovery",
        "Transfers between phones, computers and drives",
      ]),

      heading("Image Formats and Quality", 2),

      paragraph(
        "Formats differ in compression, colour depth, transparency support, and how much information is preserved. Lossy formats discard detail to reduce size, while lossless formats keep everything at the cost of larger files.",
      ),

      paragraph(
        "Editing a lossy image repeatedly compounds quality loss with each save. Keeping an original untouched and exporting copies for sharing preserves the ability to re-edit later without accumulating damage.",
      ),

      heading("Raw Files and Processed Images", 2),

      paragraph(
        "Raw files store sensor data with minimal processing, allowing much greater flexibility in adjusting exposure, white balance, and colour afterwards. They require more storage and specific software, while processed formats are ready to view and share immediately.",
      ),

      heading("Metadata and Why It Matters", 2),

      paragraph(
        "Images carry embedded information including capture date, camera settings, and often location. This data powers search, sorting, and automatic albums, but it also travels with the file when it is shared.",
      ),

      bulletList([
        "Correct dates keep chronological sorting reliable",
        "Location data may need removing before public sharing",
        "Tags, faces and albums improve retrieval in large libraries",
        "Metadata can be lost when files pass through some services",
      ]),

      heading("Video Files, Resolution and Codecs", 2),

      paragraph(
        "A video file is a container holding video and audio streams encoded with particular codecs. Playback problems are usually codec-related rather than file corruption, which is why a video may open in one player but not another.",
      ),

      paragraph(
        "Resolution, frame rate, and bit rate together determine both quality and size. Higher efficiency codecs reduce size considerably but demand more processing power to encode and decode.",
      ),

      heading("Organizing a Growing Library", 2),

      paragraph(
        "Libraries become unmanageable when nothing is deleted and nothing is structured. A workable approach reviews new material periodically, removes duplicates and obvious failures, and relies on dates, albums, and tags rather than folder depth.",
      ),

      heading("Backup and the Cost of Losing Media", 2),

      paragraph(
        "Because photographs cannot be recreated, they deserve more than a single copy. Multiple copies, at least one stored separately from the others, and an occasional check that restoration actually works provide meaningful protection.",
      ),

      paragraph(
        "Synchronized libraries are convenient but are not a backup by themselves. A deletion or an accidental edit propagates to every synced device unless separate version history or an independent copy exists.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Media decisions depend on library size, quality requirements, how much editing is expected, available storage and budget, sharing needs, privacy considerations, and how long the collection must remain accessible.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific applications, conversion tasks, editing procedures, transfer methods, and recovery steps for images and video.",
      ),
    ]),
  },

  {
    slug: "troubleshooting-everyday-tech",

    description:
      "Understand systematic diagnosis, common failure patterns, and practical fixes for the technology problems people meet most often.",

    content: richContent([
      paragraph(
        "Most technology problems are not unique. They repeat across devices, platforms, and years, and they respond to a small set of diagnostic habits far more reliably than to any specific fix found online.",
      ),

      paragraph(
        "The difference between frustrating troubleshooting and efficient troubleshooting is usually method. Isolating variables one at a time turns a vague failure into a specific cause, and a specific cause almost always has a known solution.",
      ),

      heading('What "Troubleshooting & Everyday Tech" Actually Covers', 2),

      paragraph(
        "This category covers the cross-cutting problems that do not belong neatly to a single product: devices that will not start, connections that drop, applications that freeze, files that will not open, and equipment that behaves differently than it did yesterday.",
      ),

      heading("A Method That Works Across Almost Everything", 2),

      bulletList([
        "Describe the problem precisely, including when it started",
        "Identify what changed most recently",
        "Determine whether it affects one device, one application or everything",
        "Restart the smallest component first, then work outward",
        "Change one variable at a time and observe the result",
        "Check for updates to software, drivers and firmware",
        "Test with a different device, network or account to isolate the cause",
      ]),

      paragraph(
        "The isolation step matters most. If a problem follows the account, it is account-related. If it follows the device, it is local. If it follows the network, the connection is responsible. That single distinction eliminates most possibilities immediately.",
      ),

      heading("Why Restarting Genuinely Helps", 2),

      paragraph(
        "A restart clears accumulated state: stale memory, stuck processes, exhausted temporary resources, and connections that were never released. It is not a superstition, it is a reset of everything that has drifted since the system last started cleanly.",
      ),

      heading("Common Failure Patterns", 2),

      paragraph(
        "A large share of everyday problems come from a short list of causes that appear repeatedly across completely different products.",
      ),

      bulletList([
        "A recent update changed behaviour or compatibility",
        "Storage is full, preventing normal operation",
        "A cable, port or power source has failed",
        "Permissions were revoked or never granted",
        "A background process is consuming resources",
        "Heat is causing throttling or shutdown",
        "An account session expired or credentials changed",
      ]),

      heading("Devices That Will Not Power On", 2),

      paragraph(
        "Power problems should be approached from the wall inward: the outlet, the adapter, the cable, the connector, the battery, and finally the device. Testing each element separately is faster than assuming the most expensive component failed first.",
      ),

      heading("Slow Performance", 2),

      paragraph(
        "Slowness is rarely one problem. Full storage, insufficient memory, background activity, thermal limits, aging batteries, and heavier modern software typically combine, which is why addressing a single factor often produces only partial improvement.",
      ),

      heading("Knowing When to Stop", 2),

      paragraph(
        "Some problems are not worth pursuing personally. Physical damage, liquid exposure, suspected data loss, warranty-covered failures, and anything involving compromised financial accounts are usually better handled by a professional or the provider directly.",
      ),

      paragraph(
        "When data is at risk, the first action should be preserving it rather than continuing to experiment. Repeated attempts on a failing drive can turn a recoverable situation into a permanent loss.",
      ),

      heading("Preventing Repeat Problems", 2),

      paragraph(
        "Current backups, controlled update timing, adequate free storage, clean ventilation, sensible power protection, and documented account recovery details prevent the majority of situations that eventually require troubleshooting at all.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below apply this method to specific situations, covering startup failures, connectivity problems, application crashes, error messages, and hardware faults in practical step-by-step detail.",
      ),
    ]),
  },

  {
    slug: "online-services-platforms",

    description:
      "Understand web services, SaaS platforms, integrations, APIs, account management, and how online tools connect together.",

    content: richContent([
      paragraph(
        "A large part of modern computing no longer runs on a personal device. It runs on services accessed through a browser or an application, with data stored remotely, features delivered continuously, and access controlled by an account.",
      ),

      paragraph(
        "That shift changes what matters. Performance depends on connectivity, capability depends on a plan, continuity depends on a provider, and the most important practical question becomes how easily information can be moved somewhere else.",
      ),

      heading('What "Online Services & Platforms" Actually Covers', 2),

      paragraph(
        "This category covers services delivered over the internet rather than installed locally. It includes web applications, business platforms, government and utility portals, marketplaces, and the integrations that connect them to each other.",
      ),

      heading("The Main Areas This Category Includes", 2),

      bulletList([
        "Web applications and software-as-a-service platforms",
        "Account access, roles and team permissions",
        "Plans, limits and usage quotas",
        "Integrations, connected apps and automation",
        "APIs and data exchange between services",
        "Service outages, status pages and reliability",
        "Data export, portability and migration",
        "Onboarding, configuration and administration",
      ]),

      heading("How Online Platforms Are Structured", 2),

      paragraph(
        "Most platforms separate an organization or workspace from the individual users inside it. The workspace holds data, billing, and settings, while users hold roles that determine what each person can see and change.",
      ),

      paragraph(
        "This structure explains frequent confusion. A user can have a valid account yet no access, because permission belongs to the workspace rather than to the individual, and because ownership of the workspace is a separate matter from membership in it.",
      ),

      heading("Plans, Limits and Quotas", 2),

      paragraph(
        "Platforms restrict usage through seats, storage, requests, projects, or feature availability. Limits are often enforced gradually, with warnings before restriction, which is why a service can begin behaving differently without any visible change in settings.",
      ),

      heading("Integrations and Connected Applications", 2),

      paragraph(
        "Integrations allow one service to act on behalf of a user in another. Authorization is granted through a permission scope, which should be reviewed because these connections often remain active long after the reason for creating them has passed.",
      ),

      bulletList([
        "Review connected applications periodically and revoke unused access",
        "Prefer the narrowest permission scope a tool can work with",
        "Note which integrations hold write access rather than read only",
        "Understand what breaks if a connection is removed",
      ]),

      heading("APIs and Data Exchange", 2),

      paragraph(
        "An API is a defined way for software to request data or actions from a service. It matters even to non-developers, because API availability determines whether data can be automated, exported, or moved to another platform later.",
      ),

      heading("Outages and Reliability", 2),

      paragraph(
        "When a service is unreachable, the first step is distinguishing a provider outage from a local problem. Status pages, independent outage trackers, and testing on another network or device separate the two quickly.",
      ),

      paragraph(
        "Providers publish availability commitments, but these describe expected uptime rather than guaranteeing it. Work that cannot tolerate interruption needs a local fallback regardless of the commitment offered.",
      ),

      heading("Data Portability and Leaving a Platform", 2),

      paragraph(
        "The most important question about any platform is how information leaves it. Export formats, completeness of exports, retention after cancellation, and whether relationships between records survive the export all determine how difficult migration will be.",
      ),

      heading("The Variables That Shape Your Decision", 2),

      paragraph(
        "Platform decisions depend on team size, required integrations, data sensitivity, regulatory requirements, offline needs, total cost as usage grows, export capability, and the provider's stability over time.",
      ),

      heading("Where the Detailed Guides Begin", 2),

      paragraph(
        "The subcategories below cover specific platforms and tasks, from account and permission configuration to integration setup, usage limits, outage handling, and data migration.",
      ),
    ]),
  },
];

const categoryNames = {
  "accounts-subscriptions": "Accounts & Subscriptions",
  "computers-operating-systems": "Computers & Operating Systems",
  "devices-hardware": "Devices & Hardware",
  "email-communication": "Email & Communication",
  "files-data-cloud-storage": "Files, Data & Cloud Storage",
  gaming: "Gaming",
  "internet-networking": "Internet & Networking",
  "payments-billing-commerce": "Payments, Billing & Commerce",
  "productivity-office-tools": "Productivity & Office Tools",
  "security-privacy": "Security & Privacy",
  "social-media": "Social Media",
  "software-app-operations": "Software & App Operations",
  "streaming-entertainment": "Streaming & Entertainment",
  "web-development-design": "Web Development & Design",
  "mobile-apps": "Mobile Apps",
  "printers-scanners": "Printers & Scanners",
  "smart-home-iot": "Smart Home & IoT",
  "photos-media": "Photos & Media",
  "troubleshooting-everyday-tech": "Troubleshooting & Everyday Tech",
  "online-services-platforms": "Online Services & Platforms",
};

const seedContent = async () => {
  try {
    await connectDB();

    console.log("\n========================================");
    console.log("DigiWork CATEGORY SEED");
    console.log("========================================\n");

    let created = 0;
    let updated = 0;

    for (let index = 0; index < categoryContent.length; index++) {
      const item = categoryContent[index];
      const name = categoryNames[item.slug];

      if (!name) {
        console.warn(`⚠️  No name mapped for slug: ${item.slug} — skipped`);
        continue;
      }

      const existing =
        (await Category.findOne({ slug: item.slug }).lean()) ||
        (await Category.findOne({ name }).lean());

      const update = {
        $set: {
          name,
          slug: item.slug,
          description: item.description,
          content: item.content,
          status: "published",
          isActive: true,
          order: index + 1,
        },
      };

      const category = existing
        ? await Category.findByIdAndUpdate(existing._id, update, {
            new: true,
            runValidators: true,
          })
        : await Category.findOneAndUpdate(
            { slug: item.slug },
            update,
            {
              new: true,
              upsert: true,
              runValidators: true,
              setDefaultsOnInsert: true,
            },
          );

      if (existing) {
        updated++;
        console.log(`↻ Updated : ${category.name}`);
      } else {
        created++;
        console.log(`✚ Created : ${category.name}`);
      }
    }

    console.log("\n========================================");
    console.log("CATEGORY SEED COMPLETED");
    console.log("========================================");
    console.log(`Total      : ${categoryContent.length}`);
    console.log(`Created    : ${created}`);
    console.log(`Updated    : ${updated}`);
    console.log("\nOpen: http://localhost:5173/devices-hardware");
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Category seed failed");
    console.error(error);
    process.exit(1);
  }
};

seedContent();
