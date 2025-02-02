use std::cmp;

use mpl_utils::assert_signer;
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey};

use crate::{
    assertions::assert_owned_by,
    error::MetadataError,
    instruction::SetCollectionSizeArgs,
    processor::all_account_infos,
    state::{CollectionDetails, Metadata, TokenMetadataAccount},
    utils::{clean_write_metadata, BUBBLEGUM_ACTIVATED, BUBBLEGUM_SIGNER, SPL_TOKEN_ID},
};

pub fn bubblegum_set_collection_size(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    args: SetCollectionSizeArgs,
) -> ProgramResult {
    let size = args.size;

    all_account_infos!(
        accounts,
        parent_nft_metadata_account_info,
        collection_update_authority_account_info,
        collection_mint_account_info,
        bubblegum_signer_info
    );

    if !BUBBLEGUM_ACTIVATED {
        return Err(MetadataError::InvalidOperation.into());
    }

    // This instruction can only be called by the Bubblegum program.
    if *bubblegum_signer_info.key != BUBBLEGUM_SIGNER {
        return Err(MetadataError::InvalidBubblegumSigner.into());
    }
    assert_signer(bubblegum_signer_info)?;

    // Owned by token-metadata program.
    assert_owned_by(parent_nft_metadata_account_info, program_id)?;

    // Mint owned by spl token program.
    assert_owned_by(collection_mint_account_info, &SPL_TOKEN_ID)?;

    let mut metadata = Metadata::from_account_info(parent_nft_metadata_account_info)?;

    // Check that the update authority or delegate is a signer.
    // Collection authority is validated in the bubblegum program in the assert_has_collection_authority call.
    if !collection_update_authority_account_info.is_signer {
        return Err(MetadataError::UpdateAuthorityIsNotSigner.into());
    }

    // Ensure new size is + or - 1 of the current size.
    let current_size = if let Some(details) = metadata.collection_details {
        match details {
            #[allow(deprecated)]
            CollectionDetails::V1 { size } => size,
        }
    } else {
        return Err(MetadataError::NotACollectionParent.into());
    };

    let diff = cmp::max(current_size, size)
        .checked_sub(cmp::min(current_size, size))
        .ok_or(MetadataError::InvalidCollectionSizeChange)?;

    if diff != 1 {
        return Err(MetadataError::InvalidCollectionSizeChange.into());
    }

    // The Bubblegum program has authority to manage the collection details.
    metadata.collection_details = {
        #[allow(deprecated)]
        Some(CollectionDetails::V1 { size })
    };

    clean_write_metadata(&mut metadata, parent_nft_metadata_account_info)?;
    Ok(())
}
