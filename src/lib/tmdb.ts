import axios from "axios"

const OMDB_BASE_URL = "https://www.omdbapi.com"
const OMDB_API_KEY = process.env.OMDB_API_KEY || "6359681"

const omdbClient = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
})

// Fallback data voor demo doeleinden
const DEMO_MOVIES: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-09-23",
    vote_average: 8.7,
    vote_count: 24000,
    genre_ids: [18, 80],
    adult: false,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    popularity: 85.5,
    video: false
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: null,
    backdrop_path: null,
    release_date: "1972-03-14",
    vote_average: 8.7,
    vote_count: 18000,
    genre_ids: [18, 80],
    adult: false,
    original_language: "en",
    original_title: "The Godfather",
    popularity: 82.0,
    video: false
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2008-07-18",
    vote_average: 8.5,
    vote_count: 30000,
    genre_ids: [28, 80, 18],
    adult: false,
    original_language: "en",
    original_title: "The Dark Knight",
    popularity: 95.0,
    video: false
  }
]

const DEMO_TV_SHOWS: TVShow[] = [
  {
    id: 1,
    name: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    poster_path: null,
    backdrop_path: null,
    first_air_date: "2008-01-20",
    vote_average: 9.5,
    vote_count: 12000,
    genre_ids: [18, 80],
    adult: false,
    original_language: "en",
    original_name: "Breaking Bad",
    popularity: 90.0,
    origin_country: ["US"]
  },
  {
    id: 2,
    name: "Game of Thrones",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    poster_path: null,
    backdrop_path: null,
    first_air_date: "2011-04-17",
    vote_average: 8.3,
    vote_count: 25000,
    genre_ids: [18, 14, 12],
    adult: false,
    original_language: "en",
    original_name: "Game of Thrones",
    popularity: 88.0,
    origin_country: ["US"]
  }
]

// Helper function om API calls te wrappen met fallback
const withFallback = async <T>(apiCall: () => Promise<{ data: T }>, fallbackData: T): Promise<{ data: T }> => {
  try {
    return await apiCall()
  } catch (error) {
    console.warn("API call failed, using fallback data:", error)
    return { data: fallbackData }
  }
}

// Helper functions om OMDB data om te zetten naar onze app format
const convertOMDBToMovie = (omdbItem: any): Movie => ({
  id: omdbItem.imdbID,
  title: omdbItem.Title,
  overview: omdbItem.Plot || "",
  poster_path: omdbItem.Poster !== "N/A" ? omdbItem.Poster : null,
  backdrop_path: null,
  release_date: omdbItem.Released || omdbItem.Year,
  vote_average: parseFloat(omdbItem.imdbRating) || 0,
  vote_count: parseInt(omdbItem.imdbVotes?.replace(/,/g, "")) || 0,
  genre_ids: omdbItem.Genre ? omdbItem.Genre.split(", ") : [],
  adult: omdbItem.Rated === "R" || omdbItem.Rated === "NC-17",
  original_language: omdbItem.Language?.split(", ")[0] || "en",
  original_title: omdbItem.Title,
  popularity: 0,
  video: false,
  type: "movie"
})

const convertOMDBToTVShow = (omdbItem: any): TVShow => ({
  id: omdbItem.imdbID,
  name: omdbItem.Title,
  overview: omdbItem.Plot || "",
  poster_path: omdbItem.Poster !== "N/A" ? omdbItem.Poster : null,
  backdrop_path: null,
  first_air_date: omdbItem.Released || omdbItem.Year,
  vote_average: parseFloat(omdbItem.imdbRating) || 0,
  vote_count: parseInt(omdbItem.imdbVotes?.replace(/,/g, "")) || 0,
  genre_ids: omdbItem.Genre ? omdbItem.Genre.split(", ") : [],
  adult: omdbItem.Rated === "R" || omdbItem.Rated === "NC-17",
  original_language: omdbItem.Language?.split(", ")[0] || "en",
  original_name: omdbItem.Title,
  popularity: 0,
  origin_country: omdbItem.Country ? omdbItem.Country.split(", ") : [],
  type: "series"
})

