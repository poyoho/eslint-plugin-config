const isActive = Math.random() > 0.5

function show() { return true }
function login() { return true }
function hide() { return true }

// eslint-disable-next-line @poyoho/config/js/no-binocular-logic
isActive ? show() && login() : hide()
