class Store {
  private key: string; // The key used for storing data in localStorage

  constructor(key: string) {
    this.key = key;
  }

  // Getter to retrieve the value from localStorage
  get value() {
    const item = localStorage.getItem(this.key);
    if (!item) return null;
    return JSON.parse(item);
  }

  // Sets a new value in localStorage for the given key
  setValue(newValue: unknown) {
    localStorage.setItem(this.key, JSON.stringify(newValue));
  }
}

export default Store;
