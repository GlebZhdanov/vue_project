<template>
  <v-form
    ref="form"
    v-model="valid"
    class="pa-5"
  >
    <v-card-title class="justify-center">
      <span
        v-if="isEditBook"
        class="text-h5"
      >Редактировать книгу</span>
      <span
        v-else
        class="text-h5"
      >Создать книгу</span>
    </v-card-title>
    <v-text-field
      v-model="myModelTitle"
      :rules="nameRules"
      label="Название"
      required
    />
    <v-text-field
      v-model="myModelYear"
      :rules="numberRule"
      label="Год"
      required
    />
    <v-text-field
      v-model="myModelAuthor"
      :rules="authorRules"
      label="Автор"
      required
    />
    <v-text-field
      v-model="myModelPrice"
      :rules="numberRule"
      label="Цена"
      required
    />
    <v-select
      v-model="myModelGenre"
      :items="items"
      :rules="genreRules"
      label="Выбрать жанр"
      required
    />
    <v-select
      v-model="myModelCover"
      :rules="coverRules"
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
    <v-card-actions
      v-if="isEditBook"
      class="mt-4 justify-center"
    >
      <v-btn
        color="#C5CAE9"
        :disabled="!formAdd || !valid"
        @click="editBook"
      >
        Редактировать
      </v-btn>
    </v-card-actions>
    <v-card-actions
      v-else
      class="mt-4 justify-center"
    >
      <v-btn
        color="#C5CAE9"
        class="mr-4"
        @click="reset"
      >
        Очистить форму
      </v-btn>
      <v-btn
        color="#C5CAE9"
        :disabled="!formAdd || !valid"
        @click="createBook"
      >
        Создать книгу
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
	name: "FormBook",
	props: {
		isEditBook: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Object,
			required: false,
		},
		clearTrigger: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({
		formAdd: {
			title: "",
			year: "",
			author: "",
			cover: "",
			price: "",
			genre: "",
		},
		formEdit: {
			type: Object,
			default: {},
		},
		valid: true,
		numberRule: [
			v  => {
				if (!isNaN(parseFloat(v))) return true;
				return "Введите числовое значение";
			},
		],
		nameRules: [
			v => !!v || "Введите название",
		],
		authorRules: [
			v => !!v || "Введите автора",
		],
		genreRules: [
			v => !!v || "Выберите жанр",
		],
		coverRules: [
			v => !!v || "Выберите обложку",
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
	computed: {
		myModelTitle: {
			get() {
				if(this.isEditBook) {
					return this.formEdit.title
				} else {
					return this.formAdd.title
				}
			},
			set(newValue) {
				if(this.isEditBook) {
					return this.formEdit.title = newValue
				} else {
					return this.formAdd.title = newValue
				}
			},
		},
		myModelYear: {
			get() {
				if(this.isEditBook) {
					return this.formEdit.year
				} else {
					return this.formAdd.year
				}
			},
			set(newValue) {
				if(this.isEditBook) {
					return this.formEdit.year = newValue
				} else {
					return this.formAdd.year = newValue
				}
			},
		},
		myModelAuthor: {
			get() {
				if(this.isEditBook) {
					return this.formEdit.author
				} else {
					return this.formAdd.author
				}
			},
			set(newValue) {
				if(this.isEditBook) {
					return this.formEdit.author = newValue
				} else {
					return this.formAdd.author = newValue
				}
			},
		},
		myModelPrice: {
			get() {
				if(this.isEditBook) {
					return this.formEdit.price
				} else {
					return this.formAdd.price
				}
			},
			set(newValue) {
				if(this.isEditBook) {
					return this.formEdit.price = newValue
				} else {
					return this.formAdd.price = newValue
				}
			},
		},
		myModelGenre: {
			get() {
				if(this.isEditBook) {
					return this.formEdit.genre
				} else {
					return this.formAdd.genre
				}
			},
			set(newValue) {
				if(this.isEditBook) {
					return this.formEdit.genre = newValue
				} else {
					return this.formAdd.genre = newValue
				}
			},
		},
		myModelCover: {
			get() {
				if(this.isEditBook) {
					return this.formEdit.cover
				} else {
					return this.formAdd.cover
				}
			},
			set(newValue) {
				if(this.isEditBook) {
					return this.formEdit.cover = newValue
				} else {
					return this.formAdd.cover = newValue
				}
			},
		},
	},
	watch: {
		value(newValue) {
			this.formEdit = newValue
		}
	},
	clearTrigger() {
		this.reset();
	},

	created() {
		if(this.isEditBook) {
			this.formEdit = this.value
		}
	},
	methods: {
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
		createBook () {
			this.$emit("createBook", this.formAdd);
		},
		editBook () {
			this.$emit("editBook", this.formEdit)
		}
	}
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
