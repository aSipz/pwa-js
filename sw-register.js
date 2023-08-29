// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', async () => {
//         try {
//             const swReg = await navigator.serviceWorker.register('/sw.js');
//             console.log('ServiceWorker registration successful with scope: ', swReg.scope);
//         } catch (error) {
//             console.log('ServiceWorker registration failed: ', error);
//         }
//     });
// }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}