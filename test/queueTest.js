
const assert = require('assert');
const { Queue, getQueue, queueStorage } = require("../util/queue");
const { joinVoiceChannel } = require("@discordjs/voice");





//test constructor and if it adds to the map correctly
describe("Queue", function () {
    describe("Queue constructor", function () {
        it("Should create a Queue with the given parameters, and add it to the queueStorage Map", function () {
            let testId = 12345;

            const test = new Queue("voice channel number", "text channel number", testId);
            assert.equal(test, getQueue(testId));
        });
    });
});

//test add()
describe("Queue", function () {
    describe("add()", function () {
        it("Should add a song to the songs array in a Queue", function () {
            const testId = 12345;

            const testQueue = new Queue("vc", "tc", testId);

            const song = { title: "King Gizzard & The Lizard Wizard - Rattlesnake (Official Video)", url: "https://www.youtube.com/watch?v=Q-i1XZc8ZwA&list=RDQ-i1XZc8ZwA&start_radio=1" };

            testQueue.add(song);

            //assert if anything is added to the array
            assert(testQueue.songs.length, 1);
            //assert if the song was added correctly
            assert(testQueue.songs[0].url, "https://www.youtube.com/watch?v=Q-i1XZc8ZwA&list=RDQ-i1XZc8ZwA&start_radio=1");
            assert(testQueue.songs[0].title, "King Gizzard & The Lizard Wizard - Rattlesnake (Official Video)");
        });
    });
});

//test clear()
describe("Queue", function () {
    describe("clear()", function () {
        it("Should clear the songs array and delete the Queue", function () {
            const testId = 12345;
            const testQueue = new Queue("vc", "tc", testId);

            //fill the queue with stuff
            for (let i = 0; i < 10; i++) {
                let song = { title: i, url: "url" };
                testQueue.add(song)
            }
            testQueue.clear();
            assert(queueStorage.size === 0, true);
        });
    });
});
//test next();
describe("Queue", function () {
    describe("next()", function () {
        it("Shoud shift the array in the Queue ", function () {

            const testId = 123445;
            const testQueue = new Queue("vc", "tc", testId);

            for (let i = 0; i < 3; i++) {
                let song = { title: i, url: "url" }
                testQueue.add(song);
            }
            testQueue.next();
            assert(testQueue.songs[0].title, 1);
            testQueue.next();
            assert(testQueue.songs[0].title, 2);
        });
    });
});


//test get currentSong()
describe("Queue", function () {
    describe("currentSong()", function () {
        it("Should return the current song(first index in array)", function () {
            const testId = 123445;
            const testQueue = new Queue("vc", "tc", testId);

            for (let i = 0; i < 3; i++) {
                let song = { title: i, url: "url" }
                testQueue.add(song);
            }



            assert(testQueue.currentSong.title === 0, true);
            testQueue.next();
            assert(testQueue.currentSong.title === 1, true);

        });
    });
});
