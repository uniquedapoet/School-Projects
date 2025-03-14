## **🔹 Phase 1: Project Scope & Setup (Day 1)**
### **Key Concepts:**
- **State Management:** Use `useState` for tracking game variables.
- **Rendering:** React will update the UI dynamically as the simulation progresses.
- **Component Structure:** Break the app into small, manageable parts.
- **Event Handling:** Button clicks trigger simulation updates.

### **What to Do:**
1. **Set up the project** with `npx create-react-app bunbuff-simulation`.
2. **Plan the component structure**:
   ```
   - App.js (Main logic and state management)
   - ControlPanel.js (User input form)
   - Grid.js (Displays bunbuffs)
   - Stats.js (Tracks births, deaths, steps)
   - Log.js (Shows game events)
   ```
3. **Define the state variables** you’ll need:
   - `grid` (2D array for bunbuff placement)
   - `bunbuffs` (array of objects storing bunbuff data)
   - `stepCount`
   - `stats` (births, deaths, average lifespan, etc.)

✅ **Checkpoint:** Have the project set up with placeholder components.

---

## **🔹 Phase 2: Building the UI (Day 2-3)**
### **Key Concepts:**
- **Props & State:** Pass simulation parameters from `ControlPanel` to `App`.
- **Grid Rendering:** Use loop to generate a visual grid.
- **CSS Grid:** Style the grid layout for bunbuff movement.

### **What to Do:**
1. **Create the `ControlPanel`**
   - Use input fields to capture user-defined values (grid size, population, aggression, etc.).
   - Validate inputs (ensure positive integers).
   - Pass values to `App.js` via props.

2. **Create the `Grid` component**
   - Render an `M x N` grid using CSS.
   - Populate cells with bunbuffs (represented as emojis or small images).
   - Display a maximum of **two bunbuffs per cell**.

3. **Create the `Stats` and `Log` panels**
   - Display step count, average births/deaths, and active bunbuffs.
   - Log key events like "Bunbuff 4 attacked Bunbuff 9."

✅ **Checkpoint:** Have a functional UI that updates based on user input.

---

## **🔹 Phase 3: Implement Game Logic (Day 4-5)**
### **Key Concepts:**
- **Updating State on Each Step:** `useState` will track bunbuffs and their attributes.
- **Handling Movement:** Bunbuffs move randomly but stay within grid limits.
- **Simulating Deaths:** Probability-based removal of bunbuffs.
- **Simulating Attacks:** Compare aggression levels to determine outcomes.
- **Simulating Births:** Place new bunbuffs in available cells.

### **What to Do:**
1. **Movement Logic**
   - Each bunbuff picks a random **adjacent** cell (including diagonals).
   - Ensure they don’t move **out of bounds** or into an overfilled cell.

2. **Death Handling**
   - Calculate probability of death: `age / maxLifespan`.
   - Remove bunbuffs that die.

3. **Attacking System**
   - If two bunbuffs share a cell, they may fight.
   - Use `Math.random()` to determine if they attack.
   - Remove defeated bunbuffs from state.

4. **Reproduction System**
   - Two bunbuffs in the same cell can reproduce if they are **6+ months old**.
   - New bunbuffs are placed in **adjacent available cells**.
   - Ensure that **newborns are limited by space**.

✅ **Checkpoint:** Bunbuffs should now move, fight, die, and reproduce correctly.

---

## **🔹 Phase 4: Debugging & Refinements (2-3 Days)**
### **Key Concepts:**
- **Edge Case Handling:** Ensure proper behavior when grid is too small or population is too high.
- **UI Feedback:** Clearly display births, deaths, and fights.
- **State Persistence:** Keep bunbuff data consistent across steps.

### **What to Do:**
1. **Fix unexpected behavior** (e.g., infinite loops, incorrect movements).
2. **Ensure clear UI updates** after each step.
3. **Test various simulation settings** for robustness.

✅ **Checkpoint:** The game should be **fully functional and bug-free**.

---

## **🔹 Phase 5: Finalizing the Design Document (2 Days)**
### **Key Concepts:**
- **Justifying Decisions:** Explain your component structure, state updates, and UI choices.
- **Documenting Game Rules:** Ensure anyone reading the document understands how your game works.

### **What to Do:**
1. **Write an overview** of how state is structured.
2. **Explain why you chose your approach** to movement, attacking, and reproduction.
3. **Include screenshots** of the UI and sample gameplay.

✅ **Checkpoint:** The document should clearly describe your design and implementation.

---

## **🔹 Phase 6: Submission (1 Day)**
- **Ensure the project runs** with `python -m http.server`.
- **Zip your files** (React app + design document).
- **Double-check everything** to avoid submission errors.

✅ **Final Checkpoint:** Ready to submit!

---

### **📌 Summary Timeline**
| Phase | Task | Duration |
|-------|------|----------|
| 1 | Setup & Planning | 1 Day |
| 2 | UI Development | 2-3 Days |
| 3 | Implementing Game Logic | 4-5 Days |
| 4 | Debugging & Refinements | 2-3 Days |
| 5 | Finalizing Design Document | 2 Days |
| 6 | Submission Prep | 1 Day |

---

This plan ensures **structured progress while letting you actively learn**. Let me know if you want any part explained further! 🚀