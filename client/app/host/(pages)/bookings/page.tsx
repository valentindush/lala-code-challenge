"use client"

import { useState, useEffect } from "react"
import axios from "@/lib/axios"
import type { Booking } from "@/app/lib/@types"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { Search, Filter, CheckCircle, XCircle } from "lucide-react"

export default function HostBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<Booking["status"] | "ALL">("ALL")
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [actionType, setActionType] = useState<"CONFIRM" | "CANCEL" | null>(null)

    useEffect(() => {
        fetchBookings()
    }, [])

    useEffect(() => {
        filterBookings()
    }, [bookings, searchTerm, statusFilter])

    const fetchBookings = async () => {
        try {
            const response = await axios.get("/bookings")
            setBookings(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching bookings:", error)
            toast({
                title: "Error",
                description: "Failed to fetch bookings. Please try again.",
                variant: "destructive",
            })
            setIsLoading(false)
        }
    }

    const filterBookings = () => {
        let filtered = bookings.filter(
            (booking) =>
                booking.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.renter.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        if (statusFilter !== "ALL") {
            filtered = filtered.filter((booking) => booking.status === statusFilter)
        }

        setFilteredBookings(filtered)
    }

    const handleStatusChange = async (bookingId: string, newStatus: "CONFIRMED" | "CANCELLED") => {
        try {
            await axios.put(`/bookings/${bookingId}`, { status: newStatus })
            toast({
                title: "Success",
                description: `Booking ${newStatus.toLowerCase()} successfully.`,
            })
            fetchBookings() // Refresh the bookings list
        } catch (error) {
            console.error("Error updating booking status:", error)
            toast({
                title: "Error",
                description: "Failed to update booking status. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Manage Bookings</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex gap-4 items-center">
                    <Select value={statusFilter} onValueChange={(value: Booking["status"] | "ALL") => setStatusFilter(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center">Loading bookings...</div>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Property</TableHead>
                                <TableHead>Renter</TableHead>
                                <TableHead>Check-in</TableHead>
                                <TableHead>Check-out</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.map((booking, i) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{booking.property.title}</TableCell>
                                    <TableCell>{booking.renter.name}</TableCell>
                                    <TableCell>{format(new Date(booking.checkIn), "PP")}</TableCell>
                                    <TableCell>{format(new Date(booking.checkOut), "PP")}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${booking.status === "CONFIRMED"
                                                    ? "bg-green-100 text-green-800"
                                                    : booking.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedBooking(booking)
                                                            setActionType("CONFIRM")
                                                        }}
                                                        disabled={booking.status !== "PENDING"}
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Confirm
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to confirm this booking?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => selectedBooking && handleStatusChange(selectedBooking.id, "CONFIRMED")}
                                                        >
                                                            Confirm
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedBooking(booking)
                                                            setActionType("CANCEL")
                                                        }}
                                                        disabled={booking.status === "CANCELLED"}
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Cancel
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to cancel this booking?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>No</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => selectedBooking && handleStatusChange(selectedBooking.id, "CANCELLED")}
                                                        >
                                                            Yes, Cancel
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}