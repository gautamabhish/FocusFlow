//@ts-nocheck

import { AptosClient, AptosAccount, HexString, TxnBuilderTypes, BCS } from "aptos";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com"; // Change for mainnet
const client = new AptosClient(NODE_URL);

// Your contract's address
const MODULE_ADDRESS = "0xa2481571a3a1fae0b948fbb7d1a8ebdda078173a2dbcc47e391d14636383399a";

// Create a new todo list
export async function createTodoList(senderPrivateKey: string) {
    const sender = new AptosAccount(new HexString(senderPrivateKey).toUint8Array());

    const payload = {
        function: `${MODULE_ADDRESS}::advanced_todo_list::create_todo_list`,
        type_arguments: [],
        arguments: [],
    };

    const txnRequest = await client.generateTransaction(sender.address(), payload);
    const signedTxn = await client.signTransaction(sender, txnRequest);
    const transactionRes = await client.submitTransaction(signedTxn);
    return client.waitForTransaction(transactionRes.hash);
}

// Add a new todo
export async function createTodo(senderPrivateKey: string, todoListIdx: number, content: string) {
    const sender = new AptosAccount(new HexString(senderPrivateKey).toUint8Array());

    const payload = {
        function: `${MODULE_ADDRESS}::advanced_todo_list::create_todo`,
        type_arguments: [],
        arguments: [todoListIdx, content],
    };

    const txnRequest = await client.generateTransaction(sender.address(), payload);
    const signedTxn = await client.signTransaction(sender, txnRequest);
    const transactionRes = await client.submitTransaction(signedTxn);
    return client.waitForTransaction(transactionRes.hash);
}
