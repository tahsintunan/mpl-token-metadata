/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@metaplex-foundation/umi-core';

// Accounts.
export type ConvertMasterEditionV1ToV2InstructionAccounts = {
  /** Master Record Edition V1 (pda of ['metadata', program id, master metadata mint id, 'edition']) */
  masterEdition: PublicKey;
  /** One time authorization mint */
  oneTimeAuth: PublicKey;
  /** Printing mint */
  printingMint: PublicKey;
};

// Arguments.
export type ConvertMasterEditionV1ToV2InstructionData = {
  discriminator: number;
};

export type ConvertMasterEditionV1ToV2InstructionDataArgs = {};

export function getConvertMasterEditionV1ToV2InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  ConvertMasterEditionV1ToV2InstructionDataArgs,
  ConvertMasterEditionV1ToV2InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    ConvertMasterEditionV1ToV2InstructionDataArgs,
    ConvertMasterEditionV1ToV2InstructionData,
    ConvertMasterEditionV1ToV2InstructionData
  >(
    s.struct<ConvertMasterEditionV1ToV2InstructionData>(
      [['discriminator', s.u8()]],
      { description: 'ConvertMasterEditionV1ToV2InstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 12,
      } as ConvertMasterEditionV1ToV2InstructionData)
  ) as Serializer<
    ConvertMasterEditionV1ToV2InstructionDataArgs,
    ConvertMasterEditionV1ToV2InstructionData
  >;
}

// Instruction.
export function convertMasterEditionV1ToV2(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: ConvertMasterEditionV1ToV2InstructionAccounts
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const masterEditionAccount = input.masterEdition;
  const oneTimeAuthAccount = input.oneTimeAuth;
  const printingMintAccount = input.printingMint;

  // Master Edition.
  keys.push({
    pubkey: masterEditionAccount,
    isSigner: false,
    isWritable: isWritable(masterEditionAccount, true),
  });

  // One Time Auth.
  keys.push({
    pubkey: oneTimeAuthAccount,
    isSigner: false,
    isWritable: isWritable(oneTimeAuthAccount, true),
  });

  // Printing Mint.
  keys.push({
    pubkey: printingMintAccount,
    isSigner: false,
    isWritable: isWritable(printingMintAccount, true),
  });

  // Data.
  const data = getConvertMasterEditionV1ToV2InstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
