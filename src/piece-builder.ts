// Core framework for defining automation pieces, triggers, actions, and dynamic dropdowns

export type DropdownOption = {
  label: string;
  value: string;
  description?: string;
};

export type DropdownLoader = () => Promise<DropdownOption[]>;

export interface InputField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'dropdown';
  required: boolean;
  description: string;
  dropdownLoader?: DropdownLoader;
}

export interface OutputField {
  name: string;
  type: 'string' | 'number' | 'boolean';
  description: string;
}

export type ActionHandler = (inputs: Record<string, any>) => Promise<Record<string, any>>;

export class Action {
  name: string;
  description: string;
  inputs: InputField[];
  outputs: OutputField[];
  handler: ActionHandler;

  constructor(name: string, config: {
    description: string;
    inputs: InputField[];
    outputs: OutputField[];
    handler: ActionHandler;
  }) {
    this.name = name;
    this.description = config.description;
    this.inputs = config.inputs;
    this.outputs = config.outputs;
    this.handler = config.handler;
  }
}

export type TriggerHandler = () => Promise<Record<string, any>>;

export class Trigger {
  name: string;
  description: string;
  outputs: OutputField[];
  handler: TriggerHandler;

  constructor(name: string, config: {
    description: string;
    outputs: OutputField[];
    handler: TriggerHandler;
  }) {
    this.name = name;
    this.description = config.description;
    this.outputs = config.outputs;
    this.handler = config.handler;
  }
}

export class PieceBuilder {
  name: string;
  triggers: Trigger[] = [];
  actions: Action[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addTrigger(trigger: Trigger): this {
    this.triggers.push(trigger);
    return this;
  }

  addAction(action: Action): this {
    this.actions.push(action);
    return this;
  }

  getDefinition() {
    return {
      name: this.name,
      triggers: this.triggers,
      actions: this.actions,
    };
  }
}