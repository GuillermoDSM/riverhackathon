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
    console.log("uploadToIPFS response:", json);

    if (!json.IpfsHash) {
        throw new Error("Failed to retrieve IpfsHash from Pinata response");
    }

    return json.IpfsHash;
}

export const uploadImageAndMetadataToIPFS = async (
    imageFile: File,
    metadata: any
): Promise<{ imageIpfsHash: string; metadataIpfsHash: string }> => {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const headers = {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    };

    // Upload the image file to IPFS
    const imageData = new FormData();
    imageData.append("file", imageFile);

    const imageResponse = await fetch(url, {
        method: "POST",
        headers,
        body: imageData,
    });

    const imageJson = await imageResponse.json();
    console.log("Image upload response:", imageJson);

    const imageIpfsHash = imageJson.IpfsHash;
    if (!imageIpfsHash) {
        throw new Error("Failed to upload image or retrieve IpfsHash from Pinata");
    }

    // Update metadata with IPFS image URL
    const metadataWithImage = {
        ...metadata,
        image: `ipfs://${imageIpfsHash}`,
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
    console.log("Metadata upload response:", metadataJson);

    const metadataIpfsHash = metadataJson.IpfsHash;
    if (!metadataIpfsHash) {
        throw new Error("Failed to upload metadata or retrieve IpfsHash from Pinata");
    }

    return { imageIpfsHash, metadataIpfsHash };
};
