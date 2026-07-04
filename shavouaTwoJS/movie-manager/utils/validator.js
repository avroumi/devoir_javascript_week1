export const isValidTitle = title => {
    return title.trim() !== ""
}

export const isValidGenre = genre => genre.trim() !== ""

export const isValidYear = year => {
    const currentYear = new Date().getFullYear()

    return year > 1900 && year <= currentYear
}

export const isValidRating = rating => {
    return rating >= 0 && rating <= 10
}