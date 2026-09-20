Wabbajack installs an entire modlist for you — hundreds or thousands of mods, downloaded, installed, patched and configured into their own Mod Organizer 2 setup, from one file and one button. This is everything between downloading the tool and playing your first list: where to put it, what to set up in Windows first, and what to do on the days a download fails.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/nApuOZWp12c"></iframe>
</div>

{: .important}
Every list on this site has its own read me with its own pre-installation steps — which runtimes, whether to reinstall Skyrim, what to do about Creation Club content. Those are not optional and they are not repeated here. Where a read me disagrees with this page, the read me wins: it was written for that list.

## Before you download anything

A **Nexus Mods Premium** account is not required, but without one Wabbajack cannot download for you. It will stop at every single mod in the list and wait for you to click the download button yourself — for a list of several thousand mods, that is your entire evening. With Premium the whole thing is unattended.

## Installing Wabbajack

[Download Wabbajack](https://www.wabbajack.org/){: .btn}

1. Make a folder on the **root of a drive** — `C:\Wabbajack`, `F:\Wabbajack` — and move `Wabbajack.exe` into it. The root of the drive means exactly that: not inside Program Files, not on your desktop, and not left in your Downloads folder.
2. Double-click it. The first run downloads the rest of Wabbajack itself.
3. Log in to Nexus Mods when prompted. If you never get the prompt, click the **gear icon** in the top right and log in from there.

## Setting up Windows first

Most lists expect these before you install, and they are the difference between a list that runs and a list that crashes on the third load screen.

### The pagefile

1. Open **System Properties** → **Advanced** → under Performance, **Settings…** → **Advanced** → under Virtual memory, **Change…**
2. Untick **Automatically manage paging file size for all drives**.
3. Select your **fastest drive**, choose **Custom size**, and set **Initial size** and **Maximum size** to the *same* number.
4. Click **Set**, then **OK**, and reboot if Windows asks.

How big depends on the list, so check its read me first. `40000` MB for both is the figure most often suggested; some people run `60000`.

### Shader cache, on NVIDIA

In the NVIDIA Control Panel, go to **Manage 3D Settings** → **Global Settings**, find **Shader Cache Size** and set it to **10 GB**. Heavily modded Skyrim compiles a great many shaders, and the default cache is nowhere near big enough to keep them.

### Antivirus and OneDrive

Add an exclusion for the folder you are about to install the list into — Windows Defender included. Mod Organizer and the tools a list runs look exactly like the behaviour scanners are built to stop. Turn OneDrive off as well, rather than trusting it to leave a modlist folder alone.

## Finding a list

Click **Browse Modlists**. Use the **Game** dropdown to narrow it to your game, and tick **Show Unofficial Lists** — the split between official and unofficial matters far less than it sounds, and leaving it unticked hides a great many good lists. **Show NSFW** does what it says.

Plenty of lists are not in the gallery at all and are distributed from GitHub, Nexus or their own site. Those come as a `.wabbajack` file: download it and double-click, and it opens the same install screen the gallery would.

## Installing the list

The install screen shows the list, its Discord, readme, website and manifest, and three paths.

1. **Modlist Installation Location** — where the list goes. Put it on the **root of a drive**, on an **SSD**: `F:\LoreRim`, not `F:\Games\Wabbajack\Modlists\LoreRim`. Some lists require an SSD outright; all of them are better on one. Keep the path short, because Windows still has a path length limit and a deep folder tree plus a deeply nested mod file will hit it.
2. **Resource Download Location** — where the downloaded archives are kept. It defaults to a folder inside the installation, but it does not have to be on the same drive. This is the lever when space is tight: a 550 GB list can be 250 GB of downloads, so pointing this at a second drive or an external disk keeps a quarter of a terabyte off your SSD.
3. **Overwrite Installation** — tick this whenever you are updating a list you already have. There is no real harm in always ticking it.

Then press the play button and leave it alone. This takes hours.

## When a download fails

Failures during install are normal and usually not your fault — a file has moved, a host is rate-limiting, or the list is mid-update.

1. Check the list's Discord first. If a download is broken for you it is broken for everyone, and someone will have posted about it already.
2. Read the log. In your Wabbajack folder, open the folder named for the version, then `logs`, and open the newest one. The bottom of the log names what failed and usually gives you a **direct download link**.
3. Download that file yourself and drop it into your **Resource Download Location** — the same downloads folder the list is using — then run the install again. Wabbajack finds it and carries on.

{: .note}
Google Drive links come through the log as a file ID rather than a URL. Paste it into `drive.google.com/file/d/<the id>` and you land on the file directly.

## Rare Curios

Skyrim Special Edition has two versions of the Rare Curios creation in circulation — one from Steam, one from Bethesda — differing in the capitalisation of their filenames, and a list is built against one of them. An install that fails on Curios is almost always this.

If the list wants the capitalised version, verifying your game files through Steam (**Properties** → **Installed Files** → **Verify integrity of game files**) fetches it. If it wants the lowercase one, that will not help: instead you delete the Creation Club files from your Skyrim `Data` folder, relaunch the game, and let it download the Creation Club content again from the main menu — without alt-tabbing while it does, which interrupts the download.

{: .warning}
Both of those cut against advice you will read everywhere else, including the read mes on this site, which tell you never to verify your game files and never to touch your `Data` folder. That advice is right in general. **Check your list's read me before doing either** — Ghoulified, for instance, names the two exact Curios files to delete rather than clearing out everything, and its read me is the version to follow for that list.

## Once it is installed

The list installs into its own Mod Organizer 2, which you launch with the `ModOrganizer.exe` in the folder you installed to — never the MO2 you may already have elsewhere.

To download your own mods straight into it, open **Tools** → **Settings** → **Nexus** and click **Associate with "Download with manager" links**. Nexus downloads then land in MO2's **Downloads** tab, where double-clicking the archive installs it; drag the new mod to the right place in the left-hand panel and tick it, then check its plugin is enabled on the right.

The profile dropdown at the top switches between the list's profiles, and saves belong to the profile that made them — they live in a `profiles` folder inside the install, not in your Documents.

{: .warning}
Adding your own mods to someone's list ends your claim on their support. The list's Discord troubleshoots the list they built, not the list you modified — so if you go this way, be ready to undo it before asking for help.
