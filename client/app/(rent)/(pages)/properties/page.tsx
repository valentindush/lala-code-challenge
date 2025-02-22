"use client"

import { Input } from "@/components/ui/input"
import { CalendarIcon, Search, Filter } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import axios from "@/lib/axios"
import type { Property } from "@/app/lib/@types"
import { toast } from "@/hooks/use-toast"
import PropertyItem from "@/app/host/components/property-item"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [guestCount, setGuestCount] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()

  useEffect(() => {
    fetchProperties()
  }, [])

  const filterProperties = useCallback(() => {
    const filtered = properties.filter((property) => {
      return (
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        property.price >= minPrice &&
        property.price <= maxPrice &&
        property.guests >= guestCount
      )
    })
    setFilteredProperties(filtered)
  }, [properties, searchTerm, minPrice, maxPrice, guestCount])

  useEffect(() => {
    filterProperties()
  }, [filterProperties])

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/public/properties")
      setProperties(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching properties:", error)
      toast({
        title: "Error",
        description: "Failed to fetch properties. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!selectedProperty || !checkInDate || !checkOutDate) {
      toast({
        title: "Error",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      })
      return
    }

    try {
      await axios.post("/bookings", {
        propertyId: selectedProperty.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      })
      toast({
        title: "Success",
        description: "Booking Request submitted, You'll hear from us soon after a careful reveiew of your booking request.",
      })
      setIsDialogOpen(false)
      fetchProperties() // Refresh the properties list
    } catch (error: any) {
      console.error("Error creating booking:", error)
      toast({
        title: "Failed to create booking.",
        description: error.response.data.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Book Properties</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-24"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24"
          />
          <Input
            type="number"
            placeholder="Guests"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-24"
          />
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading properties...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyItem {...property} />
              <div className="absolute top-2 right-2">
                <Button
                  onClick={() => {
                    setSelectedProperty(property)
                    setIsDialogOpen(true)
                  }}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {selectedProperty?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="check-in" className="text-right">
                Check-in
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-[280px] justify-start text-left font-normal ${
                      !checkInDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="check-out" className="text-right">
                Check-out
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-[280px] justify-start text-left font-normal ${
                      !checkOutDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleBooking}>Submit Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}