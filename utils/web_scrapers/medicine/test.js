module.exports = () => {
    return new Promise ((resolve, reject) => {
        let count = 1
        let error = new Error('Error from test 1');
        if (count > 0) {
            console.log('test1 resolve')
            resolve(count)
        } else {
            console.log('test1 reject')
            reject(error)
        }
    })
}