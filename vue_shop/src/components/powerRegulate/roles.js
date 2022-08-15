
import { getRoles } from "@/api/getRoles_axios";

import { deleteRoles } from "@/api/deleteRoles_axios";
import { getTree } from "@/api/getTree_axios";
import {permissionAssignment} from '@/api/permissionAssignment_axios'

export default {
    data() {
        return {
            tableData: [],

            //所有权限
            rightslist:[],
            defaultProps:{
                children: 'children',
                label:'authName'
            },
            dialogVisible2:false,
            defaKeys:[],
            releId:""
        }
    },
    methods: {
        async getRoleslist() {
            let { data: ref } = await getRoles("roles")
            console.log(ref)
            if (ref.meta.status != 200) return this.$Message.error(ref.meta.msg);
            this.tableData = ref.data
        },

        //删除权限功能
        deleteClick(RowId, dataId) {
            console.log("RowId", RowId)
            console.log("dataId", dataId)

            this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRoles(RowId, dataId).then(item => {
                    var { data: ref } = item
                    if (ref.meta.status != 200) return this.$Message.error(ref.meta.msg);
                    this.$Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    RowId.children = ref.data

                })
            }).catch(() => {
                this.$Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //展示分配权限对话框
        async showSetRightDialog(scope) {
            console.log(scope)
            console.log("1")
            this.releId=scope.id
            var { data: ref } = await getTree()
            this.rightslist = ref.data
            this.getRecursion(scope,this.defaKeys)
            this.dialogVisible2=true
            console.log(this.defaKeys)
    
        },

        //获取三级权限递归函数
        getRecursion(node,arr){
            if(!node.children){
               return arr.push(node.id)
            }
            node.children.forEach((item)=>{
               return this.getRecursion(item,arr)
            })

        },
        deleteDefaKeys(){
            this.defaKeys=[]
        },
       async allotRights(){
            let key = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()]
            key = key.join(",")
            console.log(this.releId)
           var {data:ref}=await permissionAssignment(this.releId,key)
            console.log(ref)
            this.getRoleslist()
            this.dialogVisible2=false
        }
    },
    mounted() {
        this.getRoleslist()
    },

}