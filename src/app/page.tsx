"use client"

import { useState, useEffect } from "react"
import { Movie, TVShow, omdbApi } from "@/lib/tmdb"
import { MovieGrid } from "@/components/MovieGrid"
import { DemoAuthButton } from "@/components/DemoAuthButton"
import { Button } from "@/components/ui/button"
import { Search, Filter, Star, TrendingUp, Calendar, Tv } from "lucide-react"

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [tvShows, setTvShows] = useState<TVShow[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [popularMovies, popularTV] = await Promise.all([
        omdbApi.getPopularMovies(1),
        omdbApi.getPopularTVShows(1)
      ])
      setMovies(popularMovies.data.results)
      setTvShows(popularTV.data.results)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    try {
      setIsSearching(true)
      const [movieResults, tvResults] = await Promise.all([
        omdbApi.searchMovies(query),
        omdbApi.searchTVShows(query)
      ])
      setSearchResults([...movieResults.data.results, ...tvResults.data.results])
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddToWatchlist = (id: string, title: string, poster: string | null) => {
    if (!user) {
      alert("Je moet ingelogd zijn om items toe te voegen aan je watchlist!")
      return
    }
    // TODO: Implement watchlist functionality
    console.log("Add to watchlist:", { id, title, poster, user: user.name })
  }

  const handleToggleFavorite = (id: string) => {
    if (!user) {
      alert("Je moet ingelogd zijn om favorieten toe te voegen!")
      return
    }
    // TODO: Implement favorite functionality
    console.log("Toggle favorite:", id, "for user:", user.name)
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const currentItems = isSearching ? searchResults : (activeTab === "movies" ? movies : tvShows)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MovieTracker</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Zoek films of series..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearch(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <DemoAuthButton 
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Notice */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {user ? `Welkom, ${user.name}!` : "OMDB API Actief"}
              </h3>
              <div className="mt-1 text-sm text-blue-700">
                <p>
                  {user 
                    ? "Je bent ingelogd! Je kunt nu films toevoegen aan je watchlist en favorieten."
                    : "Deze app gebruikt de OMDB API met je API key (6359681). Log in om je persoonlijke watchlist te beheren!"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {!isSearching && (
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab("movies")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "movies"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-2 inline" />
                Populaire Films
              </button>
              <button
                onClick={() => setActiveTab("tv")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "tv"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Tv className="h-4 w-4 mr-2 inline" />
                Populaire Series
              </button>
            </div>
          </div>
        )}

        {isSearching && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Zoekresultaten voor "{searchQuery}"
            </h2>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <MovieGrid
            items={currentItems}
            type={isSearching ? "movie" : activeTab}
            onAddToWatchlist={handleAddToWatchlist}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {!loading && currentItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {isSearching ? "Geen resultaten gevonden" : "Geen data beschikbaar"}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}