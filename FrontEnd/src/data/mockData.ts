import type { ChatMessage, Contact } from "../types/types";

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Mohammed",
    initials: "MY",
    status: "Aktiv för 25 minuter sedan",
    color: "orange",
  },
  {
    id: "2",
    name: "Axel",
    initials: "AA",
    status: "Aktiv nu",
    color: "blue",
  },
  {
    id: "3",
    name: "Alfred",
    initials: "AN",
    status: "Aktiv nu",
    color: "red",
  },
];

export const startMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Tja bla bla bla",
    sender: "other",
    time: "23:45",
  },
  {
    id: "2",
    text: "Hej, hur går det?",
    sender: "other",
    time: "23:58",
  },
  {
    id: "3",
    text: "Tjena själv, det går bra",
    sender: "me",
    time: "00:08",
  },
];
