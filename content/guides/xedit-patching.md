Two mods edit the same weapon: one gives it a new model, the other reworks its stats. Whichever loads last wins outright, and the other mod's work is simply gone. A patch is how you keep both. By the end of this you will have made a small ESL-flagged plugin that takes the model from one mod and the stats from the other — and, in the second half, cut a mod back out of a patch that depends on it.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/eO9B8xMWRP0"></iframe>
</div>

{: .note}
This is the same job whichever xEdit you run — SSEEdit, FO4Edit, EnderalSEEdit. The two videos were recorded on different builds (4.0.4 and 4.1.5), which is a fair illustration of the point: a newer version may move a menu item, but nothing in the method changes.

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

![The right-hand pane with non-conflicting rows hidden: each plugin gets a column, and the red rows are where they disagree.](assets/guides/xedit-patching/conflict-view.webp)

Read the colours: red rows are where plugins disagree, and the winning value is the one in the rightmost column that has it. In the example, one mod changes `Model` and `MOD4 - 1st Person Model`, another changes `DESC - Description` and the enchantment — different properties of the same weapon, which is exactly the case load order cannot solve. Move either mod and you lose the other's work.

## Creating the patch

1. Decide which plugin holds the most of what you want to keep. That one becomes the base of the patch, so you copy less by hand.
2. Right-click that plugin's **column header** in the right-hand pane and pick **Copy as override into...** from the menu.
3. In the file list, scroll to the bottom and tick the `<new file>.esp` row that shows `ESL` in the ESL column. The dialog refuses to continue with nothing selected.
![The file list, with the <new file>.esp row that carries ESL in the ESL column selected.](assets/guides/xedit-patching/new-file-esl.webp)

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

![The patch column on the right, now carrying the model from one mod and the stats from another.](assets/guides/xedit-patching/drag-to-patch.webp)

Two things make this quicker and safer:

{: .note}
Drag a parent header — `Model`, or `OBND - Object Bounds` — instead of its individual rows, and every sub-row comes with it in one go. And if you take a mod's model, take its object bounds with it: they describe that mesh, not the original one.

Be deliberate about what you copy. Taking the model from a replacer makes sense; taking its `DESC - Description` as well would throw away the description from the mod that reworked the stats, which is the thing you were trying to keep. When the patch column is green all the way down, every conflict is resolved.

## Saving it

1. Click the three lines at the top left, next to the **Filter by Name** box, and choose **Save**. Closing the window prompts you to save too.
2. The **Save changed files** window lists what changed — check that it is only your patch, shown as `Valdrs Dagger Patch.esp`. Leave **Backup plugins** unticked unless you want xEdit to keep a copy of every file it rewrites.
3. Click **OK**.

The patch is written into MO2's **Overwrite** folder. Move it into a mod of its own, enable it, and make sure it loads after both of the mods it patches.

## Removing a master

Every plugin lists the files it depends on, its *masters*. A patch picks them up automatically as you copy records in, and that is usually what you want — until it is not. Perhaps a mod from the Nexus drags in a file you have no intention of installing, or you have pulled a mod out of your load order and the patch that referenced it now refuses to load. Removing a master is how you cut that dependency without rebuilding the patch.

<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/5cHJ0i7hE2U"></iframe>
</div>

The order matters here: a master cannot be dropped while anything in the plugin still points at it, so you find the references first and clean up second.

### Finding what still references it

1. Load the plugin **and all of the masters it currently has**. This is the same rule as the start of the guide — with one missing, xEdit will not open the file at all, and you cannot remove a master from a plugin you cannot load.
2. Select the plugin in the left-hand pane, right-click it and pick **Apply Script...** from the menu.
3. Pick **Report masters** from the **Script** dropdown — type `masters` into the filter box above it to find it quickly. The script's own description says what it is for: it lists the records and elements that require a master, so you can deal with them before running Clean Masters. Click **OK**.
4. A **Masters** window lists every master the plugin has. Use the **Search** box, tick the one you want to remove, and click **OK**.
5. Read the message log in the bottom-right pane, under **Selected masters are required by the following records and elements:**. Each line names a record, its FormID in square brackets, and the element inside it that holds the reference.

{: .note}
Nothing listed under that heading? Then nothing points at the master any more and you can go straight to cleaning. That is the quick path, and it is common for a master a mod picked up but never really used.

### Clearing the references

1. Copy the FormID from a reported line and paste it into the **FormID** box at the top left of the window, then press Enter. xEdit jumps straight to that record.
2. In the right-hand pane, find the rows carrying values from the master you are removing — its column is the one to read across from.
3. Right-click those rows in **your plugin's** column and choose **Remove**.
4. Work through every record the report listed.

{: .warning}
Remove only the rows that came from the master you are cutting out. Everything else in that record — the rows forwarded from the vanilla game or from mods you are keeping — is the work the patch exists to do, and removing it is how a patch quietly stops doing its job.

### Cleaning and checking

1. Right-click the plugin in the left-hand pane and choose **Clean Masters**, which strips out every master nothing references any more.
2. The plugin's **File Header** turns bold. That is the plugin being flagged as changed, and it is your confirmation that the master came off.
3. To see the result, open **File Header** and read the **Master Files** list — the one you removed should be gone.

If the master is still listed, something is still referencing it. Run **Report masters** again: it will name whatever you missed.
