// const math = require("./math")

// const result = math.mulitply(456, 98)

// const number = [1, 2, 3, 4, 5]

// const logger = (info, error) => `LVL: ${info} | ${error}`


// module.exports = { result, number, logger }

/////////////////////////////////////////////////////////////////////
import { isZougui } from "./math.js";

export function welcome(num) {
    const verify = isZougui(num)
    if (verify) return "Super zougui"
}
