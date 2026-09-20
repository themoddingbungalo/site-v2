LOD is what you see in the distance — the mountains on the horizon, the trees across the valley, the ground under both. Generating it is the last thing you do to a load order, and it comes in three passes that have to run in order. This is the first: terrain, with xLODGen. When it is done, distant ground matches the ground you are standing on.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/Xjzef1TT4Gk"></iframe>
</div>

{: .note}
**Part 1 of 3.** Then [Grass Cache](/guides/lodgen-grass-cache), then [TexGen & DynDOLOD](/guides/lodgen-dyndolod). Terrain first, because the later passes read what this one produces.

## What xLODGen is for

Terrain and water, and nothing else. Tree LOD, object LOD and occlusion are DynDOLOD's job now — generating them here as well only creates files that fight with the ones DynDOLOD makes in part three.

Run it when you change the landscape — anything that adds to or edits the terrain — and when you change the textures on it, whether that is swapping a landscape texture mod or just new mountain textures. It is the cherry on top of a load order: everything else first, all your patches, your Synthesis run, and then LOD.

## Getting the tool

Download **xLODGen beta** from Sheson's post on the STEP Modifications forum. Do not use the `SSE LODGen` on Nexus — it sounds like the right thing and it is not, because it is 32-bit. The beta is the 64-bit build, which is then pointed at Skyrim Special Edition.

Make a folder for it in Mod Organizer 2's `tools` directory — `tools\xLODGen` — and extract everything into it.

### Adding it to Mod Organizer

![The Modify Executables dialog with the binary, start-in path and arguments filled in.](assets/guides/lodgen-terrain/mo2-executable.webp)

In **Modify Executables**, add a new entry:

- **Binary** — `xLODGen64.exe` in the folder you just made.
- **Arguments** — `-SSE` first, which is what makes it run as Skyrim Special Edition. Then a space and `-o:` followed by the output location you want, in quotes.
- Add `-d:` pointing at your data path **only if you use Stock Game or Game Root**. Without one of those you can ignore it.
- Tick **Force load libraries**, and nothing else.

### Terrain resources

Install **xLODGen Resource — SSE Terrain Tamriel**, which extends the generated terrain so it does not simply stop at the edge of the map. Take the **Tamriel Extend** version; the full extended one exists for people who already know why they want it.

You can skip this if you run **World Space Transition Tweaks**, which does the same job and more. A mod page will usually tell you if it makes the resource redundant.

## Before you run it

{: .warning}
If you use a flat map mod, disable its **plugins** before generating. Leave the loose files enabled in the left pane, at the bottom of your load order, but the ESPs come off — otherwise the elevations get baked into your map.

Then enable the terrain resource so it sits at the bottom of your masters. As long as it is the last master file, you are set.

## The settings

![LODGen Options: worldspaces on the left, Terrain LOD ticked, and the per-level settings below it.](assets/guides/lodgen-terrain/xlodgen-options.webp)

1. Right-click the worldspace list on the left and **select all**.
2. Tick **Terrain LOD** only. Leave **Objects LOD**, **Trees LOD** and **Occlusion** unticked — all three belong to DynDOLOD.
3. Work through all four levels in the **Settings for** dropdown: `LOD4`, `LOD8`, `LOD16`, `LOD32`. Each is configured separately and all four need doing.
4. Press **Generate**.

Two dials are worth your attention, and the rest can stay as the screenshot shows:

| Setting | Value | When to change it |
| :-- | :-- | :-- |
| Build diffuse **Size** | `512` | `256` on a 1080p monitor or if you are short on performance; `1024` if your machine has room and you want sharper distant ground |
| **Gamma** | `1.10` | `1.25` if your landscape textures are dark, down to `1.0` if they are very bright |

{: .note}
The video does not read out the remaining fields — quality, formats, brightness, contrast and the rest are simply left where they sit, and the presenter points people at the pictures of his settings in the Bungalo Discord. Match the screenshot above and you have the same configuration.

## Packaging the output

There is no popup when it finishes; the log just reports that LOD generation is finished.

1. In Mod Organizer, create an empty mod — `xLODGen Output` does nicely.
2. Open your output folder, and move the `meshes` and `textures` folders into the new mod.
3. Enable it, and leave it at the bottom of the left pane.

That is terrain done. Next: [Grass Cache](/guides/lodgen-grass-cache), which is the longest of the three and the one that needs the most patience.
