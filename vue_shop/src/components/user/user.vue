<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!--layout布局-->
      <el-row :gutter="20">
        <el-col :span="8">
          <!--搜索框-->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="UserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="
                UserList({ query: queryInfo.query, pagenum: 1, pagesize: 999 })
              "
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <!-- <el-button type="primary" @click="addUsers">添加用户</el-button> -->
          <addUusers @UserList="UserList" @acv="acv"></addUusers>
        </el-col>
      </el-row>

      <!--用户列表-->
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column align="center" type="index" label="#" width="180">
        </el-table-column>

        <el-table-column
          align="center"
          prop="username"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column align="center" prop="mobile" label="电话">
        </el-table-column>

        <el-table-column align="center" prop="role_name" label="角色">
        </el-table-column>
        <el-table-column align="center" prop="mg_state" label="状态">
          <template v-slot:default="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="transForm(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="scope">
            <!--修改-->
            <el-tooltip effect="dark" content="修改" placement="top-start">
              <el-button
                type="primary"
                @click="userModClick(scope)"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <!--删除-->
            <el-tooltip effect="dark" content="删除" placement="top-start">
              <el-button
                type="danger"
                @click="open(scope)"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
            <!--分配角色-->
            <el-tooltip effect="dark" content="分配角色" placement="top-start">
              <el-button
                type="warning"
                @click="setRole(scope.row)"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 20, 50, 100]"
        :page-size="queryInfo.pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <el-dialog
        title="修改用户"
        :visible.sync="usermod"
        @close="resetForm('addFormRef')"
        width="50%"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="姓名" prop="username">
            <el-input disabled v-model="addForm.username"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="resetForm('addFormRef')">取 消</el-button>
          <el-button type="primary" @click="gitCommit('addFormRef')"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!--分配角色-->
      <el-dialog title="分配角色" :visible.sync="role" width="30%">
        <p>当前用户:{{ roleInfo.username }}</p>
        <p>当前角色:{{ roleInfo.role_name }}</p>
        <p>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="role = false">取 消</el-button>
          <el-button type="primary" @click="confirmRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import resetObject from "@/components/user/revise";

export default {
  ...resetObject,
};
</script>

<style>
</style>