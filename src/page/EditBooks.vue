<template>
  <div class="text">
    <FormAddBooks @create="postBook" />
  </div>
</template>

<script>
import FormAddBooks from "@/components/FormAddBooks";
import {api} from "@/api/api";
export default {
	components: {FormAddBooks},
	methods: {
		async postBook(form) {
			try {
				await api.post("/books", form)
			} catch (e) {
				console.log(e)
			}
		}
	}
}
</script>

<style>
.text {
  color: rebeccapurple;
}
</style>
