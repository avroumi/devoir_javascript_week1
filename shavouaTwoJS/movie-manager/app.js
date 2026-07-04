import readlineSync from "readline-sync";
import {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovieRating,
    searchMoviesByName,
    getMoviesByGenre,
    getStatistics
} from "./services/movie.service.js";

const showMenu = () => {
    console.log("\n==============================");
    console.log("Movie Collection Manager");
    console.log("==============================");
    console.log("1. Show all movies");
    console.log("2. Show by id");
    console.log("3. Create new movie");
    console.log("4. Delete movie");
    console.log("5. Update rate");
    console.log("6. Search by name");
    console.log("7. Sort by genre");
    console.log("8. Show statistics");
    console.log("9. Exit");
};

const askNumber = (message) => {
    while (true) {
        const value = Number(readlineSync.question(message));

        if (!Number.isNaN(value)) {
            return value;
        }

        console.log("Please enter a valid number");
    }
};

const printMovieShort = (movie) => {
    console.log(`${movie.id}. ${movie.title}`);
};

const printMovieDetails = (movie) => {
    console.log("Movie details:");
    console.log(`ID: ${movie.id}`);
    console.log(`Title: ${movie.title}`);
    console.log(`Genre: ${movie.genre}`);
    console.log(`Year: ${movie.year}`);
    console.log(`Rating: ${movie.rating}`);
};

const printMovieList = (movies) => {
    if (movies.length === 0) {
        console.log("No movies found");
        return;
    }

    for (const movie of movies) {
        printMovieShort(movie);
    }
};

const showAllMoviesAction = async () => {
    const movies = await getAllMovies();
    printMovieList(movies);
};

const showMovieByIdAction = async () => {
    const id = askNumber("Enter movie id: ");

    const movie = await getMovieById(id);

    printMovieDetails(movie);
};

const createMovieAction = async () => {
    while (true) {
        try {
            const title = readlineSync.question("Enter movie title: ");
            const genre = readlineSync.question("Enter genre: ");
            const year = askNumber("Enter year: ");
            const rating = askNumber("Enter rating: ");

            const newMovie = await createMovie({
                title,
                genre,
                year,
                rating
            });

            console.log("Movie created successfully:");
            printMovieDetails(newMovie);
            return;
        } catch (error) {
            console.log("Error:", error.message);
            console.log("Please enter the movie details again");
        }
    }
};

const deleteMovieAction = async () => {
    const id = askNumber("Enter movie id to delete: ");

    const deletedMovie = await deleteMovie(id);

    console.log("Movie deleted successfully:");
    printMovieDetails(deletedMovie);
};

const updateMovieRatingAction = async () => {
    while (true) {
        try {
            const id = askNumber("Enter movie id: ");
            const rating = askNumber("Enter new rating: ");

            const updatedMovie = await updateMovieRating(id, rating);

            console.log("Movie rating updated successfully:");
            printMovieDetails(updatedMovie);
            return;
        } catch (error) {
            console.log("Error:", error.message);
            console.log("Please try again");
        }
    }
};

const searchMoviesByNameAction = async () => {
    const text = readlineSync.question("Enter movie name or part of name: ");

    const movies = await searchMoviesByName(text);

    printMovieList(movies);
};

const getMoviesByGenreAction = async () => {
    const genre = readlineSync.question("Enter genre: ");

    const movies = await getMoviesByGenre(genre);

    printMovieList(movies);
};

const showStatisticsAction = async () => {
    const statistics = await getStatistics();

    console.log("Statistics:");
    console.log(`Total movies: ${statistics.totalMovies}`);
    console.log(`Average rating: ${statistics.averageRating.toFixed(2)}`);

    if (statistics.bestMovie) {
        console.log("Best movie:");
        printMovieDetails(statistics.bestMovie);
    } else {
        console.log("Best movie: none");
    }
};

const main = async () => {
    let isRunning = true;

    while (isRunning) {
        showMenu();

        const choice = readlineSync.question("Choose action: ");

        try {
            switch (choice) {
                case "1":
                    await showAllMoviesAction();
                    break;

                case "2":
                    await showMovieByIdAction();
                    break;

                case "3":
                    await createMovieAction();
                    break;

                case "4":
                    await deleteMovieAction();
                    break;

                case "5":
                    await updateMovieRatingAction();
                    break;

                case "6":
                    await searchMoviesByNameAction();
                    break;

                case "7":
                    await getMoviesByGenreAction();
                    break;

                case "8":
                    await showStatisticsAction();
                    break;

                case "9":
                    console.log("Goodbye!");
                    isRunning = false;
                    break;

                default:
                    console.log("Invalid choice");
            }
        } catch (error) {
            console.log("Error:", error.message);
        }
    }
};

main();