"use client"
import React, { useState } from 'react'
import { Calendar, Clock, Upload, FileText, UserPlus, Menu, Users, MessageSquare, BookOpen, PlusCircle, BarChart4, Layers, GraduationCap } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {createEvents} from "@/action/events.action";
import {router} from "next/client";
import {createAgoraChannel} from "@/components/agoraClient";
import {RtcTokenBuilder} from "agora-access-token";
import {redirect} from "next/navigation";

export default function AdminDashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [fetchedFormData, setFetchedFormData] = useState({
        title: "",
        date: "",
        time: "",
        meetingLink: ""
    })
    const [fetchedRecordingData, setFetchedRecordingData] = useState({
        title: "",
        description: "",
        recordingLink: ""
    })

    const [events, setEvents] = useState([
        { id: 1, title: 'Math Class', date: '2023-06-15', time: '10:00 AM', link: 'https://zoom.us/j/123456789' },
        { id: 2, title: 'Science Lab', date: '2023-06-16', time: '2:00 PM', link: 'https://zoom.us/j/987654321' },
    ])
    const [lectures, setLectures] = useState([
        { id: 1, title: 'Introduction to Algebra', link: 'https://youtube.com/watch?v=abc123' },
        { id: 2, title: 'Chemistry Basics', link: 'https://youtube.com/watch?v=def456' },
    ])
    const [notes, setNotes] = useState([
        { id: 1, title: 'Calculus Notes', link: 'https://example.com/calculus-notes.pdf' },
        { id: 2, title: 'Physics Formulas', link: 'https://example.com/physics-formulas.pdf' },
    ])
    const [problems, setProblems] = useState([
        { id: 1, title: 'Algebra Practice Set', link: 'https://example.com/algebra-problems.pdf' },
        { id: 2, title: 'Chemistry Equations', link: 'https://example.com/chemistry-equations.pdf' },
    ])
    const [students, setStudents] = useState([
        { id: 1, name: 'Vikash', email: 'alice@example.com', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 2, name: 'Yash', email: 'bob@example.com', avatar: '/placeholder.svg?height=40&width=40' },
    ])
    const [subjects, setSubjects] = useState(['Math', 'Science', 'History'])
    const [mentors, setMentors] = useState([
        { id: 1, name: 'John Doe', role: 'Math Tutor', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 2, name: 'Jane Smith', role: 'Science Teacher', avatar: '/placeholder.svg?height=40&width=40' },
    ])
    const [studyHours, setStudyHours] = useState([
        { student: 'Vikash', subject: 'Math', hours: 10 },
        { student: 'Yash', subject: 'Science', hours: 8 },
    ])
    const [messages, setMessages] = useState([
        { sender: 'Vikash', content: 'Hello, I have a question about the math homework.' },
        { sender: 'John Doe', content: 'Sure, what\'s your question?' },
    ])
    const [personalMessages, setPersonalMessages] = useState([
        { id: 1, sender: 'Vikash', content: 'Hello VJ sir, I have a question about the program.', timestamp: '2023-06-14 10:30 AM' },
        { id: 2, sender: 'Yash', content: 'Can we discuss my progress in the next meeting?', timestamp: '2023-06-14 02:45 PM' },
    ])

    const handleSubmit = async (endpoint, data) => {
        // Placeholder for API call
        console.log(`Submitting to ${endpoint}:`, data)
        // Update local state based on the endpoint
        switch (endpoint) {
            case 'events':
                setEvents([...events, { id: Date.now(), ...data }])
                break
            case 'lectures':
                setLectures([...lectures, { id: Date.now(), ...data }])
                break
            case 'notes':
                setNotes([...notes, { id: Date.now(), ...data }])
                break
            case 'problems':
                setProblems([...problems, { id: Date.now(), ...data }])
                break
            case 'students':
                setStudents([...students, { id: Date.now(), ...data, avatar: '/placeholder.svg?height=40&width=40' }])
                break
            case 'subjects':
                setSubjects([...subjects, data.name])
                break
            case 'mentors':
                setMentors([...mentors, { id: Date.now(), ...data, avatar: '/placeholder.svg?height=40&width=40' }])
                break
            case 'messages':
                setMessages([...messages, { sender: 'Admin', content: data.message }])
                break
        }
    }

    const Sidebar = React.forwardRef((props, ref) => (
        <div className={`bg-primary text-primary-foreground w-64 min-h-screen flex flex-col`} ref={ref}>
            <div className="p-4">
                <h2 className="text-2xl font-semibold">Admin Panel</h2>
            </div>
            <nav className="flex-1 px-2 py-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-primary/80 rounded-md">
                    <Calendar className="mr-3 h-5 w-5" />
                    Schedule Event
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <Upload className="mr-3 h-5 w-5" />
                    Upload Lecture
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <FileText className="mr-3 h-5 w-5" />
                    Upload Notes
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <FileText className="mr-3 h-5 w-5" />
                    Upload Problems
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <UserPlus className="mr-3 h-5 w-5" />
                    Add Student
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <BookOpen className="mr-3 h-5 w-5" />
                    Manage Subjects
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <Users className="mr-3 h-5 w-5" />
                    Manage Mentors
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <Clock className="mr-3 h-5 w-5" />
                    Study Hours
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Group Chat
                </a>
            </nav>
        </div>
    ))

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for larger screens */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden mr-2">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Toggle sidebar</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0">
                                    <Sidebar />
                                </SheetContent>
                            </Sheet>
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                        </div>
                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{students.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +2 from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{subjects.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +1 from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Study Hours</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {studyHours.reduce((total, entry) => total + entry.hours, 0)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +5 from last week
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Tabs defaultValue="schedule" className="space-y-36">
                            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                <TabsTrigger value="schedule" className="w-full">Next Mentorship Event</TabsTrigger>
                                <TabsTrigger value="upload-lecture" className="w-full">Upload Recording</TabsTrigger>
                                <TabsTrigger value="upload-notes" className="w-full">Upload Notes</TabsTrigger>
                                <TabsTrigger value="upload-problems" className="w-full">Upload Problems</TabsTrigger>
                                <TabsTrigger value="add-student" className="w-full">Add Student</TabsTrigger>
                                <TabsTrigger value="manage-subjects" className="w-full">Manage Subjects</TabsTrigger>
                                <TabsTrigger value="manage-mentors" className="w-full">Manage Mentors</TabsTrigger>
                                <TabsTrigger value="study-hours" className="w-full">Study Hours</TabsTrigger>
                                <TabsTrigger value="group-chat" className="w-full">Group Chat</TabsTrigger>
                                <TabsTrigger value="personal-messages" className="w-full">Personal Messages</TabsTrigger>
                            </TabsList>
                            <TabsContent value="schedule">
                                <Card>
                                    <form onSubmit={async (event) => {
                                        event.preventDefault()
                                        const formData = new FormData(event.currentTarget)
                                        createEvents({
                                            "title": formData.get("event-title")?.toString(),
                                            "date": `${formData.get("event-date")?.toString()}`,
                                            "time": `${formData.get("event-time")?.toString()}`,
                                            "meetingLink": formData.get("event-link")?.toString()
                                        })
                                        alert("Event Scheduled")
                                        setFetchedFormData({
                                            title: "",
                                            date: "",
                                            time: "",
                                            meetingLink: ""
                                        })
                                        const channelName = formData.get("event-title")?.toString().replace(" ","");
                                        const res = await fetch('/api/agoraToken', {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({channelName}),
                                        });


                                        const appID = "c5af9e26314f4cd4bf23280881e8c857";
                                        const appCertificate = "87b169e595ce4e7fb1fae7cae93c5910";
                                        const expirationTimeInSeconds = 3600; // 1 hour
                                        const role = 1; // Admin role

                                        const token = RtcTokenBuilder.buildTokenWithUid(
                                            "c5af9e26314f4cd4bf23280881e8c857", "87b169e595ce4e7fb1fae7cae93c5910", channelName!, 0, role, expirationTimeInSeconds
                                        );

                                        // Create the channel with Agora SDK

                                        // Redirect admin to the video page with channel details
                                        redirect(`/channel/1stEvent`);
                                    }}>
                                        <CardHeader>
                                            <CardTitle>Next Mentorship Event</CardTitle>
                                            <CardDescription>Schedule a new event for students</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="event-title">Event Title</Label>
                                                <Input id="event-title" name={"event-title"} value={fetchedFormData.title} placeholder="Enter event title" onChange={(e) => {setFetchedFormData({...fetchedFormData, title: e.currentTarget.value})}}/>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="event-date">Event Date</Label>
                                                <Input  id="event-date" name={"event-date"} value={fetchedFormData.date}  type="date" onChange={(e) => {setFetchedFormData({...fetchedFormData, date: e.currentTarget.value})}}/>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="event-time">Event Time</Label>
                                                <Input id="event-time" name={"event-time"} value={fetchedFormData.time}  type="time" onChange={(e) => {setFetchedFormData({...fetchedFormData, time: e.currentTarget.value})}}/>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="event-link">Meeting Link</Label>
                                                <Input id="event-link" name={"event-link"} value={fetchedFormData.meetingLink}  placeholder="Enter meeting link" onChange={(e) => {setFetchedFormData({...fetchedFormData, meetingLink: e.currentTarget.value})}}/>
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
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const formData = new FormData(event.currentTarget)
                                        createEvents({
                                            "title": formData.get("event-title")?.toString(),
                                            "date": `${formData.get("event-date")?.toString()}`,
                                            "time": `${formData.get("event-time")?.toString()}`,
                                            "meetingLink": formData.get("event-link")?.toString()
                                        })
                                        alert("Event Scheduled")
                                        setFetchedFormData({
                                            title: "",
                                            date: "",
                                            time: "",
                                            meetingLink: ""
                                        })
                                    }}>
                                    <CardHeader>
                                        <CardTitle>Upload Recording</CardTitle>
                                        <CardDescription>Upload a new recording</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="lecture-title">Lecture Title</Label>
                                            <Input id="lecture-title" placeholder="Enter lecture title"/>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="lecture-link">Lecture Link</Label>
                                            <Input id="lecture-link" placeholder="Enter lecture link" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type={"submit"}>Upload Lecture</Button>
                                    </CardFooter>
                                    </form>
                                </Card>
                            </TabsContent>
                            <TabsContent value="upload-notes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Notes</CardTitle>
                                        <CardDescription>Upload new study notes</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="notes-title">Notes Title</Label>
                                            <Input id="notes-title" placeholder="Enter notes title" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="notes-link">Notes Link</Label>
                                            <Input id="notes-link" placeholder="Enter notes link" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => handleSubmit('notes', {
                                            title: document.getElementById('notes-title').value,
                                            link: document.getElementById('notes-link').value,
                                        })}>Upload Notes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="upload-problems">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Problems</CardTitle>
                                        <CardDescription>Upload new practice problems</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="problems-title">Problems Set Title</Label>
                                            <Input id="problems-title" placeholder="Enter problems set title" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="problems-link">Problems Link</Label>
                                            <Input id="problems-link" placeholder="Enter problems link" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => handleSubmit('problems', {
                                            title: document.getElementById('problems-title').value,
                                            link: document.getElementById('problems-link').value,
                                        })}>Upload Problems</Button>
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
                                            <Label htmlFor="student-name">Student Name</Label>
                                            <Input id="student-name" placeholder="Enter student name" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="student-email">Student Email</Label>
                                            <Input id="student-email" type="email" placeholder="Enter student email" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => handleSubmit('students', {
                                            name: document.getElementById('student-name').value,
                                            email: document.getElementById('student-email').value,
                                        })}>Add Student</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="manage-subjects">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Manage Subjects</CardTitle>
                                        <CardDescription>Add or remove subjects for study tracking</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Input placeholder="Enter subject name" id="new-subject" />
                                                <Button onClick={() => handleSubmit('subjects', { name: document.getElementById('new-subject').value })}>
                                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
                                                </Button>
                                            </div>
                                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                                {subjects.map((subject, index) => (
                                                    <div key={index} className="flex items-center justify-between py-2">
                                                        <span>{subject}</span>
                                                        <Button variant="destructive" size="sm" onClick={() => {
                                                            const newSubjects = subjects.filter((_, i) => i !== index)
                                                            setSubjects(newSubjects)
                                                        }}>Remove</Button>
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="manage-mentors">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Manage Mentors</CardTitle>
                                        <CardDescription>Add or remove mentors and assign roles</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-3 gap-4">
                                                <Input placeholder="Mentor Name" id="mentor-name" />
                                                <Input placeholder="Mentor Email" id="mentor-email" />
                                                <Select id="mentor-role">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="subject-expert">Subject Expert</SelectItem>
                                                        <SelectItem value="career-counselor">Career Counselor</SelectItem>
                                                        <SelectItem value="academic-advisor">Academic Advisor</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button onClick={() => handleSubmit('mentors', {
                                                name: document.getElementById('mentor-name').value,
                                                email: document.getElementById('mentor-email').value,
                                                role: document.getElementById('mentor-role').value,
                                            })}>
                                                <PlusCircle className="mr-2 h-4 w-4" /> Add Mentor
                                            </Button>
                                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                                {mentors.map((mentor, index) => (
                                                    <div key={index} className="flex items-center justify-between py-2">
                                                        <div className="flex items-center">
                                                            <Avatar className="h-8 w-8 mr-2">
                                                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                                                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <span>{mentor.name} - {mentor.role}</span>
                                                        </div>
                                                        <Button variant="destructive" size="sm" onClick={() => {
                                                            const newMentors = mentors.filter((_, i) => i !== index)
                                                            setMentors(newMentors)
                                                        }}>Remove</Button>
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="study-hours">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Student Study Hours</CardTitle>
                                        <CardDescription>View study hours for each student by subject</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                                            {studyHours.map((entry, index) => (
                                                <div key={index} className="py-2">
                                                    <h3 className="font-semibold">{entry.student}</h3>
                                                    <div className="flex justify-between items-center ml-4">
                                                        <span>{entry.subject}:</span>
                                                        <div className="flex items-center">
                                                            <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                                                                <div
                                                                    className="h-full bg-primary rounded-full"
                                                                    style={{ width: `${(entry.hours / 20) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span>{entry.hours} hours</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="group-chat">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Group Chat</CardTitle>
                                        <CardDescription>Communicate with students and mentors</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                                {messages.map((message, index) => (
                                                    <div key={index} className="mb-2 flex items-start">
                                                        <Avatar className="h-8 w-8 mr-2">
                                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.sender} />
                                                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <span className="font-semibold">{message.sender}: </span>
                                                            <span>{message.content}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                            <div className="flex space-x-2">
                                                <Input placeholder="Type your message..." id="chat-message" />
                                                <Button onClick={() => handleSubmit('messages', { message: document.getElementById('chat-message').value })}>Send</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="personal-messages">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Messages</CardTitle>
                                        <CardDescription>View messages sent directly to you</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                                            {personalMessages.map((message) => (
                                                <div key={message.id} className="mb-4 p-4 border rounded-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-semibold">{message.sender}</h3>
                                                        <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                                                    </div>
                                                    <p>{message.content}</p>
                                                    <Button className="mt-2">Reply</Button>
                                                </div>
                                            ))}
                                        </ScrollArea>
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