module.exports = {
    name: 'info',
    description: 'Sends Some Info',
    execute(message, args) {
        message.edit({ content:
            "bio: <https://fentseller.lol>\n" +
            "guns.lol: <https://guns.lol/z2>\n" +
            "BTC: bc1qstlxvpqhalgrmwzj493tajrx24dv6p6utfjksy\n" +
            "LTC: LbTYSdu6ARAhEPnpnkScxwn5vfVM2P8KgT\n" +
            "ETH: 0x1E6D96999da353981D7863EbB3633b5DEd5e2949\n" +
            "XMR: 49MYsn5xzdzAiduFwZQ54v8FGeZR9uqLUY7hywfYLURo3qUCDPSX5QifCSnWpENARodqrAWu8tt974d8kzf3RFqkKQStLXU"
        });
    },
};