"use client"; // 1. The Magic Word to make buttons work

import { useState } from "react";

export default function LikeButton() {
  // 2. The Memory [Current Value, Function to Change It]
  const [likes, setLikes] = useState(0);

  // 3. The Action
  function addLike() {
    setLikes(likes + 1);
  }

  return (
    // 4. The Trigger
    <button onClick={addLike} className="text-black hover:cursor-pointer">
      👍 Likes: {likes}
    </button>
  );
}