# Release Guide: n8n-nodes-airbnb-scraper

This document walks through updating the package, publishing a new version to npm, and pushing the release to GitHub.

## 1. Prerequisites
- Ensure you have publish access to the npm package `n8n-nodes-airbnb-scraper`.
- GitHub access to `https://github.com/ShortRentals-AI/n8n-nodes-airbnb-scraper`.
- Node.js 18+ with npm.

## 2. Update Version & Dependencies
```bash
cd /Users/amir/cubite/airbnb-actors/n8n-nodes-airbnb-scraper
# Update package.json as needed (version bump, dependency changes)
```
Use `npm version [patch|minor|major]` if you prefer automatic tagging.

## 3. Install Dependencies & Build
```bash
npm install
npm run build
```
This compiles TypeScript and copies assets to `dist/`.

## 4. Quality Checks
```bash
npm run lint        # ESLint (flat config)
npx @n8n/scan-community-package n8n-nodes-airbnb-scraper
```
Fix any issues the scanner or linter reports. Verified community nodes must pass both.

## 5. Commit Changes & Push
```bash
git add .
git commit -m "Release v<version>"
git push origin master
```
Include changelog/README updates in the same commit.

## 6. Publish to npm
```bash
npm login        # only if not already authenticated
npm publish --access public
```
Wait a minute for npm indexing, then verify:
- https://www.npmjs.com/package/n8n-nodes-airbnb-scraper

## 7. Tag the Release (optional but recommended)
```bash
git tag v<version>
git push origin v<version>
```
Tags make it easier to track releases in GitHub.

## 8. Submit for n8n Verification (optional)
1. Sign in to the [n8n Creator Portal](https://creators.n8n.io).
2. Submit `n8n-nodes-airbnb-scraper` for verification with release notes.
3. Respond to any feedback from n8n reviewers.

## 9. Post-Release Checklist
- Update downstream docs or blogs referencing the version.
- Notify users (Discord, email, etc.).
- Monitor npm downloads/logs for errors.

Following these steps keeps npm and GitHub in sync and ensures the package meets n8n’s community node requirements.
