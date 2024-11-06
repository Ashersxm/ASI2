import { readFile, readFileSync } from 'node:fs';

readFile(process.argv[2])
    .then(data => console.log(data.toString().split(/\r?\n/).length))
    .catch(err => console.error(err))

try{
    const data  = await readFile(process.argv[2])
    console.log(data.toString().split(/\r?\n/).length)
} catch (e) {
    console.error(e)
}

