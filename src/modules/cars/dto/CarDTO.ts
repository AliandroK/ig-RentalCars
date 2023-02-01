import { Specification } from "../infra/typeorm/entities/specification";

interface ICarDTO {
  name: string;
  description: string;
  license_plate: string;
  brand: string;
  fine_amount: number;
  daily_rate: number;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICarDTO };
