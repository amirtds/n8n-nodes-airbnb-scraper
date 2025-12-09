# n8n-nodes-airbnb-scraper

This is an n8n community node that lets you scrape Airbnb listing data using the Airbnb Analyzer API.

## Features

- **Scrape Listing Data**: Extract comprehensive data from any Airbnb listing including:
  - Title, description, and property details
  - Pricing information
  - Host profile and reviews
  - Amenities and house rules
  - Location data
  - And more...

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm Installation

```bash
npm install n8n-nodes-airbnb-scraper
```

### Manual Installation

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-airbnb-scraper` and confirm

## Credentials

You need an API token to use this node. To get one:

1. Visit [shortrentals.ai](https://scraper.shortrentals.ai) to get your token:
2. Once you have your token, add it in n8n:
   - Go to **Credentials**
   - Click **Add Credential**
   - Search for "Airbnb Scraper API"
   - Enter your API token

## Operations

### Scrape Listing

Scrapes data from an Airbnb listing.

**Parameters:**
- **Listing ID** (required): The Airbnb listing ID (found in the URL after `/rooms/`)
- **Timeout**: Maximum seconds to wait for scraping (default: 120)

**Example:**
For the URL `https://www.airbnb.com/rooms/1501733424018064312`, the listing ID is `1501733424018064312`.

## Usage Example

1. Add the **Airbnb Scraper** node to your workflow
2. Select your credentials
3. Enter the listing ID
4. Execute the node to get the listing data

## Output

The node returns comprehensive listing data including:

```json
{
  "title": "Cozy Downtown Apartment",
  "description": "...",
  "maxGuests": 4,
  "bedrooms": 2,
  "bathrooms": 1,
  "location": {
    "city": "New York",
    "country": "United States"
  },
  "pricing": { ... },
  "amenities": [ ... ],
  "reviews": { ... },
  "hostProfile": { ... }
}
```

## Compatibility

- n8n version 1.0.0 or later
- Node.js 18.x or later

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ShortRentals AI](https://shortrentals.ai)

---

# Development Guide

## Prerequisites

- Node.js 18.x or later
- npm or pnpm
- n8n installed locally for testing

## Setup

```bash
# Clone the repository
git clone https://github.com/ShortRentals-AI/n8n-nodes-airbnb-scraper.git
cd n8n-nodes-airbnb-scraper

# Install dependencies
npm install

# Build the node
npm run build
```

## Local Testing

### Method 1: Link to Local n8n

```bash
# In the node package directory
npm link

# In your n8n installation directory
npm link n8n-nodes-airbnb-scraper

# Start n8n
n8n start
```

### Method 2: Custom n8n Directory

1. Create a custom nodes directory:
```bash
mkdir -p ~/.n8n/custom
```

2. Copy or link the built node:
```bash
# Option A: Symbolic link (recommended for development)
ln -s /path/to/n8n-nodes-airbnb-scraper ~/.n8n/custom/n8n-nodes-airbnb-scraper

# Option B: Copy the package
cp -r /path/to/n8n-nodes-airbnb-scraper ~/.n8n/custom/
```

3. Set the environment variable and start n8n:
```bash
export N8N_CUSTOM_EXTENSIONS="~/.n8n/custom"
n8n start
```

### Method 3: Docker

If using n8n with Docker:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v /path/to/n8n-nodes-airbnb-scraper:/home/node/.n8n/custom/n8n-nodes-airbnb-scraper \
  -e N8N_CUSTOM_EXTENSIONS="/home/node/.n8n/custom" \
  n8nio/n8n
```

## Testing the Node

1. Start n8n with your custom node loaded
2. Open n8n in your browser (default: http://localhost:5678)
3. Create a new workflow
4. Search for "Airbnb Scraper" in the nodes panel
5. Add the node and configure credentials
6. Enter a test listing ID (e.g., `1501733424018064312`)
7. Execute the node and verify the output

## Publishing to npm

### Step 1: Prepare for Publishing

1. Update `package.json`:
   - Ensure `name` is unique on npm
   - Update `version` following semver
   - Verify `repository` URL is correct
   - Check `author` and `license` fields

2. Create an npm account if you don't have one:
```bash
npm adduser
```

3. Login to npm:
```bash
npm login
```

### Step 2: Build and Test

```bash
# Clean previous builds
rm -rf dist

# Build the package
npm run build

# Verify the build output
ls -la dist/
```

### Step 3: Publish

```bash
# Dry run to check what will be published
npm publish --dry-run

# Publish to npm
npm publish --access public
```

### Step 4: Verify Publication

1. Check your package on npm: https://www.npmjs.com/package/n8n-nodes-airbnb-scraper
2. Wait a few minutes for npm to index the package
3. Test installation in a fresh n8n instance:
```bash
npm install n8n-nodes-airbnb-scraper
```

## Updating the Package

1. Make your changes
2. Update the version in `package.json`:
```bash
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

3. Build and publish:
```bash
npm run build
npm publish
```

## Troubleshooting

### Node not appearing in n8n

1. Verify the build completed successfully: `ls dist/`
2. Check n8n logs for errors when starting
3. Ensure `N8N_CUSTOM_EXTENSIONS` is set correctly
4. Restart n8n after making changes

### Credential errors

1. Verify the credential name matches in both files
2. Check the Bearer token format in the API response
3. Test the API endpoint directly with curl:
```bash
curl -X POST https://scraper.shortrentals.ai/api/scrape/listing \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listingId": "1501733424018064312"}'
```

### Build errors

1. Ensure all dependencies are installed: `npm install`
2. Check TypeScript version compatibility
3. Verify `n8n-workflow` types are installed

## License

[MIT](LICENSE)
