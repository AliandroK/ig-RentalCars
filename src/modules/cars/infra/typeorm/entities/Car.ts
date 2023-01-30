import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./category";
import { Specification } from "./specification";

@Entity("Car")
class Car {
  @PrimaryColumn()
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

  // quando uma ligação de muito para muito faz sentido em somente uma tabela,
  // com typeorm, basta colocar o campo na entidade que é importante com as anotation conforme abaixo.

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "Car_Specification",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specification: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
