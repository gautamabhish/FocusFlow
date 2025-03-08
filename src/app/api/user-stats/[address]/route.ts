//@ts-nocheck
import { AptosClient } from "@aptos-labs/ts-sdk";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1");

export async function GET(req, { params }) {
  const { address } = params;
  try {
    const response = await client.getAccountResource(
      address,
      "0xYourContract::YourModule::UserStats"
    );
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
