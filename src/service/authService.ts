
import authRepo from "../repository/auth-repo";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";
import AppDataSource from "../configuration/config";

export const secretKey = "ansh";

const userRepo = AppDataSource.getRepository(User)

class AuthService {
    signUp = async (req: any, res: any) => {

        const { userName, password, email, fullName, phoneNumber } = req.body;

        const profile = new Profile();
        profile.email = email;
        profile.phoneNumber = phoneNumber;
        profile.userName = userName

        const user = new User();
        user.fullName = fullName;
        user.phoneNumber = phoneNumber
        user.password = password;

        user.profile = profile
        user.post = [];

        return await authRepo.signUp(user);
    };

    logIn = async (req: any, res: any) => {

        const profile = await authRepo.findProfile(req.body.email);

        if (!profile) {
            res.status(400).json({ msg: "user not found" });
        } else {
            if (req.body.password === profile?.user.password) {
                const token = jwt.sign({ id: profile?.user.userId }, secretKey, { expiresIn: '1h' });
                const tokenWtBearer = 'bearer ' + token;
                res.cookie('authToken', tokenWtBearer);
                res.status(200).json({ msg: "logged in" });
            } else {
                res.status(401).json({ msg: "wrong credential" });
            }
        }
    };
}

export default new AuthService();