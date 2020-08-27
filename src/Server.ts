import {StreamDispatcher} from 'discord.js';

export default interface Server {
  queue: {url: string; title: string; thumbnailURL: string; length: number}[];
  history: {
    url: string;
    title: string;
    thumbnailURL: string;
    length: number;
  }[];
  dispatcher?: StreamDispatcher;
  loop: boolean;
}
