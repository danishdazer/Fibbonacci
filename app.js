// const Redis = require('ioredis');
// const redisClient = new Redis({
//     host: '127.0.0.1',
//  port: 6379
// });
const internalCache = {};



async function nthFibonacci(n) {
    if (n <= 1) {
        return n;
    }

    // const cachedResult = await redisClient.get(n);
    // if (cachedResult !== null) {
    //     return parseInt(cachedResult, 10);
    // }
    if (internalCache.hasOwnProperty(n)) {
        return internalCache[n];
    }


    const result = await nthFibonacci(n - 1) + await nthFibonacci(n - 2);
    // await redisClient.set(n, result);

    // const cacheSize = 50;
    // const keys = await redisClient.keys('*');
    // if (keys.length > cacheSize) {
    //     const oldestKey = keys.reduce((oldest, key) => (parseInt(key) < parseInt(oldest) ? key : oldest));
    //     await redisClient.del(oldestKey);
    // }
    internalCache[n] = result;

    // Implement cache eviction if needed
    const cacheSize = 20;
    if (Object.keys(internalCache).length > cacheSize) {
        // Find the oldest key and remove it
      

        const oldestKey = Object.keys(internalCache).reduce((oldest, key) => (parseInt(key) < parseInt(oldest) ? key : oldest));
        delete internalCache[oldestKey];
    }

    return result;
}


async function main() {
    try {
        const n = parseInt(await getInput("Enter the value of n for the nth Fibonacci number: "), 10);
        const result = await nthFibonacci(n);
        console.log(`The ${n}th Fibonacci number is: ${result}`);
    } catch (error) {
        console.error("Please enter a valid integer.");
    }
}

async function getInput(prompt) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readline.question(prompt, (input) => {
            readline.close();
            resolve(input);
        });
    });
}

if (require.main === module) {
    main();
}