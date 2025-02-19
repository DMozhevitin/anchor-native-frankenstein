import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorNativeFrankenstein } from "../target/types/anchor_native_frankenstein";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

describe("anchor-native-frankenstein", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorNativeFrankenstein as Program<AnchorNativeFrankenstein>;
  const payer = (provider.wallet as NodeWallet).payer;

  it("Test", async () => {
    // Add your test here.
    const tx = await program.methods
      .test()
      .accounts({
        sender: payer.publicKey
      })
      .signers([payer])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
