<template>
  <v-row justify="center">
    <v-dialog
      v-model="popupVisible"
      max-width="450px"
      style="position: relative"
    >
      <div class="content">
        <v-img
          :src="require('@/accets/img/closeButton.svg')"
          top="100px"
          width="20px"
          class="close_image"
          @click="closePopup"
        />
        <v-card>
          <slot />
        </v-card>
      </div>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
	name: "Popup",
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		popupCloseTrigger: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({
		popupVisible: false,
	}),
	watch: {
		popupCloseTrigger() {
			this.closePopup()
		}
	},
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
.content {
  position: relative;
}

.close_image {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  right: 20px;
  top: 20px;
}

.close_image:hover {
  opacity: 0.6;
}
</style>
