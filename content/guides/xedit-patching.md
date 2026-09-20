Two mods edit the same weapon: one gives it a new model, the other reworks its stats. Whichever loads last wins outright, and the other mod's work is simply gone. A patch is how you keep both. By the end of this you will have made a small ESL-flagged plugin that takes the model from one mod and the stats from the other, and you will know how to do the same for anything else in your load order.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/eO9B8xMWRP0"></iframe>
</div>

{: .note}
This is the same job whichever xEdit you run — SSEEdit, FO4Edit, EnderalSEEdit. The version shown is SSEEdit 4.0.4; a newer one may move a menu item, but nothing in the method changes.

## Loading your plugins

1. Launch xEdit through Mod Organizer 2, the same way you launch any other tool.
2. The **Module Selection** window opens with everything currently enabled in MO2 already ticked. That is usually what you want — a patch needs to see the mods it is patching.
3. To work on a smaller set, right-click the list and choose **Select None**, then tick only the plugins you care about. You can also tick plugins that are *disabled* in MO2 if you need to edit them.
4. Click **OK**.
5. If a **Mod Groups** window appears, click **OK** to carry on.

Loading takes a minute the first time while xEdit reads every plugin. Wait for `Background Loader: finished` in the right-hand pane before you touch anything.

{: .warning}
A plugin whose masters are missing will not load, and xEdit will stop with an error rather than carry on. Fix the missing master in MO2 first.

## Finding the conflict

1. Find the mod you want to inspect in the left-hand pane.
2. Right-click it and choose **Apply Filter to show Conflicts (selected files only)**. The plain **Apply Filter to show Conflicts** does the same across your whole load order, which is slower and noisier when you already know which mod you are interested in.
3. Confirm your plugin is ticked in the window that opens and click **OK**.
4. Expand the filtered mod in the left pane. What survives the filter is what conflicts — for a weapon, that is under `WEAP - Weapon`.
5. Click the conflicting record. The right-hand pane puts one column per plugin, in load order, left to right.
6. Right-click anywhere in that pane and choose **Hide no conflict and empty rows** so only the rows that actually differ remain.

<!-- screenshot: the right-hand pane after hiding non-conflicting rows, showing red and green columns, [03:01] -->

Read the colours: red rows are where plugins disagree, and the winning value is the one in the rightmost column that has it. In the example, one mod changes `Model` and `MOD4 - 1st Person Model`, another changes `DESC - Description` and the enchantment — different properties of the same weapon, which is exactly the case load order cannot solve. Move either mod and you lose the other's work.

## Creating the patch

1. Decide which plugin holds the most of what you want to keep. That one becomes the base of the patch, so you copy less by hand.
2. Right-click that plugin's **column header** in the right-hand pane and choose **Copy as override into...**.
3. In the file list, scroll to the bottom and tick the `<new file>.esp` row that shows `ESL` in the ESL column. The dialog refuses to continue with nothing selected.
4. Click **OK**.
5. In the **New Module File** window, type a name you will recognise into **Filename without extension:** — the video uses `Valdrs Dagger Patch` — and click **OK**.
6. Your patch appears as a new column on the far right of the pane, and as a new plugin in the left one.

{: .important}
Take the `ESL` option for a patch like this. It keeps the file out of your 254-plugin budget — once saved, the patch shows in the left pane with an `FE` index (`[FE 10F] Valdrs Dagger Patch.esp`) instead of a numbered slot.

## Pulling in the other mod's changes

Your patch is currently an exact copy of one plugin. Now take the rows you want from the others.

1. Find the row you want in the column of the mod that has it — the model paths, say.
2. Drag it across and drop it into the same row of your patch column.
3. Click **Yes** on the confirmation prompt.
4. Repeat for every row you want to keep from every plugin.

<!-- screenshot: dragging a model row into the patch column, [05:00] -->

Two things make this quicker and safer:

{: .note}
Drag a parent header — `Model`, or `OBND - Object Bounds` — instead of its individual rows, and every sub-row comes with it in one go. And if you take a mod's model, take its object bounds with it: they describe that mesh, not the original one.

Be deliberate about what you copy. Taking the model from a replacer makes sense; taking its `DESC - Description` as well would throw away the description from the mod that reworked the stats, which is the thing you were trying to keep. When the patch column is green all the way down, every conflict is resolved.

## Saving it

1. Click the three lines at the top left, next to the **Filter by Name** box, and choose **Save**. Closing the window prompts you to save too.
2. The **Save changed files** window lists what changed — check that it is only your patch, shown as `Valdrs Dagger Patch.esp`. Leave **Backup plugins** unticked unless you want xEdit to keep a copy of every file it rewrites.
3. Click **OK**.

The patch is written into MO2's **Overwrite** folder. Move it into a mod of its own, enable it, and make sure it loads after both of the mods it patches.
