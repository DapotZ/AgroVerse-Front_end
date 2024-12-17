import React, { useEffect, useState } from "react";
import {
  getPosts,
  likePost,
  getComments,
  addComment,
} from "../../../api/postingan";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({}); // State untuk menyimpan status like tiap post

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const isLiked = likedPosts[postId] || false; // Mengecek apakah post sudah di-like
    const updatedPosts = posts.map((post) => {
      if (post.post_id === postId) {
        // Menambah atau mengurangi jumlah likes berdasarkan status like
        const updatedPost = {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
        };
        return updatedPost;
      }
      return post;
    });

    // Mengubah status like
    setPosts(updatedPosts);
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !isLiked, // Toggle status like
    }));

    // Kirim request like ke server
    await likePost(postId);
  };

  const handleComment = async (postId) => {
    if (newComment[postId]?.trim() !== "") {
      await addComment(postId, newComment[postId]);
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
    }
  };

  const fetchComments = async (postId) => {
    const postComments = await getComments(postId);
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: postComments.comments || [],
    }));
  };

  const toggleComments = (postId) => {
    setShowComments((prevShowComments) => {
      const updatedShowComments = {
        ...prevShowComments,
        [postId]: !prevShowComments[postId],
      };

      if (!updatedShowComments[postId]) {
        setComments((prevComments) => {
          const newComments = { ...prevComments };
          delete newComments[postId];
          return newComments;
        });
      } else {
        fetchComments(postId);
      }

      return updatedShowComments;
    });
  };

  const handleInputChange = (postId, value) => {
    setNewComment((prev) => ({ ...prev, [postId]: value }));
  };

  return (
    <div className="mt-20 flex flex-col justify-center w-full px-16 gap-6 pb-16">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="w-full max-w-none bg-[#416D1933] p-6 rounded-lg shadow-lg flex flex-col"
        >
          <div className="flex items-center sm:space-x-8 mb-6 justify-between">
            <h3 className="font-semibold text-2xl font-poppins text-[#646860]">
              {post.user.username}
            </h3>
            <h3 className="font-medium sm:text-2xl text-base font-poppins text-[#646860]">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              }).replace(/^about\s/, "")}
            </h3>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.content}</p>
          <div className="flex justify-end mt-6 gap-5">
            <button
              onClick={() => toggleComments(post.post_id)}
              className="text-[#416D19] py-2 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faComment} className="mr-1" />
              {showComments[post.post_id] ? "Komentar" : "Komentar"}
            </button>
            <button
              onClick={() => handleLike(post.post_id)}
              className="text-[#416D19] sm:px-4 py-2 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon
                icon={likedPosts[post.post_id] ? faHeartSolid : faHeartRegular}
                className="mr-1"
              />
              Like ({post.likes})
            </button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={newComment[post.post_id] || ""}
              onChange={(e) => handleInputChange(post.post_id, e.target.value)}
              placeholder="Tambah Komentar"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none  transition duration-200"
            />
            <button
              onClick={() => handleComment(post.post_id)}
              className="mt-2 w-full bg-[#269D26] text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Tambah Komentar
            </button>
          </div>

          {showComments[post.post_id] &&
          comments[post.post_id] &&
          comments[post.post_id].length > 0 ? (
            <div className="mt-6">
              {comments[post.post_id].map((comment) => (
                <div
                  key={comment.comment_id}
                  className="bg-gray-100 p-3 rounded-lg mb-3"
                >
                  <p className="font-semibold">{comment.user.username}</p>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            showComments[post.post_id] && (
              <p className="text-gray-500 mt-2">No comments yet.</p>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
