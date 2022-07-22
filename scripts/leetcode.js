// Chrome dev tools snippet to create a breakdown CLI command
// Example:
// breakdown add --id 1499 --title "Max Value of Equation" --url https://leetcode.com/problems/max-value-of-equation/ --keywords "Array,Queue,Sliding Window,Heap (Priority Queue),Monotonic Queue"

(function () {
  const $title = $("[data-cy=question-title]");
  const keywords = $$("[class*=topic-tag]");
  const url = location.href;
  const [id, title] = $title.textContent.split(". ");

  const entry = {
    id: id,
    title: title,
    url: url,
    keywords: keywords.map((kw) => kw.textContent),
  };
  const command = `breakdown add --id ${entry.id} --title "${
    entry.title
  }" --url ${entry.url} --keywords "${entry.keywords.join(",")}"`;
  copy(command);

  console.log("Entry:");
  console.log(JSON.stringify(entry, null, 2));
  console.log();
  console.log("CLI commands copied to clipboard:");
  console.log(command);
})();
