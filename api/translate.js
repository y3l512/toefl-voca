// Vercel Serverless Function: High-Accuracy POS-Aware Word Meaning & TOEFL Example Sentence Engine
const https = require('https');

const NON_VERB_ATE_WORDS = new Set([
  'accurate', 'adequate', 'affectionate', 'appropriate', 'articulate', 'candidate',
  'celibate', 'certificate', 'chocolate', 'climate', 'collegiate', 'compassionate',
  'conglomerate', 'considerate', 'consulate', 'corporate', 'deliberate', 'delicate',
  'desolate', 'desperate', 'disparate', 'doctorate', 'elaborate', 'electorate',
  'emirate', 'estate', 'fortunate', 'frigate', 'graduate', 'illiterate', 'immaculate',
  'immediate', 'inaccurate', 'inadequate', 'inappropriate', 'inanimate', 'incarnate',
  'inconsiderate', 'indeterminate', 'indiscriminate', 'inordinate', 'intemperate',
  'intermediate', 'intimate', 'intricate', 'invertebrate', 'inveterate', 'irate',
  'laureate', 'legitimate', 'literate', 'magistrate', 'mandate', 'moderate',
  'obstinate', 'ornate', 'palate', 'passionate', 'phosphate', 'pirate', 'plate',
  'postgraduate', 'potentate', 'predicate', 'prelate', 'primate', 'private',
  'prostate', 'protectorate', 'proximate', 'rate', 'reprobate', 'sedate', 'senate',
  'separate', 'slate', 'state', 'subordinate', 'substrate', 'sulfate', 'surrogate',
  'syndicate', 'temperate', 'template', 'triumvirate', 'ultimate', 'undergraduate',
  'unfortunate', 'vertebrate'
]);

function fetchJson(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 4) {
      reject(new Error('Too many redirects'));
      return;
    }
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, url).toString();
        res.resume();
        resolve(fetchJson(nextUrl, redirectCount + 1));
        return;
      }
      let raw = '';
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

function isKoreanText(str) {
  return /[가-힣]/.test(str || '');
}

