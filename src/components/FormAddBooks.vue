<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <v-col
      cols="8"
      md="6"
    >
      <v-text-field
        v-model="form.title"
        :rules="yearRules"
        label="Название"
        required
      />
    </v-col>
    <v-col
      cols="8"
      md="6"
    >
      <v-text-field
        v-model="form.year"
        :rules="yearRules"
        label="Год"
        required
      />
    </v-col>
    <v-col
      cols="8"
      md="6"
    >
      <v-text-field
        v-model="form.author"
        :rules="authorRules"
        label="Автор"
        required
      />
    </v-col>
    <v-col
      cols="8"
      md="6"
    >
      <v-select
        v-model="form.genre"
        :items="items"
        :rules="[v => !!v || 'Выберете жанр']"
        label="Выбрать жанр"
        required
      />
    </v-col>
    <v-col
      cols="8"
      md="6"
    >
      <v-select
        v-model="form.cover"
        :items="itemsCover"
        label="Выберете обложку"
      >
        <template #selection="{ item, index }">
          <img
            class="image"
            width="40px"
            height="40px"
            :src="require('@/accets/img/cover' + item.image)"
          >{{ item.nameCover }}
        </template>
        <template #item="{ item }">
          <img
            class="image_select"
            width="70px"
            height="70px"
            :src="require('@/accets/img/cover' + item.image)"
          >{{ item.nameCover }}
        </template>
      </v-select>
    </v-col>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Очистить форму
    </v-btn>
    <v-btn
      color="warning"
      @click="createBook"
    >
      Создать книгу
    </v-btn>
  </v-form>
</template>

<script>
export default {
	data: () => ({
		form: {
			title: "",
			year: "",
			author: "",
			cover: "",
			genre: "",
		},
		valid: true,
		yearRules: [
			v => !!v || "Введите год",
		],
		authorRules: [
			v => !!v || "Введите автора",
		],
		select: null,
		items: [
			"История",
			"Фантастика",
			"Комедия",
			"Боевик",
			"Детектив",
			"Комедия",
		],
		itemsCover: [
			{ nameCover: "Обложка 1", image: "1.jpeg"},
			{ nameCover: "Обложка 2", image: "2.jpeg"},
			{ nameCover: "Обложка 3", image: "3.jpeg"},
			{ nameCover: "Обложка 4", image: "4.jpeg"},
			{ nameCover: "Обложка 5", image: "5.jpeg"},
			{ nameCover: "Обложка 6", image: "6.jpeg"},
			{ nameCover: "Обложка 7", image: "7.jpeg"},
			{ nameCover: "Обложка 8", image: "8.jpeg"},
			{ nameCover: "Обложка 9", image: "9.jpeg"},
			{ nameCover: "Обложка 10", image: "10.jpeg"},
		],
	}),
	methods: {
		validate () {
			this.$refs.form.validate()
		},
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
		createBook () {
			this.$emit("create", this.form)
			// this.reset()
		}
	},
}
</script>

<style>
  .image {
    margin-right: 20px;
  }
  .image_select {
    margin: 10px 20px 10px 0;
  }
</style>
