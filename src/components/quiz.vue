<template>
    <div class="Quiz h-screen">
        <div v-show="showErr">
            <h3>Sorry there was a problem with the API!</h3>
            <br>
            <h3>Please try again later.</h3>
        </div>
        <div v-show="end_quiz" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="modal w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="bg-white w-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:item-start">
                            <div class="rTitle mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="w-full text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Results: {{ score }} correct | {{ percentage }}%
                                </h3>
                                <div class="result">
                                    <div class="table">
                                        <div class="mx-auto">
                                            <div class="bg-gray-200 shadow-md rounded my-6">
                                                <table class="text-left w-full border-collapse">
                                                    <thead>
                                                        <tr>
                                                            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-black"></th>
                                                            <th v-for="(i, index) in result[0]" class="px-1 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-black">{{ index+1 }}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="hover:bg-gray-100">
                                                            <td class="py-4 px-1 border-b border-black">
                                                                <h2>
                                                                    Your character
                                                                </h2>
                                                            </td>
                                                            <td class="py-4 px-2 border-b border-black" v-for="i in result[0]">
                                                                {{ i }}
                                                            </td>
                                                        </tr>
                                                        <tr class="hover:bg-gray-100">
                                                            <td class="py-4 px-1 border-b border-black">
                                                                <h2>
                                                                    Character
                                                                </h2>
                                                            </td>
                                                            <td class="px-2 py-4 border-b border-black" v-for="i in result[1]">
                                                                {{ i }}
                                                            </td>
                                                        </tr>
                                                        <tr class="hover:bg-gray-100">
                                                            <td class="py-4 px-1 border-b border-black">
                                                                <h2>
                                                                    Quote
                                                                </h2>
                                                            </td>
                                                            <td class="px-2 py-4 border-b border-black" v-for="i in result[2]">
                                                                <p>
                                                                    {{ i }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr class="hover:bg-gray-100">
                                                            <td class="py-4 px-1 border-b border-black">
                                                                <h2>
                                                                    Your film
                                                                </h2>
                                                            </td>
                                                            <td class="px-2 py-4 border-b border-black" v-for="i in result[3]">
                                                                <p>
                                                                    {{ i }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr class="hover:bg-gray-100">
                                                            <td class="py-4 px-1 border-b">
                                                                <h2>
                                                                    Film
                                                                </h2>
                                                            </td>
                                                            <td class="px-2 py-4 border-b" v-for="i in result[4]">
                                                                <p>
                                                                    {{ i }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="playAgain" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                            <span class="reloadIcon">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                            <p class="playAgain">Play Again</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Input -->
        <div class="container inputCon h-auto max-w-md mx-auto bg-white rounded-none sm:rounded-lg shadow-md overflow-hidden md:max-w-2xl" :style="{height: quizActive ? 'h-auto' : ''}">
            <div class="md:flex p-8 h-full">
                <!-- <div class=" "> -->
                <!-- SETUP -->
                <button class="startBtn" @click="startQuiz" v-show="!quizActive">
                    <h2 class="font-black">START QUOTE QUIZ</h2>
                </button>
                <!-- QUIZ -->
                <div v-show="quizActive" class="quizActive uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    <h3>Answer</h3>
                    <form class="mt-2">
                        <!-- Character answer -->
                        <input v-model="CharacterAns" placeholder="   character..." autocomplete="email" class="rounded-md block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                        <!-- Film answer -->
                        <input v-model="FilmAns" placeholder="   film..." autocomplete="current-password" class="rounded-md block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                        <button @click="checkAnswers" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            <p class="playAgain">Check</p>
                        </button>
                    </form>
                    <div class="skip">
                        <button @click="skipQuote" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm">
                            <p class="playAgain">Skip</p>
                            <span class="skipIcon">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
        </div>
        <!-- Quote -->
        <div class="container quote h-auto max-w-md mx-auto bg-white rounded-none sm:rounded-lg shadow-md overflow-hidden md:max-w-2xl" :style="{height: quizActive ? 'auto' : ''}">
            <!-- SETUP -->
            <div v-show="!quizActive" class="rules">
                <h3>Rules</h3>
                <ul>
                    <li>Guess the name of the character that said the quote!</li>
                    <li>For every character that you guessed correctly you will earn 1 point</li>
                </ul>
                <div class="rounds">
                    <h4>Rounds</h4>
                    <div class="flex flex-row h-auto w-full rounded-lg relative bg-transparent mt-1">
                        <button @click="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-auto w-20 rounded-l cursor-pointer outline-none">
                            <span class="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" v-model="rounds">
                        <button @click="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-auto w-20 rounded-r cursor-pointer">
                            <span v class="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- QUIZ -->
            <div v-show="quizActive" class="">
                <div class="quoteInfo">
                    <p class="">
                        {{ quote.dialog }}
                    </p>
                </div>
                <div class="info">
                    <div class="character">
                        <!-- <h3>{{ quoteChar.docs[0].name }}</h3> -->
                    </div>
                    <div class="film">
                        <!-- <h3>{{ quoteMovie.docs[0].name }}</h3> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { HTTP } from './../../http-common';

export default {
    name: 'quiz',
    data() {
        return {
            showErr: false,
            rounds: 3,
            quote: {},
            quotes: {},
            randNum: 0,
            min: 1,
            max: 1000,
            quoteMovie: '',
            quoteChar: '',
            quoteFilm: '',
            quizActive: false,
            character: '',
            CharacterAns: '',
            FilmAns: '',
            score: 0,
            timesCalled: 0,
            end_quiz: false,
            answers: [],
            characters: [],
            filmAnsers: [],
            films: [],
            id: 1,
            wrong: 0,
            percentage: 0,
            result: [],
            quotesA: [],
        }
    },
    methods: {

        // Rounds button
        increment() {
            this.rounds++;
        },
        decrement() {
            this.rounds--;
        },


        // Star quiz
        startQuiz() {
            this.fetchQuotes()
            if (Math.sign(this.rounds) == 1 && this.rounds <= 6) {
                this.quizActive = true;
                this.randQuote()
            } else if (Math.sign(this.rounds) == -1) {
                this.quizActive = false;
            }
        },

        // Fetch API
        fetchQuotes() {
            HTTP.get(`quote?character!=5cdbe49b7ed9587226e794a0`)
                .then(response => {
                    this.quotes = response.data
                    this.setQuote()
                })
                .catch(error => {
                    console.log(error)
                    this.showErr = true
                })
        },

        // Random quote
        randQuote() {
            this.randNum = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        },

        // Set response
        setQuote() {
            this.quote = this.quotes.docs[this.randNum]
            this.fetchQuoteMovie()
            this.fetchQuoteChar()
        },

        // Fetch API
        fetchQuoteMovie() {
            HTTP.get(`/movie/${this.quote.movie}`)
                .then(response => {
                    this.res = response.data
                    this.quoteFilm = this.res.docs[0].name
                    console.log(this.quoteFilm)
                })
                .catch(error => {
                    console.log(error)
                    this.showErr = true
                })
        },
        fetchQuoteChar() {
            HTTP.get(`/character/${this.quote.character}`)
                .then(response => {
                    this.res = response.data
                    this.quoteChar = this.res.docs[0].name
                    console.log(this.quoteChar)
                })
                .catch(error => {
                    console.log(error)
                    this.showErr = true
                })
        },

        // Function to call the nessecery checks
        checkAnswers() {
            // this.checkChar()
            // this.checkFilm()

            let quoteC = this.quoteChar.toLowerCase()
            let charAns = this.CharacterAns.toLowerCase()

            let quoteF = this.quoteFilm.toLowerCase()
            let filmAns = this.FilmAns.toLowerCase()

            let arrOfCharName = quoteC.split(" ");
            let firstName = arrOfCharName[0]











            // FIX
            if (firstName == charAns || quoteC == charAns && quoteF == filmAns) {
                this.score = this.score + 1.5
                this.nextQuote()
            } else if (firstName == charAns || quoteC == charAns) {
                this.score = this.score + 1
                this.nextQuote()
            } else if (quoteF == filmAns) {
                this.score = this.score + 0.5
                this.nextQuote()
            } else {
                this.nextQuote()
            }
        },

        // Check character
        checkChar() {
            let quoteC = this.quoteChar.toLowerCase()
            let charAns = this.CharacterAns.toLowerCase()

            let arrOfCharName = quoteC.split(" ");
            let firstName = arrOfCharName[0]

            if (firstName == charAns || quoteC == charAns) {
                this.score = this.score + 1
                this.nextQuote()
            } else {
                this.nextQuote()
            }
        },

        // Check film
        checkFilm() {
            let quoteC = this.quoteFilm.toLowerCase()
            let filmAns = this.FilmAns.toLowerCase()

            if (quoteC == filmAns) {
                this.score = this.score + 0.5
                this.nextQuote()
            } else {
                this.nextQuote()
            }
        },



        // Show next quote
        nextQuote() {
            // User's answers
            this.answers.push(this.CharacterAns);
            this.filmAnsers.push(this.FilmAns);

            // Correct values
            this.characters.push(this.quoteChar);
            this.quotesA.push(this.quote.dialog)
            this.films.push(this.quoteFilm)

            // Push everything into a results array so it is better handelt in the template
            this.result.push(this.answers);
            this.result.push(this.characters);
            this.result.push(this.quotesA);
            this.result.push(this.filmAnsers);
            this.result.push(this.films);

            this.timesCalled++;
            if (this.timesCalled == this.rounds) {
                setTimeout(this.endQuiz, 500);
            } else {
                this.randQuote()
                this.setQuote()
            }

            this.CharacterAns = '';
            this.FilmAns = '';
        },

        // Skip quote
        skipQuote() {
            this.randQuote()
            this.setQuote()
            this.CharacterAns = '';
            this.FilmAns = '';
        },

        // End quiz
        endQuiz() {
            let per = Math.round(this.score / this.rounds * 100);

            console.log(this.score)

            if (per >= 101) {
                this.percentage = 100
            } else if (per < 100) {
                this.percentage = per
            }

            this.end_quiz = true
        },

        // Funcition to load the quiz again
        playAgain() {
            window.location = 'https://quote-quiz.netlify.app/'
        },
    }
};
</script>
<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Spirax&display=swap');

.Quiz {
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-around;
    align-items: center;
}

.Quiz h3 {
    color: #333333;
    font-size: 22px;
    font-weight: 900;
    padding: 1rem;
}

/* MODAL */
.modal {
    width: 75vw;
    background-color: black;
}

.reloadIcon {
    padding-right: 0.8rem;
}

.skip {
    padding-top: 0.5rem;
}

.skipIcon {
    padding-left: 0.5rem;
}

.playAgain {
    font-size: 15px;
}

.result {
    display: flex;
    flex-direction: row;
    color: #333333;
}

.yourAns {
    display: flex;
    flex-direction: column;
    padding-right: 2rem;
    margin-left: 2rem;
}

.correct {
    height: auto;
    flex-direction: column;
    margin-right: 0.5rem;
}

.resultsQuotes p {
    font-size: 14px;
}

.result h2 {
    font-size: 16px;
    font-weight: 600;
}

.result p {
    word-wrap: break-word;
}

/* INPUT FIELD */

.ans {
    padding: 0.5rem;
}

.ans button {
    padding: 0.5rem;
    color: #333333;
    background-color: #BBBBBB;
}

.ans:hover button {
    background-color: #333333;
    color: #f2f2f2;
}

.ans button {
    transition: all 1s;
}

.container {
    background-color: #EEEEEE;
    width: auto;
}


.info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.startBtn {
    background-color: #BBBBBB;
    padding: 1rem;
}

.startBtn h2 {
    color: #333333;
    font-size: 28px;
    font-weight: 900;
    padding: 1rem;
}

.startBtn:after,
.startBtn:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0%;
    content: '.';
    color: transparent;
    background: #aaa;
    height: 1px;
}

.startBtn:hover:after {
    width: 100%;
}

.startBtn,
.startBtn h2 {
    transition: all 1s;
}

.startBtn:after {
    text-align: left;
    content: '.';
    margin: 0;
    opacity: 0;
}

.startBtn:hover {
    z-index: 1;
    background-color: #333333;
}

.startBtn:hover h2 {
    color: #f2f2f2;
}

.startBtn:hover:after {
    z-index: -10;
    animation: fill 1s forwards;
    -webkit-animation: fill 1s forwards;
    -moz-animation: fill 1s forwards;
    opacity: 1;
}

/* ROUNDS */

.rounds {
    width: 40%;
    margin-left: 30%;
    margin-top: 1rem;
}

/* QUIZ_ACTIVE */

.quizActive h3 {
    font-size: 18px;
    font-weight: 600;

}

.rules {
    padding: 1rem;
    color: #333333;
}

.rules h4 {
    margin-top: 0.5rem;
    font-size: 16px;
    font-weight: 800;
}

.quote {
    display: flex;
    flex-direction: column;
    margin-bottom: 4vh;
    height: auto;
}

.quoteInfo {
    background: #EEEEEE;
    border-left: 10px solid #888888;
    quotes: "\201C""\201D""\2018""\2019";
    overflow-wrap: break-word;
    padding: 1rem;
}

.quoteInfo:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.15em;
    vertical-align: -0.4em;
}

.quoteInfo p {
    display: inline;
    font-family: 'Spirax', cursive;
    font-size: 35px;
    font-weight: 900;
    color: #333333;
}

.inputCon {
    display: flex;
    justify-content: center;
}

.quote {
    margin-top: 2rem;
}

@media screen and (max-width: 1024px) {
    .modal {
        width: 80vw;
    }
}

@media screen and (max-width: 960px) {
    .Quiz {
        margin-top: 25vh;
        flex-direction: column;
        height: 75%;
    }

    .inputCon {
        margin-top: 2rem;
    }

}

@media screen and (max-width: 640px) {
    .Quiz {
        margin-top: 5vh;
        flex-direction: column;
        height: 75%;
    }

    .modal {
        width: 110vw;
    }

    .result {
        flex-direction: column;
        font-size: 10px;
    }

    .result h2 {
        font-size: 12px;
    }

    .result div {
        padding-bottom: 1rem;
    }

    .Quiz {
        margin-top: 25vh;
    }

    .startBtn h2 {
        font-size: 20px;
        font-weight: 500;
    }

    .quizActive h3 {
        font-size: 14px;
        font-weight: 400;
    }

    .quoteInfo p {
        font-size: 20px;
    }

    .rTitle h3 {
        font-size: 14px;
    }
}

@media screen and (max-width: 340px) {
    .startBtn {
        padding: 0;
    }

    .result {
        font-size: 6px;
    }

    .result h2 {
        font-size: 8px;
    }
}
</style>