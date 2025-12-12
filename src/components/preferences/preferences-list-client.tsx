'use client'

import { PreferenceCard } from './card'
import z from 'zod'
import { preferenceSchema } from '@/validators/preferences'
import React from 'react'

export function PreferenceListClient({
  data,
}: {
  data: z.infer<typeof preferenceSchema>[]
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null)

  return (
    <div className='xl:hidden grid gap-4'>
      {data.map((preference) => (
        <PreferenceCard
          key={preference.id}
          data={preference}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      ))}
    </div>
  )
}