function stripHtml(str) {
  return String(str || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function normalizePosTag(pos) {
  const p = String(pos || '').toLowerCase().trim();
  if (p === 'v' || p === 'verb' || p.startsWith('verb')) return 'verb';
  if (p === 'n' || p === 'noun' || p.startsWith('noun')) return 'noun';
  if (p === 'adj' || p === 'adjective' || p.startsWith('adj')) return 'adjective';
  if (p === 'adv' || p === 'adverb' || p.startsWith('adv')) return 'adverb';
  return p;
}

function inferPrimaryPOS(word, dictPosList = [], dmPos = '') {
  const clean = String(word || '').toLowerCase().trim();
  const normalizedList = dictPosList.map(normalizePosTag).filter(Boolean);
  const normalizedDm = normalizePosTag(dmPos);

  // If dictionary only lists one POS (e.g. 'manipulate' -> ['verb']), use it directly
  const uniquePos = Array.from(new Set(normalizedList));
  if (uniquePos.length === 1) {
    return uniquePos[0];
  }

  const hasVerb = uniquePos.includes('verb') || normalizedDm === 'verb';
  const hasAdj = uniquePos.includes('adjective') || normalizedDm === 'adjective';
  const hasAdv = uniquePos.includes('adverb') || normalizedDm === 'adverb';
  const hasNoun = uniquePos.includes('noun') || normalizedDm === 'noun';

  // Morphological suffix rules for academic English words
  if (!clean.includes(' ')) {
    if (/(ify|ize|ise)$/i.test(clean) && hasVerb) return 'verb';
    if (/ate$/i.test(clean) && clean.length > 5 && !NON_VERB_ATE_WORDS.has(clean) && (hasVerb || uniquePos.length === 0)) {
      return 'verb';
    }
    if (/(tion|sion|ity|ness|ance|ence|ism|ship|hood|logy|graphy|cracy)$/i.test(clean) && (hasNoun || uniquePos.length === 0)) {
      return 'noun';
    }
    if (/(ous|less|able|ible|ful)$/i.test(clean) && (hasAdj || uniquePos.length === 0)) {
      return 'adjective';
    }
    if (/ly$/i.test(clean) && clean.length > 4 && hasAdv) {
      return 'adverb';
    }
  }

  if (normalizedList.length > 0) return normalizedList[0];
  if (normalizedDm) return normalizedDm;
  return '';
}

function isHighQualityAcademicSentence(sentence, word) {
  if (!sentence) return false;
  const s = sentence.trim();
  if (s.length < 35 || s.length > 165) return false;
  if (!/^[A-Z]/.test(s) || !/[.]$/.test(s)) return false;
  if (/[?!"]/.test(s)) return false;
  if (s.includes('In academic contexts,')) return false;
  if (/\b(I|me|my|mine|you|your|we|us|our|let's|don't|didn't|won't|can't|isn't|aren't|wasn't|weren't|Tom|Mary|Sami|Miroslav|Lukas|Yanni|Rodrigo|Santiago|John|Alice|Bob)\b/.test(s)) {
    return false;
  }
  if (/\b(thou|thee|thy|thine|hath|shalt|dost|unto|drunk|erection|sex|sexy|beer|wine|whiskey)\b/i.test(s)) {
    return false;
  }
  const clean = (word || '').toLowerCase().trim();
  if (clean) {
    const stem = clean.replace(/(ing|ed|es|s|ly|tion|ment|ity)$/i, '');
    const matchTarget = stem.length >= 4 ? stem : clean;
    const regex = new RegExp(`\\b${matchTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    if (!regex.test(s)) return false;
  }
  return true;
}

function composeContextualToeflSentence(word, partOfSpeech) {
  const cleanWord = (word || '').trim();
  const pos = normalizePosTag(partOfSpeech);

  let hash = 0;
  for (let i = 0; i < cleanWord.length; i++) {
    hash = (hash << 5) - hash + cleanWord.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash);

  if (pos === 'verb') {
    const verbTemplates = [
      `Environmental factors can ${cleanWord} biological processes across diverse terrestrial ecosystems.`,
      `Ancient civilizations developed specialized techniques to ${cleanWord} resources in arid environments.`,
      `Public policy initiatives often seek to ${cleanWord} economic stability during periods of rapid transition.`,
      `Researchers observed how migratory species ${cleanWord} their behavior in response to seasonal climate shifts.`
    ];
    return verbTemplates[idx % verbTemplates.length];
  }

  if (pos === 'adjective') {
    const adjTemplates = [
      `Archaeological excavations revealed ${cleanWord} evidence of long-distance trade among early urban societies.`,
      `Scientists analyzed the ${cleanWord} characteristics of marine organisms inhabiting deep oceanic trenches.`,
      `Historians noted that ${cleanWord} economic conditions significantly influenced nineteenth-century industrial growth.`,
      `Ecological studies emphasize the importance of ${cleanWord} environmental patterns in sustaining biodiversity.`
    ];
    return adjTemplates[idx % adjTemplates.length];
  }

  if (pos === 'adverb') {
    const advTemplates = [
      `Climatic variations can ${cleanWord} alter the distribution of native plant and animal populations.`,
      `Technological innovations have ${cleanWord} transformed how researchers collect and analyze astronomical data.`,
      `Urban infrastructure projects ${cleanWord} reshaped settlement patterns across metropolitan regions.`
    ];
    return advTemplates[idx % advTemplates.length];
  }

  const nounTemplates = [
    `Historians examine how ${cleanWord} shaped the political and economic institutions of early societies.`,
    `Empirical studies demonstrate that ${cleanWord} plays a critical role in maintaining ecological balance.`,
    `Sociologists analyzed how rapid industrialization contributed to growing ${cleanWord} within urban centers.`,
    `Long-term field observations provide valuable insight into the effects of ${cleanWord} on regional ecosystems.`
  ];
  return nounTemplates[idx % nounTemplates.length];
}

async function translateGoogleGTXServer(text, targetLang = 'ko') {
  if (!text || !text.trim()) return '';
  const q = encodeURIComponent(text.trim());
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${q}`;

  try {
    const data = await fetchJson(url);
    if (Array.isArray(data?.[0])) {
      const translated = data[0].map(item => item?.[0]).filter(Boolean).join('').trim();
      if (translated && translated.toLowerCase() !== text.trim().toLowerCase()) {
        if (targetLang !== 'ko' || isKoreanText(translated)) {
          return translated;
        }
      }
    }
  } catch (err) {
    // Fallback to MyMemory below
  }

  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${q}&langpair=en|${targetLang}`;
    const mmData = await fetchJson(mmUrl);
    const matched = (mmData?.responseData?.translatedText || '').trim();
    if (matched && matched.toLowerCase() !== text.trim().toLowerCase() && !matched.includes('MYMEMORY WARNING')) {
      if (targetLang !== 'ko' || isKoreanText(matched)) {
        return matched;
      }
    }
  } catch (err) {}

  return '';
}

async function formatKoreanMeaningByPOS(word, rawMeaning, primaryPos, allPosList = []) {
  const pos = normalizePosTag(primaryPos);
  let meaning = (rawMeaning || '').replace(/\.$/, '').trim();
  if (!meaning) return '';

  if (pos === 'verb') {
    // If already in Korean verb dictionary form (~다), return as-is
    if (/다$/.test(meaning)) return meaning;

    // Ask Google GTX for infinitive ("to <word>") to get natural verb stem
    const infTrans = await translateGoogleGTXServer(`to ${word.trim()}`, 'ko');
    if (infTrans) {
      const cleanedInf = infTrans.replace(/\.$/, '').trim();
      if (/다$/.test(cleanedInf) && !/(있다|없다)$/.test(cleanedInf)) {
        return cleanedInf;
      }
      const stemMatch = cleanedInf.match(/^(.+?)(?:기\s*위해(?:서|서는)?|기\s*위한(?:\s*것)?|는\s*것|기)$/);
      if (stemMatch && stemMatch[1]) {
        return `${stemMatch[1].trim()}다`;
      }
    }

    // Convert Sino-Korean verbal noun (e.g. "조작" -> "조작하다")
    return meaning
      .split(/\s*[\/,]\s*/)
      .map(part => {
        const p = part.trim();
        if (!p || /다$/.test(p)) return p;
        return `${p}하다`;
      })
      .join(' / ');
  }

  if (pos === 'adjective') {
    if (/적$/.test(meaning)) return `${meaning}인`;
    if (/(한|적인|없는|있는|운|른|신|은|는|로운|스러운)$/.test(meaning)) return meaning;

    const adjTrans = await translateGoogleGTXServer(`very ${word.trim()}`, 'ko');
    if (adjTrans) {
      const stripped = adjTrans.replace(/^(매우|아주|정말|무척|너무)\s+/, '').replace(/\.$/, '').trim();
      if (stripped && isKoreanText(stripped)) {
        return /적$/.test(stripped) ? `${stripped}인` : stripped;
      }
    }
    return meaning;
  }

  if (pos === 'adverb') {
    if (/적$/.test(meaning)) return `${meaning}으로`;
    if (/적인$/.test(meaning)) return meaning.replace(/적인$/, '적으로');
    if (/한$/.test(meaning)) return meaning.replace(/한$/, '하게');
    return meaning;
  }

  if (pos === 'noun' && !allPosList.includes('verb')) {
    if (/하다$/.test(meaning)) return meaning.replace(/하다$/, '');
  }

  return meaning;
}

async function fetchRealExampleFromServer(word) {
  const clean = (word || '').toLowerCase().trim();
  if (!clean) return { exampleSentence: '', definition: '', partOfSpeech: '', allPosList: [] };

  let exampleSentence = '';
  let definition = '';
  const dictPosList = [];
  let dmPos = '';
  const candidates = [];

  // 1. Check Free Dictionary API (Oxford/Wiktionary)
  try {
    const dictData = await fetchJson(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`);
    if (Array.isArray(dictData)) {
      for (const entry of dictData) {
        for (const m of entry.meanings || []) {
          if (m.partOfSpeech) dictPosList.push(normalizePosTag(m.partOfSpeech));
          for (const d of m.definitions || []) {
            if (!definition && d.definition) definition = d.definition.trim();
            if (d.example) {
              const ex = stripHtml(d.example);
              if (isHighQualityAcademicSentence(ex, clean)) {
                candidates.push(ex);
              }
            }
          }
        }
      }
    }
  } catch (e) {}

  // 2. Check Wiktionary REST API for additional usage examples & POS
  if (candidates.length === 0 || dictPosList.length === 0) {
    try {
      const wikiDict = await fetchJson(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(clean)}`);
      const enBlocks = wikiDict?.en || [];
      for (const block of enBlocks) {
        if (block.partOfSpeech) dictPosList.push(normalizePosTag(block.partOfSpeech));
        for (const defObj of block.definitions || []) {
          if (!definition && defObj.definition) {
            const strippedDef = stripHtml(defObj.definition);
            if (strippedDef) definition = strippedDef;
          }
          for (const exRaw of defObj.examples || []) {
            const ex = stripHtml(exRaw);
            if (isHighQualityAcademicSentence(ex, clean)) {
              candidates.push(ex);
            }
          }
        }
      }
    } catch (e) {}
  }

  // 3. Check Tatoeba corpus with redirect support & strict academic quality filter
  if (candidates.length === 0) {
    try {
      const tatData = await fetchJson(`https://tatoeba.org/eng/api_v0/search?from=eng&query=${encodeURIComponent(clean)}`);
      const results = tatData?.results || [];
      for (const r of results) {
        if (r.text && isHighQualityAcademicSentence(r.text, clean)) {
          candidates.push(r.text.trim());
        }
      }
    } catch (e) {}
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => {
      const scoreA = a.length >= 50 && a.length <= 130 ? 1 : 0;
      const scoreB = b.length >= 50 && b.length <= 130 ? 1 : 0;
      return scoreB - scoreA || b.length - a.length;
    });
    exampleSentence = candidates[0];
  }

  // 4. Check Datamuse for POS & fallback definition
  if (!definition || dictPosList.length === 0) {
    try {
      const dmData = await fetchJson(`https://api.datamuse.com/words?sp=${encodeURIComponent(clean)}&md=dp&max=1`);
      if (Array.isArray(dmData) && dmData[0]) {
        if (Array.isArray(dmData[0].defs) && dmData[0].defs.length > 0) {
          const rawDef = dmData[0].defs[0];
          const parts = rawDef.split('\t');
          if (parts.length > 1) {
            dmPos = normalizePosTag(parts[0]);
            if (!definition) definition = parts[1].trim();
          } else if (!definition) {
            definition = rawDef.trim();
          }
        }
        if (!dmPos && Array.isArray(dmData[0].tags)) {
          const posTag = dmData[0].tags.find(t => ['v', 'n', 'adj', 'adv'].includes(t));
          if (posTag) dmPos = normalizePosTag(posTag);
        }
      }
    } catch (e) {}
  }

  const allPosList = Array.from(new Set([...dictPosList, dmPos].filter(Boolean)));
  const partOfSpeech = inferPrimaryPOS(clean, dictPosList, dmPos);

  return { exampleSentence, definition, partOfSpeech, allPosList };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const text = (req.query?.text || urlObj.searchParams.get('text') || '').trim();
    const includeExample = (req.query?.includeExample || urlObj.searchParams.get('includeExample') || '') === '1';

    if (!text) {
      res.status(400).json({ error: 'Missing text parameter' });
      return;
    }

    const translated = await translateGoogleGTXServer(text, 'ko');

    if (!includeExample) {
      res.status(200).json({ translated: translated || '' });
      return;
    }

    const { exampleSentence, definition, partOfSpeech, allPosList } = await fetchRealExampleFromServer(text);
    let rawMeaning = translated;
    if (!rawMeaning && definition) {
      const cleanDef = definition.replace(/^(\s*\([^)]*\)\s*)+/g, '').split(';')[0].replace(/\.$/, '').trim();
      rawMeaning = await translateGoogleGTXServer(cleanDef, 'ko');
    }

    const finalMeaning = await formatKoreanMeaningByPOS(text, rawMeaning, partOfSpeech, allPosList);

    let finalExample = exampleSentence;
    if (!finalExample) {
      finalExample = composeContextualToeflSentence(text, partOfSpeech);
    }

    let exampleTranslation = '';
    if (finalExample) {
      exampleTranslation = await translateGoogleGTXServer(finalExample, 'ko');
    }

    res.status(200).json({
      translated: finalMeaning || '',
      exampleSentence: finalExample || '',
      exampleTranslation: exampleTranslation || '',
      definition: definition || '',
      partOfSpeech: partOfSpeech || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message, translated: '' });
  }
};
