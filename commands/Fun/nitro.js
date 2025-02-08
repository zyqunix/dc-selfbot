module.exports = {
    name: 'nitro',
    description: 'Nitro!',
    execute(message, args) {
        const nitros = [
            "https://discord.gift/Udzwm3hrQECQBnEEFFCEwdSq",
            "https://discord.gift/vhnuzE2YkNCZ7sfYHHKebKXB"
        ]

        const randomIndex = Math.floor(Math.random() * nitros.length);
        const randomNitro = nitros[randomIndex];

        message.edit(randomNitro);
    },
};