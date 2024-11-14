#!/usr/bin/env node

const { execSync } = require("child_process");
const degit = require("degit");
const path = require("path");

// Get the project name from the command arguments
const projectName = process.argv[2];
if (!projectName) {
    console.error("Please specify the project name: npx my-create-app <project-name>");
    process.exit(1);
}

// Define the GitHub repository URL
const repo = "https://github.com/Vengxdor/next-boilerplate";

// Define the path for the new project
const projectPath = path.join(process.cwd(), projectName);

// Clone the repository
async function cloneRepository() {
    const emitter = degit(repo, { cache: false, force: true });

    console.log(`Creating project "${projectName}" from repository...`);
    await emitter.clone(projectPath);

    console.log("Project created successfully!");

    // Change directory to the new project and install dependencies
    console.log("Installing dependencies...");
    execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
}

cloneRepository().catch((error) => {
    console.error("Error creating project:", error);
    process.exit(1);
});
