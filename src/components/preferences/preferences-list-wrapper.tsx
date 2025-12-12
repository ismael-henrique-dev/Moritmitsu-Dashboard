import { fetchPreferences } from '@/http/preferences/get'
import { preferenceSchema } from '@/validators/preferences'
import { PreferenceListClient } from './preferences-list-client'

export async function PreferencesList() {
  const response = await fetchPreferences()
  const data = preferenceSchema.array().parse(response.data)

  return <PreferenceListClient data={data} />
}
