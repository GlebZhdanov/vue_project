<template>
  <v-card color="grey lighten-5">
    <v-card-title class="text-center justify-center py-6 pb-0">
      <h1 class="font-weight-bold text-h3 basil--text mr-16">
        BOOK
      </h1>
    </v-card-title>

    <v-tabs
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        link
        class="tab"
      >
        <router-link
          class="link"
          to="/"
        >
          Просмотр книг
        </router-link>
      </v-tab>
      <v-tab>
        <router-link
          to="/basket"
          class="link"
        >
          Корзина ({{ allBookBasket.length }})
        </router-link>
      </v-tab>
      <v-tab class="text--red">
        <router-link
          class="link"
          to="/edit"
        >
          Редактирование книги
        </router-link>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>

export default {
	name: "Navbar",
	computed: {
		allBookBasket() {
			return this.$store.getters.getAllBasketBooks
		}
	}
}
</script>

<style>
.link {
  text-decoration: none;
  width: 100%;
  padding-top: 17px;
  padding-bottom: 17px;
  display:table-cell; vertical-align:middle; text-align:center;
}
</style>
