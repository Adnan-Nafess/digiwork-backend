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

const subCategoryContent = [
  {
    slug: "account-settings",
    parentSlug: "accounts-subscriptions",

    description:
      "Manage profile details, sign-in options, connected devices, notification preferences, and the settings that control an account.",

    content: richContent([
      paragraph(
        "Account settings are the control panel of a digital identity. They determine how a service recognizes a person, how it contacts them, which devices are trusted, and what other applications are allowed to act on their behalf."
      ),

      paragraph(
        "Most people configure these settings once during signup and never revisit them. That is precisely why so many problems appear later: an old phone number, a forgotten connected app, or a stale recovery address quietly becomes the reason access cannot be restored."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section deals with the configuration of an existing account rather than creating or deleting one. It covers identity details, contact information, sign-in options, sessions, linked services, and preferences that shape everyday use."
      ),

      bulletList([
        "Name, username, profile photo and display details",
        "Email address and phone number changes",
        "Sign-in methods and trusted devices",
        "Active sessions and where the account is logged in",
        "Connected applications and third-party access",
        "Notification and communication preferences",
        "Language, region and accessibility options",
      ]),

      heading("Contact Details Are the Most Important Setting", 2),

      paragraph(
        "The email address and phone number attached to an account are not just contact details, they are the recovery path. Changing a number or losing access to an old inbox without updating the account first is the single most common cause of permanent lockout."
      ),

      paragraph(
        "Most services require verification of a new address before it becomes active, and some enforce a waiting period during which the old details remain valid. Making these changes while access is still working is far easier than doing it under pressure."
      ),

      heading("Sessions and Connected Devices", 2),

      paragraph(
        "Services keep a list of devices and browsers currently signed in. Reviewing that list occasionally reveals old phones, shared computers, and browsers that were never signed out, each of which remains a live entry point into the account."
      ),

      paragraph(
        "Signing out of all sessions is a useful action after changing a password, after selling a device, or whenever something appears unfamiliar. It forces every device to authenticate again with the new credentials."
      ),

      heading("Connected Applications and Permissions", 2),

      paragraph(
        "Third-party applications often request ongoing access to an account. That access usually persists until it is explicitly revoked, long after the tool has stopped being used, which makes periodic review worthwhile."
      ),

      heading("Changing a Username or Primary Identifier", 2),

      paragraph(
        "Some services allow a username to change freely, some allow it rarely, and some tie the account permanently to its original identifier. Where a username appears publicly, changing it may also break existing links, mentions, or shared references."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Verification codes not arriving at an updated address",
        "A change blocked by a cooling-off period after recent activity",
        "Settings that differ between the mobile app and the web interface",
        "Preferences that reset after a major platform update",
        "Two accounts created accidentally with similar details",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles in this subcategory walk through specific settings changes step by step, including updating contact details, reviewing sessions, managing connected applications, and adjusting preferences on individual services."
      ),
    ]),
  },

  {
    slug: "subscriptions",
    parentSlug: "accounts-subscriptions",

    description:
      "Manage plans, trials, renewals, upgrades, cancellations, and the billing behaviour behind recurring digital services.",

    content: richContent([
      paragraph(
        "A subscription is an agreement that renews automatically until something stops it. That simple mechanism is the source of most billing surprises, because the default behaviour is continuation rather than expiry."
      ),

      paragraph(
        "Managing subscriptions well is mostly about knowing three things: what the plan includes, when it renews, and where it was purchased. Those three details answer the majority of questions people have about recurring charges."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the lifecycle of a subscription from trial through renewal, change, and cancellation. It includes plan comparison, billing cycles, proration, pausing, and what happens to content and settings after a plan ends."
      ),

      bulletList([
        "Free trials and introductory offers",
        "Plan tiers and what each includes",
        "Billing cycles, renewal dates and reminders",
        "Upgrades, downgrades and proration",
        "Pausing versus cancelling",
        "Cancellation and end-of-access behaviour",
        "Family, shared and multi-seat plans",
      ]),

      heading("Where a Subscription Was Purchased Matters Most", 2),

      paragraph(
        "The same service can be bought directly from its website, through a mobile app store, through a device manufacturer, or bundled with another product. Billing is managed wherever the purchase was made, not necessarily inside the service itself."
      ),

      paragraph(
        "This is why cancelling inside an application sometimes has no effect on the charge. The service ends the entitlement on its side while the store continues to bill, because the store holds the actual subscription record."
      ),

      heading("Trials and the Moment They Convert", 2),

      paragraph(
        "A trial generally converts automatically unless cancelled beforehand. Cancelling during a trial usually preserves access until the trial period ends, so there is rarely a reason to wait until the final day."
      ),

      heading("Changing Plans Mid-Cycle", 2),

      paragraph(
        "Upgrades often take effect immediately with a prorated charge for the remainder of the period, while downgrades frequently apply only at the next renewal. This asymmetry explains invoices that show a partial charge, a credit, and a new amount together."
      ),

      heading("What Happens After Cancellation", 2),

      paragraph(
        "Cancellation stops future billing but does not automatically delete the account or its data. Some services retain content for a grace period in case the subscription is restored, while others remove downloads, cloud storage, or premium features immediately."
      ),

      bulletList([
        "Access may continue until the end of the paid period",
        "Downloaded or offline content often stops working right away",
        "Stored files above a free tier limit may become read-only",
        "History, playlists and settings are usually kept for a while",
        "Reactivating later may not restore the original price",
      ]),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A charge appearing after cancelling in the wrong place",
        "An unfamiliar name on a bank statement",
        "A renewal date that differs from the expected day",
        "Regional price changes applied at renewal",
        "A shared plan continuing to bill the original owner",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover cancelling and changing plans on specific services, finding renewal dates, understanding charges, and managing shared or family subscriptions."
      ),
    ]),
  },

  {
    slug: "passwords-recovery",
    parentSlug: "accounts-subscriptions",

    description:
      "Reset forgotten passwords, recover locked accounts, set up recovery options, and regain access safely.",

    content: richContent([
      paragraph(
        "Losing access to an account is rarely about forgetting a password. It is about not being able to prove ownership, which is a different and much harder problem to solve once it has already happened."
      ),

      paragraph(
        "Recovery systems exist to verify identity without a password, and they can only use information that was provided earlier. Everything that makes recovery possible has to be in place before it is needed."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers resetting passwords, recovering accounts after lockout, configuring recovery options, and responding when recovery details themselves have been lost or changed by someone else."
      ),

      bulletList([
        "Password resets through email or phone",
        "Recovery email addresses and phone numbers",
        "Backup codes and their storage",
        "Security questions and identity verification",
        "Locked, suspended and disabled accounts",
        "Recovering an account after a compromise",
      ]),

      heading("How Password Reset Actually Works", 2),

      paragraph(
        "A reset sends a time-limited link or code to a verified contact method. The service is not confirming who a person is, only that they control that inbox or phone number, which is why the contact method is effectively the real key to the account."
      ),

      paragraph(
        "Reset links expire quickly and are usually single use. Requesting several resets in a row can invalidate earlier links, which is a frequent cause of codes that appear not to work."
      ),

      heading("When Recovery Options Are Unavailable", 2),

      paragraph(
        "Without access to the recovery email or phone, most services fall back to a manual review process. This may involve prior account details, past activity, purchase records, or identity documents, and outcomes are not guaranteed."
      ),

      paragraph(
        "These reviews take time and depend on accuracy rather than persistence. Submitting repeated requests with inconsistent information generally makes the outcome less likely rather than more."
      ),

      heading("Setting Up Recovery Before It Is Needed", 2),

      bulletList([
        "Add a recovery email hosted somewhere other than the main account",
        "Keep the phone number current, especially after changing carriers",
        "Generate and store backup codes outside the account itself",
        "Register more than one authentication method where possible",
        "Note which sign-in method was originally used at signup",
      ]),

      heading("Choosing a Password That Actually Helps", 2),

      paragraph(
        "Length and uniqueness matter far more than complicated character substitutions. A long passphrase that is used nowhere else resists both guessing and the automated reuse attacks that follow every large data breach."
      ),

      paragraph(
        "A password manager removes the need to remember any of them, which is what makes uniqueness practical across dozens of accounts rather than only the important ones."
      ),

      heading("Recovering After a Compromise", 2),

      paragraph(
        "When someone else has gained access, the order of actions matters. Regain control first, then change the password, revoke active sessions and connected applications, restore recovery details, and enable a second authentication factor before anything else."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover reset procedures for specific services, recovery form submission, backup code management, and the steps to take after unauthorized access."
      ),
    ]),
  },

  {
    slug: "windows",
    parentSlug: "computers-operating-systems",

    description:
      "Configure, maintain and troubleshoot Windows, including updates, settings, accounts, drivers, storage and performance.",

    content: richContent([
      paragraph(
        "Windows runs on hardware from an enormous number of manufacturers, which is both its greatest strength and the source of most of its complexity. The same version behaves differently depending on drivers, firmware, and preinstalled software."
      ),

      paragraph(
        "Because of that variety, Windows troubleshooting usually means identifying which layer is responsible: the operating system itself, a driver, an application, or the hardware underneath."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers everyday Windows use and maintenance, including system settings, updates, user accounts, drivers, storage management, startup behaviour, and the built-in tools that diagnose problems."
      ),

      bulletList([
        "Settings, Control Panel and system configuration",
        "Windows Update and feature updates",
        "User accounts, sign-in options and permissions",
        "Drivers, devices and hardware recognition",
        "Storage cleanup and disk management",
        "Startup programs and background processes",
        "Recovery, reset and system restore",
      ]),

      heading("Updates and Update Problems", 2),

      paragraph(
        "Windows delivers monthly quality updates and less frequent feature updates. Quality updates change little that is visible, while feature updates can alter the interface, reset some preferences, and occasionally reintroduce driver issues."
      ),

      paragraph(
        "Updates that fail repeatedly usually stem from insufficient free space, a corrupted update cache, or a driver conflict. Clearing the update components and ensuring adequate space resolves the majority of these cases."
      ),

      heading("Drivers and Hardware Recognition", 2),

      paragraph(
        "A driver lets Windows communicate with a piece of hardware. Generic drivers provide basic functionality, while manufacturer drivers enable full features such as advanced graphics settings, touchpad gestures, or audio processing."
      ),

      paragraph(
        "When a device behaves oddly rather than failing completely, the driver is a likely cause. Reinstalling from the manufacturer rather than relying on automatic installation often resolves persistent issues."
      ),

      heading("Storage and Disk Space", 2),

      paragraph(
        "System space is consumed by temporary files, update packages, restore points, hibernation files, and previous installation folders kept after a feature update. These can occupy many gigabytes without appearing in any visible folder."
      ),

      heading("Performance and Startup", 2),

      bulletList([
        "Too many applications launching automatically at sign-in",
        "Background services from preinstalled manufacturer software",
        "A nearly full system drive limiting normal operation",
        "Insufficient memory for the applications in use",
        "Outdated graphics or chipset drivers",
        "Thermal limits reducing sustained performance",
      ]),

      heading("Recovery Options", 2),

      paragraph(
        "Windows provides restore points, startup repair, reset options that keep or remove personal files, and full reinstallation from recovery media. These work best as a planned sequence, from least destructive to most, with a current backup in place first."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover specific Windows procedures, from settings changes and update repair to driver installation, storage cleanup, and system recovery."
      ),
    ]),
  },

  {
    slug: "macos",
    parentSlug: "computers-operating-systems",

    description:
      "Configure, maintain and troubleshoot macOS, including System Settings, updates, permissions, storage and application behaviour.",

    content: richContent([
      paragraph(
        "macOS runs on a narrow range of hardware designed alongside it, which makes behaviour more consistent than on open platforms. The trade-off is a stricter security model and fewer low-level configuration options."
      ),

      paragraph(
        "Most macOS difficulties involve permissions, storage, or the boundary between what the system allows an application to do and what the application expects to be able to do."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers system configuration, updates, user accounts, privacy permissions, storage management, application handling, and the recovery tools built into the platform."
      ),

      bulletList([
        "System Settings and system-wide preferences",
        "Software updates and major version upgrades",
        "Privacy and security permissions for applications",
        "User accounts, Touch ID and sign-in options",
        "Storage management and system data",
        "Installing, updating and removing applications",
        "Recovery mode, reinstallation and backups",
      ]),

      heading("Permissions and the Security Model", 2),

      paragraph(
        "macOS requires explicit approval before an application can access the camera, microphone, files, screen recording, accessibility control, or full disk contents. Applications that appear broken are frequently just missing one of these approvals."
      ),

      paragraph(
        "Permissions granted to an application do not always carry over after it is updated or moved, which is why a previously working tool can suddenly stop functioning after an upgrade."
      ),

      heading("Updates and Version Upgrades", 2),

      paragraph(
        "Minor updates deliver security and bug fixes with minimal disruption. Major version upgrades change the system substantially and may drop support for older hardware or applications, so checking compatibility beforehand avoids unpleasant surprises."
      ),

      heading("Storage and System Data", 2),

      paragraph(
        "A large and vaguely labelled system category often appears in storage reports. It typically contains caches, local snapshots from the backup system, logs, and temporary files, much of which the system reclaims automatically when space runs low."
      ),

      heading("Applications and Installation", 2),

      paragraph(
        "Applications arrive from the store, from downloaded disk images, or from installer packages. The source affects update behaviour and removal, and dragging an application to the trash does not always remove its supporting files."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "An application blocked because of its developer verification status",
        "Missing permissions causing silent failures",
        "Storage that will not free up despite deleting files",
        "External drives not mounting or ejecting incorrectly",
        "Performance issues after a major version upgrade",
      ]),

      heading("Recovery and Reinstallation", 2),

      paragraph(
        "Recovery mode provides disk repair, restoration from a backup, and reinstallation of the operating system. A current backup makes reinstalling a routine step rather than a last resort."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover specific macOS tasks, including settings changes, permission configuration, storage cleanup, application management, and recovery procedures."
      ),
    ]),
  },

  {
    slug: "system-settings",
    parentSlug: "computers-operating-systems",

    description:
      "Understand display, sound, power, language, accessibility, default applications, and the settings that shape daily computer use.",

    content: richContent([
      paragraph(
        "System settings decide how a computer feels to use. Display scaling, power behaviour, default applications, input configuration, and accessibility options affect every single session, yet most remain at whatever the manufacturer chose."
      ),

      paragraph(
        "Adjusting a small number of them deliberately often produces a larger improvement in daily comfort than any hardware upgrade would."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the configuration layer that sits above the operating system's internals: what is shown, how input is handled, how power is managed, and which applications handle which file types."
      ),

      bulletList([
        "Display resolution, scaling, refresh rate and multiple monitors",
        "Sound output, input devices and per-application volume",
        "Power, sleep, battery and performance modes",
        "Keyboard, mouse and trackpad behaviour",
        "Language, region, date and keyboard layouts",
        "Default applications and file associations",
        "Accessibility options",
      ]),

      heading("Displays and Scaling", 2),

      paragraph(
        "Resolution defines how many pixels a display has, while scaling defines how large interface elements appear. High-resolution screens usually require scaling to remain readable, and mismatched scaling across multiple monitors is a common source of blurry or oddly sized windows."
      ),

      paragraph(
        "Refresh rate affects perceived smoothness and often defaults to a lower value than the display supports, particularly when connected through an adapter or a cable that cannot carry the required bandwidth."
      ),

      heading("Power and Sleep Behaviour", 2),

      paragraph(
        "Power settings control when a display turns off, when the system sleeps, and how aggressively performance is limited on battery. Devices that wake unexpectedly or fail to sleep are usually being kept awake by a background task or a connected peripheral."
      ),

      heading("Default Applications", 2),

      paragraph(
        "File associations decide which program opens each file type. These are frequently changed silently by newly installed software, which is why a familiar file suddenly opens in an unexpected application."
      ),

      heading("Language, Region and Input", 2),

      paragraph(
        "Region settings influence date formats, number separators, currency display, and sometimes available features. Keyboard layout is separate from display language, and an unintended layout switch is the usual explanation for characters appearing incorrectly."
      ),

      heading("Accessibility Options", 2),

      paragraph(
        "Accessibility settings include text size, contrast, cursor visibility, screen readers, captions, reduced motion, and alternative input methods. Many of them are useful well beyond their original purpose, particularly on small or high-resolution displays."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "An external monitor running at the wrong resolution or refresh rate",
        "Audio playing through the wrong output device",
        "A laptop not sleeping or waking on its own",
        "File types opening in the wrong application",
        "Keyboard layout changing after an update",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover individual settings changes on each platform, with step-by-step instructions for displays, audio, power, defaults, and accessibility."
      ),
    ]),
  },

  {
    slug: "smartphones",
    parentSlug: "devices-hardware",

    description:
      "Understand smartphone hardware, battery, storage, cameras, connectivity, and how to set up, maintain and troubleshoot a phone.",

    content: richContent([
      paragraph(
        "A smartphone packs a processor, memory, storage, several radios, multiple cameras, a battery, and a dozen sensors into a device designed to survive being carried everywhere. Every component is a compromise between performance, size, heat, and battery life."
      ),

      paragraph(
        "Those compromises explain most phone behaviour: why performance drops when the device is hot, why battery life changes over time, and why storage fills up far faster than the numbers suggest."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the phone as a device rather than the applications running on it. It includes hardware capability, battery and charging, storage, cameras, connectivity, setup, transfers, and physical maintenance."
      ),

      bulletList([
        "Setup, transfers and moving to a new phone",
        "Battery health, charging and power management",
        "Storage capacity and what consumes it",
        "Cameras, sensors and image processing",
        "Mobile data, Wi-Fi, Bluetooth and NFC",
        "Screens, protection and physical durability",
        "Performance, heat and slowdowns",
      ]),

      heading("Battery and Charging", 2),

      paragraph(
        "Lithium batteries degrade with charge cycles, heat, and time. Capacity declines gradually, which is usually noticed as shorter runtime and sometimes as unexpected shutdowns when the remaining capacity cannot sustain demand."
      ),

      bulletList([
        "Heat during charging accelerates long-term degradation",
        "Staying at very high or very low charge for long periods is harder on the cell",
        "Fast charging is generally safe but generates more heat",
        "Battery health indicators show capacity relative to when new",
        "Background activity often matters more than screen time",
      ]),

      heading("Storage and Why It Fills Up", 2),

      paragraph(
        "Advertised storage is always larger than usable storage, because the operating system and preinstalled applications occupy a portion of it. Photographs, videos, message attachments, application caches, and offline downloads then accumulate steadily."
      ),

      paragraph(
        "Messaging applications are frequently the largest consumer, since received media is stored locally by default and rarely reviewed or cleared."
      ),

      heading("Cameras and Image Quality", 2),

      paragraph(
        "Phone photography depends as much on processing as on the sensor. Multiple lenses cover different focal lengths, and computational techniques combine several exposures to manage dynamic range, low light, and motion."
      ),

      heading("Connectivity", 2),

      paragraph(
        "A phone contains separate radios for cellular, Wi-Fi, Bluetooth, satellite positioning, and short-range communication. Connectivity problems are usually specific to one radio, which makes testing each independently the fastest path to a diagnosis."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Battery draining faster after a system update",
        "Storage full despite few visible files",
        "Charging slowly or not at all with a particular cable",
        "Overheating during camera use or navigation",
        "Wi-Fi connecting but showing no internet access",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover setup and transfer procedures, battery and storage management, camera settings, connectivity fixes, and hardware troubleshooting for specific phones."
      ),
    ]),
  },

  {
    slug: "laptops",
    parentSlug: "devices-hardware",

    description:
      "Understand laptop components, battery life, thermals, ports, upgrades, and how to choose, maintain and repair a portable computer.",

    content: richContent([
      paragraph(
        "A laptop is a computer built around constraints. Everything inside it competes for the same limited space, power budget, and cooling capacity, which is why two machines with identical specifications can perform very differently in sustained use."
      ),

      paragraph(
        "Understanding those constraints makes both purchasing and troubleshooting clearer. Performance, noise, heat, and battery life are all consequences of the same set of design decisions."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers laptop hardware and its practical implications, including components, cooling, battery, displays, ports, expansion, maintenance, and common physical failures."
      ),

      bulletList([
        "Processors, memory and graphics options",
        "Storage types and capacity",
        "Displays, brightness and colour",
        "Battery life and charging standards",
        "Cooling, fan noise and thermal behaviour",
        "Ports, docks and external connections",
        "Keyboards, trackpads and hinges",
        "Upgrades, repairs and servicing",
      ]),

      heading("Why Sustained Performance Differs From Peak", 2),

      paragraph(
        "Processors run fast in short bursts and then settle to a lower level once heat accumulates. A thin machine with limited cooling may match a larger one briefly and then fall well behind during longer workloads such as exports or compilation."
      ),

      paragraph(
        "This is why benchmarks measured over a few seconds can be misleading, and why cooling design matters as much as the component names on the specification sheet."
      ),

      heading("Battery Life in Practice", 2),

      paragraph(
        "Advertised battery figures are measured under light conditions. Real runtime depends on screen brightness, refresh rate, background activity, connectivity, and whether a discrete graphics processor is engaged."
      ),

      heading("Ports, Docks and Charging Standards", 2),

      paragraph(
        "Modern laptops often rely on a small number of versatile ports. The same connector shape can support very different capabilities, and a cable or dock that lacks the required specification silently limits display resolution, data speed, or charging power."
      ),

      bulletList([
        "Check whether a port supports video output as well as data",
        "Confirm the charger's wattage meets the machine's requirement",
        "Cable quality affects display and data reliability",
        "Docks share bandwidth across all connected devices",
      ]),

      heading("Upgrades and Repairability", 2),

      paragraph(
        "Upgrade potential varies enormously. Some laptops allow memory and storage replacement, while others have everything soldered in place. Checking this before purchase determines whether the machine can be extended or must be replaced entirely."
      ),

      heading("Maintenance and Physical Care", 2),

      paragraph(
        "Dust accumulation in cooling vents is the most common cause of gradually worsening heat and fan noise. Keeping vents clear, avoiding soft surfaces that block airflow, and cleaning periodically extends both performance and lifespan."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Fans running loudly during light workloads",
        "Battery not charging beyond a certain percentage",
        "An external display not reaching full resolution or refresh rate",
        "Trackpad or keyboard becoming unresponsive",
        "The machine running hot and slowing under load",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover laptop selection, battery and thermal management, port and dock configuration, upgrade procedures, and repair guidance."
      ),
    ]),
  },

  {
    slug: "smart-tvs",
    parentSlug: "devices-hardware",

    description:
      "Understand smart TV panels, resolution, HDR, refresh rate, inputs, apps, and how to set up and troubleshoot a television.",

    content: richContent([
      paragraph(
        "A smart TV is a display with a computer attached. The panel determines image quality, while the built-in platform determines apps, updates, interface speed, and how long the set remains useful after the picture itself is still fine."
      ),

      paragraph(
        "Those two halves age at very different rates. A panel can remain excellent for a decade, while the software platform may stop receiving application updates much sooner."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers television hardware and setup, including panel technology, picture settings, inputs and connections, audio output, the smart platform, and common picture and connectivity problems."
      ),

      bulletList([
        "Panel types and how they differ",
        "Resolution, HDR and colour",
        "Refresh rate and motion handling",
        "HDMI inputs, cables and connected devices",
        "Audio output, soundbars and audio formats",
        "Smart platform, apps and updates",
        "Picture settings and calibration basics",
      ]),

      heading("Panel Technology", 2),

      paragraph(
        "Different panel technologies control light in different ways, which affects contrast, brightness, viewing angles, and behaviour in bright rooms. Self-emissive panels excel at contrast and black level, while backlit panels generally reach higher peak brightness."
      ),

      paragraph(
        "The right choice depends heavily on the room. A bright living room and a dark dedicated viewing space favour opposite strengths."
      ),

      heading("Resolution, HDR and What Actually Improves the Picture", 2),

      paragraph(
        "Beyond a certain screen size and viewing distance, additional resolution becomes difficult to perceive. Contrast, colour accuracy, and high dynamic range typically make a larger visible difference than pixel count alone."
      ),

      paragraph(
        "High dynamic range requires support from the content, the source device, the cable, and the television together. A weakness at any point silently drops the output back to standard range."
      ),

      heading("Inputs, Cables and Connected Devices", 2),

      paragraph(
        "HDMI ports on the same television are not always identical. Some support higher bandwidth, variable refresh rate, or enhanced audio return, and connecting a device to the wrong port is a frequent cause of missing features."
      ),

      bulletList([
        "Check which port supports the highest bandwidth",
        "Use a cable rated for the required resolution and refresh rate",
        "Enable enhanced input modes for gaming or high frame rate content",
        "Confirm audio return settings when using a soundbar or receiver",
      ]),

      heading("Picture Settings Worth Changing", 2),

      paragraph(
        "Factory settings are configured for showroom brightness rather than home viewing. Switching to a more accurate picture mode and disabling aggressive motion processing usually improves the image immediately, before any detailed calibration."
      ),

      heading("The Smart Platform", 2),

      paragraph(
        "The built-in platform determines available applications, interface responsiveness, and update support. When applications become slow or unsupported, an external streaming device can refresh the experience without replacing the television."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "No signal or intermittent dropouts on one input",
        "Audio and video out of sync",
        "Applications freezing or failing to update",
        "Motion appearing unnaturally smooth",
        "Wi-Fi connection dropping while streaming",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover television setup, picture configuration, input and cable troubleshooting, audio connections, and smart platform problems."
      ),
    ]),
  },

  {
    slug: "email",
    parentSlug: "email-communication",

    description:
      "Set up, organize and troubleshoot email accounts, including delivery problems, spam, filters, and client configuration.",

    content: richContent([
      paragraph(
        "Email is older than most of the services that now depend on it, and it remains the identity anchor for almost every online account. That makes both its reliability and its security disproportionately important."
      ),

      paragraph(
        "Its age also explains its quirks. Email was designed to route messages between independent servers, not to guarantee delivery, which is why messages can be silently filtered, delayed, or rejected without any error reaching the sender."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers email accounts and applications, including setup, organization, sending and receiving problems, spam and filtering, and configuration across multiple devices."
      ),

      bulletList([
        "Account setup on clients and devices",
        "Sending and receiving failures",
        "Spam, filtering and blocked senders",
        "Folders, labels, rules and search",
        "Attachments and size limits",
        "Signatures, auto-replies and forwarding",
        "Storage limits and mailbox cleanup",
      ]),

      heading("Why the Same Account Looks Different on Two Devices", 2),

      paragraph(
        "Access protocols determine whether messages remain on the server and synchronize everywhere, or are downloaded to a single device. An account configured to download and remove messages will appear incomplete elsewhere."
      ),

      paragraph(
        "Folder structures, read status, and deleted items also synchronize differently depending on the protocol, which accounts for much of the confusion when a phone and a computer disagree."
      ),

      heading("When Messages Do Not Arrive", 2),

      paragraph(
        "A missing message is usually filtered rather than lost. Checking spam, promotional categories, filter rules, blocked senders, and forwarding settings resolves most cases before anything technical needs investigating."
      ),

      bulletList([
        "Search the entire mailbox rather than the inbox alone",
        "Review filters that may be archiving automatically",
        "Check blocked sender lists and safe sender lists",
        "Confirm the mailbox is not at its storage limit",
        "Verify forwarding rules are not diverting messages",
      ]),

      heading("Sending Problems", 2),

      paragraph(
        "Outgoing failures usually involve authentication, server settings, attachment size, or recipient-side rejection. A bounce message, when one is returned, typically contains a specific code that identifies which of these applies."
      ),

      heading("Spam and Deliverability", 2),

      paragraph(
        "Filtering considers sender reputation, authentication records, content, and recipient behaviour. Marking legitimate messages as not spam and adding senders to a contacts list trains the filter over time, though it is never perfectly reliable."
      ),

      heading("Organizing a Mailbox", 2),

      paragraph(
        "Rules applied automatically at arrival are more sustainable than manual sorting. A small number of broad categories combined with strong search generally works better than an elaborate folder hierarchy that requires constant maintenance."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Password accepted on the web but rejected in a mail client",
        "Messages sending but never arriving for the recipient",
        "Attachments blocked or stripped by the receiving server",
        "Mailbox full preventing both sending and receiving",
        "Duplicate messages after reconfiguring an account",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover provider-specific setup, client configuration, delivery troubleshooting, filter creation, and mailbox cleanup."
      ),
    ]),
  },

  {
    slug: "messages",
    parentSlug: "email-communication",

    description:
      "Understand messaging apps, chat history, backups, notifications, group chats, and cross-device message syncing.",

    content: richContent([
      paragraph(
        "Messaging has replaced email for most personal and much professional conversation. It is faster, more informal, and more immediate, but it also stores far more history in places people rarely think about until they change devices."
      ),

      paragraph(
        "Every messaging platform makes different decisions about where messages live, how they are backed up, and whether they can be recovered. Those decisions determine what survives a lost phone."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers chat and messaging applications, including setup, history and backup, notifications, group conversations, media handling, and moving conversations between devices."
      ),

      bulletList([
        "Account setup and phone number changes",
        "Message history, backups and restoration",
        "Syncing across phones, tablets and computers",
        "Notifications and mute settings",
        "Group chats, admins and permissions",
        "Media, attachments and storage use",
        "Blocking, reporting and privacy controls",
      ]),

      heading("Where Messages Actually Live", 2),

      paragraph(
        "Some platforms store history on their servers, making it available instantly on any signed-in device. Others store it only on the device, using an optional backup to a cloud service that must be configured in advance."
      ),

      paragraph(
        "This single difference determines whether a new phone shows years of history automatically or arrives empty. Checking which model a platform uses before switching devices prevents the most painful losses."
      ),

      heading("Backups and Restoration", 2),

      bulletList([
        "Confirm backups are enabled and running recently",
        "Note whether media is included or only text",
        "Understand that restoring usually only happens during setup",
        "Check whether backups transfer between operating systems",
        "Keep the same phone number available during migration where required",
      ]),

      heading("Notifications", 2),

      paragraph(
        "Late or missing notifications usually come from system-level battery optimization rather than the application. Focus modes, notification categories, and background restrictions all interact, and each must permit the application independently."
      ),

      heading("Group Conversations", 2),

      paragraph(
        "Groups have their own rules for who may add members, change settings, or remove participants. Leaving a group, muting it, or limiting who can add a number are separate controls that solve different problems."
      ),

      heading("Media and Storage", 2),

      paragraph(
        "Received photographs and videos are usually saved locally by default, which makes messaging apps one of the largest storage consumers on a phone. Disabling automatic download and clearing old media periodically recovers substantial space."
      ),

      heading("Privacy and Encryption", 2),

      paragraph(
        "End-to-end encryption means only the participants can read message content. Even then, metadata such as who was contacted and when may still be retained, and backups are not always encrypted to the same standard as the messages themselves."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "History missing after moving to a new device",
        "Messages arriving only when the app is opened",
        "Media failing to download",
        "Verification failing during a number change",
        "Messages syncing to one device but not another",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover platform-specific setup, backup and transfer procedures, notification configuration, group management, and messaging troubleshooting."
      ),
    ]),
  },

  {
    slug: "cloud-storage",
    parentSlug: "files-data-cloud-storage",

    description:
      "Set up and manage cloud storage services, including syncing, sharing, storage limits, offline files and version history.",

    content: richContent([
      paragraph(
        "Cloud storage makes files available everywhere, which is convenient until something unexpected happens to them everywhere at once. The same synchronization that keeps devices consistent also propagates mistakes instantly."
      ),

      paragraph(
        "Understanding how a service decides what to store locally, what to keep online, and how long deleted items remain recoverable is what separates confident use from occasional panic."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers cloud storage services and their behaviour, including account setup, synchronization, selective and on-demand files, sharing, quotas, version history, and conflict resolution."
      ),

      bulletList([
        "Service setup and folder configuration",
        "Synchronization and sync status indicators",
        "On-demand files versus locally stored copies",
        "Sharing links, permissions and expiry",
        "Storage quotas and what counts toward them",
        "Version history and restoring earlier versions",
        "Conflicts, duplicates and sync errors",
      ]),

      heading("On-Demand Files and Offline Access", 2),

      paragraph(
        "Many services keep only placeholders on a device and download the real file when it is opened. This saves enormous space but means files are unavailable offline unless they have been explicitly marked to stay downloaded."
      ),

      paragraph(
        "Checking sync status before travelling or working offline avoids discovering that an important file is only a placeholder at the worst possible moment."
      ),

      heading("Sharing and Permissions", 2),

      paragraph(
        "Shared items carry a permission level and, when shared by link, an audience setting. A link shared with anyone who has it can travel far beyond the intended recipient, which makes named sharing safer for sensitive material."
      ),

      heading("Version History and Deleted Items", 2),

      paragraph(
        "Most services retain previous versions and deleted files for a limited period. This is the practical safety net for accidental overwrites and deletions, but the retention window is finite and often shorter on free tiers."
      ),

      bulletList([
        "Restore earlier versions rather than recovering from a backup where possible",
        "Check the deleted items area before assuming a file is gone",
        "Note the retention period for the specific plan in use",
        "Remember that permanently emptying the deleted area removes the safety net",
      ]),

      heading("Sync Conflicts", 2),

      paragraph(
        "When a file is edited in two places before synchronization completes, the service usually preserves both versions with a conflict marker in the name. Resolving these promptly prevents confusion about which copy is current."
      ),

      heading("Storage Quotas", 2),

      paragraph(
        "Quotas often include mail, shared items, version history, and deleted files, which is why an account can appear full despite modest visible usage. Checking a detailed storage breakdown identifies the real consumer quickly."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Synchronization stuck or repeatedly restarting",
        "Files not appearing on a second device",
        "Shared links not working for the recipient",
        "Storage full despite deleting files",
        "Unsupported characters or path lengths blocking upload",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover setup and configuration for specific services, sharing procedures, quota management, version recovery, and sync troubleshooting."
      ),
    ]),
  },

  {
    slug: "file-management",
    parentSlug: "files-data-cloud-storage",

    description:
      "Organize, move, rename, convert and recover files, and understand formats, permissions and folder structure.",

    content: richContent([
      paragraph(
        "File management is unglamorous and enormously consequential. A collection that is organized consistently remains usable for decades, while one that grows without structure becomes unusable long before it becomes large."
      ),

      paragraph(
        "The tools are simple: names, folders, formats, and permissions. Using them deliberately from the beginning costs very little and saves an extraordinary amount of time later."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers everyday operations on files and folders, including organization, naming, moving and copying, compression, conversion, permissions, and recovery of deleted or damaged files."
      ),

      bulletList([
        "Folder structure and naming conventions",
        "Moving, copying and transferring between devices",
        "File formats and conversion",
        "Compression and archives",
        "Permissions, read-only files and locked items",
        "Duplicates and cleanup",
        "Recovering deleted or corrupted files",
      ]),

      heading("Naming and Structure", 2),

      paragraph(
        "A naming convention that sorts correctly is worth more than a deep folder hierarchy. Dates written from largest unit to smallest sort chronologically by default, and descriptive names remain meaningful long after the context is forgotten."
      ),

      bulletList([
        "Use a sortable date format at the start of time-based files",
        "Avoid characters that cause problems across operating systems",
        "Keep a small number of predictable top-level folders",
        "Separate active work from archived material",
        "Be consistent rather than clever",
      ]),

      heading("Moving Versus Copying", 2),

      paragraph(
        "Moving relocates a file, while copying duplicates it. Within the same drive a move is nearly instantaneous because only the reference changes, whereas moving between drives requires a full copy followed by a deletion."
      ),

      paragraph(
        "Interrupting a transfer between drives can leave an incomplete file at the destination, which is why verifying a transfer before deleting the original is worthwhile for anything important."
      ),

      heading("Formats and Conversion", 2),

      paragraph(
        "Conversion between formats is rarely perfectly lossless. Converting a compressed file to another compressed format compounds quality loss, so working from the highest quality original available produces the best result."
      ),

      heading("Compression and Archives", 2),

      paragraph(
        "Archive formats bundle multiple files into one and may compress them. Already-compressed content such as photographs and video gains little from further compression, while text and documents can shrink substantially."
      ),

      heading("Recovering Deleted Files", 2),

      paragraph(
        "A deleted file is usually removed from an index rather than erased, which is why recovery is sometimes possible. The chance drops rapidly as the drive continues to be used, so stopping further writing is the most important immediate action."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A file in use and refusing to move or delete",
        "Permission denied when accessing a folder",
        "Path or filename too long for the destination",
        "A file that will not open in any available application",
        "Duplicates accumulating across synced folders",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover specific file operations, conversion procedures, permission fixes, cleanup methods, and recovery steps."
      ),
    ]),
  },

  {
    slug: "backups",
    parentSlug: "files-data-cloud-storage",

    description:
      "Plan, create, verify and restore backups across devices, and understand the difference between syncing and real protection.",

    content: richContent([
      paragraph(
        "A backup is not a copy of files, it is the ability to get them back. The distinction matters because many people discover only during a restoration attempt that their backup was incomplete, outdated, or unreadable."
      ),

      paragraph(
        "Backups are also the only defence against situations that no other measure addresses, including hardware failure, ransomware, accidental deletion, and mistakes discovered weeks later."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers backup planning and execution, including methods, scheduling, storage destinations, verification, and restoration for computers, phones, and cloud accounts."
      ),

      bulletList([
        "Backup methods and what each protects against",
        "Local, external and offsite destinations",
        "Full, incremental and versioned backups",
        "Automatic scheduling",
        "Encryption and backup security",
        "Verification and test restoration",
        "Restoring individual files or an entire system",
      ]),

      heading("Syncing Is Not Backing Up", 2),

      paragraph(
        "Synchronization keeps copies identical, which means a deletion, an unwanted edit, or an encryption attack propagates to every copy. A backup preserves earlier states, so the previous version still exists after the current one is damaged."
      ),

      paragraph(
        "Version history in a cloud service provides some of this protection, but with a limited retention window and only for files stored in that service."
      ),

      heading("A Workable Backup Strategy", 2),

      bulletList([
        "Keep more than one copy of anything irreplaceable",
        "Store at least one copy on separate hardware",
        "Keep at least one copy in a different physical location",
        "Automate the process so it does not rely on memory",
        "Verify periodically that restoration actually works",
      ]),

      heading("What to Back Up", 2),

      paragraph(
        "Documents, photographs, and project files are obvious. Less obvious but equally valuable are message histories, application settings, browser data, licence keys, email archives, and configuration that would take hours to recreate."
      ),

      heading("Verification and the Untested Backup", 2),

      paragraph(
        "A backup that has never been restored is an assumption rather than a protection. Restoring a few files occasionally confirms that the destination is readable, the schedule is running, and the expected content is actually included."
      ),

      heading("Restoration", 2),

      paragraph(
        "Restoring a single file is usually straightforward, while restoring an entire system requires recovery media and more time. Knowing which situation applies, and having the necessary media prepared, reduces downtime considerably."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A backup drive silently failing for months",
        "Backups running but excluding important folders",
        "Insufficient destination space stopping new backups",
        "An encrypted backup that cannot be unlocked",
        "A phone backup that does not include messaging history",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover setting up backups on each platform, configuring destinations and schedules, verifying results, and restoring files or entire systems."
      ),
    ]),
  },

  {
    slug: "game-settings",
    parentSlug: "gaming",

    description:
      "Tune graphics, performance, audio, controls and accessibility settings across consoles, PCs and handheld gaming devices.",

    content: richContent([
      paragraph(
        "Game settings are where hardware capability meets personal preference. The same machine can deliver a smooth, responsive experience or a stuttering one depending entirely on choices made in a settings menu."
      ),

      paragraph(
        "Most settings trade visual quality against performance, and the relationship is rarely proportional. A few expensive options often cost far more than everything else combined while contributing very little visually."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers in-game and system-level configuration, including graphics options, frame rate targets, display modes, audio, control mapping, and accessibility features."
      ),

      bulletList([
        "Resolution, display mode and refresh rate",
        "Graphics presets and individual quality options",
        "Frame rate limits and synchronization",
        "Upscaling and frame generation",
        "Audio output and spatial sound",
        "Control mapping, sensitivity and dead zones",
        "Accessibility and comfort options",
      ]),

      heading("Which Settings Cost the Most", 2),

      paragraph(
        "Shadows, reflections, ambient occlusion, volumetric effects, and draw distance are typically the heaviest options. Texture quality is mostly limited by available memory rather than processing power, so it can often stay high without penalty."
      ),

      bulletList([
        "Lower shadow and reflection quality first",
        "Reduce effects that simulate light scattering",
        "Keep textures high if memory allows",
        "Adjust resolution scaling before reducing the display resolution",
        "Test one change at a time to see its real cost",
      ]),

      heading("Frame Rate, Synchronization and Smoothness", 2),

      paragraph(
        "Perceived smoothness depends on consistency as much as raw frame rate. A stable lower frame rate often feels better than a higher one that fluctuates, which is why capping the frame rate can improve the experience."
      ),

      paragraph(
        "Variable refresh rate technologies match the display to the game's output, removing tearing without the input delay traditionally associated with synchronization."
      ),

      heading("Upscaling and Frame Generation", 2),

      paragraph(
        "Upscaling renders at a lower internal resolution and reconstructs the image, often recovering substantial performance with modest visual cost. Frame generation inserts additional frames, which improves smoothness but does not reduce input latency."
      ),

      heading("Display Modes", 2),

      paragraph(
        "Exclusive fullscreen generally offers the lowest latency, while borderless modes make switching between applications easier. The difference has narrowed considerably but can still matter in competitive play."
      ),

      heading("Controls and Accessibility", 2),

      paragraph(
        "Sensitivity, dead zones, button remapping, subtitle options, colour adjustments, motion reduction, and difficulty modifiers all affect playability. Accessibility settings frequently improve the experience for players who did not think they needed them."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Stuttering despite a high average frame rate",
        "The display running below its maximum refresh rate",
        "Screen tearing during fast movement",
        "Audio playing through the wrong device",
        "Controller input registering incorrectly after remapping",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover settings configuration for specific platforms and titles, performance tuning, display setup, and control customization."
      ),
    ]),
  },

  {
    slug: "controllers",
    parentSlug: "gaming",

    description:
      "Pair, configure, update and troubleshoot game controllers across consoles, computers, phones and handheld devices.",

    content: richContent([
      paragraph(
        "A controller is a small wireless computer with its own firmware, battery, radio, and calibration data. It can fail in ways that look like game problems, system problems, or network problems while actually being none of those."
      ),

      paragraph(
        "Because controllers now connect to consoles, computers, phones, and handhelds, compatibility and pairing behaviour vary considerably between combinations."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers controller connection and configuration, including pairing, wired and wireless use, firmware updates, button mapping, calibration, and hardware faults."
      ),

      bulletList([
        "Pairing and connecting to different devices",
        "Wired versus wireless operation",
        "Firmware updates",
        "Button mapping and profiles",
        "Stick drift and calibration",
        "Battery life and charging",
        "Multiple controllers and player assignment",
      ]),

      heading("Pairing and Connection", 2),

      paragraph(
        "Most controllers pair with one device at a time and must be put into a pairing mode explicitly. A controller that was previously paired elsewhere will often try to reconnect to that device first, which appears as a failure to connect."
      ),

      paragraph(
        "Wired connections bypass pairing entirely and are useful for diagnosis. If a controller works reliably by cable but not wirelessly, the issue is in the wireless link rather than the controller itself."
      ),

      heading("Compatibility Across Platforms", 2),

      paragraph(
        "Controllers use different communication protocols, and support depends on the receiving device and sometimes on the individual game. A controller recognized by the system may still not be detected by a title that expects a specific input standard."
      ),

      heading("Stick Drift and Calibration", 2),

      paragraph(
        "Drift occurs when a stick reports movement while at rest, usually caused by wear or contamination in the sensor. Recalibration and dead zone adjustment can mask mild cases, but progressive drift generally indicates hardware wear."
      ),

      bulletList([
        "Test in a calibration tool rather than inside a game",
        "Increase the dead zone as a temporary mitigation",
        "Clean around the stick base carefully",
        "Check whether the controller is within warranty",
      ]),

      heading("Firmware and Updates", 2),

      paragraph(
        "Controller firmware affects connection stability, latency, and feature support. Updates usually install through the platform's own software and occasionally resolve problems that appear to be caused by the game or system."
      ),

      heading("Battery and Charging", 2),

      paragraph(
        "Rechargeable controllers degrade like any battery device. Reduced runtime, failure to charge with a particular cable, or disconnection at moderate charge levels all point toward the battery rather than the connection."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Controller connecting but not recognized by a game",
        "Frequent disconnections during play",
        "Inputs registering with noticeable delay",
        "A stick moving on its own",
        "Two controllers assigned to the wrong players",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover pairing procedures for each platform, mapping and profile configuration, firmware updates, calibration, and hardware troubleshooting."
      ),
    ]),
  },

  {
    slug: "wifi",
    parentSlug: "internet-networking",

    description:
      "Connect, optimize and troubleshoot Wi-Fi networks, including coverage, interference, bands, security and connection failures.",

    content: richContent([
      paragraph(
        "Wi-Fi is a shared radio medium, not a private cable. Every device on the network, every neighbouring network, and every physical obstacle between a device and the access point influences the result."
      ),

      paragraph(
        "That is why Wi-Fi performance varies from room to room, hour to hour, and device to device, even when the internet service itself is completely unchanged."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers wireless connectivity on the client side and the network side, including joining networks, coverage and placement, band selection, interference, security, and connection troubleshooting."
      ),

      bulletList([
        "Connecting devices and saved networks",
        "Frequency bands and band steering",
        "Coverage, placement and dead zones",
        "Interference from other networks and devices",
        "Wireless security and guest networks",
        "Speed, congestion and device limits",
        "Connection drops and authentication failures",
      ]),

      heading("Frequency Bands and What They Trade", 2),

      paragraph(
        "Lower frequency bands travel further and pass through walls more easily but offer less capacity and are more congested. Higher frequency bands carry much more data over shorter distances with less interference."
      ),

      paragraph(
        "Many networks present all bands under one name and steer devices automatically. When a device makes a poor choice, separating the bands into distinct network names allows manual selection."
      ),

      heading("Coverage and Placement", 2),

      paragraph(
        "Signal strength falls rapidly with distance and obstruction. Concrete, brick, metal, mirrors, and water-filled objects absorb wireless signals significantly, while a central and elevated access point placement usually outperforms any settings change."
      ),

      bulletList([
        "Place the access point centrally and away from walls",
        "Keep it clear of metal objects and large appliances",
        "Avoid enclosing it in cabinets or media units",
        "Add access points rather than relying on one distant unit",
        "Use wired connections for stationary, demanding devices",
      ]),

      heading("Interference and Congestion", 2),

      paragraph(
        "In dense housing, neighbouring networks compete for the same channels. Selecting a less crowded channel, or moving devices to a higher frequency band, often improves consistency more than any speed upgrade would."
      ),

      heading("Security", 2),

      paragraph(
        "Modern wireless encryption protects traffic between devices and the access point. Using current encryption standards, a strong unique network password, and a separate guest network for visitors and untrusted devices covers most practical risks."
      ),

      heading("Connected but No Internet", 2),

      paragraph(
        "A device can join a wireless network successfully while having no path to the internet. This usually indicates an address assignment problem, a name resolution failure, or an outage upstream rather than a wireless fault."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Strong signal but slow speeds",
        "Connection dropping in specific rooms",
        "A device refusing to reconnect after a password change",
        "Network visible but authentication failing",
        "Performance degrading when many devices are active",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover connecting specific devices, improving coverage, changing channels and bands, configuring security, and diagnosing wireless failures."
      ),
    ]),
  },

  {
    slug: "routers",
    parentSlug: "internet-networking",

    description:
      "Set up, configure, secure and troubleshoot routers, including admin settings, firmware, port forwarding and mesh systems.",

    content: richContent([
      paragraph(
        "A router is the single most important device on a home network and usually the least maintained. It assigns addresses, directs traffic, enforces the firewall, provides wireless access, and connects everything to the internet service."
      ),

      paragraph(
        "Because it does so much, a router problem can present as almost anything: slow browsing, failed streaming, unreliable video calls, or devices that intermittently vanish from the network."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers router setup and administration, including initial configuration, admin access, wireless settings, firmware, address management, advanced features, and hardware replacement."
      ),

      bulletList([
        "Initial setup and connection to the internet service",
        "Admin interface access and credentials",
        "Wireless network names, passwords and bands",
        "Firmware updates",
        "Address assignment and reservations",
        "Port forwarding and network services",
        "Mesh systems and additional access points",
        "Guest networks and device isolation",
      ]),

      heading("Modem and Router Roles", 2),

      paragraph(
        "A modem connects to the provider's line while a router manages the local network. Many devices combine both functions, which can create conflicts when a separate router is added, resulting in a double layer of address translation."
      ),

      paragraph(
        "Recognizing which device performs which role clarifies where settings belong and why some features may not work as expected."
      ),

      heading("Admin Access and Security", 2),

      paragraph(
        "The administrative interface controls everything about the network, yet default credentials are frequently left unchanged. Changing them, disabling remote administration, and keeping firmware current addresses the most significant risks."
      ),

      bulletList([
        "Change the default administrator password immediately",
        "Disable remote management unless it is genuinely needed",
        "Apply firmware updates regularly",
        "Review connected devices periodically",
        "Use a guest network for visitors and smart devices",
      ]),

      heading("Address Assignment and Reservations", 2),

      paragraph(
        "Routers assign addresses automatically, and these can change over time. Reserving a fixed address for printers, servers, cameras, and network storage keeps them reachable at a consistent location."
      ),

      heading("Port Forwarding and External Access", 2),

      paragraph(
        "Port forwarding directs incoming connections to a specific device, which is required for some servers, cameras, and game hosting. It also creates an opening in the firewall, so it should be used narrowly and reviewed occasionally."
      ),

      heading("Mesh Systems and Coverage Expansion", 2),

      paragraph(
        "Mesh systems place multiple units around a home, connected to each other wirelessly or by cable. A wired connection between units nearly always outperforms a wireless one, because it removes the backhaul from the shared airtime."
      ),

      heading("When to Replace a Router", 2),

      paragraph(
        "Routers age in both capability and reliability. Frequent restarts, inability to handle the number of connected devices, missing security updates, and outdated wireless standards are all reasonable reasons to replace rather than continue troubleshooting."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Router requiring frequent restarts",
        "Admin page unreachable",
        "Devices receiving no address",
        "Wireless working but internet unavailable",
        "Mesh units dropping their connection to the main unit",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover router setup, admin configuration, firmware updates, address reservations, port forwarding, and mesh deployment."
      ),
    ]),
  },

  {
    slug: "browsers",
    parentSlug: "internet-networking",

    description:
      "Configure, secure and troubleshoot web browsers, including extensions, cache, privacy settings, profiles and page loading problems.",

    content: richContent([
      paragraph(
        "The browser has become the primary application on most computers. It runs documents, email, meetings, design tools, development environments, and entertainment, which makes its configuration more consequential than that of the operating system for many people."
      ),

      paragraph(
        "It is also the layer where most everyday internet problems appear, because a page that fails to load may be blocked by an extension, a cached file, a privacy setting, or a network issue that has nothing to do with the site itself."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers browser configuration and troubleshooting, including settings, extensions, cache and cookies, profiles, privacy controls, downloads, and page rendering problems."
      ),

      bulletList([
        "Settings, defaults and search configuration",
        "Extensions and add-ons",
        "Cache, cookies and stored site data",
        "Profiles and separate browsing contexts",
        "Privacy settings and tracking protection",
        "Downloads, permissions and pop-ups",
        "Performance, memory use and crashes",
      ]),

      heading("Cache and Cookies", 2),

      paragraph(
        "The cache stores page resources locally to speed up repeat visits, while cookies store site-specific state such as sign-in status and preferences. A stale cached file is one of the most common causes of a page displaying incorrectly."
      ),

      paragraph(
        "Clearing the cache is low risk, while clearing cookies signs the user out of sites. Clearing data for a single site is usually the better first step when a specific page misbehaves."
      ),

      heading("Extensions and Why They Cause Problems", 2),

      paragraph(
        "Extensions run with significant access to page content and can modify, block, or inject material. They are a frequent cause of broken pages, slow performance, and unexpected behaviour, particularly after a browser update."
      ),

      bulletList([
        "Test in a private window where extensions are usually disabled",
        "Disable extensions in batches to identify the culprit",
        "Remove extensions that are no longer maintained",
        "Review permissions before installing anything new",
      ]),

      heading("Profiles and Separate Contexts", 2),

      paragraph(
        "Profiles keep sign-ins, extensions, bookmarks, and history separate. They are useful for dividing work from personal browsing, or for managing multiple accounts on the same service without constant signing in and out."
      ),

      heading("Privacy and Tracking Protection", 2),

      paragraph(
        "Browsers now offer varying levels of tracking protection, cookie restriction, and fingerprinting resistance. Stricter settings improve privacy but occasionally break sites that depend on third-party resources, which is why per-site exceptions exist."
      ),

      heading("Performance and Memory", 2),

      paragraph(
        "Each tab consumes memory, and modern web applications can consume a great deal of it. Slowdowns are frequently caused by a small number of heavy tabs or extensions rather than by the browser itself."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A page loading everywhere except in one browser",
        "Certificate or secure connection warnings",
        "Repeated sign-outs from a site",
        "Downloads blocked or silently failing",
        "A site working in a private window but not normally",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover browser settings, extension management, cache and cookie clearing, profile setup, privacy configuration, and page loading troubleshooting."
      ),
    ]),
  },

  {
    slug: "online-payments",
    parentSlug: "payments-billing-commerce",

    description:
      "Set up and troubleshoot online payment methods, including cards, wallets, declines, verification and recurring charges.",

    content: richContent([
      paragraph(
        "An online payment involves the merchant, a gateway, a processor, a card network, and the issuing bank, each applying its own checks. A payment can be approved by four of them and still fail at the fifth."
      ),

      paragraph(
        "This layered structure is why declines are often unexplained, why a charge can appear and then disappear, and why the merchant frequently cannot say what went wrong."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers making and managing payments online, including payment methods, saved cards, verification steps, declines, pending charges, and recurring payment setup."
      ),

      bulletList([
        "Adding and updating payment methods",
        "Cards, bank transfers and digital wallets",
        "Verification and authentication steps",
        "Declined and failed payments",
        "Pending and duplicate charges",
        "Currency conversion and cross-border fees",
        "Recurring payment setup and updates",
      ]),

      heading("Authorization Versus Settlement", 2),

      paragraph(
        "When a payment is submitted, the bank authorizes it and temporarily reserves the amount. Actual settlement happens later. This explains pending amounts that reduce available balance before the transaction fully completes."
      ),

      paragraph(
        "Temporary verification charges work the same way. A small amount is authorized to confirm the card is valid and then released, though it may remain visible for several days."
      ),

      heading("Why Payments Get Declined", 2),

      bulletList([
        "Insufficient available balance or an exceeded limit",
        "Card details, expiry or billing address out of date",
        "Fraud rules triggered by an unusual merchant or country",
        "International or online transactions disabled by default",
        "Additional authentication not completed in time",
      ]),

      paragraph(
        "The issuing bank is the only party with the specific reason. Merchants receive a generic code deliberately, because detailed responses would assist fraudulent testing of stolen cards."
      ),

      heading("Additional Authentication", 2),

      paragraph(
        "Many regions require a second verification step for online payments, delivered through an application, a code, or a bank prompt. Payments frequently fail because this step timed out or the notification was never received."
      ),

      heading("Digital Wallets", 2),

      paragraph(
        "Wallets present a substitute token rather than the actual card number, which limits exposure if the merchant is compromised. Updating the card inside the wallet does not always update it at merchants where the wallet was used for recurring billing."
      ),

      heading("Currency and Cross-Border Charges", 2),

      paragraph(
        "Paying in a foreign currency may involve conversion by the merchant, the network, or the bank, each with different rates and fees. Choosing to be charged in the local currency of the card usually produces a better rate than merchant-side conversion."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A card that works in stores but fails online",
        "A charge appearing twice with one entry later disappearing",
        "Payment failing only for one specific merchant",
        "A saved card not updating after reissue",
        "An unfamiliar merchant name on a statement",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover adding and updating payment methods on specific platforms, resolving declines, understanding charges, and configuring recurring payments."
      ),
    ]),
  },

  {
    slug: "orders-refunds",
    parentSlug: "payments-billing-commerce",

    description:
      "Track orders, request refunds, handle returns, resolve disputes, and understand buyer protection on online purchases.",

    content: richContent([
      paragraph(
        "The period between placing an order and resolving a problem with it involves several parties: the seller, the platform, the payment provider, and often a shipping company. Each has different responsibilities and different timeframes."
      ),

      paragraph(
        "Knowing which party to approach first, and in what order, usually determines whether a problem is resolved in days or weeks."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the lifecycle of an online purchase after checkout, including order tracking, delivery issues, cancellations, returns, refunds, disputes, and buyer protection programmes."
      ),

      bulletList([
        "Order confirmation and tracking",
        "Delivery delays, failures and lost parcels",
        "Cancelling an order before dispatch",
        "Returns, exchanges and return windows",
        "Refund requests and processing times",
        "Disputes, chargebacks and escalation",
        "Buyer protection on marketplaces",
      ]),

      heading("The Right Order of Escalation", 2),

      paragraph(
        "Contacting the seller first is nearly always correct, both because it is fastest and because platforms and banks expect it. Escalating to the platform comes next, and a payment dispute should be the final step rather than the first."
      ),

      paragraph(
        "Opening a bank dispute prematurely can close other routes, since many sellers stop processing a refund once a chargeback is filed."
      ),

      heading("Refunds and Why They Take Time", 2),

      paragraph(
        "A refund returns through the same path the payment took. The merchant issues it, the processor handles it, and the bank posts it, which is why money can leave the merchant days before it appears on a statement."
      ),

      bulletList([
        "Refunds usually return to the original payment method",
        "Processing times differ by bank and by method",
        "A refunded card payment may take several business days to appear",
        "Store credit is typically faster but less flexible",
        "Partial refunds may exclude shipping or handling",
      ]),

      heading("Returns and Return Windows", 2),

      paragraph(
        "Return eligibility depends on the seller's policy, the product category, and local consumer law, which may grant rights beyond the stated policy. Condition requirements, original packaging, and who pays return shipping vary widely."
      ),

      heading("Delivery Problems", 2),

      paragraph(
        "Parcels marked delivered but not received are common enough to have standard procedures: checking with neighbours and the building, waiting a short period for scanning errors to correct, then reporting to the seller within their stated window."
      ),

      heading("Marketplace Purchases", 2),

      paragraph(
        "On marketplaces, the seller may be a third party rather than the platform. Buyer protection programmes generally cover items that never arrive or differ significantly from their description, but usually require a claim within a defined period."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Tracking not updating for several days",
        "An order that cannot be cancelled after placement",
        "A refund approved but not visible on a statement",
        "A return window that expired during a delayed delivery",
        "A seller unresponsive to messages",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover tracking orders, requesting refunds on specific platforms, arranging returns, and escalating disputes effectively."
      ),
    ]),
  },

  {
    slug: "documents",
    parentSlug: "productivity-office-tools",

    description:
      "Create, format, convert, collaborate on and recover documents across word processors and document platforms.",

    content: richContent([
      paragraph(
        "A document carries structure as well as words. Headings, styles, sections, and references form an underlying framework that determines how the document behaves when it is edited, converted, printed, or read by someone else."
      ),

      paragraph(
        "Most document frustration comes from formatting applied by hand instead of through that framework, which works for a page and falls apart across fifty."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers document creation and editing, including formatting, styles, templates, collaboration, version history, conversion between formats, printing, and recovery of unsaved work."
      ),

      bulletList([
        "Styles, headings and structure",
        "Templates and reusable formatting",
        "Page setup, margins and printing",
        "Tables, images and layout objects",
        "Track changes, comments and review",
        "Version history and recovery",
        "Converting between document formats",
      ]),

      heading("Why Styles Matter More Than Formatting", 2),

      paragraph(
        "A style defines appearance once and applies it everywhere it is used. Changing the style updates every instance at once, generates a navigable outline, and produces clean headings when the document is exported or converted."
      ),

      paragraph(
        "Manual formatting produces the same visual result with none of the structure, which is why such documents break during conversion and become laborious to restyle."
      ),

      heading("Collaboration and Review", 2),

      paragraph(
        "Tracked changes record edits so they can be accepted or rejected individually, while comments separate discussion from content. Sharing with defined permissions prevents accidental edits to a document that should only be read."
      ),

      bulletList([
        "Decide between suggesting and editing before sharing",
        "Resolve comments rather than deleting them, to keep the discussion trail",
        "Check that tracked changes are accepted before final distribution",
        "Review document properties before sending externally",
      ]),

      heading("Conversion and Compatibility", 2),

      paragraph(
        "Documents moved between suites rarely convert perfectly. Fonts that are unavailable are substituted, complex layouts shift, and advanced features may be simplified or lost, so verifying appearance after conversion is essential."
      ),

      heading("Printing and Page Setup", 2),

      paragraph(
        "Differences between an on-screen document and a printed one usually come from margins, scaling, page size, or printer-specific unprintable areas. Checking print preview before printing catches nearly all of these."
      ),

      heading("Recovery of Unsaved Work", 2),

      paragraph(
        "Most applications maintain autosave or autorecovery files. Cloud-based editors keep continuous version history, which often makes recovering an earlier state easier than recovering an unsaved local file."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Formatting shifting when opened on another computer",
        "An image moving unexpectedly when text is edited",
        "Page numbering restarting in the wrong place",
        "A document opening read-only or locked by another user",
        "Fonts substituted after sharing",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover formatting and style procedures, template creation, collaboration setup, conversion steps, and document recovery."
      ),
    ]),
  },

  {
    slug: "spreadsheets",
    parentSlug: "productivity-office-tools",

    description:
      "Build, fix and analyze spreadsheets, including formulas, references, formatting, charts, sorting and data errors.",

    content: richContent([
      paragraph(
        "A spreadsheet is a grid of cells connected by relationships. Once formulas reference other cells, the sheet becomes a small program, and it inherits the properties of programs: it can be correct, subtly wrong, or fragile in ways that are hard to see."
      ),

      paragraph(
        "Most spreadsheet errors are not mathematical. They come from structure: mixed data types, hidden rows, stale references, or a formula that no longer covers the range it was meant to."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers spreadsheet construction and repair, including formulas and functions, references, data types, sorting and filtering, formatting, charts, and common error messages."
      ),

      bulletList([
        "Formulas, functions and operators",
        "Relative, absolute and mixed references",
        "Data types, dates and number formatting",
        "Sorting, filtering and ranges",
        "Lookup and matching functions",
        "Charts and visual summaries",
        "Errors, circular references and auditing",
      ]),

      heading("References and Why Formulas Break", 2),

      paragraph(
        "A relative reference shifts when a formula is copied, while an absolute one stays fixed. Choosing incorrectly is the most frequent cause of a formula that works in one cell and produces nonsense when filled across a column."
      ),

      paragraph(
        "Inserting or deleting rows can also silently change ranges, which is why totals sometimes exclude newly added data without any visible error."
      ),

      heading("Data Types and Hidden Text", 2),

      paragraph(
        "Numbers stored as text look identical to real numbers but are ignored by calculations. Imported data frequently carries invisible characters, trailing spaces, or locale-specific separators that break totals and lookups."
      ),

      bulletList([
        "Check alignment, since text and numbers align differently by default",
        "Watch for dates interpreted in the wrong order",
        "Trim whitespace in imported data before matching",
        "Keep a column to one consistent data type",
        "Avoid merged cells in data ranges",
      ]),

      heading("Structuring a Sheet That Survives", 2),

      paragraph(
        "Separating raw data, calculations, and presentation into distinct areas or sheets makes a workbook far easier to audit and extend. Formulas that reference a clean data table remain valid as the data grows."
      ),

      heading("Lookups and Matching", 2),

      paragraph(
        "Lookup functions fail most often because of type mismatches, extra spaces, or ranges that do not include the key column. Testing a lookup on a few known values before applying it to a whole column catches these quickly."
      ),

      heading("Errors and Auditing", 2),

      paragraph(
        "Error values are informative rather than obstructive. They indicate a specific problem such as a missing value, an invalid reference, a division by zero, or a circular dependency, and tracing precedents usually identifies the origin."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A total that excludes recently added rows",
        "Dates displaying as numbers or in the wrong order",
        "Sorting that scrambles related columns",
        "A lookup returning no match for values that appear identical",
        "Filters hiding rows that are still included in calculations",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover formula construction, reference behaviour, data cleanup, lookup techniques, chart creation, and error resolution."
      ),
    ]),
  },

  {
    slug: "account-security",
    parentSlug: "security-privacy",

    description:
      "Protect accounts with strong authentication, session review, breach response, and practical defences against takeover.",

    content: richContent([
      paragraph(
        "Account takeover rarely involves breaking encryption. It involves a password reused from a breached site, a code handed over during a convincing phone call, or a session that was never signed out on a shared computer."
      ),

      paragraph(
        "The defences that work are correspondingly practical. Unique passwords, a second authentication factor, and periodic review of sessions and connected applications prevent the overwhelming majority of real incidents."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers protecting accounts from unauthorized access, including authentication methods, credential management, session control, breach response, and recognizing attempts to obtain access."
      ),

      bulletList([
        "Strong, unique passwords and password managers",
        "Two-factor and multi-factor authentication",
        "Backup codes and recovery methods",
        "Active sessions and trusted devices",
        "Connected applications and access tokens",
        "Recognizing phishing and social engineering",
        "Responding to a suspected compromise",
      ]),

      heading("Why Password Reuse Is the Central Risk", 2),

      paragraph(
        "Credentials exposed in one breach are tested automatically against many other services. A unique password confines a breach to a single account, while a reused one turns it into a chain of compromises across unrelated services."
      ),

      heading("Choosing a Second Factor", 2),

      bulletList([
        "Hardware keys resist phishing most effectively",
        "Authenticator apps are strong and widely supported",
        "Push approvals are convenient but can be approved by mistake",
        "Text codes are better than nothing but interceptable",
        "Always store backup codes somewhere accessible without the account",
      ]),

      paragraph(
        "The weakest enabled method sets the effective security level, since an attacker will use whichever option is easiest. Removing weak fallback methods after establishing stronger ones is worth doing deliberately."
      ),

      heading("Sessions and Connected Applications", 2),

      paragraph(
        "A password change does not always terminate existing sessions. Reviewing active sessions and signing out everywhere after any security event ensures that previously granted access is actually revoked."
      ),

      paragraph(
        "Connected applications hold their own access tokens, which continue working independently of the password. These should be reviewed at the same time."
      ),

      heading("Recognizing Social Engineering", 2),

      paragraph(
        "Attackers frequently target the person rather than the system, creating urgency and impersonating support staff or familiar services. No legitimate provider asks for a password or a verification code, and any request for either should be treated as an attack."
      ),

      heading("Responding to a Compromise", 2),

      bulletList([
        "Regain access and change the password immediately",
        "Change it anywhere the same password was reused",
        "Sign out of all sessions and revoke connected applications",
        "Restore recovery email and phone details",
        "Enable a strong second factor",
        "Check for added forwarding rules or altered settings",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover enabling authentication on specific services, managing passwords, reviewing sessions, and responding to unauthorized access."
      ),
    ]),
  },

  {
    slug: "privacy-settings",
    parentSlug: "security-privacy",

    description:
      "Control data collection, app permissions, tracking, location sharing, and the visibility of personal information online.",

    content: richContent([
      paragraph(
        "Privacy settings determine what is collected, who can see it, and how long it is kept. They are separate from security, which determines who can get in, and a well-secured account can still share far more than its owner expects."
      ),

      paragraph(
        "Defaults are generally set toward sharing, because sharing enables features. Adjusting them deliberately is the difference between a service that works for a person and one that works around them."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers privacy configuration across devices, browsers, applications, and online services, including permissions, tracking, location, advertising controls, and data deletion requests."
      ),

      bulletList([
        "Application permissions on phones and computers",
        "Location access and precision",
        "Camera, microphone and screen access",
        "Tracking protection and cookie controls",
        "Advertising identifiers and personalization settings",
        "Search, activity and history controls",
        "Data download and deletion requests",
      ]),

      heading("Permissions Are Ongoing, Not One-Time", 2),

      paragraph(
        "A permission granted once usually persists indefinitely. Modern systems allow narrower choices such as access only while an application is in use, approximate rather than exact location, or access to selected photographs rather than an entire library."
      ),

      bulletList([
        "Prefer while-in-use over always-allowed access",
        "Use approximate location where precision is unnecessary",
        "Limit photo access to specific items",
        "Review permissions after major system updates",
        "Revoke access for applications no longer used",
      ]),

      heading("Tracking and How It Works", 2),

      paragraph(
        "Tracking uses cookies, identifiers, embedded scripts, and device characteristics to recognize a person across sites and sessions. Browser protections, cookie restrictions, and advertising identifier resets reduce it, though nothing eliminates it entirely."
      ),

      heading("Activity History and Personalization", 2),

      paragraph(
        "Many services retain search, viewing, and location history to personalize results. Most allow this history to be viewed, paused, deleted, or set to expire automatically, which is often the most effective privacy control available."
      ),

      heading("Metadata and Shared Content", 2),

      paragraph(
        "Photographs and documents carry embedded information including capture dates, device details, and sometimes location. This travels with the file when it is shared, so removing it before public posting is worth considering."
      ),

      heading("Data Access and Deletion", 2),

      paragraph(
        "Many jurisdictions require services to provide a copy of stored personal data and to honour deletion requests. Exporting data before deleting an account also preserves anything worth keeping."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "An application losing functionality after a permission is revoked",
        "Location appearing accurate despite approximate settings",
        "Privacy settings resetting after a system update",
        "Advertisements clearly reflecting recent activity",
        "Different settings on the app and the website of one service",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover permission configuration on each platform, tracking protection, history management, and data export and deletion procedures."
      ),
    ]),
  },

  {
    slug: "profiles-accounts",
    parentSlug: "social-media",

    description:
      "Set up, secure, customize and recover social media profiles, including visibility, verification and account switching.",

    content: richContent([
      paragraph(
        "A social profile is simultaneously a public presentation, a searchable identity, and an account holding years of personal history. Those three roles pull in different directions, which is why profile settings deserve more attention than they usually receive."
      ),

      paragraph(
        "Platforms also change defaults over time. Settings configured years ago may no longer mean what they once did, particularly when new features are introduced with permissive defaults."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers profile creation, configuration, visibility, security, and recovery on social platforms, along with managing multiple accounts and transitioning between personal and professional presence."
      ),

      bulletList([
        "Creating and verifying a profile",
        "Usernames, display names and handles",
        "Profile visibility and discoverability",
        "Public versus private accounts",
        "Verification and badges",
        "Multiple accounts and switching",
        "Deactivation, deletion and data export",
        "Account recovery after loss or compromise",
      ]),

      heading("Public, Private and What Each Means", 2),

      paragraph(
        "A private account restricts who can follow and view content, but reshared material, screenshots, and content posted before the change may remain circulating. A public account is discoverable, indexable, and quotable by design."
      ),

      paragraph(
        "Viewing a profile while signed out is the most direct way to see what strangers actually see, and it frequently reveals more than expected."
      ),

      heading("Discoverability", 2),

      paragraph(
        "Platforms often allow an account to be found through a phone number, email address, or contact synchronization. These settings are separate from account privacy and are usually enabled by default."
      ),

      bulletList([
        "Disable lookup by phone number if unwanted",
        "Review contact syncing and remove uploaded contacts",
        "Check whether the profile appears in external search results",
        "Control who can tag, mention or message directly",
      ]),

      heading("Security for Public-Facing Accounts", 2),

      paragraph(
        "Accounts with reach are targeted more often, because control of them has value beyond the personal data they contain. Strong authentication, current recovery details, and reviewing connected applications are especially important here."
      ),

      heading("Managing Multiple Accounts", 2),

      paragraph(
        "Most platforms support multiple accounts with fast switching, though they may still be linked internally through shared devices or contact details. Keeping professional and personal presences fully separate usually requires separate contact details as well."
      ),

      heading("Deactivation, Deletion and Export", 2),

      paragraph(
        "Deactivation hides an account temporarily, while deletion is permanent after a grace period. Requesting a full data export before either action preserves photographs, messages, and posts that would otherwise be lost."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A username already taken or unavailable",
        "Verification failing during signup",
        "An account locked for suspicious activity",
        "Profile changes not appearing for other users",
        "Losing access after changing a phone number",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover profile setup and settings on specific platforms, privacy configuration, account recovery, and deletion procedures."
      ),
    ]),
  },

  {
    slug: "posts-messages",
    parentSlug: "social-media",

    description:
      "Create, edit, schedule and manage social posts and direct messages, including reach, formats, and moderation issues.",

    content: richContent([
      paragraph(
        "Posting looks simple and is governed by a great deal of hidden machinery. Format requirements, distribution ranking, content policies, and audience settings all influence what happens after the publish button is pressed."
      ),

      paragraph(
        "Direct messages follow separate rules again, with their own request systems, privacy controls, and retention behaviour that differ noticeably from public content."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers creating and managing content and conversations on social platforms, including posting formats, editing, scheduling, audience control, engagement, messaging, and moderation outcomes."
      ),

      bulletList([
        "Posting formats and media requirements",
        "Editing, deleting and archiving posts",
        "Scheduling and drafts",
        "Audience and visibility per post",
        "Tags, mentions and hashtags",
        "Direct messages and message requests",
        "Reach, engagement and analytics",
        "Content removals, restrictions and appeals",
      ]),

      heading("Why Reach Varies So Much", 2),

      paragraph(
        "Distribution is decided by ranking systems that estimate likely engagement. Early response, content format, relationships, recency, and platform priorities all contribute, which is why identical content performs differently on different days."
      ),

      paragraph(
        "Because the same ranking applies to everyone, changes in reach often reflect platform-wide adjustments rather than anything specific to an individual account."
      ),

      heading("Formats and Technical Requirements", 2),

      paragraph(
        "Each platform has preferred aspect ratios, resolutions, durations, and file sizes. Content that does not match is cropped, compressed, or distributed less readily, which is a frequent and avoidable cause of poor results."
      ),

      bulletList([
        "Match the platform's native aspect ratio",
        "Upload at recommended resolution rather than relying on compression",
        "Keep important elements away from areas covered by interface overlays",
        "Add captions for content usually watched without sound",
      ]),

      heading("Editing and Deleting", 2),

      paragraph(
        "Edit windows vary, and some platforms disallow editing entirely once published. Deleting removes a post from the platform but does not retrieve copies already shared, saved, or captured elsewhere."
      ),

      heading("Direct Messages", 2),

      paragraph(
        "Messages from non-connections often arrive in a separate request area rather than the main inbox. Settings control who may message directly, and requests may be filtered out of sight entirely depending on configuration."
      ),

      heading("Moderation and Appeals", 2),

      paragraph(
        "Content can be removed, limited in distribution, or age-restricted, sometimes by automated systems. Most platforms provide an appeal process with a defined window, and appealing promptly with specific information is more effective than resubmitting the content."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A post failing to upload or processing indefinitely",
        "Video quality noticeably reduced after upload",
        "A scheduled post not publishing",
        "Messages not visible because they sit in requests",
        "Reach dropping sharply without explanation",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover posting procedures on specific platforms, format specifications, scheduling tools, message settings, and appeal processes."
      ),
    ]),
  },

  {
    slug: "installation",
    parentSlug: "software-app-operations",

    description:
      "Install software safely across platforms, including sources, requirements, permissions, and resolving failed installations.",

    content: richContent([
      paragraph(
        "Installation is the moment a piece of software gains access to a system. Where it came from, what permissions it requests, and how it is installed determine both whether it works and what it can do once it is running."
      ),

      paragraph(
        "Most failed installations come from a small number of causes: an unmet requirement, insufficient permissions, a corrupted download, a conflict with existing software, or a lack of free space."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers obtaining and installing software on computers and mobile devices, including sources, system requirements, installer types, permissions, and installation failures."
      ),

      bulletList([
        "Official stores, direct downloads and package managers",
        "System requirements and compatibility checks",
        "Installer types and installation options",
        "Administrator rights and permissions",
        "Bundled software and unwanted extras",
        "Verifying downloads and publisher identity",
        "Failed and incomplete installations",
      ]),

      heading("Where Software Comes From", 2),

      paragraph(
        "Store-delivered applications are reviewed, sandboxed, and updated automatically. Directly downloaded software often has broader system access and manages its own updates, which makes verifying the source considerably more important."
      ),

      paragraph(
        "Search results for popular software frequently include advertised look-alike sites distributing modified installers. Reaching the download page through the official site rather than a search advertisement avoids this entirely."
      ),

      heading("Checking Requirements First", 2),

      bulletList([
        "Operating system version and architecture",
        "Available storage, including temporary space during installation",
        "Memory and processor requirements",
        "Graphics capability where relevant",
        "Dependencies such as runtimes or frameworks",
      ]),

      heading("Permissions and Administrator Rights", 2),

      paragraph(
        "System-wide installation requires elevated permissions because it modifies shared locations. On managed or work devices this may be restricted entirely, which is a common and legitimate reason an installation cannot proceed."
      ),

      heading("Bundled Software", 2),

      paragraph(
        "Some installers include additional software, browser extensions, or changed default settings, presented as pre-selected options. Choosing a custom installation rather than the express option reveals and allows declining these."
      ),

      heading("When an Installation Fails", 2),

      paragraph(
        "A structured approach resolves most failures: re-download in case of corruption, free additional space, close conflicting applications, temporarily disable security software if it is blocking the installer, and run the installer with appropriate permissions."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Installer blocked by system security warnings",
        "A previous version preventing a new installation",
        "Insufficient temporary space despite free storage",
        "Installation failing partway and leaving remnants",
        "An application installed but not appearing in menus",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover installation procedures on each platform, verifying sources, resolving installer errors, and cleaning up after failed attempts."
      ),
    ]),
  },

  {
    slug: "updates",
    parentSlug: "software-app-operations",

    description:
      "Manage software, system and driver updates, including scheduling, rollback, and resolving update failures.",

    content: richContent([
      paragraph(
        "Updates carry security fixes, bug corrections, and changes nobody asked for, all in the same package. That combination is why update management is a genuine decision rather than a simple yes."
      ),

      paragraph(
        "The practical goal is to apply security fixes promptly while controlling the timing of larger changes, so that a machine needed for work does not transform itself in the middle of a deadline."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers updating operating systems, applications, drivers, and firmware, including scheduling, automatic updates, version differences, rollback, and update failures."
      ),

      bulletList([
        "Operating system and security updates",
        "Application and store updates",
        "Driver and firmware updates",
        "Automatic versus manual update control",
        "Update scheduling and active hours",
        "Rolling back a problematic update",
        "Failed, stuck and repeating updates",
      ]),

      heading("Types of Updates and Their Risk", 2),

      paragraph(
        "Security and quality updates change little that is visible and carry low risk, so they should be applied promptly. Feature and major version updates change behaviour and compatibility, so they warrant a backup and a suitable moment."
      ),

      heading("Why Updates Fail", 2),

      bulletList([
        "Insufficient free storage for the download and installation",
        "A corrupted update cache from an earlier attempt",
        "A driver or application conflicting with the new version",
        "An unstable connection interrupting the download",
        "Pending restarts blocking further installation",
      ]),

      paragraph(
        "An update that fails repeatedly with the same result rarely succeeds through repetition. Clearing the update components, freeing space, and installing the update manually usually resolves it."
      ),

      heading("Drivers and Firmware", 2),

      paragraph(
        "Driver updates can resolve hardware issues and can also introduce them. Firmware updates modify the device itself and should not be interrupted, since a failure partway through can leave hardware unusable."
      ),

      paragraph(
        "Unlike software, drivers do not always need updating. If the hardware works correctly, there is often no benefit in changing a working driver."
      ),

      heading("Rolling Back", 2),

      paragraph(
        "Operating systems generally allow reverting a recent update within a limited window, and drivers can usually be rolled back to the previous version. Application rollback varies, and store-delivered applications frequently offer no downgrade path at all."
      ),

      heading("Controlling Timing", 2),

      paragraph(
        "Active hours, scheduled restarts, and deferral settings let updates install without interrupting work. Disabling updates entirely is not a substitute, since it leaves known vulnerabilities in place indefinitely."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "An update stuck at a percentage for hours",
        "A device restarting into a repeated update loop",
        "Features or settings changed after a feature update",
        "An application breaking after an operating system upgrade",
        "Storage full preventing any further updates",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover update procedures on each platform, scheduling configuration, repairing failed updates, and rolling back problematic versions."
      ),
    ]),
  },

  {
    slug: "app-problems",
    parentSlug: "software-app-operations",

    description:
      "Diagnose and fix application crashes, freezes, errors, performance issues and conflicts across desktop and mobile software.",

    content: richContent([
      paragraph(
        "When an application misbehaves, the cause is usually outside the application itself. Resources, permissions, corrupted settings, conflicting software, or an incompatible system version account for the large majority of cases."
      ),

      paragraph(
        "That is encouraging, because it means a general diagnostic sequence works across almost any program regardless of what it does."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers application-level problems including crashes, freezes, startup failures, error messages, slow performance, conflicts, and data corruption within applications."
      ),

      bulletList([
        "Crashes on launch and during use",
        "Freezing and unresponsiveness",
        "Error messages and codes",
        "Slow performance and high resource use",
        "Conflicts with other software",
        "Corrupted settings and cache",
        "Missing features after an update",
      ]),

      heading("A Sequence That Resolves Most Problems", 2),

      bulletList([
        "Close the application fully and reopen it",
        "Restart the device to clear accumulated state",
        "Check for application and system updates",
        "Verify permissions and network access",
        "Disable extensions, plugins or add-ons",
        "Clear the application cache",
        "Reset settings to defaults",
        "Reinstall, having confirmed data is stored elsewhere",
      ]),

      paragraph(
        "Each step eliminates an entire class of causes, which is why following the order is more efficient than jumping directly to reinstallation."
      ),

      heading("Crashes on Launch", 2),

      paragraph(
        "An application that closes immediately is usually failing during initialization, often because of a corrupted preferences file, a missing dependency, or an incompatible add-on. Starting in a safe or reduced mode where available isolates this quickly."
      ),

      heading("Freezing and Resource Exhaustion", 2),

      paragraph(
        "Freezes frequently indicate the application is waiting on something: a network request, a file lock, or a full disk. Checking system resource usage during a freeze usually reveals whether it is waiting or genuinely overloaded."
      ),

      heading("Conflicts and Add-Ons", 2),

      paragraph(
        "Extensions and plugins run inside the host application with substantial access, and they break regularly after updates. Disabling them all and re-enabling in batches identifies the responsible one faster than examining them individually."
      ),

      heading("Settings and Cache Corruption", 2),

      paragraph(
        "Clearing a cache is generally safe and often effective. Resetting settings is more disruptive but preserves documents, while reinstalling removes the application without necessarily removing its stored data."
      ),

      heading("When to Stop Troubleshooting", 2),

      paragraph(
        "If a problem began immediately after a system upgrade and the application has not been updated for it, waiting for a compatible version is often the only real solution. Similarly, an unmaintained application on a current system may simply have reached its end."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover diagnosing specific applications, interpreting error messages, clearing caches and settings, and performing clean reinstallations."
      ),
    ]),
  },

  {
    slug: "video-streaming",
    parentSlug: "streaming-entertainment",

    description:
      "Fix and optimize video streaming, including buffering, quality settings, device compatibility and playback errors.",

    content: richContent([
      paragraph(
        "Streaming video travels through a service, a network, a device, an application, and a display. A problem anywhere in that chain shows up the same way on screen, which is why isolating the layer matters more than adjusting settings at random."
      ),

      paragraph(
        "The good news is that a few quick tests separate the possibilities almost immediately: another title, another device, another network."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers video playback quality and reliability, including buffering, resolution, high dynamic range, audio, subtitles, device compatibility, and playback error codes."
      ),

      bulletList([
        "Buffering and interruptions",
        "Resolution and quality settings",
        "High dynamic range and colour",
        "Audio formats and sync",
        "Subtitles and captions",
        "Device and application compatibility",
        "Error codes and playback failures",
        "Downloads and offline playback",
      ]),

      heading("Why Buffering Happens", 2),

      paragraph(
        "Players download video in segments and switch quality levels based on measured bandwidth. Buffering occurs when segments cannot arrive fast enough, which usually points to the network rather than the service."
      ),

      bulletList([
        "Test whether other devices are saturating the connection",
        "Move closer to the access point or use a wired connection",
        "Check whether the problem occurs on mobile data as well",
        "Lower the quality setting to confirm bandwidth is the constraint",
        "Restart the router if the whole network is affected",
      ]),

      heading("Why Quality Is Lower Than Expected", 2),

      paragraph(
        "Maximum quality requires the plan, the title, the device, the application, the connection, and the display to all support it. Browser playback in particular is often capped at a lower resolution because of content protection requirements."
      ),

      heading("High Dynamic Range and Audio Formats", 2),

      paragraph(
        "Advanced formats require support along the entire chain including cables and connected audio equipment. A single incapable link causes a silent fallback to a standard format rather than an error message."
      ),

      heading("Isolating the Cause", 2),

      paragraph(
        "If the problem occurs on one title only, it is content related. If it follows the device, the device or application is responsible. If it affects every device on one network, the connection is the constraint. This single test resolves most uncertainty."
      ),

      heading("Downloads and Offline Viewing", 2),

      paragraph(
        "Downloaded content is stored in protected form with expiry rules and device limits. It plays only inside the service's own application and typically cannot be transferred between devices."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Picture dropping to low quality and staying there",
        "Playback failing with a generic error code",
        "Audio out of sync with video",
        "Subtitles missing for a specific title",
        "Content available on one device but not another",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover service-specific playback settings, buffering fixes, quality configuration, device setup, and error resolution."
      ),
    ]),
  },

  {
    slug: "streaming-accounts",
    parentSlug: "streaming-entertainment",

    description:
      "Manage streaming service accounts, profiles, plans, device limits, household rules and sharing restrictions.",

    content: richContent([
      paragraph(
        "A streaming account controls more than billing. It determines picture quality, how many people can watch at once, which profiles exist, what content is available in a given region, and increasingly where the account may be used."
      ),

      paragraph(
        "Household and device rules have tightened across most services, which has turned account management from a one-time setup into something that occasionally needs attention."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the account side of streaming services, including plans, profiles, device management, household verification, parental controls, and sign-in problems."
      ),

      bulletList([
        "Plan tiers, quality and simultaneous streams",
        "Profiles and separate watch histories",
        "Device registration and limits",
        "Household rules and location verification",
        "Parental controls and content ratings",
        "Sign-in, sign-out and session management",
        "Regional catalogues and availability",
      ]),

      heading("Plans, Quality and Simultaneous Streams", 2),

      paragraph(
        "Plan tiers usually bundle maximum resolution with the number of concurrent streams. A household hitting a stream limit sees an error rather than reduced quality, which is a frequent source of confusion during busy evenings."
      ),

      heading("Profiles", 2),

      paragraph(
        "Profiles separate viewing history, recommendations, watchlists, and often maturity settings. They do not usually create independent accounts, so billing, plan, and device limits remain shared across all of them."
      ),

      heading("Household Rules and Device Verification", 2),

      paragraph(
        "Several services now associate an account with a primary location and periodically verify devices against it. Travelling, using mobile data, or connecting through a VPN can trigger verification prompts even for entirely legitimate use."
      ),

      bulletList([
        "Connect to the primary home network occasionally where required",
        "Complete verification prompts promptly rather than dismissing them",
        "Use official travel or temporary access options where offered",
        "Be aware that a VPN can cause more verification issues than it solves",
      ]),

      heading("Parental Controls", 2),

      paragraph(
        "Controls restrict content by maturity rating and may require a code to change. Granularity varies, and some services apply restrictions per profile while others apply them account-wide, which affects how a family should configure them."
      ),

      heading("Regional Catalogues", 2),

      paragraph(
        "Licensing is arranged by territory, so the available catalogue changes with location. A title present in one country may be absent in another, and titles leave services when agreements expire, without any change on the viewer's side."
      ),

      heading("Sign-In and Session Management", 2),

      paragraph(
        "Reviewing signed-in devices and signing out everywhere is the standard response to unexpected streams, shared credentials, or a device that has been sold. Changing the password alone does not always terminate active sessions."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Maximum streams reached unexpectedly",
        "Repeated household verification prompts",
        "Quality capped below the plan level",
        "A profile's recommendations affected by another viewer",
        "Content disappearing from the catalogue without notice",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover account and profile setup on specific services, plan changes, device management, household verification, and parental control configuration."
      ),
    ]),
  },

  {
    slug: "websites",
    parentSlug: "web-development-design",

    description:
      "Plan, build, host and maintain websites, including domains, hosting, content management, performance and security.",

    content: richContent([
      paragraph(
        "Building a website involves three separable decisions: what the site is made of, where it lives, and what name points to it. Treating these separately makes both building and troubleshooting far more manageable."
      ),

      paragraph(
        "Most site problems belong clearly to one of those layers, and identifying which one is responsible eliminates the majority of possible causes immediately."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers creating and running websites, including platform choice, domains and DNS, hosting, content management, certificates, performance, and ongoing maintenance."
      ),

      bulletList([
        "Choosing between builders, content management systems and custom code",
        "Domain registration and DNS configuration",
        "Hosting types and requirements",
        "Certificates and secure connections",
        "Content structure and navigation",
        "Performance and page speed",
        "Backups, updates and site security",
      ]),

      heading("Domains, DNS and Hosting Are Three Things", 2),

      paragraph(
        "A domain is a rented name, DNS translates that name into a server address, and hosting is where the site actually runs. They are often bought together but can be changed independently, and each fails in its own recognizable way."
      ),

      paragraph(
        "DNS changes propagate gradually, which explains a site appearing to work in one location and not another shortly after a change."
      ),

      heading("Choosing a Platform", 2),

      paragraph(
        "Site builders are fastest and most constrained, content management systems balance flexibility with maintenance, and custom development offers complete control at the highest cost in time and ongoing care."
      ),

      bulletList([
        "Consider who will update content after launch",
        "Check whether content can be exported if the platform changes",
        "Account for ongoing maintenance, not just initial build time",
        "Verify that required integrations are supported",
      ]),

      heading("Performance", 2),

      paragraph(
        "Images are usually the largest contributor to slow pages, followed by scripts and third-party embeds. Serving appropriately sized images in modern formats often produces a larger improvement than any other single change."
      ),

      heading("Security and Maintenance", 2),

      paragraph(
        "A live site needs continuing attention: platform and plugin updates, certificate renewal, backups, form spam control, and monitoring. Most compromised sites are running outdated components rather than being targeted specifically."
      ),

      heading("Going Live and Afterwards", 2),

      paragraph(
        "Launch is not the end of the work. Broken links, missing redirects from old addresses, incorrect metadata, and pages excluded from indexing are the most common post-launch issues and are all straightforward to check."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A domain pointing to the wrong location after a change",
        "Secure connection warnings after certificate expiry",
        "Site working on one device or network but not another",
        "Pages slow to load on mobile connections",
        "Content updates not appearing because of caching",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover domain and hosting setup, platform configuration, certificate installation, performance improvement, and site maintenance procedures."
      ),
    ]),
  },

  {
    slug: "web-tools",
    parentSlug: "web-development-design",

    description:
      "Use browser developer tools, editors, version control, testing and deployment tools that support web work.",

    content: richContent([
      paragraph(
        "Web work depends on a supporting toolchain as much as on the code itself. Editors, developer tools, version control, and deployment systems determine how quickly problems are found and how safely changes reach a live site."
      ),

      paragraph(
        "Most of these tools are free and already installed. The browser alone contains a full inspection environment that answers a large share of front-end questions without any additional software."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the practical tools used to build, inspect, test, and deploy web projects, including developer tools, editors, version control, testing utilities, and deployment workflows."
      ),

      bulletList([
        "Browser developer tools and inspection",
        "Code editors and extensions",
        "Version control and repositories",
        "Local development environments",
        "Testing across browsers and devices",
        "Performance and accessibility auditing",
        "Deployment and hosting workflows",
      ]),

      heading("Browser Developer Tools", 2),

      paragraph(
        "Developer tools expose the rendered structure, applied styles, network requests, console output, and performance timeline of any page. They are the fastest way to determine whether a problem is in the markup, the styling, the script, or the server response."
      ),

      bulletList([
        "Inspect elements to see which styles actually apply",
        "Use the network panel to find failed or slow requests",
        "Check the console for errors before investigating anything else",
        "Emulate device sizes to test responsive layout",
        "Throttle the connection to test on slower networks",
      ]),

      heading("Version Control", 2),

      paragraph(
        "Version control records every change, allows reverting to earlier states, and makes collaboration possible without overwriting other people's work. It is valuable even for a solo project, because it turns mistakes into recoverable events."
      ),

      heading("Local Development", 2),

      paragraph(
        "Running a site locally allows changes to be tested before they reach anyone. Differences between local and live environments, such as configuration, versions, or paths, are a frequent cause of code that works in one and fails in the other."
      ),

      heading("Testing Across Browsers and Devices", 2),

      paragraph(
        "Browsers implement standards with differences, and mobile behaviour frequently differs from a resized desktop window. Testing on real devices catches issues that emulation does not, particularly around touch interaction and fonts."
      ),

      heading("Auditing Performance and Accessibility", 2),

      paragraph(
        "Built-in audit tools report page speed, accessibility issues, and best practice violations with specific recommendations. They are a reliable starting point, though their scores should guide work rather than become the goal in themselves."
      ),

      heading("Deployment", 2),

      paragraph(
        "Deployment moves changes from a development environment to a live one. Automated deployment reduces mistakes, and a staging environment allows verification before anything reaches actual visitors."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover using developer tools for specific tasks, setting up editors and version control, configuring local environments, and deployment procedures."
      ),
    ]),
  },

  {
    slug: "android-apps",
    parentSlug: "mobile-apps",

    description:
      "Install, configure, update and troubleshoot Android applications, including permissions, storage, notifications and the Play Store.",

    content: richContent([
      paragraph(
        "Android runs on hardware from many manufacturers, each adding its own interface layer, battery management, and system utilities. The same application can therefore behave differently on two phones running the same Android version."
      ),

      paragraph(
        "Manufacturer battery optimization is the most frequent cause of that difference, and it explains a large share of missing notifications and background sync problems."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers Android applications specifically, including installation, updates, permissions, storage and caches, notifications, default apps, and troubleshooting."
      ),

      bulletList([
        "Installing and updating from the store",
        "Permissions and privacy controls",
        "Notifications and channels",
        "Battery optimization and background limits",
        "Storage, cache and app data",
        "Default applications and app links",
        "Crashes, freezes and force stops",
        "Uninstalling and disabling preinstalled apps",
      ]),

      heading("Permissions on Android", 2),

      paragraph(
        "Permissions are requested at the moment they are needed and can be granted once, only while in use, or permanently. The system also revokes permissions automatically from applications that have not been opened for a long time."
      ),

      bulletList([
        "Use approximate location where precision is unnecessary",
        "Grant access to selected media rather than all files",
        "Review the permission manager to see grants by category",
        "Watch for special access such as displaying over other apps",
      ]),

      heading("Battery Optimization and Background Activity", 2),

      paragraph(
        "Aggressive power management can suspend applications entirely, preventing background syncing and delaying notifications. Excluding specific applications from optimization is often the only fix for messaging or alarm apps that arrive late."
      ),

      heading("Notifications and Channels", 2),

      paragraph(
        "Android groups notifications into channels, each with its own importance level and sound. This allows fine control but also means a single channel can be silenced accidentally while the application appears otherwise enabled."
      ),

      heading("Storage, Cache and App Data", 2),

      paragraph(
        "Clearing a cache removes temporary files and is generally safe. Clearing storage or data resets the application entirely, removing accounts, settings, and any local content that was never synced elsewhere."
      ),

      heading("Default Apps and Links", 2),

      paragraph(
        "Defaults determine which application opens a file type or a link. Verified app links route web addresses directly into an application, and resetting these preferences resolves links opening in the wrong place."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Notifications arriving late or only when the app is opened",
        "An app not compatible with a specific device in the store",
        "Downloads stuck as pending",
        "Storage full despite few visible files",
        "An app crashing immediately after opening",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover Android installation and update procedures, permission and notification settings, battery exclusions, storage cleanup, and app troubleshooting."
      ),
    ]),
  },

  {
    slug: "iphone-apps",
    parentSlug: "mobile-apps",

    description:
      "Install, configure, update and troubleshoot iPhone applications, including permissions, storage, notifications and the App Store.",

    content: richContent([
      paragraph(
        "iPhone applications operate under a consistent set of rules across every device, which makes behaviour more predictable than on open platforms. The trade-off is less flexibility in how applications are installed and what they are permitted to do."
      ),

      paragraph(
        "That consistency means most problems have a small number of likely causes, usually involving permissions, storage, background refresh, or account state."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers iPhone applications specifically, including installation and updates, permissions, notifications, storage management, background behaviour, purchases, and troubleshooting."
      ),

      bulletList([
        "Installing, updating and redownloading apps",
        "Permissions and privacy settings",
        "Notifications, focus modes and delivery",
        "Background app refresh and data use",
        "Storage, offloading and app data",
        "Subscriptions and in-app purchases",
        "Crashes, freezes and reinstallation",
      ]),

      heading("Permissions and Privacy", 2),

      paragraph(
        "Applications must request access to location, camera, microphone, contacts, photos, and tracking. Several of these offer narrower choices, such as approximate location or access to selected photographs only."
      ),

      bulletList([
        "Choose while-using access rather than always where possible",
        "Limit photo access to selected items",
        "Review tracking permission per application",
        "Check local network permission for apps that control devices at home",
      ]),

      heading("Notifications and Focus Modes", 2),

      paragraph(
        "Notification delivery depends on per-application settings, focus modes, scheduled summaries, and delivery styles. Missing notifications are usually caused by this layering rather than by the application failing to send them."
      ),

      heading("Background Refresh", 2),

      paragraph(
        "Background app refresh determines whether an application may update while not in use. Disabling it saves battery but causes content to load only when the application is opened, which can appear to be a syncing fault."
      ),

      heading("Storage and Offloading", 2),

      paragraph(
        "Offloading removes an application while keeping its documents and data, so reinstalling restores everything. Deleting removes both. Knowing the difference prevents unnecessary data loss when freeing space."
      ),

      heading("Subscriptions and Purchases", 2),

      paragraph(
        "Subscriptions bought inside an application are managed through the account rather than the application itself. Deleting an application does not cancel its subscription, which is a frequent cause of continuing charges."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "An app stuck while updating or installing",
        "Storage full with a large unspecified system category",
        "Notifications silenced by an active focus mode",
        "An app crashing after a system update",
        "A purchase not appearing after reinstalling",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover iPhone app installation, permission and notification configuration, storage management, subscription handling, and app troubleshooting."
      ),
    ]),
  },

  {
    slug: "printing",
    parentSlug: "printers-scanners",

    description:
      "Set up printers, manage print jobs, fix quality problems, and resolve connection and driver issues.",

    content: richContent([
      paragraph(
        "A print job passes through an application, a driver, a print queue, a connection, and the printer's own processing before anything appears on paper. Each stage can stop the job, and each produces a different symptom."
      ),

      paragraph(
        "Knowing which stage failed converts an unpredictable problem into a specific one. A job stuck in the queue is a different issue entirely from a job that prints with missing colour."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers printing specifically, including printer setup, connection methods, drivers, print queues, print settings, quality problems, paper handling, and consumables."
      ),

      bulletList([
        "Adding and configuring a printer",
        "USB, network and wireless connections",
        "Drivers and printer software",
        "Print queue management",
        "Print settings, scaling and page setup",
        "Print quality problems",
        "Paper jams and feeding issues",
        "Ink, toner and consumable management",
      ]),

      heading("Connections and Why Printers Go Offline", 2),

      paragraph(
        "Network printers are usually located by address, and that address can change when a router restarts or reassigns it. A printer showing as offline while clearly powered on is most often a lost or changed network address."
      ),

      bulletList([
        "Reserve a fixed address for the printer on the router",
        "Reconnect the printer after any network password change",
        "Test with a direct cable connection to isolate network issues",
        "Print a network configuration page from the printer itself",
      ]),

      heading("Drivers and Printer Software", 2),

      paragraph(
        "A generic driver usually handles basic printing, while the manufacturer's driver enables duplexing, tray selection, colour management, and device-specific options. Many printing oddities disappear after installing the proper driver."
      ),

      heading("The Print Queue", 2),

      paragraph(
        "Jobs accumulate in a queue and one stuck job blocks everything behind it. Clearing the queue, and restarting the print service where necessary, resolves a large share of situations where nothing prints and no error is shown."
      ),

      heading("Quality Problems", 2),

      paragraph(
        "Faded output, streaks, banding, and missing colours usually indicate low consumables, clogged nozzles, or an incorrect paper type setting. Running the printer's own cleaning routine and printing a test page from the device isolates hardware from software."
      ),

      heading("Paper Handling", 2),

      paragraph(
        "Jams and misfeeds often come from paper condition and loading rather than mechanical failure. Fanning the stack, checking the guides, using the correct weight, and keeping paper away from humidity prevent most of them."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Printer shown as offline while switched on",
        "Jobs queuing but never printing",
        "Output scaled or cropped differently from the preview",
        "One colour missing despite a full cartridge",
        "Wireless printing failing after a router change",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover printer setup and connection, driver installation, queue management, quality troubleshooting, and consumable replacement."
      ),
    ]),
  },

  {
    slug: "scanning",
    parentSlug: "printers-scanners",

    description:
      "Scan documents and photographs, choose resolution and formats, use OCR, and fix common scanning problems.",

    content: richContent([
      paragraph(
        "Scanning converts a physical page into a digital file, and the decisions made during that conversion determine whether the result is a useful document or just a large picture of one."
      ),

      paragraph(
        "Resolution, format, colour mode, and text recognition each affect quality, file size, and whether the content can be searched later."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers scanning hardware and workflows, including scanner setup, resolution and format choice, text recognition, multi-page documents, mobile scanning, and common quality problems."
      ),

      bulletList([
        "Scanner setup and software",
        "Resolution and colour mode",
        "File formats for documents and images",
        "Optical character recognition",
        "Multi-page and duplex scanning",
        "Scanning with a phone camera",
        "Scanning photographs and film",
        "File size and quality balance",
      ]),

      heading("Choosing Resolution", 2),

      paragraph(
        "Text documents rarely need high resolution, and excessive settings produce very large files without improving readability. Photographs and material intended for enlargement or archival storage benefit from considerably higher settings."
      ),

      bulletList([
        "Standard text documents scan well at moderate resolution",
        "Text intended for recognition benefits from a modest increase",
        "Photographs for printing need substantially more detail",
        "Small originals to be enlarged require the highest settings",
      ]),

      heading("Formats and Colour Mode", 2),

      paragraph(
        "Document formats suit multi-page material and can embed recognized text, while image formats suit single pictures. Scanning text in greyscale or black and white rather than colour reduces file size dramatically with no loss of legibility."
      ),

      heading("Optical Character Recognition", 2),

      paragraph(
        "Text recognition converts a scanned image into selectable, searchable content. Accuracy depends on the clarity of the original, the scan quality, straight alignment, and good contrast, which makes a careful scan more valuable than heavy correction afterwards."
      ),

      heading("Scanning With a Phone", 2),

      paragraph(
        "Phone scanning applications detect page edges, correct perspective, and enhance contrast automatically. With even lighting and a steady position, results are entirely adequate for most everyday documents."
      ),

      heading("Scanning Photographs", 2),

      paragraph(
        "Photographs require higher resolution, careful handling, and a clean glass surface. Dust becomes visible at high resolution, and cleaning the original and the scanner beforehand saves substantial retouching later."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Scanner not detected by the computer",
        "Scans appearing dark, washed out or tinted",
        "Lines or streaks across every page",
        "Text recognition producing poor accuracy",
        "Files far larger than expected",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover scanner setup, resolution and format selection, text recognition configuration, mobile scanning, and scan quality troubleshooting."
      ),
    ]),
  },

  {
    slug: "smart-tv-devices",
    parentSlug: "smart-home-iot",

    description:
      "Connect smart TVs and streaming devices to a smart home, including voice control, casting, automations and network setup.",

    content: richContent([
      paragraph(
        "Inside a smart home, a television is a connected device like any other. It joins the network, receives updates, responds to voice commands, and can participate in automations alongside lights, speakers, and sensors."
      ),

      paragraph(
        "That role is separate from its function as a display. A television can produce an excellent picture while being a poor smart-home participant, and an external streaming device often handles the connected side better."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers televisions and streaming devices as part of a connected home, including network setup, voice assistant integration, casting, automation, and shared control."
      ),

      bulletList([
        "Connecting a television to the home network",
        "Voice assistant integration and commands",
        "Casting and screen mirroring",
        "Automations involving the television",
        "Remote control through phones and hubs",
        "Streaming devices as an alternative platform",
        "Privacy settings and viewing data",
      ]),

      heading("Network Setup and Placement", 2),

      paragraph(
        "Televisions are usually placed against a wall in a fixed location, often behind furniture or a media unit, which is among the worst positions for wireless reception. A wired connection is almost always more reliable and worth the effort."
      ),

      heading("Voice Assistants and Control", 2),

      paragraph(
        "Voice control may be built into the television, provided by a connected speaker, or supplied by an external streaming device. Capabilities differ considerably, with some setups controlling only power and volume while others handle content search directly."
      ),

      heading("Casting and Mirroring", 2),

      paragraph(
        "Casting instructs the television to fetch content itself, while mirroring streams the device's screen continuously. Casting is far more reliable and does not depend on the sending device staying awake or connected."
      ),

      bulletList([
        "Both devices usually need to be on the same network",
        "Guest network isolation commonly blocks device discovery",
        "Mirroring is more sensitive to wireless quality than casting",
        "Some routers require specific settings for device discovery to work",
      ]),

      heading("Automations", 2),

      paragraph(
        "A television can act as a trigger or a target in automations, such as dimming lights when playback starts or switching off when the house is set to away. Support depends on the platform and is usually more limited than for simple devices."
      ),

      heading("Streaming Devices as an Alternative", 2),

      paragraph(
        "When a television's built-in platform becomes slow or loses application support, an external streaming device restores both without replacing the panel. It also often integrates better with a chosen smart-home ecosystem."
      ),

      heading("Privacy Considerations", 2),

      paragraph(
        "Connected televisions may collect viewing information for recommendations and advertising, including automatic content recognition. These settings are usually adjustable, though they are frequently enabled by default during setup."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Casting devices not discovering the television",
        "Voice commands controlling power but not content",
        "The television dropping off the network overnight",
        "Automations triggering inconsistently",
        "Applications no longer updating on an older set",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover network setup for televisions, voice assistant integration, casting configuration, automation setup, and privacy settings."
      ),
    ]),
  },

  {
    slug: "smart-speakers",
    parentSlug: "smart-home-iot",

    description:
      "Set up and troubleshoot smart speakers and voice assistants, including routines, multi-room audio, and privacy controls.",

    content: richContent([
      paragraph(
        "A smart speaker is a microphone array, a speaker, and a network connection wrapped around a voice assistant. It is usually the first smart-home device people buy and often becomes the control point for everything else."
      ),

      paragraph(
        "Because it listens for a wake word and connects to a cloud service, it also raises questions about accuracy, privacy, and what happens when the internet is unavailable."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers smart speakers and displays, including setup, voice assistant configuration, device control, routines, multi-room audio, music services, and privacy settings."
      ),

      bulletList([
        "Initial setup and network connection",
        "Voice assistant accounts and preferences",
        "Controlling other smart devices by voice",
        "Routines and automations",
        "Multi-room audio and speaker groups",
        "Music and streaming service linking",
        "Voice recognition for multiple household members",
        "Microphone control and recording history",
      ]),

      heading("How Voice Assistants Work", 2),

      paragraph(
        "The device listens locally for a wake word and only then sends audio to a cloud service for interpretation. This is why a disconnected speaker can do almost nothing, and why misheard wake words occasionally trigger unintended recordings."
      ),

      heading("Controlling Other Devices", 2),

      paragraph(
        "Voice control of lights, plugs, thermostats, and locks requires the devices to be linked to the same assistant account. Naming matters considerably, since names that sound similar produce unreliable results."
      ),

      bulletList([
        "Use distinct, easily pronounced device names",
        "Group devices by room for natural commands",
        "Avoid names that resemble built-in commands",
        "Test commands after renaming anything",
      ]),

      heading("Routines and Automations", 2),

      paragraph(
        "Routines chain multiple actions to a single trigger such as a phrase, a time, or a device state. They are where a collection of smart devices begins to feel like a system rather than a set of voice-operated switches."
      ),

      heading("Multi-Room Audio", 2),

      paragraph(
        "Speakers can be grouped for synchronized playback, which depends heavily on network stability. Drift or dropouts in a group nearly always indicate a wireless problem rather than a fault in the speakers."
      ),

      heading("Privacy and Voice History", 2),

      paragraph(
        "Assistants retain voice recordings by default in most cases, and these can usually be reviewed, deleted, or set to delete automatically. A physical microphone switch provides the most definitive control when it is available."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Speaker responding to something that was not the wake word",
        "Devices not found despite being connected",
        "Music playing on the wrong speaker",
        "Group playback out of sync",
        "Voice recognition confusing household members",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover speaker setup, assistant configuration, device linking, routine creation, audio grouping, and privacy management."
      ),
    ]),
  },

  {
    slug: "photos",
    parentSlug: "photos-media",

    description:
      "Organize, edit, back up, transfer and recover photographs across phones, computers and cloud photo libraries.",

    content: richContent([
      paragraph(
        "Photographs accumulate faster than any other type of file and matter more than almost all of them. A library grows by thousands of images a year with no natural point at which anyone reviews or organizes it."
      ),

      paragraph(
        "That combination makes photo management a question of systems rather than effort. A small amount of structure applied consistently keeps a library usable at any size."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers photograph handling, including library organization, albums and tags, editing, formats, transfers between devices, backups, and recovering deleted images."
      ),

      bulletList([
        "Photo libraries and organization",
        "Albums, tags, faces and search",
        "Editing and non-destructive adjustments",
        "Image formats and conversion",
        "Transferring photos between devices",
        "Backups and cloud photo services",
        "Duplicates and storage cleanup",
        "Recovering deleted photographs",
      ]),

      heading("Organizing Without Constant Effort", 2),

      paragraph(
        "Modern libraries organize by date automatically and can group by location, people, and content. Albums are most useful for deliberate collections, while search handles the rest, which makes an elaborate folder structure unnecessary."
      ),

      bulletList([
        "Delete obvious failures soon after capture",
        "Use favourites to mark images worth revisiting",
        "Create albums for events rather than categories",
        "Let dates and search handle general retrieval",
      ]),

      heading("Editing Without Losing the Original", 2),

      paragraph(
        "Non-destructive editing stores adjustments separately from the image, so the original remains intact and edits can be revised or removed later. Editing and saving over a compressed file repeatedly compounds quality loss permanently."
      ),

      heading("Formats", 2),

      paragraph(
        "Modern efficient formats store the same quality in roughly half the space, though older software may not open them. Raw files preserve far more information for editing at the cost of much larger file sizes."
      ),

      heading("Transfers Between Devices", 2),

      paragraph(
        "Transfer methods differ in whether they preserve full resolution and metadata. Messaging applications and some sharing tools compress heavily, so direct transfer, cable, or a cloud service preserves quality better."
      ),

      heading("Backups and Cloud Photo Services", 2),

      paragraph(
        "Cloud photo services synchronize rather than back up. A deletion propagates to every device, and although a trash area provides a limited window, an independent copy is what actually protects an irreplaceable library."
      ),

      heading("Recovering Deleted Photographs", 2),

      paragraph(
        "Most services and devices retain deleted images in a recoverable area for a period, commonly around a month. After that, recovery depends on a separate backup, since the space is reclaimed."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Photos missing on one device but present on another",
        "Duplicates appearing after changing services",
        "Dates incorrect after transfer",
        "Uploads stalling or never completing",
        "Storage full because of the photo library",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover library setup, organization methods, editing workflows, transfer procedures, backup configuration, and photo recovery."
      ),
    ]),
  },

  {
    slug: "videos",
    parentSlug: "photos-media",

    description:
      "Work with video files, including formats and codecs, editing basics, compression, playback problems and transfers.",

    content: richContent([
      paragraph(
        "Video files are the largest media most people handle and the least understood. A single file combines a container, a video codec, an audio codec, and sometimes subtitle tracks, each of which affects compatibility independently."
      ),

      paragraph(
        "This is why a video can play on one device and not another despite being the same file, and why converting it sometimes fixes the problem while re-downloading does not."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers video files and workflows, including formats and codecs, playback, editing basics, compression and export, transfers, and storage management."
      ),

      bulletList([
        "Containers, codecs and compatibility",
        "Resolution, frame rate and bit rate",
        "Playback problems and players",
        "Basic editing, trimming and joining",
        "Compression and export settings",
        "Subtitles and audio tracks",
        "Transferring and sharing large files",
        "Storage requirements and archiving",
      ]),

      heading("Containers Versus Codecs", 2),

      paragraph(
        "A container holds the streams while codecs determine how they are encoded. A device may support the container but not the codec inside it, which produces audio without video, video without audio, or a file that refuses to open at all."
      ),

      paragraph(
        "A media player with broad codec support resolves most playback problems without any conversion, which is worth trying before re-encoding a large file."
      ),

      heading("What Determines Quality and Size", 2),

      bulletList([
        "Resolution sets the pixel dimensions of each frame",
        "Frame rate affects motion smoothness",
        "Bit rate determines how much data describes each second",
        "Codec efficiency affects quality at a given bit rate",
        "Compression applied repeatedly compounds quality loss",
      ]),

      paragraph(
        "Bit rate is usually the most important factor for perceived quality. A high resolution file at a low bit rate often looks worse than a lower resolution one encoded well."
      ),

      heading("Editing Basics", 2),

      paragraph(
        "Simple operations such as trimming and joining can often be done without re-encoding, which preserves quality and completes almost instantly. Anything involving effects, transitions, or format changes requires a full re-encode."
      ),

      heading("Compression and Export", 2),

      paragraph(
        "Export settings should match the destination. Content for a social platform will be re-encoded regardless, so uploading at recommended specifications rather than maximum quality generally produces a better final result."
      ),

      heading("Transferring Large Files", 2),

      paragraph(
        "Video files frequently exceed the limits of email and messaging. Cloud links, direct transfer, or physical media handle them better, and messaging platforms usually compress video heavily if they accept it at all."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Video playing with no sound or sound with no video",
        "A file that opens on a computer but not a television",
        "Export taking far longer than expected",
        "Quality visibly degraded after uploading",
        "Storage filling rapidly from recorded footage",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover format conversion, playback troubleshooting, basic editing procedures, export settings, and transferring large video files."
      ),
    ]),
  },

  {
    slug: "common-problems",
    parentSlug: "troubleshooting-everyday-tech",

    description:
      "Recognize and fix the technology problems that appear most often, using a repeatable diagnostic approach.",

    content: richContent([
      paragraph(
        "The same handful of problems appear across completely different devices, brands, and years. Something is full, something is out of date, something lost permission, something is too hot, or something changed recently."
      ),

      paragraph(
        "Recognizing these patterns is more valuable than memorizing individual fixes, because the pattern transfers to devices and situations that have not been encountered before."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers the recurring problems that cut across product categories, along with the general method for diagnosing them quickly and safely."
      ),

      bulletList([
        "Slow performance across devices",
        "Storage full and its side effects",
        "Connection dropping or unavailable",
        "Applications freezing or closing unexpectedly",
        "Devices not recognizing accessories",
        "Sign-in failures and expired sessions",
        "Problems appearing immediately after an update",
      ]),

      heading("Start With What Changed", 2),

      paragraph(
        "Almost every sudden problem follows a change: an update, a new application, a password change, a router restart, a moved device, or a new accessory. Identifying the change usually identifies the cause."
      ),

      heading("Isolate Before Fixing", 2),

      bulletList([
        "Does it affect one application or everything?",
        "Does it affect one device or all of them?",
        "Does it follow the account to another device?",
        "Does it happen on a different network?",
        "Did it start at a specific moment?",
      ]),

      paragraph(
        "These five questions eliminate most possibilities within minutes and turn a vague complaint into a specific, searchable problem."
      ),

      heading("The Problems Behind Most Symptoms", 2),

      paragraph(
        "Full storage causes failures far beyond saving files, including failed updates, applications that will not launch, and messages that will not send. Insufficient free space is worth checking early in almost any investigation."
      ),

      paragraph(
        "Heat is the other frequent hidden cause. Devices reduce performance to protect themselves, so a machine that is fast when cool and slow after twenty minutes is usually thermally limited rather than failing."
      ),

      heading("Why Restarting Works", 2),

      paragraph(
        "A restart clears stuck processes, releases memory, resets connections, and discards temporary state that has accumulated. It is genuinely diagnostic rather than superstitious, because a problem that survives a restart is a different kind of problem."
      ),

      heading("Knowing When to Escalate", 2),

      paragraph(
        "Physical damage, liquid exposure, suspected data loss, warranty-covered failures, and anything involving compromised financial accounts should go to a professional or the provider rather than continued experimentation."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here apply this approach to specific recurring problems, with step-by-step diagnosis and resolution for the situations people encounter most often."
      ),
    ]),
  },

  {
    slug: "device-troubleshooting",
    parentSlug: "troubleshooting-everyday-tech",

    description:
      "Diagnose hardware faults including power failures, charging problems, overheating, display issues and unresponsive devices.",

    content: richContent([
      paragraph(
        "Hardware problems differ from software problems in an important way: repeating an action rarely helps, and continuing to try can occasionally make things worse, particularly where storage or power is involved."
      ),

      paragraph(
        "Diagnosis therefore depends on isolating components methodically, substituting known-good parts where possible, and recognizing early when a problem needs professional attention."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers physical device faults and their diagnosis, including power and charging, overheating, displays, input devices, accessories, storage failures, and physical damage."
      ),

      bulletList([
        "Devices that will not power on",
        "Charging and battery problems",
        "Overheating and thermal shutdown",
        "Display faults and blank screens",
        "Keyboards, trackpads and touchscreens",
        "Ports, cables and accessory recognition",
        "Storage failure warning signs",
        "Liquid and physical damage",
      ]),

      heading("Power Problems: Work From the Wall Inward", 2),

      paragraph(
        "Testing in order avoids replacing the most expensive component first. The outlet, the adapter, the cable, the connector, and the battery each fail more often than the device itself, and each can be tested separately."
      ),

      bulletList([
        "Try a different outlet and a different cable",
        "Look for charging indicator lights on the adapter or device",
        "Try a long press to force a restart",
        "Allow a deeply discharged battery time to charge before testing",
        "Listen and feel for fans, vibration or heat as signs of activity",
      ]),

      heading("Overheating", 2),

      paragraph(
        "Persistent heat usually comes from blocked airflow, accumulated dust, an unusually heavy workload, or ageing thermal materials. Devices reduce performance and eventually shut down to protect components, which is a safety behaviour rather than a fault."
      ),

      heading("Display Problems", 2),

      paragraph(
        "Connecting an external display separates a screen fault from a system fault. If the external display works correctly, the problem is in the panel, the cable, or the hinge wiring rather than in the computer itself."
      ),

      heading("Ports and Accessories", 2),

      paragraph(
        "A device not recognizing an accessory may be a cable, a port, the accessory, or a driver. Testing the same accessory on another device and another accessory in the same port identifies which within a minute."
      ),

      heading("Storage Failure Signs", 2),

      paragraph(
        "Unusual noises, very slow file access, files disappearing, repeated corruption, and failure to boot all suggest a failing drive. The correct response is to stop using it and copy critical data immediately, since continued use reduces the chance of recovery."
      ),

      heading("Liquid and Physical Damage", 2),

      paragraph(
        "Liquid exposure calls for powering off immediately and not attempting to charge or switch on, since current combined with moisture causes further damage. Professional attention early gives a substantially better outcome than testing to see whether it still works."
      ),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover diagnostic procedures for specific hardware symptoms, including power, charging, thermal, display, and storage faults."
      ),
    ]),
  },

  {
    slug: "online-accounts",
    parentSlug: "online-services-platforms",

    description:
      "Manage accounts across web services and platforms, including roles, workspaces, access, sign-in methods and offboarding.",

    content: richContent([
      paragraph(
        "On most online platforms, an account is not a single thing. There is the person, the workspace or organization they belong to, and the role that connects the two, and each can be changed independently of the others."
      ),

      paragraph(
        "Almost every access problem on a business platform comes from this structure. The account exists, the sign-in works, and the permission is missing, or the workspace membership was never completed."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers account and access management on online platforms, including sign-in methods, workspaces, roles and permissions, invitations, seat management, and removing access."
      ),

      bulletList([
        "Account creation and sign-in methods",
        "Workspaces, organizations and teams",
        "Roles, permissions and admin rights",
        "Invitations and joining an existing workspace",
        "Seats, licences and user limits",
        "Single sign-on and directory-managed accounts",
        "Offboarding and transferring ownership",
      ]),

      heading("Personal Accounts Versus Managed Accounts", 2),

      paragraph(
        "An account created personally is controlled by the individual, while one provisioned through an organization is controlled by an administrator who can reset access, change permissions, or remove the account entirely."
      ),

      paragraph(
        "Mixing the two causes recurring difficulty, particularly when personal work ends up inside a managed account that is later revoked."
      ),

      heading("Roles and Permissions", 2),

      paragraph(
        "Roles bundle permissions into named levels such as viewer, member, editor, or administrator. A person can hold different roles in different workspaces, and permissions may also be set per project or per resource, overriding the general role."
      ),

      bulletList([
        "Check the workspace as well as the account when access fails",
        "Look for resource-level permissions overriding the role",
        "Confirm the invitation was accepted, not just sent",
        "Verify the correct account is signed in when several exist",
      ]),

      heading("Single Sign-On", 2),

      paragraph(
        "Single sign-on routes authentication through a central identity provider. When it is enforced, the platform's own password stops working, and access depends entirely on the identity provider's status and the person's directory account."
      ),

      heading("Seats and Licences", 2),

      paragraph(
        "Many platforms charge per seat and enforce a limit. Adding a member when seats are full either blocks the invitation or increases the bill, which is why removing departed members promptly matters for both cost and security."
      ),

      heading("Offboarding and Ownership Transfer", 2),

      paragraph(
        "Removing a person requires more than deleting an account. Ownership of documents, projects, integrations, and automations they created must be transferred first, or those resources can become orphaned and inaccessible."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "Signed in successfully but seeing an empty workspace",
        "An invitation link that has expired",
        "Two accounts created with different sign-in methods",
        "Access lost after single sign-on was enforced",
        "Content inaccessible after a colleague's account was removed",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover account setup on specific platforms, role and permission configuration, invitation handling, single sign-on setup, and offboarding procedures."
      ),
    ]),
  },

  {
    slug: "platform-settings",
    parentSlug: "online-services-platforms",

    description:
      "Configure workspace settings, integrations, notifications, usage limits and administration on online platforms.",

    content: richContent([
      paragraph(
        "Platform settings determine how a service behaves for everyone who uses it. Notification defaults, integrations, sharing rules, retention policies, and usage limits are decided once at the workspace level and affect every member afterwards."
      ),

      paragraph(
        "Because these settings are usually configured during a hurried initial setup and rarely revisited, reviewing them periodically often resolves complaints that seem to come from nowhere."
      ),

      heading("What This Subcategory Covers", 2),

      paragraph(
        "This section covers workspace and service configuration, including general settings, integrations, notifications, sharing and security policies, usage limits, billing administration, and data export."
      ),

      bulletList([
        "Workspace and organization settings",
        "Integrations and connected applications",
        "Notification defaults and per-user overrides",
        "Sharing, visibility and external access rules",
        "Usage limits, quotas and plan enforcement",
        "Billing administration and invoices",
        "Audit logs and activity history",
        "Data export and migration",
      ]),

      heading("Workspace Settings Versus Personal Settings", 2),

      paragraph(
        "Some settings apply to everyone and some only to the individual. When a setting appears not to take effect, it is usually because an administrator-level policy overrides the personal preference."
      ),

      heading("Integrations and Connected Applications", 2),

      paragraph(
        "Integrations grant one service permission to act inside another, and those grants persist until revoked. Reviewing them reveals tools that were connected for a trial years earlier and still hold write access."
      ),

      bulletList([
        "Audit connected applications on a regular schedule",
        "Prefer the narrowest permission scope that works",
        "Note which integrations can write or delete data",
        "Confirm what breaks before removing a connection",
      ]),

      heading("Notification Defaults", 2),

      paragraph(
        "Workspace defaults determine what new members receive, while individuals adjust their own afterwards. Complaints about excessive notifications are usually solved at the default level rather than one person at a time."
      ),

      heading("Sharing and External Access", 2),

      paragraph(
        "Policies control whether content can be shared publicly, with external collaborators, or by link. These are among the most consequential settings on any platform, since they determine the default exposure of everything created inside it."
      ),

      heading("Usage Limits and Quotas", 2),

      paragraph(
        "Limits on storage, seats, requests, or records are usually enforced gradually, with warnings before restriction. A service behaving differently without any settings change is frequently approaching a limit rather than malfunctioning."
      ),

      heading("Audit Logs and Data Export", 2),

      paragraph(
        "Audit logs record who did what and when, which is essential for investigating changes and for compliance. Export capability determines how easily information can be moved elsewhere, and is worth confirming before a platform becomes central to a workflow."
      ),

      heading("Common Problems in This Area", 2),

      bulletList([
        "A personal setting overridden by workspace policy",
        "An integration breaking after a permission change",
        "Features disappearing after reaching a plan limit",
        "External sharing blocked by an organization policy",
        "Export producing incomplete or unusable data",
      ]),

      heading("Where the Guides Begin", 2),

      paragraph(
        "The articles here cover workspace configuration on specific platforms, integration management, notification policies, sharing rules, and data export procedures."
      ),
    ]),
  },
];

