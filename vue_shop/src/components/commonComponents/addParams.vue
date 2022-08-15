<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="showClick"
      :disabled="isBtnDisabled"
      ><slot name="buttonName"></slot
    ></el-button>
    <el-dialog :title="'添加' + titleText" :visible.sync="dialogVisible" @close="closeClick()">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item :label="titleText" prop="name" >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddParams"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addParams } from "@/api/addParams_axios";

export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    theCurrentOptions: {
      type: String,
    },
    paramsName: {
      type: String,
    },

    isBtnDisabled: {
      type: Boolean,
    },
    value:{
      type:Array
    }
    
  },
  methods: {
    showClick() {
      this.dialogVisible = true;
    },
    closeClick(){
      this.$refs.ruleForm.resetFields()
    },
    //添加参数
    async confirmAddParams(){
        console.log(this.value)
        let {data:ref} = await addParams(this.value[this.value.length-1],this.ruleForm.name,this.theCurrentOptions)
         console.log(ref)
         this.dialogVisible = false
         debugger;
         this.$emit("handleClick")
    }
  },
  computed: {
    titleText() {
      if (this.theCurrentOptions == "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    },
  },
};
</script>

<style>
</style>