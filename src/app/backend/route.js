import { NextResponse } from "next/server";
import { AptosClient, AptosAccount } from "aptos";
import axios from "axios";

const APTOS_NODE = "https://fullnode.testnet.aptoslabs.com"; // Testnet Node
const client = new AptosClient(APTOS_NODE);
const account = new AptosAccount(); // Temporary, replace with user’s wallet

console.log(`Aptos Account: ${account.address().hex()}`);

// Fetch Social Media Data (Mocked)
async function fetchSocialData() {
  return {
    instagram: { likes: 30, comments: 5, new_followers: 2 },
    youtube: { views: 100, likes: 20, shares: 3 },
    snapchat: { snaps_sent: 15, received: 10, streaks_updated: 5 },
  };
}

// Process User Data
function processUserData(socialData) {
  return {
    response: `You had ${socialData.instagram.likes} Instagram likes & ${socialData.youtube.views} YouTube views.`,
    emotion: socialData.youtube.likes > 10 ? "Happy" : "Neutral",
    next_action: socialData.snapchat.snaps_sent > 5 ? "Encourage focus" : "Suggest a break",
    reward_points: socialData.instagram.comments + socialData.youtube.shares * 10,
    relationship_update: `Gained ${socialData.instagram.new_followers} followers!`,
  };
}

// **POST: Update User Data on Aptos**
export async function POST(req) {
  try {
    const { user_id } = await req.json();
    const socialData = await fetchSocialData();
    const processedData = processUserData(socialData);

    // Aptos Blockchain Transaction (Replace with a real Move module)
    const payload = {
      type: "entry_function_payload",
      function: "0x1::aptos_coin::transfer", // Replace with your custom function
      arguments: [account.address().hex(), processedData.reward_points],
      type_arguments: [],
    };

    const txnRequest = await client.generateTransaction(account.address(), payload);
    const signedTxn = await client.signTransaction(account, txnRequest);
    const txnResponse = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(txnResponse.hash);

    return NextResponse.json({
      message: "Data updated on Aptos!",
      txn_hash: txnResponse.hash,
      user_id,
      ...processedData,
    });
  } catch (error) {
    return NextResponse.json({ error: "Transaction failed", details: error.message }, { status: 500 });
  }
}

// **GET: Retrieve Processed User Data**
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  const socialData = await fetchSocialData();
  const processedData = processUserData(socialData);

  return NextResponse.json({
    user_id,
    ...processedData,
  });
}
