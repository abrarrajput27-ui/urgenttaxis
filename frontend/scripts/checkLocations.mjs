// scripts/checkLocations.mjs
// Verify the location configuration by printing details for each hostname
import locations from '../src/config/locations.js';

const hostnames = [
  'urgenttaxis.com',
  'haldwani.urgenttaxis.com',
  'ramnagar.urgenttaxis.com',
  'haridwar.urgenttaxis.com',
  'dehradun.urgenttaxis.com',
  'meerut.urgenttaxis.com',
  'lucknow.urgenttaxis.com',
  'delhi.urgenttaxis.com',
  'unknown.example.com'
];

hostnames.forEach(host => {
  const data = locations[host] || locations['urgenttaxis.com'];
  console.log('---');
  console.log('Hostname:', host);
  console.log('City:', data.city);
  console.log('Phone:', data.phone);
  console.log('WhatsApp:', data.whatsapp);
  console.log('Address:', data.address);
  console.log('SEO Title:', data.seoTitle);
  console.log('Popular Routes:', (data.popularRoutes || []).join(', '));
});
