//////////////////////////////// OLD VERSION TO LIMITE API USAGE ////////////////////////////////////////////////////////////
// const DAILY_LIMIT = 5
// const USAGE_KEY = 'conversion-usage'
//
// function getUsage() {
//     const stored = JSON.parse(localStorage.getItem(USAGE_KEY) || 'null')
//     const today = new Date().toDateString()
//
//     // Nouveau jour (ou première visite) → on repart de zéro
//     if (!stored || stored.date !== today) {
//         return {date: today, count: 0}
//     }
//     return stored
// }
//
// function incrementUsage() {
//     const usage = getUsage()
//     usage.count += 1
//     localStorage.setItem(USAGE_KEY, JSON.stringify(usage))
//     return usage.count
// }
//
// function isLimitReached() {
//     return getUsage().count >= DAILY_LIMIT
// }
//
// function lockInterface() {
//     firstInput.disabled = true
//     secondInput.disabled = true
//     switchBtn.disabled = true
//     firstSelect.disable()   // API Tom Select
//     secondSelect.disable()  // API Tom Select
// }
//
// function showLimitAlert() {
//     // document.querySelector('#alert-message').textContent = `Limite quotidienne atteinte (${DAILY_LIMIT} conversions). Réessaie demain.`
//     document.querySelector('#alert-message').innerHTML = `Erreur server interne. Impossible de convertir.<br> Réessaie demain.<br>`
//     clearTimeout(alertTimeout)
//     alertDiv.hidden = false
// }
//////////////////////////////// OLD VERSION TO LIMITE API USAGE ////////////////////////////////////////////////////////////
