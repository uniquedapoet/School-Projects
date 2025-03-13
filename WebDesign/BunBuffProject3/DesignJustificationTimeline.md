### **🔹 How to Write the Design Document Along the Way**
Your design document should **evolve with the project**, reflecting key decisions at each phase. Below is a breakdown of **what to document during each phase**, ensuring the final version is detailed, clear, and useful.

---

## **📌 Phase 1: Project Scope & Setup (Day 1)**
### **What to Write in the Design Document**
1. **Project Overview**  
   - What is the purpose of this project?
   - What are the key features of the simulation?
   - What technologies will be used (React, JavaScript, CSS Grid)?
   - Why is React a good choice for this simulation?

2. **Component Breakdown**  
   - Describe the planned component structure:
     ```
     - App.js (Main logic and state management)
     - ControlPanel.js (User input form)
     - Grid.js (Displays bunbuffs)
     - Stats.js (Tracks births, deaths, steps)
     - Log.js (Shows game events)
     ```
   - Why is this component structure chosen?

3. **State Management Plan**  
   - Define the key **state variables** (`useState`):
     - `grid` (2D array for bunbuff placement)
     - `bunbuffs` (array of objects storing bunbuff data)
     - `stepCount` (tracks simulation steps)
     - `stats` (births, deaths, average lifespan, etc.)
   - Explain why each of these variables is needed.

✅ **By the end of this phase**, your design document should have a **structured introduction**, a clear breakdown of planned components, and an overview of state management.

---

## **📌 Phase 2: Building the UI (Days 2-3)**
### **What to Add to the Design Document**
1. **Control Panel Design**  
   - How does the user input data?
   - What validation rules are enforced? (e.g., only positive integers)
   - How is data passed to `App.js` using props?

2. **Grid Rendering Plan**  
   - How does the grid layout work?
   - Why use CSS Grid instead of Flexbox?
   - How will bunbuffs be visually represented (e.g., emojis, images)?

3. **Stats & Log Panel**  
   - What information will be displayed?
   - How will key events be logged (births, deaths, fights)?

✅ **By the end of this phase**, document the **final UI layout** with sketches/screenshots, explain **how user input is handled**, and detail **how bunbuffs are displayed**.

---

## **📌 Phase 3: Implement Game Logic (Days 4-5)**
### **What to Add to the Design Document**
1. **Game Mechanics Breakdown**
   - How does bunbuff **movement** work? (random adjacent moves)
   - How does **death probability** get calculated?
   - How does **attacking** work? (aggression levels, fight mechanics)
   - How does **reproduction** work? (new bunbuff placement rules)

2. **Algorithm Descriptions**  
   - How is movement calculated while preventing out-of-bounds moves?
   - How are fights resolved using probabilities?
   - How are newborn bunbuffs assigned to available spaces?

3. **State Updates & Component Communication**
   - How does `App.js` store and update bunbuff data?
   - How does `Grid.js` re-render based on bunbuff movements?
   - What event handlers trigger state updates?

✅ **By the end of this phase**, document the **game mechanics**, explain **state updates**, and include **pseudocode or flowcharts** for movement, fighting, and reproduction.

---

## **📌 Phase 4: Debugging & Refinements (Days 6-8)**
### **What to Add to the Design Document**
1. **Edge Cases Considered**  
   - What happens if the grid is too small for all bunbuffs?
   - What happens if aggression levels are too high?
   - How does the game end when all bunbuffs die?

2. **Error Handling & UI Improvements**  
   - How do you handle invalid inputs gracefully?
   - What visual feedback helps users understand game events?
   - What UI updates were made based on testing?

3. **Testing Process**  
   - What test cases were used for movement, fighting, and reproduction?
   - How was the game tested with different grid sizes?

✅ **By the end of this phase**, document **edge cases, bug fixes, and UI improvements**.

---

## **📌 Phase 5: Finalizing the Design Document (Days 9-10)**
### **What to Add to the Design Document**
1. **Final Project Summary**
   - How does the simulation work?
   - What were the biggest challenges and how were they solved?
   - What are potential future improvements?

2. **Screenshots of UI & Sample Runs**
   - Include images of different grid sizes.
   - Show examples of bunbuff movement, fights, and reproduction.

3. **Justification of Design Choices**
   - Why was `useState` used over Redux?
   - Why did you choose React for this project?
   - Why use CSS Grid instead of Flexbox?

✅ **By the end of this phase**, the document should fully explain **how the game works, why decisions were made, and include visual evidence of implementation.**

---

## **📌 Phase 6: Submission Prep (Final Day)**
### **Final Checks**
1. Ensure the design document:
   - **Explains the game mechanics and design decisions.**
   - **Provides clear diagrams and screenshots.**
   - **Matches the final implementation.**

2. **Zip project files + design document.**

✅ **At this point, the design document should be polished and ready for submission!**

---

## **🚀 Summary: How to Write the Design Document Along the Way**
| **Phase** | **What to Write** |
|-----------|------------------|
| **Phase 1 (Setup & Planning)** | Project overview, planned components, initial state setup. |
| **Phase 2 (UI Development)** | UI layout, control panel validation, grid rendering details. |
| **Phase 3 (Game Logic)** | Movement, attacks, deaths, reproduction logic. |
| **Phase 4 (Debugging & Refinements)** | Edge cases, bug fixes, testing process. |
| **Phase 5 (Finalizing Doc)** | Screenshots, justifications, final implementation details. |
| **Phase 6 (Submission)** | Ensure document is polished, matches final code. |

🚀 **This method ensures your design document grows with the project, making it easy to complete by the deadline!** 🎯🔥 Let me know if you need more help!