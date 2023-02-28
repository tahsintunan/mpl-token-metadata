/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Option,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  mapSerializer,
} from '@metaplex-foundation/umi-core';
import {
  Key,
  KeyArgs,
  TokenDelegateRole,
  TokenDelegateRoleArgs,
  TokenState,
  TokenStateArgs,
  getKeySerializer,
  getTokenDelegateRoleSerializer,
  getTokenStateSerializer,
} from '../types';

export type TokenRecord = Account<TokenRecordAccountData>;

export type TokenRecordAccountData = {
  key: Key;
  bump: number;
  state: TokenState;
  ruleSetRevision: Option<bigint>;
  delegate: Option<PublicKey>;
  delegateRole: Option<TokenDelegateRole>;
  lockedTransfer: Option<PublicKey>;
};

export type TokenRecordAccountDataArgs = {
  bump: number;
  state: TokenStateArgs;
  ruleSetRevision: Option<number | bigint>;
  delegate: Option<PublicKey>;
  delegateRole: Option<TokenDelegateRoleArgs>;
  lockedTransfer: Option<PublicKey>;
};

export function getTokenRecordAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<TokenRecordAccountDataArgs, TokenRecordAccountData> {
  const s = context.serializer;
  return mapSerializer<
    TokenRecordAccountDataArgs,
    TokenRecordAccountData,
    TokenRecordAccountData
  >(
    s.struct<TokenRecordAccountData>(
      [
        ['key', getKeySerializer(context)],
        ['bump', s.u8()],
        ['state', getTokenStateSerializer(context)],
        ['ruleSetRevision', s.option(s.u64())],
        ['delegate', s.option(s.publicKey())],
        ['delegateRole', s.option(getTokenDelegateRoleSerializer(context))],
        ['lockedTransfer', s.option(s.publicKey())],
      ],
      { description: 'TokenRecord' }
    ),
    (value) => ({ ...value, key: Key.TokenRecord } as TokenRecordAccountData)
  ) as Serializer<TokenRecordAccountDataArgs, TokenRecordAccountData>;
}

export function deserializeTokenRecord(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): TokenRecord {
  return deserializeAccount(
    rawAccount,
    getTokenRecordAccountDataSerializer(context)
  );
}

export async function fetchTokenRecord(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<TokenRecord> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'TokenRecord');
  return deserializeTokenRecord(context, maybeAccount);
}

export async function safeFetchTokenRecord(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<TokenRecord | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists
    ? deserializeTokenRecord(context, maybeAccount)
    : null;
}

export async function fetchAllTokenRecord(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<TokenRecord[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'TokenRecord');
    return deserializeTokenRecord(context, maybeAccount);
  });
}

export async function safeFetchAllTokenRecord(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<TokenRecord[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeTokenRecord(context, maybeAccount as RpcAccount)
    );
}

export function getTokenRecordGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.get('mplTokenMetadata').publicKey;
  return gpaBuilder(context, programId)
    .registerFields<{
      key: KeyArgs;
      bump: number;
      state: TokenStateArgs;
      ruleSetRevision: Option<number | bigint>;
      delegate: Option<PublicKey>;
      delegateRole: Option<TokenDelegateRoleArgs>;
      lockedTransfer: Option<PublicKey>;
    }>([
      ['key', getKeySerializer(context)],
      ['bump', s.u8()],
      ['state', getTokenStateSerializer(context)],
      ['ruleSetRevision', s.option(s.u64())],
      ['delegate', s.option(s.publicKey())],
      ['delegateRole', s.option(getTokenDelegateRoleSerializer(context))],
      ['lockedTransfer', s.option(s.publicKey())],
    ])
    .deserializeUsing<TokenRecord>((account) =>
      deserializeTokenRecord(context, account)
    )
    .whereField('key', Key.TokenRecord);
}

export function getTokenRecordSize(
  context: Pick<Context, 'serializer'>
): number | null {
  return getTokenRecordAccountDataSerializer(context).fixedSize;
}

export function findTokenRecordPda(
  context: Pick<Context, 'eddsa' | 'programs' | 'serializer'>,
  seeds: {
    /** The address of the mint account */
    mint: PublicKey;
    /** The address of the token account (ata or not) */
    token: PublicKey;
  }
): Pda {
  const s = context.serializer;
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;
  return context.eddsa.findPda(programId, [
    s.string({ size: 'variable' }).serialize('metadata'),
    programId.bytes,
    s.publicKey().serialize(seeds.mint),
    s.string({ size: 'variable' }).serialize('token_record'),
    s.publicKey().serialize(seeds.token),
  ]);
}
