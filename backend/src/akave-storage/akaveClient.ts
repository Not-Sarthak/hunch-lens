const AkaveClient = require('./akaveClient');
const axios = require('axios');

interface TokenizedAsset {
    id: string;
    name: string;
}

async function storeTokenizedAssets() {
    const client = new AkaveClient();
    const BUCKET_NAME = 'tokenized-assets-bucket';
    
    try {
        await client.createBucket(BUCKET_NAME);
        
        const response = await axios.get('http://localhost:8000/api/tokenization/markets');
        const tokenizedAssets: TokenizedAsset[] = response.data;
        
        for (const asset of tokenizedAssets) {
            const fileName = `asset_${asset.id}.json`;
            const fileContent = JSON.stringify(asset, null, 2);
            
            await client.uploadFile(
                BUCKET_NAME,
                fileName,
                Buffer.from(fileContent)
            );
            
            console.log(`Uploaded ${fileName} to Akave`);
        }
        
        const files = await client.listFiles(BUCKET_NAME);
        console.log('Successfully stored assets. Files in bucket:', files);
        
        return {
            success: true,
            filesStored: files.length
        };
        
    } catch (error: any) {
        console.error('Error storing tokenized assets:', error.message);
        throw new Error(`Failed to store tokenized assets: ${error.message}`);
    }
}

async function main() {
    try {
        const result = await storeTokenizedAssets();
        console.log('Storage operation completed:', result);
    } catch (error: any) {
        console.error('Main error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

export { storeTokenizedAssets };