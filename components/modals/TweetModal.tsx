import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Input from '../Input';
import Modal from '../Modal';
import useTweetModal from '@/hooks/useTweetModal';
import usePosts from '@/hooks/usePosts';

const TweetModal = () => {
  const tweetModal = useTweetModal();

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutatePosts } = usePosts();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/posts', { body });
      toast.success('Tweet Created');

      setBody('');

      mutatePosts();

      tweetModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [tweetModal, body, mutatePosts]);

  const bodyContent = (
    <Input
      placeholder="What's happening?"
      onChange={(e) => setBody(e.target.value)}
      value={body}
      disabled={isLoading}
    />
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={tweetModal.isOpen}
      title="What's on your mind?"
      actionLabel="Tweet"
      onClose={tweetModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      useForm
    />
  );
};

export default TweetModal;
