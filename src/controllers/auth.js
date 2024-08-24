import { THIRTY_DAYS } from "../constants/authConstants.js";
import { loginUser, logoutUser, refreshUser, registerUser } from "../services/auth.js";

function setupSession (res, session) {
    
	res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    
	res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};

export const registerController = async (req, res) => {
    const user = await registerUser(req.body);
    const userData = user.toJSON();

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: userData,
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);
    
	res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    
	res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    
	res.status(200).json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {accessToken: session.accessToken},

    });
};

export const refreshUserController = async (req, res) => {
    const session = await refreshUser(req.cookies.sessionId, req.cookies.refreshToken);
    setupSession(res, session);
    
	res.status(200).json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {accessToken: session.accessToken},
    });
};

export const logoutUserController = async (req, res) => {
    
	if(req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    };
    
	res.clearCookie('sessionId');
    
	res.clearCookie('refreshToken');

    res.status(204).send();
};