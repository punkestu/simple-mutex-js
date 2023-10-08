class SimpleMutexJs {
    #isLocked;
    #queue;

    constructor() {
        this.#isLocked = false;
        this.#queue = [];
    }

    Lock() {
        return new Promise((resolve, reject) => {
            this.#queue.push({resolve, reject});
            this.#dispatch();
        });
    }

    #dispatch() {
        if (!this.#isLocked && this.#queue.length > 0) {
            this.#isLocked = true;
            const entry = this.#queue.shift();
            if (!entry) {
                return;
            }
            entry.resolve({unlock: () => this.Unlock()});
        }
    }

    Unlock() {
        this.#isLocked = false;
        this.#dispatch();
    }
}

module.exports = SimpleMutexJs;