<template>
<!--  <v-container fluid>-->
<!--    <v-app-bar-->
<!--        color="blue"-->
<!--        dark-->
<!--        shaped-->
<!--    >-->
<!--      <v-spacer />-->
<!--      <v-bth class="ml-5">-->
<!--        <router-link to="/">Просмотр книг</router-link>-->
<!--      </v-bth>-->
<!--      <v-bth class="ml-5">-->
<!--        <router-link to="/basket">Корзина</router-link>-->
<!--      </v-bth>-->
<!--      <v-bth class="ml-5">-->
<!--        <router-link to="/edit">Редактировать книги</router-link>-->
<!--      </v-bth>-->
<!--    </v-app-bar>-->
<!--  </v-container>-->
  <v-bottom-navigation
      color="teal"
      grow
  >
    <v-btn value="recent">
      <router-link class="link" to="/">Просмотр книг</router-link>
    </v-btn>
    <v-btn value="favorites">
      <router-link class="link" to="/basket">Корзина</router-link>
    </v-btn>
    <v-btn value="nearby">
      <router-link class="link" to="/edit">Редактировать книги</router-link>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>

export default {
  name: 'Navbar'
}
</script>

<style>
  .link {
    text-decoration: none;
    color-text: black;
  }
</style>
