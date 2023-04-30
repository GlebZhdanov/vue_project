<template>
  <v-container class="pa-0">
    <v-select
      v-model="selectGenre"
      :items="getGenreBook"
      label="Выберите жанры"
      multiple
    >
      <template #prepend-item>
        <v-list-item
          ripple
          @mousedown.prevent
          @click="toggleGenre"
        >
          <v-list-item-action>
            <v-icon :color="selectedGenre.length > 0 ? 'indigo darken-4' : ''">
              {{ iconGenre }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Выбрать все жанры
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-1" />
      </template>
    </v-select>
    <v-select
      v-model="selectAuthor"
      :items="getAuthorBook"
      label="Выберите авторов"
      multiple
      class="pt-0"
    >
      <template #prepend-item>
        <v-list-item
          ripple
          @mousedown.prevent
          @click="toggleAuthor"
        >
          <v-list-item-action>
            <v-icon :color="selectedAuthor.length > 0 ? 'indigo darken-4' : ''">
              {{ iconAuthor }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Выбрать всех авторов
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-1" />
      </template>
    </v-select>
    <v-select
      v-model="selectYear"
      :items="getYearBook"
      label="Выберите год"
      multiple
      class="pt-0"
    >
      <template #prepend-item>
        <v-list-item
          ripple
          @mousedown.prevent
          @click="toggleYear"
        >
          <v-list-item-action>
            <v-icon :color="selectYear.length > 0 ? 'indigo darken-4' : ''">
              {{ iconYear }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Выбрать все года
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-1" />
      </template>
    </v-select>
    <v-text-field
      v-model="inputName"
      class="ma-0 pa-0"
      placeholder="Поиск по названию фильма"
    />
    <v-col
      class="mx-20 pa-0"
      md="4"
    >
      <v-select
        v-model="selectSort"
        class="ma-0"
        id-items:
        :items="items"
        label="Сортировка по цене и году"
        outlined
      />
    </v-col>
  </v-container>
</template>

<script>

export default {
	props: {
		getAuthorBook: {
			type: Array,
			required: true,
		},
		getYearBook: {
			type: Array,
			required: true,
		},
		getGenreBook: {
			type: Array,
			required: true,
		}
	},
	data: () => ({
		selectedGenre: [],
		selectedAuthor: [],
		selectedYear: [],
		searchName: "",
		selectedSort: "",
		items: [
			{value: "year", text: "Году издания"},
			{value: "price", text: "Цене"},
		],
	}),
	computed: {
		likesAllGenre () {
			return this.selectedGenre.length === this.getGenreBook.length
		},
		likesSomeGenre () {
			return this.selectedGenre.length > 0 && !this.likesAllGenre
		},
		likesAllAuthor () {
			return this.selectedAuthor.length === this.getAuthorBook.length
		},
		likesSomeAuthor () {
			return this.selectedAuthor.length > 0 && !this.likesAllAuthor
		},
		likesAllYear () {
			return this.selectedYear.length === this.getYearBook.length
		},
		likesSomeYear () {
			return this.selectedYear.length > 0 && !this.likesAllYear
		},
		iconGenre () {
			if (this.likesAllGenre) return "mdi-close-box"
			if (this.likesSomeGenre) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
		},
		iconAuthor () {
			if (this.likesAllAuthor) return "mdi-close-box"
			if (this.likesSomeAuthor) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
		},
		iconYear () {
			if (this.likesAllYear) return "mdi-close-box"
			if (this.likesSomeYear) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
		},

		selectGenre: {
			get() {
				return this.selectedGenre;
			},
			set(val) {
				this.$emit("update:genre", val);
			}
		},
		selectAuthor: {
			get() {
				return this.selectedAuthor;
			},
			set(val) {
				this.$emit("update:author", val);
			}
		},
		selectYear: {
			get() {
				return this.selectedYear;
			},
			set(val) {
				this.$emit("update:year", val);
			}
		},
		inputName: {
			get() {
				return this.searchName;
			},
			set(val) {
				this.$emit("update:name", val);
			}
		},
		selectSort: {
			get() {
				return this.selectedSort;
			},
			set(val) {
				this.$emit("update:sort", val);
			}
		},
	},
	methods: {
		toggleGenre () {
			this.$nextTick(() => {
				if (this.likesAllGenre) {
					this.selectedGenre = []
					this.$emit("update:genre", this.selectedGenre)
				} else {
					this.selectedGenre = this.getGenreBook.slice();
					this.$emit("update:genre", this.selectedGenre)
				}
			})
		},
		toggleAuthor () {
			this.$nextTick(() => {
				if (this.likesAllAuthor) {
					this.selectedAuthor = []
					this.$emit("update:author", this.selectedAuthor);
				} else {
					this.selectedAuthor = this.getAuthorBook.slice()
					this.$emit("update:author", this.selectedAuthor);
				}
			})
		},
		toggleYear () {
			this.$nextTick(() => {
				if (this.likesAllYear) {
					this.selectedYear = []
					this.$emit("update:year", this.selectedYear);
				} else {
					this.selectedYear = this.getYearBook.slice()
					this.$emit("update:year", this.selectedYear);
				}
			})
		},
	}
}
</script>

<style>

</style>
