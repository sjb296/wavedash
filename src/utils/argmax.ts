/**
 * Return the index in the list of the largest value in the list
 * @param list The list of numbers
 * @returns The index of the largest value in the list
 */
const argmax = (list: number[]): number => {
    let max = list[0]
    let maxIndex = 0
    for (let i = 1; i < list.length; i++) {
        if (list[i] > max) {
            max = list[i]
            maxIndex = i
        }
    }
    return maxIndex
}

export default argmax