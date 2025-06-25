"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, DollarSign, Search, Filter, IndianRupee } from "lucide-react"
import Image from "next/image"
import { artistsData } from "@/lib/mock-data"

const categories = ["All", "Singer", "Dancer", "Speaker", "DJ"]
const locations = [
  "All",
  "Dehradun, Uttarakhand",
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Kochi, Kerala"
]
const priceRanges = ["All", "₹200000-500000", "₹500000-1000000", "₹1000000-1500000", "₹1500000+"]

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredArtists = useMemo(() => {
    // Add safety check for artistsData
    if (!artistsData || !Array.isArray(artistsData)) {
      return []
    }

    return artistsData.filter((artist) => {
      // Add safety check for artist object
      if (!artist) return false

      const matchesSearch =
        (artist.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artist.bio || "").toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || artist.category === selectedCategory
      const matchesLocation = selectedLocation === "All" || artist.location === selectedLocation
      const matchesPriceRange = selectedPriceRange === "All" || artist.priceRange === selectedPriceRange

      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange
    })
  }, [searchTerm, selectedCategory, selectedLocation, selectedPriceRange])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 md:py-24 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Artist
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-90">
              Browse through our talented artists and find the perfect match for your event
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search artists by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white bg-opacity-95 border-0 shadow-lg rounded-full focus:bg-white transition-all duration-300"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto h-14 px-8 bg-white bg-opacity-10 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg rounded-full font-semibold"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <Card className="bg-white bg-opacity-95 border-0 shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="category" className="text-gray-700 font-semibold text-sm mb-2 block">Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 transition-colors duration-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-gray-700 font-semibold text-sm mb-2 block">Location</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 transition-colors duration-300">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priceRange" className="text-gray-700 font-semibold text-sm mb-2 block">Price Range</Label>
                      <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 transition-colors duration-300">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Artists Results Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          {/* Results Count */}
          <div className="mb-12 text-center">
            <p className="text-xl text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-bold">{filteredArtists.length}</span> artist{filteredArtists.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {filteredArtists.map((artist) => (
              <Card
                key={artist.id}
                className="overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group border-0 shadow-lg"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name || "Artist"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white bg-opacity-90 text-gray-800 font-semibold px-3 py-1 rounded-full shadow-lg"
                    >
                      {artist.category || "Unknown"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {artist.name || "Unknown Artist"}
                      </CardTitle>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-yellow-700">{artist.rating || "0"}</span>
                        </div>
                        <span className="text-sm text-gray-500 ml-1">({artist.reviews || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {artist.bio || "No description available"}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{artist.location || "Location not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <IndianRupee className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-700">{artist.priceRange || "Price on request"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(artist.languages || []).slice(0, 3).map((language) => (
                      <Badge key={language} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1">
                        {language}
                      </Badge>
                    ))}
                    {(artist.languages || []).length > 3 && (
                      <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 rounded-full px-3 py-1">
                        +{(artist.languages || []).length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    Ask for Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {filteredArtists.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No artists found</h3>
                <p className="text-lg text-gray-600 mb-8">
                  We couldn't find any artists matching your criteria. Try adjusting your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setSelectedLocation("All")
                    setSelectedPriceRange("All")
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}