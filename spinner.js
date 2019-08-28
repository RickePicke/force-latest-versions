module.exports = () => {
    const pattern = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
    const message = 'Forcing latest versions'
    let i = 0;
    
    process.stdout.write('\n');
    const id = setInterval(() => {
        i = (i > pattern.length - 1) ? 0 : i;
        process.stdout.write(`\r \x1b[36m ${pattern[i]} ${message}\x1b[0m `);
        i++
    }, 100);

    return () => {
        clearInterval(id);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    };
};
