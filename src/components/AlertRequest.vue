<template>
  <div id="example-2">
    <transition name="bounce">
      <v-alert
        v-if="isSuccessRequest"
        :class="[isPopup ? alertPopup : alertPage, alert]"
        type="success"
      >
        Запрос прошел успешно
      </v-alert>
      <v-alert
        v-if="isErrorRequest"
        :class="[isPopup ? alertPopup : alertPage, alert]"
        type="error"
      >
        Произошла ошибка
      </v-alert>
    </transition>
  </div>
</template>

<script>
export default {
	name: "AlertRequest",
	props: {
		isSuccessRequest: {
			type: Boolean,
			required: false,
		},
		isErrorRequest: {
			type: Boolean,
			required: false,
		},
		isPopup: {
			type: Boolean,
			required: false,
		},
	},
	data: function() {
		return {
			alertPopup: "alert_popup",
			alertPage: "alert_page",
			alert: "alert",
		};
	},
}
</script>

<style>
#example-2 {
  z-index: 2;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.alert_popup {
  top: 9.5%;
}
.alert_page {
  top: 45%;
  left: 33%;
}
.alert {
  position: fixed;
  width: 450px;
  margin: 0;
}
</style>
