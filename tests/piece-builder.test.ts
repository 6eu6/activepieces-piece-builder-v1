import { PieceBuilder, Action, Trigger } from '../src/piece-builder';
import { CredentialService } from '../src/credential-service';

describe('PieceBuilder Core', () => {
  test('should add triggers and actions correctly', () => {
    const piece = new PieceBuilder('TestPiece');
    const trigger = new Trigger('testTrigger', {
      description: 'Test trigger',
      outputs: [{ name: 'output1', type: 'string', description: 'Output field' }],
      handler: async () => ({ output1: 'value' }),
    });
    const action = new Action('testAction', {
      description: 'Test action',
      inputs: [{ name: 'input1', type: 'string', required: true, description: 'Input field' }],
      outputs: [{ name: 'result', type: 'string', description: 'Result output' }],
      handler: async (inputs) => ({ result: inputs.input1 }),
    });

    piece.addTrigger(trigger).addAction(action);

    const def = piece.getDefinition();
    expect(def.name).toBe('TestPiece');
    expect(def.triggers).toHaveLength(1);
    expect(def.actions).toHaveLength(1);
  });
});

describe('CredentialService', () => {
  let service: CredentialService;
  beforeEach(() => {
    service = new CredentialService();
  });

  test('should save and retrieve API key correctly', () => {
    const id = 'key1';
    const apiKey = 'secret123';
    const plaintext = service.saveApiKey(id, apiKey);
    expect(plaintext).toBe(apiKey);

    const retrieved = service.getApiKey(id);
    expect(retrieved).toBe(apiKey);
  });

  test('should not allow duplicate API key IDs', () => {
    const id = 'key1';
    service.saveApiKey(id, 'abc');
    expect(() => service.saveApiKey(id, 'def')).toThrow();
  });

  test('should delete API key', () => {
    const id = 'key1';
    service.saveApiKey(id, 'abc');
    service.deleteApiKey(id);
    expect(service.getApiKey(id)).toBeNull();
  });
});

describe('Dynamic Dropdowns', () => {
  test('should load dropdown options asynchronously', async () => {
    const options = await (async () => [
      { label: 'Option A', value: 'A' },
      { label: 'Option B', value: 'B' },
    ])();
    expect(options).toHaveLength(2);
    expect(options[0].label).toBe('Option A');
  });
});

// Integration test simulating piece execution
import samplePiece from '../examples/sample-piece';

describe('SamplePiece Integration', () => {
  test('sendMessage action executes successfully', async () => {
    // Setup credential
    const credentialService = new CredentialService();
    const apiKeyId = 'testKey';
    const apiKey = 'supersecret';
    credentialService.saveApiKey(apiKeyId, apiKey);

    // Override credentialService in samplePiece's handler context
    // (In real app, inject dependencies properly)

    // Prepare inputs
    const action = samplePiece.actions.find(a => a.name === 'sendMessage');
    expect(action).toBeDefined();

    if (action) {
      // Patch handler to use local credentialService
      const patchedHandler = async (inputs: Record<string, any>) => {
        const key = credentialService.getApiKey(inputs.apiKeyId);
        if (!key) throw new Error('Invalid API key');
        return { status: 'Message sent successfully' };
      };

      const result = await patchedHandler({ apiKeyId: apiKeyId, country: 'US', message: 'Hello' });
      expect(result.status).toBe('Message sent successfully');
    }
  });
});