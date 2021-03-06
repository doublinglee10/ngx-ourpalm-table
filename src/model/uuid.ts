function randomString() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export function uuid(): string {
    let uuid = [];
    for (let i = 0; i < 4; i++) {
        uuid.push(randomString());
    }
    return uuid.join('-');
}
