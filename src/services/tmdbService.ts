const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
  };
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  "watch/providers": {
    results: {
      [country: string]: {
        flatrate?: { provider_id: number; provider_name: string; logo_path: string }[];
        rent?: { provider_id: number; provider_name: string; logo_path: string }[];
        buy?: { provider_id: number; provider_name: string; logo_path: string }[];
      };
    };
  };
}

interface TMDBSeries {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
  };
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  "watch/providers": {
    results: {
      [country: string]: {
        flatrate?: { provider_id: number; provider_name: string; logo_path: string }[];
        rent?: { provider_id: number; provider_name: string; logo_path: string }[];
        buy?: { provider_id: number; provider_name: string; logo_path: string }[];
      };
    };
  };
}

export async function searchTMDB(query: string, type: "movie" | "tv") {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&language=es-ES`
  );
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: number): Promise<TMDBMovie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,watch/providers&language=es-ES`
  );
  return response.json();
}

export async function getSeriesDetails(id: number): Promise<TMDBSeries> {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,watch/providers&language=es-ES`
  );
  return response.json();
}

export function getPosterUrl(path: string | null, size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: "w300" | "w780" | "w1280" | "original" = "w1280") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getProfileUrl(path: string | null, size: "w45" | "w185" | "h632" | "original" = "w185") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getYouTubeEmbedUrl(key: string) {
  return `https://www.youtube.com/embed/${key}`;
}

export function getStreamingProviders(providers: any, country: string = "ES") {
  const countryProviders = providers?.results?.[country];
  if (!countryProviders) return null;

  return {
    flatrate: countryProviders.flatrate || [],
    rent: countryProviders.rent || [],
    buy: countryProviders.buy || [],
  };
} 