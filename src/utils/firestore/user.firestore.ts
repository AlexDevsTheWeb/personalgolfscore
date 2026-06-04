import { ThemeMode } from "@/types/user.types";
import { db } from '@/utils/firebase/firebase.utils';
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updateUserThemePreference = async (
  { playerId, theme }: { playerId: string, theme: ThemeMode }
): Promise<ThemeMode> => {

  if (!playerId) {
    console.warn("updateUserThemePreference: playerId is missing.");
    throw new Error("Player ID is required to update theme preference.");
  }
  const playerDocRef = doc(db, 'players', playerId);

  try {
    await updateDoc(playerDocRef, { themePreference: theme });
    return theme;
  } catch (error) {
    console.error("Error updating theme preference in Firestore: ", error);
    throw error;
  }
};

export const fetchThemePreference = async (
  playerId: string
): Promise<ThemeMode> => {
  if (!playerId) {
    console.warn("fetchThemePreference: playerId is missing.");
    throw new Error("Player ID is required to fetch theme preference.");
  }
  const playerDocRef = doc(db, 'players', playerId);
  try {
    const docSnap = await getDoc(playerDocRef);
    return docSnap.exists() && docSnap.data()?.themePreference ? docSnap.data()?.themePreference as ThemeMode : 'light';

  } catch (error) {
    console.error("Error fetching theme preference from Firestore: ", error);
    throw error;
  }
};
