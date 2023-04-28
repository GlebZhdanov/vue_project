<template>
  <div id="example-2">
    <transition name="bounce">
      <v-alert
        v-if="isSuccessRequest"
        :class="{ popup: isPopup }"
        class="alert"
        type="success"
      >
        Запрос прошел успешно
      </v-alert>
      <v-alert
        v-if="isErrorRequest"
        type="error"
        class="alert"
      >
        Произошла ошибка
      </v-alert>
    </transition>
  </div>
</template>

<script>
export default {
	props: {
		isSuccessRequest: {
			type: Boolean,
			required: true,
		},
		isErrorRequest: {
			type: Boolean,
			required: true,
		},
		isPopup: {
			type: Boolean,
			required: false,
		}
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

.popup {
  top: 10%;
}

.alert {
  position: fixed;
  width: 450px;
  margin: 0;
}
</style>
