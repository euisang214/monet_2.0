"use client";
export default function ProDashboard() {
 return (
   <div className="flex min-h-screen bg-gray-50">
     {/* Sidebar */}
     <aside className="w-64 bg-white border-r border-gray-200">
       <div className="p-6">
         <h1 className="text-xl font-bold">Monet</h1>
       </div>
       <nav className="px-4 space-y-1">
         <a href="/pro/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-gray-100">
           <span>Dashboard</span>
         </a>
         <a href="/pro/requests" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100">
           <span>Requests</span>
         </a>
         <a href="/pro/feedback" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100">
           <span>Feedback</span>
         </a>
         <a href="/pro/earnings" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100">
           <span>Earnings</span>
         </a>
         <a href="/pro/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100">
           <span>Settings</span>
         </a>
       </nav>
     </aside>

     {/* Main Content */}
     <main className="flex-1 p-8">
       <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

       {/* Upcoming Calls */}
       <div className="bg-white rounded-lg p-6 mb-6">
         <h3 className="text-lg font-semibold mb-4">Upcoming Calls</h3>
         <table className="w-full">
           <thead>
             <tr className="text-left text-sm text-gray-600">
               <th className="pb-3">Candidate</th>
               <th className="pb-3">Date</th>
               <th className="pb-3">Time</th>
               <th className="pb-3"></th>
             </tr>
           </thead>
           <tbody>
             <tr className="border-t">
               <td className="py-3">Liam Carter</td>
               <td className="py-3">2024-03-15</td>
               <td className="py-3">10:00 AM</td>
               <td className="py-3 text-right">
                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm">Join</button>
               </td>
             </tr>
           </tbody>
         </table>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-3 gap-6">
         <div className="bg-white rounded-lg p-6">
           <h4 className="text-sm text-gray-600 mb-2">Total Earnings</h4>
           <p className="text-3xl font-bold">$2,500</p>
         </div>
         <div className="bg-white rounded-lg p-6">
           <h4 className="text-sm text-gray-600 mb-2">Response Rate</h4>
           <p className="text-3xl font-bold">85%</p>
         </div>
         <div className="bg-white rounded-lg p-6">
           <h4 className="text-sm text-gray-600 mb-2">Recent Feedback</h4>
           <div className="mt-2 space-y-2">
             <div className="flex items-center gap-2">
               <span className="text-sm font-medium">Bob Li</span>
               <span className="text-yellow-500">★★★★★</span>
             </div>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
}