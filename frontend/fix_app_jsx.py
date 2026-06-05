import re

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix the end of the Home component
bad_block = """    
        <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        <FloatingQuoteWidget onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        <LeadCapturePopup isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} routeName={routeData.heading || "General"} />
      </div>
</div>
  );
}"""

good_block = """
        <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        <FloatingQuoteWidget onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        <LeadCapturePopup isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} routeName={routeData.heading || "General"} />
      </div>
  );
}"""

code = code.replace(bad_block, good_block)

# Also fix the previous </div> replacement that caused the double div closure
code = code.replace("""       </div>
    
        <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />""", """
        <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />""")

# Now add the state to Home
state_find = """function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);"""

state_replace = """function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);"""

code = code.replace(state_find, state_replace)

# Cleanup any lingering </div>\n</div> issues at the end of Home
# The end of Home should look like:
"""
      <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />
      <FloatingQuoteWidget onOpenLeadForm={() => setIsLeadFormOpen(true)} />
      <LeadCapturePopup isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} routeName={routeData.heading || "General"} />
    </div>
  );
}
"""

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
