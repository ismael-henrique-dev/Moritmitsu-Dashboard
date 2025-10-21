import * as React from "react"
import { getUserData } from "@/lib/actions"

export function useUserData() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await getUserData()
        setUser(response.data)
      } catch (err) {
        console.error(err)
        setError("Erro ao buscar dados do usuário")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return {
    user,
    loading,
    error,
  }
}
