import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { logIOSNetworkError, isIOSSafari } from "../deviceDetection.utils";
import { db } from "./firebase.utils";

// Retry utility for network requests
const retryOperation = async (
  operation: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> => {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry for certain error codes
      if (error.code === 'auth/invalid-email' || 
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/invalid-credential') {
        throw error;
      }
      
      // Retry for network-related errors
      if (error.code === 'auth/network-request-failed' && attempt < maxRetries - 1) {
        console.warn(`Login attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
        continue;
      }
      
      if (attempt === maxRetries - 1) {
        throw error;
      }
    }
  }
  
  throw lastError;
};

export const login = async (auth: Auth, email: string, password: string) => {
  try {
    const result = await retryOperation(() => 
      signInWithEmailAndPassword(auth, email, password)
    );
    
    const user = result.user;

    const userDocRef = doc(db, 'players', user.uid);
    const docSnap = await retryOperation(() => getDoc(userDocRef));

    if (docSnap.exists()) {
      return docSnap;
    } else {
      return null;
    }

  } catch (error: any) {
    console.error("Login error:", error);
    
    // Enhanced logging for iOS Safari
    logIOSNetworkError(error, 'Firebase Login');
    
    if (error.code === 'auth/invalid-email') {
      console.error("Invalid email format.");
    } else if (error.code === 'auth/wrong-password') {
      console.error("Incorrect password.");
    } else if (error.code === 'auth/network-request-failed') {
      const message = isIOSSafari() 
        ? "Network connection failed. This might be due to iOS Safari restrictions. Please try refreshing the page or switching to another browser."
        : "Network connection failed. Please check your internet connection and try again.";
      console.error(message);
    } else {
      console.error("Unknown login error:", error);
    }
    throw error; // Re-throw to let the UI handle the error
  }
};
