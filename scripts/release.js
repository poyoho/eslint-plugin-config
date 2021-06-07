const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const execa = require("execa")
const semver = require("semver")
const { prompt } = require("enquirer")
const args = require("minimist")(process.argv.slice(2))

const currentVersion = require("../package.json").version
const isDryRun = args.dry

const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])

const versionIncrements = [
  "patch",
  "minor",
  "major",
  ...(preId ? ["prepatch", "preminor", "premajor", "prerelease"] : [])
]

const inc = i => semver.inc(currentVersion, i, preId)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(" ")}`), opts)
const runIfNotDry = isDryRun ? dryRun : run
const getPkgRoot = () => path.resolve(__dirname, "..")
const step = msg => console.log(chalk.cyan(msg))

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, ".."), version)
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")
}

async function publishPackage(version, runIfNotDry) {
  const pkgRoot = getPkgRoot()
  const pkgPath = path.resolve(pkgRoot, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  const pkgName = pkg.name
  if (pkg.private) {
    return
  }
  console.log(version)
  step(`Publishing ${pkgName}...`)
  try {
    await runIfNotDry(
      "yarn",
      [
        "publish",
        "--new-version",
        version,
        "--access",
        "public"
      ],
      {
        cwd: pkgRoot,
        stdio: "pipe"
      }
    )
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}

async function choiseTargetVersion () {
  let targetVersion = args._[0]

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: "select",
      name: "release",
      message: "Select release type",
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(["custom"])
    })

    if (release === "custom") {
      targetVersion = (await prompt({
        type: "input",
        name: "version",
        message: "Input custom version",
        initial: currentVersion
      })).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  const { yes } = await prompt({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }
  return targetVersion
}

async function main () {
  const targetVersion = await choiseTargetVersion()

  step("\nBuilding all packages...")
  await run("yarn", ["build"])

  // publish packages
  step("\nPublishing packages...")
  await publishPackage(targetVersion, runIfNotDry)

  // update all package versions and inter-dependencies
  step("\nUpdating cross dependencies...")
  updateVersions(targetVersion)
}

main()
