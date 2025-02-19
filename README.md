# Anchor-native frankenstein

## Usage

1. Comment `entry` function in `lib.rs`
2. Uncomment `#[program]` macro in `lib.rs`
3. Run `anchor build` to build IDL file
4. Undo steps 1 and 2
5. Run `cargo build-sbf`
6. Run `anchor test --skip-build`
