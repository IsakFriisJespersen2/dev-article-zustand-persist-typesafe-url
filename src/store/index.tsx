'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type SpaceStore, createSpaceStore } from '@/store/space-store'

export type SpaceStoreApi = ReturnType<typeof createSpaceStore>

export const SpaceStoreContext = createContext<SpaceStoreApi | undefined>(
  undefined,
)

export interface SpaceStoreProviderProps {
  children: ReactNode
}

export const SpaceStoreProvider = ({
  children,
}: SpaceStoreProviderProps) => {
  const storeRef = useRef<SpaceStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createSpaceStore()
  }

  return (
    <SpaceStoreContext.Provider value={storeRef.current}>
      {children}
    </SpaceStoreContext.Provider>
  )
}

export const useSpaceStore = <T,>(
  selector: (store: SpaceStore) => T,
): T => {
  const spaceStoreContext = useContext(SpaceStoreContext)

  if (!spaceStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(spaceStoreContext, selector)
}
