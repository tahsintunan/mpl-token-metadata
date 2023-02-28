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
import { Key, KeyArgs, getKeySerializer } from '../types';

export type MasterEdition = Account<MasterEditionAccountData>;

export type MasterEditionAccountData = {
  key: Key;
  supply: bigint;
  maxSupply: Option<bigint>;
};

export type MasterEditionAccountDataArgs = {
  supply: number | bigint;
  maxSupply: Option<number | bigint>;
};

export function getMasterEditionAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MasterEditionAccountDataArgs, MasterEditionAccountData> {
  const s = context.serializer;
  return mapSerializer<
    MasterEditionAccountDataArgs,
    MasterEditionAccountData,
    MasterEditionAccountData
  >(
    s.struct<MasterEditionAccountData>(
      [
        ['key', getKeySerializer(context)],
        ['supply', s.u64()],
        ['maxSupply', s.option(s.u64())],
      ],
      { description: 'MasterEdition' }
    ),
    (value) =>
      ({ ...value, key: Key.MasterEditionV2 } as MasterEditionAccountData)
  ) as Serializer<MasterEditionAccountDataArgs, MasterEditionAccountData>;
}

export function deserializeMasterEdition(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): MasterEdition {
  return deserializeAccount(
    rawAccount,
    getMasterEditionAccountDataSerializer(context)
  );
}

export async function fetchMasterEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<MasterEdition> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'MasterEdition');
  return deserializeMasterEdition(context, maybeAccount);
}

export async function safeFetchMasterEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<MasterEdition | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists
    ? deserializeMasterEdition(context, maybeAccount)
    : null;
}

export async function fetchAllMasterEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<MasterEdition[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'MasterEdition');
    return deserializeMasterEdition(context, maybeAccount);
  });
}

export async function safeFetchAllMasterEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<MasterEdition[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeMasterEdition(context, maybeAccount as RpcAccount)
    );
}

export function getMasterEditionGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.get('mplTokenMetadata').publicKey;
  return gpaBuilder(context, programId)
    .registerFields<{
      key: KeyArgs;
      supply: number | bigint;
      maxSupply: Option<number | bigint>;
    }>([
      ['key', getKeySerializer(context)],
      ['supply', s.u64()],
      ['maxSupply', s.option(s.u64())],
    ])
    .deserializeUsing<MasterEdition>((account) =>
      deserializeMasterEdition(context, account)
    )
    .whereField('key', Key.MasterEditionV2);
}

export function getMasterEditionSize(
  context: Pick<Context, 'serializer'>
): number | null {
  return getMasterEditionAccountDataSerializer(context).fixedSize;
}

export function findMasterEditionPda(
  context: Pick<Context, 'eddsa' | 'programs' | 'serializer'>,
  seeds: {
    /** The address of the mint account */
    mint: PublicKey;
  }
): Pda {
  const s = context.serializer;
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;
  return context.eddsa.findPda(programId, [
    s.string({ size: 'variable' }).serialize('metadata'),
    programId.bytes,
    s.publicKey().serialize(seeds.mint),
    s.string({ size: 'variable' }).serialize('edition'),
  ]);
}
