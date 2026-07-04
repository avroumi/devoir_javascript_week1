import { isValidGenre , isValidRating, isValidTitle, isValidYear} from "../utils/validator.js";
import { readMovies, wrietMovies } from "./file.service.js";



export const getAllMovies = async () => {
    const movies = await readMovies()
    return movies 
}

export const getMovieById = async (id) => {
    const movies = await readMovies()

    const movie = movies.find(movie => movie.id === id)

    if (!movie){
        throw new Error("Movie not found")
    }

    return movie

}

export const createMovie = async (movieData) => {

    const movies = await readMovies()

    const title = movieData.title
    const genre = movieData.genre
    const year = movieData.year
    const rating = movieData.rating

     if (!isValidTitle(title)) {
        throw new Error("Title cannot be empty");
    }

    if (!isValidGenre(genre)) {
        throw new Error("Genre cannot be empty");
    }

    if (!isValidYear(year)) {
        throw new Error("Year must be greater than 1900 and not in the future");
    }

    if (!isValidRating(rating)) {
        throw new Error("Rating must be between 0 and 10");
    }
    
    const allId = movies.map(movie => movie.id)

    const newId = allId.length === 0 ? 1 : Math.max(...allId) + 1 

    const newMovie = {
        id : newId,
        title,
        genre,
        year,
        rating
    }

    movies.push(newMovie)

    await wrietMovies(movies)

    return newMovie

}

export const deleteMovie = async (id) => {
    const movies = await readMovies()

    const movie = movies.find(movie => movie.id === id)

    if (!movie){
        throw new Error("Moveie not found")
    }

    const updatedMovies = movies.filter(movie => movie.id !== id )
    await wrietMovies(updatedMovies)

    return movie
}

export const updateMovieRating = async (id , newRating) => {
    const movies = await readMovies()
    
    const rating = Number(newRating)

    if (!isValidRating(rating)) {
        throw new Error("Rating must be beetwenn 0 and 10 ")
    }

    const movie = movie.find(movie => movie.id === id )

    if (!movie){
        throw new Error("Moovie not found")
    }

    movie.rating = rating
    await writeMovies(movies)
    return movie
}

export const searchMoviesByName = async searchText => {
    const movies = await readMovies()

    const text = searchText.trim().toLowerCase()

    if (text === ""){
        throw new Error("Search can't be empty")

    }
    const results = movies.filter(movie => movie.title.toLowerCase().includes(text))
    return results
}

export const getMoviesByGenre = async genre => {
    const movies = await readMovies()

    const selectedGenre = genre.trim().toLowerCase()

    if (selectedGenre === ''){
        throw new Error("Genre cannot be empty");
        
    }
    const results = movies
    .filter((movie) => movie.genre.toLowerCase() === selectedGenre)
    .sort((a,b) => a.title.localeCompare(b.title))

    return results
}

export const getStatistics = async () => {
    const movies = await readMovies()

    if (movies.length === 0){
        return {
            totalMovies : 0 ,
            averageRating : 0 ,
            bestMovie: null
        }
    }
    const TotalMovies = movies.length

    const totalRating = movies.reduce((sum , movie) => sum + movie.rating , 0)

    const averageRating = totalRating / totalMovies

    const bestMovie = movies.reduce((best, movie)=> {
        if (movie.rating > best.rating){
            return movie
        }return best 
    },movie[0])

    return {
        totalMovies,
        averageRating,
        bestMovie
    }
}