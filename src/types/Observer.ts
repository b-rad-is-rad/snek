import { Snake } from "../classes/Snake";
import { Event } from "./Event";

export interface Observer {
    onNotify(snake: Snake, event: Event): void;
}