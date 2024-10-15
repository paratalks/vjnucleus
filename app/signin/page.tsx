'use client'

import {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {account, databases, ID} from "@/lib/appwrite";
import {Query} from "appwrite";
import {redirect} from "next/navigation";
import {setCookie} from "@/lib/cookies";

export default function PhoneSignIn() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [userId, setUserId] = useState("")
    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        console.log(await account.deleteSession(
            'current' // sessionId
        ).then(()=>{return "deleted"}).catch(()=>{return "didn't found any session"}))
        try {
            // Simulate API call to send OTP
            const token = await account.createPhoneToken(
                ID.unique(),
                phoneNumber
            );
            setUserId(token.userId);
            setIsOtpDialogOpen(true)
        } catch (err) {
            setError('Failed to send OTP. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call to verify OTP
            const session = await account.createSession(
                userId,
                otp
            ).then((res) => {return res}).catch((err) => {
                alert("Error Verifying Otp! Try Again Later!")
                setError("Error Verifying Otp! Try Again Later!")
                return null
            });
            if(!session)
               return setError("Error Verifying Otp! Try Again Later!")
            // const userExist = await databases.listDocuments(
            //     process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
            //     process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "",
            //     [
            //         Query.equal("phone", phoneNumber.toString())
            //     ]
            // ).then((res) => {return res}).catch((err) => {
            //     setError("You have not purchased the mentorship!")
            //     return null
            // });
            // if(!userExist)
            // {
            //     alert("You have not purchased the mentorship!")
            //     return setError("You have not purchased the mentorship!")
            // }
            setSuccess(true)
            setOtp("")
            setIsOtpDialogOpen(false)

            setTimeout(() => {
               redirect("/student-dashboard")
            }, 500)
        } catch (err) {
            setError('Invalid OTP. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
                    <div>
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                            id="phone-number"
                            name="phone"
                            type="tel"
                            required
                            className="mt-1"
                            placeholder="+1 (555) 000-0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                </form>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert>
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>You have successfully signed in! Redirecting to dashboard!! </AlertDescription>
                    </Alert>
                )}

                <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter OTP</DialogTitle>
                            <DialogDescription>
                                {`We've sent a one-time password to your phone. Please enter it below.`}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleOtpSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="otp">One-Time Password</Label>
                                <Input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    className="mt-1"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify OTP'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}