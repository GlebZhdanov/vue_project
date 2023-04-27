<template>
  <v-form
    ref="form"
    v-model="valid"
    class="pa-5"
  >
    <v-card-title class="justify-center">
      <span class="text-h5">Редактировать книгу</span>
    </v-card-title>

    <v-text-field
      v-model="form.title"
      label="Название"
      required
    />
    <v-text-field
      v-model="form.year"
      label="Год"
      required
    />
    <v-text-field
      v-model="form.author"
      label="Автор"
      required
    />
    <v-text-field
      v-model="form.price"
      label="Цена"
      type="number"
      required
    />
    <v-select
      v-model="form.genre"
      :items="items"
      :rules="[v => !!v || 'Выберете жанр']"
      label="Выбрать жанр"
      required
    />
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
    <v-card-actions class="mt-4 justify-center">
      <v-btn
        color="#C5CAE9"
        :disabled="!form.cover || !valid"
        @click="editBook"
      >
        Редактировать
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
	props: {
		value: {
			type: Object,
			required: true
		},
	},
	data: () => ({
		form: {
			type: Object,
			default: {},
		},
		valid: true,
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
	watch: {
		value(newValue) {
			this.form = newValue
		}
	},
	created() {
		this.form = this.value
	},
	methods: {
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
		editBook () {
			this.$emit("editBook", this.form)
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
