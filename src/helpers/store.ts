class Store {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  get value() {
    const item = localStorage.getItem(this.key);
    if (!item) return null;
    return JSON.parse(item);
  }

  setValue(newValue: unknown) {
    localStorage.setItem(this.key, JSON.stringify(newValue));
  }
}

export default Store;
