class LocalStorageService {
  static localStorageService = new LocalStorageService();

  get<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || "null")
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}

export default LocalStorageService.localStorageService;