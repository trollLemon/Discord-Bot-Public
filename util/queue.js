"use strict";

const { AudioPlayer, VoiceConnection } = require("@discordjs/voice");

const queueStorage = new Map(); //stores different queues

//Get a queue based on guild id
const getQueue = (key) => {
  return queueStorage.get(key);
};

/**
 * Class for handeling queue related stuff
 * Queues are stored in the Map "queueStorage" automatically on creation
 * Queues are able to be looped
 */
class Queue {
  //basic queue stuff
  voiceChannel;
  textChannel;
  connection;
  loop = false;
  songs = [];
  currentSong;
  id;
  //video player stff
  stream;

  constructor(voiceChannel, textChannel, guildId) {
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
    this.id = guildId;
    queueStorage.set(guildId, this);
  }

  clear() {
    queueStorage.delete(this.id);
  }

  disconnect() {
    try {
      this.stream.destroy();
      this.connection.destroy();
    } catch (error) {
      console.log("Oops:" + error);
    }

    this.clear();
  }
  next() {
    if (this.songs.length === 0) return; //dont shift the queue if there is nothing to shift

    this.stream.destroy();
    this.songs.shift();
    this.currentSong = this.songs[0];
  }

  add(song) {
    this.songs.push(song);
    if (this.songs.length === 1) {
      this.currentSong = this.songs[0];
    }
  }

  loopToggle() {
    if (this.loop === true) this.loop = false;
    else this.loop = true;
  }

  //get and setter methods
  get currentSong() {
    return this.songs[0];
  }

  get loopStatus() {
    return this.loop;
  }

  get textChannel() {
    return this.textChannel;
  }

  get voiceChannel() {
    return this.voiceChannel;
  }

  get id() {
    return this.id;
  }

  get songs() {
    return this.songs;
  }

  get connection() {
    return this.connection;
  }

  get player() {
    return this.player;
  }

  get stream() {
    return this.stream;
  }

  get songs() {
    return this.songs;
  }
  /**
   * @param {VoiceConnection} connection
   */
  set connection(connection) {
    this.connection = connection;
  }

  /**
   * @param {any[]} array
   */
  set songs(array) {
    this.songs = array;
  }

  /**
   * @param {ReadableStream} stream
   */
  set stream(stream) {
    this.stream = stream;
  }
}

module.exports = {
  Queue,
  getQueue,
};
