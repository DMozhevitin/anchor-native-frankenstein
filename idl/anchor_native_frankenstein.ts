/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anchor_native_frankenstein.json`.
 */
export type AnchorNativeFrankenstein = {
  "address": "J5jVAGRCPGKbrBKdHpNXtVcH1hi7LfAYnJdnXzVLeVjX",
  "metadata": {
    "name": "anchorNativeFrankenstein",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "test",
      "discriminator": [
        163,
        36,
        134,
        53,
        232,
        223,
        146,
        222
      ],
      "accounts": [
        {
          "name": "sender",
          "signer": true
        }
      ],
      "args": []
    }
  ]
};
