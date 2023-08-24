const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
// ffmpeg("video.mp4")
//   .videoCodec("libx264")
//   .audioCodec("libmp3lame")
//   .size("320x240")
//   .on("error", function (err) {
//     console.log("An error occurred: " + err.message);
//   })
//   .on("end", function () {
//     console.log("Processing finished !");
//   })
//   .save("output.mp4");

const bitrates = ["100k","800k"];
bitrates.map((bitrate) => {
  ffmpeg("video.mp4")
    .outputOptions([
      "-profile:v", "baseline", // H.264 profile for wider device support
      "-level", "3.0", // H.264 level
      "-start_number", "0", // Segment start number
      "-hls_time", "10", // Segment duration
      "-hls_list_size", "0", // Number of segments to keep in playlist (0 means all)
      "-f", "hls", // Output format HLS
    ])
    .on("error", (e) => {
      console.log(e);
    })
    .output(`${bitrate}/${bitrate}-${Date.now()}.m3u8`)
    .videoBitrate(bitrate)
    .audioCodec("aac")
    .audioBitrate("128k")
    .run();
});
