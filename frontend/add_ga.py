import re

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add Import
if "import ReactGA from 'react-ga4';" not in code:
    code = code.replace(
        "import { Helmet, HelmetProvider } from 'react-helmet-async';",
        "import { Helmet, HelmetProvider } from 'react-helmet-async';\nimport ReactGA from 'react-ga4';"
    )

# 2. Add Initialization globally
if "ReactGA.initialize(" not in code:
    code = code.replace(
        "function Home() {",
        "const GA_MEASUREMENT_ID = 'G-9ER9VR8EHT';\nReactGA.initialize(GA_MEASUREMENT_ID);\n\nfunction Home() {"
    )

# 3. Add Page View Tracking in useEffect
pageview_code = """  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    const routePages = [
      '/delhi-to-haldwani-taxi',
      '/delhi-to-nainital-taxi',
      '/ghaziabad-taxi-service',
      '/delhi-to-ramnagar-taxi',
      '/delhi-airport-to-haldwani-taxi',
      '/noida-taxi-service'
    ];
    if (routePages.includes(location.pathname)) {
      ReactGA.event({ category: "Route Pages", action: "route_page_visit", label: location.pathname });
    }
"""
code = code.replace("  useEffect(() => {\n    const path = location.pathname", pageview_code + "    const path = location.pathname")


# 4. Add handlers for whatsapp and form submit
code = code.replace(
    "  const handleWhatsAppBooking = (e) => {\n    e.preventDefault();\n    const text = `Hello Urgent Taxis",
    """  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    ReactGA.event({ category: "Form", action: "booking_form_submit" });
    ReactGA.event({ category: "Contact", action: "whatsapp_click", label: "Booking Form" });
    const text = `Hello Urgent Taxis"""
)

code = code.replace(
    "  const handleSimpleWhatsApp = (message) => {\n    window.open(`https://wa.me",
    """  const handleSimpleWhatsApp = (message) => {
    ReactGA.event({ category: "Contact", action: "whatsapp_click", label: "Direct WhatsApp Button" });
    window.open(`https://wa.me"""
)

# 5. Add handlePhoneClick and handleReviewClick
helpers = """  const handlePhoneClick = () => {
    ReactGA.event({ category: "Contact", action: "phone_call_click" });
  };
  const handleReviewClick = () => {
    ReactGA.event({ category: "Engagement", action: "review_click" });
  };
  const handleCheckFareClick = () => {
    ReactGA.event({ category: "Engagement", action: "check_fare_click" });
  };
"""
code = code.replace("  const swapLocations = () => {", helpers + "  const swapLocations = () => {")

# 6. Apply handlePhoneClick to all tel links
# We find href={`tel:${CALL_NUMBER}`} and add onClick={handlePhoneClick}
code = code.replace("href={`tel:${CALL_NUMBER}`}", "href={`tel:${CALL_NUMBER}`} onClick={handlePhoneClick}")

# 7. Apply handleReviewClick
code = code.replace('href="https://g.page/r/CWwcpluhBRROEBM/review"', 'href="https://g.page/r/CWwcpluhBRROEBM/review" onClick={handleReviewClick}')

# 8. Apply handleCheckFareClick to Check Fare button
# Line: <button type="submit" className="w-full h-[52px] bg-[#00a859] hover:bg-[#00904d] text-white font-bold rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-green-500/20 text-[16px]">
code = code.replace("Check Fare <ArrowRight className=\"w-5 h-5 ml-2\" />", "Check Fare <ArrowRight className=\"w-5 h-5 ml-2\" onClick={handleCheckFareClick} />")
# Wait, onClick on the svg arrow is bad. The button is type="submit", so it triggers handleWhatsAppBooking. The user explicitly asked for Event name: check_fare_click.
# I will attach onClick={handleCheckFareClick} to the button itself.
code = code.replace('Check Fare <ArrowRight', '<span onClick={handleCheckFareClick} className="flex items-center w-full justify-center h-full">Check Fare <ArrowRight')
code = code.replace('ml-2" /></button>', 'ml-2" /></span></button>')

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
