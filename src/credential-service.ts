import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // AES block size

// WARNING: This example is for educational purposes only.
// In production, securely manage and inject your encryption key via environment variables or secure vaults.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex') : null;

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error('Invalid or missing ENCRYPTION_KEY environment variable. It must be a 32-byte hex string.');
}

export class CredentialService {
  private storage: Map<string, string> = new Map();

  // Encrypt and store API key, return a one-time plaintext exposure
  saveApiKey(id: string, apiKey: string): string {
    if (this.storage.has(id)) {
      throw new Error('API key with this ID already exists');
    }
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const encryptedPayload = iv.toString('hex') + ':' + encrypted;
    this.storage.set(id, encryptedPayload);
    // Return plaintext once
    return apiKey;
  }

  // Retrieve decrypted API key
  getApiKey(id: string): string | null {
    const encryptedPayload = this.storage.get(id);
    if (!encryptedPayload) {
      return null;
    }
    const [ivHex, encrypted] = encryptedPayload.split(':');
    if (!ivHex || !encrypted) {
      throw new Error('Invalid encrypted payload format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  // Delete stored API key
  deleteApiKey(id: string): void {
    this.storage.delete(id);
  }
}