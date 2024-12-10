export interface Message {
    id: string
    mentorName: string
    menteeName: string
    mentorProfileImage: string
    menteeProfileImage: string
    startDate: string
    startTime: string
    status: "On Going" | "Ended"
    endDate: string | "N/A"
    endTime: string | "N/A"
  }
  