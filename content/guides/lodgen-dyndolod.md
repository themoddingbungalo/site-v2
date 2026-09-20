This is the pass that puts the world in the distance: the objects, the trees, the glowing windows across the water, and the grass you cached in part two. It is also the fiddliest of the three, and the one where ignoring an error costs you a stable game rather than a pretty one.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/nLVNXkxhJxI"></iframe>
</div>

{: .note}
**Part 3 of 3.** It assumes you have already done [Terrain LOD](/guides/lodgen-terrain) and [Grass Cache](/guides/lodgen-grass-cache).

## What you need

- **DynDOLOD Resources SE 3**
- **DynDOLOD 3 Alpha** — the tools themselves, `TexGen.exe` and `DynDOLOD.exe`
- **DynDOLOD DLL**, either the SE build or **DynDOLOD DLL NG**. Prefer NG: it is updated far more often.

Extract the tools into a folder under Mod Organizer, alongside your other tools — `tools\DynDOLOD`.

Add **TexGen** and **DynDOLOD** as executables in MO2 the same way as xLODGen in part one: the binary in that folder, `-sse` in the arguments to run in Skyrim Special Edition mode, `-d:` pointing at your data path if you use Stock Game or Game Root, and **Force load libraries** ticked.

### Installing the resources

The Resources installer asks a lot of questions, and the answers depend on your load order rather than on a universal right answer.

{: .warning}
Do **not** tick **Solitude Occlusion Planes** if you run any mod that reworks Solitude — Redbag's, The Great City of Solitude and similar. The planes assume vanilla geometry and produce serious visual anomalies over the top of an overhaul.

## Load order, before you generate

{: .important}
**DynDOLOD Resources** and the **DynDOLOD DLL** go near the very top of the left pane — straight after engine fixes, unofficial patches and core framework DLLs. Loaded too late they cause widespread visual problems. Once they are placed, the only things they should be overriding are base game and Creation Club assets.

Three more things to get right first:

- **Grass cache stays enabled.** Always. The only output you ever turn off is SSE Terrain Tamriel from part one.
- **No Grass In Objects stays enabled** too, unless you use Grass Cache Helper. Disable it without that and your grass disappears entirely.
- **Flat Map Framework**: keep the mod enabled in the left pane, but disable its **plugins** in the right pane. Leave them on and DynDOLOD takes FMF as a master, which locks the load order it needs to sit at the end of.

## TexGen

TexGen makes the textures DynDOLOD then builds with, so it runs first.

![TexGen's settings, with the texture size and the format dropdowns.](assets/guides/lodgen-dyndolod/texgen-settings.webp)

A texture **Size** of `256` is the sensible default, with the format dropdowns on `BC7 Quick`. If the grass cache is present, TexGen picks up the grass options on its own. If trees or grass come out looking too bright or too dark in game, the direct and ambient lighting values here are the dials to adjust.

Run it, then package the output exactly as in part one: an empty mod called `TexGen Output`, the generated folders moved in, enabled.

{: .warning}
**Never ignore an error from TexGen or DynDOLOD.** A mismatched patch or an unresolved reference will either stop generation or produce an unstable game, and disabling the offending mod and re-running is not a fix. Track it down — the usual cause is a patch that has fallen out of step with the mod it patches.

## Cleaning up deleted references first

Deleted references are a long-standing cause of crashes, and this pass is a good moment to deal with them, since you are in xEdit anyway.

1. Open xEdit and select your plugins, **starting at the first mod after the official content** — past Skyrim, the DLC and the Creation Club files — down to your last plugin.
2. **Apply Script**, search `delete`, and run **Undelete and Disable References**.
3. Let it finish, and save.

It walks each plugin, finds anything flagged as deleted, undeletes it and marks it initially disabled instead — which is what the record should have been in the first place.

{: .warning}
Never run this on official plugins. `Skyrim.esm`, the DLC and Creation Club content are cleaned with xEdit's **Quick Auto Clean** instead, and nothing else.

## DynDOLOD

![DynDOLOD's advanced settings, with the mesh mask rule for mountains.](assets/guides/lodgen-dyndolod/dyndolod-settings.webp)

**Select all** at the top of the worldspace list. If the grass cache is enabled, grass LOD switches itself on.

**Preset** is `High`, `Medium` or `Low`, and the difference is mostly how much gets rendered at distance. High is not especially taxing and looks better, so it is the one to start from.

### The mountain rule

If you use a mountain mesh mod — ERM, Atlantean Mountain Meshes and the like — add a rule for it, or your mountains will not match themselves at distance.

1. Right-click **Tree** in the rules list and choose **Insert**.
2. Under **Mesh Mask/Reference**, enter `mask=mountain`.
3. Tick **VWD**.
4. Set **LOD Level 4** to `Level0`, **LOD Level 8** to `Level0` and **LOD Level 16** to `Level1`. **LOD Level 32** depends on your map: `Level1` if you use Flat Map Framework, `None` if you run a plain map mod like A Clear Map of Skyrim instead.

### The rest of the settings

| Setting | Value |
| :-- | :-- |
| **Parent > child** | ticked |
| **Child > parent** | `High` |
| **Occlusion data** | ticked, **Quality** `3` |
| **Grass LOD** | ticked, **Density** `25` |
| Tile sizes | left as they come |

Quality 3 for occlusion has no real downside. Grass density is the one to fiddle with: `25` balances performance against looks, drop toward `20` if your grass is naturally patchy, raise it if dense grass makes the LOD look wrong — but stay inside roughly `20` to `40`.

Glow windows are a matter of taste. They look good; if you do not want fake lit windows in the distance, leave them off.

### Trees: LOD or Ultra

**Tree LOD** builds billboards — two flat images of the tree crossed over each other. **Ultra** builds real 3D tree LOD, which looks considerably better and needs a tree mod that ships the models for it. Nature of the Wild Lands has them; some others have a 3D tree LOD add-on published separately. Check before choosing Ultra.

## Finishing

Generate, then make a `DynDOLOD Output` mod the same way and enable it.

{: .note}
The DLL is worth having — better performance, cleaner transitions between LOD and full models, and far less flickering. It is not free of quirks: it can occasionally make a building vanish or sink into the ground, Riverwood's mill and Solitude's East Empire warehouse being the ones people hit. If that happens, find the reference in game and override it back in a patch of your own — [Patches and Masters](/guides/xedit-patching) covers how.

Distant terrain from part one, grass from part two, everything else from this pass. That is the whole of your LOD generation, and it only needs redoing when you change the landscape, the textures on it, or the mods that put objects on top.
