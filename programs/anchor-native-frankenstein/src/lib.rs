use anchor_lang::{prelude::*, solana_program::entrypoint::ProgramResult, Bumps};

declare_id!("3mVwbUjqR2haufMg9kWucfEZ2vMUCtu6D4dnT3ZGqA8h");

pub fn entry<'info>(
    program_id: &Pubkey,
    accounts: &'info [AccountInfo<'info>],
    data: &[u8],
) -> ProgramResult {
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
    
    let mut accounts = TestAccounts {
        sender: sender_signer
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
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TestAccounts<'info> {
    sender: Signer<'info>,
}
