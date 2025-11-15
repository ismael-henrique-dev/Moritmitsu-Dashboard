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
    schedule: string
    instructor_id: string
  }
}

export type FetchClassesResponse = {
  message: string
  result: Class[]
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
