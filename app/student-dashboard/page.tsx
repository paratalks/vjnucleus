"use client"
import React, {useEffect, useState} from 'react'
import { Calendar, Video, FileText, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {account, databases} from "@/lib/appwrite"
import {getCookie} from "@/lib/cookies";
import {redirect} from "next/navigation";
export default function StudentDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [upcomingEvents, setUpcomingEvents] = useState([{}])
    const [recordings, setRecording] = useState([{}])
    const [loading, setLoading] = useState({events: true, recordings:true, notes:true, practice:true})
    // Mock data for demonstration
    databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "", process.env.NEXT_PUBLIC_APPWRITE_EVENT_COLLECTION_ID || "").then(res => {
        setLoading({...loading, events: false})
        return setUpcomingEvents(res.documents)
    })

    databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "", process.env.NEXT_PUBLIC_APPWRITE_RECORDING_COLLECTION_ID || "").then(res => {
        setLoading({...loading, recordings: false})
        return setRecording(res.documents)
    })


    const notes = [
        {id: 1, title: 'Calculus Notes', link: 'https://example.com/calculus-notes.pdf'},
        {id: 2, title: 'Physics Formulas', link: 'https://example.com/physics-formulas.pdf'},
    ]

    const problems = [
        {id: 1, title: 'Algebra Practice Set', link: 'https://example.com/algebra-problems.pdf'},
        {id: 2, title: 'Chemistry Equations', link: 'https://example.com/chemistry-equations.pdf'},
    ]
    useEffect(() => {
        (async ()=>{
            console.log(await account.getSession(
                'current' // sessionId
            ))
            const user =  await account.get();
        if(!user)
            redirect("/signin")
        })()
    }, []);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Student Panel</h2>
                </div>
                <nav className="flex-1 px-2 py-4 bg-gray-800">
                    <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                        <Calendar className="mr-3 h-5 w-5"/>
                        Upcoming Events
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <Video className="mr-3 h-5 w-5"/>
                        Recordings
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <FileText className="mr-3 h-5 w-5"/>
                        Notes
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <FileText className="mr-3 h-5 w-5"/>
                        Practice Problems
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu className="h-6 w-6"/>
                        </Button>
                        <h1 className="text-lg font-semibold text-gray-900">Student Dashboard</h1>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Tabs defaultValue="events" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                                <TabsTrigger value="recordings">Recordings</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                                <TabsTrigger value="problems">Practice Problems</TabsTrigger>
                            </TabsList>
                            <TabsContent value="events">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Events</CardTitle>
                                        <CardDescription>Your scheduled classes and meetings</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {upcomingEvents.map((event:any, index) => (
                                            <div key={index} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{loading.events ? "Loading...." : event.title}</h3>
                                                <p>{event.date} at {event.time}</p>
                                                <Button
                                                    className="mt-2"
                                                    onClick={() => {
                                                        const now = new Date();
                                                        const eventDate = new Date(`${event.date}T${event.time}`);
                                                        if (now >= eventDate) {

                                                            window.open(event.meetingLink, '_blank');
                                                        } else {
                                                            alert("This event hasn't started yet.");
                                                        }
                                                    }}
                                                >
                                                    Join Meeting
                                                </Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="recordings">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recorded Lectures</CardTitle>
                                        <CardDescription>Watch previous lectures</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {recordings.map((recording:any, index) => (
                                            <div key={index} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{loading.recordings ? "Loading..." : recording.title}</h3>
                                                <Button
                                                    className="mt-2"
                                                    onClick={() => window.open(recording.recordingLink, '_blank')}
                                                >
                                                    Watch Lecture
                                                </Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="notes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Handwritten Notes</CardTitle>
                                        <CardDescription>Access your study materials</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {notes.map((note) => (
                                            <div key={note.id} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{note.title}</h3>
                                                <Button
                                                    className="mt-2"
                                                    onClick={() => window.open(note.link, '_blank')}
                                                >
                                                    View Notes
                                                </Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="problems">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Practice Problems</CardTitle>
                                        <CardDescription>Sharpen your skills with these exercises</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {problems.map((problem) => (
                                            <div key={problem.id} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{problem.title}</h3>
                                                <Button
                                                    className="mt-2"
                                                    onClick={() => window.open(problem.link, '_blank')}
                                                >
                                                    View Problems
                                                </Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    )
}