import { getStudentById } from '@/http/students/details'

export async function BreadcrumbStudentName({ id }: { id: string }) {
  const data = await getStudentById(id)
  return <>{data.data?.personal_info.full_name}</>
}
