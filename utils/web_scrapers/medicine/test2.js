module.exports = () => {
    return new Promise ((resolve, reject) => {
        let count = 2
        let error = new Error('Error from test 2');
        if (count > 1) {
            console.log('test2 resolve')
            resolve(count)
        } else {
            console.log('test2 reject')
            reject(error)
        }
    })
}