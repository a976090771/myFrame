<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightsList" border>
        <el-table-column type="index" align="center" label="#">
        </el-table-column>

        <el-table-column align="center" prop="authName" label="权限名称">
        </el-table-column>

        <el-table-column align="center" prop="path" label="路径">
        </el-table-column>

        <el-table-column align="center" prop="pid" label="权限登记">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level==0">标签一</el-tag>
            <el-tag type="success" v-if="scope.row.level==1">标签二</el-tag>
            <el-tag type="info" v-if ="scope.row.level==2">标签三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>



<script>
import rights from "@/components/powerRegulate/rights";
export default {
  ...rights,
};
</script>

<style lang="less" scoped>
</style>