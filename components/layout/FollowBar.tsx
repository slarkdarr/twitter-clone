import { useCallback } from 'react';
import { useRouter } from 'next/router';

import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';

const FollowBar = () => {
  const router = useRouter();

  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (userId: string) => (event: any) => {
      event.stopPropagation();

      router.push(`/users/${userId}`);
    },
    [router]
  );

  if (users.length === 0) {
    return null;
  }

  if (!currentUser) {
    return (
      <div className="px-6 py-4 hidden lg:block">
        <div className="bg-neutral-800 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <div className="flex flex-col gap-6 mt-4">
            {users.map((user: Record<string, any>) => (
              <div key={user.id} className="flex flex-row gap-4">
                <Avatar userId={user.id} />
                <div className="flex flex-col">
                  <p
                    className="text-white font-semibold text-sm cursor-pointer hover:underline"
                    onClick={goToUser(user.id)}
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-neutral-400 text-sm cursor-pointer hover:underline"
                    onClick={goToUser(user.id)}
                  >
                    @{user.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (filteredUser: Record<string, any>) =>
      filteredUser.id !== currentUser.id &&
      !currentUser.followingIds.includes(filteredUser.id)
  );

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {filteredUsers.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p
                  className="text-white font-semibold text-sm cursor-pointer hover:underline"
                  onClick={goToUser(user.id)}
                >
                  {user.name}
                </p>
                <p
                  className="text-neutral-400 text-sm cursor-pointer hover:underline"
                  onClick={goToUser(user.id)}
                >
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
