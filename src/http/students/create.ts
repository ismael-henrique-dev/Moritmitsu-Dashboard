'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassResponse, StudentData } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CreateStudentFormData } from '@/validators/create-student'
import { AxiosError } from 'axios'

export async function createStudent(formData: CreateStudentFormData) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const newStudent = {
      current_frequency: formData.currentAttendance,
      total_frequency: formData.totalTrainings,
      full_name: formData.name,
      alias: formData.alias,
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

    // console.log(newStudent)

    await api.post<CreateClassResponse>('/students/create', newStudent, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    revalidatePath('/dashboard/students')

    return { message: 'Aluno cadastrado com sucesso.', status: 'success' }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 400:
        if (error instanceof AxiosError) {
          const response = error.response?.data.message
          console.log(response)
          return { message: response, status: 'error' }
        }
        return { message: 'BAD.', status: 'error' }
      case 500:
        return { message: 'Erro interno no servidor.', status: 'error' }
      default:
        return { message: 'Erro desconhecido.', status: 'error' }
    }
  }
}
