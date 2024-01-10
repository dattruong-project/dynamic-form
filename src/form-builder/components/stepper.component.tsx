import * as React from 'react';

export interface StepperProps {
  children?: React.ReactElement[] | null;
  currentSessionIndex: number;
}

export const Stepper = ({ children, currentSessionIndex }: StepperProps) => {
  const child = children?.[currentSessionIndex] || null;
  return <>{child}</>;
};