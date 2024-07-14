import { initializeAvail } from "./avail";
import { H256 } from "@polkadot/types/interfaces/runtime"


export async function getDataFromBlockHash(blockHash: string, txHash: H256): Promise<string | null> {

    const { api  } = await initializeAvail();

    const block = await api.rpc.chain.getBlock(blockHash);
    const tx = block.block.extrinsics.find((tx) => tx.hash.toHex() == txHash.toHex())
    if (tx == undefined) {
      console.log("Failed to find the Submit Data transaction")
      return null;
    }

    const dataHex = tx.method.args.map((a) => a.toString()).join(", ")
    let submittedData = "";
    for (let n = 0; n < dataHex.length; n += 2) {
      submittedData += String.fromCharCode(parseInt(dataHex.substring(n, n + 2), 16))
    }
    console.log(`submitted data: ${submittedData}`)

    return submittedData;

}