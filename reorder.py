import re

def reorder_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define regex patterns for sections
    sections = [
        "NAVBAR", "HERO", "ABOUT", "SERVICES", "PRODUCTION PROCESS", 
        "MOVIES", "PRODUKSI & EVENT TERKINI", "SCHOOL EVENT", 
        "BEHIND THE SCENE", "OUR TEAM", "PENGALAMAN & KARYA", 
        "FOUNDERS", "OUR CLIENTS", "FOOTER"
    ]
    
    # Extract sections
    parts = {}
    for i in range(len(sections)):
        current_marker = f"  <!-- ========== {sections[i]} ========== -->"
        next_marker = f"  <!-- ========== {sections[i+1]} ========== -->" if i+1 < len(sections) else "  <script src=\"script.js\""
        
        start_idx = content.find(current_marker)
        if i+1 < len(sections):
            end_idx = content.find(next_marker)
        else:
            end_idx = content.find(next_marker)
            
        if start_idx != -1 and end_idx != -1:
            parts[sections[i]] = content[start_idx:end_idx]
        elif start_idx != -1 and end_idx == -1: # Last one might not match exactly if script changed
            parts[sections[i]] = content[start_idx:]

    # Desired Order
    desired_order = [
        "NAVBAR", "HERO", "ABOUT", "FOUNDERS", "SERVICES", "PRODUCTION PROCESS", 
        "MOVIES", "PRODUKSI & EVENT TERKINI", "SCHOOL EVENT", "PENGALAMAN & KARYA",
        "OUR TEAM", "BEHIND THE SCENE", "OUR CLIENTS", "FOOTER"
    ]

    # Reconstruct the body
    body_start_idx = content.find("  <!-- ========== NAVBAR ========== -->")
    footer_end_idx = content.find("  <script src=\"script.js\"")
    
    header = content[:body_start_idx]
    footer_tail = content[footer_end_idx:]

    new_body = "".join([parts[sec] for sec in desired_order])

    # Update Navbar links in new_body
    old_nav = """    <ul class="nav-links" id="navLinks">
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#movies">Movies</a></li>
      <li><a href="#school-event">School Event</a></li>
      <li><a href="#team">Team</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>"""
    
    new_nav = """    <ul class="nav-links" id="navLinks">
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#movies">Works</a></li>
      <li><a href="#team">Team</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>"""
    
    new_body = new_body.replace(old_nav, new_nav)
    
    # Performance Optimization: Ensure loading="lazy" and add decoding="async" for all img tags except the first few in hero
    # Wait, simple replace is safer. We'll add decoding="async" to images having loading="lazy"
    new_body = new_body.replace('loading="lazy" />', 'loading="lazy" decoding="async" />')

    final_content = header + new_body + footer_tail

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("Reordering complete.")

if __name__ == "__main__":
    reorder_html('index.html')
