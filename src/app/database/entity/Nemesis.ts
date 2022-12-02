import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { Character } from "./Character"
import { Secrete } from "./Secrete"

@Entity()
export class Nemesis {
    @PrimaryColumn()
    id: number

    @Column({name: 'is_alive'})
    isAlive: boolean

    @Column()
    years: number

    @ManyToOne(() => Character, (character) => character.nemeses)
    character: Character

    @OneToMany(() => Secrete, (secrete) => secrete.nemesis)
    secretes: Secrete[]
}
