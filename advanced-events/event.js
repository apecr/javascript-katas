function Event() {
  let handlers = []
  return {
    subscribe() {
      handlers = handlers.concat(
        [ ...arguments ].filter((e) => typeof e === 'function')
      )
    },
    unsubscribe() {
      const indexesToDelete = [ ...arguments ]
        .map((arg) => handlers.lastIndexOf(arg))
      handlers = handlers.filter((e, index) => !indexesToDelete.includes(index))
    },
    emit() {
      handlers.forEach((handler) => handler.call(this, ...arguments))
    },
  }
}

module.exports = Event
