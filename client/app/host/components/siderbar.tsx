"use client"

import { useAuth } from "@/app/providers/auth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, Home, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth()

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    const handleSignOut = () => {
        logout()
    }

    return (
        <div className="fixed w-64 h-full bg-white border-r border-gray-200">
            <div className="flex flex-col h-full">
                <div className="p-6">
                    <Link href={"/"}>
                        <span className="text-2xl font-bold text-primary-500">LaLa</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4">
                    <div className="space-y-1">
                        <Link
                            href="/host/properties"
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/host/properties")
                                ? "text-primary-400 bg-primary-50"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Home className="w-5 h-5 mr-3" />
                            Properties
                        </Link>
                        <Link
                            href="/host/bookings"
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/host/bookings")
                                ? "text-primary-400 bg-primary-50"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Calendar className="w-5 h-5 mr-3" />
                            Bookings
                        </Link>
                        <Link
                            href="/host/settings"
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/host/settings")
                                ? "text-primary-400 bg-primary-50"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Settings className="w-5 h-5 mr-3" />
                            Settings
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t">
                    <AlertDialog>
                        <AlertDialogTrigger className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md w-full">
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to Sign Out?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </div>
    );
}