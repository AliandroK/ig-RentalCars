import csvParse from "csv-parser";
import fs from "fs";

class ImportCategoriesUseCase {
  // constructor() {}

  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoriesUseCase };
