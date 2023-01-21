import { isConstructorToken } from "tsyringe/dist/typings/providers/injection-token";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("User")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  // @Column()
  // userName: string;

  @Column()
  password: string;

  @Column()
  Email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  avatar: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
