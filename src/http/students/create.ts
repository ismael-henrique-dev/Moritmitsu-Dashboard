'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassResponse, StudentData } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CreateStudentFormData } from '@/validators/create-student'

export async function createStudent(formData: CreateStudentFormData) {
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
        ? formData.registrationIfce
        : null,
      parent_name: formData.parentName,
      parent_phone: formData.parentPhone?.replace(/\D/g, '') ?? '',
      student_phone: formData.phone?.replace(/\D/g, '') ?? '',
    }

    console.log(newStudent)

    await api.post<CreateClassResponse>('/students/create', newStudent, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    revalidatePath('/dashboard/students')

    return { message: 'Aluno cadastrado com sucesso.', status: 'success' }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)
    // console.log(error.response.data)

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
