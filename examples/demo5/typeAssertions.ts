//Sometimes you need a variable of certain type that TypeScript doesnt know about or it may infer about but you want it to be more or less specific 
//For example, Typescript would know that document.getElementById would return some kind of `HTMLElement` but you might know that your page will always have an HTMLCanvasElement for a given ID

const myCanvas = document.getElementById("root") as HTMLCanvasElement

// TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:
let x = "hello" as number // not allowed

//Although sometimes type assertions can be too restrictive and conservative. If this happens you can use two type assertions:
const a = "2+2" as any as string

