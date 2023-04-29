<template>
  <v-card
    class="mx-auto my-12"
    max-width="250"
  >
    <v-img
      height="300px"
      :src="require('@/accets/img/cover' + book.cover.image)"
    />
    <v-card-title
      class="pa-4"
    >
      <h3 class="title">
        {{ book.title }}
      </h3>
    </v-card-title>
    <v-card-text class="sa-4">
      <v-col
        class="mx-20 pa-0"
      >
        <div class="grey--text mb-3">
          Автор: {{ book.author }}
        </div>
        <div class="grey--text mb-3">
          Год: {{ book.year }}
        </div>
        <div class="grey--text mb-3">
          Жанр: {{ book.genre }}
        </div>
        <div class="grey--text mb-3">
          Цена: {{ book.price }}
        </div>
      </v-col>
    </v-card-text>
    <v-divider class="mx-4" />
    <slot />
  </v-card>
</template>

<script>

export default {
	name: "Book",
	props: {
		book: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
