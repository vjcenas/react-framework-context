class EventManager<T = any> {
  private list = new Map();

  on(event: T, callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }

    this.list.get(event).push(callback);

    return this;
  }

  off(event: T) {
    this.list.delete(event);

    return this;
  }

  emit(event: T, ...args) {
    if (this.list.has(event)) {
      this.list.get(event).forEach((callback) =>
        setImmediate(() => {
          callback(...args);
        })
      );
    }
  }
}

export default EventManager;
