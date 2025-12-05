import { preferenceSchema } from '@/validators/preferences'
import { fetchPreferences } from '@/http/preferences/get'
import { PreferencesDataTable } from './data-table'

export async function PreferencesTableWrapper() {
  const response = await fetchPreferences()
  const data = preferenceSchema.array().parse(response.data)

  return <PreferencesDataTable data={data} />
}
