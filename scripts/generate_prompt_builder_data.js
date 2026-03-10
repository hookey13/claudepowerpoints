const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

function readText(fileName) {
    return fs.readFileSync(path.join(rootDir, fileName), "utf8").replace(/^\uFEFF/, "");
}

const payload = {
    generatedAt: new Date().toISOString(),
    claude: readText("CLAUDE.md"),
    megaprompt: readText("megapromptlean.md")
};

const output = "window.PROMPT_BUILDER_DATA = " + JSON.stringify(payload, null, 2) + ";\n";

fs.writeFileSync(path.join(rootDir, "prompt_builder_data.js"), output, "utf8");

console.log("Wrote prompt_builder_data.js");
