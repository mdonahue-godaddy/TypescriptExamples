import * as fs from "fs";
import * as path from "path";
import * as csvParse from 'csv-parse';

export class CsvExample {
  arg: string;

  constructor(arg: string) {
    console.log('constructor: ', {arg});
    this.arg = arg;
  }

  run(fileName: string) {
    console.log('running ' + this.arg + ' with ', {fileName});
    const csvFilePath = path.resolve(__dirname, fileName);
    console.log({csvFilePath});
    const fileContent = fs.readFileSync(csvFilePath, {
      encoding: 'utf-8'
    });

    console.log({fileContent});

    const opts: csvParse.Options = {
      delimiter: ',',
      columns: true,
      fromLine: 1,
    }

    var myParser:csvParse.Parser = csvParse.parse(fileContent, opts, function(err: csvParse.CsvError | undefined, records: any | undefined, info: csvParse.Info) {
      console.log("in csv-parse Callback:");
      console.log({err});
      console.log({records});
      console.log({info});
      for (const key in info.columns) {
        const column = info.columns[key];
        console.log(column.name);
      }
      for (const record of records) {
        console.log({record});
        for (const key in record) {
          console.log(key + ":" + record[key]);
        }
      }
    }) as csvParse.Parser;
  }
}

// HowTo:
// ------
// THIS is EASY TypeScript Setup in VSCode
// https://www.youtube.com/watch?v=4zdBk6wisxc
//
// Setup env:
//   brew install npm
//   brew install tsc
//   npm init
//   npm install csv
//   npm install @types/node --save-dev
//   npm install typescript --save-dev
//   npm install ts-node --save-dev
//   npm install tsconfig-paths --save-dev
//
//   tsc --init --sourceMap --rootDir src --outDir build
//   npx tsc csv-example.ts
//   npx ts-node csv-example.ts
//   npx js-node csv-example.js
//
// Run locally:
//   tsc csv-example.ts
//   npx csv-example.js
//   - or -
//   npx ts-node csv-example.ts
//
// Usefull commands:
//   npx ts-node --showConfig
//     Print resolved tsconfig.json, including ts-node options, and exit.
//   npx ts-node --transpileOnly csv-example.ts
//     Use TypeScript's faster transpileModule
//   npx ts-node --typeCheck csv-example.ts
//     Opposite to --transpileOnly
//
//   tsc --init --sourceMap --rootDir src --outDir build
//
//
//
