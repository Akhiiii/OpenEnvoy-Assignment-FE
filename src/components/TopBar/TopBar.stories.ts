import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: 'The name of the user to display in the greeting',
    },
  },
  args: {
    onSearch: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Evano',
  },
};

export const LongName: Story = {
  args: {
    userName: 'Christopher Alexander',
  },
};

export const ShortName: Story = {
  args: {
    userName: 'Jo',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    userName: "O'Brien",
  },
};
