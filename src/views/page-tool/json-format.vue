<template>
  <main>
    <el-form :inline="true" class="form">
      <el-form-item label="选择缩进">
        <el-select v-model="searchParams.indent" placeholder="选择缩进">
          <el-option label="空格：2" value="space-2" />
          <el-option label="空格：4" value="space-4" />
          <el-option label="制表符：2" value="tab-2" />
          <el-option label="制表符：4" value="tab-4" />
        </el-select>
      </el-form-item>
    </el-form>
    <section>功能待开发</section>
  </main>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const searchParams = reactive({
  indent: 'space-2'
})
</script>
<style lang="scss" scoped>
.form .el-select {
  --el-select-width: 130px;
}
</style>