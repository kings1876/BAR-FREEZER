# Auth.md

Bar Freezer Australia (barfreezer.com.au) is a public online store. No authentication is needed to read the catalogue, guides or policies.

## Agent registration

None required. All catalogue pages are public.

## Public resources

| Resource | URL |
|---|---|
| Catalogue | https://barfreezer.com.au/bar-fridges/ , https://barfreezer.com.au/bar-freezers/ , https://barfreezer.com.au/accessories-parts/ |
| Buying guides | https://barfreezer.com.au/guides/ |
| Sitemap | https://barfreezer.com.au/sitemap.xml |
| llms.txt | https://barfreezer.com.au/llms.txt |

## Ordering

Orders are placed by a person on the website. Agents may read and compare products but must not place orders or submit payment details on a customer's behalf. Payment is arranged with the customer after an order request is received.

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All catalogue content is public."
  }
}
```
