import { Storage } from "./storage.js";
import { seed } from "../data/seed.js";

const KEY = "xp_state_v1";

function clone(obj){
  // Evita structuredClone por compatibilidad: clon profundo simple
  return JSON.parse(JSON.stringify(obj));
}

export function getState(){
  const st = Storage.load(KEY, null);
  return st ? st : clone(seed);
}

export function saveState(next){
  Storage.save(KEY, next);
}

export function resetState(){
  Storage.remove(KEY);
}

export function ensureSeed(){
  const st = Storage.load(KEY, null);
  if(!st) Storage.save(KEY, clone(seed));
}
