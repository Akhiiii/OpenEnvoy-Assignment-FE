import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    value: {
      control: 'text',
      description: 'Controlled value of the input',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    debounceMs: 300,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search customers by name, email, or company...',
    debounceMs: 300,
  },
};

export const WithValue: Story = {
  args: {
    value: 'John Doe',
    placeholder: 'Search...',
    debounceMs: 300,
  },
};

export const FastDebounce: Story = {
  args: {
    placeholder: 'Fast search (100ms debounce)...',
    debounceMs: 100,
  },
};

export const SlowDebounce: Story = {
  args: {
    placeholder: 'Slow search (500ms debounce)...',
    debounceMs: 500,
  },
};
