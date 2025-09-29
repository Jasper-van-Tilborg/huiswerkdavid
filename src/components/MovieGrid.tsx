"use client"

import { Movie, TVShow } from "@/lib/tmdb"
import { MovieCard } from "./MovieCard"

interface MovieGridProps {
  items: (Movie | TVShow)[]
  type: "movie" | "tv"
  onAddToWatchlist?: (id: string, title: string, poster: string | null) => void
  onToggleFavorite?: (id: string) => void
  favorites?: string[]
  watchlist?: string[]
}

export function MovieGrid({ 
  items, 
  type, 
  onAddToWatchlist, 
  onToggleFavorite, 
  favorites = [],
  watchlist = []
}: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <MovieCard
          key={item.id}
          item={item}
          type={type}
          onAddToWatchlist={onAddToWatchlist}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(item.id)}
          isInWatchlist={watchlist.includes(item.id)}
        />
      ))}
    </div>
  )
}
