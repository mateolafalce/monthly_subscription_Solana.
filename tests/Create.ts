import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { MonthlySubscriptionSolana } from "../target/types/monthly_subscription_solana";
import { PublicKey } from '@solana/web3.js';
const { SystemProgram } = anchor.web3;

describe("Creating PDA", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const wallet = provider.wallet as anchor.Wallet;
    const program = anchor.workspace.MonthlySubscriptionSolana as Program<MonthlySubscriptionSolana>;
    it("Created", async () => {
      const [enterpriseData, _bump] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("Enterprise"),
          wallet.publicKey.toBuffer(),
        ],
        program.programId
      )
      const tx = await program.methods.create(
        new anchor.BN(78942), 
        "Waltdum"
        ).accounts({
          enterpriseData: enterpriseData,
          user: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        }).rpc();
      console.log("---------------------------------------------")
      console.log("PDA: ", enterpriseData.toBase58());
      console.log("---------------------------------------------") 
      console.log("Your transaction signature", tx);
    });
})