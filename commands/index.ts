import Conf from "conf";
import { Data } from "../common/data";
import { printEntry } from "../common/entry";

/**
 * Use JSDoc comments to define help and parameters for a CLI.
 * {cliName} will be replaced with an actual name of a CLI tool.
 */
export default async function main() {
  const data = new Data();

  if (data.inprogress) {
    printEntry(data.inprogress);
    return;
  }

  console.log(
    "Nothing is in progress right now! Run `breakdown next` to pick the next task."
  );
}
