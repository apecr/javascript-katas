function Event() {
  let handlers = []
  return {
    subscribe(f) {
      handlers.push(f)
    },
    unsubscribe(f) {
      handlers = handlers.filter(handler => handler !== f)
    },
    emit() {
      handlers.forEach(handler => handler.call(null, ...arguments))
    }
  }
}

module.exports = Event