const titleFromSlug = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const seedSubcategoryContent = async () => {
  try {
    await connectDB();

    console.log("\n========================================");
    console.log("DigiWork SUBCATEGORY CONTENT SEED");
    console.log("========================================\n");

    const categories = await Category.find({}).select("_id slug").lean();
    const categoryMap = new Map(
      categories.map((category) => [category.slug, category._id]),
    );
    const existingSubcategories = await Subcategory.find({})
      .select("slug name")
      .lean();
    const nameMap = new Map(
      existingSubcategories.map((subcategory) => [
        subcategory.slug,
        subcategory.name,
      ]),
    );

    const deleted = await Subcategory.deleteMany({});
    console.log(`Removed subcategories: ${deleted.deletedCount}`);

    const documents = subCategoryContent.map((item, index) => {
      const categoryId = categoryMap.get(item.parentSlug);

      if (!categoryId) {
        throw new Error(
          `Category not found for subcategory: ${item.parentSlug}`,
        );
      }

      return {
        category: categoryId,
        name: nameMap.get(item.slug) || titleFromSlug(item.slug),
        slug: item.slug,
        description: item.description,
        content: item.content,
        order: index + 1,
        status: "published",
        isActive: true,
      };
    });

    const created = await Subcategory.insertMany(documents);

    console.log(`Created subcategories: ${created.length}`);
    console.log("\n========================================");
    console.log("SUBCATEGORY CONTENT SEED COMPLETED");
    console.log("========================================\n");

    await Subcategory.db.close();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Subcategory content seed failed");
    console.error(error);
    await Subcategory.db.close();
    process.exit(1);
  }
};

seedSubcategoryContent();
