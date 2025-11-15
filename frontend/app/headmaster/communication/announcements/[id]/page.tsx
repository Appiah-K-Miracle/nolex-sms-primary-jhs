"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Printer, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  Users, 
  Eye, 
  MessageSquare, 
  Bell,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Megaphone,
  Send,
  Target,
  BarChart3,
  TrendingUp,
  Star,
  ThumbsUp,
  BookOpen,
  Globe
} from "lucide-react";

export default function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [announcementDetail, setAnnouncementDetail] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample detailed announcement data based on ID (Multiple comprehensive entries)
  const announcementDatabase = {
    "1": {
      id: 1,
      title: "End of Term Examination Schedule",
      content: `Dear Students and Parents,

We are pleased to announce the upcoming End of Term Examination schedule for the current academic term. Please take note of the following important details:

**Examination Period:**
- Start Date: November 20, 2025
- End Date: December 5, 2025
- Duration: 2 weeks

**Examination Guidelines:**
1. All students must arrive at school 30 minutes before their scheduled examination time
2. Students should bring their own writing materials (pens, pencils, erasers, rulers)
3. Electronic devices are strictly prohibited in the examination hall
4. Late arrival will not be accommodated - punctuality is essential

**Subject Schedule:**
- Mathematics: November 20, 2025 (9:00 AM - 11:00 AM)
- English Language: November 21, 2025 (9:00 AM - 11:00 AM)
- Science: November 22, 2025 (9:00 AM - 11:00 AM)
- Social Studies: November 25, 2025 (9:00 AM - 11:00 AM)
- Additional subjects will be announced separately

**Result Publication:**
Examination results will be available on the school portal by December 15, 2025. Parents will receive SMS notifications when results are ready for viewing.

For any questions or concerns regarding the examination schedule, please contact the academic office or your child's class teacher.

Best regards,
The Academic Team
Nolex Primary & JHS`,
      type: "Academic",
      status: "published",
      audience: "Students & Parents",
      createdBy: "Headmaster",
      createdDate: "2025-11-01",
      publishDate: "2025-11-02",
      lastModified: "2025-11-02",
      views: 234,
      priority: "high",
      
      // Additional metrics
      totalRecipients: 450,
      readRecipients: 234,
      clickThroughs: 45,
      engagement: 52.0,
      
      // Audience breakdown
      audienceBreakdown: {
        students: 180,
        parents: 270,
        teachers: 35,
        staff: 15
      },
      
      // View analytics
      viewsByDate: [
        { date: "2025-11-02", views: 78 },
        { date: "2025-11-03", views: 156 },
        { date: "2025-11-04", views: 234 }
      ],
      
      // Engagement data
      reactions: {
        helpful: 23,
        important: 45,
        questions: 8
      },
      
      // Comments/feedback
      comments: [
        {
          id: 1,
          author: "Mrs. Jane Doe",
          role: "Parent",
          message: "Thank you for the detailed schedule. Could you please clarify the reporting time for Form 3 students?",
          timestamp: "2025-11-03 14:30",
          replied: true
        },
        {
          id: 2,
          author: "Mr. John Smith", 
          role: "Parent",
          message: "This is very helpful. Will there be any makeup exams for students who miss due to illness?",
          timestamp: "2025-11-03 16:45",
          replied: false
        },
        {
          id: 3,
          author: "Sarah Wilson",
          role: "Student",
          message: "What time should Form 2 students arrive for the Mathematics exam?",
          timestamp: "2025-11-04 09:15",
          replied: true
        }
      ],
      
      attachments: [
        {
          id: 1,
          name: "Examination_Timetable_2025.pdf",
          size: "245 KB",
          type: "PDF",
          downloadCount: 89
        },
        {
          id: 2,
          name: "Exam_Guidelines.docx",
          size: "128 KB", 
          type: "Word Document",
          downloadCount: 34
        }
      ],
      
      relatedAnnouncements: [
        {
          id: 4,
          title: "Examination Preparation Tips",
          type: "Academic",
          publishDate: "2025-10-28"
        },
        {
          id: 5,
          title: "Term Break Schedule",
          type: "Academic", 
          publishDate: "2025-10-25"
        }
      ]
    },
    
    "2": {
      id: 2,
      title: "PTA Meeting Announcement",
      content: `Dear Parents and Guardians,

The monthly Parent-Teacher Association (PTA) meeting has been scheduled for November 15th, 2025. Your participation is crucial for the continued development and improvement of our school.

**Meeting Details:**
- Date: November 15, 2025
- Time: 6:00 PM - 8:00 PM
- Venue: School Assembly Hall
- Refreshments will be provided

**Agenda:**
1. Welcome and Opening Remarks
2. Principal's Report
3. Academic Performance Review
4. Infrastructure Development Updates
5. Student Welfare Initiatives
6. Financial Report
7. Questions and Open Discussion
8. Closing Remarks

**Important Topics:**
- Review of students' academic progress this term
- Discussion on upcoming school events and activities
- Proposal for new computer laboratory equipment
- Parent feedback on school meals program
- Planning for the annual sports day

We encourage all parents to attend this important meeting. Your input and suggestions are valuable in helping us provide the best education for your children.

Please confirm your attendance by calling the school office or sending a message through the school portal.

Thank you for your continued support.

Best regards,
PTA Executive Committee
Nolex Primary & JHS`,
      type: "General",
      status: "scheduled",
      audience: "Parents",
      createdBy: "Admin",
      createdDate: "2025-11-01",
      publishDate: "2025-11-10",
      lastModified: "2025-11-01",
      views: 0,
      priority: "medium",
      totalRecipients: 270,
      readRecipients: 0,
      clickThroughs: 0,
      engagement: 0,
      audienceBreakdown: {
        parents: 270
      },
      viewsByDate: [],
      reactions: {
        helpful: 0,
        important: 0,
        questions: 0
      },
      comments: [],
      attachments: [
        {
          id: 3,
          name: "PTA_Meeting_Agenda.pdf",
          size: "156 KB",
          type: "PDF",
          downloadCount: 0
        }
      ],
      relatedAnnouncements: []
    },
    
    "3": {
      id: 3,
      title: "New Uniform Policy Implementation",
      content: `Dear Students and Parents,

The School Management is pleased to announce the implementation of updated uniform policies effective from the beginning of Term 2, 2026.

**New Uniform Requirements:**

**For Boys:**
- White long-sleeved shirt with school crest
- Navy blue trousers (no tight-fitting styles)
- Black leather shoes (no sneakers or canvas shoes)
- Navy blue school tie with school colors
- Navy blue pullover/cardigan (optional during cold weather)
- White socks

**For Girls:**
- White long-sleeved blouse with school crest
- Navy blue pleated skirt (knee-length)
- Black leather shoes (low heel, no sneakers)
- Navy blue school tie with school colors
- Navy blue pullover/cardigan (optional during cold weather)
- White socks or navy blue tights

**Sports Uniform:**
- School branded t-shirt and shorts
- White sports socks
- White canvas shoes or sports trainers

**Implementation Timeline:**
- **November 2025:** Uniform ordering begins
- **December 2025:** Distribution of new uniforms
- **January 2026:** Full implementation (start of Term 2)

**Uniform Suppliers:**
Approved suppliers list will be shared with parents by November 20th, 2025.

**Financial Assistance:**
The school will provide support for families who need assistance with uniform costs. Please contact the Bursar's office confidentially.

**Current Uniform Policy:**
Students may continue wearing current uniforms until the end of Term 1, 2025.

Thank you for your cooperation in maintaining our school's standards.

Best regards,
School Management`,
      type: "Policy",
      status: "draft",
      audience: "Students & Parents",
      createdBy: "Headmaster",
      createdDate: "2025-10-30",
      publishDate: null,
      lastModified: "2025-11-01",
      views: 0,
      priority: "medium",
      totalRecipients: 450,
      readRecipients: 0,
      clickThroughs: 0,
      engagement: 0,
      audienceBreakdown: {
        students: 180,
        parents: 270
      },
      viewsByDate: [],
      reactions: {
        helpful: 0,
        important: 0,
        questions: 0
      },
      comments: [],
      attachments: [
        {
          id: 4,
          name: "Uniform_Policy_2026.pdf",
          size: "1.8 MB",
          type: "PDF",
          downloadCount: 0
        },
        {
          id: 5,
          name: "Uniform_Samples.jpg",
          size: "4.2 MB",
          type: "Image",
          downloadCount: 0
        },
        {
          id: 6,
          name: "Approved_Suppliers.xlsx",
          size: "892 KB",
          type: "Excel",
          downloadCount: 0
        }
      ],
      relatedAnnouncements: []
    },
    
    "4": {
      id: 4,
      title: "Annual Sports Day Competition 2025",
      content: `Dear Students, Parents, and Staff,

We are excited to announce our Annual Sports Day Competition scheduled for December 15th, 2025!

**Event Details:**
- **Date:** December 15th, 2025 (Friday)
- **Time:** 8:00 AM - 4:00 PM
- **Venue:** School Sports Complex and Field

**Competition Categories:**

**Track Events:**
- 100m, 200m, 400m sprints
- 800m, 1500m middle distance
- 4x100m relay races
- Hurdles (various categories)

**Field Events:**
- Long jump, High jump, Shot put
- Discus throw, Javelin throw

**Team Sports:**
- Football (soccer), Basketball
- Volleyball, Netball, Tug of war

**Age Categories:**
- Under 10 (Primary 1-3)
- Under 13 (Primary 4-6)
- Under 16 (JHS 1-3)
- Staff and Parents exhibition matches

**Registration:**
- Registration opens: November 10th, 2025
- Registration closes: December 1st, 2025
- Register through your class teachers or PE department

**House System:**
Students will compete representing their respective houses:
- Red House (Courage), Blue House (Wisdom)
- Green House (Unity), Yellow House (Excellence)

**Awards and Prizes:**
- Individual medals for 1st, 2nd, and 3rd places
- House trophies for overall performance
- Special awards for sportsmanship
- Participation certificates for all students

**Parent Participation:**
- Parents' race (100m fun run)
- Parent-child relay race
- Tug of war (Parents vs Teachers)

**Important Notes:**
- All students are expected to participate in at least one event
- Students must wear appropriate sports attire
- Medical team will be present throughout the event
- In case of rain, indoor events will proceed as scheduled

Let's make this the most exciting Sports Day ever!

For more information, contact the PE Department.

Best wishes,
Sports Committee`,
      type: "Events",
      status: "published",
      audience: "Students & Parents",
      createdBy: "Sports Coordinator",
      createdDate: "2025-10-28",
      publishDate: "2025-10-29",
      lastModified: "2025-11-02",
      views: 189,
      priority: "medium",
      totalRecipients: 450,
      readRecipients: 189,
      clickThroughs: 67,
      engagement: 42.0,
      audienceBreakdown: {
        students: 180,
        parents: 270
      },
      viewsByDate: [
        { date: "2025-10-29", views: 45 },
        { date: "2025-10-30", views: 89 },
        { date: "2025-11-01", views: 134 },
        { date: "2025-11-02", views: 189 }
      ],
      reactions: {
        helpful: 45,
        important: 32,
        questions: 8
      },
      comments: [
        {
          id: 1,
          author: "Mr. Michael Brown",
          role: "Parent",
          message: "This sounds fantastic! Can parents register for multiple events?",
          timestamp: "2025-10-30 15:20",
          replied: true
        },
        {
          id: 2,
          author: "Lisa Johnson",
          role: "Parent",
          message: "What time should we arrive on the day? Will parking be available?",
          timestamp: "2025-10-31 08:45",
          replied: true
        },
        {
          id: 3,
          author: "David Williams",
          role: "Student",
          message: "Can I register for both 100m and long jump?",
          timestamp: "2025-11-01 14:30",
          replied: false
        },
        {
          id: 4,
          author: "Mrs. Sarah Davis",
          role: "Parent",
          message: "Are there age restrictions for the parent events?",
          timestamp: "2025-11-01 16:15",
          replied: false
        },
        {
          id: 5,
          author: "James Miller",
          role: "Student",
          message: "What happens if it rains during the outdoor events?",
          timestamp: "2025-11-02 09:30",
          replied: true
        }
      ],
      attachments: [
        {
          id: 7,
          name: "Sports_Day_Schedule.pdf",
          size: "2.1 MB",
          type: "PDF",
          downloadCount: 67
        },
        {
          id: 8,
          name: "Registration_Form.pdf",
          size: "756 KB",
          type: "PDF",
          downloadCount: 89
        },
        {
          id: 9,
          name: "Event_Map.jpg",
          size: "3.5 MB",
          type: "Image",
          downloadCount: 34
        },
        {
          id: 10,
          name: "House_Teams_Info.docx",
          size: "1.2 MB",
          type: "Word Document",
          downloadCount: 28
        }
      ],
      relatedAnnouncements: [
        {
          id: 5,
          title: "Sports Equipment Guidelines",
          type: "Events",
          publishDate: "2025-10-25"
        },
        {
          id: 6,
          title: "Physical Education Safety Rules",
          type: "Safety",
          publishDate: "2025-10-20"
        }
      ]
    },
    
    "5": {
      id: 5,
      title: "Christmas Holiday Break Announcement",
      content: `Dear School Community,

We are pleased to inform you about the Christmas Holiday Break schedule and important information for the upcoming festive season.

**Holiday Period:**
- **Last Day of School:** December 20th, 2025
- **First Day Back:** January 8th, 2026
- **Total Break Duration:** 19 days

**End of Term Activities:**

**December 18th, 2025:**
- Carol Service and Christmas Concert (2:00 PM - 4:00 PM)
- Parent attendance encouraged

**December 19th, 2025:**
- Class parties and gift exchanges
- Final report card distribution
- Year-end awards ceremony

**December 20th, 2025:**
- Half day schedule (8:00 AM - 12:00 PM)
- School closes at 12:00 PM sharp

**Important Reminders:**
1. All outstanding fees must be cleared before December 18th
2. Library books should be returned by December 17th
3. Lost property collection until December 19th
4. Summer holiday assignments will be given on December 19th

**Safety During Holidays:**
- Keep emergency contact numbers handy
- Ensure children are supervised during outings
- Be cautious with fireworks and celebrations
- Maintain healthy eating habits during festivities

**School Reopening - January 8th, 2026:**
- Regular school hours: 7:30 AM - 3:00 PM
- Bring completed holiday assignments
- New term fees due by January 15th, 2026
- Medical forms for new term activities

**Holiday Programs:**
The school will offer optional holiday programs:
- Remedial classes (December 23rd - January 3rd)
- Sports camp (December 26th - 30th)
- Arts and crafts workshop (January 2nd - 5th)

Registration for holiday programs closes December 15th, 2025.

**Communication During Break:**
The school office will be closed from December 21st, 2025 to January 6th, 2026.
For emergencies, contact: [Emergency Contact Number]

We wish all our students, parents, and staff a wonderful Christmas celebration and a prosperous New Year 2026!

May this season bring joy, peace, and happiness to your families.

Warm regards,
The Management
Nolex Primary & JHS`,
      type: "General",
      status: "scheduled",
      audience: "All",
      createdBy: "Headmaster",
      createdDate: "2025-11-01",
      publishDate: "2025-11-12",
      lastModified: "2025-11-03",
      views: 0,
      priority: "high",
      totalRecipients: 500,
      readRecipients: 0,
      clickThroughs: 0,
      engagement: 0,
      audienceBreakdown: {
        students: 180,
        parents: 270,
        teachers: 35,
        staff: 15
      },
      viewsByDate: [],
      reactions: {
        helpful: 0,
        important: 0,
        questions: 0
      },
      comments: [],
      attachments: [
        {
          id: 11,
          name: "Holiday_Schedule_2025.pdf",
          size: "945 KB",
          type: "PDF",
          downloadCount: 0
        },
        {
          id: 12,
          name: "Holiday_Programs_Registration.pdf",
          size: "1.1 MB",
          type: "PDF",
          downloadCount: 0
        },
        {
          id: 13,
          name: "Emergency_Contacts.docx",
          size: "567 KB",
          type: "Word Document",
          downloadCount: 0
        }
      ],
      relatedAnnouncements: [
        {
          id: 4,
          title: "Annual Sports Day Competition 2025",
          type: "Events",
          publishDate: "2025-10-29"
        }
      ]
    },
    
    "6": {
      id: 6,
      title: "School Fee Payment Deadline Reminder",
      content: `Dear Parents and Guardians,

This is a friendly reminder regarding the upcoming school fee payment deadline for Term 1, 2025.

**Payment Deadline:** November 30th, 2025

**Outstanding Fees Summary:**
- Tuition fees for Term 1: GHS 1,200
- Textbook and material fees: GHS 350
- Examination fees: GHS 150
- Transportation fees (if applicable): GHS 300
- Boarding fees (if applicable): GHS 800

**Payment Methods Available:**
1. **Mobile Money:** 
   - MTN: 0244-XXX-XXX
   - Vodafone: 0204-XXX-XXX
   - AirtelTigo: 0277-XXX-XXX

2. **Bank Transfer:**
   - Account Name: Nolex Primary & JHS
   - Account Number: 1234567890
   - Bank: ABC Bank Ltd.
   - Branch: Kumasi Main

3. **Cash Payment:**
   - School Bursar's Office
   - Monday to Friday: 8:00 AM - 4:00 PM
   - Saturday: 9:00 AM - 1:00 PM

**Payment Plan Options:**
For families experiencing financial difficulties, we offer:
- 3-month installment plans
- Extended payment schedules
- Work-study programs for qualifying students
- Sibling discounts for multiple children

**Important Notes:**
1. Students with outstanding fees beyond December 5th may be temporarily excluded from classes
2. Report cards will be withheld until all fees are cleared
3. No student will be allowed to write end-of-term exams with outstanding fees
4. Payment receipts should be kept for record purposes

**Financial Assistance:**
We understand economic challenges facing families. Please contact our Bursar's office to discuss:
- Payment plan arrangements
- Scholarship opportunities
- Emergency financial assistance
- Fee reduction applications

**Contact Information:**
- Bursar's Office: 0322-XXX-XXX
- WhatsApp: 0244-XXX-XXX
- Email: finance@nolexsms.edu.gh

We appreciate your commitment to your child's education and look forward to your prompt payment.

Thank you for your continued partnership in your child's academic journey.

Best regards,
The Accounts Department
Nolex Primary & JHS`,
      type: "Financial",
      status: "published",
      audience: "Parents",
      createdBy: "Bursar",
      createdDate: "2025-11-05",
      publishDate: "2025-11-05",
      lastModified: "2025-11-05",
      views: 312,
      priority: "high",
      totalRecipients: 270,
      readRecipients: 312,
      clickThroughs: 89,
      engagement: 115.6,
      audienceBreakdown: {
        parents: 270
      },
      viewsByDate: [
        { date: "2025-11-05", views: 156 },
        { date: "2025-11-06", views: 234 },
        { date: "2025-11-07", views: 312 }
      ],
      reactions: {
        helpful: 67,
        important: 89,
        questions: 15
      },
      comments: [
        {
          id: 1,
          author: "Mrs. Grace Asante",
          role: "Parent",
          message: "Can I pay half now and the rest by December 15th? I'm waiting for my salary.",
          timestamp: "2025-11-05 16:30",
          replied: true
        },
        {
          id: 2,
          author: "Mr. Kwame Osei",
          role: "Parent",
          message: "Is there a discount for paying all fees at once?",
          timestamp: "2025-11-06 09:15",
          replied: true
        },
        {
          id: 3,
          author: "Mrs. Abena Mensah",
          role: "Parent",
          message: "My mobile money transaction failed. Can I try again with the same reference?",
          timestamp: "2025-11-06 11:45",
          replied: false
        },
        {
          id: 4,
          author: "Mr. Joseph Agyei",
          role: "Parent",
          message: "Are there any additional charges for the payment plan option?",
          timestamp: "2025-11-06 14:20",
          replied: true
        },
        {
          id: 5,
          author: "Mrs. Mary Boateng",
          role: "Parent",
          message: "I paid yesterday but haven't received confirmation. How can I verify?",
          timestamp: "2025-11-07 08:30",
          replied: false
        },
        {
          id: 6,
          author: "Mr. Daniel Owusu",
          role: "Parent",
          message: "Can I pay transportation fees separately if my child doesn't use the school bus every day?",
          timestamp: "2025-11-07 10:15",
          replied: false
        }
      ],
      attachments: [
        {
          id: 14,
          name: "Fee_Structure_2025.pdf",
          size: "1.3 MB",
          type: "PDF",
          downloadCount: 189
        },
        {
          id: 15,
          name: "Payment_Methods_Guide.pdf",
          size: "892 KB",
          type: "PDF",
          downloadCount: 156
        },
        {
          id: 16,
          name: "Financial_Assistance_Application.docx",
          size: "678 KB",
          type: "Word Document",
          downloadCount: 34
        }
      ],
      relatedAnnouncements: [
        {
          id: 7,
          title: "Scholarship Opportunities 2025",
          type: "Financial",
          publishDate: "2025-10-15"
        },
        {
          id: 8,
          title: "Payment Plan Guidelines",
          type: "Financial",
          publishDate: "2025-10-01"
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const announcement = announcementDatabase[params.id as keyof typeof announcementDatabase];
      setAnnouncementDetail(announcement || null);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleDeleteAnnouncement = () => {
    // Handle delete logic here
    console.log("Deleting announcement:", announcementDetail);
    setShowDeleteModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading announcement details...</span>
        </div>
      </div>
    );
  }

  if (!announcementDetail) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Announcement Not Found</h2>
          <p className="text-gray-600 mb-4">The requested announcement could not be found.</p>
          <Link
            href="/headmaster/communication"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Communications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/communication" 
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{announcementDetail.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(announcementDetail.status)}`}>
                  {announcementDetail.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(announcementDetail.priority)}`}>
                  {announcementDetail.priority} priority
                </span>
                <span className="text-blue-100">{announcementDetail.type}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Recipients</p>
              <p className="text-2xl font-bold text-gray-900">{announcementDetail.totalRecipients}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Views</p>
              <p className="text-2xl font-bold text-gray-900">{announcementDetail.views}</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">{announcementDetail.engagement}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Click-throughs</p>
              <p className="text-2xl font-bold text-gray-900">{announcementDetail.clickThroughs}</p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Announcement Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Announcement Content</h2>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {announcementDetail.content}
              </div>
            </div>
          </div>

          {/* Attachments */}
          {announcementDetail.attachments.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Attachments</h2>
              <div className="space-y-3">
                {announcementDetail.attachments.map((attachment: any) => (
                  <div key={attachment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{attachment.name}</h3>
                        <p className="text-sm text-gray-600">{attachment.type} • {attachment.size}</p>
                        <p className="text-sm text-gray-500">{attachment.downloadCount} downloads</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments/Feedback */}
          {announcementDetail.comments.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Comments & Feedback</h2>
              <div className="space-y-4">
                {announcementDetail.comments.map((comment: any) => (
                  <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{comment.author}</h3>
                          <p className="text-sm text-gray-600">{comment.role} • {comment.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {comment.replied && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Replied
                          </span>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Reply</button>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Engagement Analytics</h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <ThumbsUp className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{announcementDetail.reactions.helpful}</p>
                <p className="text-gray-600">Helpful</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">{announcementDetail.reactions.important}</p>
                <p className="text-gray-600">Important</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{announcementDetail.reactions.questions}</p>
                <p className="text-gray-600">Questions</p>
              </div>
            </div>


          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Reminder
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <Link
                href={`/headmaster/communication/announcements/${announcementDetail.id}/edit`}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Announcement
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Announcement Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcement Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Created By</p>
                <p className="font-medium text-gray-900">{announcementDetail.createdBy}</p>
              </div>
              <div>
                <p className="text-gray-600">Created Date</p>
                <p className="font-medium text-gray-900">{announcementDetail.createdDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Published Date</p>
                <p className="font-medium text-gray-900">{announcementDetail.publishDate || 'Not published'}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Modified</p>
                <p className="font-medium text-gray-900">{announcementDetail.lastModified}</p>
              </div>
              <div>
                <p className="text-gray-600">Target Audience</p>
                <p className="font-medium text-gray-900">{announcementDetail.audience}</p>
              </div>
            </div>
          </div>

          {/* Target Audience Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Audience</h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{announcementDetail.audience}</span>
              </div>
              <p className="text-sm text-gray-600">Total Recipients: {announcementDetail.totalRecipients}</p>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Audience Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(announcementDetail.audienceBreakdown).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600 capitalize">{key}</span>
                    </div>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">View Analytics</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Total Views</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{announcementDetail.views}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Read Rate</span>
                <span className="font-medium text-gray-900">
                  {announcementDetail.totalRecipients > 0 
                    ? Math.round((announcementDetail.readRecipients / announcementDetail.totalRecipients) * 100)
                    : 0}%
                </span>
              </div>
            </div>

            {announcementDetail.viewsByDate.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Daily Views</h4>
                <div className="space-y-3">
                  {announcementDetail.viewsByDate.map((dayView: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{dayView.date}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(dayView.views / announcementDetail.views) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900 w-8 text-sm">{dayView.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Announcements */}
          {announcementDetail.relatedAnnouncements.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Announcements</h3>
              <div className="space-y-3">
                {announcementDetail.relatedAnnouncements.map((related: any) => (
                  <Link
                    key={related.id}
                    href={`/headmaster/communication/announcements/${related.id}`}
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 text-sm">{related.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{related.type} • {related.publishDate}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Announcement</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{announcementDetail.title}"</span>?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Announcement content and attachments</li>
                  <li>• View analytics ({announcementDetail.views} views)</li>
                  <li>• {announcementDetail.comments.length} comments and feedback</li>
                  <li>• Engagement data and statistics</li>
                  <li>• {announcementDetail.attachments.length} file attachments</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAnnouncement}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Delete Announcement
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}