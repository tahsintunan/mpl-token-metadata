/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@metaplex-foundation/umi-core';

export enum RevokeArgs {
  CollectionV1,
  SaleV1,
  TransferV1,
  UpdateV1,
  UtilityV1,
  StakingV1,
  StandardV1,
  LockedTransferV1,
  ProgrammableConfigV1,
  MigrationV1,
}

export type RevokeArgsArgs = RevokeArgs;

export function getRevokeArgsSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<RevokeArgsArgs, RevokeArgs> {
  const s = context.serializer;
  return s.enum<RevokeArgs>(RevokeArgs, {
    description: 'RevokeArgs',
  }) as Serializer<RevokeArgsArgs, RevokeArgs>;
}
