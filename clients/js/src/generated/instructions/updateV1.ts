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
  Option,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  none,
  publicKey,
} from '@metaplex-foundation/umi-core';
import { findMetadataPda } from '../accounts';
import {
  AuthorizationData,
  AuthorizationDataArgs,
  CollectionDetailsToggle,
  CollectionDetailsToggleArgs,
  CollectionToggle,
  CollectionToggleArgs,
  Creator,
  CreatorArgs,
  RuleSetToggle,
  RuleSetToggleArgs,
  UsesToggle,
  UsesToggleArgs,
  collectionDetailsToggle,
  collectionToggle,
  getAuthorizationDataSerializer,
  getCollectionDetailsToggleSerializer,
  getCollectionToggleSerializer,
  getCreatorSerializer,
  getRuleSetToggleSerializer,
  getUsesToggleSerializer,
  ruleSetToggle,
  usesToggle,
} from '../types';

// Accounts.
export type UpdateV1InstructionAccounts = {
  /** Update authority or delegate */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey;
  /** Token account */
  token?: PublicKey;
  /** Mint account */
  mint: PublicKey;
  /** Metadata account */
  metadata?: PublicKey;
  /** Edition account */
  edition?: PublicKey;
  /** Payer */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey;
  /** System program */
  sysvarInstructions?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
};

// Arguments.
export type UpdateV1InstructionData = {
  discriminator: number;
  updateV1Discriminator: number;
  newUpdateAuthority: Option<PublicKey>;
  data: Option<{
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Array<Creator>>;
  }>;
  primarySaleHappened: Option<boolean>;
  isMutable: Option<boolean>;
  collection: CollectionToggle;
  collectionDetails: CollectionDetailsToggle;
  uses: UsesToggle;
  ruleSet: RuleSetToggle;
  authorizationData: Option<AuthorizationData>;
};

export type UpdateV1InstructionDataArgs = {
  newUpdateAuthority?: Option<PublicKey>;
  data?: Option<{
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Array<CreatorArgs>>;
  }>;
  primarySaleHappened?: Option<boolean>;
  isMutable?: Option<boolean>;
  collection?: CollectionToggleArgs;
  collectionDetails?: CollectionDetailsToggleArgs;
  uses?: UsesToggleArgs;
  ruleSet?: RuleSetToggleArgs;
  authorizationData?: Option<AuthorizationDataArgs>;
};

export function getUpdateV1InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UpdateV1InstructionDataArgs, UpdateV1InstructionData> {
  const s = context.serializer;
  return mapSerializer<
    UpdateV1InstructionDataArgs,
    UpdateV1InstructionData,
    UpdateV1InstructionData
  >(
    s.struct<UpdateV1InstructionData>(
      [
        ['discriminator', s.u8()],
        ['updateV1Discriminator', s.u8()],
        ['newUpdateAuthority', s.option(s.publicKey())],
        [
          'data',
          s.option(
            s.struct<any>(
              [
                ['name', s.string()],
                ['symbol', s.string()],
                ['uri', s.string()],
                ['sellerFeeBasisPoints', s.u16()],
                ['creators', s.option(s.array(getCreatorSerializer(context)))],
              ],
              { description: 'Data' }
            )
          ),
        ],
        ['primarySaleHappened', s.option(s.bool())],
        ['isMutable', s.option(s.bool())],
        ['collection', getCollectionToggleSerializer(context)],
        ['collectionDetails', getCollectionDetailsToggleSerializer(context)],
        ['uses', getUsesToggleSerializer(context)],
        ['ruleSet', getRuleSetToggleSerializer(context)],
        [
          'authorizationData',
          s.option(getAuthorizationDataSerializer(context)),
        ],
      ],
      { description: 'UpdateV1InstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 50,
        updateV1Discriminator: 0,
        newUpdateAuthority: value.newUpdateAuthority ?? none(),
        data: value.data ?? none(),
        primarySaleHappened: value.primarySaleHappened ?? none(),
        isMutable: value.isMutable ?? none(),
        collection: value.collection ?? collectionToggle('None'),
        collectionDetails:
          value.collectionDetails ?? collectionDetailsToggle('None'),
        uses: value.uses ?? usesToggle('None'),
        ruleSet: value.ruleSet ?? ruleSetToggle('None'),
        authorizationData: value.authorizationData ?? none(),
      } as UpdateV1InstructionData)
  ) as Serializer<UpdateV1InstructionDataArgs, UpdateV1InstructionData>;
}

// Instruction.
export function updateV1(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: UpdateV1InstructionAccounts & UpdateV1InstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const authorityAccount = input.authority ?? context.identity;
  const delegateRecordAccount = input.delegateRecord ?? {
    ...programId,
    isWritable: false,
  };
  const tokenAccount = input.token ?? { ...programId, isWritable: false };
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const editionAccount = input.edition ?? { ...programId, isWritable: false };
  const payerAccount = input.payer ?? context.payer;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const sysvarInstructionsAccount =
    input.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  const authorizationRulesProgramAccount = input.authorizationRulesProgram ?? {
    ...programId,
    isWritable: false,
  };
  const authorizationRulesAccount = input.authorizationRules ?? {
    ...programId,
    isWritable: false,
  };

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Delegate Record.
  keys.push({
    pubkey: delegateRecordAccount,
    isSigner: false,
    isWritable: isWritable(delegateRecordAccount, false),
  });

  // Token.
  keys.push({
    pubkey: tokenAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccount, false),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Edition.
  keys.push({
    pubkey: editionAccount,
    isSigner: false,
    isWritable: isWritable(editionAccount, true),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: sysvarInstructionsAccount,
    isSigner: false,
    isWritable: isWritable(sysvarInstructionsAccount, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: authorizationRulesProgramAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesProgramAccount, false),
  });

  // Authorization Rules.
  keys.push({
    pubkey: authorizationRulesAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesAccount, false),
  });

  // Data.
  const data = getUpdateV1InstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
