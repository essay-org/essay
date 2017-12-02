<template>
	<div class="category-list">
		<div class="list">
			<ul>
				<li v-for="(item,index) in tags" :key="index">
					<nuxt-link :to="{name:'tags-category-page',params:{category:item.tag}}">{{item.tag}} ({{item.count}})</nuxt-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
  name: 'Tags',
  computed: {
    tags() {
      return this.$store.state.tags;
    }
  }
};
</script>
