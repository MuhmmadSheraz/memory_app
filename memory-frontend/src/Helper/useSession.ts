export default function useSession(key: any, defaultValue: null) {
  const stored = localStorage.getItem(key)
  if (!stored) {
    return defaultValue
  }
  return JSON.parse(stored)
}
