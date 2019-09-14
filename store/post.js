// 用户管理
export const state = () => {
    return {
        // 更新评论
        newComment:'',
        recallInfo:{}
    }
}

export const mutations = {
    // 接收评论子组件是否要@回复
    setUserInfo(){},
    newcomment(state,data){
        state.newComment=data
    },
    // 接收子组件要@的那个人
    setrecallInfo(state,data){
        state.recallInfo=data
    }
};
