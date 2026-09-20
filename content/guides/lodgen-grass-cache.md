A grass cache is a pre-computed record of where every blade of grass goes. Generating one stops grass growing through rocks and buildings, lets it draw much further out, and costs less performance than having the game work it out as you walk. It is also what makes grass LODs possible at all, which is why it sits in the middle of this series rather than at the end.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/jH7co25_JIo"></iframe>
</div>

{: .note}
**Part 2 of 3.** After [Terrain LOD](/guides/lodgen-terrain) and before [TexGen & DynDOLOD](/guides/lodgen-dyndolod). This is the long one — the generation itself can take hours.

{: .warning}
Uncheck **SSE Terrain Tamriel** — the xLODGen resource from part one — if it is still enabled. It is the one output you turn off again after using it.

## What you need

- **No Grass In Objects**, in the version matching your Skyrim build. It used to require 1.5.97; there are now builds for the later versions and for VR.
- Its optional **Grass Generation MO2 Plugin**. Drop `GrassGenerator.py` into Mod Organizer's `plugins` folder and restart MO2 — a **Pre-Cache Grass** entry then appears under the tools (puzzle piece) menu.
- Optionally the **GrassControl.ini** file from the same page. Without it one is generated for you at `overwrite\SKSE\Plugins\GrassControl.ini`.
- **Worldspaces with Grass**, an xEdit script. Put `List worldspaces with grass.pas` into your xEdit `Edit Scripts` folder. It makes the whole job faster by limiting generation to worldspaces that actually contain grass.

Free pre-made caches exist on Nexus. They are worth trying only if nothing in your load order touches the landscape — if anything does, the cache will not match your game.

## Listing your worldspaces

You do need xEdit for this part; there is no way round it.

1. Open xEdit through MO2 and let it load.
2. Right-click anywhere in the left-hand pane and choose **Apply Script**. Search `grass` and run **List worldspaces with grass**.
3. A window opens with the list. Copy it into a text file — you will paste it into the INI shortly.

## Building the grass bounds plugin

![Apply Filter, with GRAS - Grass picked under record signature.](assets/guides/lodgen-grass-cache/gras-filter.webp)

1. Right-click in the left pane again and choose **Apply Filter**.
2. Under **by record signature**, select **GRAS - Grass** and nothing else, then click **Filter**. What remains is every grass record in your load order.
3. **Start at the bottom of the list and work upwards.** Highlight the grass records in the lowest plugin, right-click, and choose **Copy as override into...**
4. Pick the `<new file>.esp` row that shows **ESL**, and name it `Grass Bound Records`.
5. Move up to the next plugin and repeat into the same file, clicking **Yes** on anything that asks.
6. Save on the way out, and enable `Grass Bound Records.esp` at the very bottom of your load order.

{: .warning}
Use **Copy as override into**, never *Copy with overwriting*. And work bottom-up: going the other way means later records overwrite what you have already collected.

## Recalculating the bounds

Some grass records ship with no bounds — the data describing how big the grass model actually is. The generator skips anything it cannot measure, so those become bare patches. The Creation Kit fixes it in one action.

![The Object Window under WorldObjects, with every grass record selected and Recalc Bounds in the context menu.](assets/guides/lodgen-grass-cache/recalc-bounds.webp)

1. Open the Creation Kit through MO2. If it offers you a script window on first launch, you can close it.
2. **File → Data**, tick `Grass Bound Records.esp`, click **Set as Active File**, then **OK**.
3. In the Object Window, expand **WorldObjects** and select **Grass**. Your collected records are all there.
4. Select them all, right-click, and choose **Recalc Bounds**.
5. **File → Save**, and close the Creation Kit. That is the only thing it is needed for here.

## Configuring GrassControl.ini

![GrassControl.ini with the worldspace list pasted in and the cache settings below it.](assets/guides/lodgen-grass-cache/grasscontrol-ini.webp)

Open the INI and find `Only-pregenerate-world-spaces`, near the bottom under `[GrassConfig]`. Paste in the worldspace list you saved earlier, wrapped in quotation marks. Everything above that section stays at its default. Then set these, all of them in the same section:

| Setting | Value |
| :-- | :-- |
| `Super-dense-grass` | `false` |
| `Use-grass-cache` | `true` |
| `Extend-grass-distance` | `false` |
| `Overwrite-grass-distance` | `12000` |
| `Overwrite-grass-fade-range` | `8000` |
| `Global-grass-scale` | `1.000000` |
| `Only-load-from-cache` | `true` |
| `DynDOLOD-Grass-Mode` | `1` |
| `Max-Failures` | `2` |

{: .note}
The names really are hyphenated like that, and the worldspace list is separated by **semicolons**, not commas — `"BlindCliffCaveWorld;BloatedMansGrottoWorld;…;Tamriel"`. There is a matching `Skip-pregenerate-world-spaces` just above it for worldspaces you want left out.

{: .important}
`Use-grass-cache` must be `true` or none of this does anything. Leave `Extend-grass-distance` **false** — it draws grass outside loaded cells and wrecks performance, and grass LODs in part three are the better answer to the same problem. For reference, `7000` is roughly vanilla distance; `12000` / `8000` is a comfortable balance, and `10000` / `7000` buys back a little performance.

## A profile for generating in

Half the crashes during generation come from mods that have no business being loaded while a tool drives the game. Copy your normal profile, call the copy `Grass Cache`, and in that profile disable:

- UI and HUD mods — **TrueHUD** and **MoreHUD** especially, along with SkyUI, photo mode, anything else on screen
- ultrawide patches
- ENB, and Community Shaders
- texture replacers, which do nothing for a cache

Then drop the resolution. In **SSE Display Tweaks**, uncomment the resolution setting and set something tiny like `800x400` so the game runs as fast as it can. Without Display Tweaks, edit `SkyrimPrefs.ini` instead.

## Generating

Run **Pre-Cache Grass** from the tools menu and leave it alone. The game will open, close, and restart itself repeatedly — that is the tool working, not failing.

{: .note}
If it will not get through the run, do one worldspace at a time: set `Only-pregenerate-world-spaces` to just `"Tamriel"`, generate that, then put the rest back and run them separately. Keep a copy of the full list somewhere while you do.

When it finishes, the cache files are sitting in **Overwrite**. Right-click Overwrite, create a mod from it, and call it `Grass Cache`.

Check the size before you move on. For a load order without large new worldspaces, expect roughly **800–900 MB**. Much less than that and something went wrong; much more is normal if you run Bruma, Wyrmstooth or similar.

Next: [TexGen & DynDOLOD](/guides/lodgen-dyndolod), which turns this cache into grass you can see from across the valley.
