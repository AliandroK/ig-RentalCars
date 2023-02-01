import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specificationsIds } = request.body;
    const { car_id } = request.params;

    const createCarsSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarsSpecificationUseCase.execute({
      car_id,
      specifications_id: specificationsIds,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarSpecificationController };
