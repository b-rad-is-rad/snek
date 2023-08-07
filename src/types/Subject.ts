import { Observer } from "./Observer";

export interface Subject {
    addObserver(obs: Observer): number;
    removeObserver(obs: Observer): number;
}