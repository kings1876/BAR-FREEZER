// Generates llms.txt, auth.md, security.txt and the .well-known agent-discovery files from src/config/site.js.
// Run automatically before every build (package.json "prebuild"). The domain lives in one place: SITE.domain.
// Static target: declares only what static files can honour (no live MCP tools, no payment capture).
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmpDir = path.join(root, 'data');
fs.mkdirSync(tmpDir, { recursive: true });

// Load the config without a bundler: copy site.js next to a stub that reads the generated JSON.
let src = fs.readFileSync(path.join(root, 'src/config/site.js'), 'utf8');
src = src.replace("import productsData from './products.generated.json';", "import fs from 'fs'; const productsData = JSON.parse(fs.readFileSync(new URL('../src/config/products.generated.json', import.meta.url),'utf8'));");
src = src.replace("import { EXTRA_POSTS } from './guides-extra.js';", "import { EXTRA_POSTS } from '../src/config/guides-extra.js';");
const tmpFile = path.join(tmpDir, '_gen-site.mjs');
fs.writeFileSync(tmpFile, src);
const cfg = await import('file:///' + tmpFile.replace(/\\/g, '/') + '?t=' + Date.now());
fs.unlinkSync(tmpFile);

const { SITE, CATEGORIES, BRANDS, POSTS, VENUES, PRODUCTS } = cfg;
const D = SITE.domain;
const U = `https://${D}`;
const NAME = 'Bar Freezer Australia';
const EMAIL = SITE.email;
const pub = path.join(root, 'public');
const wk = path.join(pub, '.well-known');
fs.mkdirSync(path.join(wk, 'agent-skills'), { recursive: true });
fs.mkdirSync(path.join(wk, 'mcp'), { recursive: true });
const write = (f, c) => fs.writeFileSync(path.join(pub, f), typeof c === 'string' ? c : JSON.stringify(c, null, 2) + '\n');

const summary = 'Australian online store for commercial and home bar freezers, bar fridges, wine fridges, kegerators, ice machines, accessories and spare parts, delivered Australia-wide.';

// ---- llms.txt (llmstxt.org format)
const L = [];
L.push(`# ${NAME}`, '', `> ${summary}`, '');
L.push(`${PRODUCTS.length} products from ${BRANDS.length} brands. Prices are in AUD and include GST. Orders are placed as order requests; payment instructions are emailed after stock and freight are confirmed. Accepted payment methods: bank transfer, PayID, Osko and cryptocurrency (BTC, USDT on Tron, ETH).`, '');
L.push('## Shop', '');
for (const c of CATEGORIES) {
  L.push(`- [${c.name}](${U}${c.path}): ${String(c.description || '').replace(/\s+/g, ' ').slice(0, 140)}`);
  for (const s of c.subcategories || []) L.push(`- [${s.name}](${U}${s.path})`);
}
L.push('', '## Brands', '');
for (const b of BRANDS) L.push(`- [${b.name}](${U}/brands/${b.slug}/)`);
L.push('', '## Buying guides', '');
for (const p of POSTS) L.push(`- [${p.title}](${U}/guides/${p.slug}/): ${String(p.excerpt || '').replace(/\s+/g, ' ').slice(0, 140)}`);
L.push('', '## Venues', '');
for (const v of VENUES) L.push(`- [${v.name}](${U}/venues/${v.slug}/)`);
L.push('', '## Key pages', '');
L.push(`- [Trade pricing and quotes](${U}/trade/)`, `- [Payment methods](${U}/payment-methods/)`, `- [Delivery](${U}/delivery/)`, `- [Warranty and service](${U}/warranty/)`, `- [Contact](${U}/contact/)`);
L.push('', '## Optional', '');
L.push(`- [Sitemap](${U}/sitemap.xml)`, `- [API catalog](${U}/.well-known/api-catalog)`, `- [Agent skills](${U}/.well-known/agent-skills/index.json)`, `- [Agent notes](${U}/auth.md)`);
write('llms.txt', L.join('\n') + '\n');

// ---- auth.md
write('auth.md', `# Auth.md

${NAME} (${D}) is a public online store. No authentication is needed to read the catalogue, guides or policies.

## Agent registration

None required. All catalogue pages are public.

## Public resources

| Resource | URL |
|---|---|
| Catalogue | ${U}/bar-fridges/ , ${U}/bar-freezers/ , ${U}/accessories-parts/ |
| Buying guides | ${U}/guides/ |
| Sitemap | ${U}/sitemap.xml |
| llms.txt | ${U}/llms.txt |

## Ordering

Orders are placed by a person on the website. Agents may read and compare products but must not place orders or submit payment details on a customer's behalf. Payment is arranged with the customer after an order request is received.

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All catalogue content is public."
  }
}
\`\`\`
`);

