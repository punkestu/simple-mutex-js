let isLocked = false;
const queue = [];

function lock() {
    return new Promise((resolve, reject) => {
        queue.push({resolve, reject});
        dispatch();
    });
}

function dispatch() {
    if (!isLocked && queue.length > 0) {
        isLocked = true;
        const entry = queue.shift();
        if (!entry) {
            return;
        }
        entry.resolve();
    }
}

function unlock() {
    isLocked = false;
    dispatch();
}

module.exports = {
    lock, unlock
}