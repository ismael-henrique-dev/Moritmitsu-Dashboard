import { getStudentById } from '@/http/students/details'

export async function BreadcrumbStudentName({ id }: { id: string }) {
  const data = await getStudentById(id)
  return (
    <div className='lg:max-w-none max-w-20 overflow-hidden whitespace-nowrap text-ellipsis'>
      {data.data?.personal_info.full_name}
    </div>
  )
}
