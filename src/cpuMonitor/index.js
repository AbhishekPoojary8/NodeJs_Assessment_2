const os = require('os');
const fs = require('fs');

// Function to calculate CPU utilization
function calculateCPUUsage() {
    const cpus = os.cpus();//Os core module
    let totalIdle = 0, totalTick = 0;
  
    cpus.forEach((core) => {
      //Individual cup core
  
      //The function begins by iterating over each CPU core using os.cpus(), which returns an array of objects representing each core.
      for (let type in core.times) {
        //Calculate the overall time spent by each core over system or user def
        totalTick += core.times[type];
      }
      //total idle time
      totalIdle += core.times.idle;
    });
  
    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
  }
  
  // Monitor CPU usage
   function monitorCPU() {
    let startMeasure = calculateCPUUsage();
  
    setTimeout(() => {
      let endMeasure = calculateCPUUsage();
  
      let idleDifference = endMeasure.idle - startMeasure.idle;
      let totalDifference = endMeasure.total - startMeasure.total;
  //Calculate the cpu persentage over the start to current execution
      let percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
  
      console.log(`CPU Usage: ${percentageCPU}%`);
  
      if (percentageCPU >= 70) {
        console.log('CPU usage exceeded 70%. Restarting server...');
        restartServer();
      } else {
        // Continue monitoring CPU every 5 seconds
        monitorCPU();
      }
    }, 5000);
  }
  
  // Function to restart the server on the main process
  function restartServer() {
    
    fs.utimesSync(__filename, new Date(), new Date());
    process.exit(0);
  }

  module.exports =  monitorCPU;
  