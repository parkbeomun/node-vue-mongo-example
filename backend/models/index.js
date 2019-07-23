const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if(process.env.NODE_ENV != "production") {
            mongoose.set("debug", true);
        }
        mongoose.connect(
            "mongodb://localhost:27017/nodestudy",
            { useNewUrlParser: true },
            error => {
                if(error) {
                    console.log('몽고디비 연결에 실패했습니다.',error);
                } else {
                    console.log('몽고디비 연결에 성공했습니다.');
                }
            }
        )

    };

    connect();
    mongoose.connection.on("error", error => {
        console.log("몽고디비 연결이 끊어졋습니다.",error);
    })
    mongoose.connection.on("disconnected", error => {
        console.log('몽고디비에 재연결합니다.');
        connect();
    })
}