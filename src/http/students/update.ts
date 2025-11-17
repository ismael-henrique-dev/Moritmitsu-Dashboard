'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassResponse, StudentData } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CreateStudentFormData } from '@/validators/create-student'

export async function updateStudent(
  studentId: string,
  formData: CreateStudentFormData
) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const newStudent: StudentData = {
      full_name: formData.name,
      address: formData.address,
      email: formData.email,
      belt: formData.belt,
      cpf: formData.cpf.replace(/\D/g, ''),
      grade: Number(formData.degree),
      date_of_birth: formData.birthDate,
      ifce_enrollment: formData.registrationIfce
        ? Number(formData.registrationIfce)
        : null,
      parent_name: formData.parentName,
      parent_phone: formData.parentPhone?.replace(/\D/g, '') ?? '',
      student_phone: formData.phone?.replace(/\D/g, '') ?? '',
    }

    console.log(newStudent)

    await api.patch<CreateClassResponse>(`/students/update/${studentId}`, newStudent, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    revalidatePath('/dashboard/students')

    return { message: 'Aluno cadastrado com sucesso.', status: 'success' }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)
    console.log(error)

    switch (statusCode) {
      case 401:
        return { message: 'Email ou senha incorretos.', status: 'error' }
      case 500:
        return { message: 'Erro interno no servidor.', status: 'error' }
      default:
        return { message: 'Erro desconhecido.', status: 'error' }
    }
  }
}
