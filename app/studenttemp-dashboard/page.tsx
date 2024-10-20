"use client"
import React, { useState, useEffect } from 'react'
import { Calendar, Video, FileText, Menu, Clock, BookOpen, MessageSquare, BarChart4, Layers, User, Users } from 'lucide-react'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function StudentDashboard() {
    const [upcomingEvents, setUpcomingEvents] = useState([
        { id: 1, title: 'Math Class', date: '2023-06-15', time: '10:00 AM', link: 'https://zoom.us/j/123456789' },
        { id: 2, title: 'Science Lab', date: '2023-06-16', time: '2:00 PM', link: 'https://zoom.us/j/987654321' },
    ])
    const [recordings, setRecordings] = useState([
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
    const [subjects, setSubjects] = useState(['Math', 'Science', 'History'])
    const [activeTimer, setActiveTimer] = useState(null)
    const [timerStart, setTimerStart] = useState(null)
    const [studyHours, setStudyHours] = useState({ 'Math': 5, 'Science': 3, 'History': 2 })
    const [studyPlans, setStudyPlans] = useState([
        { id: 1, topic: 'Algebra Review', date: '2023-06-20' },
        { id: 2, topic: 'Chemistry Lab Prep', date: '2023-06-22' }
    ])
    const [mentorMessages, setMentorMessages] = useState([
        { sender: 'Mentor', content: 'How can I help you with your studies?' },
    ])
    const [adminMessages, setAdminMessages] = useState([
        { sender: 'VJ sir', content: 'Welcome to the program! Let me know if you have any questions.' },
    ])
    useEffect(() => {
        let timerInterval;
        if (activeTimer) {
            timerInterval = setInterval(() => {
                setStudyHours((timerStart + 1000)); // elapsed time in seconds
            }, 1000);
        } else {
            clearInterval(timerInterval);
        }
        return () => clearInterval(timerInterval);
    }, [activeTimer, timerStart]);
    const startTimer = (subject) => {
        setActiveTimer(subject)
        setTimerStart(Date.now())
    }

    const stopTimer = () => {
        if (activeTimer && timerStart) {
            const duration = (Date.now() - timerStart) / 1000 / 3600 // hours
            setStudyHours(prev => ({
                ...prev,
                [activeTimer]: (prev[activeTimer] || 0) + duration
            }))
            setActiveTimer(null)
            setTimerStart(null)
        }
    }

    const addStudyPlan = (topic, date) => {
        setStudyPlans([...studyPlans, { id: Date.now(), topic, date }])
    }

    const sendMentorMessage = (content) => {
        setMentorMessages([...mentorMessages, { sender: 'You', content }])
    }

    const sendAdminMessage = (content) => {
        setAdminMessages([...adminMessages, { sender: 'You', content }])
    }

    const Sidebar = React.forwardRef((props, ref) => (
        <div className={`bg-primary text-primary-foreground w-64 min-h-screen flex flex-col`} ref={ref}>
            <div className="p-4">
                <h2 className="text-2xl font-semibold">Student Panel</h2>
            </div>
            <nav className="flex-1 px-2 py-4">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-primary/80 rounded-md">
                    <Calendar className="mr-3 h-5 w-5" />
                    Upcoming Events
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <Video className="mr-3 h-5 w-5" />
                    Recordings
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <FileText className="mr-3 h-5 w-5" />
                    Notes
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <FileText className="mr-3 h-5 w-5" />
                    Practice Problems
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <Clock className="mr-3 h-5 w-5" />
                    Study Timer
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <BookOpen className="mr-3 h-5 w-5" />
                    Study Planner
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <User className="mr-3 h-5 w-5" />
                    Chat with Mentor
                </a>
                <a href="#" className="flex items-center px-4 py-2 mt-2 hover:bg-primary/80 rounded-md">
                    <Users className="mr-3 h-5 w-5" />
                    Chat with VJ sir
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
                            <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
                        </div>
                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
                            <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Study Hours</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {Object.values(studyHours).reduce((a, b) => a + b, 0).toFixed(1)}
                                    </div>
                                    <Progress
                                        value={Object.values(studyHours).reduce((a, b) => a + b, 0) / 0.2}
                                        className="w-full mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        +2.5 from last week
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Next: {upcomingEvents[0]?.title} on {upcomingEvents[0]?.date}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Study Plans</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{studyPlans.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Next: {studyPlans[0]?.topic} on {studyPlans[0]?.date}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Tabs defaultValue="events" className="space-y-20">
                            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                <TabsTrigger value="events" className="w-full">Upcoming Events</TabsTrigger>
                                <TabsTrigger value="recordings" className="w-full">Recordings</TabsTrigger>
                                <TabsTrigger value="notes" className="w-full">Notes</TabsTrigger>
                                <TabsTrigger value="problems" className="w-full">Practice Problems</TabsTrigger>
                                <TabsTrigger value="study-timer" className="w-full">Study Timer</TabsTrigger>
                                <TabsTrigger value="study-planner" className="w-full">Study Planner</TabsTrigger>
                                <TabsTrigger value="chat-mentor" className="w-full">Chat with Mentor</TabsTrigger>
                                <TabsTrigger value="chat-admin" className="w-full">Chat with VJ sir</TabsTrigger>
                            </TabsList>
                            <TabsContent value="events">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Events</CardTitle>
                                        <CardDescription>Your scheduled classes and meetings</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {upcomingEvents.map((event) => (
                                            <div key={event.id} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{event.title}</h3>
                                                <p>{event.date} at {event.time}</p>
                                                <Button className="mt-2" onClick={() => window.open(event.link, '_blank')}>Join Meeting</Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="recordings">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recorded Lectures</CardTitle>
                                        <CardDescription>Watch your recorded lectures</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {recordings.map((recording) => (
                                            <div key={recording.id} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{recording.title}</h3>
                                                <Button className="mt-2" onClick={() => window.open(recording.link, '_blank')}>Watch Lecture</Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="notes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notes</CardTitle>
                                        <CardDescription>Access your study notes</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {notes.map((note) => (
                                            <div key={note.id} className="mb-4 p-4 border rounded-lg">
                                                <h3 className="font-semibold">{note.title}</h3>
                                                <Button className="mt-2" onClick={() => window.open(note.link, '_blank')}>View Notes</Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="problems">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Practice Problems</CardTitle>
                                        <CardDescription>Access your practice problem sets</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {problems.map((problem) => (
                                            <div key={problem.id} className="mb-4 p-4 border rounded-lg">
                                                <h3  className="font-semibold">{problem.title}</h3>
                                                <Button className="mt-2" onClick={() => window.open(problem.link, '_blank')}>View Problems</Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="study-timer">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Study Timer</CardTitle>
                                        <CardDescription>Track your study time for each subject</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Select onValueChange={startTimer}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subjects.map((subject, index) => (
                                                        <SelectItem key={index} value={subject}>{subject}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {activeTimer && (
                                                <div className="text-center p-6 bg-primary/10 rounded-lg">
                                                    <h3 className="text-2xl font-bold mb-4">Currently Studying: {activeTimer}</h3>
                                                    <div className="text-4xl font-bold mb-4" id="timer">00:00:00</div>
                                                    <Button onClick={stopTimer} size="lg" className="w-full md:w-auto">Stop Timer</Button>
                                                </div>
                                            )}
                                            <div className="mt-8">
                                                <h3 className="font-semibold mb-4 text-lg">Your Study Progress</h3>
                                                {Object.entries(studyHours).map(([subject, hours]) => (
                                                    <div key={subject} className="mb-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-medium">{subject}</span>
                                                            <span>{hours.toFixed(2)} hours</span>
                                                        </div>
                                                        <Progress value={hours * 5} className="w-full h-2" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="study-planner">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Study Planner</CardTitle>
                                        <CardDescription>Plan your study content for the current month</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex space-x-2">
                                                <Input placeholder="Study topic" id="study-topic" />
                                                <Input type="date" id="study-date" />
                                                <Button onClick={() => addStudyPlan(
                                                    document.getElementById('study-topic').value,
                                                    document.getElementById('study-date').value
                                                )}>Add Plan</Button>
                                            </div>
                                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                                {studyPlans.map((plan) => (
                                                    <div key={plan.id} className="flex justify-between items-center py-2">
                                                        <span>{plan.topic}</span>
                                                        <span>{new Date(plan.date).toLocaleDateString()}</span>
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="chat-mentor">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Chat with Mentor</CardTitle>
                                        <CardDescription>Get help and guidance from your mentor</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                                {mentorMessages.map((message, index) => (
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
                                                <Input placeholder="Type your message..." id="mentor-chat-message" />
                                                <Button onClick={() => sendMentorMessage(document.getElementById('mentor-chat-message').value)}>Send</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="chat-admin">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Chat with VJ sir</CardTitle>
                                        <CardDescription>Communicate with the admin</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                                {adminMessages.map((message, index) => (
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
                                                <Input placeholder="Type your message..." id="admin-chat-message" />
                                                <Button onClick={() => sendAdminMessage(document.getElementById('admin-chat-message').value)}>Send</Button>
                                            </div>
                                        </div>
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