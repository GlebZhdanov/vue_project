<template>
  <v-bottom-navigation
    color="teal"
    grow
  >
    <router-link
      to="/"
      class="link"
      exact-active-class="link_active"
    >
      <v-btn class="pl-14 pr-14">
        <span>Просмотр книг</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </router-link>
    <router-link
      exact-active-class="link_active"
      to="/basket"
      class="link"
    >
      <v-btn class="pl-14 pr-14">
        <span>Корзина ({{ allBookBasket.length }})</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </router-link>
    <router-link
      exact-active-class="link_active"
      to="/edit"
      class="link"
    >
      <v-btn class="pl-14 pr-14">
        <span>Редактирование книг</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-navigation>
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
  height: 100%;
  display:table-cell;
  vertical-align:middle;
  text-align:center;

}

.link_active {
  background: #93ec9a;
}
</style>
