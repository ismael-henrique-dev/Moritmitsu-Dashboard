export type LoginResponse = {
  token: string
  data: User
}

export type CreateClassResponse = {
  message: string
  result: {
    id: string
    name: string
    min_age: number
    max_age: number
    schedule: {
      dayOfWeek: string
      time: string
    }[]
    instructor_id: string
    instructor: {
      username: string
    }
  }
}

export type FetchClassesResponse = {
  message: string
  result: Class[]
}

export type FetchStudentData = {
  id: string
  name: string
  belt: Belt
  grade: number
}

export type FetchStudentsResponse = {
  message: string
  result: FetchStudentData[]
  pagination: {
    totalPages: number
    currentPage: number
    perPage: number
  }
}

export type AttendenceStudent = {
  student_id: string
  full_name: string
  present: boolean
}

export type FetchAllStudentsByIdResponse = {
  message: string
  result: AttendenceStudent[]
}

export type StudentData = {
  cpf: string
  full_name: string
  email: string
  parent_name?: string
  parent_phone?: string
  student_phone: string
  address: string
  date_of_birth: string
  grade: number
  belt: string
  ifce_enrollment: string | null
}

export type PersonalInfo = {
  id: string
  student_id: string
  cpf: string
  parent_name: string
  parent_phone: string
  student_phone: string
  address: string
  full_name: string
  date_of_birth: string
}

export type StudentResult = {
  id: string
  alias: string | null
  belt: Belt
  grade: number
  current_frequency: number
  total_frequency: number
  email: string
  class_id: string | null
  ifce_enrollment: string
  personal_info: PersonalInfo
  total_trainings: number
}

export type FetchStudentByIdResponse = {
  message: string
  result: StudentResult
}

type Preference = {
  id: string
  category: 'KIDS' | 'INFANTO-JUVENIL' | 'JUVENIL-ADULTO'
  belt: Belt
  minAge: number | null
  maxAge: number | null
  totalTrains: number
}

export type FetchPreferencesResponse = {
  message: string
  preferences: Preference[]
}

export type Graduation = {
  id: string
  student_id: string
  graduation_date: string
  belt: Belt
  grade: number
}

export type FetchGraduationsResponse = Graduation[]

export type CreateAttendanceRequest = {
  session_date: string
  attendance: {
    studentId: string
    present: boolean
  }[]
}

export type AttendanceBy = {
  id: string
  session_date: string
  class: ClassInfo
  instructor: Instructor
}

export type ClassInfo = {
  name: string
  _count: ClassCount
}

export type ClassCount = {
  students: number
}

export type Instructor = {
  username: string
}

export interface Session {
  id: string
  class_id: string
  instructor_id: string
  session_date: string // ISO Date
  class: {
    id: string
    name: string
    _count: {
      students: number
    }
  }
  instructor: Instructor
  attendances: Attendance[]
}

export interface Attendance {
  present: boolean
  student: {
    personal_info: {
      full_name: string
    }
  }
}

export type SessionResponse = {
  data: Session[]
  pagination: {
    total: number
    currentPage: number
    perPage: number
    totalPages: number
  }
}

export type FetchInstructorsResponse = {
  message: string
  users: User[]
}

export type ClassSchedule = {
  dayOfWeek: string
  time: string
}

export type ClassInstructor = {
  username: string
}

export type ClassStudentRef = {
  id: string
}

export type ClassDetails = {
  id: string
  name: string
  min_age: number
  max_age: number
  schedule: ClassSchedule[]
  instructor_id: string
  instructor: ClassInstructor
  students: ClassStudentRef[]
  _count: ClassCount
}

export type FetchClassDetailsResponse = {
  message: string
  result: ClassDetails
}

export type GraduationAnnouncement = {
  id: string
  name: string
  graduationType: 'grade' | 'belt'
  graduation: {
    currentGraduation: {
      belt?: string
      grade?: number
    }
    newGraduation: {
      belt?: string
      grade?: number
    }
  }
}

export type GraduationResponse = GraduationAnnouncement[]

export type BirthdayAnnouncement = {
  type: string
  student_id: string
  student_name: string
  age: number
  birthday: string
  message: string
}

export type BirtdaysResponse = BirthdayAnnouncement[]

export type NotEnrolledStudent = {
  id: string
  full_name: string
}

export type NotEnrolledStudentsResponse = NotEnrolledStudent[]

export type EnrolledStudent = {
  id: string
  full_name: string
}

export type EnrolledStudentsResponse = EnrolledStudent[]
