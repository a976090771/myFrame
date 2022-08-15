<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addClassify">添加分类</el-button>
      <!--添加分类对话框-->
      <el-dialog title="添加分类" :visible.sync="dialogVisible"   @close='closeFrom'>
        <el-form
          ref="form"
          :model="addForm"
          :rules="addFormRules"
          label-width="80px"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
              v-model="selectCategory"
              :options="parentCateList"
              :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name',children:'children' ,checkStrictly:'true'}"
              clearable
         
            ></el-cascader>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <tree-table
        :data="tableData"
        :columns="columns"
        :selection-type="false"
        :show-index="true"
        :expand-type="false"
        index-text="#"
        border
        :show-row-hover="false"
        class="tree"
      >
        <template v-slot:likes="scope">
          <i
            v-if="!scope.row.cat_deleted"
            style="color: lightgreen"
            class="el-icon-success"
          ></i>
          <i v-else class="el-icon-error" style="color: red"></i>
        </template>

        <template v-slot:sort="scope">
          <el-tag v-if="scope.row.cat_level == 0">标签一</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level == 1"
            >标签二</el-tag
          >
          <el-tag type="info" v-else-if="scope.row.cat_level == 3"
            >标签三</el-tag
          >
        </template>

        <template v-slot:operate="scope">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import categories from "@/components/categories/categories.js";

export default {
  ...categories,
};
</script>

<style lang="less" scoped >
.tree {
  margin-top: 10px;
}
.el-cascader{
  width: 100%;
}
</style>