import re

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add imports
import_statement = """import RouteSEOContent from './components/RouteSEOContent';
import StickyMobileBar from './components/StickyMobileBar';
import FloatingQuoteWidget from './components/FloatingQuoteWidget';
import LeadCapturePopup from './components/LeadCapturePopup';"""

code = code.replace("import RouteSEOContent from './components/RouteSEOContent';", import_statement)

# 2. Add state inside App component
state_insertion = """export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);"""

code = code.replace("export default function App() {\n  const [isMenuOpen, setIsMenuOpen] = useState(false);", state_insertion)


# 3. Add root level components at the bottom, right before </BrowserRouter> or main div close.
# The layout is inside `<div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-blue-100 selection:text-blue-900">`
# And ends with Footer. I'll put it right before the last `</div>` of the App.

root_components = """
        <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        <FloatingQuoteWidget onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        <LeadCapturePopup isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} routeName={routeData.heading || "General"} />
      </div>
"""

# Find the last </div> in the file.
code = code[:code.rfind("</div>")] + root_components + code[code.rfind("</div>"):]

# 4. Pass the prop to RouteSEOContent
code = code.replace("<RouteSEOContent data={routesData[location.pathname]} />", "<RouteSEOContent data={routesData[location.pathname]} onOpenLeadForm={() => setIsLeadFormOpen(true)} />")

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
