'use client';
import Post from '@components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPosts, getPostsStatus } from '@store/features/post';
import { useEffect, useMemo } from 'react';
export default function Home() {
  const postsStatus = useSelector(getPostsStatus);
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus]);
  console.log(posts);
  const id = posts.allIds[1];
  const a = posts.byIds[id];
  console.log();
  return (
    <main>
      <div className=" container gap-y-2 pt-4 flex items-center flex-col ">
        <header className="w-fit font1-700 text-5xl pt-2 border-b-2 border-b-rose-400">posts</header>

        {posts.allIds.map((id) => (
          <Post auther={posts.byIds[id].auther} body={posts.byIds[id].body} />
        ))}
      </div>
    </main>
  );
}
