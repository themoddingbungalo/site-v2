A modlist is not a folder full of mods. It is a build — a foundation laid in a particular order, a set of rules about where files are allowed to live, and a discipline about recording where every single download came from. Get those right and a list you made for yourself compiles into a `.wabbajack` anyone can install. Get them wrong and it stays on your machine forever.

This is the whole process, from an empty folder to a compiled list, as Biggie Boss built one live in a single sitting.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/MuowXX8s2Jo"></iframe>
</div>

{: .important}
This page is about **method**, not mod picks. The mods chosen in the stream are one person's taste on one evening; the folder layout, the meta files, the cleaning and the compile are what transfer to any list you build. If you are only ever going to play your own list yourself, everything here about meta files and compiling is optional — but skipping it is the single most common reason a list cannot be shared later.

## The folder that holds everything

Make one folder on the **root of a drive** — `F:\Scratch`, `E:\MyList` — and keep the whole build inside it. Nothing about this list should live in Program Files, in Documents, or anywhere OneDrive can see.

Inside it you want three things:

1. **Mod Organizer 2, extracted.** Not the installer — download an **archived release** from [the MO2 GitHub releases page](https://github.com/ModOrganizer2/modorganizer/releases) and extract it here. A Wabbajack list pins a specific MO2 version, and the installer does not give you an archive to point at.
2. **A `downloads` folder.** Every mod archive you ever download for this list goes here. Drop a copy of the MO2 archive in it straight away, so you do not forget it later.
3. **A `Stock Game` folder.**

### Why Stock Game

`Stock Game` is a plain copy-paste of your Skyrim install. Not a junction, not a symlink — a copy.

It costs you the disk space twice and buys you a list that Steam cannot break. Your real Skyrim can update, get verified, or have Creation Club content shuffled underneath it, and the copy your list is built against does not move. As the stream puts it: your modlist is future-proof, and the only person who can break it is you.

Decide now which Skyrim you are building against, because it becomes a requirement for everyone who installs your list. The stream used 1.6.1170 with only the free Creation Club content — Survival Mode, Curios, Saints & Seducers, Fishing — and no full Anniversary Edition.

## Root Builder

[Root Builder](https://www.nexusmods.com/skyrimspecialedition/mods/31720) is what keeps `Stock Game` clean. Anything a mod tells you to drop next to `SkyrimSE.exe` goes into a `root` folder inside a normal mod instead, and Root Builder injects it at launch.

Install it by dragging the **folder itself**, not its contents, into MO2's `plugins` folder. Then, once MO2 is running, go to **Tools → Plugins → Root Builder** and press **Build**.

{: .note}
If you ever intend to generate a grass cache, add the exclusion the No Grass In Objects page asks for while you are in those settings. It is easy to forget and annoying to diagnose.

## Creating the instance

Launch MO2 and create a **new instance**:

1. Choose **Portable**, not global. A portable instance is self-contained — you can copy the whole folder to another machine and it still works. There is no good reason to build a list in a global instance.
2. Browse for the game folder and point it at your **`Stock Game`** folder.
3. Choose **profile-specific INIs and saves**. Without it, MO2 writes to your real Documents folder and your list starts leaking into the rest of your system.
4. Accept the default data location, and finish.

While you are in **Tools → Settings**, the built-in **1809 dark mode** theme is a considerable improvement over the default.

## Meta files, and why every download needs one

This is the rule that decides whether your list can ever be shared.

When Wabbajack compiles a list, it walks every file in your setup, matches it to the archive it came from, and then looks for a link to that archive. No link, no compile. That link lives in a `.meta` file sitting next to the archive in your downloads folder — **including the meta file for Mod Organizer 2 itself**.

**Downloads from Nexus get one automatically**, as long as MO2 is handling the download. Go to **Tools → Settings → Nexus** and associate MO2 with Nexus download links, and the **Mod Manager Download** button will hand files straight to MO2.

### When a Nexus file has no download button

Some files only offer a manual download. Right-click the download link, open it in a new tab, add `&nmm=1` to the end of the URL, and start the download — it now comes through MO2 with a meta file attached.

### When a file is not from Nexus at all

Write the meta file yourself. Right-click the download in MO2's **Downloads** tab, choose **Open Meta File**, and give it a `directURL`:

![A hand-written .meta file in Notepad++, with removed=false, installed=true and a directURL pointing at the MO2 GitHub release.](assets/guides/create-modlist/meta-file.webp)

```ini
[General]
removed=false
installed=true
directURL=https://github.com/ModOrganizer2/modorganizer/releases/download/v2.5.0/Mod.Organizer-2.5.0.7z
```

That is the entire trick. Wabbajack will now tell people to fetch MO2 from that link.

{: .note}
Setting `installed=true` also stops MO2 nagging you about it, so you can use **Hide Installed** in the Downloads tab and keep the view to things you still have to deal with. The exclamation mark beside a download almost always just means it did not come from Nexus.

## Cleaning the base plugins

The vanilla and Creation Club plugins ship with identical-to-master records and deleted references in them. Those cause conflicts that are not real conflicts, and the deleted references in particular cause problems. You clean them once, at the start, and never think about it again.

Make a new **empty mod** — call it `Cleaned Plugins` — and copy the base plugins out of `Stock Game\Data` into it. The plugins only: `Update.esm`, `Dawnguard.esm`, `HearthFires.esm`, `Dragonborn.esm` and your Creation Club `.esl` files.

### Adding xEdit

Download SSEEdit and extract it to a `tools` folder inside your build folder — not into MO2, because you will exclude it from the compiled list later. Add it under **Tools → Executables**:

![MO2's Modify Executables dialog with SSEEdit added: the binary path, the arguments field, and Force load libraries ticked.](assets/guides/create-modlist/xedit-executable.webp)

- **Binary** — `SSEEdit.exe`. Use the **64-bit build from the mod's Optional Files**; the default 32-bit one failed to load the plugins at all in the stream.
- **Arguments** — `-D:"<your path>\Stock Game\Data" -IKnowWhatImDoing -pseudoesl`
- Tick **Force load libraries**.
- Tick **Create files in mod instead of overwrite** and point it at a new empty mod, so xEdit's output lands somewhere you can see it rather than in Overwrite.

Then add a second entry for cleaning:

![The same dialog with SSEEditQuickAutoClean added and -quickautoclean in the arguments.](assets/guides/create-modlist/quick-auto-clean.webp)

- **Binary** — `SSEEditQuickAutoClean.exe`
- **Arguments** — `-D:"<your path>\Stock Game\Data" -quickautoclean`

### Running it

Quick Auto Clean does **one plugin at a time**. Run it, pick a plugin, let it finish, run it again. It saves by itself.

- **Do not clean `Skyrim.esm`.** It is not meant to be cleaned.
- Clean `Update.esm` and the three DLC masters.
- If you have full Anniversary Edition, all of those Creation Club plugins need cleaning too. There are a lot of them and some contain a startling number of deleted references — an uncleaned AE is a well-known source of problems.
- Some plugins come back untouched, which is fine. Curios needed nothing in the stream.

{: .warning}
Clean base game plugins, and mod plugins whose author tells you to. **Do not run a cleaner over every mod in your list.** Plenty of mods have records that look dirty and are not, and cleaning them breaks the mod.

### What cleaning actually removes

An *identical to master* record is a plugin restating something the base game already said — one mod saying Lydia is cool when Skyrim already said Lydia is cool. A *deleted reference* is a plugin removing an object other things may still point at. Every plugin is, as the stream repeatedly puts it, a big spreadsheet: records in rows, and whichever plugin loads furthest to the right wins the row.

## SKSE, and the root folder

SKSE is the first real test of Root Builder, because its readme tells you to drop files next to `SkyrimSE.exe`.

Do not do that. Instead:

1. Create a **new empty mod** for SKSE.
2. Inside it, create a folder called **`root`**, and put the loader, the DLLs and everything else that belongs next to the executable in there.
3. The contents of SKSE's `Data` folder — scripts and so on — go **outside** `root`, at the top level of the mod, where MO2 expects mod files to be.
4. Add the loader as an executable: **Tools → Executables → Add from file**, browse to `mods\<your SKSE mod>\root\skse64_loader.exe`, and tick **Force load libraries**.

That pattern — `root` for anything that would otherwise go in the game folder — is also the answer to Engine Fixes Part 2, ENB binaries, and every other mod that wants to sit next to the exe. You can do it at any point, on any mod, after the fact.

## Laying the foundation

Before a single texture, get the base working and launch the game once. The stream's order:

1. **Address Library for SKSE Plugins** — match it to your game version.
2. **SSE Display Tweaks**.
3. **SSE Engine Fixes**, which comes in two parts. Part 1 installs as a normal SKSE plugin. **Part 2 is a manual download** whose files go into a `root` folder exactly as above — create the directory in the installer window, move the files into it, ignore MO2's warning, and merge it with Part 1.
4. **An INI and MCM settings mod** — an empty mod holding your Display Tweaks and Engine Fixes configs, so they are versioned with the list rather than lost in Overwrite. Your `Skyrim.ini`, `SkyrimCustom.ini` and `SkyrimPrefs.ini` go in the profile folder.
5. **The Unofficial Skyrim Special Edition Patch**, and the unofficial modder's patches alongside it.
6. **Cleaned Skyrim SE Textures**. Worth doing even though you will replace many textures later — Skyrim has around 30,000 of them and you are never going to mod them all.
7. **Unofficial High Definition Audio Project**, for base game audio that is not compressed to pieces.

{: .note}
Once Cleaned Skyrim SE Textures is installed, the vanilla `Skyrim - Textures0` through `8` BSAs in `Stock Game\Data` are dead weight — the cleaned versions replace them file for file. Deleting them from Stock Game saves several gigabytes.

Now launch the game. It will look terrible, and that is the point: you have a working base to build on and you know that it works.

## Separators and structure

Create separators as you go and put mods in them as they arrive — retrofitting structure onto 140 mods is miserable. The stream ended up with roughly: base files · cleaned plugins, SKSE and core tweaks · unofficial patches · user interface · visuals core · visuals weather and environment · gameplay · gameplay animation · outputs · new mods.

## Reading conflicts

Two MO2 plugins make this enormously easier:

- **[NIF Preview](https://www.nexusmods.com/skyrimspecialedition/mods/59340)** lets you see a mesh in the conflict view. When SMIM and a texture pack fight over the same gold ingot, you can look at both and pick — including the vertex count, if performance matters.
- **[Bethesda Plugin Manager for Mod Organizer](https://www.nexusmods.com/skyrimspecialedition/mods/111236)** by Parapets brings the same conflict indicators to the right-hand plugin pane. A plugin with no lightning bolt has no real conflicts and can load literally anywhere.

In the left pane, the **lightning bolts** tell you what is overwriting what, and the **exclamation marks** are worth watching every time one appears. A mod showing that it is being *completely* overwritten is redundant — you can simply remove it.

Use **groups** in the plugin pane to collapse a set of non-conflicting plugins, like your whole UI section, into one tidy row.

{: .warning}
Do not use Conflict Deleter. Deleting a file some other mod quietly depends on gives you purple textures weeks later and no memory of what you did. Instead **hide** the losing file — MO2 flags it `.mohidden` — and at the end of a session search your `mods` folder for `mohidden` and delete what you find. You keep a record of your own decisions that way.

## Adding mods without making a mess

- **Read the requirements on every mod page before installing.** One mod pulling in a web of five frameworks is normal, and it is why "just adding a few mods" is never just a few mods.
- Given the choice, take **BSA over loose files** and **ESL over ESP**.
- When a mod has a FOMOD with options for mods you have not installed yet, add a **note** to it in MO2 saying `fomod`. Later, filter on your notes and reinstall them with the options now available. This is the only reliable way to remember.
- You can drag an archive from your downloads list straight onto the position you want it in the left pane.
- Whatever loads last wins. That is the whole of load order.

## Tool outputs

Anything that generates files — Nemesis, xEdit, body generation — gets its own empty **output mod** so its results are a visible, orderable thing rather than a pile in Overwrite.

For **Nemesis**: add `Nemesis Unlimited Behavior Engine.exe` as an executable with **Force load libraries**, point its output at an empty mod, tick the patches you want, press **Update Engine** first and then **Launch Nemesis Behavior Engine**. If the engine update throws a state machine error, run it a second time — it usually goes through.

## Patching

Load the list in xEdit and use **right-click → Apply Filter to Show Conflicts** on the plugin list. Then, in the record view, **right-click → hide no conflict and empty rows**, which strips the display down to the decisions you actually have to make.

After that it is reading, not expertise. Think about what each mod is *for*:

- A lighting mod should win cell lighting, fog and image space records. A weather mod should win weather and region records.
- The Unofficial Patch makes a great many changes that do not matter, and some that do. Its **ownership changes, acoustic spaces and encounter zone fixes are usually worth forwarding**; its **rewritten descriptions are usually not**, because your gameplay mods changed what those things do and the patch is still describing vanilla.
- Where a mod-to-mod compatibility patch already exists and is winning the record, you have nothing to do.

To make a patch, create a new mod for it, then copy the record you want as an override into a new ESP flagged ESL and drag the winning values across. If you forward a record from a plugin, remember to add that plugin as a master.

## Compiling

{: .note}
Before you compile anything, make a copy of the compiler settings for any list you already maintain. Wabbajack's settings screen resets when you create a new list, and getting them back is tedious.

**Your Skyrim install is a contract.** Whatever you built against, everyone installing your list needs to match: the same game version, the same decision about Anniversary Edition, the same decision about whether Creation Kit is installed. This is why list authors keep several separate Skyrim copies around.

In Wabbajack, choose to create a list. It asks you to *select a config file or a modlist.txt file*: point it at **`modlist.txt`** inside your `profiles\<profile>` folder, and it infers the rest.

That lands you on **Compiler Settings**:

1. Set the **ModList Name**, **Selected Profile (if using MO2)** and **Version**. Author, description, image, website and readme can wait until you are actually publishing.
2. **Ignore folders** — add your `tools` folder. People installing the list do not need your copy of xEdit.
3. **No Match Include** — this is *inlining*: bundling a file into the `.wabbajack` itself rather than pointing at a download. Add your own generated outputs here, one at a time: your xEdit output, your INI/MCM settings mod, your Nemesis output. Keep it to small things — inlining bloats the file, which is why large outputs like a grass cache get uploaded to Nexus and linked instead.
4. **Include Folders** and **Include Files** cover anything disabled in MO2 that you still want shipped, such as mods used only by a second profile. A disabled mod is otherwise left out entirely.
5. Check the **Download Location** points at your `downloads` folder, set an **Output Location** for the `.wabbajack` file, and press the play button.

First compiles fail fairly often, usually over a missing meta file or an MO2 plugin. Read what it names, fix that, run it again.

{: .warning}
**Only inline files you have permission to distribute.** Your own outputs are yours; someone else's mod with modified contents is not, unless their permissions allow it. Separately, Wabbajack can follow a **rename** or a **content change**, but not both on the same file — rename a texture and it copes, edit a texture and it copes, do both and it has no idea what you did.

## The part that actually matters

> Don't just add mods for the sake of adding mods. Get the foundation down first — your tools, Engine Fixes, Display Tweaks, SKSE, the unofficial patches — and then get into the game and notice things. Figure out what you need while playing the list.

141 mods, 82 plugins, one evening, compiled and installable. The list itself was nothing special. The order it was built in is the whole lesson.
