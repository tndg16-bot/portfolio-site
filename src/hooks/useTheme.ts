'use client';

import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from '@/components/ThemeProvider';

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
