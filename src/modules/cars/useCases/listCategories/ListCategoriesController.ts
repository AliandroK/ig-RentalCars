import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  // constructor(private listCategoriesUserCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUserCase = container.resolve(ListCategoriesUseCase);
    console.log("teste");
    const allCategories = await listCategoriesUserCase.execute();
    return response.json(allCategories);
  }
}

export { ListCategoriesController };
