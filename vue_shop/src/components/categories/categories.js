
import { getCategoriesList } from "@/api/categoriesList_axios"

import { getClassify } from "@/api/getClassifyList_axios"

import { addCataClassify } from "@/api/addCata_axios"
export default {
    data() {
        return {
            querInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 5
            },
            addForm: {
                cat_name: '',
                cat_pid: 0,
                cat_level:0
            },
            //验证规则
            addFormRules: {
                cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' },
               ]
            },
            //父级分类列表数据
            parentCateList:[],
            //选中分类
            selectCategory:[],
            tableData: [],
            dialogVisible: false,
            total: 0,
            columns: [{
                label: '商品名称',
                prop: "cat_name",
                align: "center",
                headerAlign: "center"
            },
            {
                label: '是否删除',
                type: 'template',
                align: "center",
                headerAlign: "center",
                template: 'likes',
            },
            {
                label: '排序',
                type: 'template',
                align: "center",
                headerAlign: "center",
                template: 'sort',
            },
            {
                label: '操作',
                type: 'template',
                align: "center",
                headerAlign: "center",
                template: 'operate',
            },
            ]
        }
    },

    created() {
        this.getCategorieslistData()
    },
    methods: {
        async getCategorieslistData() {
            var { data: ref } = await getCategoriesList("categories", this.querInfo)
            this.tableData = ref.data.result
            this.total = ref.data.total
            console.log(ref)
        },

        //当前显示条数改变
        handleSizeChange(val) {
            this.querInfo.pagesize = val
            this.getCategorieslistData()
        },
        //页面改变
        handleCurrentChange(va1) {
            this.querInfo.pagenum = va1
            this.getCategorieslistData()
        },
        //添加分类
        addClassify() {
            this.dialogVisible = true
            this.getClassifyList()
        },

        //确定添加
        addCate(){
            this.$refs.form.validate(async item=>{
                 if(!item) return 
                    if(this.selectCategory){
                        this.addForm.cat_pid = this.selectCategory.slice(-1)[0]
                        this.addForm.cat_level = this.selectCategory.length                   
                    }
                    console.log(this.addForm)
                    var {data:ref} = await addCataClassify("categories",this.addForm)
                    this.dialogVisible = false
                    this.getCategorieslistData()

            })

        },
        //获取分类列表
       async getClassifyList(){
               var {data:ref}= await getClassify()
               this.parentCateList = ref.data
               console.log(ref)
        },
        //关闭表单
        closeFrom(){
            this.selectCategory=[]
            this.$refs.form.resetFields()
        }
    }

}