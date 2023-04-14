import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import Head from 'next/head';

import usePost from '@/hooks/usePost';
import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import Form from '@/components/Form';
import CommentFeed from '@/components/posts/CommentFeed';
import useUser from '@/hooks/useUser';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);
  const { data: fetchedUser } = useUser(fetchedPost?.userId);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {fetchedUser?.name} on Twtr: &quot;{fetchedPost?.body}&quot; / Twtr
          Clone
        </title>
        <meta
          name="description"
          content="Twtr Clone Web App (for personal project purpose)"
        />
      </Head>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
