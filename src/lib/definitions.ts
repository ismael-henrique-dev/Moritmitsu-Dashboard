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
