export type TUser = {
          name: {
                    firstName: string;
                    middleName: string;
                    lastName: string;
          };
          username: string;
          email: string;
          password: string;
          profileImage: string;
          role: 'admin' | 'user';
          status: 'active' | 'inactive';
}