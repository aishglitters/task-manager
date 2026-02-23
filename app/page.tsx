"use client"; // This tells the computer this page is interactive!
import { useState, useEffect } from "react";
import { supabase } from "../client";

export default function Home() {

  const [name, setName] = useState("");
  const [activity, setActivity] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getTasks() {
    setLoading(true);
    const { data, error } = await supabase.from("Task").select("*");
    if (data) setTasks(data);
    setLoading(false);
  }
  useEffect(() => {
    getTasks();
  }, []);
  async function addTask() {
    const { error } = await supabase
      .from("Task")
      .insert([{ Name: name, Activity: activity, StartDate: startDate, EndDate: endDate }]);

    if (!error) {
      getTasks(); // Refresh the list
      setName(""); // Clear the form
      setActivity("");
    }
  }
 async function deleteTask(id: any) {
  // This adds a pop-up confirmation
  const confirmed = window.confirm("Are you sure you want to delete this task?");
  
  if (confirmed) {
    const { error } = await supabase
      .from("Task")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error: " + error.message);
    } else {
      getTasks();
    }
  }
}
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-2 text-center">
        <h1 className="text-4xl font-bold mt-10">
          <a className="text-blue-600" href="/">
            Full Stack Application With Tailwind CSS and Supabase
          </a>
        </h1>

        <div className="flex flex-wrap items-start justify-center max-w-6xl mt-6 sm:w-full gap-8">
          {/* LEFT SIDE: THE FORM */}
          <div className="p-8 border w-96 rounded-xl bg-blue-100 shadow-md">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Task Name</label>
                <input className="shadow border rounded w-full py-2 px-3 text-gray-700" type="text" placeholder="New Task" value={name} 
                           onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Task Activity</label>
                <textarea className="shadow border rounded w-full py-2 px-3 text-gray-700" rows={3} placeholder="What needs to be done?" value={activity}
                            onChange={(e) => setActivity(e.target.value)}></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Start Date</label>
                <input className="shadow border rounded w-full py-2 px-3 text-gray-700" type="date" value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
          />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">End Date</label>
                <input className="shadow border rounded w-full py-2 px-3 text-gray-700" type="date" value={endDate}
                               onChange={(e) => setEndDate(e.target.value)} />
              </div>
             <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                type="button" onClick={addTask}  >Add Task
            </button>
            </form>
          </div>

          {/* RIGHT SIDE: THE TABLE */}
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-400 text-white">
                  <th className="px-4 py-3 text-left">S/N</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Activity</th>
                  <th className="px-4 py-3 text-left">Start</th>
                  <th className="px-4 py-3 text-left">End</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
               <tr key={task.id} className="border-b text-blue-400"> 
                  <td className="px-4 py-4">{index + 1}</td>
                      <td className="px-4 py-4">{task.Name}</td>
                      <td className="px-4 py-4">{task.Activity}</td>
                       <td className="px-4 py-4">{task.StartDate}</td>
                      <td className="px-4 py-4">{task.EndDate}</td>
                        <td className="px-4 py-4">
                    <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded">Delete
</button>
                  </td>
                </tr> ))}

                {/* <tr className="border-b text-blue-400">
                  <td className="px-4 py-4">2</td>
                  <td className="px-4 py-4">Main Task</td>
                  <td className="px-4 py-4">Testing the UI</td>
                  <td className="px-4 py-4">2023-01-01</td>
                  <td className="px-4 py-4">2026-11-23</td>
                  <td className="px-4 py-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded">
                      Delete
                    </button>
                  </td>
                </tr>*/}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// This is a new build