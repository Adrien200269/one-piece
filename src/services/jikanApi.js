// Jikan v4 REST API service with caching and graceful offline fallback
const BASE_URL = 'https://api.jikan.moe/v4';
const CACHE = new Map();

// Helper to fetch with timeout and cache
async function fetchWithCache(url, cacheDurationMinutes = 15) {
  const cached = CACHE.get(url);
  if (cached && Date.now() - cached.timestamp < cacheDurationMinutes * 60 * 1000) {
    return cached.data;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`Jikan API responded with status: ${res.status}`);
    }
    const json = await res.json();
    CACHE.set(url, { data: json.data, timestamp: Date.now() });
    return json.data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`Jikan API fetch error for ${url}:`, err.message);
    if (cached) return cached.data; // Return stale cache if available
    throw err;
  }
}

// Fallback anime data if offline/blocked
export const FALLBACK_ANIME_INFO = {
  mal_id: 21,
  title: "One Piece",
  title_japanese: "ONE PIECE",
  title_english: "One Piece",
  episodes: 1120,
  status: "Currently Airing",
  aired: { string: "Oct 20, 1999 to ?" },
  score: 8.73,
  scored_by: 1400000,
  rank: 55,
  popularity: 18,
  synopsis: "Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the king of the pirates title that comes with it.",
  studios: [{ name: "Toei Animation" }],
  genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Fantasy" }],
  trailer: {
    youtube_id: "MCb13lbKpsk",
    url: "https://www.youtube.com/watch?v=MCb13lbKpsk",
    embed_url: "https://www.youtube.com/embed/MCb13lbKpsk?enablejsapi=1&wmode=opaque&autoplay=1"
  }
};

// Fetch One Piece anime details
export async function getOnePieceStats() {
  try {
    const data = await fetchWithCache(`${BASE_URL}/anime/21`, 30);
    return data || FALLBACK_ANIME_INFO;
  } catch {
    return FALLBACK_ANIME_INFO;
  }
}

// Fetch live episodes (page 1: recent episodes or custom page)
export async function getEpisodes(page = 1) {
  try {
    const data = await fetchWithCache(`${BASE_URL}/anime/21/episodes?page=${page}`, 10);
    return data;
  } catch {
    return null;
  }
}

// Live search for any character in One Piece
export async function searchCharacters(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const data = await fetchWithCache(`${BASE_URL}/characters?q=${encodeURIComponent(query)}&limit=8`, 10);
    return data || [];
  } catch {
    return [];
  }
}
