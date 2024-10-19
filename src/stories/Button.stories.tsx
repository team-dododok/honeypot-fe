import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import Button from '@/components/Button/Button';
import { ButtonProps } from '@/types/common/ButtonProps';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);

export const Normal = Template.bind({});
Normal.args = {
  text: 'Normal Button',
  variant: 'normal',
};

export const Default = Template.bind({});
Default.args = {
  text: 'Default Button',
  variant: 'default',
};

export const Deactivate = Template.bind({});
Deactivate.args = {
  text: 'Deactivate Button',
  variant: 'deactivate',
  disabled: true,
};

export const Activate = Template.bind({});
Activate.args = {
  text: 'Activate Button',
  variant: 'activate',
};

export const Danger = Template.bind({});
Danger.args = {
  text: 'Danger Button',
  variant: 'danger',
};

export const Warning = Template.bind({});
Warning.args = {
  text: 'Warning Button',
  variant: 'warning',
};
