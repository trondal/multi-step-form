import { MultiStepFormContextProps } from '@/types';
import { createContext } from 'react';

export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null);
