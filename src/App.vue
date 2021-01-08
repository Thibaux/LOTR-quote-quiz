<template>
    <div class="Main">
        <div class="bg bg-hero">
        </div>
        <quiz>
        </quiz>
        <div class="footer">
            <div class="name">&#169; Thibaux Swildens</div>
        </div>
    </div>
</template>
<script>
import quiz from './components/quiz.vue'

export default {
    name: 'App',
    components: {
        quiz
    }
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html,
body {
    background-color: #333333;
    margin: 0;
    padding: 0;
}

#app {
    font-family: Comfortaa, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #f2f2f2;
    margin: 0;
    padding: 0;
    position: relative;
}


/* MAIN */

.Main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 98vh;
}


/* BG img */
.bg-hero {
    position: absolute;
    top: 0;
    height: 30vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.bg-hero img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 50%;
    min-height: 50%;
}


/* Footer */

.footer {
    width: 100%;
    position: absolute;
    display: flex;
    bottom: 0;
    height: 1vh;
    font-weight: 400;
    font-size: 11px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.links {
    margin-left: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.git .linked img {
    width: 25px;
    height: auto;
}

.linkedin {
    background-color: white;
}

.github {
    margin-right: 0.5rem;
}

.bgFooter {
    display: none;
}

@media screen and (max-width: 960px) {
    .bg {
        height: 25vh;
    }
}

@media screen and (max-width: 640px) {
    .bg {
        height: 25vh;
    }
}

@media screen and (max-width: 340px) {
    .Main {
        height: auto;
    }
}
</style>