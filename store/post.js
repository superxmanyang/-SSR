// 用户管理
export const state = () => {
    return {
        // 更新评论
        newComment:'',
        recallInfo:{},
        // 刷新点赞
        newlike:0,
        data:[]
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
    },
    newlike(state,data){
        state.newlike=data
    },
    newdata(state,data){
        state.data=data
    }
};
// 搜索接收返回数据
// 用户管理

