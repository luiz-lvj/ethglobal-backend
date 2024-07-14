import { Request, Response } from "express";
import User from "../entities/User";
import { AppDataSource } from "../data-source";
import TxHash from "../entities/TxHash";


export async function createUser(req: Request, res: Response): Promise<Response> {
    try{

        const { publicKey } = req.body;

        const user = new User();
        user.public_key = publicKey;

        await AppDataSource.manager.save(user);

        return res.status(201).send({
            message: "User created successfully"
        })


    } catch(err){
        console.error(err)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


export async function addTxHash(req: Request, res: Response): Promise<Response> {
    try{

        const { publicKey, blockHash, txHash,  url } = req.body;

        const user = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.public_key = :publicKey", { publicKey })
            .getOne();

        console.log("user", user)

        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        const txHashEntity = new TxHash();
        txHashEntity.block_hash = blockHash;
        txHashEntity.tx_hash = txHash;
        txHashEntity.url = url;
        txHashEntity.user = user;

        await AppDataSource.manager.save(txHashEntity);

        return res.status(201).send({
            message: "TxHash added successfully"
        })

    } catch(err){
        console.error(err)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


export async function getTxHashesByUser(req: Request, res: Response): Promise<Response> {
    try{

        const { publicKey } = req.params;

        const user = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.public_key = :publicKey", { publicKey })
            .getOne();
        
        console.log("user", user)
        
        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        const txHashes = await AppDataSource.getRepository(TxHash)
            .createQueryBuilder("tx_hash")
            .where("tx_hash.user = :user", { user: user.id })
            .getMany();
        

        return res.status(200).send({
            message: "TxHashes retrieved successfully",
            txHashes
        })

    } catch(err){
        console.error(err)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export async function getTxHashesByUserByUrl(req: Request, res: Response): Promise<Response> {
    try{

        const { url, publicKey } = req.params;

        const user = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.public_key = :publicKey", { publicKey })
            .getOne();
        
        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        const txHashes = await AppDataSource.getRepository(TxHash)
            .createQueryBuilder("tx_hash")
            .where("tx_hash.url = :url", { url })
            .andWhere("tx_hash.user = :user", { user: user.id })
            .getMany();
        

        return res.status(200).send({
            message: "TxHashes retrieved successfully",
            txHashes
        })

    } catch(err){
        console.error(err)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


export async function getCountTxHashByUser(req: Request, res: Response): Promise<Response> {
    try{

        const { publicKey } = req.params;

        const user = await AppDataSource.getRepository(User)
            .createQueryBuilder("user")
            .where("user.public_key = :publicKey", { publicKey })
            .getOne();
        
        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        const count = await AppDataSource.getRepository(TxHash)
            .createQueryBuilder("transaction")
            .where("transaction.user = :user", { user: user.id })
            .getCount();
        

        return res.status(200).send({
            message: "TxHashes count retrieved successfully",
            txCount: count
        })

    } catch(err){
        console.error(err)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}
