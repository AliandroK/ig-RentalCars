import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadAvatarUserUseCase } from "./UploadAvatarUserUseCase";

class UploadAvatarUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;
    const uploadAvatarUseCase = container.resolve(UploadAvatarUserUseCase);

    await uploadAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UploadAvatarUserController };
