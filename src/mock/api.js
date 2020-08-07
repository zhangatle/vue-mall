import Mock from "mockjs"

Mock.mock("/api/user/login", {
    "status": 0,
    "data": {
        "id|10001-11000": 0,
        "username": "zhangatle",
        "email": "zhangatle@gmail.com",
        "phone": 18886888990,
        "role": 0,
        "createTime": 1596706031000,
        "updateTime": 1596706031000,
    }
});
