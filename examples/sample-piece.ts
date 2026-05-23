import { PieceBuilder, Action, InputField, DropdownOption } from '../src/piece-builder';
import { CredentialService } from '../src/credential-service';

// Simulated credential service instance
const credentialService = new CredentialService();

// Define a dynamic dropdown loader for countries
const countriesDropdown = async (): Promise<DropdownOption[]> => {
  // In real use, fetch from API or config
  return [
    { label: 'United States', value: 'US', description: 'Country code US' },
    { label: 'Canada', value: 'CA', description: 'Country code CA' },
    { label: 'United Kingdom', value: 'UK', description: 'Country code UK' },
  ];
};

// Define inputs for the action
const sendMessageInputs: InputField[] = [
  {
    name: 'apiKeyId',
    type: 'string',
    required: true,
    description: 'ID of the stored API key to use for authentication',
  },
  {
    name: 'country',
    type: 'dropdown',
    required: true,
    description: 'Select the destination country',
    dropdownLoader: countriesDropdown,
  },
  {
    name: 'message',
    type: 'string',
    required: true,
    description: 'Message text to send',
  },
];

// Define outputs
const sendMessageOutputs = [
  { name: 'status', type: 'string', description: 'Result status' },
];

// Action handler simulating sending a message
const sendMessageHandler = async (inputs: Record<string, any>) => {
  const { apiKeyId, country, message } = inputs;
  const apiKey = credentialService.getApiKey(apiKeyId);
  if (!apiKey) {
    throw new Error('Invalid API key ID');
  }
  // Simulate sending message
  console.log(`Sending message to ${country}: ${message} using API key ${apiKey}`);
  // Return success status
  return { status: 'Message sent successfully' };
};

const samplePiece = new PieceBuilder('SampleMessagingPiece')
  .addAction(
    new Action('sendMessage', {
      description: 'Send a message to a selected country using stored API key',
      inputs: sendMessageInputs,
      outputs: sendMessageOutputs,
      handler: sendMessageHandler,
    })
  );

export default samplePiece;