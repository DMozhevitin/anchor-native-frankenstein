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

  it("Test", async () => {
    // Add your test here.
    const tx = await program.methods
      .test()
      .accounts({
        sender: payer.publicKey
      })
      .signers([payer])
      .transaction();

    const signature = await sendAndConfirmTransaction(provider.connection, tx, [payer]);
    console.log("Your transaction signature", signature);
  });
});
