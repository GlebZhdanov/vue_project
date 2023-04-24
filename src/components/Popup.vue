<template>
  <v-row justify="center">
    <v-dialog
      v-model="popupVisible"
      max-width="450px"
    >
      <!--      <template #activator="{ on, attrs }">-->
      <!--        <v-btn-->
      <!--          color="primary"-->
      <!--          dark-->
      <!--          v-bind="attrs"-->
      <!--          v-on="on"-->
      <!--        >-->
      <!--          Open Dialog-->
      <!--        </v-btn>-->
      <!--      </template>-->
      <v-card>
        <slot />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="closePopup"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closePopup"
          >
            Создать книгу
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({
		popupVisible: false,
	}),
	// watch: {
	// 	value(newValue) {
	// 		console.log(newValue)
	// 		this.popupVisible = newValue
	// 	}
	// },
	//
	// created() {
	// 	this.popupVisible = this.value
	// },
	methods: {
		closePopup() {
			this.popupVisible = false;
		},
		openPopup() {
			this.popupVisible = true;
		}
	},
}
</script>

<style>

</style>
