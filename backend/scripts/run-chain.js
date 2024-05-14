const { spawn } = require("child_process");
const { config: loadEnvVariables } = require("@chainlink/env-enc");

loadEnvVariables();

const providerUrl = process.env.PROVIDER_URL;

async function runChain() {
  const process = await spawn("anvil", ["--fork-url", providerUrl]);
  let exited = false;

  process.on("exit", (code) => {
    console.log(`anvil exited with code ${code}`);
    exited = true;
  });

  process.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    exited = true;
  });

  process.stdout.on("data", (output) => console.log(String(output)));
  process.stderr.on("data", (output) => console.error(String(output)));

  while (!exited) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

runChain();
