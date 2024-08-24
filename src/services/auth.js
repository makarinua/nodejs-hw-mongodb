import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { usersCollection } from "../db/models/user.js";
import {FIFTEEN_MINUTES, THIRTY_DAYS}  from '../constants/authConstants.js';
import {sessionCollection} from '../db/models/session.js';

async function createSession(userId) {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await sessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUser = async (data) => {
    const user = await usersCollection.findOne({email: data.email});
    if(user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(data.password, 10);
    return await usersCollection.create({...data, password: encryptedPassword});
};

export const loginUser = async (data) => {
    const user = await usersCollection.findOne({email: data.email});
    if(!user) throw createHttpError(404, 'User not found');
    const ifPasswordsEqual = await bcrypt.compare(data.password, user.password);
    if(!ifPasswordsEqual) throw createHttpError(401, 'Unauthorized');

    await sessionCollection.deleteOne({userId: user._id});
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    return await sessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

};

export const refreshUser = async (sessionId, refreshToken) => {
    const session = await sessionCollection.findOne({_id: sessionId, refreshToken});
    if(!session) throw createHttpError(401, 'Session not found');

    const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if(isExpired) throw createHttpError(401, 'Session token expired');
    await sessionCollection.deleteOne({_id: sessionId, refreshToken});
    const newSession = createSession(session.userId);
    return newSession;

};

export const logoutUser = (sessionId) => sessionCollection.deleteOne({_id: sessionId});