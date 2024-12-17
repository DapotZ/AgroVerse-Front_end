import React, { useState, useEffect } from "react";
import { createPost } from "../../../api/postingan";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = await createPost(title, content);
    setTitle("");
    setContent("");
    alert("Post added successfully!");
    // Bisa disertakan logika untuk memperbarui UI, seperti mengubah state di parent component
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username); // Menyimpan username pengguna
    }
  }, []);

  return (
    <div className="sm:-mt-80 -mt-72 relative z-20 flex justify-center w-full px-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-none bg-[#416D1933] p-6 rounded-lg shadow-lg border border-blackflex flex-col"
      >
        <div className="flex items-center mb-4 space-x-4">
          <div>
            {/* Menampilkan username */}
            <p className="font-semibold text-3xl font-montserrat text-[#416D19]">
              Buat postingan
            </p>
          </div>
        </div>
        <hr className="h-1 bg-white" />
        <div className="flex items-center mb-4 space-x-4">
          <div>
            {/* Menampilkan username */}
            <p className="font-semibold text-base font-poppins mt-4 text-[#585151]">
              {username}
            </p>
          </div>
        </div>

        {/* Input Judul Postingan */}
        <input
          type="text"
          placeholder="Judul Postingan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none"
        />

        {/* Input Konten Postingan */}
        <textarea
          placeholder="Tulis sesuatu..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none "
        />

        {/* Menambahkan tombol kirim */}
        <button
          type="submit"
          className="w-full py-2 bg-[#269D26] text-white rounded-lg hover:bg-green-600 "
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default PostForm;
