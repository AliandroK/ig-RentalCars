import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/InMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Tests Create Categoty Use Case", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("Should be able to create a new Category", async () => {
    await createCategoryUseCase.execute({
      name: "Test Category",
      description: "description test category",
    });

    const category = await categoryRepositoryInMemory.findbyname(
      "Test Category"
    );

    // expect(category.name).toBe("Test Category");
    expect(category).toHaveProperty("id");
  });

  it("Should not to be abre create a new Category with the same name", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Test Category",
        description: "description test category",
      });

      await createCategoryUseCase.execute({
        name: "Test Category",
        description: "description test category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
