"use client"

import Image from "next/image"
import { Movie, TVShow } from "@/lib/tmdb"
import { omdbApi } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { Heart, Star, Plus, Play } from "lucide-react"
import { useState } from "react"

interface MovieCardProps {
  item: Movie | TVShow
  type: "movie" | "tv"
  onAddToWatchlist?: (id: string, title: string, poster: string | null) => void
  onToggleFavorite?: (id: string) => void
  isFavorite?: boolean
  isInWatchlist?: boolean
}

export function MovieCard({ 
  item, 
  type, 
  onAddToWatchlist, 
  onToggleFavorite, 
  isFavorite = false,
  isInWatchlist = false 
}: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const title = type === "movie" ? (item as Movie).title : (item as TVShow).name
  const releaseDate = type === "movie" 
    ? (item as Movie).release_date 
    : (item as TVShow).first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageError && item.poster_path ? (
          <Image
            src={omdbApi.getImageUrl(item.poster_path, "w500")}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <img 
              src="/placeholder-movie.svg" 
              alt="Geen afbeelding" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white"
              onClick={() => onAddToWatchlist?.(item.id, title, item.poster_path)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white"
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white"
              onClick={() => onToggleFavorite?.(item.id)}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} 
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{year}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{item.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {item.overview}
        </p>

        {isInWatchlist && (
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              In watchlist
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
