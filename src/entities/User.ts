import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import TxHash from "./TxHash";

@Entity({
    name: "users",
    schema: "public",
})
export default class User {
    @PrimaryGeneratedColumn()
    //@ts-ignore
    id: number;

    @Column()
    //@ts-ignore
    public_key: string;

    @OneToMany(() => TxHash, tx_hash => tx_hash.user)
    //@ts-ignore
    tx_hashes: TxHash[];

}