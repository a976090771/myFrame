<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>

      <el-row>
        <el-col
          ><span>选择商品分类:</span>
          <el-cascader
            v-model="value"
            :options="options"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
            }"
            :show-all-levels="false"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- <el-button type="primary" :disabled="isBtnDisabled" size="mini"
            >添加参数</el-button
          > -->
          <addParams
            :theCurrentOptions="activeName"
            :value="value"
            @handleClick="handleClick"
            :isBtnDisabled="isBtnDisabled"
          >
            <template #buttonName> 添加参数 </template>
          </addParams>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- <el-button type="primary" :disabled="isBtnDisabled" size="mini"
            >添加属性</el-button
          > -->
          <addParams
            :theCurrentOptions="activeName"
            :value="value"
            @handleClick="handleClick"
            :isBtnDisabled="isBtnDisabled"
          >
            <template #buttonName> 添加属性 </template>
          </addParams>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="tableData">
        <el-table-column type="expand">
          <template v-slot="scope">
            <!-- 循环tag标签 -->
            <el-tag
              class="spanLeft"
              v-for="(item, index) in scope.row.attr_vals"
              :key="index"
              >{{ item }}</el-tag
            >
            <!-- 添加属性标签 -->
            <el-input
   
              class="['spanLeft','input-new-tag']"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope)"
              @blur="handleInputConfirm(scope)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </template>
        </el-table-column>

        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column
          prop="attr_name"
          align="center"
          label="属性名"
        ></el-table-column>
        <el-table-column align="center" label="操作"
          ><template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="addClick(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-edit">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import params from "@/components/params/params.js";
export default {
  ...params,
};
</script>

<style lang="less" scoped>
.el-row {
  margin: 15px;
}
.el-cascader {
  margin-left: 15px;
}
.spanLeft {
  margin-left: 15px;
}
.button-new-tag,.input-new-tag{
    margin-left: 15px;
}

</style>