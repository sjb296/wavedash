/**
 * Zip together two arrays into an array of tuples.
 * @param a 
 * @param b 
 * @returns `[(a[0], b[0]), ..., (a[n], b[n])]`
 */
const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
    const result: [T, U][] = []
    for (let i = 0; i < a.length; i++) {
        result.push([a[i], b[i]])
    }
    return result
}

export default zip