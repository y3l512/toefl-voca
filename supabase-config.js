/* ==========================================================================
   Supabase Database Integration & Sync Module
   Enables Zero-Config Automatic Connection on URL Access (PC & Mobile)
   ========================================================================== */

// Top-level preset credentials (Default auto-connect for all devices including mobile & PC)
const DEFAULT_SUPABASE_URL = 'https://obxqlyportkrnbsoypvt.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_CvSEuWy1MOiuA0O0s6ei3g_8EB1hxwf';

const SUPABASE_STORAGE_KEY_URL = 'voca_app_supabase_url';
const SUPABASE_STORAGE_KEY_ANON = 'voca_app_supabase_anon';

// Default Supabase Client Instance
let supabaseClient = null;

/**
 * Automatically connects to Supabase database upon opening the URL.
 * Order of priority:
 * 1. User manual override saved in localStorage
 * 2. Server/Vercel environment variables via GET /api/config
 * 3. Default preset constants (window.SUPABASE_URL / DEFAULT_SUPABASE_URL)
 */
async function autoConnectSupabase() {
  let url = localStorage.getItem(SUPABASE_STORAGE_KEY_URL) || '';
  let key = localStorage.getItem(SUPABASE_STORAGE_KEY_ANON) || '';

  // Step 2: Try fetching server environment variables via /api/config
  if (!url || !key) {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        if (data.url && data.key) {
          url = data.url.trim();
          key = data.key.trim();
          console.log('[Supabase Auto-Connect] Retrieved credentials from /api/config!');
        }
      }
    } catch (err) {
      console.log('[Supabase Auto-Connect] Server config fetch skipped:', err.message);
    }
  }

  // Step 3: Fallback to global preset constants
  if (!url || !key) {
    url = window.SUPABASE_URL || DEFAULT_SUPABASE_URL || '';
    key = window.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY || '';
  }

  if (url && key && window.supabase) {
    try {
      // Normalize URL (strip trailing /rest/v1 if present)
      const cleanUrl = url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
      supabaseClient = window.supabase.createClient(cleanUrl, key);
      window.CURRENT_SUPABASE_URL = cleanUrl;
      window.CURRENT_SUPABASE_KEY = key;
      console.log('[Supabase] Successfully auto-connected to Supabase Cloud DB!');
      return true;
    } catch (e) {
      console.warn('[Supabase] Connection failed:', e);
      supabaseClient = null;
    }
  }

  console.log('[Supabase] Running in local offline mode (No DB credentials configured).');
  return false;
}

function getSupabaseCredentials() {
  const url = localStorage.getItem(SUPABASE_STORAGE_KEY_URL) || window.CURRENT_SUPABASE_URL || window.SUPABASE_URL || DEFAULT_SUPABASE_URL || '';
  const key = localStorage.getItem(SUPABASE_STORAGE_KEY_ANON) || window.CURRENT_SUPABASE_KEY || window.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY || '';
  return { url, key };
}

function initSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (url && key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      return true;
    } catch (e) {
      supabaseClient = null;
    }
  }
  return false;
}

// Cloud Database Functions
async function cloudFetchFavorites() {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient.from('favorites').select('word_id');
    if (error) throw error;
    // Filter out known: prefixed entries
    const favIds = data
      .map(item => item.word_id)
      .filter(id => !id.startsWith('known:'));
    return new Set(favIds);
  } catch (err) {
    console.warn('[Supabase Fetch Favorites Error]', err);
    return null;
  }
}

async function cloudToggleFavorite(wordId, isFavorite) {
  if (!supabaseClient) return false;
  try {
    if (isFavorite) {
      const { error } = await supabaseClient.from('favorites').upsert({ word_id: wordId, updated_at: new Date().toISOString() });
      if (error) throw error;
    } else {
      const { error } = await supabaseClient.from('favorites').delete().eq('word_id', wordId);
      if (error) throw error;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Toggle Favorite Error]', err);
    return false;
  }
}

async function cloudFetchCustomWords() {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient.from('custom_words').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('[Supabase Fetch Custom Words Error]', err);
    return null;
  }
}

