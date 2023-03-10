import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images_name = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const filenames = images_name.map((image) => image.filename);

    await uploadCarImagesUseCase.execute({ car_id, images_name: filenames });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
