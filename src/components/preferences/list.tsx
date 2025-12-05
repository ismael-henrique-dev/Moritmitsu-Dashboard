import { fetchPreferences } from '@/http/preferences/get'
import { preferenceSchema } from '@/validators/preferences'
import { PreferenceCard } from './card'

export async function PreferencesList() {
  const response = await fetchPreferences()
  const data = preferenceSchema.array().parse(response.data)

  return (
    <div className='xl:hidden grid'>
      {data.map((preference) => (
        <PreferenceCard key={preference.id} data={preference} />
      ))}
    </div>
  )
}
