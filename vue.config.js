module.exports = {
    devServer: {
        host: "localhost",
        port: 8080,
        proxy: {
            "/api": {
                target: "http.baidu.com",
                changeOrigin: true,
                pathRewrite: {
                    "/api": "/api"
                }
            }
        }
    }
}
