'use client';

import React from 'react';
import { useRef, ReactNode } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '@/components/common/Snackbar';

type Props = {
  children: ReactNode;
};

export default function SnackbarProvider({ children }: Props) {

  return (
    <NotistackProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </NotistackProvider>
  );
}
