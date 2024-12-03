import path from "path";
import { Coinbase } from "@coinbase/coinbase-sdk";

const configFilePath = path.resolve(process.cwd(), "src/coinbase/cdp_api_key.json");

export function initializeSDK(): void {
  try {
    Coinbase.configureFromJson({ filePath: configFilePath });
    console.log("Initialized Coinbase SDK with configuration file:", configFilePath);
  } catch (error) {
    console.error("Error initializing Coinbase SDK:", error);
    throw error;
  }
}
