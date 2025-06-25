"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { User, FileText, MapPin } from "lucide-react"

const categories = ["Singer", "Dancer", "Speaker", "DJ", "Musician", "Comedian", "Magician"]
const languages = [
  "Hindi",
  "English",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Malayalam",
  "Odia",
  "Punjabi",
  "Assamese",
]
const feeRanges = ["₹30000-50000", "₹50000-100000", "₹100000-200000", "₹200000-500000", "₹500000+"]

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Location is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
})

type FormData = z.infer<typeof formSchema>

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      console.log("Form submitted:", { ...data, profileImage })

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 24 hours.",
      })

      // Reset form
      form.reset()
      setCurrentStep(1)
      setProfileImage(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfileImage(file)
    }
  }

  const stepTitles = ["Basic Info", "Skills & Pricing", "Contact & Review"]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>

        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Join Artistly
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Create your artist profile and start receiving booking requests from event organizers
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 flex-1">
        <div className="container mx-auto max-w-3xl">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 ${step <= currentStep
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {step}
                  </div>
                  <span className={`text-sm mt-2 font-medium ${step <= currentStep ? "text-blue-600" : "text-gray-500"
                    }`}>
                    {stepTitles[step - 1]}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      Basic Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium text-lg">
                      Tell us about yourself and your artistic background
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="border-2 focus:border-blue-500 rounded-lg py-3"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold">Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your artistic journey, experience, and what makes you unique..."
                              className="min-h-[140px] border-2 focus:border-blue-500 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-600">
                            Minimum 50 characters. This will be displayed on your profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label htmlFor="profileImage" className="text-gray-900 font-semibold">
                        Profile Image (Optional)
                      </Label>
                      <div className="mt-3">
                        <Input
                          id="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="border-2 focus:border-blue-500 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-purple-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-purple-100"
                        />
                      </div>
                      {profileImage && (
                        <p className="text-sm text-green-600 mt-3 font-medium">
                          ✓ {profileImage.name} uploaded successfully
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Skills & Pricing */}
              {currentStep === 2 && (
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      Skills & Pricing
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium text-lg">
                      Select your categories, languages, and pricing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <FormField
                      control={form.control}
                      name="categories"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold text-lg">
                            Categories (Select all that apply)
                          </FormLabel>
                          <div className="grid grid-cols-2 gap-4">
                            {categories.map((category) => (
                              <FormField
                                key={category}
                                control={form.control}
                                name="categories"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 border-2 border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(category)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, category])
                                            : field.onChange(field.value?.filter((value) => value !== category))
                                        }}
                                        className="border-2"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-medium text-gray-900 cursor-pointer">
                                      {category}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="languages"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold text-lg">Languages Spoken</FormLabel>
                          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border-2 border-gray-100 rounded-lg p-4">
                            {languages.map((language) => (
                              <FormField
                                key={language}
                                control={form.control}
                                name="languages"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(language)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, language])
                                            : field.onChange(field.value?.filter((value) => value !== language))
                                        }}
                                        className="border-2"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-medium text-gray-900 cursor-pointer">
                                      {language}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="feeRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold text-lg">Fee Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-2 focus:border-purple-500 rounded-lg py-3">
                                <SelectValue placeholder="Select your fee range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {feeRanges.map((range) => (
                                <SelectItem key={range} value={range} className="font-medium">
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Contact & Review */}
              {currentStep === 3 && (
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium text-lg">
                      Provide your contact details and review your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold">Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City, State"
                              className="border-2 focus:border-green-500 rounded-lg py-3"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="border-2 focus:border-green-500 rounded-lg py-3"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(+91 .......)"
                              className="border-2 focus:border-green-500 rounded-lg py-3"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Review Section */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-100">
                      <h3 className="font-bold text-xl text-gray-900 mb-4">Review Your Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-gray-900 min-w-[100px]">Name:</span>
                          <span className="text-gray-700">{form.watch("name") || "Not provided"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-gray-900 min-w-[100px]">Categories:</span>
                          <span className="text-gray-700">{form.watch("categories")?.join(", ") || "None selected"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-gray-900 min-w-[100px]">Languages:</span>
                          <span className="text-gray-700">{form.watch("languages")?.join(", ") || "None selected"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-gray-900 min-w-[100px]">Fee Range:</span>
                          <span className="text-green-700 font-semibold">{form.watch("feeRange") || "Not selected"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-gray-900 min-w-[100px]">Location:</span>
                          <span className="text-gray-700">{form.watch("location") || "Not provided"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-8 py-3 rounded-full font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  )
}