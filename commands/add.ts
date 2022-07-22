import { Data } from "../common/data";
import { createEntry } from "../common/entry";

/**
 * Add new task to the breakdown list.
 *
 * @param {string} id
 * @param {string} title
 * @param {string} url
 * @param {string} keywords
 */
export default function main(
  id: string | undefined,
  title: string,
  url: string,
  keywords: string
) {
  const data = new Data();
  const entry = createEntry({ id, title, url, keywords });

  console.log(`Processing task: ${entry.id} – ${entry.title}`);
  console.log();

  if (data.hasEntry(entry.id)) {
    console.log(`⏭  Already exist in the task list, skipping`);

    if (data.isQueued(entry.id)) {
      console.log(`⏭  Already queued, skipping`);
    } else {
      console.log(`✅ Queued again!`);
      data.queueEntry(entry);
    }
  } else {
    data.addEntry(entry);
    data.queueEntry(entry);
    console.log(`✅ Added to the queue!`);
  }
}
