/* eslint-disable @typescript-eslint/no-explicit-any */
// FirestoreContext.tsx
import { createContext} from 'react';

interface FirestoreDataContextType {
  collectionData: Record<string, any[]>; // Store data from all collections
}
interface FirestorePlayerDataContextType {
  documentData: Record<string, any>; // Store data from all collections
}

export const FirestoreAdminContext = createContext<FirestoreDataContextType | undefined>(undefined);

export const FirestoreplayerContext = createContext<FirestorePlayerDataContextType | undefined>(undefined);



