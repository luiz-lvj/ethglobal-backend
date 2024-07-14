import { Request, Response } from "express";
import { ISubmittableResult } from "@polkadot/types/types/extrinsic"
import { H256 } from "@polkadot/types/interfaces/runtime"
import {  submitDataToAvail } from "../utils/avail";


export async function submitData(req: Request, res: Response): Promise<Response> {
    try{

        const { data } = req.body;

        const txResult = await submitDataToAvail(data);

        if(txResult == null){
            return res.status(400).send({
                message: "Transaction failed"
            })
        }

        return res.status(200).send({
            message: "Transaction was executed successfully",
            txHash: txResult.txHash,
            blockHash: txResult.blockHash
        })

    } catch(err){
        console.error(err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}