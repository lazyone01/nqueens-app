#N-Queens Visualizer 👑

An interactive web application that visualizes the classic N-Queens problem using two different algorithmic approaches: Brute Force and Backtracking. Watch as queens are placed on a chessboard in real-time and see the dramatic difference in efficiency between the two algorithms!

🌐 Live Demo
Visit Live  → https://nqueens-app.vercel.app/

<img width="2531" height="1197" alt="Screenshot 2025-12-28 112841" src="https://github.com/user-attachments/assets/1f2760cd-c551-4db4-ad13-eb55c3d51412" />

<img width="2538" height="657" alt="Screenshot 2025-12-28 112859" src="https://github.com/user-attachments/assets/ac16de80-5583-4dff-ac39-cc0b41b8c3b3" />


📖 What is the N-Queens Problem?

The N-Queens problem is a classic computational puzzle where you need to place N chess queens on an N×N chessboard such that no two queens can attack each other. Queens can attack any piece on the same row, column, or diagonal.

For example, on a 4×4 board, you need to place 4 queens so none of them threaten each other!

✨ Features

🎮 Interactive Visualization - Watch algorithms solve the puzzle step-by-step
🐌 Brute Force Algorithm - See how trying every combination works (but slowly!)
🚀 Backtracking Algorithm - Watch intelligent problem-solving in action
⚡ Adjustable Speed - Control the visualization speed
📊 Real-time Statistics - Track solutions found and attempts made
🎯 Multiple Board Sizes - Test with 4×4 up to 8×8 boards
🎨 Beautiful UI - Clean, modern interface with smooth animations


🖥️ Screenshots
Backtracking in Action
The smart algorithm skips invalid positions and finds solutions quickly!
Brute Force Approach
Watch it try every possible combination (much slower!)

🧠 Algorithm Comparison
🐌 Brute Force
Strategy: "Try everything, then check if it works"

Places queens in all possible positions
After placing all N queens, checks if any attack each other
Very slow - tries N^N combinations
Example: For N=8, tries over 16 million combinations!

Time Complexity: O(N^N)
🚀 Backtracking
Strategy: "Be smart! Skip bad moves early"

Places queens row by row
Checks if position is safe BEFORE placing
If stuck, goes back and tries a different path
Much faster - prunes invalid branches early
Example: For N=8, only ~2,000 attempts!

Time Complexity: O(N!)
