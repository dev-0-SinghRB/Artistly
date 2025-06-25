"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, MessageSquare, CheckCircle, XCircle, Clock, Users, IndianRupee, Calendar } from "lucide-react"
import { artistSubmissions, bookingRequests } from "@/lib/mock-data"

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSubmissions = artistSubmissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      title: "Total Artists",
      value: "247",
      icon: Users,
      change: "+12 this month",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
    },
    {
      title: "Active Bookings",
      value: "18",
      icon: Calendar,
      change: "+3 this week",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-600",
    },
    {
      title: "Revenue",
      value: "₹5,24,500",
      icon: IndianRupee,
      change: "+8% from last month",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-600",
    },
    {
      title: "Pending Reviews",
      value: "5",
      icon: Clock,
      change: "2 urgent",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Manager Dashboard
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Manage your artists, bookings, and track performance with comprehensive insights
          </p>
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg group"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-sm font-medium text-gray-900">{stat.title}</CardTitle>
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600 font-medium">{stat.change}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-8 px-4 flex-1">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Artist Submissions */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl font-bold text-gray-900">Artist Submissions</CardTitle>
                  <CardDescription className="text-gray-600 font-medium">
                    Review and manage artist applications
                  </CardDescription>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search artists..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 focus:border-blue-500 rounded-full"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px] border-2 focus:border-blue-500 rounded-full">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b-2 border-gray-100">
                          <TableHead className="font-bold text-gray-900">Name</TableHead>
                          <TableHead className="font-bold text-gray-900">Category</TableHead>
                          <TableHead className="font-bold text-gray-900">Location</TableHead>
                          <TableHead className="font-bold text-gray-900">Fee Range</TableHead>
                          <TableHead className="font-bold text-gray-900">Status</TableHead>
                          <TableHead className="font-bold text-gray-900">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubmissions.map((submission) => (
                          <TableRow key={submission.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <TableCell className="font-semibold text-gray-900">{submission.name}</TableCell>
                            <TableCell className="text-gray-700">{submission.category}</TableCell>
                            <TableCell className="text-gray-700">{submission.location}</TableCell>
                            <TableCell className="font-semibold text-green-700">{submission.feeRange}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`font-semibold px-3 py-1 rounded-full ${submission.status === "approved"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : submission.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                      : "bg-red-100 text-red-800 border-red-300"
                                  }`}
                              >
                                {submission.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {submission.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 hover:bg-green-50 hover:border-green-300 transition-colors duration-200"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Booking Requests */}
            <div>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl font-bold text-gray-900">Recent Booking Requests</CardTitle>
                  <CardDescription className="text-gray-600 font-medium">
                    Latest booking inquiries from event planners
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bookingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border-2 border-gray-100 rounded-lg p-4 hover:border-blue-200 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-gray-900 text-lg">{request.eventName}</h4>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 border-blue-300 font-semibold px-3 py-1 rounded-full"
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 font-medium mb-2">
                          <span className="font-bold">Artist:</span> {request.artistName}
                        </p>
                        <p className="text-sm text-gray-700 font-medium mb-2">
                          <span className="font-bold">Date:</span> {request.eventDate}
                        </p>
                        <p className="text-sm text-green-700 font-bold mb-4">
                          <span className="text-gray-700 font-bold">Budget:</span> {request.budget}
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Respond
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}