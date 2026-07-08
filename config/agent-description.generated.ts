// AUTHORED-BY Claude Fable 5
// GENERATED FILE — do not edit by hand. Single source: scripts/agent/descriptor.mjs.
// Regenerate:  cd scripts/agent && npm install && npm run generate
// Self-verify: cd scripts/agent && npm run verify
//   (byte-freshness against this file + a discoverAgent round-trip with the
//    owner back-link required — see scripts/agent/verify.mjs)
//
// This is the ANP Agent Description served at /agent and
// /.well-known/agent-descriptions (app/agent/handler.ts). The A2A Agent Card
// lives at public/.well-known/agent-card.json. Both are projected from the ONE
// descriptor via @jeswr/solid-agent-card's describeAgent, so they cannot drift.

/** The agent's IRI — the WebID→agent pointer target AND the AD document URL. */
export const AGENT_IRI = "https://jeswr.org/agent";

/** The WebID the agent represents (the ad:owner back-link). */
export const OWNER_WEBID = "https://jeswr.org/#me";

/** The ANP Agent Description, as Turtle. */
export const AGENT_DESCRIPTION_TURTLE = "@prefix ad: <https://w3id.org/agent-description#>.\n@prefix interop: <http://www.w3.org/ns/solid/interop#>.\n@prefix schema: <https://schema.org/>.\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix dcterms: <http://purl.org/dc/terms/>.\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.\n\n<https://jeswr.org/agent> a ad:AgentDescription;\n    ad:name \"Jesse Wright's agent\";\n    ad:description \"The personal agent representing Jesse Wright (WebID https://jeswr.org/#me). Under active development: this descriptor is the discovery pointer — the agent does not yet expose a live task endpoint. To reach Jesse, use the contact details in his WebID profile at https://jeswr.org/.\";\n    ad:url <https://jeswr.org/agent>;\n    ad:owner <https://jeswr.org/#me>;\n    ad:securityScheme _:n3-0.\n_:n3-0 a ad:SecurityScheme;\n    ad:description \"WebID + Solid-OIDC with DPoP-bound tokens (RFC 9449). The issuer is the same one the owner's WebID trusts (solid:oidcIssuer).\";\n    ad:url <https://idp.solid-test.jeswr.org>;\n    ad:schemeType \"solid-oidc\".\n";

/** The ANP Agent Description, as a pre-serialised JSON-LD document. */
export const AGENT_DESCRIPTION_JSONLD = "{\n  \"@context\": {\n    \"ad\": \"https://w3id.org/agent-description#\",\n    \"AgentDescription\": \"https://w3id.org/agent-description#AgentDescription\",\n    \"Skill\": \"https://w3id.org/agent-description#Skill\",\n    \"SecurityScheme\": \"https://w3id.org/agent-description#SecurityScheme\",\n    \"name\": \"https://w3id.org/agent-description#name\",\n    \"description\": \"https://w3id.org/agent-description#description\",\n    \"url\": {\n      \"@id\": \"https://w3id.org/agent-description#url\",\n      \"@type\": \"@id\"\n    },\n    \"did\": \"https://w3id.org/agent-description#did\",\n    \"owner\": {\n      \"@id\": \"https://w3id.org/agent-description#owner\",\n      \"@type\": \"@id\"\n    },\n    \"protocolSource\": {\n      \"@id\": \"https://w3id.org/agent-description#protocolSource\",\n      \"@type\": \"@id\"\n    },\n    \"skill\": {\n      \"@id\": \"https://w3id.org/agent-description#skill\",\n      \"@type\": \"@id\"\n    },\n    \"securityScheme\": {\n      \"@id\": \"https://w3id.org/agent-description#securityScheme\",\n      \"@type\": \"@id\"\n    },\n    \"skillId\": \"https://w3id.org/agent-description#skillId\",\n    \"schemeType\": \"https://w3id.org/agent-description#schemeType\"\n  },\n  \"@id\": \"https://jeswr.org/agent\",\n  \"@type\": \"AgentDescription\",\n  \"name\": \"Jesse Wright's agent\",\n  \"url\": \"https://jeswr.org/agent\",\n  \"description\": \"The personal agent representing Jesse Wright (WebID https://jeswr.org/#me). Under active development: this descriptor is the discovery pointer — the agent does not yet expose a live task endpoint. To reach Jesse, use the contact details in his WebID profile at https://jeswr.org/.\",\n  \"owner\": {\n    \"@id\": \"https://jeswr.org/#me\"\n  },\n  \"securityScheme\": [\n    {\n      \"@type\": \"SecurityScheme\",\n      \"schemeType\": \"solid-oidc\",\n      \"description\": \"WebID + Solid-OIDC with DPoP-bound tokens (RFC 9449). The issuer is the same one the owner's WebID trusts (solid:oidcIssuer).\",\n      \"url\": {\n        \"@id\": \"https://idp.solid-test.jeswr.org\"\n      }\n    }\n  ]\n}\n";
