/**
 * Unit Tests: Button Component
 * 
 * Tests for the Button UI component.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

describe('Button Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Button>
        <Text>Click Me</Text>
      </Button>
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should handle onPress events', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>
        <Text>Press Me</Text>
      </Button>
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPressMock}>
        <Text>Disabled Button</Text>
      </Button>
    );
    
    const button = getByText('Disabled Button').parent;
    expect(button?.props.accessibilityState?.disabled).toBe(true);
    
    fireEvent.press(getByText('Disabled Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should render default variant', () => {
    const { getByText } = render(
      <Button>
        <Text>Default Button</Text>
      </Button>
    );
    expect(getByText('Default Button')).toBeTruthy();
  });

  it('should render outline variant', () => {
    const { getByText } = render(
      <Button variant="outline">
        <Text>Outline Button</Text>
      </Button>
    );
    expect(getByText('Outline Button')).toBeTruthy();
  });

  it('should render ghost variant', () => {
    const { getByText } = render(
      <Button variant="ghost">
        <Text>Ghost Button</Text>
      </Button>
    );
    expect(getByText('Ghost Button')).toBeTruthy();
  });

  it('should render different sizes', () => {
    const { getByText: getByTextDefault } = render(
      <Button size="default">
        <Text>Default Size</Text>
      </Button>
    );
    expect(getByTextDefault('Default Size')).toBeTruthy();

    const { getByText: getByTextSmall } = render(
      <Button size="sm">
        <Text>Small Size</Text>
      </Button>
    );
    expect(getByTextSmall('Small Size')).toBeTruthy();

    const { getByText: getByTextLarge } = render(
      <Button size="lg">
        <Text>Large Size</Text>
      </Button>
    );
    expect(getByTextLarge('Large Size')).toBeTruthy();
  });

  it('should accept custom className', () => {
    const { getByText } = render(
      <Button className="custom-class">
        <Text>Custom Button</Text>
      </Button>
    );
    expect(getByText('Custom Button')).toBeTruthy();
  });

  it('should handle multiple presses', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>
        <Text>Multi Press</Text>
      </Button>
    );
    
    fireEvent.press(getByText('Multi Press'));
    fireEvent.press(getByText('Multi Press'));
    fireEvent.press(getByText('Multi Press'));
    
    expect(onPressMock).toHaveBeenCalledTimes(3);
  });
});
