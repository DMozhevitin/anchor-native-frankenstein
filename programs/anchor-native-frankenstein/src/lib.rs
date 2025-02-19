use anchor_lang::{prelude::*, solana_program::entrypoint::ProgramResult, Bumps};

declare_id!("J5jVAGRCPGKbrBKdHpNXtVcH1hi7LfAYnJdnXzVLeVjX");

solana_program::entrypoint!(entry);

pub fn entry<'info>(
    program_id: &solana_program::pubkey::Pubkey,
    accounts: &'info [solana_program::account_info::AccountInfo<'info>],
    data: &[u8],
) -> ProgramResult {
    let program_id: &Pubkey = unsafe { std::mem::transmute(program_id) };
    let accounts: &'info [AccountInfo<'info>] = unsafe { std::mem::transmute(accounts) };

    process_instruction(program_id, accounts, data)
        .map_err(|e| {
            e.log();
            e.into()
        })
}

fn process_instruction<'info>(
    program_id: &Pubkey,
    accounts: &'info [AccountInfo<'info>],
    _instruction_data: &[u8],
) -> Result<()> {
    let account_info_iter = &mut accounts.iter();

    let sender = next_account_info(account_info_iter)?;
    let sender_signer = Signer::try_from(sender)?;

    let pda = next_account_info(account_info_iter)?;
    
    let mut accounts = TestAccounts {
        sender: sender_signer,
        // 'seeds' constraint won't be applied here
        pda: pda.clone()
    };

    let bumps = <TestAccounts as Bumps>::Bumps::default();

    let ctx: Context<TestAccounts> = Context {
        program_id,
        accounts: &mut accounts,
        remaining_accounts: &[],
        bumps
    };

    anchor_native_frankenstein::test(ctx).map_err(|e| e.into())
}

// #[program]
pub mod anchor_native_frankenstein {
    use super::*;

    pub fn test(ctx: Context<TestAccounts>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        msg!("Sender: {:?}", ctx.accounts.sender.key());
        msg!("PDA: {:?}", ctx.accounts.pda.key());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TestAccounts<'info> {
    sender: Signer<'info>,

    /// CHECK:
    #[account(seeds = ["seed".as_ref()], bump)]
    pda: AccountInfo<'info>,
}
