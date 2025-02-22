"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import axios from "@/lib/axios"
import { useToast } from "@/hooks/use-toast"
import type { Property } from "@/app/lib/@types"
import PropertyItem from "../../components/property-item"

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be at least 0"),
    location: z.string().min(1, "Location is required"),
    guests: z.number().int().min(1, "Guests must be at least 1"),
    image: z
        .custom<File>((value) => value instanceof File, {
            message: "Image is required",
        })
        .optional()
        .or(z.string()),
})

const Properties = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingProperty, setEditingProperty] = useState<Property | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onBlur",
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            guests: 0,
            price: 0,
        },
    })

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        try {
            const response = await axios.get("/properties")
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

    const uploadImage = async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await axios.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            return response.data.url
        } catch (error) {
            console.error("Error uploading image:", error)
            throw new Error("Failed to upload image")
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            let imageUrl = values.image
            if (values.image instanceof File) {
                imageUrl = await uploadImage(values.image)
            }
            delete values.image
            const propertyData = {
                ...values,
                imageUrl,
            }

            if (editingProperty) {
                await axios.put(`/properties/${editingProperty.id}`, propertyData)
                toast({
                    title: "Success",
                    description: "Property updated successfully",
                })
            } else {
                await axios.post("/properties", propertyData)
                toast({
                    title: "Success",
                    description: "Property created successfully",
                })
            }

            fetchProperties()
            form.reset()
            setEditingProperty(null)
            setIsDialogOpen(false)
        } catch (error) {
            console.error("Error submitting property:", error)
            toast({
                title: "Error",
                description: "Failed to submit property. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleEdit = (property: Property) => {
        setEditingProperty(property)
        form.reset({
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            guests: property.guests,
            image: property.imageUrl,
        })
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/properties/${id}`)
            toast({
                title: "Success",
                description: "Property deleted successfully",
            })
            fetchProperties()
        } catch (error) {
            console.error("Error deleting property:", error)
            toast({
                title: "Error",
                description: "Failed to delete property. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your Properties</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage your rental properties</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="flex items-center px-4 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500">
                                <Plus className="w-5 h-5 mr-2" />
                                Add Property
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>{editingProperty ? "Edit Property" : "Add a new property"}</DialogTitle>
                                <DialogDescription>Fill in the property details</DialogDescription>
                            </DialogHeader>
                            <div className="">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Property Image</FormLabel>
                                                    <FormControl>
                                                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Title */}
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Property title" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Description */}
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Short description" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Price */}
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price (RWF)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Enter price"
                                                                {...field}
                                                                onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Location */}
                                            <FormField
                                                control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Location</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="City or address" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Guests */}
                                            <FormField
                                                control={form.control}
                                                name="guests"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Guests</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Number of guests"
                                                                {...field}
                                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Submit Button - Full Width */}
                                        <div className="col-span-1 md:col-span-2 flex justify-end mt-3">
                                            <Button type="submit">{editingProperty ? "Update" : "Submit"}</Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {isLoading ? (
                    <div>Loading properties...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <div key={property.id} className="relative">
                                <PropertyItem {...property} />
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => handleEdit(property)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the property.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(property.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                        {properties.length === 0 && <span className="font-light text-gray-600">Your properties will appear here</span>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Properties