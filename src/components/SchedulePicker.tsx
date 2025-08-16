"use client";
import { useMemo, useState } from "react";

function addDays(base: Date, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function toISO(d: Date) {
  return d.toISOString();
}

export default function SchedulePicker({ selected, onSelect }: { selected: string | null, onSelect: (slot: string) => void }) {
  const base = useMemo(() => {
    const d = new Date();
    d.setHours(9, 0, 0, 0);
    return d;
  }, []);

  // Generate a simple 7x6 grid of 30-min slots over the next week during 9am-5pm
  const days = Array.from({ length: 7 }).map((_, i) => addDays(base, i));
  const slotsPerDay = Array.from({ length: 16 }).map((_, i) => {
    const h = 9 + Math.floor(i / 2);
    const m = (i % 2) * 30;
    return { h, m };
  });

  const [picks, setPicks] = useState<string[]>(selected ? [selected] : []);

  function toggle(d: Date, h: number, m: number) {
    const slotDate = new Date(d);
    slotDate.setHours(h, m, 0, 0);
    const iso = toISO(slotDate);
    setPicks((prev) => {
      if (prev.includes(iso)) return prev.filter((x) => x !== iso);
      return [...prev, iso];
    });
    onSelect(iso);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="text-left text-sm text-muted w-28">Time</th>
            {days.map((d, i) => (
              <th key={i} className="text-left text-sm">{d.toLocaleDateString(undefined, { weekday: 'short', month:'numeric', day:'numeric' })}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slotsPerDay.map(({h,m}, rIdx) => (
            <tr key={rIdx}>
              <td className="text-sm text-muted w-28">{`${h.toString().padStart(2,'0')}:${m===0?'00':'30'}`}</td>
              {days.map((d, cIdx) => {
                const slotDate = new Date(d);
                slotDate.setHours(h, m, 0, 0);
                const iso = toISO(slotDate);
                const active = picks.includes(iso);
                return (
                  <td key={cIdx}>
                    <button
                      onClick={() => toggle(d, h, m)}
                      className={"w-full rounded-lg border px-2 py-2 text-sm " +
                        (active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white")}>
                      {active ? "Selected" : "Available"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