// ---- security.txt
const expires = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();
fs.mkdirSync(wk, { recursive: true });
fs.writeFileSync(path.join(wk, 'security.txt'), `Contact: mailto:${EMAIL}\nExpires: ${expires}\nPreferred-Languages: en\nCanonical: ${U}/.well-known/security.txt\n`);

// ---- .well-known
const wj = (f, o) => fs.writeFileSync(path.join(wk, f), JSON.stringify(o, null, 2) + '\n');
wj('api-catalog', {
  linkset: [
    { anchor: `${U}/`, 'https://www.iana.org/assignments/link-relations/service-doc': [{ href: `${U}/guides/` }], title: `${NAME}: bar freezers and bar fridges` },
    { anchor: `${U}/bar-fridges/`, type: 'text/html', title: 'Bar fridges catalogue' },
    { anchor: `${U}/bar-freezers/`, type: 'text/html', title: 'Bar freezers catalogue' },
    { anchor: `${U}/trade/`, type: 'text/html', title: 'Trade pricing and quotes' },
  ],
});
const EMPTY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
wj('agent-skills/index.json', {
  $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
  name: NAME,
  url: U,
  description: summary,
  skills: [
    { name: 'browse-products', type: 'navigation', description: 'Browse bar freezers, bar fridges, accessories and parts by category', url: `${U}/bar-fridges/`, sha256: EMPTY },
    { name: 'buying-guides', type: 'content', description: 'Buying guides for bar fridges, freezers and refrigeration', url: `${U}/guides/`, sha256: EMPTY },
    { name: 'request-quote', type: 'commerce', description: 'Request a quote for one or more units (completed by a person)', url: `${U}/quote/`, sha256: EMPTY },
    { name: 'contact', type: 'support', description: 'Contact the store about products, delivery or warranty', url: `${U}/contact/`, sha256: EMPTY },
  ],
});
wj('mcp/server-card.json', {
  $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
  serverInfo: { name: NAME, version: '1.0.0', description: summary, homepage: U, contact: { email: EMAIL } },
  transport: { type: 'none', note: 'Static site: no live MCP server. Resources below are public web pages.' },
  capabilities: {
    resources: [
      { name: 'catalogue', description: 'Product catalogue', uri: `${U}/bar-fridges/` },
      { name: 'guides', description: 'Buying guides', uri: `${U}/guides/` },
    ],
    commerce: { ordering: 'human-completed order request or quote', payment: ['bank-transfer', 'payid', 'osko', 'crypto-btc', 'crypto-usdt-trc20', 'crypto-eth'], currency: 'AUD', ships: 'Australia-wide' },
  },
});
wj('oauth-protected-resource', { resource: U, resource_name: `${NAME} public catalogue`, authorization_servers: [], scopes_supported: [], bearer_methods_supported: [], resource_documentation: `${U}/auth.md`, note: 'All catalogue resources are public. No OAuth tokens are required.' });
wj('oauth-authorization-server', { issuer: U, authorization_endpoint: null, token_endpoint: null, jwks_uri: null, grant_types_supported: [], response_types_supported: [], scopes_supported: [], note: `${NAME} has no protected APIs.`, agent_auth: { register_uri: null, identity_types_supported: ['none'], credential_types_supported: ['none'], notes: 'No registration required.' } });
wj('openid-configuration', { issuer: U, note: `${NAME} does not operate an OpenID Connect provider.`, public_site: true, authorization_endpoint: null, token_endpoint: null, userinfo_endpoint: null, jwks_uri: null, scopes_supported: [], response_types_supported: [], grant_types_supported: [], subject_types_supported: [], id_token_signing_alg_values_supported: [] });
wj('acp.json', { protocol: { name: 'acp', version: '0.1.0' }, name: NAME, description: summary, homepage: U, transports: ['https'], capabilities: { services: ['product-catalog', 'quotes', 'guides'], ordering: 'human-completed', payment_methods: ['bank-transfer', 'payid', 'osko', 'crypto'], currency: 'AUD' }, contact: { email: EMAIL }, legal: { region: 'Australia', ships_to: 'Australia' } });
wj('ucp', { ucp: '1.0', protocol_version: '1.0', spec: 'https://ucp.dev/specification/overview/', schema: 'https://ucp.dev/schema/v1.json', site: U, name: NAME, description: summary, services: [{ id: 'product-catalog', type: 'catalog', url: `${U}/bar-fridges/`, description: 'Product catalogue' }, { id: 'quote', type: 'commerce', url: `${U}/quote/`, description: 'Request a quote' }], capabilities: ['browse', 'inquiry', 'content'], currency: 'AUD', payment_methods: ['bank-transfer', 'payid', 'osko', 'crypto'] });

console.log('generated: llms.txt, auth.md, .well-known/* for', D, '|', PRODUCTS.length, 'products');
