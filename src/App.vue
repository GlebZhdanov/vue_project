<template>
  <v-app class="app">
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
	name: "App",
	components: {
		Navbar,
	},

	data: () => ({
		//
	}),
};
</script>

<style>
.app {
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
}

</style>
