let ajaxTimes = 0;
export const request = (params) => {
    wx.showLoading({
        title: "加载中。。。"
    });
    ajaxTimes++;
    const baseUrl = "https://api.zbztb.cn/api/public/v1";
    return new Promise((reslove, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                reslove(result.data.message)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    // 同时发送出去的请求 都回来了
                    wx.hideLoading();
                }
            }

        });
    })
}