async function cloudAddCustomWord(wordObj) {
  if (!supabaseClient) return false;
  try {
    const { error } = await supabaseClient.from('custom_words').insert({
      id: wordObj.id,
      word: wordObj.word,
      meaning: wordObj.meaning,
      example_sentence: wordObj.exampleSentence,
      created_at: new Date().toISOString()
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('[Supabase Add Custom Word Error]', err);
    return false;
  }
}

// Cloud Known Words (Learned Cards) Functions with Dual Table & Fallback Support
async function cloudFetchKnownWords() {
  if (!supabaseClient) return null;
  const knownSet = new Set();

  // 1. Try dedicated known_words table
  try {
    const { data, error } = await supabaseClient.from('known_words').select('word_id');
    if (!error && data) {
      data.forEach(item => knownSet.add(item.word_id));
    }
  } catch (err) {}

  // 2. Try fallback known: prefixed items in favorites table
  try {
    const { data, error } = await supabaseClient.from('favorites').select('word_id');
    if (!error && data) {
      data.forEach(item => {
        if (item.word_id && item.word_id.startsWith('known:')) {
          knownSet.add(item.word_id.replace(/^known:/, ''));
        }
      });
    }
  } catch (err) {}

  return knownSet;
}

async function cloudToggleKnownWord(wordId, isKnown) {
  if (!supabaseClient) return false;
  const fallbackId = `known:${wordId}`;

  // 1. Dedicated known_words table
  try {
    if (isKnown) {
      await supabaseClient.from('known_words').upsert({ word_id: wordId, updated_at: new Date().toISOString() });
    } else {
      await supabaseClient.from('known_words').delete().eq('word_id', wordId);
    }
  } catch (err) {}

  // 2. Fallback in favorites table
  try {
    if (isKnown) {
      await supabaseClient.from('favorites').upsert({ word_id: fallbackId, updated_at: new Date().toISOString() });
    } else {
      await supabaseClient.from('favorites').delete().eq('word_id', fallbackId);
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Toggle Known Word Error]', err);
    return false;
  }
}

async function cloudPushAllKnownWords(knownSet) {
  if (!supabaseClient || !knownSet || knownSet.size === 0) return false;
  
  const dedicatedRows = Array.from(knownSet).map(id => ({
    word_id: id,
    updated_at: new Date().toISOString()
  }));

  const fallbackRows = Array.from(knownSet).map(id => ({
    word_id: `known:${id}`,
    updated_at: new Date().toISOString()
  }));

  try {
    await supabaseClient.from('known_words').upsert(dedicatedRows);
  } catch (err) {}

  try {
    await supabaseClient.from('favorites').upsert(fallbackRows);
    console.log(`[Supabase] Pushed ${knownSet.size} known words to cloud fallback.`);
    return true;
  } catch (err) {
    console.warn('[Supabase Push Known Words Error]', err);
    return false;
  }
}

async function cloudPushAllFavorites(favSet) {
  if (!supabaseClient || !favSet || favSet.size === 0) return false;
  try {
    const rows = Array.from(favSet).map(id => ({
      word_id: id,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabaseClient.from('favorites').upsert(rows);
    if (error) throw error;
    console.log(`[Supabase] Pushed ${rows.length} favorites to cloud.`);
    return true;
  } catch (err) {
    console.warn('[Supabase Push Favorites Error]', err);
    return false;
  }
}

async function cloudClearKnownWords() {
  if (!supabaseClient) return false;
  try {
    await supabaseClient.from('known_words').delete().neq('word_id', '');
  } catch (err) {}

  try {
    // Delete all known: prefixed entries from favorites table
    const { data } = await supabaseClient.from('favorites').select('word_id');
    if (data) {
      const knownIds = data.map(item => item.word_id).filter(id => id.startsWith('known:'));
      for (const id of knownIds) {
        await supabaseClient.from('favorites').delete().eq('word_id', id);
      }
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Clear Known Words Error]', err);
    return false;
  }
}

// Save manual configuration override if needed
function saveSupabaseConfig(url, anonKey) {
  localStorage.setItem(SUPABASE_STORAGE_KEY_URL, url.trim());
  localStorage.setItem(SUPABASE_STORAGE_KEY_ANON, anonKey.trim());
  return initSupabaseClient();
}

