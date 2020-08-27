import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './button.container';

export default {
  component: Button,
  title: 'Button',
};

export const normal = () => (
  <Button onChange={action('changed')}>Normal</Button>
);
