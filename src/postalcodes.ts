// Both the `fs` and `path` modules are built-in Node.js modules.
import { readFileSync } from "fs";
import path from "path";
import { isNumber } from "util";

/**
 * `path.join` and `__dirname` are used to generate the path to the CSV file "postalcodes.csv"
 * that is in the parent folder of this file. This enables the script to be run from any folder
 * and still find the file:
 */
const csvFile: string = path.join(__dirname, "..", "postalcodes.csv");

/*
 * `readFileSync` is a Node.js function that reads the contents of a file synchronously
 * (without promises). The second argument specifies the encoding of the file, which is
 * 'utf-8' in this case:
 */
let fileContents: string = readFileSync(csvFile, "utf-8");

/*
 * Each postal code is on a separate line in the CSV file. We can split the contents of the
 * file into an array of lines using the `split` method. The `trim` method is used first to
 * remove any leading or trailing whitespace from the file contents, so that the first and
 * last lines are not empty strings.
 */
let lines: string[] = fileContents.trim().split("\n");

/*
 * Next, we take (slice) the first 5 lines from the CSV file and log them to the console
 * using `console.table`. The `table` method is similar to `log`, but it formats the output
 * as a table, which is useful for displaying tabular data like CSV files.
 */
//console.log('The first 5 lines read from CSV file:');
//console.table(lines.slice(0, 5));

/*
 * In Node.js, the command-line arguments are stored in the `process.argv` array. The first
 * two elements of the array are the paths to the Node.js executable and the script file
 * being run. The rest of the elements are the arguments passed to the script.
 *
 * Try to give some extra arguments when running the script, and you should see them in the
 * table output.
 */
//let params: string[] = process.argv; // argv is an array of strings

//console.log("The contents of the `process.argv` array:");
//console.table(params);

interface PostOffice {
  name: string;
  code: string;
}

function findName() {
  let input: string[] = process.argv.slice(2);
  let inputtedCode: string = input[0];
  let found: boolean = false;

  for (let i = 0; i < lines.length; i++) {
    let splitItem: string[] = lines[i].split(",");
    let zipCode: string = splitItem[0];
    let name: string = splitItem[1];
    if (zipCode === inputtedCode) {
      console.log(name);
      found = true;
      break;
    }
  }
  if (!found) {
    console.log("Zipcode is invalid or not part of the list");
  }
}
//findName();

function listCodes() {
  let input: string[] = process.argv.slice(2);
  let inputtedCode: string = input[0].toUpperCase();
  let foundCodes: string[] = [];
  let found: boolean = false;

  for (let i = 0; i < lines.length; i++) {
    let splitItem: string[] = lines[i].split(",");

    let nameAndCode: PostOffice = {
      name: splitItem[1].toUpperCase(),
      code: splitItem[0],
    };

    if (inputtedCode === nameAndCode.name) {
      foundCodes.push(nameAndCode.code);
      foundCodes.sort();
      found = true;
    }
  }
  if (!found) {
    console.log("Name is invalid or not part of the list");
  } else {
    let output = foundCodes.join(", ");
    console.log(output);
  }
}

listCodes();
