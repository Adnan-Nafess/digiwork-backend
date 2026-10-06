const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Article = require("../models/Article");
const Admin = require("../models/Admin");

const connectDB = require("../config/db");

// ============================================================
// CATEGORIES
// ============================================================

const categories = [
  {
    name: "Accounts & Subscriptions",
    slug: "accounts-and-subscriptions",
    description:
      "Practical guides for managing online accounts, subscriptions, passwords, profiles, and account settings.",
    icon: "briefcase",
    order: 1,
  },
  {
    name: "Computers & Operating Systems",
    slug: "computers-and-operating-systems",
    description:
      "Helpful guides for Windows, macOS, Linux, system settings, storage, updates, and everyday computer problems.",
    icon: "laptop",
    order: 2,
  },
  {
    name: "Devices & Hardware",
    slug: "devices-and-hardware",
    description:
      "Simple guides for smartphones, laptops, monitors, smart TVs, accessories, and everyday devices.",
    icon: "smartphone",
    order: 3,
  },
  {
    name: "Email & Communication",
    slug: "email-and-communication",
    description:
      "Guides for email accounts, messages, notifications, contacts, and common communication problems.",
    icon: "mail",
    order: 4,
  },
  {
    name: "Files, Data & Cloud Storage",
    slug: "files-data-and-cloud-storage",
    description:
      "Learn how to manage files, backups, cloud storage, downloads, and data across your devices.",
    icon: "folder",
    order: 5,
  },
  {
    name: "Gaming",
    slug: "gaming",
    description:
      "Useful guides for gaming accounts, settings, controllers, performance, downloads, and common gaming issues.",
    icon: "gamepad-2",
    order: 6,
  },
  {
    name: "Internet & Networking",
    slug: "internet-and-networking",
    description:
      "Practical help with Wi-Fi, routers, internet connections, browsers, and everyday network problems.",
    icon: "globe",
    order: 7,
  },
  {
    name: "Payments, Billing & Commerce",
    slug: "payments-billing-and-commerce",
    description:
      "Guides for online payments, billing information, orders, refunds, invoices, and shopping accounts.",
    icon: "credit-card",
    order: 8,
  },
  {
    name: "Productivity & Office Tools",
    slug: "productivity-and-office-tools",
    description:
      "Helpful guides for documents, spreadsheets, presentations, calendars, notes, and everyday productivity tools.",
    icon: "bar-chart-3",
    order: 9,
  },
  {
    name: "Security & Privacy",
    slug: "security-and-privacy",
    description:
      "Simple guides for account security, privacy settings, safer browsing, authentication, and device protection.",
    icon: "lock",
    order: 10,
  },
  {
    name: "Social Media",
    slug: "social-media",
    description:
      "Guides for managing social profiles, posts, messages, notifications, privacy settings, and account features.",
    icon: "users",
    order: 11,
  },
  {
    name: "Software & App Operations",
    slug: "software-and-app-operations",
    description:
      "Practical help for installing, updating, configuring, and troubleshooting software and applications.",
    icon: "settings",
    order: 12,
  },
  {
    name: "Streaming & Entertainment",
    slug: "streaming-and-entertainment",
    description:
      "Guides for streaming services, video playback, entertainment apps, subscriptions, and viewing problems.",
    icon: "clapperboard",
    order: 13,
  },
  {
    name: "Web Development & Design",
    slug: "web-development-and-design",
    description:
      "Practical guides for websites, browsers, web tools, development workflows, and everyday web tasks.",
    icon: "monitor",
    order: 14,
  },
  {
    name: "Mobile Apps",
    slug: "mobile-apps",
    description:
      "Helpful guides for installing, updating, configuring, and troubleshooting apps on mobile devices.",
    icon: "smartphone",
    order: 15,
  },
  {
    name: "Printers & Scanners",
    slug: "printers-and-scanners",
    description:
      "Simple guides for printer setup, printing, scanning, connections, drivers, and common printer problems.",
    icon: "printer",
    order: 16,
  },
  {
    name: "Smart Home & IoT",
    slug: "smart-home-and-iot",
    description:
      "Guides for smart TVs, speakers, connected devices, home networks, and everyday smart-home tasks.",
    icon: "home",
    order: 17,
  },
  {
    name: "Photos & Media",
    slug: "photos-and-media",
    description:
      "Guides for managing photos, videos, screenshots, media files, editing tools, and device storage.",
    icon: "image",
    order: 18,
  },
  {
    name: "Troubleshooting & Everyday Tech",
    slug: "troubleshooting-and-everyday-tech",
    description:
      "Straightforward solutions for common technology problems that happen in everyday use.",
    icon: "settings",
    order: 19,
  },
  {
    name: "Online Services & Platforms",
    slug: "online-services-and-platforms",
    description:
      "Useful guides for popular online services, websites, platforms, profiles, settings, and common problems.",
    icon: "globe",
    order: 20,
  },
];

