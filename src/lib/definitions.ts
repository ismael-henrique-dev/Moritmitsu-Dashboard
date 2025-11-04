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
