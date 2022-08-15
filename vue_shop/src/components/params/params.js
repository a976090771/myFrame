import {getclassifyparams} from '@/api/getclassifyparams_axios'
import {getattributes} from '@/api/getattributes_axios'
import addParams from '@/components/commonComponents/addParams.vue';

export default {
    data() {
        return {
            options:[],
            value:[],
            activeName:"many",
            tableData:[],
            inputVisible:false,
            inputValue:''
        }
    },
    created() { 
        this.getParams()
    
    },

    methods: {

        //添加属性方法
        handleInputConfirm(scope){
            let inputValue = this.inputValue;
            if (inputValue) {
                scope.row.attr_vals.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        showInput(){
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        async getParams(){
         
            let {data:ref} = await getclassifyparams()
            console.log(ref)
            this.options = ref.data
         
            console.log(ref.data)
        },

        handleChange(){
            console.log(this.value.length)
            this.handleClick()
        },

        async handleClick(tab,event){
            if(this.value.length == 3){
                console.log(this.value[this.value.length-1])
                console.log(this.activeName)
              let {data:ref} =  await  getattributes(this.value[this.value.length-1],this.activeName)
              this.tableData = ref.data

              ref.data.forEach(element => {
                element.attr_vals =  element.attr_vals?element.attr_vals.split(","):[]
            });
            }
        },

        addClick(data){
            console.log(data)
        }
    },
    computed:{
        isBtnDisabled(){
            return this.value.length !== 3
        }
    },

    components:{
        addParams
    }

}