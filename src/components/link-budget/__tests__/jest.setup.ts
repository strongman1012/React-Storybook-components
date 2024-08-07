export { }

// // Suppress act() warning in Jest
// const originalConsoleError = console.error;

// // Suppress act() warning in Jest
// console.error = (...args) => {
//     if (args.some(arg => arg.includes('The current testing environment is not configured to support act(...)'))) {
//         return;
//     }
//     originalConsoleError(...args);
// };