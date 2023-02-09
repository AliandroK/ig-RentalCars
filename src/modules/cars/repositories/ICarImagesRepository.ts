interface ICarImagesRepository {
  create(car_id: string, imageName: string): Promise<void>;
}

export { ICarImagesRepository };
