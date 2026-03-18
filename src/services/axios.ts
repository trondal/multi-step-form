import axios from 'axios';
import type { FileResult } from '../api/server';
import type { PostResult, User } from '../types';

export async function getFiles(signal: AbortSignal) {
  const result = await axios.get(`http://localhost:5174/files`, {
    signal
  });
  return result.data as FileResult[];
}

export async function getUsers(signal: AbortSignal) {
  const result = await axios.get(`http://localhost:5174/users`, {
    signal
  });
  return result.data as User[];
}

export async function postForm(form: FormData, signal?: AbortSignal) {
  const result = await axios.post(`http://localhost:5174/api/upload`, form, {
    signal: signal,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return result.data as PostResult;
}
