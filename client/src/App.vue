<script setup>
import { reactive, ref } from "vue";
import { getRequest } from "./api"

const genres = ref([]);
const actors = ref([]);
const films = ref([]);
const filters = reactive({
  genre: "",
  actor: "",
  date_start: "",
  date_end: ""
});

getRequest("genre/")
  .then(data => genres.value = data)
  .catch(err => console.log(err));

getRequest("actor/")
  .then(data => actors.value = data)
  .catch(err => console.log(err));

getFilms();


function getFilms() {
  let url = "films/?";
  
  if (filters.genre) url += `genre=${filters.genre}&`;
  if (filters.actor) url += `actor=${filters.actor}&`;
  if (filters.date_start) url += `date_start=${filters.date_start}&`;
  if (filters.date_end) url += `date_end=${filters.date_end}&`;

  url = url.slice(0, -1);

  getRequest(url)
    .then(data => films.value = data)
    .catch(err => console.log(err));
}

</script>

<template>
    <div class="controls">
        <div>
            <label>Genre</label>
            <select v-model="filters.genre" name="genres" id="genres">
                <option value="" selected>Non selected</option>
                <option v-for="genre in genres">{{ genre.name }}</option>
            </select>
        </div>
    
        <div>
            <label>Actor</label>
            <select v-model="filters.actor" name="actors" id="actors">
                <option value="" selected>Non selected</option>
                <option v-for="actor in actors">{{ actor.name }}</option>
            </select>
        </div>
    
        <div>
            <label for="from">From:</label>
            <input
              v-model="filters.date_start"
              :max="filters.date_end"
              type="date" id="from"
              name="from"
            >
        </div>
    
        <div>
            <label for="to">To:</label>
            <input
              v-model="filters.date_end"
              :min="filters.date_start"
              type="date"
              id="to"
              name="to"
            >
        </div>
    
        <button class="apply_all" @click="getFilms">submit all</button>
    </div>

    <table v-if="films.length > 0">
        <thead>
            <tr>
              <td>name</td>
              <td>country</td>
              <td>date (YYYY-mm-dd)</td>
              <td>director</td>
            </tr>
        </thead>
        <tbody class="container">
          <tr v-for="film in films">
            <td>{{ film.name }}</td>
            <td>{{ film.country }}</td>
            <td>{{ film.date.split('T')[0] }}</td>
            <td>{{ film.director }}</td>
          </tr>
        </tbody>
    </table>
</template>

<style>

</style>
