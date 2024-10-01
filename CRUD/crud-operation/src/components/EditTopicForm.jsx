'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditTopicForm(id, title, description) {
  const [newTitle, setNewTitle] = useState(id.title);
  const [newDescription, setNewDescription] = useState(id.description)


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ newTitle, newDescription })
      })

      if (!res.ok) {
        throw new Error('Faild to update')
      } else {
        router.refresh();
        router.push('/');
      }


    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        type="text"
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
        id="title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        type="text"
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
        id="description"
      />

      <button type="submit" className="bg-blue-600 font-bold text-white py-3 px-6 w-fit hover:bg-blue-500">
        Update Topic
      </button>
    </form>
  )
}