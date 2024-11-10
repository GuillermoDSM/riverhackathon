export const uploadToIPFS = async (dataJson: any): Promise<string> => {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const headers = {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    };

    const blob = new Blob([dataJson], { type: "text/plain" });
    const data = new FormData();
    data.append("file", blob);

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: data,
    });

    const json = await response.json();

    return json.IpfsHash;
}

export const uploadImageAndMetadataToIPFS = async (
    imageFile: File,
    metadata: any
): Promise<{  metadataIpfsHash: string }> => {
    const url = "https://uploads.pinata.cloud/v3/files";
    const headers = {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    };


    //metadata with IPFS image URL
    const metadataWithImage = {
        ...metadata,
        image: `https://gateway.pinata.cloud/ipfs/QmQ7zFf27JvWNzbNNR3oMfrdqYKgxyxb5XnRjJcmHLiqg3/`,
    };

    // Upload metadata JSON to IPFS
    const metadataBlob = new Blob([JSON.stringify(metadataWithImage)], { type: "application/json" });
    const metadataData = new FormData();
    metadataData.append("file", metadataBlob, "metadata.json");

    const metadataResponse = await fetch(url, {
        method: "POST",
        headers,
        body: metadataData,
    });

    const metadataJson = await metadataResponse.json();
    const metadataIpfsHash = metadataJson.IpfsHash;

    return { metadataIpfsHash };
};
