<template>
  <v-select
    v-model="selectedGenre"
    :items="genre"
    label="Выберите жанры"
    multiple
  />
</template>

<script>
export default {
	genre: [
		"История",
		"Фантастика",
		"Комедия",
		"Боевик",
		"Детектив",
	],
}
</script>

<style>

</style>
