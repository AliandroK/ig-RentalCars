import csvParse from "csv-parser";
import fs from "fs";

import { ICategoriesRepositiry } from "../../repositories/ICategoriesRepository";

interface ICategoryData {
  name: string;
  description: string;
}

class ImportCategoriesUseCase {
  constructor(private categoryRepositories: ICategoriesRepositiry) {}

  loadFile(file: Express.Multer.File): Promise<ICategoryData[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: ICategoryData[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          categories.push(line);
        })
        .on("end", () => {
          fs.promises.unlink(file.path); // delete the file
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadFile(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryExists = this.categoryRepositories.findbyname(name);

      if (!categoryExists) {
        this.categoryRepositories.create({ name, description });
      }
    });
  }
}

export { ImportCategoriesUseCase };