// ============================================================
// SUBCATEGORIES
// ============================================================

const subcategoryData = [
  {
    categorySlug: "accounts-and-subscriptions",
    name: "Account Settings",
    slug: "account-settings",
    description:
      "Guides for managing profiles, account information, preferences, and account settings.",
    order: 1,
  },
  {
    categorySlug: "accounts-and-subscriptions",
    name: "Subscriptions",
    slug: "subscriptions",
    description:
      "Learn how to manage recurring subscriptions, plans, renewals, and cancellations.",
    order: 2,
  },
  {
    categorySlug: "accounts-and-subscriptions",
    name: "Passwords & Recovery",
    slug: "passwords-and-recovery",
    description:
      "Guides for forgotten passwords, account recovery, and keeping account access secure.",
    order: 3,
  },

  {
    categorySlug: "computers-and-operating-systems",
    name: "Windows",
    slug: "windows",
    description:
      "Practical Windows guides covering settings, storage, updates, applications, and common problems.",
    order: 1,
  },
  {
    categorySlug: "computers-and-operating-systems",
    name: "macOS",
    slug: "macos",
    description:
      "Helpful guides for Mac settings, applications, storage, and everyday tasks.",
    order: 2,
  },
  {
    categorySlug: "computers-and-operating-systems",
    name: "System Settings",
    slug: "system-settings",
    description:
      "Guides for changing common computer settings and configuring your system.",
    order: 3,
  },

  {
    categorySlug: "devices-and-hardware",
    name: "Smartphones",
    slug: "smartphones",
    description:
      "Guides for smartphone settings, connections, storage, and everyday device tasks.",
    order: 1,
  },
  {
    categorySlug: "devices-and-hardware",
    name: "Laptops",
    slug: "laptops",
    description:
      "Helpful laptop guides covering settings, connections, battery, storage, and accessories.",
    order: 2,
  },
  {
    categorySlug: "devices-and-hardware",
    name: "Smart TVs",
    slug: "smart-tvs",
    description:
      "Guides for connecting, configuring, and using smart TVs with other devices.",
    order: 3,
  },

  {
    categorySlug: "email-and-communication",
    name: "Email",
    slug: "email",
    description:
      "Guides for email settings, messages, attachments, accounts, and common email problems.",
    order: 1,
  },
  {
    categorySlug: "email-and-communication",
    name: "Messages",
    slug: "messages",
    description:
      "Helpful guides for messaging apps, notifications, conversations, and attachments.",
    order: 2,
  },

  {
    categorySlug: "files-data-and-cloud-storage",
    name: "Cloud Storage",
    slug: "cloud-storage",
    description:
      "Guides for storing, syncing, downloading, and sharing files through cloud services.",
    order: 1,
  },
  {
    categorySlug: "files-data-and-cloud-storage",
    name: "File Management",
    slug: "file-management",
    description:
      "Learn how to organize, move, rename, delete, and find files across devices.",
    order: 2,
  },
  {
    categorySlug: "files-data-and-cloud-storage",
    name: "Backups",
    slug: "backups",
    description:
      "Simple guides for backing up important files, photos, and device data.",
    order: 3,
  },

  {
    categorySlug: "gaming",
    name: "Game Settings",
    slug: "game-settings",
    description:
      "Guides for graphics, controls, audio, accounts, and common game settings.",
    order: 1,
  },
  {
    categorySlug: "gaming",
    name: "Controllers",
    slug: "controllers",
    description:
      "Helpful guides for connecting and troubleshooting gaming controllers.",
    order: 2,
  },

  {
    categorySlug: "internet-and-networking",
    name: "Wi-Fi",
    slug: "wi-fi",
    description:
      "Practical guides for Wi-Fi connections, speed, passwords, and common connection problems.",
    order: 1,
  },
  {
    categorySlug: "internet-and-networking",
    name: "Routers",
    slug: "routers",
    description:
      "Guides for router setup, settings, connections, and everyday network problems.",
    order: 2,
  },
  {
    categorySlug: "internet-and-networking",
    name: "Browsers",
    slug: "browsers",
    description:
      "Helpful guides for browser settings, cache, cookies, downloads, and browsing problems.",
    order: 3,
  },

  {
    categorySlug: "payments-billing-and-commerce",
    name: "Online Payments",
    slug: "online-payments",
    description:
      "Guides for common online payment tasks, payment settings, and transaction issues.",
    order: 1,
  },
  {
    categorySlug: "payments-billing-and-commerce",
    name: "Orders & Refunds",
    slug: "orders-and-refunds",
    description:
      "Helpful guides for online orders, cancellations, returns, refunds, and invoices.",
    order: 2,
  },

  {
    categorySlug: "productivity-and-office-tools",
    name: "Documents",
    slug: "documents",
    description:
      "Guides for creating, editing, formatting, saving, and sharing documents.",
    order: 1,
  },
  {
    categorySlug: "productivity-and-office-tools",
    name: "Spreadsheets",
    slug: "spreadsheets",
    description:
      "Practical spreadsheet guides for everyday work and data management.",
    order: 2,
  },

  {
    categorySlug: "security-and-privacy",
    name: "Account Security",
    slug: "account-security",
    description:
      "Guides for protecting online accounts and improving account security.",
    order: 1,
  },
  {
    categorySlug: "security-and-privacy",
    name: "Privacy Settings",
    slug: "privacy-settings",
    description:
      "Learn how to review and adjust privacy settings across common services and devices.",
    order: 2,
  },

  {
    categorySlug: "social-media",
    name: "Profiles & Accounts",
    slug: "profiles-and-accounts",
    description:
      "Guides for managing social media profiles and account settings.",
    order: 1,
  },
  {
    categorySlug: "social-media",
    name: "Posts & Messages",
    slug: "posts-and-messages",
    description:
      "Helpful guides for posts, comments, direct messages, and media.",
    order: 2,
  },

  {
    categorySlug: "software-and-app-operations",
    name: "Installation",
    slug: "installation",
    description:
      "Guides for installing and setting up applications and software.",
    order: 1,
  },
  {
    categorySlug: "software-and-app-operations",
    name: "Updates",
    slug: "updates",
    description:
      "Learn how to update applications and deal with common update problems.",
    order: 2,
  },
  {
    categorySlug: "software-and-app-operations",
    name: "App Problems",
    slug: "app-problems",
    description:
      "Practical solutions for applications that crash, freeze, or stop working.",
    order: 3,
  },

  {
    categorySlug: "streaming-and-entertainment",
    name: "Video Streaming",
    slug: "video-streaming",
    description:
      "Guides for video streaming, playback, settings, and common viewing problems.",
    order: 1,
  },
  {
    categorySlug: "streaming-and-entertainment",
    name: "Streaming Accounts",
    slug: "streaming-accounts",
    description:
      "Helpful guides for profiles, subscriptions, and account settings on streaming platforms.",
    order: 2,
  },

  {
    categorySlug: "web-development-and-design",
    name: "Websites",
    slug: "websites",
    description: "Practical guides for managing and working with websites.",
    order: 1,
  },
  {
    categorySlug: "web-development-and-design",
    name: "Web Tools",
    slug: "web-tools",
    description:
      "Guides for useful browser-based tools and everyday web tasks.",
    order: 2,
  },

  {
    categorySlug: "mobile-apps",
    name: "Android Apps",
    slug: "android-apps",
    description:
      "Guides for installing, updating, configuring, and troubleshooting Android apps.",
    order: 1,
  },
  {
    categorySlug: "mobile-apps",
    name: "iPhone Apps",
    slug: "iphone-apps",
    description: "Helpful guides for managing apps on iPhone and iPad.",
    order: 2,
  },

  {
    categorySlug: "printers-and-scanners",
    name: "Printing",
    slug: "printing",
    description: "Guides for printing documents, photos, and other files.",
    order: 1,
  },
  {
    categorySlug: "printers-and-scanners",
    name: "Scanning",
    slug: "scanning",
    description:
      "Helpful guides for scanning documents and managing scanned files.",
    order: 2,
  },

  {
    categorySlug: "smart-home-and-iot",
    name: "Smart TVs",
    slug: "smart-tvs",
    description:
      "Guides for smart TV settings, connections, apps, and everyday use.",
    order: 1,
  },
  {
    categorySlug: "smart-home-and-iot",
    name: "Smart Speakers",
    slug: "smart-speakers",
    description:
      "Helpful guides for connected speakers and voice-controlled devices.",
    order: 2,
  },

  {
    categorySlug: "photos-and-media",
    name: "Photos",
    slug: "photos",
    description:
      "Guides for organizing, backing up, editing, and managing photos.",
    order: 1,
  },
  {
    categorySlug: "photos-and-media",
    name: "Videos",
    slug: "videos",
    description:
      "Helpful guides for managing, sharing, editing, and storing videos.",
    order: 2,
  },

  {
    categorySlug: "troubleshooting-and-everyday-tech",
    name: "Common Problems",
    slug: "common-problems",
    description: "Straightforward solutions for everyday technology problems.",
    order: 1,
  },
  {
    categorySlug: "troubleshooting-and-everyday-tech",
    name: "Device Troubleshooting",
    slug: "device-troubleshooting",
    description: "Guides for diagnosing and resolving common device problems.",
    order: 2,
  },

  {
    categorySlug: "online-services-and-platforms",
    name: "Online Accounts",
    slug: "online-accounts",
    description:
      "Guides for managing profiles, settings, and accounts on online platforms.",
    order: 1,
  },
  {
    categorySlug: "online-services-and-platforms",
    name: "Platform Settings",
    slug: "platform-settings",
    description:
      "Helpful guides for understanding and changing settings on online services.",
    order: 2,
  },
];

