/* ==========================================================================
   Firebase Firestore Database Integration & Realtime Sync Module
   Enables Zero-Config Automatic Connection on URL Access (PC & Mobile)
   No Sleep, No Pause, 100% Free Forever
   ========================================================================== */

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDluHeRPK5eTLg2DzFfAGZWwPmdrW4DVyI",
  authDomain: "toefl-5be18.firebaseapp.com",
  projectId: "toefl-5be18",
  storageBucket: "toefl-5be18.firebasestorage.app",
  messagingSenderId: "823632656330",
  appId: "1:823632656330:web:832517d1ac0b79d2d64133"
};

const FIREBASE_STORAGE_KEY_CONFIG = 'voca_app_firebase_config';
const SYNC_COLLECTION = 'voca_sync';
const SYNC_DOC_ID = 'main';

let firebaseApp = null;
let firestoreDb = null;
let realtimeUnsubscribe = null;

/**
 * Initializes and auto-connects to Firebase Firestore
 */
async function autoConnectFirebase() {
  try {
    let config = DEFAULT_FIREBASE_CONFIG;
    const customConfigStr = localStorage.getItem(FIREBASE_STORAGE_KEY_CONFIG);
    if (customConfigStr) {
      try {
        config = JSON.parse(customConfigStr);
      } catch (e) {
        console.warn('[Firebase] Custom config parse error, using default:', e);
      }
    }

    if (!window.firebase) {
      console.error('[Firebase] Firebase SDK not loaded in window.');
      return false;
    }

    if (!firebase.apps || firebase.apps.length === 0) {
      firebaseApp = firebase.initializeApp(config);
    } else {
      firebaseApp = firebase.app();
    }

    firestoreDb = firebase.firestore();

    // Health check ping: try fetching or ensuring sync document exists
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const snap = await docRef.get();
    if (!snap.exists) {
      // Initialize main document if first time
      await docRef.set({
        favorites: [],
        known_words: [],
        custom_words: [],
        initialized_at: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    console.log('[Firebase] Successfully connected to Firebase Cloud Firestore! 🔥');
    return true;
  } catch (err) {
    console.error('[Firebase] Connection failed:', err);
    firestoreDb = null;
    return false;
  }
}

// Backward compatibility alias for app.js
window.autoConnectSupabase = autoConnectFirebase;
window.initSupabaseClient = () => !!firestoreDb;

/**
 * Fetch favorite word IDs as a Set
 */
async function cloudFetchFavorites() {
  if (!firestoreDb) return null;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data();
      const favList = Array.isArray(data.favorites) ? data.favorites : [];
      return new Set(favList);
    }
    return new Set();
  } catch (err) {
    console.warn('[Firebase Fetch Favorites Error]', err);
    return null;
  }
}

/**
 * Toggle favorite word
 */
async function cloudToggleFavorite(wordId, isFavorite) {
  if (!firestoreDb || !wordId) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    if (isFavorite) {
      await docRef.set({
        favorites: firebase.firestore.FieldValue.arrayUnion(wordId),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } else {
      await docRef.set({
        favorites: firebase.firestore.FieldValue.arrayRemove(wordId),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
    return true;
  } catch (err) {
    console.warn('[Firebase Toggle Favorite Error]', err);
    return false;
  }
}

/**
 * Push all favorite word IDs at once
 */
async function cloudPushAllFavorites(favSet) {
  if (!firestoreDb) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const arr = favSet ? Array.from(favSet) : [];
    await docRef.set({
      favorites: arr,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log(`[Firebase] Pushed ${arr.length} favorites to cloud.`);
    return true;
  } catch (err) {
    console.warn('[Firebase Push Favorites Error]', err);
    return false;
  }
}

/**
 * Fetch known (memorized) word IDs as a Set
 */
async function cloudFetchKnownWords() {
  if (!firestoreDb) return null;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data();
      const knownList = Array.isArray(data.known_words) ? data.known_words : [];
      return new Set(knownList);
    }
    return new Set();
  } catch (err) {
    console.warn('[Firebase Fetch Known Words Error]', err);
    return null;
  }
}

/**
 * Toggle known (memorized) status for a word
 */
async function cloudToggleKnownWord(wordId, isKnown) {
  if (!firestoreDb || !wordId) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    if (isKnown) {
      await docRef.set({
        known_words: firebase.firestore.FieldValue.arrayUnion(wordId),
        favorites: firebase.firestore.FieldValue.arrayRemove(wordId),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } else {
      await docRef.set({
        known_words: firebase.firestore.FieldValue.arrayRemove(wordId),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
    return true;
  } catch (err) {
    console.warn('[Firebase Toggle Known Word Error]', err);
    return false;
  }
}

/**
 * Push all known word IDs at once
 */
async function cloudPushAllKnownWords(knownSet) {
  if (!firestoreDb) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const arr = knownSet ? Array.from(knownSet) : [];
    await docRef.set({
      known_words: arr,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log(`[Firebase] Pushed ${arr.length} known words to cloud.`);
    return true;
  } catch (err) {
    console.warn('[Firebase Push Known Words Error]', err);
    return false;
  }
}

/**
 * Clear all known words in cloud
 */
async function cloudClearKnownWords() {
  if (!firestoreDb) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    await docRef.set({
      known_words: [],
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase Clear Known Words Error]', err);
    return false;
  }
}

/**
 * Fetch custom user-added words
 */
async function cloudFetchCustomWords() {
  if (!firestoreDb) return null;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data();
      return Array.isArray(data.custom_words) ? data.custom_words : [];
    }
    return [];
  } catch (err) {
    console.warn('[Firebase Fetch Custom Words Error]', err);
    return null;
  }
}

/**
 * Add or update custom word
 */
async function cloudAddCustomWord(wordObj) {
  if (!firestoreDb || !wordObj) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    const snap = await docRef.get();
    let customWords = [];
    if (snap.exists && Array.isArray(snap.data().custom_words)) {
      customWords = snap.data().custom_words;
    }

    // Filter out if duplicate ID exists, then add new
    const filtered = customWords.filter(item => item.id !== wordObj.id);
    filtered.push({
      id: wordObj.id,
      word: wordObj.word,
      meaning: wordObj.meaning,
      example_sentence: wordObj.exampleSentence || wordObj.example_sentence || '',
      example_translation: wordObj.exampleTranslation || wordObj.example_translation || '',
      created_at: wordObj.created_at || new Date().toISOString()
    });

    await docRef.set({
      custom_words: filtered,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase Add Custom Word Error]', err);
    return false;
  }
}

/**
 * Push all custom words list
 */
async function cloudPushAllCustomWords(wordsArray) {
  if (!firestoreDb) return false;
  try {
    const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
    await docRef.set({
      custom_words: wordsArray || [],
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase Push Custom Words Error]', err);
    return false;
  }
}

/**
 * Realtime Listener: auto-syncs when data changes on another device
 */
function setupFirebaseRealtimeSync(onDataChange) {
  if (!firestoreDb || typeof onDataChange !== 'function') return;
  if (realtimeUnsubscribe) {
    realtimeUnsubscribe();
  }

  const docRef = firestoreDb.collection(SYNC_COLLECTION).doc(SYNC_DOC_ID);
  realtimeUnsubscribe = docRef.onSnapshot(snapshot => {
    if (snapshot.metadata && snapshot.metadata.hasPendingWrites) {
      return;
    }
    if (snapshot.exists) {
      const data = snapshot.data();
      onDataChange({
        favorites: new Set(Array.isArray(data.favorites) ? data.favorites : []),
        knownWords: new Set(Array.isArray(data.known_words) ? data.known_words : []),
        customWords: Array.isArray(data.custom_words) ? data.custom_words : []
      });
    }
  }, err => {
    console.warn('[Firebase Realtime Sync Error]', err);
  });
}

/**
 * Save manual config override
 */
function saveFirebaseConfig(configObj) {
  try {
    localStorage.setItem(FIREBASE_STORAGE_KEY_CONFIG, JSON.stringify(configObj));
    return autoConnectFirebase();
  } catch (e) {
    return false;
  }
}
