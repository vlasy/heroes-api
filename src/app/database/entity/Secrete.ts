import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { Nemesis } from "./Nemesis"

@Entity()
export class Secrete {
    @PrimaryColumn()
    id: number

    @Column({name: 'secrete_code'})
    secreteCode: string

    @ManyToOne(() => Nemesis, (nemesis) => nemesis.secretes)
    nemesis: Nemesis
}
