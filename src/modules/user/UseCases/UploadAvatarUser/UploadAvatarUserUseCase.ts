import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequestUploadAvatarUser {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UploadAvatarUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    user_id,
    avatar_file,
  }: IRequestUploadAvatarUser): Promise<void> {
    const user = await this.userRepository.findUserById(user_id);

    if (user.avatar) {
      await deleteFile(`./temp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UploadAvatarUserUseCase };
