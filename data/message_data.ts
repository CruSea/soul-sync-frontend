import { Message } from "@/types/message";

export const MESSAGE_DATA: Message[] = Array.from({ length: 350 }, (_, i) => ({
    id: `message-${i + 1}`,
    mentorName: `Mentor ${i + 1}`,
    menteeName: `Mentee ${i + 1}`,
    mentorProfileImage: `/mentor-${i + 1}.svg?height=40&width=40`,
    menteeProfileImage: `/mentee-${i + 1}.svg?height=40&width=40`,
    startDate: "16/09/2024",
    startTime: "02:00PM",
    status: i < 5 ? "On Going" : "Ended",
    endDate: i < 5 ? "N/A" : "16/09/2024",
    endTime: i < 5 ? "N/A" : "10:00PM",
  }));