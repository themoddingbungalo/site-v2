A seam is where two mods disagree about the shape or the texture of the ground. Sometimes it is a hard line where one terrain texture stops and another starts; sometimes the land does not meet at all and you can see through the world. Both are fixed in the Creation Kit, and neither takes long once you know where to look. By the end of this you will have found the cell your seam sits in, worked out which mod made it, and closed it in your own patch.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/bLibtlmBgRw"></iframe>
</div>

## What you need

- **More Informative Console** — to ask the game which cell you are standing in and which mods have touched it.
- **The Creation Kit**, plus **Creation Kit Platform Extended**. The Kit is unstable on modern systems and CKPE is what makes it tolerable. Drop it into your Skyrim install folder — or your Stock Game folder, if your list uses one — and launch the **Creation Kit Platform Extended loader** from Mod Organizer 2 rather than the Creation Kit itself.
- **xEdit**, to make somewhere to put the fix and to check which mods really touch the landscape.

{: .warning}
The Creation Kit crashes. It crashes even with every stability fix installed, and it will crash on you during this job. Save often, and treat a crash as normal rather than as a sign you did something wrong.

## Finding the cell and the culprit

Stand next to the seam, in third person, and open the console.

1. Click your character to select them, then press **Tab** once — enough to reach the panel listing the cell and the world space.
2. Hover over **Cell** and press **Shift**.
3. Hover over **Form location information** and press **Shift**.
4. Hover over **Base found in** and press **Shift**. You now have every mod that has touched this cell, in load order.
5. Note the grid coordinates, shown just under the world space — `5, -7`, for example.
6. Walk to the other side of the seam and do it all again. That side is a different cell, with its own coordinates and possibly its own culprit.

The mod you want is the last one in that list that actually edits the **landscape**. That is not simply the last entry: output from an automated patcher — a Synthesis vertex patch, say — often sits at the bottom, and since you will re-run Synthesis at the end anyway, it is not what you are patching against. Look past it to the last hand-made plugin. If you are not sure whether a mod touches the landscape at all, open it in xEdit: landscape records live under the world space, where each block carries a `Landscape` record.

{: .note}
A seam on a corner touches more than two cells. Check every cell around the join rather than assuming both sides have the same culprit — the console panel also reports the **Landscape texture at reference**, which is worth writing down for later.

## Making somewhere to put the fix

Skip this if you already have a patch plugin for the mod in question — use that instead.

1. Launch xEdit through MO2. In the module selection window, right-click and choose **Select None**, then **OK**. You do not need anything loaded to create an empty file.
2. Right-click anywhere in the left-hand pane and choose **Create new file**.
3. In **What type of module do you want to create?**, pick the `<new file>.esp` row that carries `ESL` in the ESL column.
4. Name it for what it is and where it is — `Northern Roads Patch - Whiterun` — and click **OK**.
5. Close xEdit and save the new plugin. It is empty, and that is fine: it exists to give the Creation Kit somewhere to write.

## Loading it in the Creation Kit

1. Launch the **Creation Kit Platform Extended loader** from MO2.
2. Go to **File** → **Data**.
3. Find your patch plugin in the list, select it, and click **Set as Active File**. Its Status column now reads `Active File` — everything you do from here is written into that plugin.
4. Tick the mods you identified in the console as well, so the Kit loads them as masters and you are editing the landscape as it actually ends up in game.
5. Click **OK** and wait. This takes a while.

## Getting to the seam

1. In the **Cell View** window, set **World Space** to `Tamriel` — or `DLC2SolstheimWorld` for Solstheim. Nearly every seam you will ever fix is in one of the two.
2. Type your coordinates into the two grid boxes and click **Go**.
3. Use the **View** menu to toggle off **Grass**, **Trees** and **Markers**. Without that you cannot see the ground you are trying to fix. Sometimes a toggle needs pressing twice.
4. Hold **Shift** and move the mouse to swing the camera around; hold **Shift** and use the scroll wheel to move forwards and backwards.

{: .note}
Some textures may render as flat purple depending on how your BSAs are set up. It looks alarming and means nothing — it is a Creation Kit loading quirk, not damage to your game.

Expect the place to look unfamiliar. Lighting and grass are what you navigate by in game, and neither is there, so finding the exact spot takes longer in the Kit than it did in the world.

## Closing a gap

A hole you can see through is the easy case, and it is almost always two mods disagreeing about the height of the same vertex — it is vanishingly rare in an unmodded game.

1. Press **H** to open **Landscape Edit Settings**.
2. Hold **left click** on the gap and move the mouse up, so you are dragging the land.
3. Let go, then press **Ctrl + Z** to undo the drag.

The undo is the fix, not a mistake. Touching the vertex makes the Kit write the land record out again, and undoing your change leaves the edges of the two cells snapped back together at the height they should have shared all along. A hole big enough to fall through closes in one go.

## Blending a texture seam

A hard line between two ground textures is fixed by painting one of them across the join, and the only real difficulty is that you cannot paint just anything.

1. With **Landscape Edit Settings** open, find a texture in the **Texture** list — the **Used** column tells you what is already in play here.
2. Select it, then **right-click** in the render window to paint. Left click is the height tool; right click lays down texture.
3. If nothing happens, the texture cannot go there. Pick another and try again.

{: .important}
Each grid square holds only about six different landscape textures, so a texture that is not already present on that side has nowhere to go and the Kit simply refuses to paint it. The ones that work are the textures **shared by both sides of the seam** — so look at what each side is made of and find the overlap. Two rock textures can refuse outright while a pine forest texture takes immediately — that is the overlap doing its work, not the tool being temperamental.

Paint along the join until the change reads as a gradient rather than a line, and the seam is gone.

## Saving, and the step people forget

Go to **File** → **Save**.

{: .warning}
Re-run your Synthesis patchers afterwards. You have just hand-edited a landscape record, and a vertex patcher that ran before your edit knows nothing about it — leave it stale and it can undo the fix you just made.
