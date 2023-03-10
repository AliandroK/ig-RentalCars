import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    } = request.body;

    console.log(license_plate);
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const newCar = await createCarUseCase.execute({
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    });

    return response.status(201).json(newCar);
  }
}

export { CreateCarController };
