export default function useSession(key: string, defaultValue: null) {
  const stored = localStorage.getItem(key)
  if (!stored) {
    return defaultValue
  }
  return JSON.parse(stored)
}
