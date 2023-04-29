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

  <!--    <v-tabs-->
  <!--      background-color="transparent"-->
  <!--      color="basil"-->
  <!--      grow-->
  <!--      class="pl-0"-->
  <!--    >-->
  <!--      <v-tab-->
  <!--        link-->
  <!--        class="tab pa-0"-->
  <!--      >-->
  <!--        <router-link-->
  <!--          exact-active-class="link_active"-->
  <!--          class="link"-->
  <!--          to="/"-->
  <!--        >-->
  <!--          Просмотр книг-->
  <!--        </router-link>-->
  <!--      </v-tab>-->
  <!--      <v-tab>-->
  <!--        <router-link-->
  <!--          exact-active-class="link_active"-->
  <!--          to="/basket"-->
  <!--          class="link"-->
  <!--        >-->
  <!--          Корзина ({{ allBookBasket.length }})-->
  <!--        </router-link>-->
  <!--      </v-tab>-->
  <!--      <v-tab class="text&#45;&#45;red">-->
  <!--        <router-link-->
  <!--          exact-active-class="link_active"-->
  <!--          class="link"-->
  <!--          to="/edit"-->
  <!--        >-->
  <!--          Редактирование книги-->
  <!--        </router-link>-->
  <!--      </v-tab>-->
  <!--    </v-tabs>-->
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
  display:table-cell; vertical-align:middle; text-align:center;
}

.link_active {
  background: #93ec9a;
}
</style>
