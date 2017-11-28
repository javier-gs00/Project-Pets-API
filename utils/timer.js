module.exports = (t0) => {
    if (!t0) return process.hrtime()
    
    const t1 = process.hrtime(t0)

    return Math.round((t1[0]*1000 + (t1[1]/1000000)))
}