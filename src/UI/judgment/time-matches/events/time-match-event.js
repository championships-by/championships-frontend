import { EventEmitter } from "events";

const TimeMatchEvents = {
  UPDATE_TABLE_DATA: "updateTableData",
};

const timeMatchEventEmitter = new EventEmitter();

export { timeMatchEventEmitter, TimeMatchEvents };
