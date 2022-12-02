import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Nemesis } from "./Nemesis"

@Entity()
export class Character {
    @PrimaryColumn()
    id: number 

    @Column()
    name: string

    @Column()
    gender: string

    @Column()
    ability: string

    @Column({name: 'minimal_distance'})
    minimalDistance: number

    @Column()
    weight: number

    @Column()
    born: Date

    @Column({name: 'in_space_since'})
    inSpaceSince: Date

    @Column({name: 'beer_consumption'})
    beerConsumption: number

    @Column({name: 'knows_the_answer'})
    knowsTheAnswer: boolean

    @OneToMany(() => Nemesis, (nemesis) => nemesis.character)
    nemeses: Nemesis[]
}
