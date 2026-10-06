const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const connectDB = require("../config/db");

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Article = require("../models/Article");

const Admin = require("../models/Admin");

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

const orderedList = (items) => ({
  type: "orderedList",
  attrs: { start: 1 },
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

/*
 * Each entry: which category + subcategory (by NAME, matching what is
 * already stored in the database) the article belongs to, plus the
 * article itself. "content" is stored as rich, structured content
 * (headings, paragraphs, ordered/bullet lists) rather than a plain string.
 */
const articleContent = [
  {
    categoryName: "Accounts & Subscriptions",
    subcategoryName: "Account Settings",
    title: "How to Update Your Account Recovery Email and Phone Number",
    slug: "how-to-update-your-account-recovery-email-and-phone-number",
    excerpt:
      "Keep your recovery details current so you never lose access to your account.",
    content: richContent([
      paragraph(
        "Your recovery email and phone number are what a service uses to confirm it is really you when something goes wrong. Most people set these once during signup and never look at them again, which is exactly why they go out of date without anyone noticing.",
      ),
      heading("Why This Matters", 2),
      paragraph(
        "A reset code, a suspicious login alert, and a locked-account recovery form all rely on the same two details. If your recovery email belongs to a job you left, or your phone number belonged to a SIM you cancelled last year, none of those safety nets actually work when you need them.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open your account or profile settings and find the section labelled Security, Personal Info, or Account Details.",
        "Locate the current recovery email and phone number on file.",
        "Replace outdated details with ones you control right now, not ones you plan to control later.",
        "Complete the verification step, usually a code sent to the new email or number.",
        "Wait for confirmation before assuming the change is final, since some services keep the old detail active for a short grace period.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Use a recovery email hosted with a different provider than your main account. If one provider has an outage or gets compromised, your recovery path stays intact.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Accounts & Subscriptions",
    subcategoryName: "Subscriptions",
    title: "How to Cancel a Subscription Before It Renews",
    slug: "how-to-cancel-a-subscription-before-it-renews",
    excerpt:
      "Stop an automatic renewal without losing access you have already paid for.",
    content: richContent([
      paragraph(
        "Subscriptions are built to continue by default. Nobody has to do anything for a renewal to happen, which is exactly why so many people get charged for something they meant to cancel weeks earlier.",
      ),
      heading("Where You Actually Bought It Matters", 2),
      paragraph(
        "A subscription can be billed directly by the service, through an app store, through a mobile carrier, or through a reseller. Cancelling only works if you do it in the same place the billing is happening. Deleting the app does not cancel a store-billed subscription, and it will keep renewing quietly in the background.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check your bank or card statement to see which name the charge appears under.",
        "Open the relevant billing location: the service's own account settings, your phone's app store subscriptions page, or your carrier's billing portal.",
        "Select the subscription and choose cancel rather than simply removing the app.",
        "Note the confirmation message, since most services tell you exactly when access will end.",
        "Check back a day or two before the stated renewal date to confirm the cancellation actually stuck.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Cancelling almost always stops the next charge while letting you keep access until the current paid period ends. There is rarely a reason to wait until the very last day to cancel.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Accounts & Subscriptions",
    subcategoryName: "Passwords Recovery",
    title: "What to Do When You Are Locked Out of Your Account",
    slug: "what-to-do-when-you-are-locked-out-of-your-account",
    excerpt:
      "Recover access safely using the reset options a service already has on file.",
    content: richContent([
      paragraph(
        "Being locked out feels urgent, and that urgency is exactly what makes people make mistakes, like repeatedly requesting resets or trying random old passwords. A calmer, more structured approach almost always works faster.",
      ),
      heading("Start With the Reset Flow", 2),
      paragraph(
        "Use the forgot password link on the sign-in page rather than trying to remember an old password. This sends a reset code or link to whatever recovery email or phone number is on file for the account.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Go to the sign-in page and select the forgot password or trouble signing in option.",
        "Choose to receive the reset code through your recovery email or phone number, whichever you still have access to.",
        "Enter the code and set a new, unique password.",
        "If neither recovery method is reachable, look for an identity verification or account recovery form instead of repeating the same reset request.",
        "Once access is restored, immediately update your recovery email and phone number so the situation is not repeated.",
      ]),
      heading("When Recovery Options Are Gone", 2),
      paragraph(
        "Without a working recovery email or phone, most services fall back to a manual review process that may ask for prior account details or purchase history. This takes longer and is not guaranteed, which is exactly why setting up recovery options in advance matters so much.",
      ),
      heading("Extra Tip", 2),
      paragraph(
        "Store backup codes somewhere separate from the account itself, such as a password manager or a printed copy in a safe place, so they remain usable during a lockout.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Computers & Operating Systems",
    subcategoryName: "Windows",
    title: "How to Fix a Windows Update That Keeps Failing",
    slug: "how-to-fix-a-windows-update-that-keeps-failing",
    excerpt:
      "Clear stuck update files and free up space to get Windows Update running again.",
    content: richContent([
      paragraph(
        "A Windows update that fails once is usually a minor hiccup. One that fails repeatedly with the same error code almost always has a specific, fixable cause rather than being a random glitch.",
      ),
      heading("The Usual Suspects", 2),
      paragraph(
        "Most repeated update failures come down to insufficient storage space, a corrupted update cache, or a driver conflicting with the new version. Trying the exact same update again without addressing one of these rarely changes the outcome.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open Settings, go to Windows Update, and run the built-in troubleshooter first, since it catches several common issues automatically.",
        "Check available storage on your main drive. Updates often need several gigabytes of temporary space beyond the update's own size.",
        "If the same error persists, reset the Windows Update components, which clears a potentially corrupted update cache.",
        "Temporarily disconnect non-essential external devices, since an incompatible driver can occasionally block installation.",
        "Restart the computer fully between each attempt rather than retrying immediately.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If the failure started right after installing a new peripheral or driver, that is very likely the actual cause. Removing or updating that driver often resolves the update failure entirely.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Computers & Operating Systems",
    subcategoryName: "macOS",
    title: "How to Fix an App Blocked by macOS Permissions",
    slug: "how-to-fix-an-app-blocked-by-macos-permissions",
    excerpt:
      "Grant the camera, microphone or file access an app needs to work properly.",
    content: richContent([
      paragraph(
        "macOS requires explicit approval before any app can use the camera, microphone, files, or other sensitive capabilities. An app that suddenly stops working after an update has often simply lost a permission it needs, rather than being broken.",
      ),
      heading("Why Permissions Get Lost", 2),
      paragraph(
        "Updating an app, moving it to a different folder, or reinstalling it can all reset previously granted permissions. The app itself has not changed its behaviour, macOS is just treating it as a new, unapproved request.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open System Settings and go to Privacy & Security.",
        "Find the category the app needs, such as Camera, Microphone, Files and Folders, or Screen Recording.",
        "Locate the app in that list and toggle access on for it.",
        "Fully quit the app and reopen it, since most apps only check permissions when they launch.",
        "If the app is not listed at all under the required category, try triggering the permission request again from inside the app.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If an app was recently updated and suddenly stopped working, check its permissions before assuming it is broken. This single step resolves a surprising number of app problems on macOS.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Computers & Operating Systems",
    subcategoryName: "System Settings",
    title: "How to Fix a Second Monitor Showing the Wrong Resolution",
    slug: "how-to-fix-a-second-monitor-showing-the-wrong-resolution",
    excerpt:
      "Match your external display to its native resolution and refresh rate.",
    content: richContent([
      paragraph(
        "An external monitor that looks blurry, stretched, or oddly sized is almost always running at the wrong resolution or refresh rate, not a hardware fault. This is usually a two-minute fix once you know where to look.",
      ),
      heading("Understanding the Two Settings", 2),
      paragraph(
        "Resolution controls how many pixels are shown, while refresh rate controls how many times the image updates per second. Both need to match what your monitor actually supports, otherwise the display looks wrong or performs poorly.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open your system's display settings and select the external monitor from the list of connected displays.",
        "Choose the resolution labelled as recommended or native, which matches the panel's actual pixel count.",
        "Open the advanced or additional display settings and check the refresh rate, selecting the highest one your monitor supports.",
        "If the correct options are not available at all, the cable or port may not support enough bandwidth for that resolution and refresh rate combination.",
        "Try a different cable or port, especially if you are using an adapter, before assuming the monitor itself is limited.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "High refresh rates and high resolutions both demand more bandwidth than older cables can carry. A cheap or older cable is a more common cause of this problem than the monitor or the computer.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Devices & Hardware",
    subcategoryName: "Smartphones",
    title: "How to Check and Improve Your Phone's Battery Health",
    slug: "how-to-check-and-improve-your-phones-battery-health",
    excerpt:
      "Understand what battery health means and how to slow down its decline.",
    content: richContent([
      paragraph(
        "Every phone battery loses capacity over time, this is simply how lithium batteries age. The real question is not whether it will happen, but how quickly, and that part is largely within your control.",
      ),
      heading("Checking Battery Health", 2),
      paragraph(
        "Most phones have a built-in battery health or maximum capacity indicator in their settings. This shows how much charge the battery can currently hold compared to when it was new, which is a much more useful number than screen-on time alone.",
      ),
      heading("What Actually Speeds Up Degradation", 2),
      bulletList([
        "Frequently charging to 100 percent and leaving it there for long periods",
        "Letting the battery drain to zero repeatedly rather than charging more often in smaller amounts",
        "Charging in hot environments, such as direct sunlight or inside a closed car",
        "Using fast charging constantly rather than occasionally",
      ]),
      heading("Step-by-Step to Slow the Decline", 2),
      orderedList([
        "Open your battery settings and check the current maximum capacity figure.",
        "Avoid leaving the phone plugged in at 100 percent for extended periods when possible.",
        "Keep the phone cool while charging, and avoid charging it under a pillow or in direct sun.",
        "Review which apps are draining battery in the background, since this often matters more than screen time.",
        "If capacity has dropped significantly and the phone struggles to last a normal day, a battery replacement is usually more cost-effective than replacing the whole device.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Heat is the single biggest accelerator of battery wear, more so than fast charging or high screen brightness. Keeping the phone cool during use and charging matters more than any other single habit.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Devices & Hardware",
    subcategoryName: "Laptops",
    title: "How to Stop a Laptop From Running Hot and Loud",
    slug: "how-to-stop-a-laptop-from-running-hot-and-loud",
    excerpt:
      "Clear blocked vents and adjust settings to bring temperatures back down.",
    content: richContent([
      paragraph(
        "A laptop that suddenly runs hotter and louder than it used to is rarely failing, it is almost always struggling to cool itself. Fixing the airflow usually solves the problem faster than any software tweak.",
      ),
      heading("Airflow Comes First", 2),
      paragraph(
        "Laptops draw in cool air and push out hot air through vents, usually on the bottom or sides. Placing a laptop on a bed, cushion, or your lap blocks that airflow directly, which is one of the most common and easily fixed causes of overheating.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Always use the laptop on a hard, flat surface rather than a soft one that can block the vents.",
        "Check whether dust has built up around the vents, since this restricts airflow over time even on a hard surface.",
        "Close unused background applications and browser tabs, since heavy background load raises temperature even when you are not actively using the machine.",
        "Check your power or performance settings, since a high-performance mode set permanently can keep the fans working harder than necessary.",
        "If the laptop still runs hot after all of this, a professional cleaning of the internal cooling system may be needed, especially on machines more than a couple of years old.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If the fans run loudly even when the laptop is sitting idle, check the task manager or activity monitor for a background process using unexpectedly high resources. This is a common and often overlooked cause.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Devices & Hardware",
    subcategoryName: "Smart Tvs",
    title: "How to Fix a Smart TV That Won't Detect an HDMI Device",
    slug: "how-to-fix-a-smart-tv-that-wont-detect-an-hdmi-device",
    excerpt: "Solve the most common causes of a blank or no-signal HDMI input.",
    content: richContent([
      paragraph(
        "A no-signal message on a smart TV feels like a serious fault, but it is usually one of a few simple things: the wrong port, an underpowered cable, or a device that has not properly woken up.",
      ),
      heading("Not All HDMI Ports Are Equal", 2),
      paragraph(
        "Many televisions have HDMI ports with different capabilities, some support higher bandwidth or special modes like variable refresh rate while others are more basic. Plugging a high-performance device into the wrong port can cause it to fail to display anything at all.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Try a different HDMI port on the television and see if the same device is detected there instead.",
        "Confirm you are using a cable rated for the resolution and refresh rate you actually need, especially important for 4K or high frame rate sources.",
        "Restart both the television and the connected device, since HDMI handshakes can sometimes fail silently on the first attempt.",
        "Manually select the correct input on the television rather than relying on automatic switching.",
        "Confirm the source device is actually powered on and outputting a signal, not just plugged in.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If the device works fine on a different television or the same television works fine with a different device, that immediately tells you whether the fault lies with the cable, the port, or the device itself.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Email & Communication",
    subcategoryName: "Email",
    title: "How to Find an Email That Seems to Have Disappeared",
    slug: "how-to-find-an-email-that-seems-to-have-disappeared",
    excerpt:
      "Track down a missing message before assuming it was never delivered.",
    content: richContent([
      paragraph(
        "A missing email is rarely actually missing. In the vast majority of cases it has been filtered, archived, or sorted somewhere other than the inbox, and a systematic search finds it quickly.",
      ),
      heading("Search Before You Panic", 2),
      paragraph(
        "Searching only the inbox misses a large portion of your mailbox. Filters, rules, and spam detection route mail into other folders constantly, often without you ever noticing.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Use the search bar and search your entire mailbox, not just the inbox folder.",
        "Check the spam or junk folder, along with any promotions or updates categories your mail provider uses.",
        "Review your filters and rules, since one may be automatically archiving or forwarding mail from a specific sender.",
        "Confirm your mailbox is not full, since a full inbox can silently reject new incoming mail without any visible warning.",
        "If none of this locates it, ask the sender to confirm the exact address they used, since a small typo sends mail somewhere else entirely.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If a specific sender's mail keeps disappearing, check whether you accidentally marked one of their earlier messages as spam. This trains the filter to treat all future messages from them the same way.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Email & Communication",
    subcategoryName: "Messages",
    title: "How to Keep Your Chat History When Switching to a New Phone",
    slug: "how-to-keep-your-chat-history-when-switching-to-a-new-phone",
    excerpt:
      "Back up and restore your messages so nothing is lost during the switch.",
    content: richContent([
      paragraph(
        "Losing years of chat history is one of the most common and most avoidable losses during a phone switch. It almost always comes down to one missed step: backing up before, not after, setting up the new device.",
      ),
      heading("Server-Stored vs Device-Stored", 2),
      paragraph(
        "Some messaging apps store your history on their servers, making it available instantly on any device you sign into. Others store history only on the device itself, relying on a manual or automatic backup to move it anywhere else. Knowing which type your app uses changes everything about how you prepare.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Before switching phones, open the messaging app's settings and confirm backup is turned on.",
        "Check whether the backup includes media like photos and videos, or only text, since some apps separate the two.",
        "Keep your old phone number active during the transition if the app ties your account to that number for verification.",
        "On the new phone, install the app and choose to restore from backup during the initial setup screen, not after you have already started chatting.",
        "Confirm your history appears correctly before removing the app or SIM card from the old phone.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Restoring almost always only works during the very first setup of the app on a new device. If you skip it and start using the app, going back to restore later is often no longer possible.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Files, Data & Cloud Storage",
    subcategoryName: "Cloud Storage",
    title: "How to Free Up Space Without Deleting Your Files",
    slug: "how-to-free-up-space-without-deleting-your-files",
    excerpt:
      "Understand storage-only files so you can offload space without losing data.",
    content: richContent([
      paragraph(
        "Running low on storage does not automatically mean you have to start deleting things. Most cloud services offer a way to keep every file accessible while removing the local copy from your device entirely.",
      ),
      heading("What Online-Only Files Actually Are", 2),
      paragraph(
        "An online-only or on-demand file shows up in your file browser like normal, but the actual data lives in the cloud until you open it. The moment you open it, it downloads temporarily; the rest of the time it takes up almost no space on your device.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check whether your cloud provider offers an online-only, on-demand, or free-up-space mode for synced folders.",
        "Switch large folders you rarely access day-to-day to this mode to free up space immediately.",
        "Before travelling or going offline, mark the specific files or folders you will need as always keep on this device.",
        "Empty your account's trash or deleted items area, since removed files often still count against your storage until permanently cleared.",
        "Review large, rarely used files individually if you are still close to your limit after switching folders to online-only.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Check your trash folder specifically after a big cleanup. Many people delete gigabytes of files and are confused when their storage number barely moves, simply because the trash has not been emptied yet.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Files, Data & Cloud Storage",
    subcategoryName: "File Management",
    title: "How to Recover a File You Just Deleted by Mistake",
    slug: "how-to-recover-a-file-you-just-deleted-by-mistake",
    excerpt:
      "Act quickly to improve your chances of getting a deleted file back.",
    content: richContent([
      paragraph(
        "The first few minutes after an accidental deletion matter more than anything else you do afterward. Acting quickly and in the right order gives you the best realistic chance of getting the file back.",
      ),
      heading("Check the Obvious Place First", 2),
      paragraph(
        "Most operating systems and cloud services do not delete a file immediately, they move it to a recycle bin, trash, or deleted items area where it stays recoverable for a set period.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check the recycle bin or trash folder on your device first, since the majority of deletions are recoverable from there.",
        "If the file was stored in or synced to a cloud service, check that service's own deleted items area separately from the local trash.",
        "Stop saving new files to the same drive immediately if the file is not in either location, since new data can overwrite the deleted file's space.",
        "Consider dedicated file recovery software only after confirming the file is not in any trash location, and only for genuinely important files.",
        "If the file was work-related, check whether a version history or auto-save feature exists in the application it was created with.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "The single most damaging thing you can do after an accidental deletion is keep using the same drive normally. Every new file written increases the chance of permanently overwriting the one you are trying to recover.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Files, Data & Cloud Storage",
    subcategoryName: "Backups",
    title: "How to Set Up an Automatic Backup You Can Actually Trust",
    slug: "how-to-set-up-an-automatic-backup-you-can-actually-trust",
    excerpt:
      "Build a backup routine that keeps working without needing daily attention.",
    content: richContent([
      paragraph(
        "A backup you have to remember to run manually is a backup that eventually stops happening. The only backup strategy worth relying on is one that runs automatically and gets checked occasionally, not one that depends on willpower.",
      ),
      heading("One Copy Is Not a Backup", 2),
      paragraph(
        "A single backup on the same device, or even the same location, as your original files can be lost to the same event: theft, fire, or a single drive failure. A real backup lives somewhere physically or logically separate from the original.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Choose a backup destination separate from your main device, such as an external drive kept elsewhere or a cloud backup service.",
        "Set the backup software to run on an automatic schedule rather than relying on remembering to start it yourself.",
        "Include documents, photos, and any application data that would be genuinely difficult or impossible to recreate.",
        "Confirm the backup actually completed successfully the first few times, rather than assuming it worked silently.",
        "Every few months, deliberately restore a handful of files from the backup to confirm it is working, not just running.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "A backup that has never been tested by an actual restore is an assumption, not a guarantee. The only way to know a backup works is to have already used it once to bring a file back.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Gaming",
    subcategoryName: "Game Settings",
    title: "How to Reduce Stuttering in a Game Without Lowering Resolution",
    slug: "how-to-reduce-stuttering-in-a-game-without-lowering-resolution",
    excerpt:
      "Target the graphics settings that cost the most performance first.",
    content: richContent([
      paragraph(
        "Lowering resolution is usually the last setting that should change, not the first. Several other settings cost far more performance while contributing far less to how the game actually looks.",
      ),
      heading("Where the Real Cost Is", 2),
      paragraph(
        "Effects like shadows, reflections, and ambient occlusion are calculated constantly and in detail, which makes them expensive to render relative to how noticeable they are during normal gameplay.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Lower shadow quality first, since it is one of the most expensive settings with the least visible day-to-day impact.",
        "Reduce reflections and ambient occlusion next, testing after each change to see how much it helps.",
        "Cap your frame rate slightly below your display's maximum refresh rate, which often produces a smoother, more consistent feel than leaving it uncapped.",
        "If stuttering only happens when entering new areas, the cause is likely asset loading rather than raw rendering performance.",
        "Only reduce resolution as a last step, after the above changes, since it affects visual clarity the most.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If stuttering is tied to loading new areas specifically, upgrading to a faster storage drive often helps more than any graphics setting change.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Gaming",
    subcategoryName: "Controllers",
    title: "How to Fix a Controller That Keeps Disconnecting",
    slug: "how-to-fix-a-controller-that-keeps-disconnecting",
    excerpt:
      "Diagnose whether the problem is the controller, the connection, or the device.",
    content: richContent([
      paragraph(
        "A controller that randomly disconnects could be a hardware fault, a wireless interference problem, or outdated firmware, and each of those has a completely different fix. A quick wired test narrows it down fast.",
      ),
      heading("Isolate the Variable", 2),
      paragraph(
        "Testing with a cable removes the wireless connection entirely from the equation. If the disconnections stop, the controller hardware itself is very likely fine.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Connect the controller with a cable first and use it for a while to see if disconnections still happen.",
        "If it stays connected while wired, the issue lies in the wireless link, not the controller itself.",
        "Check whether the controller is trying to reconnect to a different device it was previously paired with, and forget that pairing if so.",
        "Move closer to the console or PC and remove obstructions, since distance and interference weaken wireless connections.",
        "Update the controller's firmware through its companion app, since many disconnection issues are fixed in firmware updates rather than hardware changes.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Other wireless devices nearby, especially other Bluetooth accessories, can interfere with a controller's connection. Turning off unrelated wireless devices temporarily is a quick way to test for interference.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Internet & Networking",
    subcategoryName: "Wifi",
    title: "How to Improve Wi-Fi Signal in a Room Far From the Router",
    slug: "how-to-improve-wifi-signal-in-a-room-far-from-the-router",
    excerpt: "Boost coverage without necessarily buying new hardware.",
    content: richContent([
      paragraph(
        "Weak Wi-Fi in one room is almost always about distance, walls, and interference rather than a faulty router. Several of the most effective fixes cost nothing at all.",
      ),
      heading("Distance and Obstructions Matter More Than Speed Ratings", 2),
      paragraph(
        "Every wall, floor, and large appliance between your device and the router weakens the signal. A router's advertised speed rarely tells you much about how it will perform through two walls and a closed door.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Move the router to a central, elevated location if possible, rather than tucked into a corner or low shelf.",
        "Manually switch devices in the weak-signal room to the lower frequency band, since it travels further through walls than the higher frequency band.",
        "Avoid placing the router inside a cabinet, behind a TV, or near large metal appliances, all of which block signal significantly.",
        "Consider adding a mesh access point in the affected room rather than relying on a single router to cover the whole space.",
        "Restart the router occasionally, since a router running for months without a restart can gradually perform worse.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If a specific room is consistently weak no matter what you try, a single mesh point added to that room usually solves the problem more reliably and more simply than trying to boost the main router's power.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Internet & Networking",
    subcategoryName: "Routers",
    title: "How to Reserve a Fixed Address for a Device on Your Network",
    slug: "how-to-reserve-a-fixed-address-for-a-device-on-your-network",
    excerpt:
      "Stop a printer or camera from losing its connection after every restart.",
    content: richContent([
      paragraph(
        "Devices like printers and cameras often get assigned a new network address every time they restart, which is exactly why other devices sometimes suddenly cannot find them. Reserving a fixed address solves this permanently.",
      ),
      heading("Why Addresses Change in the First Place", 2),
      paragraph(
        "Most home networks assign addresses automatically and temporarily. This works fine for phones and laptops, but for a device other devices need to consistently find, like a printer, a changing address causes it to seem to randomly disappear.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Log in to your router's admin page using its local address, usually printed on a label on the router itself.",
        "Find the DHCP or address reservation section in the settings menu.",
        "Select the device you want to fix from the list of currently connected devices.",
        "Assign it a fixed address within your network's normal range so it always receives the same one going forward.",
        "Restart the device once after the change to confirm it picks up the reserved address correctly.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "This is especially worth doing for any device other devices need to find by name or address reliably, such as printers, security cameras, or network storage, since a changing address is the most common reason these seem to randomly stop working.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Internet & Networking",
    subcategoryName: "Browsers",
    title: "How to Fix a Website That Loads Incorrectly in Your Browser",
    slug: "how-to-fix-a-website-that-loads-incorrectly-in-your-browser",
    excerpt:
      "Rule out extensions and cached files before assuming the site itself is broken.",
    content: richContent([
      paragraph(
        "When a website looks broken, the natural assumption is that the site itself has a problem. In practice, extensions and old cached data on your own browser are just as often the actual cause.",
      ),
      heading("Isolate Your Browser From the Site", 2),
      paragraph(
        "A private or incognito window loads a page with extensions disabled and without using any previously cached data, which makes it an excellent quick test.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open the page in a private or incognito window first and see if it loads correctly there.",
        "If it works correctly in private mode, an extension is likely responsible, and disabling them one at a time will identify which one.",
        "Clear cached data specifically for that site, rather than your entire browsing history, to avoid wiping saved logins elsewhere.",
        "Test the same page in a completely different browser to confirm whether the issue is local to your main browser's setup.",
        "If the page is broken everywhere you test it, the problem is very likely on the site's end rather than yours.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Ad blockers and privacy extensions are the most common cause of pages that load with missing content or broken layouts, since they sometimes block scripts the page actually needs to function.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Payments, Billing & Commerce",
    subcategoryName: "Online Payments",
    title: "Why an Online Payment Gets Declined and What to Do Next",
    slug: "why-an-online-payment-gets-declined-and-what-to-do-next",
    excerpt:
      "Understand the most common reasons a card fails online and how to fix them.",
    content: richContent([
      paragraph(
        "A declined payment feels like a card problem, but the actual cause is often something much smaller and easily fixed, like a mismatched billing address or a security setting your bank enabled by default.",
      ),
      heading("Small Mismatches Cause Big Declines", 2),
      paragraph(
        "Payment systems check card number, expiry date, and billing address together. Even one field being slightly out of date, such as an old address on file, can trigger a decline that has nothing to do with your available balance.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Double-check your card number, expiry date, and billing address are all entered exactly as your bank has them on file.",
        "Check whether international or online transactions are enabled for your card, since many banks disable these by default for security.",
        "Complete any additional verification step promptly if one is triggered, since these one-time prompts often expire within a few minutes.",
        "Try a different card or payment method to confirm whether the issue is specific to one card or the checkout process itself.",
        "Contact your bank directly if the decline continues, since they are the only party who can see the exact reason behind it.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If you recently moved or changed your billing address, update it with your bank first. A mismatched address is one of the most common and least obvious reasons a card gets declined online.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Payments, Billing & Commerce",
    subcategoryName: "Orders Refunds",
    title: "How to Get a Refund When a Seller Is Not Responding",
    slug: "how-to-get-a-refund-when-a-seller-is-not-responding",
    excerpt:
      "Escalate a stuck order the right way without losing your protection.",
    content: richContent([
      paragraph(
        "Going straight to your bank for a chargeback feels like the fastest option, but it is usually not the best first step. Most marketplaces have a built-in resolution process that works faster and keeps other options open if it does not.",
      ),
      heading("Follow the Order of Escalation", 2),
      paragraph(
        "Platforms generally expect you to try resolving the issue directly with the seller before stepping in themselves. Skipping this step can sometimes slow down a dispute rather than speed it up.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Contact the seller directly first and clearly describe the specific problem with your order.",
        "Give the seller the response window stated by the platform before escalating further.",
        "If there is no response within that window, open a formal dispute or claim through the marketplace itself.",
        "Keep screenshots of your messages, the order details, and any relevant tracking information in case you need to escalate again.",
        "Only contact your bank for a chargeback after the platform's own process has been exhausted, since this is usually the last resort, not the first.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Marketplaces generally want to keep buyers protected, since it maintains trust in their platform. Using the built-in dispute process is often faster and less complicated than it feels, and it keeps a chargeback available as a backup if it fails.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Productivity & Office Tools",
    subcategoryName: "Documents",
    title: "How to Stop Formatting From Breaking When You Share a Document",
    slug: "how-to-stop-formatting-from-breaking-when-you-share-a-document",
    excerpt:
      "Use styles instead of manual formatting so your document travels well.",
    content: richContent([
      paragraph(
        "A document that looks perfect on your screen can fall apart the moment someone else opens it on different software. The usual cause is manual formatting rather than any real compatibility bug.",
      ),
      heading("Styles Travel, Manual Formatting Doesn't", 2),
      paragraph(
        "Bolding, resizing, and manually spacing text one piece at a time creates formatting that depends entirely on your specific software rendering it the same way. Built-in styles are interpreted consistently across different programs.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Apply heading styles to titles and section headers rather than manually bolding and resizing text.",
        "Use proper indentation and spacing settings for layout instead of extra spaces or manual line breaks.",
        "Before sending the document to someone using different software, export a copy and open it yourself to check the layout still looks correct.",
        "Embed fonts in the file where the option is available, since this prevents the recipient's software from substituting a different font.",
        "For anything that must look identical everywhere, consider exporting a fixed-layout copy alongside the editable version.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Manual line breaks used to create spacing are one of the most common causes of a document looking fine on your screen and broken on someone else's. Proper paragraph spacing settings solve this permanently.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Productivity & Office Tools",
    subcategoryName: "Spreadsheets",
    title: "How to Fix a Spreadsheet Total That Looks Wrong",
    slug: "how-to-fix-a-spreadsheet-total-that-looks-wrong",
    excerpt:
      "Find the most common reasons a formula gives an unexpected result.",
    content: richContent([
      paragraph(
        "A total that looks wrong is rarely a broken formula, it is almost always the formula doing exactly what it was told with data that has quietly changed underneath it.",
      ),
      heading("The Usual Culprits", 2),
      paragraph(
        "Rows added after a formula was created, numbers accidentally stored as text, and hidden or filtered rows are responsible for the overwhelming majority of wrong-looking totals.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check whether the range used in the formula actually includes any rows that were added after the formula was originally written.",
        "Confirm the values involved are stored as actual numbers rather than text, since text-formatted numbers are silently ignored in most calculations.",
        "Look for hidden or filtered rows, since these can still be excluded from a total even though they are technically part of the range.",
        "Use the trace precedents feature to see exactly which cells the formula is actually using.",
        "Recreate the formula from scratch in a spare cell if the original still looks wrong, to rule out a subtle typo in the range reference.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "A cell that looks like a number but is aligned to the left instead of the right is usually stored as text, not a number, which is one of the fastest visual clues to check first.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Security & Privacy",
    subcategoryName: "Account Security",
    title: "How to Tell If Your Account Has Been Compromised",
    slug: "how-to-tell-if-your-account-has-been-compromised",
    excerpt: "Recognise the warning signs and secure your account quickly.",
    content: richContent([
      paragraph(
        "Account compromise is not always obvious. It often shows up as small, easy-to-dismiss details rather than an obvious takeover, which is exactly why it is worth knowing the warning signs in advance.",
      ),
      heading("The Warning Signs", 2),
      paragraph(
        "Password reset emails you did not request, login alerts from unfamiliar locations, and settings that have quietly changed without your involvement are the clearest early indicators.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Watch for password reset emails, login alerts, or two-factor codes you did not request yourself.",
        "If you notice any of these, change your password immediately, choosing something you have not used anywhere else.",
        "Sign out of all active sessions from your account's security settings, which forces any unauthorised session to disconnect.",
        "Review connected apps and third-party access, revoking anything you do not recognise or no longer use.",
        "Enable a second authentication factor if you have not already, since it blocks the vast majority of repeat unauthorised attempts.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Even a single login alert from an unfamiliar location is worth acting on immediately, rather than waiting to see if it happens again. Acting early is what actually prevents further damage.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Security & Privacy",
    subcategoryName: "Privacy Settings",
    title: "How to Limit What Apps Can Access on Your Phone",
    slug: "how-to-limit-what-apps-can-access-on-your-phone",
    excerpt:
      "Review and tighten app permissions without breaking the features you use.",
    content: richContent([
      paragraph(
        "Most people grant app permissions once during setup and never revisit them again, even as apps accumulate access to location, contacts, and microphones they rarely use for anything essential.",
      ),
      heading("Not All Access Is Equal", 2),
      paragraph(
        "Some permissions are essential to how an app works, while others are requested just in case a feature is used someday. Reviewing them individually, rather than granting or denying everything at once, keeps the apps you rely on working properly.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open your phone's privacy or permissions settings to see every app's access to location, camera, microphone, and contacts in one place.",
        "Switch location access to only while using the app rather than always, unless a feature genuinely needs constant background tracking.",
        "Revoke access entirely for any app you have not opened in several months.",
        "Pay particular attention to microphone and camera access, granting them only to apps where the need is obvious.",
        "Review these settings again after any major system update, since some permissions can reset or change behaviour after an update.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If an app stops working correctly right after you tighten a permission, that is a sign the permission was actually necessary. Restore it for that specific app rather than leaving broad access enabled for everything.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Social Media",
    subcategoryName: "Profiles Accounts",
    title: "How to Make Your Social Media Profile More Private",
    slug: "how-to-make-your-social-media-profile-more-private",
    excerpt:
      "Control who can see your posts and find your profile in the first place.",
    content: richContent([
      paragraph(
        "Privacy on social media is really two separate things: who can see your existing posts, and how easily someone can find your profile in the first place. Fixing only one leaves the other wide open.",
      ),
      heading("Visibility and Discoverability Are Different", 2),
      paragraph(
        "A private account limits who can see new content, but your profile might still be discoverable by phone number, email, or search, letting people find you even if they cannot see your posts once they do.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Switch your account to private if the platform offers it, which limits new followers to people you specifically approve.",
        "Check whether your profile can be found by phone number or email, and disable this if you prefer not to be discoverable that way.",
        "Review your existing follower list and remove anyone you no longer want to have access.",
        "View your own profile while signed out, or from an account with no connection to you, to see exactly what a stranger would see.",
        "Adjust who can comment, tag you, or message you directly, since these are often separate settings from your main privacy toggle.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Switching to private does not retroactively protect anything shared before the change. Content posted while your account was public may still exist elsewhere as a screenshot or repost.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Social Media",
    subcategoryName: "Posts Messages",
    title: "Why Your Posts Are Not Reaching as Many People as Before",
    slug: "why-your-posts-are-not-reaching-as-many-people-as-before",
    excerpt:
      "Understand how ranking affects reach so drops feel less mysterious.",
    content: richContent([
      paragraph(
        "A sudden drop in reach feels personal, like the platform is specifically working against your account. In reality, it is almost always the result of platform-wide ranking changes that affect nearly everyone at once.",
      ),
      heading("Reach Is Ranked, Not Guaranteed", 2),
      paragraph(
        "Most platforms show content based on a ranking system rather than strict chronological order, which means your reach naturally rises and falls as the platform's ranking priorities shift over time.",
      ),
      heading("Step-by-Step to Understand and Respond", 2),
      orderedList([
        "Check whether your recent content matches the platform's currently preferred format, such as the right aspect ratio, length, or content type.",
        "Look at engagement in the first few minutes after posting, since early engagement often has an outsized effect on total reach.",
        "Compare your reach trend to general reports about that platform's algorithm changes, rather than assuming it is unique to your account.",
        "Avoid making drastic content changes based on a single low-performing post, since normal variation happens even without any ranking change.",
        "Focus on consistency over time rather than chasing any single post's performance.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "A single post underperforming is rarely a sign of a problem with your account specifically. A sustained drop across many posts over weeks is a much stronger signal worth investigating further.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Software & App Operations",
    subcategoryName: "Installation",
    title: "How to Safely Download and Install Software From the Internet",
    slug: "how-to-safely-download-and-install-software-from-the-internet",
    excerpt:
      "Avoid unwanted extras and unsafe sources when installing new programs.",
    content: richContent([
      paragraph(
        "Most unwanted software on a computer did not arrive through anything malicious, it came bundled quietly inside a legitimate program's installer because the express install option was selected without a second look.",
      ),
      heading("Where You Download From Matters Most", 2),
      paragraph(
        "Search engine advertisements frequently lead to fake look-alike download sites rather than the real developer's page, especially for popular free software.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Go directly to the developer's official website rather than clicking a search advertisement, especially for well-known free software.",
        "Check that your system meets the stated requirements, including available storage space, before starting the download.",
        "Choose the custom or advanced installation option instead of the express option, since express installs often hide bundled extras.",
        "Uncheck any additional toolbars, browser changes, or bundled programs offered during the custom installation.",
        "Restart your computer after installation if prompted, rather than skipping it, since some changes only take effect after a restart.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If an installer's custom option lists something you do not recognise or did not ask for, that is reason enough to decline it. Legitimate core software rarely needs unrelated extras to function.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Software & App Operations",
    subcategoryName: "Updates",
    title: "How to Decide When It's Safe to Install a Major Update",
    slug: "how-to-decide-when-its-safe-to-install-a-major-update",
    excerpt:
      "Balance security against the risk of disruption from a big software change.",
    content: richContent([
      paragraph(
        "Not every update should be treated the same way. Small security patches and major feature overhauls carry very different levels of risk, and knowing the difference helps you decide when to update immediately and when to wait.",
      ),
      heading("Security Patches vs Feature Updates", 2),
      paragraph(
        "Small updates that close known vulnerabilities carry low risk and high urgency. Major updates that change how the software works carry more potential for disruption and are worth a short delay to see how they land for other users.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Apply small security updates promptly, since they carry low risk and close known vulnerabilities quickly.",
        "For major feature updates, wait a short period after release before installing, especially on a device you depend on for important work.",
        "Search briefly for widely reported issues with the specific update before installing it on a critical device.",
        "Back up your data beforehand regardless of how minor the update seems, since this costs little time and removes most of the real risk.",
        "Schedule the installation for a time when you will not need the device immediately afterward, in case it takes longer than expected.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If a device is critical for work or a specific deadline, it is reasonable to delay even a well-reviewed major update until after that period, purely to avoid any unexpected disruption at the wrong time.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Software & App Operations",
    subcategoryName: "App Problems",
    title: "How to Fix an App That Keeps Crashing",
    slug: "how-to-fix-an-app-that-keeps-crashing",
    excerpt: "Work through a simple sequence that resolves most app crashes.",
    content: richContent([
      paragraph(
        "An app that keeps crashing rarely needs a complicated fix. Working through a short sequence of simple steps, in order, resolves the overwhelming majority of cases without needing to reinstall anything.",
      ),
      heading("Start Simple, Escalate Gradually", 2),
      paragraph(
        "The most effective troubleshooting order moves from least disruptive to most disruptive, since there is no need to reinstall an app if simply restarting it would have fixed the problem.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Fully close the app and reopen it, rather than just switching away and back.",
        "If the problem continues, restart the device itself, which clears temporary issues a simple app restart cannot fix.",
        "Check for an available update for the app, since crashes are frequently fixed in a newer version shortly after being reported.",
        "Clear the app's cache, which is usually safe and does not remove your saved data or account information.",
        "If the crash still happens after all of this, reinstall the app, but only after confirming your important data is stored in your account rather than only on the device.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Before reinstalling any app, check whether its data syncs to an account. If it does, reinstalling is completely safe. If it does not, back up anything important first.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Streaming & Entertainment",
    subcategoryName: "Video Streaming",
    title: "How to Fix Constant Buffering While Streaming Video",
    slug: "how-to-fix-constant-buffering-while-streaming-video",
    excerpt:
      "Identify whether the problem is your network or the streaming service.",
    content: richContent([
      paragraph(
        "Constant buffering feels like a streaming service problem, but it is very often a bandwidth issue on your own network, and a couple of quick tests can tell you which one it actually is.",
      ),
      heading("Isolating the Cause", 2),
      paragraph(
        "If lowering the video quality manually stops the buffering, the issue is almost certainly bandwidth. If buffering continues even at the lowest quality, the problem likely sits elsewhere, either with your connection generally or with that specific piece of content.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Lower the video quality manually and see whether buffering stops, which points directly to a bandwidth limitation.",
        "Move closer to your router or switch to a wired connection if possible, since distance and interference reduce available speed.",
        "Check whether other devices on the same network are using significant bandwidth at the same time, such as a large download or another stream.",
        "Restart your router if the problem is affecting every title and every device on the network, not just one.",
        "If the problem only happens with one specific title, it is more likely related to that content's own stream than your connection generally.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If buffering happens at the same time every evening, it may be network congestion from your internet provider during peak hours rather than anything in your control at all.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Streaming & Entertainment",
    subcategoryName: "Streaming Accounts",
    title: "Why a Streaming Service Keeps Asking You to Verify Your Household",
    slug: "why-a-streaming-service-keeps-asking-you-to-verify-your-household",
    excerpt:
      "Understand household verification and how to avoid repeated prompts.",
    content: richContent([
      paragraph(
        "Household verification prompts feel intrusive, but they exist because streaming services associate an account with a primary home network and periodically confirm devices are still connected to it.",
      ),
      heading("What Triggers the Check", 2),
      paragraph(
        "Frequent travel, heavy mobile data use, or using a VPN all make a device look like it is regularly outside the associated home network, which increases how often verification is requested.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Connect to your primary home network occasionally, even briefly, since this usually satisfies the requirement without needing anything else.",
        "Complete the verification promptly whenever it appears rather than dismissing it repeatedly, since dismissing it often triggers more frequent prompts.",
        "If you travel often, expect verification to happen more regularly and treat it as routine rather than a sign of a problem.",
        "Avoid using a VPN while streaming if verification prompts are becoming frequent, since it can make your location look inconsistent.",
        "Check the account's settings for any household or device management page, which sometimes shows exactly which devices are currently associated.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Trying to avoid verification altogether usually causes more disruption than simply completing it when it appears. It typically only takes a few seconds and resolves the prompt immediately.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Web Development & Design",
    subcategoryName: "Websites",
    title: "Why a Website Address Points to the Wrong Place After a Change",
    slug: "why-a-website-address-points-to-the-wrong-place-after-a-change",
    excerpt: "Understand DNS propagation before assuming a setup mistake.",
    content: richContent([
      paragraph(
        "A domain that still points to the old location right after a change usually is not a mistake at all. It is simply DNS propagation, the normal delay before the change reaches every network.",
      ),
      heading("Why the Delay Happens", 2),
      paragraph(
        "Different networks around the world cache DNS records for different lengths of time. A change you make does not instantly reach every device everywhere, it spreads gradually as each network's cache expires and refreshes.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Confirm the DNS records were entered correctly in the first place, since a typo here is the actual most common real mistake.",
        "Wait before assuming something is broken, since propagation can take anywhere from a few minutes to a full day.",
        "Test from a different network or device, such as mobile data instead of home Wi-Fi, since some networks update sooner than others.",
        "Use an online DNS lookup tool to check what different regions are currently seeing for the domain.",
        "If the address still points incorrectly after a full day has passed, double check the DNS records again for an actual error rather than continuing to wait.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Clearing your own device's DNS cache can sometimes make a change appear faster on your specific device, even while the rest of the internet is still catching up.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Web Development & Design",
    subcategoryName: "Web Tools",
    title: "How to Use Browser Developer Tools to Find a Broken Page",
    slug: "how-to-use-browser-developer-tools-to-find-a-broken-page",
    excerpt:
      "Diagnose a page problem in minutes using tools already built into your browser.",
    content: richContent([
      paragraph(
        "Every modern browser includes a full set of diagnostic tools for free, and most page problems can be tracked down in minutes using them, without needing to guess at the cause.",
      ),
      heading("Start With the Console", 2),
      paragraph(
        "The console reports most errors as soon as they happen, which makes it the fastest starting point for almost any page problem before checking anything else.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Open developer tools and check the console first, since most errors are reported there immediately when the page loads or when you interact with it.",
        "Use the network panel to see whether any resource, such as a script, stylesheet, or image, failed to load correctly.",
        "Inspect the affected element directly to confirm which styles are actually being applied, since a conflicting or overridden style is a common cause of layout issues.",
        "Test the page at different screen sizes within the same tools to quickly reveal responsive design problems without needing multiple devices.",
        "Reload the page with the console open if the problem happens on load, so you catch the error at the exact moment it occurs.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "A red error in the console does not always mean the whole page is broken, sometimes it is unrelated to what you are actually troubleshooting. Focus first on errors that appear at the same time as the specific problem you are trying to fix.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Mobile Apps",
    subcategoryName: "Android Apps",
    title: "How to Fix an Android App That Stops Sending Notifications",
    slug: "how-to-fix-an-android-app-that-stops-sending-notifications",
    excerpt: "Solve the most common causes of late or missing notifications.",
    content: richContent([
      paragraph(
        "Missing notifications are rarely a broken app, they are almost always a setting quietly working against the app, whether that is a disabled channel, battery optimisation, or a focus mode left on by accident.",
      ),
      heading("Several Settings Can Silence One App", 2),
      paragraph(
        "Android gives you fine control over notifications, which is useful but means several different settings can each independently block them without any obvious indication of which one is responsible.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check the app's individual notification settings first, since a single disabled channel can silence alerts while the rest of the app works fine.",
        "Exclude the app from battery optimisation if it needs to reliably run and check for updates in the background.",
        "Confirm notifications are not being blocked by a focus mode or do-not-disturb setting that may be active without you realising.",
        "Check that background data or background activity is not restricted for that specific app in your data usage settings.",
        "Restart the phone after making these changes, since some notification settings only fully take effect after a restart.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If notifications work when the app is open but not when it is closed, battery optimisation is almost always the cause. Excluding the app from it resolves this in most cases.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Mobile Apps",
    subcategoryName: "iPhone Apps",
    title: "How to Stop an iPhone App From Losing Data After an Update",
    slug: "how-to-stop-an-iphone-app-from-losing-data-after-an-update",
    excerpt:
      "Protect your app data using backups and cloud accounts before updating.",
    content: richContent([
      paragraph(
        "Data loss after an update is upsetting but almost always preventable. The apps most at risk are the ones storing data only on the device itself rather than syncing it to an account.",
      ),
      heading("Account-Synced vs Device-Only Data", 2),
      paragraph(
        "An app that keeps your data synced to an account can usually recover everything even after a full reinstall. An app that only stores data locally depends entirely on the device itself, and on your own backups, to keep that data safe.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Confirm whether any app relying on important data keeps it synced to an account rather than only stored on the device.",
        "Before deleting an app to free up space, choose to offload it instead, which removes the app itself but keeps its data intact for reinstalling later.",
        "Back up your phone through its standard backup feature before any major system update, not just before app-specific updates.",
        "After an update, check for a newer version of the affected app, since missing data issues are often fixed quickly in a follow-up release.",
        "If data is genuinely missing after an update, check your most recent backup before assuming it cannot be recovered.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Offloading an app is a much safer way to free up space than fully deleting it, since offloading is specifically designed to preserve the app's data for exactly this situation.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Printers & Scanners",
    subcategoryName: "Printing",
    title: "How to Fix a Printer That Shows Offline Even Though It's On",
    slug: "how-to-fix-a-printer-that-shows-offline-even-though-its-on",
    excerpt:
      "Solve the most common reason network printers appear to disconnect.",
    content: richContent([
      paragraph(
        "A printer that is clearly powered on but shows as offline almost always comes down to one thing: its network address has changed and your computer is still trying to reach the old one.",
      ),
      heading("Why This Happens So Often", 2),
      paragraph(
        "Most home networks assign addresses automatically, and these can change whenever the router restarts. A printer set up months ago may simply have moved to a different address without anyone changing a single setting on it.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check whether the printer's network address has changed, which commonly happens right after a router restart or power outage.",
        "Reconnect the printer to the network, or better, set a fixed address for it in your router so this cannot happen again.",
        "Restart both the printer and the computer to clear any temporary connection issue on either side.",
        "Print a network configuration page directly from the printer itself to confirm it is actually connected to the network at all.",
        "Remove and re-add the printer on your computer if it still shows offline after confirming the network connection is fine.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Setting a fixed network address for the printer, the same fix used for cameras and network storage, permanently resolves this issue instead of needing to reconnect it every time the router restarts.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Printers & Scanners",
    subcategoryName: "Scanning",
    title: "How to Choose the Right Resolution When Scanning a Document",
    slug: "how-to-choose-the-right-resolution-when-scanning-a-document",
    excerpt:
      "Avoid unnecessarily large files without sacrificing text clarity.",
    content: richContent([
      paragraph(
        "More resolution is not automatically better when scanning. Going higher than necessary just creates unnecessarily large files without improving clarity for the kind of document you are actually scanning.",
      ),
      heading("Match Resolution to Purpose", 2),
      paragraph(
        "A plain text page, a photograph, and a document meant to be enlarged later all have different genuine resolution needs. Using the same high setting for everything wastes storage space without any real benefit for most of them.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Scan standard text documents at a moderate resolution, since they do not need to be saved as large, high-detail image files.",
        "Use a slightly higher resolution if you plan to run text recognition on the scan, since this noticeably improves accuracy.",
        "Reserve much higher resolution settings for photographs or documents that will be enlarged or printed later.",
        "Scan text-only pages in black and white or greyscale rather than colour, which significantly reduces file size without losing readability.",
        "Check the resulting file size after your first scan and adjust the resolution if it is far larger than expected for the content.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If text recognition accuracy is disappointing, the resolution is often the cause. Rescanning at a moderately higher setting frequently fixes recognition errors more effectively than trying different software.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Smart Home & IoT",
    subcategoryName: "Smart Tv Devices",
    title: "How to Connect a Smart TV to a Voice Assistant",
    slug: "how-to-connect-a-smart-tv-to-a-voice-assistant",
    excerpt:
      "Set up voice control for your television as part of a smart home.",
    content: richContent([
      paragraph(
        "Adding a television to your smart home setup is usually straightforward, but it depends entirely on whether your specific model has a built-in voice assistant or needs to be linked through a separate device.",
      ),
      heading("Built-In vs Linked Setups", 2),
      paragraph(
        "Some televisions include a voice assistant directly, while others rely on a separate smart speaker or streaming device to relay commands to them. Knowing which situation you are in changes where the setup actually happens.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check whether your television has a built-in voice assistant, or whether you need to link it through a separate speaker or streaming device.",
        "Make sure both the television and the voice assistant device are connected to the same home network, since discovery generally will not work otherwise.",
        "Open the voice assistant's companion app and look for an option to add or discover a new television or media device.",
        "Give the television a clear, consistent name in the app, since this makes voice commands far more reliable going forward.",
        "If discovery fails, confirm the television is not connected to an isolated guest network separate from your main one.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "A television left on a guest network, rather than your main home network, is one of the most common and least obvious reasons a smart home device cannot find it during setup.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Smart Home & IoT",
    subcategoryName: "Smart Speakers",
    title: "How to Stop a Smart Speaker From Responding to the Wrong Trigger",
    slug: "how-to-stop-a-smart-speaker-from-responding-to-the-wrong-trigger",
    excerpt:
      "Reduce accidental activations without turning off voice control entirely.",
    content: richContent([
      paragraph(
        "A smart speaker that keeps responding to television audio or background conversation is not malfunctioning, it is simply reacting to sounds that happen to resemble its trigger phrase closely enough to activate.",
      ),
      heading("Reviewing What Actually Triggered It", 2),
      paragraph(
        "Most smart speaker apps keep a history of recent activations, which is the fastest way to see exactly what sound or phrase caused each false response.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Review your speaker's voice history in its companion app to see what specifically triggered each accidental response.",
        "Adjust the microphone sensitivity in the app if that option is available, which reduces activations from background noise generally.",
        "Move the speaker further away from a television or other speakers, since audio from these devices is a common source of false triggers.",
        "Consider a different trigger phrase if your device supports changing it, especially if the default phrase resembles common words used in your household.",
        "Use a physical microphone mute switch, if the device has one, whenever you want guaranteed silence rather than relying on software settings alone.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Television advertisements are a particularly common source of accidental activations, since they are specifically designed to be attention-grabbing and occasionally include phrases close to common trigger words.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Photos & Media",
    subcategoryName: "Photos",
    title: "How to Recover Deleted Photos From Your Phone or Cloud Library",
    slug: "how-to-recover-deleted-photos-from-your-phone-or-cloud-library",
    excerpt:
      "Check the recently deleted area before assuming photos are gone for good.",
    content: richContent([
      paragraph(
        "Deleted photos are rarely gone immediately. Most photo apps keep them in a recoverable state for a set period specifically to protect against exactly this kind of accidental deletion.",
      ),
      heading("The Recently Deleted Safety Net", 2),
      paragraph(
        "Both device photo apps and cloud photo services typically move deleted images to a temporary folder rather than removing them instantly, giving you a real window to recover them.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check the recently deleted or trash folder within your phone's own photo app first.",
        "Separately check any connected cloud photo service's deleted items area, since it may hold a copy even if the local one is already gone.",
        "If the photos are not in either location, check whether a recent device or cloud backup exists that predates the deletion.",
        "Avoid taking new photos or aggressively freeing up storage in the meantime, since this can reduce recovery chances for anything not already backed up.",
        "For genuinely important photos not found anywhere, dedicated recovery software is a last resort worth trying before giving up.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Most recently deleted folders automatically and permanently remove photos after around thirty days. Checking sooner rather than later meaningfully improves your chances of getting them back.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Photos & Media",
    subcategoryName: "Videos",
    title: "Why a Video File Plays on One Device but Not Another",
    slug: "why-a-video-file-plays-on-one-device-but-not-another",
    excerpt:
      "Understand codecs to solve playback problems without re-recording anything.",
    content: richContent([
      paragraph(
        "A video that plays fine on one device and refuses to open on another is almost never actually corrupted. It is usually a codec mismatch, a completely fixable software issue rather than a problem with the file itself.",
      ),
      heading("Container and Codec Are Two Different Things", 2),
      paragraph(
        "A video file's container, like the file extension you see, and the codec used to actually encode the picture and sound inside it are separate. A device can support the container but not the specific codec, and playback fails even though the file is perfectly fine.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Try installing a media player known for broad codec support, since this often solves playback without changing the file at all.",
        "Check the file's properties or use a media info tool to see exactly which codec it uses, if you want to confirm the cause directly.",
        "If playback fails on every device you try, the file itself may be incomplete or corrupted, most often from an interrupted transfer or download.",
        "Try opening the file on a computer rather than a phone or TV, since desktop software generally supports a wider range of codecs.",
        "Convert the file to a more widely supported format as a reliable fallback when installing a different player does not help.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If a file plays with sound but no picture, or picture but no sound, that is a strong sign of a codec issue specifically, rather than file corruption, since a genuinely corrupted file usually fails to open at all.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Troubleshooting & Everyday Tech",
    subcategoryName: "Common Problems",
    title: "A Simple Method for Diagnosing Almost Any Tech Problem",
    slug: "a-simple-method-for-diagnosing-almost-any-tech-problem",
    excerpt: "Use a repeatable process instead of guessing at random fixes.",
    content: richContent([
      paragraph(
        "Most tech troubleshooting fails not because the problem is complicated, but because it is approached randomly, trying unrelated fixes in no particular order. A simple, repeatable process finds the actual cause far faster.",
      ),
      heading("Think in Terms of What Changed", 2),
      paragraph(
        "Sudden problems almost always follow a specific event, an update, a new device added, a setting changed, even when that event is not obvious at first glance.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Identify exactly what changed right before the problem began, since most sudden issues trace back to a specific recent event.",
        "Check whether the problem affects one device only, or all of them, and whether it follows your account to a different device.",
        "Restart the smallest component first, such as the app itself, before moving on to the device, and only then the network.",
        "Test with the simplest possible version of the task, removing anything non-essential, to narrow down where exactly it breaks.",
        "Search for the specific error message or symptom, since it is very likely someone else has already diagnosed the exact same issue.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "This process of elimination, starting small and working outward, usually narrows down the actual cause within a few minutes, even for problems that feel completely random at first.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Troubleshooting & Everyday Tech",
    subcategoryName: "Device Troubleshooting",
    title: "What to Do When a Device Won't Turn On",
    slug: "what-to-do-when-a-device-wont-turn-on",
    excerpt:
      "Work from the power source inward instead of assuming the device itself is broken.",
    content: richContent([
      paragraph(
        "A device that won't turn on feels like a serious hardware failure, but the actual cause is very often something upstream of the device itself, like a faulty cable, a dead outlet, or a battery that simply needs longer to respond.",
      ),
      heading("Work From the Outside In", 2),
      paragraph(
        "Start by ruling out the power source and cable before assuming the device's internal hardware has failed, since these are far more likely and far easier to fix.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Try a different outlet and a different charging cable before assuming the device itself has failed.",
        "Look for any charging light or vibration that indicates the device is receiving power at all, even if the screen stays blank.",
        "Hold the power button for a longer press than usual, since this often forces a restart on a device that has simply frozen.",
        "If the battery was completely drained, allow it several minutes of charging before testing again, since a fully dead battery can take a short while to respond.",
        "If none of this works, check whether the device shows any response when connected directly to a computer, which can indicate a display issue rather than a total power failure.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "A device that vibrates or lights up briefly when plugged in but still will not fully turn on often points to a display problem rather than a dead battery or power failure, which is a very different and often more repairable issue.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Online Services & Platforms",
    subcategoryName: "Online Accounts",
    title: "How to Fix Access When You're Signed In but See Nothing",
    slug: "how-to-fix-access-when-youre-signed-in-but-see-nothing",
    excerpt:
      "Understand why a valid sign-in does not always mean you have access.",
    content: richContent([
      paragraph(
        "Being signed in successfully and actually having access to a specific workspace or resource are two completely different things, even though they feel like they should be the same.",
      ),
      heading("Sign-In Confirms Identity, Not Access", 2),
      paragraph(
        "A platform can confirm exactly who you are while still showing you nothing, simply because your account was never actually added to the specific workspace, project, or organisation you are trying to reach.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Confirm you were actually added to the correct workspace or organisation, not just that your personal account exists on the platform generally.",
        "Check whether an invitation to that workspace is still pending rather than accepted, since a pending invite does not grant access yet.",
        "If several accounts exist with different sign-in methods, make sure the one you are currently signed into is the one that was actually invited.",
        "Ask whoever manages the workspace to confirm your account specifically appears in their member list, not just that an invite was sent.",
        "Try signing out completely and back in again, since a stale session can sometimes show outdated access information.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "Having multiple accounts with the same platform, one personal and one work, for example, is one of the most common reasons for this exact problem. Confirming which account was actually invited solves it immediately.",
      ),
    ]),
    readingTime: 2,
  },
  {
    categoryName: "Online Services & Platforms",
    subcategoryName: "Platform Settings",
    title: "How to Find Out Why a Feature Suddenly Stopped Working",
    slug: "how-to-find-out-why-a-feature-suddenly-stopped-working",
    excerpt:
      "Check workspace-level settings before assuming something is broken.",
    content: richContent([
      paragraph(
        "A feature that suddenly stops working, even though nothing on your end changed, is often the result of a setting or policy changed at the workspace or organisation level, entirely outside your personal control.",
      ),
      heading("Personal Settings Can Be Overridden", 2),
      paragraph(
        "Your own preference for a feature can be silently overridden by an administrator's policy at the workspace level, which is one of the most common and least visible reasons a setting appears to stop having any effect.",
      ),
      heading("Step-by-Step", 2),
      orderedList([
        "Check whether the platform has usage limits that may have been reached, since many features are restricted gradually rather than disabled all at once.",
        "Review any recently changed integrations, since a permission change elsewhere in the platform can silently break a connected feature.",
        "Confirm whether a workspace or organisation-level policy could be overriding your personal preference for that specific feature.",
        "Check the platform's status page or recent announcements for any known issues affecting the feature broadly.",
        "Contact an administrator if one exists for the workspace, since this is often faster than troubleshooting the issue entirely alone.",
      ]),
      heading("Extra Tip", 2),
      paragraph(
        "If a feature stopped working for everyone in your workspace at the same time, it is almost certainly a policy or platform-wide change rather than something specific to your account.",
      ),
    ]),
    readingTime: 2,
  },
];

const normalizeLabel = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const findSubcategory = async (categoryId, subcategoryName) => {
  const subcategories = await Subcategory.find({ category: categoryId })
    .select("_id name slug")
    .lean();
  const normalizedName = normalizeLabel(subcategoryName);

  return (
    subcategories.find(
      (subcategory) =>
        normalizeLabel(subcategory.name) === normalizedName ||
        normalizeLabel(subcategory.slug) === normalizedName,
    ) ||
    (subcategoryName === "Smart TVs"
      ? subcategories.find(
          (subcategory) => subcategory.slug === "smart-tv-devices",
        )
      : null)
  );
};

const seedArticles = async () => {
  try {
    await connectDB();

    console.log("\n========================================");
    console.log("DigiWork ARTICLE SEED");
    console.log("========================================\n");

    const author = await Admin.findOne({ isActive: true }).lean();

    if (!author) {
      console.error(
        "No author found. Create at least one user/author document in the database first.",
      );
      process.exit(1);
    }

    console.log(`Using author: ${author._id}\n`);


let created = 0;
let skipped = 0;

const resolvedArticles = [];

// First validate ALL category + subcategory mappings
for (const item of articleContent) {
  const category = await Category.findOne({
    name: item.categoryName,
  }).lean();

  if (!category) {
    throw new Error(
      `Category not found: "${item.categoryName}" for "${item.title}"`,
    );
  }

  const subcategory = await findSubcategory(
    category._id,
    item.subcategoryName,
  );

  if (!subcategory) {
    throw new Error(
      `Subcategory not found: "${item.subcategoryName}" under "${item.categoryName}" for "${item.title}"`,
    );
  }

  resolvedArticles.push({
    item,
    category,
    subcategory,
  });
}

console.log(
  `Validated category/subcategory mapping: ${resolvedArticles.length}/${articleContent.length}\n`,
);

// Delete old articles ONLY after all mappings are validated
const deleted = await Article.deleteMany({});

console.log(`Removed articles: ${deleted.deletedCount}\n`);

// Create all articles
for (const { item, category, subcategory } of resolvedArticles) {
  await Article.create({
    category: category._id,
    subcategory: subcategory._id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    readingTime: item.readingTime,
    status: "published",
    author: author._id,
    isActive: true,
  });

  created++;
  console.log(`Created: ${item.title}`);
}

console.log("\n========================================");
console.log("ARTICLE SEED COMPLETED");
console.log("========================================");
console.log(`Total in file : ${articleContent.length}`);
console.log(`Created       : ${created}`);
console.log(`Skipped       : ${skipped}`);
console.log("========================================\n");

process.exit(0);
} catch (error) {
  console.error("\nArticle seed failed");
  console.error(error);
  process.exit(1);
}
};

seedArticles();