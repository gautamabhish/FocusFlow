//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { AptosClient, AptosAccount, HexString } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
const MODULE_ADDRESS = "0xa2481571a3a1fae0b948fbb7d1a8ebdda078173a2dbcc47e391d14636383399a";

export async function POST(req: NextRequest) {
    try {
        const { privateKey, todoListIdx, streak, points, challengesPlayed, challengesWon, retentionIncreased, blockedWebsites, pastChallenges } = await req.json();

        const sender = new AptosAccount(new HexString(privateKey).toUint8Array());

        const payload = {
            function: `${MODULE_ADDRESS}::advanced_todo_list::update_progress`,
            type_arguments: [],
            arguments: [
                todoListIdx,
                streak,
                points,
                challengesPlayed,
                challengesWon,
                retentionIncreased,
                blockedWebsites,
                pastChallenges
            ],
        };

        const txnRequest = await client.generateTransaction(sender.address(), payload);
        const signedTxn = await client.signTransaction(sender, txnRequest);
        const txnHash = await client.submitTransaction(signedTxn);

        return NextResponse.json({ success: true, txnHash });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
