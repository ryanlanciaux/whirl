var shell = require("shelljs");

shell.exec("cd packages/react-whirl && yarn prepublish", { async: false });
shell.exec("cd packages/example && yarn parcel index.html", { async: true });

console.log("Started both apps");
