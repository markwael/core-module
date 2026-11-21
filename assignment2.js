const path = require("path");
const fs = require("fs");
const os = require("os");
const zlib = require("zlib");
const EventEmitter = require("events");
const { pipeline } = require("stream");


// 1. Write a function that logs the current file path and directory
function getFileInfo() {
  return { File: __filename, Dir: __dirname };
}
console.log(getFileInfo());


// 2. Write a function that takes a file path and returns its file name
function getFileName(filePath) {
  return path.basename(filePath);
}
console.log(getFileName("/user/files/report.pdf"));


// 3. Write a function that builds a path from an object
function buildPath(obj) {
  return path.format(obj);
}
console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));


// 4. Write a function that returns the file extension from a given file path
function getExtension(filePath) {
  return path.extname(filePath);
}
console.log(getExtension("/docs/readme.md"));


// 5. Write a function that parses a given path and returns its name and ext
function parsePath(filePath) {
  const parsed = path.parse(filePath);
  return { Name: parsed.name, Ext: parsed.ext };
}
console.log(parsePath("/home/app/main.js"));


// 6. Write a function that checks whether a given path is absolute
function isAbsolute(filePath) {
  return path.isAbsolute(filePath);
}
console.log(isAbsolute("/home/user/file.txt"));


// 7. Write a function that joins multiple segments
function joinSegments(...segments) {
  return path.join(...segments);
}
console.log(joinSegments("src", "components", "App.js"));


// 8. Write a function that resolves a relative path to an absolute one
function resolvePath(relativePath) {
  return path.resolve(relativePath);
}
console.log(resolvePath("./index.js"));


// 9. Write a function that joins two paths
function joinTwoPaths(path1, path2) {
  return path.join(path1, path2);
}
console.log(joinTwoPaths("/folder1", "folder2/file.txt"));


// 10. Write a function that deletes a file asynchronously
function deleteFile(filePath) {
  fs.unlink(filePath, function (err) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("The " + path.basename(filePath) + " is deleted.");
  });
}
deleteFile("./file.txt");


// 11. Write a function that creates a folder synchronously
function createFolder(folderPath) {
  fs.mkdirSync(folderPath);
  return "Success";
}
console.log(createFolder("./newFolder"));


// 12. Create an event emitter that listens for a "start" event and logs a welcome message
const startEmitter = new EventEmitter();
startEmitter.on("start", function () {
  console.log("Welcome event triggered!");
});
startEmitter.emit("start");


// 13. Emit a custom "login" event with a username parameter
const loginEmitter = new EventEmitter();
loginEmitter.on("login", function (username) {
  console.log("User logged in: " + username);
});
loginEmitter.emit("login", "Ahmed");


// 14. Read a file synchronously and log its contents
function readFileSync(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  console.log(content);
}
readFileSync("./notes.txt");


// 15. Write asynchronously to a file
function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, function (err) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("File saved");
  });
}
writeFileAsync("./async.txt", "Async save");


// 16. Check if a directory exists
function checkExists(dirPath) {
  return fs.existsSync(dirPath);
}
console.log(checkExists("./notes.txt"));


// 17. Write a function that returns the OS platform and CPU architecture
function getOSInfo() {
  return { Platform: os.platform(), Arch: os.arch() };
}
console.log(getOSInfo());


// 18. Use a readable stream to read a file in chunks and log each chunk
function readInChunks(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  readStream.on("data", function (chunk) {
    console.log(chunk);
  });
}
readInChunks("./big.txt");


// 19. Use readable and writable streams to copy content from one file to another
function copyFile(source, dest) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(dest);
  readStream.pipe(writeStream);
  writeStream.on("finish", function () {
    console.log("File copied using streams");
  });
}
copyFile("./source.txt", "./dest.txt");


// 20. Create a pipeline that reads a file, compresses it, and writes it to another file
function compressFile(source, dest) {
  pipeline(
    fs.createReadStream(source),
    zlib.createGzip(),
    fs.createWriteStream(dest),
    function (err) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("File compressed");
    }
  );
}
compressFile("./data.txt", "./data.txt.gz");
