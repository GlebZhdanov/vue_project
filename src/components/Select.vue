<template>
  <v-container fluid>
    <v-select
      v-model="selectedFruits"
      :items="genre"
      label="Выберите жанры"
      multiple
    >
      <template #prepend-item>
        <v-list-item
          ripple
          @mousedown.prevent
          @click="toggle"
        >
          <v-list-item-action>
            <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">
              {{ icon }}
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
  </v-container>
</template>

<script>
export default {
	data: () => ({
		genre: [
			"История",
			"Фантастика",
			"Комедия",
			"Боевик",
			"Детектив",
			"Комедия",
		],
		selectedFruits: [],
	}),

	computed: {
		likesAllFruit () {
			return this.selectedFruits.length === this.genre.length
		},
		likesSomeFruit () {
			return this.selectedFruits.length > 0 && !this.likesAllFruit
		},
		icon () {
			if (this.likesAllFruit) return "mdi-close-box"
			if (this.likesSomeFruit) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
		},
	},

	methods: {
		toggle () {
			this.$nextTick(() => {
				if (this.likesAllFruit) {
					this.selectedFruits = []
				} else {
					this.selectedFruits = this.genre.slice()
				}
			})
		},
	},
}
</script>

<style>

</style>