// ============================================================
// MAIN SEED
// ============================================================

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("       DigiWork Database Seed");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("");

    // --------------------------------------------------------
    // FIND ADMIN
    // --------------------------------------------------------

    const admin = await Admin.findOne({});

    if (!admin) {
      throw new Error(
        "No Admin found. Create an admin account before running the seed.",
      );
    }

    console.log(`Admin found: ${admin.name || admin.email}`);

    // --------------------------------------------------------
    // DELETE OLD CONTENT
    // --------------------------------------------------------

    console.log("");
    console.log("Removing old content...");

    const deletedArticles = await Article.deleteMany({});
    const deletedSubcategories = await Subcategory.deleteMany({});
    const deletedCategories = await Category.deleteMany({});

    console.log(`Articles removed: ${deletedArticles.deletedCount}`);
    console.log(`Subcategories removed: ${deletedSubcategories.deletedCount}`);
    console.log(`Categories removed: ${deletedCategories.deletedCount}`);

    // --------------------------------------------------------
    // INSERT CATEGORIES
    // --------------------------------------------------------

    console.log("");
    console.log("Creating categories...");

    const categoryDocuments = categories.map((category) => ({
      ...category,
      status: "published",
      isActive: true,
    }));

    const createdCategories = await Category.insertMany(categoryDocuments);

    console.log(`Categories created: ${createdCategories.length}`);

    // --------------------------------------------------------
    // CREATE CATEGORY MAP
    // --------------------------------------------------------

    const categoryMap = new Map();

    createdCategories.forEach((category) => {
      categoryMap.set(category.slug, category._id);
    });

    // --------------------------------------------------------
    // INSERT SUBCATEGORIES
    // --------------------------------------------------------

    console.log("");
    console.log("Creating subcategories...");

    const subcategoryDocuments = subcategoryData.map((subcategory) => {
      const categoryId = categoryMap.get(subcategory.categorySlug);

      if (!categoryId) {
        throw new Error(
          `Category not found for subcategory: ${subcategory.name}`,
        );
      }

      return {
        category: categoryId,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        order: subcategory.order,
        status: "published",
        isActive: true,
      };
    });

    const createdSubcategories =
      await Subcategory.insertMany(subcategoryDocuments);

    console.log(`Subcategories created: ${createdSubcategories.length}`);

    // --------------------------------------------------------
    // SUMMARY
    // --------------------------------------------------------

    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Seed completed successfully ✅");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Categories      : ${createdCategories.length}`);
    console.log(`Subcategories   : ${createdSubcategories.length}`);
    console.log("Articles        : 0");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("❌ Seed failed");
    console.error(error.message);
    console.error("");

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();






