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

type FetchStudentData = {
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
  ifce_enrollment: number | null
}
