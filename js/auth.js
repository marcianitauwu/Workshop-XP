import { toast } from "./toast.js";
import { Storage } from "./storage.js";

const KEY = "xp_auth_session";
const USERS_KEY = "xp_auth_users";

export function seedUsersIfEmpty(defaultUsers){
  const existing = Storage.load(USERS_KEY, null);
  if(!existing){
    Storage.save(USERS_KEY, defaultUsers);
  }
}

export function isAuthed(){
  const s = Storage.load(KEY, null);
  return !!(s && s.user);
}

export function getSession(){
  return Storage.load(KEY, null);
}

export function logout(){
  Storage.remove(KEY);
  toast("Sesión cerrada");
}

export function login(username, password){
  const users = Storage.load(USERS_KEY, []);
  const found = users.find(u => u.user === username && u.pass === password);
  if(found){
    Storage.save(KEY, { user: found.user, nombre: found.nombre, rol: found.rol, ts: Date.now() });
    toast("Bienvenido", `${found.nombre} — ${found.rol}`);
    return true;
  }
  return false;
}
