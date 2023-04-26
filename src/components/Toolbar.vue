<template>
  <v-row align="center">
    <v-col
      class="d-flex"
      sm="6"
    >
      <v-select
        v-model="selectedSort"
        class="mt-6"
        id-items:
        :items="items"
        label="Сортировать"
        outlined
      />
    </v-col>
    <v-text-field
      v-model="searchName"
      placeholder="Поиск по названию книги"
    />
  </v-row>
</template>
<script>
export default {
	data: () => ({
		items: [
			{value: "year", text: "Году издания"},
			{value: "price", text: "Цене"},
		],
		itemsReserve: [
			{value: "decreasing", text: "По убыванию"},
			{value: "increasing", text: "По возрастанию"},
		],
		selectedSort: "",
		searchName: "",
	}),
	watch: {
		selectedSort() {
			this.$emit("getSelectedSort", this.selectedSort)
		},
		searchName() {
			this.$emit("getSearchName", this.searchName)
		}
	}
}
</script>

<style>

</style>
