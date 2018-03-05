export default function () {
  var resolves
  var rejects

  var promise = new Promise((resolve, reject) => {
    resolves = resolve
    rejects = reject
  })

  return {
    promise: promise,
    resolve: resolves,
    reject: rejects
  }
}
