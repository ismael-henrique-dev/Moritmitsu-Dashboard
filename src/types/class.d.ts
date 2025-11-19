type Class = {
  id: string
  name: string
  min_age: number
  max_age: number | null
  schedule: {
    dayOfWeek: string
    time: string
  }[]
  instructor_id: string
  instructor: {
    username: string
  }
  _count: {
    students: 0
  }
}
