module.exports = () => {
    console.log();
    const pattern = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
    const message = 'Forcing latest version'
    let i = 0;
    const id = setInterval(function() {
        i = (i > pattern.length - 1) ? 0 : i;
        process.stdout.write(`\r \x1b[36m${pattern[i]} ${message}\x1b[0m`);
        process.stdout.write();
        i++
    }, 100);
    return () => {
        clearInterval(id);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    };
};