// OMDB API Interfaces
export interface OMDBMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface OMDBSearchResponse {
  Search: Array<{
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }>
  totalResults: string
  Response: string
}

// Unified interfaces for our app
export interface Movie {
  id: string
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: string[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  type: "movie"
}

export interface TVShow {
  id: string
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: string[]
  adult: boolean
  original_language: string
  original_name: string
  popularity: number
  origin_country: string[]
  type: "series"
}

export interface OMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: string
  name: string
}

export const omdbApi = {
  // Movies
  getPopularMovies: async (page: number = 1) => {
    // OMDB heeft geen "popular" endpoint, dus we gebruiken meerdere zoektermen
    const popularSearches = ["batman", "spider", "avengers", "star wars", "harry potter", "lord of the rings", "titanic", "inception"]
    
    try {
      // Probeer meerdere zoektermen en combineer resultaten
      const searchPromises = popularSearches.slice(0, 3).map(searchTerm => 
        omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: searchTerm, type: "movie", page: 1 } 
        }).catch(() => null)
      )
      
      const responses = await Promise.all(searchPromises)
      const allMovies: Movie[] = []
      
      responses.forEach(response => {
        if (response?.data?.Search) {
          const movies = response.data.Search.map(convertOMDBToMovie)
          allMovies.push(...movies)
        }
      })
      
      // Verwijder duplicaten op basis van ID
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id)
      )
      
      return {
        data: {
          page,
          results: uniqueMovies.slice(0, 20), // Max 20 resultaten
          total_pages: 1,
          total_results: uniqueMovies.length
        }
      }
    } catch (error) {
      console.warn("OMDB API call failed, using fallback data:", error)
      return { 
        data: { 
          page: 1, 
          results: DEMO_MOVIES, 
          total_pages: 1, 
          total_results: DEMO_MOVIES.length 
        } 
      }
    }
  },
  
  getTopRatedMovies: async (page: number = 1) => {
    // Zoek naar bekende hooggewaardeerde films
    const topRatedSearches = ["inception", "pulp fiction", "forrest gump", "the matrix", "goodfellas"]
    const randomSearch = topRatedSearches[Math.floor(Math.random() * topRatedSearches.length)]
    
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: randomSearch, type: "movie", page } 
        })
        const movies = response.data.Search?.map(convertOMDBToMovie) || []
        return {
          data: {
            page,
            results: movies,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      },
      { page: 1, results: DEMO_MOVIES, total_pages: 1, total_results: DEMO_MOVIES.length }
    )
  },
  
  getNowPlayingMovies: async (page: number = 1) => {
    // Zoek naar recente films
    const currentYear = new Date().getFullYear()
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: "2024", type: "movie", page, y: currentYear } 
        })
        const movies = response.data.Search?.map(convertOMDBToMovie) || []
        return {
          data: {
            page,
            results: movies,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      },
      { page: 1, results: DEMO_MOVIES, total_pages: 1, total_results: DEMO_MOVIES.length }
    )
  },
  
  getUpcomingMovies: async (page: number = 1) => {
    // Zoek naar films van volgend jaar
    const nextYear = new Date().getFullYear() + 1
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: "2025", type: "movie", page, y: nextYear } 
        })
        const movies = response.data.Search?.map(convertOMDBToMovie) || []
        return {
          data: {
            page,
            results: movies,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      },
      { page: 1, results: DEMO_MOVIES, total_pages: 1, total_results: DEMO_MOVIES.length }
    )
  },
  
  getMovieDetails: async (id: string) => {
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBMovie>("", { params: { i: id } })
        return { data: convertOMDBToMovie(response.data) }
      },
      DEMO_MOVIES.find(m => m.id === id) || DEMO_MOVIES[0]
    )
  },
  
  searchMovies: async (query: string, page: number = 1) => {
    try {
      const response = await omdbClient.get<OMDBSearchResponse>("", { 
        params: { s: query, type: "movie", page } 
      })
      
      if (response.data.Response === "True" && response.data.Search) {
        const movies = response.data.Search.map(convertOMDBToMovie)
        return {
          data: {
            page,
            results: movies,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      } else {
        // Geen resultaten gevonden, probeer een bredere zoekopdracht
        const broadQuery = query.split(' ')[0] // Neem alleen het eerste woord
        const broadResponse = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: broadQuery, type: "movie", page } 
        })
        
        if (broadResponse.data.Response === "True" && broadResponse.data.Search) {
          const movies = broadResponse.data.Search.map(convertOMDBToMovie)
          return {
            data: {
              page,
              results: movies,
              total_pages: Math.ceil(parseInt(broadResponse.data.totalResults) / 10),
              total_results: parseInt(broadResponse.data.totalResults)
            }
          }
        }
      }
      
      // Fallback naar demo data
      return { 
        data: { 
          page: 1, 
          results: DEMO_MOVIES.filter(m => 
            m.title.toLowerCase().includes(query.toLowerCase())
          ), 
          total_pages: 1, 
          total_results: DEMO_MOVIES.filter(m => 
            m.title.toLowerCase().includes(query.toLowerCase())
          ).length 
        } 
      }
    } catch (error) {
      console.warn("OMDB search failed:", error)
      return { 
        data: { 
          page: 1, 
          results: DEMO_MOVIES.filter(m => 
            m.title.toLowerCase().includes(query.toLowerCase())
          ), 
          total_pages: 1, 
          total_results: DEMO_MOVIES.filter(m => 
            m.title.toLowerCase().includes(query.toLowerCase())
          ).length 
        } 
      }
    }
  },

  // TV Shows
  getPopularTVShows: async (page: number = 1) => {
    const popularSearches = ["breaking bad", "game of thrones", "stranger things", "the office", "friends", "the walking dead", "house of cards", "narcos"]
    
    try {
      // Probeer meerdere zoektermen en combineer resultaten
      const searchPromises = popularSearches.slice(0, 3).map(searchTerm => 
        omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: searchTerm, type: "series", page: 1 } 
        }).catch(() => null)
      )
      
      const responses = await Promise.all(searchPromises)
      const allShows: TVShow[] = []
      
      responses.forEach(response => {
        if (response?.data?.Search) {
          const shows = response.data.Search.map(convertOMDBToTVShow)
          allShows.push(...shows)
        }
      })
      
      // Verwijder duplicaten op basis van ID
      const uniqueShows = allShows.filter((show, index, self) => 
        index === self.findIndex(s => s.id === show.id)
      )
      
      return {
        data: {
          page,
          results: uniqueShows.slice(0, 20), // Max 20 resultaten
          total_pages: 1,
          total_results: uniqueShows.length
        }
      }
    } catch (error) {
      console.warn("OMDB API call failed, using fallback data:", error)
      return { 
        data: { 
          page: 1, 
          results: DEMO_TV_SHOWS, 
          total_pages: 1, 
          total_results: DEMO_TV_SHOWS.length 
        } 
      }
    }
  },
  
  getTopRatedTVShows: async (page: number = 1) => {
    const topRatedSearches = ["the wire", "sopranos", "breaking bad", "game of thrones", "the office"]
    const randomSearch = topRatedSearches[Math.floor(Math.random() * topRatedSearches.length)]
    
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: randomSearch, type: "series", page } 
        })
        const shows = response.data.Search?.map(convertOMDBToTVShow) || []
        return {
          data: {
            page,
            results: shows,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      },
      { page: 1, results: DEMO_TV_SHOWS, total_pages: 1, total_results: DEMO_TV_SHOWS.length }
    )
  },
  
  getOnTheAirTVShows: async (page: number = 1) => {
    const currentYear = new Date().getFullYear()
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: "2024", type: "series", page, y: currentYear } 
        })
        const shows = response.data.Search?.map(convertOMDBToTVShow) || []
        return {
          data: {
            page,
            results: shows,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      },
      { page: 1, results: DEMO_TV_SHOWS, total_pages: 1, total_results: DEMO_TV_SHOWS.length }
    )
  },
  
  getTVShowDetails: async (id: string) => {
    return withFallback(
      async () => {
        const response = await omdbClient.get<OMDBMovie>("", { params: { i: id } })
        return { data: convertOMDBToTVShow(response.data) }
      },
      DEMO_TV_SHOWS.find(t => t.id === id) || DEMO_TV_SHOWS[0]
    )
  },
  
  searchTVShows: async (query: string, page: number = 1) => {
    try {
      const response = await omdbClient.get<OMDBSearchResponse>("", { 
        params: { s: query, type: "series", page } 
      })
      
      if (response.data.Response === "True" && response.data.Search) {
        const shows = response.data.Search.map(convertOMDBToTVShow)
        return {
          data: {
            page,
            results: shows,
            total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
            total_results: parseInt(response.data.totalResults)
          }
        }
      } else {
        // Geen resultaten gevonden, probeer een bredere zoekopdracht
        const broadQuery = query.split(' ')[0] // Neem alleen het eerste woord
        const broadResponse = await omdbClient.get<OMDBSearchResponse>("", { 
          params: { s: broadQuery, type: "series", page } 
        })
        
        if (broadResponse.data.Response === "True" && broadResponse.data.Search) {
          const shows = broadResponse.data.Search.map(convertOMDBToTVShow)
          return {
            data: {
              page,
              results: shows,
              total_pages: Math.ceil(parseInt(broadResponse.data.totalResults) / 10),
              total_results: parseInt(broadResponse.data.totalResults)
            }
          }
        }
      }
      
      // Fallback naar demo data
      return { 
        data: { 
          page: 1, 
          results: DEMO_TV_SHOWS.filter(t => 
            t.name.toLowerCase().includes(query.toLowerCase())
          ), 
          total_pages: 1, 
          total_results: DEMO_TV_SHOWS.filter(t => 
            t.name.toLowerCase().includes(query.toLowerCase())
          ).length 
        } 
      }
    } catch (error) {
      console.warn("OMDB search failed:", error)
      return { 
        data: { 
          page: 1, 
          results: DEMO_TV_SHOWS.filter(t => 
            t.name.toLowerCase().includes(query.toLowerCase())
          ), 
          total_pages: 1, 
          total_results: DEMO_TV_SHOWS.filter(t => 
            t.name.toLowerCase().includes(query.toLowerCase())
          ).length 
        } 
      }
    }
  },

  // Genres (OMDB heeft geen genre endpoint, dus we gebruiken statische data)
  getMovieGenres: () => Promise.resolve({ 
    data: { 
      genres: [
        { id: "action", name: "Action" }, 
        { id: "comedy", name: "Comedy" }, 
        { id: "drama", name: "Drama" },
        { id: "horror", name: "Horror" },
        { id: "thriller", name: "Thriller" },
        { id: "romance", name: "Romance" }
      ] 
    } 
  }),
  
  getTVGenres: () => Promise.resolve({ 
    data: { 
      genres: [
        { id: "drama", name: "Drama" }, 
        { id: "comedy", name: "Comedy" }, 
        { id: "action", name: "Action" },
        { id: "mystery", name: "Mystery" },
        { id: "sci-fi", name: "Sci-Fi" },
        { id: "fantasy", name: "Fantasy" }
      ] 
    } 
  }),

  // Images - OMDB geeft directe poster URLs
  getImageUrl: (path: string | null, size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500") => {
    if (!path || path === "N/A") return "/placeholder-movie.svg"
    return path
  },
}
