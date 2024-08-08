import { EventEmitter } from "events";

const TimeMatchEvents = {
  UPDATE_TIME: "updateTime",
};

const timeMatchEventEmitter = new EventEmitter();

export { timeMatchEventEmitter, TimeMatchEvents };
