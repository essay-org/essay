<template>
  <div class="admin">
  	<admin-aside></admin-aside>
    <div class="content">
      <div class="article">
        <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>状态</th>
              <th>操作</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr class="publish">
              <td>这是文章标题</td>
              <td>发布</td>
              <td>编辑</td>
              <td>删除</td>
            </tr>
            <tr class="draft">
              <td>这是文章标题这是文章标题这是文章标题这是文章标题这是文章标题这是文章标题这是文章标题</td>
              <td>草稿</td>
              <td>编辑</td>
              <td>删除</td>
            </tr>
            <tr class="draft">
              <td>这是文章标题</td>
              <td>草稿</td>
              <td>编辑</td>
              <td>删除</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
	import AdminAside from '../../components/admin/AdminAside.vue'
	export default {
		components: {
			AdminAside
		}
	}
</script>