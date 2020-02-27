// f({ ka, kb, kc })

let c = (a: any) => {}
let f = () => {}

// # currification
// c(f).with({ ka }).run({ kb, kc })
// c(f).with({ ka }).run({ kb }) -> argument error
// c(f).with({ ka }).run({ ka, kb, kc }) -> argument error (ka already passed)

// # light currification
// c(f).default({ ka }).run({ ka, kb, kc })

// # memoisation
// fka1 = c(f).memo({ ka: 1, kb: 'all', kc: 'all' })
// fkaa = c(f).memo({ ka: 'all' })
// fka1.dropCache()
// fkaa.dropCache()

// # utilisation on non-functional functions
// c(f, { undefined: true }).run({ ka: ['ka'], kb: ['kb'], kc: undefined })
// // passing `undefined` to the function is supported
// c(f, { mutability: true }).default(() => ({ ka: ['ka'] }))
// // function that mutates their arguments are supported via default(() => ({}))
