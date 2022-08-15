import { getUserList } from "@/api/userList_axios";
import { ChangeState } from "@/api/transForm_axios";
import { Commlt } from "@/api/git_commit_axios";
import { deleteUser } from "@/api/deleteUser_axios";
import addUusers from '@/components/commonComponents/addUusers.vue';
import { allotRoles } from "@/api/allotRole_axios";
import { revampUser } from "@/api/revampuser_axios";

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
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      role: false,
      usermod: false,
      roleInfo: {},
      //添加用户表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      userid: "",
      rolesList:[],
      //已选中的id值
      value:'',
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
    };
  },
  mounted() {
    this.UserList();
  },
  methods: {
    acv() {
      console.log("asdfjsdalfkjasdlfjlsdkjfklsdf")
    },

    async UserList(data) {
      debugger;
      console.log(this.queryInfo.pagesize);
      var { data: userData } = await getUserList(
        "users",
        data ? data : this.queryInfo
      );
      this.tableData = userData.data.users;
      this.total = userData.data.total;
    },
    //条数改变
    handleSizeChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagesize = newPage;
      this.UserList();
    },

    //页码改变
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.UserList();
    },
    //状态改变
    async transForm(state) {
      console.log(state);
      var { data: res } = await ChangeState(state);
      if (res.meta.status != 200) {
        this.$Message.error("更改失败");
        state.mg_state = !state.mg_state;
      } else {
        this.$Message({
          message: "更新成功",
          type: "success",
        });
      }
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.usermod = false;
      this.resetObject(this.addForm);
      console.log(this.addForm);
    },

    resetObject() {
      for (let i in this.addForm) {
        this.addForm[i] = "";
      }
    },

    //修改提交
    gitCommit(formName) {
      this.$refs[formName].validate(async (item) => {
        if (item) {
          let data = {
            id: this.userid,
            email: this.addForm.email,
            mobile: this.addForm.mobile,
          };
          console.log(data);
          let { data: res } = await Commlt(data);
          if (!res.meta.status == 200) return this.$Message.error(res.meta.msg);
          this.$Message({
            message: res.meta.msg,
            type: "success",
          });

          this.usermod = false;
          this.UserList();
        }
      });
    },

    //删除信息
    open(data) {
      this.$confirm("是否删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          debugger;
          console.log(data);
          deleteUser(data.row.id).then((item) => {
            let { data: ref } = item
            if (ref.meta.status != 200)
              return this.$Message.error(ref.meta.msg);
            this.$Message({
              type: "success",
              message: "删除成功!",
            });
            this.UserList();
          });
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    userModClick(rowData) {
      console.log(rowData);
      let { row } = rowData;
      this.usermod = !this.usermod;
      this.addForm.username = row.username;
      this.addForm.email = row.email;
      this.addForm.mobile = row.mobile;
      this.userid = row.id;
    },
    //分配角色
    async setRole(info) {
      this.role = true
      this.roleInfo = info
      var { data: ref } = await allotRoles('roles')
      console.log(ref)
      this.rolesList = ref.data

    },

    //分配角色确定按钮
   async confirmRole(){

  
       let {data:ref} =await revampUser(this.roleInfo.id,this.value)

      this.UserList()
      this.role=false
      }


  },
  components: {
    addUusers
  }

}