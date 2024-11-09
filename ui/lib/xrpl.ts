import {Client, NFTokenMint, convertStringToHex,TransactionMetadata} from 'xrpl';

export const mintNFT = async (wallet: any, metadataUri: string) => {
    const xrplClient = new Client("wss://s.altnet.rippletest.net:51233");
    await xrplClient.connect();

  const transactionBlob:NFTokenMint = {
    TransactionType: "NFTokenMint",
    Account: wallet.address as any,
    URI: convertStringToHex(String(metadataUri)),
    Flags: 8, // this makes the nft transferable to others
    TransferFee: 10,
    Fee: "10",
    NFTokenTaxon: 0,
  };

    
  const cstPreparedOffer = await xrplClient.autofill(transactionBlob);
  const tsSignedOffer = wallet.sign(cstPreparedOffer);
  const tsResultOffer = await xrplClient.submitAndWait(tsSignedOffer.tx_blob);
  const meta = tsResultOffer.result.meta as TransactionMetadata;

  if (meta?.TransactionResult === "tesSUCCESS"){
    if (meta && typeof meta === "object" && "nftoken_id" in meta && typeof meta.nftoken_id === "string"){
        return meta.nftoken_id
    }
}

  
xrplClient.disconnect();
  return meta;
};


