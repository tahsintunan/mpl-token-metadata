/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  GetDataEnumKind,
  GetDataEnumKindContent,
  Option,
  Serializer,
  mapSerializer,
  none,
} from '@metaplex-foundation/umi-core';
import {
  AuthorizationData,
  AuthorizationDataArgs,
  getAuthorizationDataSerializer,
} from '.';

export type MintArgs = {
  __kind: 'V1';
  amount: bigint;
  authorizationData: Option<AuthorizationData>;
};

export type MintArgsArgs = {
  __kind: 'V1';
  amount: number | bigint;
  authorizationData?: Option<AuthorizationDataArgs>;
};

export function getMintArgsSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MintArgsArgs, MintArgs> {
  const s = context.serializer;
  return s.dataEnum<MintArgs>(
    [
      [
        'V1',
        mapSerializer<
          GetDataEnumKindContent<MintArgsArgs, 'V1'>,
          GetDataEnumKindContent<MintArgs, 'V1'>,
          GetDataEnumKindContent<MintArgs, 'V1'>
        >(
          s.struct<GetDataEnumKindContent<MintArgs, 'V1'>>(
            [
              ['amount', s.u64()],
              [
                'authorizationData',
                s.option(getAuthorizationDataSerializer(context)),
              ],
            ],
            { description: 'V1' }
          ),
          (value) =>
            ({
              ...value,
              authorizationData: value.authorizationData ?? none(),
            } as GetDataEnumKindContent<MintArgs, 'V1'>)
        ),
      ],
    ],
    { description: 'MintArgs' }
  ) as Serializer<MintArgsArgs, MintArgs>;
}

// Data Enum Helpers.
export function mintArgs(
  kind: 'V1',
  data: GetDataEnumKindContent<MintArgsArgs, 'V1'>
): GetDataEnumKind<MintArgsArgs, 'V1'>;
export function mintArgs<K extends MintArgsArgs['__kind']>(
  kind: K,
  data?: any
): Extract<MintArgsArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isMintArgs<K extends MintArgs['__kind']>(
  kind: K,
  value: MintArgs
): value is MintArgs & { __kind: K } {
  return value.__kind === kind;
}
