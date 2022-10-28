export class LocalStorage {

  saveRecord<T extends Record<string, unknown>>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  retrieveRecord<T extends Record<string, unknown>>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || 'null')
  }

  retrieveOrSave<T extends Record<string, unknown>>(key: string, create: () => T): T {
    let record = this.retrieveRecord<T>(key)
    if (!record) {
      record = create()
      this.saveRecord(key, record)
    }
    return record
  }
}
