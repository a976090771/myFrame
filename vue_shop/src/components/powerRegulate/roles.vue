<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary"> 添加角色</el-button>
      <el-table :data="tableData" border>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="[
                'boredeBottompClass',
                index === 0 ? 'boredeTopClass' : '',
                'place',
              ]"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="6">
                <el-tag
                  @close="deleteClick(scope.row, item.id)"
                  closable
                  type="primary"
                  >{{ item.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <el-row
                  :class="[index2 == 0 ? '' : 'boredeTopClass', 'place']"
                  v-for="(item2, index2) in item.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="deleteClick(scope.row, item2.id)"
                      closable
                      type="success"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      @close="deleteClick(scope.row, item3.id)"
                      closable
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template></el-table-column
        >
        <el-table-column type="index" align="center" label="#">
        </el-table-column>

        <el-table-column align="center" prop="roleDesc" label="角色名称">
        </el-table-column>

        <el-table-column align="center" prop="roleName" label="角色描述">
        </el-table-column>

        <el-table-column align="center" label="角色操作">
          <template v-slot="scope">
            <!--修改-->
            <el-tooltip effect="dark" content="修改" placement="top-start">
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <!--删除-->
            <el-tooltip effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
            <!--分配角色-->
            <el-tooltip effect="dark" content="分配角色" placement="top-start">
              <el-button
                type="warning "
                @click="showSetRightDialog(scope.row)"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="提示" @close='deleteDefaKeys'  :visible.sync="dialogVisible2" width="50%"  >
        <el-tree :data="rightslist" :props="defaultProps" ref = 'treeRef'  show-checkbox  node-key='id'  default-expand-all  :default-checked-keys='defaKeys' ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="allotRights"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import roles from "@/components/powerRegulate/roles.js";

export default {
  ...roles,
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.boredeTopClass {
  border-top: 1px solid #eee;
}
.boredeBottompClass {
  border-bottom: 1px solid#eee;
}
.place {
  display: flex;
  align-items: center;
}
</style>