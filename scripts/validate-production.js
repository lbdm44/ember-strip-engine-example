const { cli } = require("cli-ux");
const fs = require("fs");
const path = require("path");
const glob = require('glob');

class FooBarFoundError extends Error {
  constructor() {
    super(...arguments);

    this.name = 'Foo Bar Found Error';
  }
}

function fileContainsFooBar(filePath) {
  let file = fs.readFileSync(filePath, 'UTF-8');
  return /foo-bar/.test(file);
}

let dist = path.resolve(__dirname, "../dist");

if (fs.existsSync(dist)) {
  try {
    let files = glob.sync(`${dist}/**/*.js`)

    let bar = cli.progress();

    bar.start(files.length, 0);

    let filesWithFooBar = files.filter((filePath, idx) => {
      let contains = fileContainsFooBar(filePath);

      bar.update(idx + 1);

      return contains;
    });

    bar.stop();

    if (filesWithFooBar.length) {
      let err = new FooBarFoundError();
      err.count = filesWithFooBar.length;
      err.files = filesWithFooBar;

      cli.error(err);
    } else {
      cli.log('Engine not found!');
    }
  } catch (err) {
    cli.error(err);
  }
} else {
  cli.error("did not find dist");
}
