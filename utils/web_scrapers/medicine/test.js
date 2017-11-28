module.exports = () => {
    return new Promise ((resolve, reject) => {
        let text = 'Hello from ' + __dirname
        resolve(text)
        reject('Error :(')
    })
}