import { Data } from "../common/data";
import { printEntry } from "../common/entry";

/**
 * Pick the next task to from the list...
 */
export default function main() {
  const data = new Data();
  if (data.inprogress) {
    const entry = data.inprogress;
    if (entry.state === "solve_again") {
      console.log("Completed!");
      console.log();
      printEntry(entry);
      console.log();
      console.log("---------------");
    }
  }

  const next = data.next();
  console.log();
  if (next) {
    if (next.state === "breakdown") {
      console.log("New task:");
      console.log();
    }
    printEntry(next);
  } else {
    console.log("✅ No outstanding tasks to breakdown!");
  }
}
