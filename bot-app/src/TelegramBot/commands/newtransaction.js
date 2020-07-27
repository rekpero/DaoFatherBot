const firebaseUtil = require('../../Common/firebase');
const utils = require('../../Common/utils');
const connectUtil = require('../../Common/connector');

module.exports = {
	name: 'newtransaction',
	description: 'Create new proposal',
	prefixRequired: true,
	args: false,
	usage: '',
	execute: (bot) => {
		return async (msg) => {
			const chatId = msg.chat.id;
			const doc = await firebaseUtil.getDaoById(chatId);
			const name = doc.get('name');
			const org_addr = doc.get('org');
			const address = await connectUtil.orgAddressFinance(org_addr);
			const link = await utils.txLink(name, address);
			return bot.sendMessage(
				chatId,
				`*You can create new transaction here:*\n ${link}`,
				{
					replyMarkup: 'hide',
					parseMode: 'Markdown',
				},
			);
		};
	},
};