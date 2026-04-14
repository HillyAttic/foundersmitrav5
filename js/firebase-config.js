// Firebase Configuration for FoundersMitra
// This file is ready for future use when Firebase features are needed

// Firebase configuration object
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "foundersmitra.firebaseapp.com",
  projectId: "foundersmitra",
  storageBucket: "foundersmitra.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional: for Google Analytics
};

// Uncomment when ready to use Firebase
/*
// Import Firebase modules (use CDN or npm package)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { app, auth, db };

// Example: Save contact form submission to Firestore
async function saveContactSubmission(formData) {
  try {
    const docRef = await addDoc(collection(db, 'contact_submissions'), {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date(),
      status: 'new',
      ipAddress: formData.ip || 'unknown'
    });
    console.log('Submission saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
}

// Example: Admin authentication
async function adminLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user has admin claim
    const idTokenResult = await user.getIdTokenResult();
    if (idTokenResult.claims.admin) {
      console.log('Admin logged in successfully');
      return user;
    } else {
      await signOut(auth);
      throw new Error('User is not an admin');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Example: Fetch all contact submissions (admin only)
async function getContactSubmissions() {
  try {
    const q = query(
      collection(db, 'contact_submissions'),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const submissions = [];

    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return submissions;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
}
*/

// Export configuration for reference
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { firebaseConfig };
}
