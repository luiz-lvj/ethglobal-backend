import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany } from "typeorm";
import User from "./User";

@Entity({
    name: "tx_hashes",
    schema: "public",
})
@Unique("unique_tx_hash", ["tx_hash"])
export default class TxHash {
    @PrimaryGeneratedColumn()
    //@ts-ignore
    id: number;

    @Column({ nullable: false})
    //@ts-ignore
    block_hash: string;

    @Column({ nullable: false})
    //@ts-ignore
    tx_hash: string;

    @Column({ nullable: false})
    //@ts-ignore
    url: string;

    @ManyToOne(() => User, user => user.tx_hashes)
    //@ts-ignore
    user: User;

}