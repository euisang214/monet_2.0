"use client";

import React from "react";

export default function Stars({value=0,onChange}:{value?:number; onChange?:(v:number)=>void}){
  const [v,setV]=React.useState(value);
  React.useEffect(()=>setV(value),[value]);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i=>(
        <button key={i} aria-label={`Rate ${i}`} onClick={()=>{ setV(i); onChange?.(i); }} className="text-xl" type="button">
          {i<=v ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
