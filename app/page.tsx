import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Mic, Headphones, Star, MapPin, IndianRupee } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "singers",
    name: "Singers",
    icon: Mic,
    description: "Professional vocalists for all occasions",
    count: "150+ Artists",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    hoverColor: "group-hover:from-blue-600 group-hover:to-blue-700",
  },
  {
    id: "dancers",
    name: "Dancers",
    icon: Users,
    description: "Choreographers and dance performers",
    count: "200+ Artists",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    hoverColor: "group-hover:from-purple-600 group-hover:to-purple-700",
  },
  {
    id: "speakers",
    name: "Speakers",
    icon: Music,
    description: "Motivational and keynote speakers",
    count: "80+ Artists",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    hoverColor: "group-hover:from-green-600 group-hover:to-green-700",
  },
  {
    id: "djs",
    name: "DJs",
    icon: Headphones,
    description: "Professional DJs and music producers",
    count: "120+ Artists",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    hoverColor: "group-hover:from-orange-600 group-hover:to-orange-700",
  },
]

const featuredArtists = [
  {
    name: "Shreya Ghoshal",
    category: "Singer",
    location: "Mumbai, Maharashtra",
    priceRange: "5,00,000-10,00,000",
    rating: 5,
    image: "https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2024/09/24/shreya_ghoshal.jpg",
    specialty: "Playback Singer",
    awards: "4x National Film Award Winner"
  },
  {
    name: "Vipul Goyal",
    category: "Comedian",
    location: "Mumbai, Maharashtra",
    priceRange: "₹5,50,000-9,00,000",
    rating: 5,
    image: "https://yt3.googleusercontent.com/ytc/AIdro_n1pxm3eQrHAsQwnJDBJu8-FEFnWUrmffTqMEfIM4y6yA=s900-c-k-c0x00ffffff-no-rj",
    specialty: "Stand-up Comedian",
    awards: "Popular Comedy Creator"
  },
  {
    name: "Arijit Singh",
    category: "Singer",
    location: "Jiaganj, West Bengal",
    priceRange: "₹6,00,000-12,00,000",
    rating: 5,
    image: "https://lastfm.freetls.fastly.net/i/u/ar0/ad7e05685bef8909f27c0d95bf79425c.jpg",
    specialty: "Playback & Live Performer",
    awards: "Multiple Filmfare Award Winner",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 md:py-32 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Perfect Artists for Your Events
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-90">
            Connect with talented performing artists and make your events unforgettable. Browse, shortlist, and book the
            best talent for any occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 shadow-lg text-lg px-8 py-3 rounded-full font-semibold"
            >
              <Link href="/artists">Explore Artists</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg text-lg px-8 py-3 rounded-full font-semibold"
            >
              <Link href="/onboard">Join as Artist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Browse by Category
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover talented artists across different categories and find the perfect match for your event
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-0 shadow-lg"
                >
                  <CardHeader className="text-center pb-6">
                    <div
                      className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 hover:bg-blue-200 transition-colors duration-300"
                    >
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Featured Artists
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Meet some of our top-rated artists who are ready to make your event special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {featuredArtists.map((artist, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group border-0 shadow-lg"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {artist.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        {artist.category}
                      </CardDescription>
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        {artist.specialty}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {artist.awards}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-700">{artist.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <IndianRupee className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-700">{artist.priceRange}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    Ask for Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Whether you're planning an event or looking to showcase your talent, Artistly is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 shadow-lg text-lg px-8 py-3 rounded-full font-semibold"
            >
              <Link href="/artists">Find Artists</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg text-lg px-8 py-3 rounded-full font-semibold"
            >
              <Link href="/dashboard">Artist Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}