"use client"
import React, { useState } from 'react'
import { Calendar, Clock, Upload, FileText, UserPlus, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {createEvents} from "@/action/events.action";

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [fetchedFormData, setFetchedFormData] = useState({
        title: "",
        date: "",
        time: "",
        meetingLink: ""
    })

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
                </div>
                <nav className="flex-1 px-2 py-4 bg-gray-800">
                    <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                        <Calendar className="mr-3 h-5 w-5" />
                        Schedule Event
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <Upload className="mr-3 h-5 w-5" />
                        Upload Lecture
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <FileText className="mr-3 h-5 w-5" />
                        Upload Notes
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <FileText className="mr-3 h-5 w-5" />
                        Upload Problems
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <UserPlus className="mr-3 h-5 w-5" />
                        Add Student
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
                            <Menu className="h-6 w-6" />
                        </Button>
                        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Tabs defaultValue="schedule" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="schedule">Schedule Event</TabsTrigger>
                                <TabsTrigger value="upload-lecture">Upload Lecture</TabsTrigger>
                                <TabsTrigger value="upload-notes">Upload Notes</TabsTrigger>
                                <TabsTrigger value="upload-problems">Upload Problems</TabsTrigger>
                                <TabsTrigger value="add-student">Add Student</TabsTrigger>
                            </TabsList>
                            <TabsContent value="schedule">
                                <Card>
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const formData = new FormData(event.currentTarget)
                                        createEvents({"title" : formData.get("event-title")?.toString(), "date": `${formData.get("event-date")?.toString()}`, "time": `${formData.get("event-time")?.toString()}`, "meetingLink": formData.get("event-link")?.toString()})
                                        alert("Event Scheduled")
                                        setFetchedFormData({
                                            title: "",
                                            date: "",
                                            time: "",
                                            meetingLink: ""
                                        })
                                    }}>

                                        <CardHeader>
                                            <CardTitle>Schedule Event</CardTitle>
                                            <CardDescription>Schedule a new event for students</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="event-title">Event Title</Label>
                                                <Input id="event-title" placeholder="Enter event title" name={"event-title"}
                                                       value={fetchedFormData.title} onChange={(t) => {setFetchedFormData({...fetchedFormData, title:t.currentTarget.value})}}/>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="event-date">Event Date</Label>
                                                <Input value={fetchedFormData.date} id="event-date" type="date" name={"event-date"} onChange={(t) => {setFetchedFormData({...fetchedFormData, date:t.currentTarget.value})}} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="event-time">Event Time</Label>
                                                <Input value={fetchedFormData.time} id="event-time" type="time" name={"event-time"} onChange={(t) => {setFetchedFormData({...fetchedFormData, time:t.currentTarget.value})}} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="event-link">Meeting Link</Label>
                                                <Input value={fetchedFormData.meetingLink} id="event-link" name={"event-link"} placeholder="Enter meeting link" onChange={(t) => {setFetchedFormData({...fetchedFormData, meetingLink:t.currentTarget.value})}} />
                                            </div>

                                </CardContent>
                                <CardFooter>
                                    <Button type={"submit"}>Schedule Event</Button>
                                    </CardFooter>
                                    </form>
                                </Card>
                            </TabsContent>
                            <TabsContent value="upload-lecture">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Lecture</CardTitle>
                                        <CardDescription>Upload a recorded lecture link</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="lecture-title">Lecture Title</Label>
                                            <Input id="lecture-title" placeholder="Enter lecture title" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="lecture-link">Lecture Link</Label>
                                            <Input id="lecture-link" placeholder="Enter lecture link" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="lecture-description">Description</Label>
                                            <Textarea id="lecture-description" placeholder="Enter lecture description" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Upload Lecture</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="upload-notes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Notes</CardTitle>
                                        <CardDescription>Upload handwritten notes in PDF format</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="notes-title">Notes Title</Label>
                                            <Input id="notes-title" placeholder="Enter notes title" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="notes-file">PDF File</Label>
                                            <Input id="notes-file" type="file" accept=".pdf" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Upload Notes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="upload-problems">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Problems</CardTitle>
                                        <CardDescription>Upload practice problem PDFs</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="problems-title">Problems Title</Label>
                                            <Input id="problems-title" placeholder="Enter problems title" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="problems-file">PDF File</Label>
                                            <Input id="problems-file" type="file" accept=".pdf" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Upload Problems</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="add-student">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Add Student</CardTitle>
                                        <CardDescription>Add a new student to the system</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="student-name">Name</Label>
                                            <Input id="student-name" placeholder="Enter student name" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="student-email">Email</Label>
                                            <Input id="student-email" type="email" placeholder="Enter student email" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="student-phone">Phone</Label>
                                            <Input id="student-phone" placeholder="Enter student phone number" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Add Student</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    )
}