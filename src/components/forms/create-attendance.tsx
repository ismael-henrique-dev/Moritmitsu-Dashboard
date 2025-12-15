'use client'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { redirect, useRouter } from 'next/navigation'
import { AttendenceStudent } from '@/lib/definitions'
import { createAttendance } from '@/http/attendances/create'
import { AlertSelectClass } from '../attendances/alert-select-class'
import { useTransition } from 'react'
import { Spinner } from '@/components/ui/spinner'

const FormSchema = z.object({
  students: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos 1 aluno para realizar a frequência.',
  }),
})

export function CreateAttendanceForm({
  students,
  date,
  classId,
}: {
  students: AttendenceStudent[]
  date: string
  classId: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      students: [],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      console.log('date' + date)
      const payload = {
        session_date: date,
        attendance: students.map((student) => ({
          studentId: student.student_id,
          present: data.students.includes(student.student_id),
        })),
      }

      console.log("Payload: " + payload)

      const response = await createAttendance(payload, classId)

      if (response.status === 'success') {
        toast.success(response.message)
        redirect('/dashboard/attendances')
      } else {
        toast.error(response.message)
      }
    })
  }

  const hasSelectedClass = classId !== ''

  console.log(students)

  if (hasSelectedClass && students.length === 0) {
    return (
      <div className='border rounded-lg p-6 text-center text-muted-foreground'>
        Nenhum aluno encontrado para esta turma.
      </div>
    )
  }

  if (!hasSelectedClass) {
    return <AlertSelectClass />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        <FormField
          control={form.control}
          name='students'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Alunos</FormLabel>
                <FormDescription>
                  Selecione os alunos que deseja marcar presença
                </FormDescription>
              </div>
              {students.map((item) => (
                <FormField
                  key={item.student_id}
                  control={form.control}
                  name='students'
                  render={({ field }) => {
                    return (
                      <FormItem className='hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950'>
                        <FormControl>
                          <Checkbox
                            className='size-5 cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
                            checked={field.value?.includes(item.student_id)}
                            onCheckedChange={(checked) => {
                              const current = field.value ?? []

                              return checked
                                ? field.onChange([...current, item.student_id])
                                : field.onChange(
                                    current.filter(
                                      (value) => value !== item.student_id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-semibold w-full cursor-pointer py-3'>
                          {item.full_name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <div className='w-full flex items-center justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Spinner />}
            {isPending ? 'Concluindo...' : 'Concluir'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
