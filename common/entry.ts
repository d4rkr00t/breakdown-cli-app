import slugify from "slugify";

export type EntryCLIData = {
  id?: string;
  title: string;
  url: string;
  keywords: string;
};

export type Entry = {
  id: string;
  title: string;
  url: string;
  keywords: Array<string>;
  state: "queued" | "breakdown" | "re_type" | "solve_again" | "completed";
};

export function createEntry(entryData: EntryCLIData): Entry {
  return {
    id: entryData.id ? entryData.id.trim() : slugify(entryData.title),
    title: entryData.title.trim(),
    url: entryData.url.trim(),
    keywords: entryData.keywords.split(",").map((keyword) => keyword.trim()),
    state: "queued",
  };
}

export function printEntry(entry: Entry) {
  console.log("{");
  console.log("    id:      ", entry.id);
  console.log("    title:   ", entry.title);
  console.log("    url:     ", entry.url);
  console.log("    state:   ", formatState(entry.state));
  console.log("    keywords:", entry.keywords);
  console.log("}");
}

function formatState(state: Entry["state"]) {
  switch (state) {
    case "queued":
      return "Queued";
    case "breakdown":
      return "Breakdown";
    case "re_type":
      return "Re-type solution";
    case "solve_again":
      return "Solve again";
    case "completed":
      return "Completed";
  }
}

export function getEntryNextState(entry: Entry): Entry["state"] {
  switch (entry.state) {
    case "queued":
      return "breakdown";
    case "breakdown":
      return "re_type";
    case "re_type":
      return "solve_again";
    case "solve_again":
      return "completed";
    case "completed":
      return "completed";
  }
}
