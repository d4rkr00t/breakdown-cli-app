import { Data } from "../common/data";
import { printEntry } from "../common/entry";

/**
 * Use JSDoc comments to define help and parameters for a CLI.
 * {cliName} will be replaced with an actual name of a CLI tool.
 */
export default async function main() {
  const data = new Data();

  for (let entry of Object.values(data.entries)) {
    printEntry(entry);
    console.log();
  }
}
