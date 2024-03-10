'use client';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@store/store';
interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
  const [isInital, setIsInital] = useState<boolean>(false);

  useEffect(() => {
    setIsInital(true);
  }, []);

  if (isInital) return <Provider store={store}>{children}</Provider>;

  return null;
}
