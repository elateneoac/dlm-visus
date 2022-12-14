// const execa = require("execa");
// const fs = require("fs");
// import { execa } from "execa";
// import * as fs from 'fs';
(async () => {
    try {
    const fs = await import("fs");
    const { execa } = await import("execa");
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    // eslint-disable-next-line no-console
    console.log("Arrancando despliegue ...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    // await execa("git", ["add", "-A"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Subiendo a gh-page...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    // await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Despliegue OK");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();