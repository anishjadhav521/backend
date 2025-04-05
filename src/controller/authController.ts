import authService from "../service/authService"


class authController {

    signUp = async (req: any, res: any) => {

        const result = await authService.signUp(req, res)

        if (result != null) {
            res.json({ 'msg': 'signup complete !!' });
        }
        else {
            res.json({ 'msg': 'signup failed' })
        }
    }

    logIn = async (req: any, res: any) => {



        authService.logIn(req, res);
    }


}

export default new authController()