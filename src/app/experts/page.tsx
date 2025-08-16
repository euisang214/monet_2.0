"use client";
import { useState } from "react";
import { professionals } from "@/lib/mockData";


export default function Experts(){
  const [filters, setFilters] = useState({
    industry: "",
    firm: "",
    experience: "",
    availability: ""
  });
  return (
   <div className="container mx-auto px-4 py-8">
     <div className=" gap-8">
       {/* Sidebar Filters */}
       <div className="w-64 space-y-4">
         <h2 className="text-lg font-semibold">Filters</h2>
         
         <div>
           <label className="block text-sm font-medium mb-2">Industry</label>
           <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
             <option>Select Industry</option>
             <option>Finance</option>
             <option>Consulting</option>
             <option>Technology</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium mb-2">Firm</label>
           <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
             <option>Select Firm</option>
             <option>Goldman Sachs</option>
             <option>JP Morgan</option>
             <option>Morgan Stanley</option>
           </select>
         </div>
         <div>
           <label className="block text-sm font-medium mb-2">Experience</label>
           <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
             <option>Select Experience Level</option>
             <option>0-2 years</option>
             <option>3-5 years</option>
             <option>5years</option>
           </select>
         </div>
        </div>
       {/* Results */}
       <div className="-1">
         <h1 className="text-2xl font-bold mb-4">Search Results</h1>
         <p className="text-gray-600 mb-6">Showing results for your search criteria</p>
         
         <table className="w-full">
           <thead>
             <tr className="border-b">
               <th className="text-left py-3">Name</th>
               <th className="text-left py-3">Title</th>
               <th className="text-left py-3">Experience</th>
               <th className="text-left py-3">Availability</th>
               <th className="text-left py-3">Actions</th>
             </tr>
           </thead>
           <tbody>
             {professionals.map(p => (
               <tr key={p.id} className="border-b">
                 <td className="py-4">{p._name || "Expert"}</td>
                 <td className="py-4">{p.title} at {p.employer}</td>
                 <td className="py-4">{p.seniority} years</td>
                 <td className="py-4">Weekdays</td>
                 <td className="py-4">
                   <a href={`/profile/${p.id}`} className="text-teal-600 font-medium">View Profile</a>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
        </div>
      </div>
    </div>
  );
}
