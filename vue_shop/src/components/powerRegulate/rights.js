
import { powerList } from "@/api/powerList_axios";
export default {
    data() {
        return {
            rightsList: []
        }
    },

    mounted() {
        this.getRightsList()
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },

        async getRightsList() {
            let { data: ref } = await powerList()
            if (ref.meta.status != 200) return this.$Message.error(ref.meta.msg);
            this.rightsList = ref.data
        }

    }


}