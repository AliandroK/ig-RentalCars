import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./category";

@Entity("Car")
class Car {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  brand: string;

  @Column()
  fine_amount: number;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
