<template>
  <div class="login_colour">
    <div class="login_box">
      <!--图片绘制-->
      <div class="img_flex">
        <div class="avatar_img">
          <img src="../assets/logo.png" alt="" />
        </div>
      </div>
      <!--表单绘制-->
      <el-form class="login_form" :model="form" :rules="rules" ref="ruleForm">
        <!--用户名-->
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user" v-model="form.name"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!--按钮区绘制-->
        <el-form-item class="btns">
          <el-button type="success" @click="login_verify('ruleForm')"
            >登录</el-button
          >
          <el-button type="info" @click="reset('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginBtn } from "../api/login_axios";

export default {
  data() {
    return {
      form: {
        name: "admin",
        password: "123456",
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    reset(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
    },
    login_verify(formName) {
      this.$refs[formName].validate((item) => {
        console.log(item);
        if (item) {
          var didentity = {
            username: this.form.name,
            password: this.form.password,
          };
          loginBtn(didentity)
            .then((item) => {
              const { data: res } = item;
              console.log(res);
              if (res.meta.status == 200) {
                sessionStorage.setItem("token", res.data.token);
                this.$Message({
                  message: "登录成功",
                  type: "success",
                });
                this.$router.push("/home");
              } else {
                this.$Message.error("登录失败");
              }
            })
            .catch((error) => {
              console.log("eerror", error);
            });
        }
      });
    },
    enterClick() {
      //绑定键盘事件
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.login_verify("ruleForm");
        }
      };
    },
  },
  created() {
    this.enterClick();
  },
};
</script>

<style lang="less" scoped>
.login_colour {
  background-color: #2b4b6b;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center; //主轴对齐方式
  align-items: center; //侧轴对齐方式
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: aliceblue;
  border-radius: 3px;
}

.img_flex {
  width: 100%;
  display: flex;
  justify-content: center;
  // transform: translateY(-50%);
  margin-top: -20%;
}
.avatar_img {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;

  img {
    width: 100%;
    height: 100%;
    background-color: #eee;
    border-radius: 50%;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  width: 90%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>