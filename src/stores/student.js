import { action, observable, runInAction } from "mobx";
import { client } from "common/utils/request";

class StudentModel {


    @observable filteredListData = [];

    @action
    getFilteredListData = (goupName) => {
        if (!goupName) {
            this.filteredListData = this.listData;
        } else {
            this.filteredListData = this.listData.filter(
                (st) => st.group_name === goupName
            );
        }
    };

    @action
    fetchListData = async (params) => {
        this.state = "pending";
        this.listData = [];

        try {
            const res = await client({
                url: "/messages/usersGroup",
                params,
            });
            const { status, data } = res;
            if (status === 200) {
                if (Array.isArray(data)) {
                    runInAction(() => {
                        this.listData = Array.isArray(data.result) ? data.result : [];
                        this.filteredListData = this.listData;
                    });
                } else {
                    runInAction(() => {
                        this.listData = Array.isArray(data.result.data)
                            ? data.result.data
                            : [];
                        this.filteredListData = this.listData;
                    });
                }
                this.state = "done";
            }
        } catch (e) {
            this.state = "error";
        }
    };

}

export default new StudentModel("/students");
