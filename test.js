const {lock, unlock} = require(".");
const data = {
    stock: 20,
    order: 0
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

setTimeout(async () => {
    console.log("process1");
    await lock();
    console.log("process1 is reading");
    if (data.stock >= 10) {
        await sleep(1000);
        data.stock -= 10;
        data.order += 10;
        console.log("process1", data);
    } else {
        console.log("process1 out of stock");
    }
    unlock();
}, 2000);
setTimeout(async () => {
    console.log("process2");
    await lock();
    console.log("process2 is reading");
    if (data.stock >= 10) {
        await sleep(1000);
        data.stock -= 10;
        data.order += 10;
        console.log("process2", data);
    } else {
        console.log("process2 out of stock");
    }
    unlock();
}, 1999);