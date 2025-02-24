import { useEffect, useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
// import useAxiosPublic from "./hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const initialData = {
//   'To-Do': [
//     {
//       "title": "Team meeting",
//       "description": "Discuss project updates and upcoming sprint tasks.",
//       "timestamp": "2025-02-21T15:30:00Z",
//       "category": "To-Do"
//     },
//     {
//       "title": "Investigate server downtime",
//       "description": "Analyze logs and identify the cause of the recent outage.",
//       "timestamp": "2025-02-21T15:00:00Z",
//       "category": "To-Do"
//     },
//     {
//       "title": "Fix mobile responsiveness",
//       "description": "Ensure app components adapt correctly to different screen sizes.",
//       "timestamp": "2025-02-21T14:30:00Z",
//       "category": "To-Do"
//     },
//   ],
//   'In Progress': [
//     {
//       "title": "Write unit tests",
//       "description": "Increase test coverage for core application modules.",
//       "timestamp": "2025-02-21T14:00:00Z",
//       "category": "In Progress"
//     },
//     {
//       "title": "Improve error logging",
//       "description": "Enhance logging system to capture more details on failures.",
//       "timestamp": "2025-02-21T13:30:00Z",
//       "category": "In Progress"
//     },
//   ],
//   'Done': [
//     {
//       "title": "Update dependencies",
//       "description": "Upgrade outdated libraries to their latest stable versions.",
//       "timestamp": "2025-02-21T13:00:00Z",
//       "category": "Done"
//     },
//     {
//       "title": "Fix payment gateway issue",
//       "description": "Investigate and fix failed transactions in Stripe integration.",
//       "timestamp": "2025-02-21T12:30:00Z",
//       "category": "Done"
//     },
//     {
//       "title": "Set up CI/CD pipeline",
//       "description": "Configure automated deployment for staging and production.",
//       "timestamp": "2025-02-21T12:00:00Z",
//       "category": "Done"
//     },
//   ],
// };

export default function App() {

  // const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState();

  // const response = axiosPublic.get('/tasks');
  // console.log(response)

  // console.log('k') 

  // const { data: response = [] } = useQuery({
  //   queryKey: ["tasks"],
  //   queryFn: async () => {
  //     const { data } = await axiosPublic('/tasks');
  //     console.log(data);
  //     return response;
  //   },
  // });
useEffect(() => {
  axios.get('http://localhost:4000/tasks').then((response) => {
    console.log(response.data);
    setTasks(response.data);
  }
  );
}, []);

  // const { data: tasks = [] } = useQuery({ 
  //   queryKey: ["tasks"],
  //   queryFn: async () => {
  //     const { data } = await fetch('http://localhost:4000/tasks'); // Make sure to use .get()
  //     console.log(data); // Check if data is being fetched
  //     return data; // Return data instead of 'response'
  //   },
  // });

  // console.log('m')

  return (
    <section>
      {/* {console.log(response)} */}
      console.log(tasks);
      <h1 className="text-3xl font-bold text-center mt-8">Kanban Board</h1>
      {/* {console.log(response)} */}
      <DragAndDrop initialState={tasks[0]} />
    </section>
  );
}
