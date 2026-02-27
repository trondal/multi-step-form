import { createContext } from 'react';
import type { MultiStepFormContextProps } from '../types';

export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null);
