export function usd(n:number){ return `$${n.toLocaleString(undefined,{maximumFractionDigits:0})}`; }
export function classNames(...arr:(string|false|undefined)[]){ return arr.filter(Boolean).join(" "); }
