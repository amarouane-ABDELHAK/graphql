
async function f() {
    return Promise.resolve(1);
}

f().then((a) => {
    console.log(a);
}); //