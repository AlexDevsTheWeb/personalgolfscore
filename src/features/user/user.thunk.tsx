import { ThemeMode } from "@/types/user.types";
import { db } from '@/utils/firebase/firebase.utils';
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updateUserThemePreferenceThunk = async (
  { playerId, theme }: { playerId: string, theme: ThemeMode },
  thunkAPI: any
): Promise<ThemeMode> => {

  if (!playerId) {
    console.warn("updateUserThemePreferenceThunk: playerId is missing.");
    throw new Error("Player ID is required to update theme preference."); // Reject if no ID
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

export const fetchThemePreferenceThunk = async (
  playerId: string,
  thunkAPI: any
): Promise<ThemeMode> => {
  if (!playerId) {
    console.warn("fetchThemePreferenceThunk: playerId is missing.");
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
