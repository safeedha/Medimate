import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.STREAM_API_KEY||'bcdq3t54483u';
const apiSecret = process.env.STREAM_API_SECRET||'wymay9qfwjpu2aujfxtwaebvfa27tax6tt44fk9n9k62scnk2ztrmwruenjyexes';

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
  process.exit(1); 
}

export class StreamToken {
  private serverClient: StreamChat;

  constructor() {
    this.serverClient = StreamChat.getInstance(apiKey, apiSecret);
  }

  async gettoken(userId: string): Promise<string> {
    const token = this.serverClient.createToken(userId);
    return token;
  }
}
