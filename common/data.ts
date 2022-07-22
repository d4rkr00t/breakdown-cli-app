import Conf from "conf";
import { Entry, getEntryNextState } from "./entry";

export class Data {
  private conf: Conf<any>;
  inprogress: Entry | undefined;
  private queue: string[];
  private entries: Record<string, Entry>;
  private stats: Record<string, number>;

  constructor() {
    this.conf = new Conf();
    this.inprogress = this.conf.get("inprogress") || undefined;
    this.queue = this.conf.get("queue") || [];
    this.entries = this.conf.get("entries") || {};
    this.stats = this.conf.get("stats") || {};
  }

  hasEntry(id: string): boolean {
    return !!this.entries[id];
  }

  isQueued(id: string): boolean {
    return this.queue.includes(id) || (this.inprogress || {}).id === id;
  }

  addEntry(entry: Entry) {
    this.entries[entry.id] = entry;
    this.conf.set("entries", this.entries);
  }

  queueEntry(entry: Entry) {
    if (!this.isQueued(entry.id)) {
      this.queue.push(entry.id);
    }

    entry.state = "queued";
    this.addEntry(entry);

    this.stats[entry.id] = (this.stats[entry.id] || 0) + 1;
    this.conf.set("queue", this.queue);
    this.conf.set("stats", this.stats);
  }

  next(): Entry | null {
    if (!this.inprogress) {
      if (this.queue.length === 0) return null;
      const id = this.queue.shift()!;
      this.inprogress = this.load(id);
    } else if (
      this.inprogress.state === "solve_again" ||
      this.inprogress.state === "completed"
    ) {
      this.inprogress.state = getEntryNextState(this.inprogress);
      this.addEntry(this.inprogress);
      this.conf.set("inprogress", this.inprogress);

      if (this.queue.length === 0) {
        this.inprogress = undefined;
        this.conf.delete("inprogress");
        return null;
      }

      const id = this.queue.shift()!;
      this.inprogress = this.load(id);
    }

    this.inprogress.state = getEntryNextState(this.inprogress);
    this.addEntry(this.inprogress);
    this.conf.set("inprogress", this.inprogress);
    this.conf.set("queue", this.queue);

    return this.inprogress;
  }

  load(id: string): Entry {
    return this.entries[id];
  }
}
