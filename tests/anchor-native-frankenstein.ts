import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import ANCHOR_NATIVE_FRANKENSTEIN_IDL from "../idl/anchor_native_frankenstein.json";
import { AnchorNativeFrankenstein } from "../idl/anchor_native_frankenstein";
import { sendAndConfirmTransaction } from "@solana/web3.js";

describe("anchor-native-frankenstein", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = new Program(ANCHOR_NATIVE_FRANKENSTEIN_IDL as AnchorNativeFrankenstein, { connection: provider.connection });

  const payer = (provider.wallet as NodeWallet).payer;

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  before(async () => {
    // Program needs to be deployed manually
    const res = require('child_process').execSync(
      'anchor deploy'
    );
    console.log(res.toString());

    await delay(1000);
  });

  it("Test", async () => {
    const tx = await program.methods
      .test()
      .accountsPartial({
        sender: payer.publicKey,
        pda: payer.publicKey
      })
      .signers([payer])
      .transaction();

    // The transaction will succeed, which means that seeds check doesn't work
    const signature = await sendAndConfirmTransaction(provider.connection, tx, [payer]);
    console.log("Your transaction signature", signature);
  });
});
