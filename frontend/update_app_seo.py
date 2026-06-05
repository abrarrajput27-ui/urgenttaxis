import re

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update the routeData switch block
switch_replacement = """    switch(path) {
      case '/delhi-to-haldwani-taxi':
        data.h1 = <>Delhi to Haldwani <br/><span className="text-[#1e3b8a]">Taxi Fare & Booking</span></>;
        data.subtitle = "Check latest Delhi to Haldwani taxi fare. Book one-way or round-trip outstation cab instantly on WhatsApp.";
        data.title = "Delhi to Haldwani Taxi Fare & Booking | Urgent Taxis";
        data.desc = "Looking for Delhi to Haldwani taxi fare? Book reliable one-way and round-trip cabs. Distance 280km, Time 6-7 hrs. Check latest prices and book via WhatsApp.";
        break;
      case '/delhi-to-nainital-taxi':
        data.h1 = <>Delhi to Nainital <br/><span className="text-[#1e3b8a]">Taxi Fare & Service</span></>;
        data.subtitle = "Affordable Delhi to Nainital taxi fare. Comfortable outstation cab booking with verified hill-trained drivers.";
        data.title = "Delhi to Nainital Taxi Fare & Booking | Urgent Taxis";
        data.desc = "Find the best Delhi to Nainital taxi fare. Book comfortable outstation one-way or round-trip cabs. Distance 310km. Instant WhatsApp booking.";
        break;
      case '/ghaziabad-taxi-service':
        data.h1 = <>Taxi Fare & Service in <br/><span className="text-[#1e3b8a]">Ghaziabad</span></>;
        data.subtitle = "Check competitive taxi fare for local, airport, outstation and one-way cabs in Ghaziabad.";
        data.title = "Ghaziabad Taxi Service & Fare | Urgent Taxis";
        data.desc = "Looking for affordable taxi fare in Ghaziabad? Book local hourly rentals, airport drops, and outstation trips. 24/7 service with WhatsApp booking.";
        break;
      case '/delhi-to-ramnagar-taxi':
        data.h1 = <>Delhi to Ramnagar <br/><span className="text-[#1e3b8a]">Taxi Fare & Booking</span></>;
        data.subtitle = "Check outstation taxi fare from Delhi to Ramnagar. Safe, comfortable rides to Jim Corbett.";
        data.title = "Delhi to Ramnagar Taxi Fare & Booking | Urgent Taxis";
        data.desc = "Best Delhi to Ramnagar taxi fare for your Jim Corbett trip. Book one-way or round-trip outstation cabs. Distance 260km, Time 6 hrs. WhatsApp booking.";
        break;
      case '/delhi-airport-to-haldwani-taxi':
        data.h1 = <>Delhi Airport to <br/><span className="text-[#1e3b8a]">Haldwani Taxi Fare</span></>;
        data.subtitle = "Check direct airport transfer fare from Delhi IGI Airport to Haldwani.";
        data.title = "Delhi Airport to Haldwani Taxi Fare | Urgent Taxis";
        data.desc = "Find direct Delhi Airport to Haldwani taxi fare. Affordable one-way airport transfer. Distance 300km. No extra waiting charges. Book instantly via WhatsApp.";
        break;
      case '/noida-taxi-service':
        data.h1 = <>Taxi Fare & Service in <br/><span className="text-[#1e3b8a]">Noida</span></>;
        data.subtitle = "Check competitive taxi fare for local, outstation, and airport cab service in Noida.";
        data.title = "Noida Taxi Service & Fare | Urgent Taxis";
        data.desc = "Check local and outstation taxi fare in Noida. Reliable corporate cabs, airport drops, and hourly rentals. 24/7 availability. Book on WhatsApp.";
        break;
      case '/services':"""

# Find the old switch block using a regular expression that spans from switch(path) to case '/services':
pattern = r"switch\(path\) \{[\s\S]*?case '/services':"
code = re.sub(pattern, switch_replacement, code)


# 2. Add dynamic FAQ and Breadcrumbs to the Helmet block
# Find the Helmet block
helmet_pattern = r"<Helmet>[\s\S]*?</Helmet>"
old_helmet = re.search(helmet_pattern, code).group(0)

# We need to construct dynamic schema strings based on location.pathname and routesData
dynamic_schemas = """
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        {routesData[location.pathname]?.faqs && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": routesData[location.pathname].faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })}
          </script>
        )}
        {routesData[location.pathname] && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://urgenttaxis.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": routesData[location.pathname].heading,
                  "item": `https://urgenttaxis.com${location.pathname}`
                }
              ]
            })}
          </script>
        )}
"""

new_helmet = old_helmet.replace(
"""        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>""", dynamic_schemas)

# Also remove the hardcoded FAQPage from schemaData
faq_schema_pattern = r",\s*\{\s*\"@type\": \"FAQPage\"[\s\S]*?\]\s*\}"
code = re.sub(faq_schema_pattern, "", code)

code = code.replace(old_helmet, new_helmet)


with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
