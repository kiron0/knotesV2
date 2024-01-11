import { User } from "../models/user.model";

const findLastUser = async () => {
          const lastUsername = await User.findOne(
                    {
                              role: 'user',
                    },
                    {
                              username: 1,
                              _id: 0
                    }
          )
                    .sort({ createdAt: -1 })
                    .lean();

          return lastUsername?.username;
};


export const generateUserId = async () => {
          let currentUserId = (0).toString();

          const lastUser = await findLastUser();

          console.log(lastUser);

          if (lastUser) {
                    currentUserId = lastUser.substring(6);
          }

          const newUserId = `USER-${(parseInt(currentUserId) + 1).toString().padStart(6, '0')}`

          return newUserId;
};