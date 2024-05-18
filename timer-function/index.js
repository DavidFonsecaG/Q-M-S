const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.database();

/**
 * Cloud Function to start a timer that updates a Firebase Realtime Database
 * and auto-restarts when it reaches 0.
 */
exports.startTimer = functions.https.onRequest(async (req, res) => {
  const duration = Number(req.query.duration) || 60;

  /**
   * Runs the timer and updates the database every second.
   * Resets the timer to the original duration when it reaches 0.
   *
   * @param {number} duration - The initial duration of the timer in seconds.
   */
  function runTimer(duration) {
    let timeLeft = duration;

    const intervalId = setInterval(async () => {
      const snapshot = await db.ref("timerPaused").once("value");
      const isPaused = snapshot.val();

      if (!isPaused) {
        if (timeLeft > 0) {
          db.ref("timer").set(timeLeft);
          timeLeft -= 1;
        } else {
          db.ref("timer").set(duration); // Reset timer to original duration
          timeLeft = duration;
        }
      }
    }, 1000);

    // Store intervalId to clear interval if needed
    db.ref("timerIntervalId").set(intervalId.toString());
  }

  // Check if timer is already running
  const isPausedSnapshot = await db.ref("timerPaused").once("value");
  const isPaused = isPausedSnapshot.val();

  if (isPaused === false) {
    // Timer is already running
    res.send("Timer is already running.");
    return;
  }

  // Unpause the timer if it is paused
  await db.ref("timerPaused").set(false);

  // If there's no existing interval, start a new one
  const intervalIdSnapshot = await db.ref("timerIntervalId").once("value");
  const existingIntervalId = intervalIdSnapshot.val();

  if (!existingIntervalId) {
    // Start a new timer
    runTimer(duration);
  }

  res.send("Timer started or resumed.");
});

/**
 * Cloud Function to pause or resume the timer.
 */
exports.pauseTimer = functions.https.onRequest((req, res) => {
  const pause = req.query.pause === "true";

  db.ref("timerPaused").set(pause).then(() => {
    res.send(`Timer ${pause ? "paused" : "resumed"}.`);
  }).catch((error) => {
    console.error("Error updating timer state:", error);
    res.status(500).send("Error pausing/resuming timer.");
  });
});
