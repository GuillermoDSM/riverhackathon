import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mintNFT } from '@/lib/xrpl';
import { uploadImageAndMetadataToIPFS } from '@/lib/ipfs';
import { initializeWeb3Auth } from '@/lib/web3auth';

interface MintProps {
  challengeId: number;
  wallet: any;
  metadata: Record<string, any>;
}

const MintAchievement = ({ challengeId, wallet, metadata }: MintProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [nftTokenId, setNftTokenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    // Generate a preview URL for the selected image file
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleMintNFT = async () => {
    if (!selectedFile) {
      setError("Please select an image file before minting.");
      return;
    }

    try {
      setIsMinting(true);
      setError(null);

      // Upload image and metadata to IPFS
      const { metadataIpfsHash } = await uploadImageAndMetadataToIPFS(selectedFile, {
        ...metadata,
        challengeId, // Add challenge ID to metadata
      });

      const wallet = await initializeWeb3Auth();
      console.log("wallet.address", wallet);

      const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`;
      console.log("metadataIpfsHash", metadataIpfsHash);

      // Mint NFT with IPFS metadata URI
      const tokenId = await mintNFT("rQEWwQALcEjkUFuxKH9VzsK4CFkCRBw9Bk", metadataUri);

      if (tokenId) {
        setNftTokenId(tokenId.toString());
        console.log('Minted NFT Token ID:', tokenId);
      } else {
        throw new Error("NFT minting failed.");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      setError("Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div>
      <label className="file-input-label">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        Choose Image
      </label>

      {previewUrl && (
        <div className="mb-4">
          <img
            src={previewUrl}
            alt="Selected preview"
            className="max-w-xs rounded-lg shadow-lg"
          />
        </div>
      )}

      <Button onClick={handleMintNFT} disabled={isMinting || !selectedFile}>
        {isMinting ? 'Minting...' : 'Mint Achievement NFT'}
      </Button>

      {nftTokenId && <p>Minted NFT Token ID: {nftTokenId}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MintAchievement;
