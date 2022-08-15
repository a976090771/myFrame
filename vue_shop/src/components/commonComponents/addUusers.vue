<template>
  <div>
    <el-button type="primary" @click="addUsers">添加用户</el-button>

    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
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
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
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
        <el-button type="primary" @click="submit('addFormRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser } from "@/api/addUser_axios";
export default {
  data() {
    //自定义校验规则
    /**
     * rule 校验规则
     * value 校验数据
     * callback 回调函数
     */
    var checkAge = (rule, value, callback) => {
      const ruleEmali =
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (ruleEmali.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确格式邮箱"));
      }
    };
    return {
      //添加用户表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //添加用户表单验证对象
      addFormRules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10个字符", trigger: "blur" },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkAge, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            required: true,
            pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
            message: "请输入正确手机号",
            trigger: "blur",
          },
        ],
      },

      dialogVisible: false,
    };
  },
  methods: {
    addUsers() {
       this.$emit("acv")
        this.dialogVisible = true;
      },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.usermod = false;
     this. resetObject(this.addForm);
      console.log(this.addForm);
    },
    resetObject() {
      for (let i in this.addForm) {
        this.addForm[i] = "";
      }
    },
    //添加
    submit(formName) {
      this.$refs[formName].validate(async (item) => {
        if (item) {
          console.log(this.addForm);
          var { data: res } = await addUser("users", this.addForm);
          console.log(res);
          if (res.meta.status == 201) {
            this.$Message({
              message: res.meta.msg,
              type: "success",
            });
            this.dialogVisible = false;
            console.log(  this.$parent)
             this.$emit('UserList')
          } else {
            this.$Message.error(res.meta.msg);
          }
        }
      });
    },
  },
};
</script>

<style>
</style>