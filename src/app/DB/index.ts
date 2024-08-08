import config from "../config";
import { UserRoles } from "../modules/user/user.constant";
import User from "../modules/user/user.model";

const superUser = {
    id: '0001',
    email: 'ashrafulfahim@gmail.com',
    password: config.Super_admin_Pass,
    needsPasswordChange: false,
    role: UserRoles.superAdmin,
    status: 'in-progress',
    isDeleted: false,
};
const seedSuperAdmin = async () => {
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = await User.findOne({ role: UserRoles.superAdmin });

    if (!isSuperAdminExits) {
        await User.create(superUser);
    }
};

export default seedSuperAdmin;